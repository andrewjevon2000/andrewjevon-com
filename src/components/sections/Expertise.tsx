import Image from "next/image";
import Link from "next/link";
import { achievements } from "@/lib/content";
import Appear from "@/components/ui/Appear";
import { ToolGlyph } from "@/components/ui/Icons";
import { ArrowRight, Check, Plus } from "@/components/ui/Lucide";

/* "What I do": 3 fokus layanan (tile dengan logo tools), lalu 9 area keahlian dalam <details> (ringkas saat tertutup, detail + gambar saat dibuka).
   Teks detail tetap ada di HTML server-rendered. */
const tints = ["bg-tint-cyan", "bg-tint-blue", "bg-tint-violet"];

export default function Expertise() {
  return (
    <section id="expertise-section" className="section scroll-mt-28">
      <div className="wrap flex flex-col gap-[50px]">
        <Appear className="flex flex-col gap-5 text-center">
          <h2 className="text-[38px] leading-none md:text-[60px]">{achievements.heading}</h2>
        </Appear>

        {/* 3 fokus, gaya tile: logo tools sebagai benda di tengah tile, judul + satu baris di bawah */}
        <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
          {achievements.focus.map((f, i) => (
            <Appear as="li" key={f.title} delay={i * 90} className="flex flex-col gap-4">
              <div className={`flex aspect-[16/10] items-center justify-center gap-3 rounded-[32px] ${tints[i % 3]}`}>
                {f.tools.map((t) => (
                  <span key={t} className="grid h-16 w-16 place-items-center rounded-[22px] bg-white shadow-soft md:h-[72px] md:w-[72px] md:rounded-[24px]">
                    <ToolGlyph icon={t} className="h-9 w-9 object-contain" />
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-1 px-1 text-center">
                <h3 className="text-[22px] leading-[1.15] tracking-[-0.04em] md:text-[24px]">{f.title}</h3>
                <p className="text-[15px] font-medium leading-[1.4] text-muted">{f.body}</p>
              </div>
            </Appear>
          ))}
        </ul>

        {/* 9 area keahlian */}
        <div className="flex flex-col gap-6">
          <Appear className="flex flex-col gap-2 text-center">
            <h3 className="text-[26px] leading-[1.1] md:text-[32px]">{achievements.areasHeading}</h3>
            <p className="text-[16px] font-medium text-muted">{achievements.areasSub}</p>
          </Appear>
          <ul className="grid items-start gap-3 md:grid-cols-2 md:gap-3">
            {achievements.roles.map((r, i) => (
              <Appear as="li" key={r.role} delay={(i % 2) * 80}>
                <details className="group rounded-[28px] bg-card">
                  {/* summary hanya berisi phrasing content + satu heading (HTML valid), ditata dengan grid */}
                  <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1.5 rounded-[28px] p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                    <h4 className="text-[19px] font-semibold leading-[1.15] tracking-[-0.04em] md:text-[21px]">{r.role}</h4>
                    <span className="row-span-2 grid h-9 w-9 place-items-center rounded-full bg-white" aria-hidden>
                      <Plus className="h-4 w-4 text-ink transition-transform duration-300 group-open:rotate-45" strokeWidth={2.5} />
                    </span>
                    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-[24px] font-semibold leading-none tracking-[-0.05em] text-ink">{r.headline.value}</span>
                      <span className="text-[14px] font-medium leading-[1.35] text-muted">{r.headline.label}</span>
                    </span>
                  </summary>
                  <div className="flex flex-col gap-4 px-5 pb-5 md:px-6 md:pb-6">
                    <p className="text-[13px] font-semibold text-muted">{r.tag}</p>
                    <ul className="flex flex-col gap-3">
                      {r.items.map((it) => (
                        <li key={it.text} className="flex gap-3">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue text-white" aria-hidden>
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          <div>
                            <p className="text-[15px] font-medium leading-[1.4] text-ink">{it.text}</p>
                            {it.slug ? (
                              <Link
                                href={`/work/${it.slug}`}
                                className="mt-1 inline-flex items-center gap-1 rounded-[10px] bg-card-2 px-2.5 py-1 text-[13px] font-semibold text-ink transition-colors hover:bg-card-3"
                                data-track="case_study_click"
                                data-location="expertise"
                                data-project={it.slug}
                              >
                                {it.company} <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            ) : (
                              <span className="mt-1 inline-block rounded-[10px] bg-card-2 px-2.5 py-1 text-[13px] font-semibold text-muted">{it.company}</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                    {r.image && (
                      <div className={`relative w-full overflow-hidden rounded-[28px] bg-white shadow-softer ${r.image.square ? "aspect-square" : "aspect-[16/9]"}`}>
                        <Image src={r.image.src} alt={r.image.alt} fill sizes="(max-width: 810px) 100vw, 560px" className="object-cover object-left-top" />
                      </div>
                    )}
                  </div>
                </details>
              </Appear>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
