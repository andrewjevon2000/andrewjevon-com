import Image from "next/image";
import { hero } from "@/lib/content";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import CountUp from "@/components/motion/CountUp";
import HeroCanvas from "@/components/webgl/HeroCanvas";

/** \n dalam TextPart = <br> di layar ≥md; di mobile jadi spasi (wrap alami). */
function HeadlineText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br className="hidden md:block" />}
          {i > 0 && <span className="md:hidden"> </span>}
          {line}
        </span>
      ))}
    </>
  );
}

/* Ridgescape statis (DESIGN.md "Aurora Ridgescape") — parallax menyusul di M4/M5.
   Path SVG identik dengan prototype. */
function RidgeScene() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* sun/glow horizon */}
      <div
        data-plx="0.38"
        className="absolute left-[56%] top-[14%] h-[300px] w-[300px] rounded-full opacity-55 blur-[6px]"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, color-mix(in srgb, var(--g2) 60%, transparent), color-mix(in srgb, var(--g1) 45%, transparent) 55%, transparent 72%)",
        }}
      />
      {/* ridge jauh */}
      <div data-plx="0.22" className="absolute -bottom-[3px] left-[-2%] w-[104%] leading-none opacity-95">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="block h-auto w-full">
          <path
            d="M0,300 L0,190 L110,120 L230,185 L340,85 L470,175 L590,105 L710,195 L830,115 L950,180 L1070,70 L1190,160 L1310,115 L1440,185 L1440,300 Z"
            fill="#191340"
            stroke="color-mix(in srgb, var(--g1) 30%, transparent)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      {/* ridge tengah */}
      <div data-plx="0.11" className="absolute -bottom-[3px] left-[-2%] z-[1] w-[104%] leading-none">
        <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="block h-auto w-full">
          <path
            d="M0,260 L0,190 L150,130 L310,200 L460,140 L620,210 L780,150 L940,220 L1090,165 L1250,215 L1440,155 L1440,260 Z"
            fill="#110e28"
            stroke="color-mix(in srgb, var(--g2) 18%, transparent)"
            strokeWidth="1"
          />
        </svg>
      </div>
      {/* ridge depan — menyatu dengan section berikutnya (naik saat scroll) */}
      <div data-plx="-0.06" className="absolute -bottom-[3px] left-[-2%] z-[3] w-[104%] leading-none">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="block h-auto w-full">
          <path
            d="M0,200 L0,140 L170,100 L350,155 L530,110 L710,165 L890,118 L1070,170 L1250,128 L1440,158 L1440,200 Z"
            fill="var(--bg)"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <header className="relative flex min-h-screen items-center overflow-hidden pb-[60px] pt-[120px]">
      {/* glow blobs (DESIGN.md: blur 110px, opacity ≤ .16, parallax ±0.16–0.22) */}
      <div
        data-plx="0.22"
        className="pointer-events-none absolute -left-[140px] -top-[120px] h-[520px] w-[520px] rounded-full bg-g1 opacity-[.16] blur-[110px]"
        aria-hidden
      />
      <div
        data-plx="-0.16"
        className="pointer-events-none absolute -bottom-[100px] -right-[100px] h-[460px] w-[460px] rounded-full bg-g2 opacity-[.16] blur-[110px]"
        aria-hidden
      />
      {/* particle field = bintang DI BELAKANG ridgescape (urutan DOM sebelum scene) */}
      <HeroCanvas />
      <RidgeScene />

      <div className="wrap relative">
        {/* teks hero TENGGELAM di belakang ridge depan saat scroll (plx 0.15 < ridge z) */}
        <div data-plx="0.15" className="relative z-[2] grid items-center gap-12 md:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-accent">
              {hero.kicker}
            </p>
            <h1 className="text-[clamp(38px,6vw,72px)] font-medium">
              {hero.headline.map((part, i) =>
                part.gradient ? (
                  <em key={i} className="grad-text not-italic">
                    {part.text}
                  </em>
                ) : (
                  <HeadlineText key={i} text={part.text} />
                ),
              )}
            </h1>
            <p className="mb-[30px] mt-[22px] max-w-[520px] text-[17px] text-dim">{hero.sub}</p>
            <div className="flex flex-wrap gap-[14px]">
              <Button href={hero.ctas.primary.href}>{hero.ctas.primary.label}</Button>
              <Button variant="ghost" href={hero.ctas.secondary.href}>
                {hero.ctas.secondary.label}
              </Button>
            </div>
          </div>

          {/* Foto — treatment duotone/monokrom menyatu dengan canvas (PRD §5.1) */}
          <div
            data-plx="-0.07"
            className="relative -order-1 w-fit justify-self-start md:order-none md:w-full md:max-w-[300px] md:justify-self-end"
          >
            <div
              className="absolute -inset-[14px] rotate-3 rounded-[20px] border border-line"
              aria-hidden
            />
            <div className="relative aspect-[4/5] w-[170px] overflow-hidden rounded-2xl border border-line md:w-full">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                priority
                sizes="(max-width: 768px) 170px, 300px"
                className="object-cover grayscale"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,var(--accent-soft))]"
                aria-hidden
              />
            </div>
          </div>
        </div>

        {/* Stat cards — z tertinggi (di atas ridge depan) */}
        <div className="relative z-[4] mt-14 grid gap-[18px] md:grid-cols-3">
          {hero.stats.map((s) => (
            <StatCard
              key={s.label}
              prefix={s.prefix}
              value={<CountUp to={s.countTo} />}
              suffix={s.suffix}
              label={s.label}
            />
          ))}
        </div>
      </div>

      <p className="bob absolute bottom-[26px] left-1/2 z-[2] -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-dimmer">
        {hero.scrollHint}
      </p>
    </header>
  );
}
