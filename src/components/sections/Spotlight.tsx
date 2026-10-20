import Image from "next/image";
import { spotlight } from "@/lib/content";
import Appear from "@/components/ui/Appear";
import SpotlightVideo from "@/components/ui/SpotlightVideo";
import { ToolGlyph } from "@/components/ui/Icons";

/* Bukti pertama setelah hero: Meta Ads untuk Yobo. Teks + dua angka di kiri, video di bingkai HP
   di kanan (HP: teks dulu, lalu video). Di bawahnya KV per industri, hanya bila frame sudah ada. */
export default function Spotlight() {
  const kv = spotlight.industries.items.filter((i) => i.src);
  return (
    <section id="spotlight-section" className="section scroll-mt-28 !pt-6 md:!pt-10">
      <div className="wrap flex flex-col gap-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <Appear className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-card-2 px-3.5 py-2 text-[14px] font-semibold">
              <ToolGlyph icon="meta" className="h-5 w-5 object-contain" />
              {spotlight.chip}
            </span>
            <h2 className="text-[38px] leading-[1.02] md:text-[60px]">
              {spotlight.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <div className="grid w-full max-w-[420px] grid-cols-2 gap-2.5">
              {spotlight.stats.map((s) => (
                <div key={s.label} className="rounded-[28px] bg-card-2 px-5 py-5 text-left">
                  <p className="text-[40px] font-semibold leading-none tracking-[-0.05em] text-ink">{s.value}</p>
                  <p className="mt-1.5 text-[14px] font-medium text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Appear>

          <Appear className="mx-auto w-[270px] md:w-[320px]">
            {/* Frame iPhone (PNG transparan 978x2000 asal). Layar: x 53 sampai 924, y 50 sampai 1949,
                sudut layar sekitar 140px. Video duduk di bawah frame, dipotong ke bentuk layar. */}
            <div className="relative aspect-[978/2000] w-full drop-shadow-[14px_14px_28px_rgba(34,54,84,0.18)]">
              <div className="absolute overflow-hidden bg-ink" style={{ left: "5.42%", right: "5.42%", top: "2.5%", bottom: "2.5%", borderRadius: "16% / 7.4%" }}>
                <SpotlightVideo
                  src={spotlight.video.src}
                  poster={spotlight.video.poster}
                  soundOn={spotlight.video.soundOn}
                  soundOff={spotlight.video.soundOff}
                />
              </div>
              <Image src="/images/site/iphone-frame.png" alt="" fill sizes="(max-width: 810px) 270px, 320px" className="pointer-events-none select-none" priority={false} />
            </div>
            <p className="mt-3 text-center text-[13px] font-medium text-muted">{spotlight.video.caption}</p>
          </Appear>
        </div>

        {kv.length > 0 && (
          <div className="flex flex-col gap-6">
            <Appear className="flex flex-col gap-2 text-center">
              <h3 className="text-[26px] leading-[1.1] md:text-[32px]">{spotlight.industries.heading}</h3>
              <p className="text-[15px] font-medium text-muted">{spotlight.industries.sub}</p>
            </Appear>
            <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0">
              {kv.map((k) => (
                <li key={k.label} className="w-[150px] shrink-0 snap-start lg:w-[118px]">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] bg-card-2">
                    <Image src={k.src} alt={`Key visual for ${k.label}`} fill sizes="150px" className="object-cover" />
                  </div>
                  <p className="mt-2 text-center text-[13px] font-semibold">{k.label}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
