import Image from "next/image";
import Link from "next/link";
import { achievements, tools } from "@/lib/content";
import Appear from "@/components/ui/Appear";
import { ToolGlyph } from "@/components/ui/Icons";
import { ArrowRight, Check, Plus } from "@/components/ui/Lucide";

/* "How I can help": 3 fokus layanan dulu, tools sebagai info pendukung,
   lalu 9 area keahlian dalam <details> (ringkas saat tertutup, detail + gambar saat dibuka).
   Teks detail tetap ada di HTML server-rendered. */
export default function Expertise() {
  return (
    <section id="expertise-section" className="section scroll-mt-28">
      <div className="wrap flex flex-col gap-[50px]">
        <Appear className="flex flex-col gap-5 text-center">
          <h2 className="text-[38px] leading-none md:text-[60px]">{achievements.heading}</h2>
        </Appear>

        <ul className="grid gap-3 md:gap-4 lg:grid-cols-3">
          {achievements.focus.map((f, i) => (
            <Appear as="li" key={f.title} delay={i * 90} className="flex h-full flex-col gap-3 rounded-[50px] bg-card p-7 shadow-soft">
              <p className="hand text-[24px] text-blue">#{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-[26px] leading-[1.1] md:text-[30px]">{f.title}</h3>
              <p className="text-[16px] font-medium leading-[1.4] text-muted">{f.body}</p>
            </Appear>
          ))}
        </ul>

        {/* Tools: pendukung */}
        <Appear className="flex flex-col items-center gap-4">
          <p className="text-[15px] font-semibold text-muted">{achievements.toolsLabel}</p>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {tools.map((t) => (
              <li key={t.name} className="group relative">
                <div className="grid h-14 w-14 place-items-center rounded-[22px] bg-white shadow-soft">
                  <ToolGlyph icon={t.icon} className="h-7 w-7 object-contain" />
                </div>
                <span className="hand pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[16px] text-blue opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
                  {t.name}
                </span>
                <span className="sr-only">{t.name}</span>
              </li>
            ))}
          </ul>
        </Appear>

        {/* 9 area keahlian */}
        <div className="flex flex-col gap-6">
          <Appear className="flex flex-col gap-2 text-center">
            <h3 className="text-[26px] leading-[1.1] md:text-[32px]">{achievements.areasHeading}</h3>
            <p className="text-[16px] font-medium text-muted">{achievements.areasSub}</p>
          </Appear>
          <ul className="grid items-start gap-3 md:grid-cols-2 md:gap-4">
            {achievements.roles.map((r, i) => (
              <Appear as="li" key={r.role} delay={(i % 2) * 80}>
                <details className="group rounded-[40px] bg-card shadow-soft">
                  {/* summary hanya berisi phrasing content + satu heading (HTML valid), ditata dengan grid */}
                  <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] gap-x-4 gap-y-2 rounded-[40px] p-6 md:p-7 [&::-webkit-details-marker]:hidden">
                    <span className="hand text-[20px] text-blue">#{r.tag}</span>
                    <span className="row-span-3 mt-1 grid h-10 w-10 place-items-center rounded-full bg-white shadow-softer" aria-hidden>
                      <Plus className="h-4 w-4 text-ink transition-transform duration-300 group-open:rotate-45" strokeWidth={2.5} />
                    </span>
                    <h4 className="text-[22px] font-semibold leading-[1.1] tracking-[-0.04em] md:text-[26px]">{r.role}</h4>
                    <span className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-[26px] font-semibold leading-none tracking-[-0.05em] text-ink">{r.headline.value}</span>
                      <span className="text-[14px] font-medium leading-[1.35] text-muted">{r.headline.label}</span>
                    </span>
                  </summary>
                  <div className="flex flex-col gap-4 px-6 pb-6 md:px-7 md:pb-7">
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
