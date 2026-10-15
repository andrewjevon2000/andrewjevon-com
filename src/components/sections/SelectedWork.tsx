import Image from "next/image";
import Link from "next/link";
import { caseStudies, selectedWork, type WorkCard } from "@/lib/content";
import Appear from "@/components/ui/Appear";
import { ArrowRight, ChevronDown } from "@/components/ui/Lucide";

/* 3 studi kasus unggulan. Tiap kartu: nama project, grafik asli, judul, 1 metrik + sumber, link.
   "View all case studies" = <details> native: daftar tambahan di homepage, tanpa halaman baru. */

function Card({ w, location, wide }: { w: WorkCard; location: string; wide?: boolean }) {
  const cs = caseStudies.find((c) => c.slug === w.slug);
  if (!cs) return null;
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[50px] bg-card shadow-soft md:flex-row ${wide ? "" : "lg:flex-col"}`}
    >
      <div
        className={`relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-card-3 md:aspect-auto md:min-h-[320px] md:w-[46%] ${
          wide ? "" : "lg:aspect-[16/10] lg:min-h-0 lg:w-full"
        }`}
      >
        <Image
          src={cs.image.src}
          alt={cs.image.alt}
          fill
          sizes="(max-width: 810px) 100vw, (max-width: 1200px) 46vw, 380px"
          className="object-cover object-left-top"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <p className="text-[15px] font-semibold text-muted">{cs.client}</p>
        <h3 className="text-[22px] leading-[1.15] tracking-[-0.04em] md:text-[24px]">{w.title}</h3>
        <div className="rounded-[28px] bg-white p-5 shadow-softer">
          <p className="text-[32px] font-semibold leading-none tracking-[-0.05em] text-ink">{w.metric.value}</p>
          <p className="mt-2 text-[15px] font-medium leading-[1.35] text-muted">
            {w.metric.label} · {w.metric.source}
          </p>
        </div>
        <Link
          href={`/work/${cs.slug}`}
          className="btn btn-dark mt-auto self-start px-5"
          data-track="case_study_click"
          data-location={location}
          data-project={cs.slug}
        >
          {selectedWork.readLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export default function SelectedWork() {
  return (
    <section id="works-section" className="section scroll-mt-28">
      <div className="wrap flex flex-col gap-[50px]">
        <Appear className="text-center">
          <h2 className="text-[38px] leading-none md:text-[60px]">{selectedWork.heading}</h2>
        </Appear>

        <ul className="grid gap-4 lg:grid-cols-3">
          {selectedWork.featured.map((w, i) => (
            <Appear as="li" key={w.slug} delay={i * 90}>
              <Card w={w} location="selected_work" />
            </Appear>
          ))}
        </ul>

        <details className="group">
          <summary className="btn btn-light mx-auto flex w-fit cursor-pointer list-none border border-card-3 px-5 [&::-webkit-details-marker]:hidden">
            {selectedWork.moreLabel}
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <ul className="mt-6 grid gap-4">
            {selectedWork.more.map((w) => (
              <li key={w.slug}>
                <Card w={w} location="all_case_studies" wide />
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
