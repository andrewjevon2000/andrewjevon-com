"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/* Canvas dimuat dynamic (ssr:false) SETELAH teks hero ter-render — LCP tetap teks.
   Gate: reduced-motion atau tanpa WebGL → tidak render apa pun
   (fallback statis = gradient + glow blobs + ridgescape yang sudah ada di Hero). */
const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function HeroCanvas() {
  const [ready, setReady] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) return;
    // async agar tidak memicu cascading render sinkron di dalam effect
    const raf = requestAnimationFrame(() => setReady(true));
    // fade-in setelah first paint konten teks
    const t = setTimeout(() => setShown(true), 350);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden
      className={`absolute inset-0 z-0 transition-opacity duration-1000 ${shown ? "opacity-100" : "opacity-0"}`}
    >
      <ParticleField />
    </div>
  );
}
