import Image from "next/image";
import Link from "next/link";
import { caseStudies, works } from "@/lib/content";
import { SquiggleArrow } from "@/components/ui/Icons";

function Note({ text }: { text: string }) {
  return (
    <span className="hand inline-flex items-start gap-1 pl-1 text-[17px] text-blue" aria-hidden>
      <SquiggleArrow className="h-[29px] w-[18px] text-blue" />
      <span className="pt-7">{text}</span>
    </span>
  );
}

export default function SelectedWork() {
  return (
    <section id="works-section" className="section scroll-mt-20">
      <div className="wrap grid gap-[50px] lg:grid-cols-[410px_1fr] lg:items-start lg:justify-between lg:gap-6">
        <div className="flex flex-col gap-8 text-center lg:text-left">
          <div className="flex flex-col gap-5">
            <p className="hand text-[24px] text-blue">#{works.kicker}</p>
            <h1 className="text-[38px] leading-none md:text-[60px]">{works.heading}</h1>
            <p className="text-[18px] font-medium leading-[1.2] text-muted">{works.sub}</p>
          </div>
          <div className="hidden flex-col items-start lg:flex">
            <a href={works.cta.href} className="btn btn-dark">
              {works.cta.label}
            </a>
            <Note text={works.note} />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:max-w-[766px]">
          {caseStudies.map((cs, i) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className={`group block overflow-hidden rounded-[50px] bg-card-2 shadow-softer transition-transform duration-300 hover:-translate-y-1 ${
                i % 2 === 1 ? "md:mt-10" : ""
              }`}
            >
              <div className="relative h-[250px] w-full overflow-hidden rounded-[50px] bg-card-3">
                <Image
                  src={cs.image.src}
                  alt={cs.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 375px"
                  className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col gap-4 p-6">
                <p className="hand text-[24px] text-blue">#{cs.tag}</p>
                <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em] text-ink">{cs.client}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center lg:hidden">
          <a href={works.cta.href} className="btn btn-dark">
            {works.cta.label}
          </a>
          <Note text={works.note} />
        </div>
      </div>
    </section>
  );
}
