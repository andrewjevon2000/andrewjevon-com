import Image from "next/image";
import Link from "next/link";
import { caseStudies, selectedWork } from "@/lib/content";
import Appear from "@/components/ui/Appear";
import Carousel from "@/components/ui/Carousel";
import { ArrowRight } from "@/components/ui/Lucide";

/* Studi kasus sebagai slide gaya Apple: tile berwarna lembut setinggi layar HP,
   teks (klien, judul, angka, tautan) di atas, kartu grafik di bawah.
   Teks memudar saat slide digeser keluar (--vis dari Carousel). SSR penuh. */
const tints = { cyan: "bg-tint-cyan", blue: "bg-tint-blue", violet: "bg-tint-violet" } as const;

export default function SelectedWork() {
  const slides = selectedWork.slides;
  return (
    <section id="works-section" className="section scroll-mt-28 !px-0">
      <div className="flex flex-col gap-10">
        <Appear className="px-4 text-center">
          <h2 className="text-[38px] leading-none md:text-[60px]">{selectedWork.heading}</h2>
        </Appear>

        <div className="wrap px-4 md:px-10 xl:px-[120px]">
          <Carousel count={slides.length} prevLabel={selectedWork.prevLabel} nextLabel={selectedWork.nextLabel}>
            {slides.map((w) => {
              const cs = caseStudies.find((c) => c.slug === w.slug);
              if (!cs) return null;
              return (
                <li key={w.slug} className="slide w-[86%] shrink-0 snap-start md:w-[62%] lg:w-[46%]">
                  <article className={`flex h-full min-h-[520px] flex-col overflow-hidden rounded-[32px] md:min-h-[580px] ${tints[w.tint]}`}>
                    <div className="slide-text flex flex-col items-center gap-2 px-6 pt-10 text-center">
                      <p className="text-[13px] font-semibold text-muted">{cs.client}</p>
                      <h3 className="text-[24px] leading-[1.15] tracking-[-0.04em] md:text-[28px]">{w.title}</h3>
                      <p className="mt-2 text-[32px] font-semibold leading-none tracking-[-0.05em] text-ink md:text-[36px]">{w.metric.value}</p>
                      <p className="text-[14px] font-medium text-muted">{w.metric.label}</p>
                      <Link
                        href={`/work/${cs.slug}`}
                        className="btn btn-dark mt-4 px-5 py-3 text-[15px]"
                        data-track="case_study_click"
                        data-location="case_studies"
                        data-project={cs.slug}
                      >
                        {selectedWork.readLabel} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-center px-5 pb-6 pt-6">
                      <Image
                        src={w.card.src}
                        alt={cs.image.alt}
                        width={w.card.width}
                        height={w.card.height}
                        sizes="(max-width: 810px) 86vw, (max-width: 1200px) 62vw, 560px"
                        className="h-auto max-h-[260px] w-auto max-w-full md:max-h-[300px]"
                      />
                    </div>
                  </article>
                </li>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
