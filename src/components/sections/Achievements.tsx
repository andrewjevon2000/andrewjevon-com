import Image from "next/image";
import Link from "next/link";
import { achievements, caseStudies } from "@/lib/content";
import Appear from "@/components/ui/Appear";

/* Achievement per role / jobdesk (bukan per perusahaan). Tiap kartu: nama role,
   satu angka utama, daftar capaian dengan label perusahaan (link ke deep dive bila ada).
   Di bawahnya baris "Deep dives" ke 4 halaman project. */
export default function Achievements() {
  return (
    <section id="works-section" className="section scroll-mt-20">
      <div className="wrap flex flex-col gap-[50px]">
        <Appear className="flex flex-col gap-5 text-center">
          <p className="hand text-[24px] text-blue">#{achievements.kicker}</p>
          <h1 className="text-[38px] leading-none md:text-[60px]">{achievements.heading}</h1>
          <p className="mx-auto max-w-[640px] text-[18px] font-medium leading-[1.2] text-muted">{achievements.sub}</p>
        </Appear>

        <ol className="grid gap-3 md:grid-cols-2 md:gap-4">
          {achievements.roles.map((r, i) => (
            <Appear as="li" key={r.role} delay={(i % 2) * 100} className="flex h-full flex-col gap-5 rounded-[50px] bg-card p-6 shadow-soft md:p-8">
              <div className="flex flex-col gap-2">
                <p className="hand text-[24px] text-blue">#{r.tag}</p>
                <h2 className="text-[26px] leading-none md:text-[32px]">{r.role}</h2>
              </div>
              <div className="rounded-[28px] bg-white p-5 shadow-softer">
                <p className="text-[36px] font-semibold leading-none tracking-[-0.05em] text-blue md:text-[44px]">{r.headline.value}</p>
                <p className="mt-2 text-[15px] font-medium leading-[1.35] text-muted">{r.headline.label}</p>
              </div>
              <ul className="flex flex-col gap-3">
                {r.items.map((it) => (
                  <li key={it.text} className="flex gap-3">
                    <span className="hand mt-1 shrink-0 text-[22px] leading-none text-blue" aria-hidden>
                      ✓
                    </span>
                    <div>
                      <p className="text-[15px] font-medium leading-[1.4] text-ink">{it.text}</p>
                      {it.slug ? (
                        <Link href={`/work/${it.slug}`} className="mt-1 inline-block rounded-[10px] bg-card-2 px-2.5 py-1 text-[13px] font-semibold text-ink transition-colors hover:bg-blue hover:text-white">
                          {it.company} →
                        </Link>
                      ) : (
                        <span className="mt-1 inline-block rounded-[10px] bg-card-2 px-2.5 py-1 text-[13px] font-semibold text-muted">{it.company}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Appear>
          ))}
        </ol>

        {/* Deep dives */}
        <div className="flex flex-col gap-6">
          <Appear className="flex flex-col gap-2 text-center md:text-left">
            <p className="hand text-[24px] text-blue">#{achievements.deepDivesLabel}</p>
            <h2 className="text-[26px] leading-none md:text-[32px]">Full case studies</h2>
          </Appear>
          <ul className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {caseStudies.map((cs, i) => (
              <Appear as="li" key={cs.slug} delay={i * 80}>
                <Link href={`/work/${cs.slug}`} className="group block h-full overflow-hidden rounded-[32px] bg-card-2 shadow-softer transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-card-3">
                    <Image src={cs.image.src} alt={cs.image.alt} fill sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 290px" className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-col gap-1.5 p-5">
                    <p className="hand text-[20px] text-blue">#{cs.result}</p>
                    <p className="text-[18px] font-semibold leading-[1.3] tracking-[-0.04em] text-ink">{cs.client}</p>
                  </div>
                </Link>
              </Appear>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
