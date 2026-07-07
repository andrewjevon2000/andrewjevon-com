"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { EvidenceItem } from "@/lib/content";

/* Galeri evidence editorial (PRD §6.6):
   - image  → thumbnail, klik = lightbox
   - exhibit → iframe interaktif (Verihubs) dibuka inline
   - pdf     → kartu link (buka tab baru)
   Lightbox: keyboard (Esc/←/→), focus trap ringan, aria-modal. */
export default function EvidenceGallery({ items }: { items: EvidenceItem[] }) {
  const images = items.filter((it) => it.type === "image");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  const go = useCallback(
    (dir: number) => {
      setOpenIdx((i) => (i === null ? i : (i + dir + images.length) % images.length));
    },
    [images.length],
  );

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, close, go]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((it) => {
          if (it.type === "exhibit") {
            return (
              <figure key={it.src} className="sm:col-span-2">
                <div className="overflow-hidden rounded-[14px] border border-line">
                  <iframe
                    src={it.src}
                    title={it.caption}
                    loading="lazy"
                    className="h-[520px] w-full bg-white"
                  />
                </div>
                <figcaption className="mt-2 font-mono text-xs text-dim">{it.caption}</figcaption>
              </figure>
            );
          }
          if (it.type === "pdf") {
            return (
              <a
                key={it.src}
                href={it.src}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[14px] border border-line bg-panel p-5 transition-colors hover:border-accent"
              >
                <span className="font-mono text-[22px] text-accent" aria-hidden>
                  ↓
                </span>
                <span className="text-sm text-dim">
                  {it.caption} <span className="text-dimmer">(PDF)</span>
                </span>
              </a>
            );
          }
          // image
          const imgIdx = images.findIndex((im) => im.src === it.src);
          return (
            <figure key={it.src}>
              <button
                type="button"
                onClick={() => setOpenIdx(imgIdx)}
                className="group block w-full overflow-hidden rounded-[14px] border border-line"
              >
                <span className="relative block aspect-[16/10]">
                  <Image
                    src={it.src}
                    alt={it.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, 560px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </span>
              </button>
              <figcaption className="mt-2 font-mono text-xs text-dim">{it.caption}</figcaption>
            </figure>
          );
        })}
      </div>

      {openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[openIdx].caption}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(4,4,8,.92)] p-4 sm:p-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 font-mono text-2xl text-dim hover:text-txt"
          >
            ✕
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous"
                className="absolute left-4 font-mono text-3xl text-dim hover:text-txt"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next"
                className="absolute right-4 font-mono text-3xl text-dim hover:text-txt"
              >
                ›
              </button>
            </>
          )}
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <Image
                src={images[openIdx].src}
                alt={images[openIdx].caption}
                width={1400}
                height={900}
                className="h-auto max-h-[80vh] w-auto rounded-[10px] object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center font-mono text-xs text-dim">
              {images[openIdx].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
