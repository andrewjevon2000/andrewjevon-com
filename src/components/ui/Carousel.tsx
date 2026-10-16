"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/Lucide";

/* Carousel gaya Apple: scroll horizontal dengan snap (murni CSS, jalan tanpa JS),
   slide berikutnya mengintip di kanan. JS hanya menambah:
   - --vis per slide (1 di tengah → 0 saat keluar), dipakai untuk memudarkan teks
   - tombol panah (desktop) dan titik halaman
   Reduced motion: teks tidak memudar (lihat globals.css). */
export default function Carousel({
  children,
  count,
  prevLabel,
  nextLabel,
}: {
  children: React.ReactNode;
  count: number;
  prevLabel: string;
  nextLabel: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const slides = Array.from(el.children) as HTMLElement[];
      const box = el.getBoundingClientRect();
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        /* Jarak tepi kiri slide ke tepi kiri scroller, relatif terhadap lebar slide */
        const d = Math.abs(r.left - box.left) / r.width;
        s.style.setProperty("--vis", String(Math.max(0, 1 - d * 1.6)));
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    /* Event scroll sudah sejalan dengan frame; dihitung langsung agar tidak menunggu rAF */
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (i: number) => {
    const el = ref.current;
    const slide = el?.children[Math.max(0, Math.min(count - 1, i))] as HTMLElement | undefined;
    if (el && slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul ref={ref} className="carousel flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] md:gap-5">
        {children}
      </ul>

      {/* Panah (desktop) */}
      <button
        type="button"
        onClick={() => go(active - 1)}
        disabled={active === 0}
        aria-label={prevLabel}
        className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ink/70 text-white backdrop-blur-md transition-opacity hover:bg-ink disabled:opacity-0 md:grid"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => go(active + 1)}
        disabled={active === count - 1}
        aria-label={nextLabel}
        className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ink/70 text-white backdrop-blur-md transition-opacity hover:bg-ink disabled:opacity-0 md:grid"
      >
        <ArrowRight className="h-5 w-5" />
      </button>

      {/* Titik halaman */}
      <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Case studies">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${i === active ? "w-5 bg-ink" : "w-2 bg-card-3 hover:bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}
