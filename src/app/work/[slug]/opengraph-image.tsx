import { caseStudies, getCaseStudy } from "@/lib/content";
import { OG_SIZE, OG_CONTENT_TYPE, ogImageResponse } from "@/lib/og";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export const alt = "Case study — Andrew Jevon";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  return ogImageResponse({
    eyebrow: "CASE STUDY · andrewjevon.com",
    title: cs?.client ?? "Andrew Jevon",
    subtitleLead: cs ? `${cs.role} — ` : "Technical Digital Marketer — ",
    subtitleAccent: cs?.market ?? "SEO × Performance × Web",
  });
}
