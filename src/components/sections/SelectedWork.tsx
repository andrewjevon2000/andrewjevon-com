import Link from "next/link";
import { caseStudies } from "@/lib/content";
import SectionHead from "@/components/ui/SectionHead";

export default function SelectedWork() {
  return (
    <section id="work" className="py-[110px] max-md:py-[60px]">
      <div className="wrap">
        <SectionHead index="01" title="Selected Work" />

        {caseStudies.map((cs, i) => (
          <article
            key={cs.slug}
            className="group grid gap-[30px] border-t border-line py-[46px] md:grid-cols-[110px_1fr] max-md:gap-2.5"
          >
            <div
              className="font-mono text-[52px] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_var(--dimmer)] group-hover:text-accent group-hover:[-webkit-text-stroke:0]"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="text-[clamp(21px,2.6vw,30px)] font-medium">{cs.title}</h3>
              <p className="mb-5 mt-2 font-mono text-[13px] uppercase text-dim">
                {cs.role} · {cs.period} · {cs.market}
              </p>
              <div className="mb-5 grid gap-[14px] md:grid-cols-3">
                {cs.chapterStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-[12px] border border-line bg-panel px-[18px] py-4"
                  >
                    <div className="grad-text font-mono text-[clamp(18px,2vw,26px)] font-extrabold">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs text-dim">{s.label}</div>
                  </div>
                ))}
              </div>
              <Link
                href={`/work/${cs.slug}`}
                className="inline-flex items-center gap-2 font-sans text-sm text-accent"
              >
                Read case study{" "}
                <span className="transition-transform duration-250 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
