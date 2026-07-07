"use client";

/* eslint-disable react-hooks/purity, react-hooks/immutability --
   Kode WebGL imperatif (idiom R3F): init partikel butuh Math.random saat render
   (useMemo), dan hot path useFrame memutasi Float32Array buffer langsung —
   pola standar three.js untuk performa; aturan React Compiler tidak berlaku di sini. */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { hero } from "@/lib/content";
import { getQuality, type Quality } from "./adaptiveQuality";

/* ParticleField (DESIGN.md WebGL):
   - partikel = bintang di atas ridgescape, reaktif cursor (repulsi ~140px) & scroll
   - garis koneksi gradient g1→g2 (additive: makin jauh makin redup)
   - sesekali partikel membentuk fragmen angka (600%, 40.6%, 13x)
   Koordinat world = piksel layar (kamera ortografis R3F), origin di tengah. */

const REPULSE_RADIUS = 140;
const CONNECT_DIST = 120;
const FRAGMENT_HOLD_MS = 3800;
const FRAGMENT_EVERY_MS: [number, number] = [9000, 17000];

function cssColor(varName: string): THREE.Color {
  const v = getComputedStyle(document.body).getPropertyValue(varName).trim();
  return new THREE.Color(v || "#8b5cf6");
}

/** Sampel titik-titik piksel dari teks (offscreen 2D canvas) → posisi world. */
function sampleText(text: string, viewW: number, viewH: number): Array<[number, number]> {
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d");
  if (!ctx) return [];
  const fontPx = 130;
  ctx.font = `800 ${fontPx}px monospace`;
  const metrics = ctx.measureText(text);
  cv.width = Math.ceil(metrics.width) + 20;
  cv.height = fontPx + 40;
  const c2 = cv.getContext("2d");
  if (!c2) return [];
  c2.font = `800 ${fontPx}px monospace`;
  c2.fillStyle = "#fff";
  c2.textBaseline = "middle";
  c2.fillText(text, 10, cv.height / 2);

  const data = c2.getImageData(0, 0, cv.width, cv.height).data;
  const pts: Array<[number, number]> = [];
  const stride = 5;
  for (let y = 0; y < cv.height; y += stride) {
    for (let x = 0; x < cv.width; x += stride) {
      if (data[(y * cv.width + x) * 4 + 3] > 128) pts.push([x, y]);
    }
  }
  // skala ke area tengah viewport (maks 55% lebar / 620px)
  const targetW = Math.min(viewW * 0.55, 620);
  const scale = targetW / cv.width;
  const cy = viewH * 0.08; // sedikit di atas tengah
  return pts.map(([x, y]) => [
    (x - cv.width / 2) * scale,
    -(y - cv.height / 2) * scale + cy,
  ]);
}

type FragmentState = {
  mode: "free" | "assemble";
  targets: Float32Array; // x,y per partikel (NaN = tidak ditugaskan)
  releaseAt: number;
  nextAt: number;
  fragmentIdx: number;
};

function Particles({ quality, visibleRef }: { quality: Quality; visibleRef: React.RefObject<boolean> }) {
  const { size } = useThree();
  const N = quality.particleCount;

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef({ x: 1e9, y: 1e9 });
  const lastScrollY = useRef(0);

  const [g1, g2] = useMemo(() => [cssColor("--g1"), cssColor("--g2")], []);

  const state = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const velocities = new Float32Array(N * 2);
    const pointColors = new Float32Array(N * 3);
    const c = new THREE.Color();
    for (let i = 0; i < N; i++) {
      positions[i * 3] = (Math.random() - 0.5) * size.width;
      positions[i * 3 + 1] = (Math.random() - 0.5) * size.height;
      positions[i * 3 + 2] = 0;
      velocities[i * 2] = (Math.random() - 0.5) * 0.35;
      velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.35;
      c.copy(g1).lerp(g2, Math.random());
      pointColors[i * 3] = c.r;
      pointColors[i * 3 + 1] = c.g;
      pointColors[i * 3 + 2] = c.b;
    }
    const maxSegs = N * 4;
    return {
      positions,
      velocities,
      pointColors,
      linePositions: new Float32Array(maxSegs * 2 * 3),
      lineColors: new Float32Array(maxSegs * 2 * 3),
      maxSegs,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [N]);

  const frag = useRef<FragmentState>({
    mode: "free",
    targets: new Float32Array(N * 2).fill(NaN),
    releaseAt: 0,
    nextAt: performance.now() + 5000,
    fragmentIdx: 0,
  });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = document.querySelector("header");
      const rect = el?.getBoundingClientRect();
      if (!rect) return;
      mouse.current.x = e.clientX - rect.left - rect.width / 2;
      mouse.current.y = -(e.clientY - rect.top - rect.height / 2);
    };
    const onLeave = () => {
      mouse.current.x = 1e9;
      mouse.current.y = 1e9;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });
    lastScrollY.current = window.scrollY;
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  useFrame(() => {
    if (!visibleRef.current) return;
    const pts = pointsRef.current;
    const lines = linesRef.current;
    if (!pts || !lines) return;

    const { positions, velocities, linePositions, lineColors, maxSegs } = state;
    const W = size.width;
    const H = size.height;
    const now = performance.now();
    const f = frag.current;

    // --- state machine fragmen angka ---
    if (f.mode === "free" && now >= f.nextAt) {
      const text = hero.particleNumbers[f.fragmentIdx % hero.particleNumbers.length];
      f.fragmentIdx++;
      const samples = sampleText(text, W, H);
      f.targets.fill(NaN);
      if (samples.length > 4) {
        const k = Math.min(N, samples.length);
        const step = samples.length / k;
        for (let i = 0; i < k; i++) {
          const [tx, ty] = samples[Math.floor(i * step)];
          f.targets[i * 2] = tx;
          f.targets[i * 2 + 1] = ty;
        }
        f.mode = "assemble";
        f.releaseAt = now + FRAGMENT_HOLD_MS;
      } else {
        f.nextAt = now + 4000;
      }
    } else if (f.mode === "assemble" && now >= f.releaseAt) {
      f.mode = "free";
      f.nextAt =
        now + FRAGMENT_EVERY_MS[0] + Math.random() * (FRAGMENT_EVERY_MS[1] - FRAGMENT_EVERY_MS[0]);
    }

    // --- scroll reactivity (halus) ---
    const dy = (window.scrollY - lastScrollY.current) * 0.06;
    lastScrollY.current = window.scrollY;

    // --- update partikel ---
    const mx = mouse.current.x;
    const my = mouse.current.y;
    for (let i = 0; i < N; i++) {
      let x = positions[i * 3];
      let y = positions[i * 3 + 1];

      const tx = f.targets[i * 2];
      if (f.mode === "assemble" && !Number.isNaN(tx)) {
        // spring menuju titik fragmen
        x += (tx - x) * 0.07;
        y += (f.targets[i * 2 + 1] - y) * 0.07;
      } else {
        x += velocities[i * 2];
        y += velocities[i * 2 + 1] + dy;

        // repulsi cursor
        const dx = x - mx;
        const dyy = y - my;
        const d2 = dx * dx + dyy * dyy;
        if (d2 < REPULSE_RADIUS * REPULSE_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const force = ((REPULSE_RADIUS - d) / REPULSE_RADIUS) * 1.6;
          x += (dx / d) * force;
          y += (dyy / d) * force;
        }

        // wrap di tepi (margin 20px)
        if (x < -W / 2 - 20) x = W / 2 + 20;
        if (x > W / 2 + 20) x = -W / 2 - 20;
        if (y < -H / 2 - 20) y = H / 2 + 20;
        if (y > H / 2 + 20) y = -H / 2 - 20;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
    }

    // --- garis koneksi (O(N²)/2, dibatasi maxSegs) ---
    let seg = 0;
    const cA = new THREE.Color();
    const cB = new THREE.Color();
    for (let i = 0; i < N && seg < maxSegs; i++) {
      for (let j = i + 1; j < N && seg < maxSegs; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dyj = positions[i * 3 + 1] - positions[j * 3 + 1];
        const d2 = dx * dx + dyj * dyj;
        if (d2 > CONNECT_DIST * CONNECT_DIST) continue;
        const fade = (1 - Math.sqrt(d2) / CONNECT_DIST) * 0.55;
        // gradient g1→g2 berdasarkan posisi x (additive → redup = transparan)
        const ni = (positions[i * 3] / W + 0.5) % 1;
        const nj = (positions[j * 3] / W + 0.5) % 1;
        cA.copy(g1).lerp(g2, Math.max(0, Math.min(1, ni))).multiplyScalar(fade);
        cB.copy(g1).lerp(g2, Math.max(0, Math.min(1, nj))).multiplyScalar(fade);
        const o = seg * 6;
        linePositions[o] = positions[i * 3];
        linePositions[o + 1] = positions[i * 3 + 1];
        linePositions[o + 2] = 0;
        linePositions[o + 3] = positions[j * 3];
        linePositions[o + 4] = positions[j * 3 + 1];
        linePositions[o + 5] = 0;
        lineColors[o] = cA.r;
        lineColors[o + 1] = cA.g;
        lineColors[o + 2] = cA.b;
        lineColors[o + 3] = cB.r;
        lineColors[o + 4] = cB.g;
        lineColors[o + 5] = cB.b;
        seg++;
      }
    }

    pts.geometry.attributes.position.needsUpdate = true;
    lines.geometry.attributes.position.needsUpdate = true;
    lines.geometry.attributes.color.needsUpdate = true;
    lines.geometry.setDrawRange(0, seg * 2);
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[state.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[state.pointColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={2.2}
          sizeAttenuation={false}
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[state.linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[state.lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

export default function ParticleField() {
  const [quality] = useState<Quality>(() => getQuality());
  const wrapRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);

  // pause saat hero keluar viewport (hemat CPU/GPU)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 100], near: 0.1, far: 1000 }}
        dpr={quality.dpr}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Particles quality={quality} visibleRef={visibleRef} />
      </Canvas>
    </div>
  );
}
