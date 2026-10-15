"use client";

import { useEffect, useRef, useState } from "react";

/* Navigasi section untuk HP/tablet: menempel di bawah nav, chip aktif mengikuti scroll. */
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
    <div className="sticky top-[104px] z-40 -mx-4 bg-white/90 backdrop-blur-md lg:hidden">
      <div ref={rowRef} className="flex gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none]">
        {items.map((it) => (
          <a
            key={it.id}
            data-id={it.id}
            href={`#${it.id}`}
            aria-current={active === it.id ? "true" : undefined}
            className={`shrink-0 rounded-[18px] px-3.5 py-2 text-[14px] font-semibold transition-colors ${
              active === it.id ? "bg-ink text-white" : "bg-card text-muted"
            }`}
          >
            {it.label}
          </a>
        ))}
      </div>
    </div>
  );
}
