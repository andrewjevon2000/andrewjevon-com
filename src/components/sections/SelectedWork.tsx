import Image from "next/image";
import Link from "next/link";
import { caseStudies, selectedWork, type WorkCard } from "@/lib/content";
import Appear from "@/components/ui/Appear";
import { ArrowRight, ChevronDown } from "@/components/ui/Lucide";

/* 3 studi kasus unggulan, gaya tile Apple: tile berwarna lembut dengan grafik di tengah,
   lalu klien, judul satu baris, satu angka, tautan teks.
   "View all case studies" = <details> native: daftar tambahan di homepage, tanpa halaman baru. */

function Card({ w, location }: { w: WorkCard; location: string }) {
  const cs = caseStudies.find((c) => c.slug === w.slug);
  if (!cs) return null;
  return (
    <article className="flex h-full flex-col gap-4">
      {/* Tile: latar lembut, grafik di tengah (gambar sudah disusun begitu) */}
      <Link href={`/work/${cs.slug}`} className="group block" tabIndex={-1} aria-hidden>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] bg-card-3">
          <Image
            src={cs.image.src}
            alt=""
            fill
            sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </Link>
      {/* Tiga tingkat teks: klien, judul, angka */}
      <div className="flex flex-col gap-1.5 px-1 text-center">
        <p className="text-[13px] font-semibold text-muted">{cs.client}</p>
        <h3 className="text-[22px] leading-[1.15] tracking-[-0.04em] md:text-[24px]">{w.title}</h3>
        <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.05em] text-ink md:text-[32px]">{w.metric.value}</p>
        <p className="text-[14px] font-medium text-muted">{w.metric.label}</p>
        <Link
          href={`/work/${cs.slug}`}
          className="mx-auto mt-3 inline-flex items-center gap-1 text-[16px] font-semibold text-ink underline-offset-4 hover:underline"
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

        <ul className="grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-6">
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
          <ul className="mx-auto mt-8 grid max-w-[380px] gap-4">
            {selectedWork.more.map((w) => (
              <li key={w.slug}>
                <Card w={w} location="all_case_studies" />
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
