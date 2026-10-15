"use client";

import { useEffect, useRef } from "react";

/* Animasi muncul saat masuk viewport (Framer "appear"): scale .9 + translateY 26px → 1/0.
   Satu listener scroll/resize bersama (rAF) memeriksa semua elemen — elemen yang dilewati
   saat scroll cepat tetap ditandai "in" (IntersectionObserver bisa melewatkannya).
   `as="li"` agar HTML tetap valid di dalam <ul>/<ol>.
   Tanpa JS atau reduced-motion: konten langsung terlihat (lihat globals.css). */

const registry = new Set<HTMLElement>();
let ticking = false;

function check() {
  ticking = false;
  const limit = window.innerHeight * 0.92;
  registry.forEach((el) => {
    if (el.getBoundingClientRect().top < limit) {
      el.classList.add("in");
      registry.delete(el);
    }
  });
}

function schedule() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(check);
  }
}

let listening = false;
function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

export default function Appear({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    registry.add(el);
    listen();
    schedule();
    return () => {
      registry.delete(el);
    };
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={`appear ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
