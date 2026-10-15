import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getNextCaseStudy, site } from "@/lib/content";
import { articleSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Appear from "@/components/ui/Appear";
import { ToolGlyph } from "@/components/ui/Icons";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/Lucide";
import { Bars, Brief, Decisions, Evidence, Exhibits, FunnelBlock, Highlights, LearningsBlock, MergeBlock, Research, SiteTree, TilesBlock } from "@/components/work/CaseBlocks";
import SectionChips from "@/components/work/SectionChips";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.client} · Case Study`;
  const description = cs.subtitle;
  const url = `${site.url}/work/${cs.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

/* Halaman project: struktur situs live (heading + tools → gambar → kartu tag →
   konteks / challenge / what I did / results) + blok bukti: angka kunci, riset,
   keputusan desain, chart, galeri screenshot, exhibit. */
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
  const sections = [
    { id: "story", label: "Story", show: true },
    { id: "research", label: "Research", show: !!cs.research },
    { id: "structure", label: "Structure", show: !!(cs.tree || cs.tiles) },
    { id: "journey", label: "Journey", show: !!cs.funnel },
    { id: "inventory", label: "Inventory", show: !!cs.merge },
    { id: "decisions", label: "Decisions", show: !!cs.decisions },
    { id: "result", label: "Result", show: !!cs.chart },
    { id: "evidence", label: "Evidence", show: cs.evidence.length > 0 },
    { id: "exhibits", label: "Exhibits", show: !!cs.exhibits },
    { id: "learned", label: "Learned", show: true },
  ].filter((x) => x.show).map(({ id, label }) => ({ id, label }));
  const body = "text-[18px] font-medium leading-[1.3] text-muted md:text-[22px] md:font-semibold";
  const h2 = "text-[22px] leading-none md:text-[32px]";

  return (
    <>
      <JsonLd data={articleSchema(cs)} />
      <Nav />
      <main className="px-4 pb-[120px] pt-[150px] md:px-10 md:pt-[200px] xl:px-[120px]">
        <div className="wrap flex flex-col gap-20">
          {/* Heading + tools + gambar */}
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col gap-8">
                <Link href="/#works-section" className="btn btn-light self-start">
                  <ArrowLeft /> Back to Home
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
                    <li key={t} className="grid h-20 w-20 place-items-center rounded-[32px] bg-white shadow-soft">
                      <ToolGlyph icon={t} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Appear className="relative aspect-[343/193] w-full overflow-hidden rounded-[32px] bg-card-3 shadow-soft md:aspect-[1200/674] md:rounded-[70px]">
              <Image
                src={cs.image.src}
                alt={cs.image.alt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
              />
            </Appear>
          </div>

          {/* Kartu tag */}
          <ul className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-4">
            {tags.map(([k, v], i) => (
              <Appear as="li" key={k} delay={i * 80} className="flex h-full flex-col items-center gap-2.5 rounded-[50px] bg-white p-[22px] text-center shadow-softer">
                <p className="hand text-[24px] uppercase text-blue">#{k}</p>
                <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em]">{v}</p>
              </Appear>
            ))}
          </ul>

          {/* Angka kunci + ringkasan */}
          <Highlights items={cs.highlights} />
          <Brief brief={cs.brief} />

          <SectionChips items={sections} />

          {/* Cerita */}
          <Appear>
            <article id="story" className="flex scroll-mt-40 flex-col gap-6">
              <div className="flex flex-col gap-3">
                {cs.context.map((c) => (
                  <p key={c} className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em] text-ink">{c}</p>
                ))}
              </div>
              <h2 className={h2}>The challenge</h2>
              <ul className={`list-disc pl-6 ${body}`}>
                {cs.challenge.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <h2 className={h2}>What I did</h2>
              <ul className={`list-disc pl-6 ${body}`}>
                {cs.actions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <h2 className={h2}>The results</h2>
              <ul className={`list-disc pl-6 ${body}`}>
                {cs.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </article>
          </Appear>

          {cs.research && <div id="research" className="scroll-mt-40"><Research table={cs.research} /></div>}
          {cs.tree && <div id="structure" className="scroll-mt-40"><SiteTree tree={cs.tree} /></div>}
          {cs.tiles && <div id={cs.tree ? "structure-2" : "structure"} className="scroll-mt-40"><TilesBlock tiles={cs.tiles} /></div>}
          {cs.funnel && <div id="journey" className="scroll-mt-40"><FunnelBlock funnel={cs.funnel} /></div>}
          {cs.merge && <div id="inventory" className="scroll-mt-40"><MergeBlock merge={cs.merge} /></div>}
          {cs.decisions && <div id="decisions" className="scroll-mt-40"><Decisions items={cs.decisions} /></div>}
          {cs.chart && <div id="result" className="scroll-mt-40"><Bars chart={cs.chart} /></div>}
          {cs.evidence.length > 0 && <div id="evidence" className="scroll-mt-40"><Evidence items={cs.evidence} /></div>}
          {cs.exhibits && <div id="exhibits" className="scroll-mt-40"><Exhibits items={cs.exhibits} /></div>}
          <div id="learned" className="scroll-mt-40"><LearningsBlock learnings={cs.learnings} /></div>

          {/* CTA */}
          <Appear className="flex flex-wrap items-center gap-3">
            {cs.liveUrl && (
              <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
                Live Preview <ArrowUpRight />
              </a>
            )}
            {next && (
              <Link href={`/work/${next.slug}`} className="btn btn-light">
                Next: {next.client} <ArrowRight />
              </Link>
            )}
            <Link href="/#works-section" className="btn btn-light">
              All work
            </Link>
          </Appear>
        </div>
      </main>
      <Footer />
    </>
  );
}
