"use client";

import { useEffect, useRef, useState } from "react";

/* Navigasi section untuk mobile: menempel di bawah Nav (60px), chip aktif
   mengikuti section yang sedang dibaca. Disembunyikan di ≥md. */
export default function SectionChips({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const sync = () => {
      ticking = false;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(sync);
      }
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  useEffect(() => {
    if (!active || !rowRef.current) return;
    const chip = rowRef.current.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (chip) rowRef.current.scrollTo({ left: chip.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-[60px] z-40 -mx-8 border-b border-line bg-[rgba(255,255,255,.9)] backdrop-blur-[14px] md:hidden">
      <div ref={rowRef} className="flex gap-2 overflow-x-auto px-8 py-2.5 [scrollbar-width:none]">
        {items.map((it) => (
          <a
            key={it.id}
            data-id={it.id}
            href={`#${it.id}`}
            aria-current={active === it.id ? "true" : undefined}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
              active === it.id ? "border-ink bg-ink text-white" : "border-line bg-bg2 text-dim"
            }`}
          >
            {it.label}
          </a>
        ))}
      </div>
    </div>
  );
}
