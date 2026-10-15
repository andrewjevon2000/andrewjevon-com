"use client";

import Image from "next/image";
import { useState } from "react";
import { hero } from "@/lib/content";
import { SquiggleArrow } from "@/components/ui/Icons";
import Appear from "@/components/ui/Appear";

/* Hero mengikuti situs live: kartu flip di tengah (foto ↔ Experience/Tools),
   nama besar Geist abu-abu di belakang, sticker tulisan tangan.
   Teks nama & isi kartu belakang ada di HTML (SSR) — flip hanya CSS transform. */
export default function Hero() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="relative flex h-[700px] items-center justify-center overflow-hidden md:h-[900px]">
      {/* Nama besar di belakang — selalu pas 100% lebar layar (Framer "100% Fit Name") */}
      <svg
        viewBox="0 0 1440 300"
        className="pointer-events-none absolute inset-x-0 bottom-0 block w-full select-none"
        aria-hidden
      >
        <text
          x="720"
          y="252"
          textAnchor="middle"
          textLength="1440"
          lengthAdjust="spacingAndGlyphs"
          fontSize="254"
          fontWeight="600"
          letterSpacing="-25"
          fill="var(--card-3)"
          style={{ fontFamily: "var(--font-geist), system-ui, sans-serif" }}
        >
          {hero.name}
        </text>
      </svg>

      <Appear className="relative mt-6 md:mt-0">
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
          className="hand absolute -right-4 -top-8 z-10 rotate-[20deg] text-center text-[32px] leading-[0.75] text-blue md:-right-16 md:top-0 md:text-[34px]"
          aria-hidden
        >
          {hero.sticker.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        {/* Kartu flip — wrapper .rock = goyangan idle, flip di dalamnya */}
        <div className="flip-scene rock">
          <button
            type="button"
            aria-pressed={flipped}
            aria-label={flipped ? "Show photo" : "Show experience and tools"}
            onClick={() => setFlipped((v) => !v)}
            className="flip-card hero-card block aspect-[4/5] w-[304px] cursor-pointer rounded-[44px] text-left shadow-card md:w-[401px] md:rounded-[55px]"
            data-flipped={flipped}
          >
            {/* Depan: foto + nama serif putih */}
            <div className="flip-face overflow-hidden rounded-[44px] border-[6px] border-white bg-card-3 md:rounded-[55px] md:border-[8px]">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                priority
                sizes="(max-width: 768px) 304px, 401px"
                className="object-cover"
              />
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
      </Appear>
    </section>
  );
}
