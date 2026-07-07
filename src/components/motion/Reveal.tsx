"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** "y" = translateY 34px (default) · "x" = translateX -16px (timeline) */
  direction?: "y" | "x";
  className?: string;
};

/* Reveal on scroll (DESIGN.md): threshold .15, sekali saja (unobserve).
   Tanpa JS / reduced motion: konten langsung terlihat (CSS default). */
export default function Reveal({ children, direction = "y", className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("inview");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${direction === "x" ? "reveal-x" : "reveal"} ${className}`}>
      {children}
    </div>
  );
}
