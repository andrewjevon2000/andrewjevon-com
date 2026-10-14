"use client";

import Image from "next/image";
import { useState } from "react";
import { hero } from "@/lib/content";
import { SquiggleArrow } from "@/components/ui/Icons";

/* Hero mengikuti situs live: kartu flip di tengah (foto ↔ Experience/Tools),
   nama besar Geist abu-abu di belakang, sticker tulisan tangan.
   Teks nama & isi kartu belakang ada di HTML (SSR) — flip hanya CSS transform. */
export default function Hero() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="relative flex h-[700px] items-center justify-center overflow-hidden md:h-[900px]">
      {/* Nama besar di belakang (Geist 600, #eee) */}
      <p
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none whitespace-nowrap text-center font-geist text-[22vw] font-semibold leading-[1.2] tracking-[-0.1em] text-card-3 md:text-[17.6vw]"
        aria-hidden
      >
        {hero.name}
      </p>

      <div className="relative mt-6 md:mt-0">
        {/* Catatan "Click me" */}
        <div className="hand absolute -left-[88px] top-[90px] hidden items-end gap-1 text-[24px] text-blue md:flex" aria-hidden>
          <span className="pb-3">{hero.clickMe}</span>
          <SquiggleArrow className="h-[33px] w-[15px] rotate-[20deg] text-blue" />
        </div>
        <div className="hand absolute -bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center text-[18px] text-blue md:hidden" aria-hidden>
          <SquiggleArrow className="h-[29px] w-[18px] -rotate-90 text-blue" />
          <span>{hero.clickMe}</span>
        </div>

        {/* Sticker */}
        <p
          className="hand absolute -right-8 -top-2 z-10 rotate-[20deg] text-center text-[41px] leading-[0.7] text-blue md:-right-20 md:top-0 md:text-[34px]"
          aria-hidden
        >
          {hero.sticker.split(" × ").map((w, i) => (
            <span key={w} className="block">
              {i === 0 ? `${w} ×` : w}
            </span>
          ))}
        </p>

        {/* Kartu flip */}
        <div className="flip-scene">
          <button
            type="button"
            aria-pressed={flipped}
            aria-label={flipped ? "Show photo" : "Show experience and tools"}
            onClick={() => setFlipped((v) => !v)}
            className="flip-card block h-[378px] w-[304px] cursor-pointer rounded-[44px] text-left shadow-card md:h-[501px] md:w-[401px] md:rounded-[55px]"
            data-flipped={flipped}
          >
            {/* Depan: foto + nama serif putih */}
            <div className="flip-face overflow-hidden rounded-[44px] bg-card-3 md:rounded-[55px]">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                priority
                sizes="(max-width: 768px) 304px, 401px"
                className="object-cover"
              />
              <p className="serif absolute -bottom-1 left-1/2 w-max -translate-x-1/2 whitespace-nowrap text-[83px] leading-[0.8] tracking-[-0.05em] text-white md:text-[110px]">
                {hero.name}
              </p>
            </div>

            {/* Belakang: Experience + Tools + CTA */}
            <div className="flip-face flip-back flex flex-col gap-8 rounded-[44px] bg-card-3 p-6 md:rounded-[55px] md:p-8">
              <div>
                <p className="hand text-[36px] text-blue md:text-[48px]">{hero.back.experience.title}</p>
                <ul className="hand mt-5 flex flex-col gap-2.5 text-[24px] text-ink md:text-[32px]">
                  {hero.back.experience.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="hand text-[36px] text-blue md:text-[48px]">{hero.back.tools.title}</p>
                <ul className="hand mt-5 flex flex-col gap-2.5 text-[24px] text-ink md:text-[32px]">
                  {hero.back.tools.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
              <a
                href={hero.back.cta.href}
                onClick={(e) => e.stopPropagation()}
                className="btn btn-dark mt-auto self-center px-5 py-3 text-[16px] font-medium"
              >
                {hero.back.cta.label}
              </a>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
