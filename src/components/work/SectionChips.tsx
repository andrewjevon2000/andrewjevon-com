"use client";

import { useEffect, useRef, useState } from "react";

/* Navigasi section untuk HP/tablet: menempel di bawah nav, chip aktif mengikuti scroll.
   Harus jadi anak langsung dari pembungkus yang memuat semua section (sticky mengikuti parent). */
/* floating: chip melayang (fixed) dan baru muncul setelah section pertama mendekati atas layar,
   sehingga tidak menjadi pita di tengah alur halaman (dipakai di beranda). */
export default function SectionChips({ items, flush, floating }: { items: { id: string; label: string }[]; flush?: boolean; floating?: boolean }) {
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
    <div
      className={`glass-fade z-40 bg-white/85 pb-4 backdrop-blur-md [--fade:16px] lg:hidden ${
        floating
          ? `fixed inset-x-0 top-[108px] transition-[opacity,transform] duration-300 ${active ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`
          : `sticky top-[112px] ${flush ? "" : "-mx-4"}`
      }`}
      aria-hidden={floating && !active ? true : undefined}
    >
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
