"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  to: number;
};

/* Count-up (DESIGN.md): 1400ms cubic-out, trigger threshold .6.
   SSR merender angka FINAL (aturan SSR-first) — animasi hanya menimpa
   sementara saat elemen masuk viewport, dan hanya bila motion diizinkan. */
export default function CountUp({ to }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / 1400, 1);
            const eased = 1 - Math.pow(1 - t, 3); // cubic-out
            el.textContent = String(Math.round(eased * to));
            if (t < 1) rafId = requestAnimationFrame(tick);
          };
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [to]);

  return <span ref={ref}>{to}</span>;
}
