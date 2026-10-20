"use client";

import Image from "next/image";
import { useState } from "react";
import { hero } from "@/lib/content";
import { SquiggleArrow } from "@/components/ui/Icons";
import { ArrowDown } from "@/components/ui/Lucide";

/* Hero: value proposition + 2 CTA (selalu terlihat, tidak perlu klik foto), lalu
   kartu flip khas situs live (foto ↔ Experience/Tools), nama besar Geist abu-abu
   di belakang, sticker tulisan tangan. HP: teks dulu, lalu foto. Desktop: 2 kolom.
   Teks nama & isi kartu belakang ada di HTML (SSR) — flip hanya CSS transform.
   Animasi masuk (.intro-*) murni CSS, lihat globals.css.
   Sticker ikut goyang bersama kartu (di dalam .rock), tapi tidak ikut flip. */
export default function Hero() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="relative overflow-hidden px-4 pb-[130px] pt-[120px] md:px-10 md:pb-[220px] md:pt-[160px] lg:pb-[250px] xl:px-[120px]">
      {/* Nama besar di belakang — selalu pas 100% lebar layar (Framer "100% Fit Name") */}
      <svg
        viewBox="0 0 1440 300"
        className="intro-name pointer-events-none absolute inset-x-0 bottom-0 block w-full select-none"
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

      <div className="wrap relative grid items-center gap-[56px] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-[120px]">
        {/* Value proposition: langsung terlihat, tanpa animasi masuk */}
        <div className="flex flex-col items-center gap-5 text-center md:gap-6 lg:items-start lg:text-left">
          <p className="hand text-[30px] text-blue md:text-[34px]">{hero.hello}</p>
          <h1 className="max-w-[640px] text-[44px] leading-[1] md:text-[64px] lg:text-[72px]">{hero.headline}</h1>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href={hero.ctas.primary.href} className="btn btn-dark px-5" data-track="hero_work_click" data-location="hero">
              {hero.ctas.primary.label} <ArrowDown className="h-4 w-4" />
            </a>
            <a href={hero.ctas.secondary.href} className="btn btn-light border border-card-3 px-5" data-track="contact_cta_click" data-location="hero">
              {hero.ctas.secondary.label}
            </a>
          </div>
        </div>

      <div className="relative mx-auto mb-20 md:mb-0 lg:mr-14">
        {/* Catatan "Click me" */}
        <div className="intro-note hand absolute -left-[88px] top-[130px] hidden items-end gap-1 text-[24px] text-blue md:flex" aria-hidden>
          <span className="pb-3">{hero.clickMe}</span>
          <SquiggleArrow className="h-[33px] w-[15px] rotate-[20deg] text-blue" />
        </div>
        <div className="intro-note hand absolute -bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center text-[18px] text-blue md:hidden" aria-hidden>
          <SquiggleArrow className="h-[29px] w-[18px] -rotate-90 text-blue" />
          <span>{hero.clickMe}</span>
        </div>

        {/* Kartu flip — .intro-card naik saat load, .rock = goyangan idle, flip di dalamnya */}
        <div className="intro-card">
        <div className="flip-scene rock relative">
          {/* Sticker */}
          <p
            className="intro-note hand absolute -right-4 -top-8 z-10 rotate-[20deg] text-center text-[32px] leading-[0.75] text-blue md:-right-16 md:top-0 md:text-[34px]"
            aria-hidden
          >
            {hero.sticker.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <button
            type="button"
            aria-pressed={flipped}
            aria-label={flipped ? "Show photo" : "Show experience and tools"}
            onClick={() => setFlipped((v) => !v)}
            className="flip-card block aspect-[4/5] w-[304px] cursor-pointer rounded-[44px] text-left shadow-card md:w-[401px] md:rounded-[55px]"
            data-flipped={flipped}
          >
            {/* Depan: foto */}
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
            <div className="flip-face flip-back flex flex-col gap-5 rounded-[44px] bg-card-3 p-6 md:gap-8 md:rounded-[55px] md:p-8">
              <div>
                <p className="hand text-[30px] text-blue md:text-[48px]">{hero.back.experience.title}</p>
                <ul className="hand mt-3 flex flex-col gap-2 text-[21px] text-ink md:mt-5 md:gap-2.5 md:text-[32px]">
                  {hero.back.experience.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="hand text-[30px] text-blue md:text-[48px]">{hero.back.tools.title}</p>
                <ul className="hand mt-3 flex flex-col gap-2 text-[21px] text-ink md:mt-5 md:gap-2.5 md:text-[32px]">
                  {hero.back.tools.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
              <a
                href={hero.back.cta.href}
                onClick={(e) => e.stopPropagation()}
                data-track="contact_cta_click"
                data-location="hero_card"
                className="btn btn-dark mt-auto self-center px-5 py-3 text-[16px] font-medium"
              >
                {hero.back.cta.label}
              </a>
            </div>
          </button>
        </div>
        </div>
      </div>
      </div>
    </section>
  );
}
