import Image from "next/image";
import Link from "next/link";
import { adsProof, type AdProof } from "@/lib/content";
import Appear from "@/components/ui/Appear";
import AdVideo from "@/components/ui/AdVideo";
import { ToolGlyph } from "@/components/ui/Icons";
import { ArrowRight } from "@/components/ui/Lucide";

/* Bukti pertama setelah hero, gaya kartu askneedle: media iklan di atas, panel gelap di bawah
   (angka besar, klien, satu kalimat, tautan). Media SELALU utuh: object-contain di tengah,
   sisa ruang diisi versi buram dari iklan yang sama, jadi tidak ada yang terpotong atau pecah.
   HP: kartu digeser ke samping (snap). Desktop: tiga kolom. */

function Media({ m }: { m: AdProof["media"] }) {
  if (m.kind === "bars") {
    const max = Math.max(m.before.value, m.after.value);
    return (
      <div className="flex h-full flex-col justify-end gap-3 bg-card-2 px-7 pb-7 pt-12">
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-muted">{m.caption}</p>
        <div className="flex h-[70%] items-end gap-5">
          {[m.before, m.after].map((b, i) => (
            <div key={b.label} className="flex h-full flex-1 flex-col justify-end gap-2">
              <p className={`text-[26px] font-semibold leading-none tracking-[-0.05em] ${i ? "text-blue" : "text-muted"}`}>{b.text}</p>
              <div className={`w-full rounded-[14px] ${i ? "bg-blue" : "bg-ink/20"}`} style={{ height: `${Math.max(4, (b.value / max) * 100)}%` }} />
              <p className="text-[13px] font-semibold text-ink">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  const bg = m.kind === "video" ? m.poster : m.src;
  return (
    <div className="relative h-full w-full bg-ink">
      {/* Latar: iklan yang sama, diperbesar dan dibuat buram (dekoratif) */}
      <Image src={bg} alt="" fill sizes="400px" className="scale-125 object-cover opacity-70 blur-2xl" aria-hidden />
      {m.kind === "video" ? (
        <AdVideo src={m.src} poster={m.poster} soundOn={adsProof.soundOn} soundOff={adsProof.soundOff} />
      ) : (
        <Image src={m.src} alt={m.alt} fill sizes="(max-width: 810px) 84vw, 400px" className="object-contain" />
      )}
    </div>
  );
}

export default function AdsProof() {
  return (
    <section id="spotlight-section" className="section scroll-mt-28 !pt-8 md:!pt-12">
      <div className="wrap flex flex-col gap-10">
        <Appear className="flex flex-col items-center gap-5 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <h2 className="max-w-[760px] text-[38px] leading-[1.02] md:text-[56px]">{adsProof.heading}</h2>
          <a href={adsProof.cta.href} className="btn shrink-0 rounded-full border-[1.5px] border-card-3 bg-white px-6 text-ink hover:bg-card">
            {adsProof.cta.label}
          </a>
        </Appear>

        <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
          {adsProof.items.map((a, i) => (
            <Appear as="li" key={a.slug} delay={i * 90} className="flex w-[84%] shrink-0 snap-start flex-col overflow-hidden rounded-[32px] bg-ink shadow-card md:w-[60%] lg:w-auto">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Media m={a.media} />
                <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1.5 text-[12px] font-semibold text-white backdrop-blur-md">
                  <ToolGlyph icon="meta" className="h-4 w-4 object-contain" /> {a.channel}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 px-6 pb-7 pt-6 text-white">
                <p className="text-[52px] font-semibold leading-[0.95] tracking-[-0.06em] text-blue md:text-[60px]">{a.value}</p>
                <p className="text-[15px] font-medium text-white/75">{a.label}</p>
                <div className="my-1.5 h-px bg-white/15" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-blue">{a.client}</p>
                <h3 className="text-[22px] leading-[1.15] text-white">{a.title}</h3>
                <p className="text-[15px] font-medium leading-[1.4] text-white/75">{a.sub}</p>
                <Link
                  href={`/work/${a.slug}`}
                  className="mt-auto inline-flex items-center gap-1 pt-3 text-[15px] font-semibold text-blue hover:underline"
                  data-track="case_study_click"
                  data-location="ads_proof"
                  data-project={a.slug}
                >
                  {adsProof.readLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Appear>
          ))}
        </ul>
      </div>
    </section>
  );
}
