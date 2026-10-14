/* JSON-LD builders (PRD §9) — Person + WebSite di home, Article di case study.
   Semua konten dari content.ts; tidak mengarang data. */

import { site, caseStudies, type CaseStudy } from "./content";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: site.jobTitle,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tangerang",
      addressCountry: "ID",
    },
    sameAs: [site.linkedin],
    knowsAbout: [
      "UX Design",
      "Information Architecture",
      "SEO",
      "Technical SEO",
      "Performance Marketing",
      "Google Ads",
      "Meta Ads",
      "Web Analytics",
      "Conversion Rate Optimization",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.title,
    url: site.url,
    description: site.description,
    author: { "@type": "Person", name: site.name },
  };
}

export function articleSchema(cs: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.context,
    url: `${site.url}/work/${cs.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name },
    about: cs.client,
    articleSection: "Case study",
  };
}

/** Daftar semua case study untuk breadcrumb/collection bila diperlukan. */
export function itemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: caseStudies.map((cs, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: cs.title,
      url: `${site.url}/work/${cs.slug}`,
    })),
  };
}
