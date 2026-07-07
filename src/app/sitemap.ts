import type { MetadataRoute } from "next";
import { site, caseStudies } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: site.url,
    changeFrequency: "monthly",
    priority: 1,
  };
  const work = caseStudies.map((cs) => ({
    url: `${site.url}/work/${cs.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));
  return [home, ...work];
}
