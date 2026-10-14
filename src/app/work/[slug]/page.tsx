import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getNextCaseStudy, site } from "@/lib/content";
import { articleSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { ArrowLeftIcon, ToolGlyph } from "@/components/ui/Icons";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.client} — Case Study`;
  const description = cs.subtitle;
  const url = `${site.url}/work/${cs.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

/* Halaman project mengikuti layout live: heading + tools → gambar besar →
   4 kartu tag (Period/Role/Market/Result) → konteks, challenge, what I did, results. */
export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const next = getNextCaseStudy(slug);
  const tags = [
    ["Period", cs.period],
    ["Role", cs.role],
    ["Market", cs.market],
    ["Result", cs.result],
  ];

  return (
    <>
      <JsonLd data={articleSchema(cs)} />
      <Nav />
      <main className="px-4 pb-[120px] pt-[150px] md:px-10 md:pt-[200px] xl:px-[120px]">
        <div className="wrap flex flex-col gap-20">
          {/* Heading + images */}
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col gap-8">
                <Link href="/#works-section" className="btn btn-light self-start">
                  <ArrowLeftIcon /> Back to Home
                </Link>
                <div className="flex flex-col gap-4">
                  <p className="hand text-[24px] text-blue">#{cs.tag}</p>
                  <h1 className="text-[38px] leading-none md:text-[60px]">{cs.client}</h1>
                  <p className="max-w-[640px] text-[18px] font-medium leading-[1.2] text-muted">{cs.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-col gap-6 lg:max-w-[360px] lg:items-end">
                <p className="hand text-[28px] text-muted lg:text-right">{cs.toolsLine}</p>
                <ul className="flex gap-2.5">
                  {cs.toolIcons.map((t) => (
                    <li key={t} className="grid h-20 w-20 place-items-center rounded-[32px] bg-card-2 shadow-soft">
                      <ToolGlyph icon={t} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative aspect-[343/193] w-full overflow-hidden rounded-[32px] bg-card-3 shadow-soft md:aspect-[1200/674] md:rounded-[70px]">
              <Image
                src={cs.image.src}
                alt={cs.image.alt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Small tags */}
          <ul className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-4">
            {tags.map(([k, v]) => (
              <li key={k} className="flex flex-col items-center gap-2.5 rounded-[50px] bg-white p-[22px] text-center shadow-softer">
                <p className="hand text-[24px] uppercase text-blue">#{k}</p>
                <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em]">{v}</p>
              </li>
            ))}
          </ul>

          {/* About + process */}
          <article className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em] text-ink">{cs.context}</p>
              <h2 className="text-[22px] leading-none md:text-[32px]">The challenge</h2>
              <p className="text-[18px] font-medium leading-[1.3] text-muted md:text-[22px] md:font-semibold">{cs.challenge}</p>
              <h2 className="text-[22px] leading-none md:text-[32px]">What I did</h2>
              <ul className="list-disc pl-6 text-[18px] font-medium leading-[1.3] text-muted md:text-[22px] md:font-semibold">
                {cs.actions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <h2 className="text-[22px] leading-none md:text-[32px]">The results</h2>
              <p className="text-[18px] font-medium leading-[1.3] text-muted md:text-[22px] md:font-semibold">{cs.results}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {cs.liveUrl && (
                <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
                  Live Preview
                </a>
              )}
              {next && (
                <Link href={`/work/${next.slug}`} className="btn btn-light">
                  Next: {next.client} →
                </Link>
              )}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
