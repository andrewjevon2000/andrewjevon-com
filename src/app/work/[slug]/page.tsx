import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getNextCaseStudy, site } from "@/lib/content";
import { articleSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import EvidenceGallery from "@/components/work/EvidenceGallery";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.client} — ${cs.role}`;
  const description = cs.context;
  const url = `${site.url}/work/${cs.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">{title}</h2>
      {children}
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const next = getNextCaseStudy(slug);

  return (
    <>
      <JsonLd data={articleSchema(cs)} />
      <Nav />
      <main className="wrap max-w-[880px] pb-24 pt-[120px]">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-dim transition-colors hover:text-accent"
        >
          ← All work
        </Link>

        {/* Header */}
        <header className="mt-8 border-b border-line pb-12">
          <h1 className="text-[clamp(30px,5vw,52px)] font-medium leading-[1.1]">{cs.title}</h1>
          <p className="mt-5 font-mono text-[13px] uppercase text-dim">
            {cs.role} · {cs.period} · {cs.market}
          </p>
        </header>

        <Block title="Context">
          <p className="text-[17px] leading-relaxed text-dim">{cs.context}</p>
        </Block>

        <Block title="The problem">
          <ul className="flex flex-col gap-3">
            {cs.problem.map((p) => (
              <li
                key={p}
                className="relative pl-[22px] text-dim before:absolute before:left-0 before:text-accent before:content-['—']"
              >
                {p}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="What I did">
          <ul className="flex flex-col gap-3">
            {cs.actions.map((a) => (
              <li
                key={a}
                className="relative pl-[22px] text-dim before:absolute before:left-0 before:text-accent before:content-['→']"
              >
                {a}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Results">
          <div className="mb-6 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
            {cs.results.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-[14px] border border-line bg-[image:linear-gradient(180deg,var(--panel),transparent)] p-5"
              >
                <div className="grad-text font-mono text-[clamp(20px,2.4vw,28px)] font-extrabold">
                  {s.value}
                </div>
                <div className="mt-2 text-xs text-dim">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-[17px] leading-relaxed text-dim">{cs.results.narrative}</p>
        </Block>

        {cs.evidence.length > 0 && (
          <Block title="Evidence">
            <EvidenceGallery items={cs.evidence} />
          </Block>
        )}

        <Block title="Tools used">
          <div className="flex flex-wrap gap-2">
            {cs.tools.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-4 py-2 font-mono text-[13px] text-dim"
              >
                {t}
              </span>
            ))}
          </div>
        </Block>

        {/* Next case study */}
        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="group mt-8 flex items-center justify-between gap-4 rounded-[16px] border border-line bg-panel p-8 transition-colors hover:border-accent"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-dimmer">
                Next case study
              </p>
              <p className="mt-2 text-[clamp(18px,2.4vw,24px)] font-medium">{next.title}</p>
            </div>
            <span className="font-mono text-2xl text-accent transition-transform duration-250 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        )}
      </main>
      <Footer />
    </>
  );
}
