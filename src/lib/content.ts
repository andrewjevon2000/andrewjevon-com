/**
 * content.ts — SINGLE SOURCE OF TRUTH untuk seluruh konten situs.
 *
 * Sumber: reference/prd.md (§5–§7b) + reference/prototype.html (approved 7 Jul 2026).
 * ATURAN (CLAUDE.md #2): dilarang mengarang/mengubah metrik. Angka mengikuti
 * format mentah before→after dari screenshot (mis. "1.25K → 16.6K"), bukan persen hitungan.
 */

/* ----------------------------------------------------------------------------
   Types
---------------------------------------------------------------------------- */

/** Potongan teks; `gradient: true` = di-render dengan .grad-text (aturan 90/10). */
export type TextPart = {
  text: string;
  gradient?: true;
};

/** Segmen paragraf; `bold: true` = <b> (warna --txt di atas body --dim). */
export type RichSegment = {
  text: string;
  bold?: true;
};

/** Stat dengan animasi count-up (hero). `countTo` = angka final. */
export type CountUpStat = {
  prefix?: string;
  countTo: number;
  suffix?: string;
  label: string;
};

/** Stat display biasa (chapter/case study) — value bisa non-numerik ("SPARC", "6.6 → 40.6%"). */
export type Stat = {
  value: string;
  label: string;
};

export type EvidenceItem = {
  type: "image" | "exhibit" | "pdf";
  src: string;
  caption: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  /** Judul chapter di home + halaman detail. */
  title: string;
  role: string;
  period: string;
  market: string;
  /** 3 stat besar di chapter (home) — juga dipakai di header case study. */
  chapterStats: [Stat, Stat, Stat];
  /** Context: 2–3 kalimat (PRD §6). */
  context: string;
  /** Problem: bullet 2–4. */
  problem: string[];
  /** What I did: bullet 3–6, verba aktif. */
  actions: string[];
  results: {
    narrative: string;
    stats: Stat[];
  };
  evidence: EvidenceItem[];
  tools: string[];
};

export type Capability = {
  icon: string;
  title: string;
  items: string[];
};

export type ExperienceItem = {
  date: string;
  role: string;
  company: string;
  desc: string;
};

export type Certification = {
  issuer: string;
  name: string;
};

/* ----------------------------------------------------------------------------
   Site / metadata
---------------------------------------------------------------------------- */

export const site = {
  name: "Andrew Jevon",
  domain: "andrewjevon.com",
  url: "https://andrewjevon.com",
  title: "Andrew Jevon — Technical Digital Marketer · SEO × Performance × Web",
  description:
    "Technical digital marketer with 4+ years running the web, SEO, and performance backbone of marketing teams — Indonesia, Philippines, US markets.",
  email: "andrewjevon2000@gmail.com",
  linkedin: "https://linkedin.com/in/andrewjevon",
  location: "Tangerang, Indonesia",
} as const;

export const nav = {
  logo: { text: "AJ", accent: "_" },
  links: [
    { label: "Work", href: "#work" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Experience", href: "#experience" },
    { label: "About", href: "#about" },
  ],
  cta: { label: "Get in touch", href: "#contact" },
} as const;

/* ----------------------------------------------------------------------------
   §5.1 Hero
---------------------------------------------------------------------------- */

export const hero = {
  kicker: "Andrew Jevon — Technical Digital Marketer",
  /** \n = line break di desktop. */
  headline: [
    { text: "I turn complex\nmarketing data\ninto " },
    { text: "growth", gradient: true },
    { text: "." },
  ] satisfies TextPart[],
  sub: "4+ years running the web, SEO, and performance backbone of marketing teams — across Indonesia, Philippines, and US markets.",
  ctas: {
    primary: { label: "View work ↓", href: "#work" },
    secondary: { label: "Get in touch", href: "#contact" },
  },
  stats: [
    {
      prefix: "+",
      countTo: 600,
      suffix: "%",
      label: "organic traffic growth MoM — MAKA Motors website revamp",
    },
    {
      prefix: "$",
      countTo: 160,
      suffix: "K+",
      label: "blended ad budget managed across Meta, Google, TikTok, YouTube",
    },
    {
      countTo: 20,
      suffix: "K+",
      label: "leads generated in 6 months for a new EV category",
    },
  ] satisfies CountUpStat[],
  /** Fragmen angka yang dibentuk particle field (DESIGN.md WebGL). */
  particleNumbers: ["600%", "40.6%", "13x"],
  photo: {
    src: "/images/Foto profil profesional.png",
    alt: "Andrew Jevon — technical digital marketer",
  },
  scrollHint: "scroll",
} as const;

/* ----------------------------------------------------------------------------
   §5.2 Selected Work — 5 case studies (urutan = urutan chapter)
---------------------------------------------------------------------------- */

export const caseStudies: CaseStudy[] = [
  {
    slug: "maka-motors",
    client: "MAKA Motors",
    title: "MAKA Motors — Scaling organic & paid for an EV startup",
    role: "Performance Marketing Strategist",
    period: "Jun 2024 – Sep 2025",
    market: "Indonesia",
    chapterStats: [
      { value: "+600%", label: "organic traffic MoM post website revamp" },
      {
        value: "6.6 → 40.6%",
        label: 'SEO visibility in 7 weeks — #1 for "motor listrik terbaik"',
      },
      { value: "1M+", label: "website visits · 600M+ impressions · 20K+ leads" },
    ],
    context:
      "MAKA Motors is an Indonesian EV startup launching Cavalry, an electric motorcycle in a category most Indonesians had never considered. Marketing had to build both the brand and the demand engine from scratch — across organic and paid.",
    problem: [
      "A brand-new product category with near-zero organic footprint and no existing search demand capture.",
      "The pre-revamp website was not built to rank or convert organic traffic.",
      "Paid budget across Meta, Google, TikTok, and YouTube needed a full-funnel structure to produce leads, not just reach.",
    ],
    actions: [
      "Led the SEO side of a full website revamp — architecture, on-page, and content built to rank.",
      "Grew SEO visibility from 6.6% to 40.6% in 7 weeks, taking #1 position for \"motor listrik terbaik\".",
      "Managed $160K+ blended ad budget across Meta, Google, TikTok, and YouTube for awareness, consideration, and conversion.",
      "Ran a Meta lead campaign producing 1,000+ qualified leads at under Rp10,000 per lead.",
      "Analyzed competitor traffic (Similarweb) to steer content and campaign positioning.",
      "Supported offline activation — IIMS booth campaign and a brand-ambassador collaboration with Duta (Sheila on 7).",
    ],
    results: {
      narrative:
        "The website revamp lifted organic traffic +600% month-over-month, and the combined organic + paid engine delivered category-scale demand for a new EV brand.",
      stats: [
        { value: "+600%", label: "organic traffic MoM post website revamp" },
        { value: "6.6 → 40.6%", label: "SEO visibility in 7 weeks" },
        { value: "1M+", label: "website visits" },
        { value: "600M+", label: "impressions across channels" },
        { value: "20K+", label: "leads in 6 months" },
        { value: "< Rp10K", label: "CPL — 1,000+ qualified leads from one Meta campaign" },
      ],
    },
    evidence: [
      {
        type: "image",
        src: "/images/MAKA Motors/grafik GSC MAKA Motors.jpeg",
        caption: "Google Search Console — organic growth after the website revamp",
      },
      {
        type: "image",
        src: "/images/MAKA Motors/grafik visibility MAKA Motors.jpeg",
        caption: "SEO visibility trend — 6.6% to 40.6% in 7 weeks",
      },
      {
        type: "image",
        src: "/images/MAKA Motors/grafik visibility top 100 MAKA Motors.jpeg",
        caption: "Keyword visibility — top 100 positions",
      },
      {
        type: "image",
        src: "/images/MAKA Motors/grafik organic search analysis competitor MAKA Motors.jpeg",
        caption: "Competitor organic search analysis (Similarweb)",
      },
      {
        type: "image",
        src: "/images/MAKA Motors/meta ads awareness - campaign.jpeg",
        caption: "Meta Ads — awareness campaign structure",
      },
      {
        type: "image",
        src: "/images/MAKA Motors/meta ads conversion.jpeg",
        caption: "Meta Ads — conversion funnel results",
      },
      {
        type: "image",
        src: "/images/MAKA Motors/Website MAKA Motors.png",
        caption: "makamotors.com after the revamp",
      },
      {
        type: "image",
        src: "/images/MAKA Motors/Poster MAKA Cavalry edisi collab Brand Ambassador Duta Shiela on 7.jpeg",
        caption: "MAKA Cavalry campaign — brand ambassador collab with Duta (Sheila on 7)",
      },
      {
        type: "pdf",
        src: "/images/MAKA Motors/SEO Monthly Report June 2025 MAKA Motors.pdf",
        caption: "SEO Monthly Report — June 2025",
      },
    ],
    tools: ["Meta Ads Manager", "Google Ads", "TikTok Ads", "GA4", "Search Console", "Semrush", "Similarweb"],
  },
  {
    slug: "verihubs",
    client: "Verihubs",
    title: "Verihubs — Technical SEO & AI ops for an identity-verification leader",
    role: "Freelance SEO Specialist",
    period: "Oct 2025 – now",
    market: "Indonesia + Philippines",
    chapterStats: [
      {
        value: "677 URLs",
        label: "keyword cannibalization audit, restructured for ranking consolidation",
      },
      {
        value: "2 clusters",
        label: "active negative-SEO attacks identified via backlink gap analysis",
      },
      {
        value: "AI toolkit",
        label: "Claude-assisted SEO ops: GSC reports, audits, compliance sweeps",
      },
    ],
    context:
      "Verihubs is an identity-verification (KYC/biometrics) company serving Indonesia and the Philippines. Years of content production had accumulated ranking conflicts, and the international expansion needed technically correct SEO foundations.",
    problem: [
      "Hundreds of URLs competing against each other for the same keywords, diluting rankings.",
      "Suspicious backlink patterns suggesting deliberate negative-SEO activity.",
      "ID + PH dual-market setup required correct hreflang and schema implementation.",
      "Manual SEO reporting and auditing consumed hours that should go to strategy.",
    ],
    actions: [
      "Audited 677 URLs for keyword cannibalization and restructured content for ranking consolidation.",
      "Identified 2 active negative-SEO attack clusters through backlink gap analysis.",
      "Implemented hreflang and JSON-LD schema fixes for the Indonesia + Philippines markets.",
      "Built a Claude-assisted SEO ops toolkit: automated GSC reporting, audits, and pre-publish compliance sweeps.",
    ],
    results: {
      narrative:
        "The engagement is ongoing. The cannibalization restructure, negative-SEO defense, and AI-assisted operations now run as a repeatable system — documented in the interactive exhibits below.",
      stats: [
        { value: "677 URLs", label: "cannibalization audit completed" },
        { value: "2 clusters", label: "negative-SEO attacks identified" },
        { value: "ID + PH", label: "hreflang & schema implementation" },
      ],
    },
    evidence: [
      {
        type: "exhibit",
        src: "/images/Verihubs/verihubs_cannibalization_exhibit.html",
        caption: "Interactive exhibit — 677-URL keyword cannibalization audit",
      },
      {
        type: "exhibit",
        src: "/images/Verihubs/verihubs_lead_quality_shift.html",
        caption: "Interactive exhibit — lead quality shift analysis",
      },
      {
        type: "exhibit",
        src: "/images/Verihubs/verihubs_ph_hreflang_schema_audit.html",
        caption: "Interactive exhibit — PH hreflang & schema audit",
      },
    ],
    tools: ["Search Console", "Ahrefs", "Screaming Frog", "Claude", "WordPress"],
  },
  {
    slug: "gnet",
    client: "GNET Indonesia",
    title: "GNET Indonesia — 13x organic clicks for building materials",
    role: "Performance Marketing Supervisor",
    period: "Aug 2023 – Jun 2024",
    market: "Indonesia",
    chapterStats: [
      { value: "1.25K → 16.6K", label: "organic clicks in 6 months (Google Search Console)" },
      { value: "67.5K → 1.06M", label: "organic impressions in the same period" },
      { value: "Rp26", label: "CPC — down from Rp300+ via Meta video campaign" },
    ],
    context:
      "GNET Indonesia is a building-materials brand competing in a market where distributors, not manufacturers, traditionally own the customer relationship. Digital had to make the brand searchable and reachable directly.",
    problem: [
      "Minimal organic presence: 1.25K clicks and 67.5K impressions per period baseline.",
      "The brand needed its own websites — built from zero — to own product search demand.",
      "Paid CPC above Rp300 made scale uneconomical.",
    ],
    actions: [
      "Led SEO and content strategy that grew organic clicks from 1.25K to 16.6K in 6 months.",
      "Led two end-to-end website builds — from structure to launch.",
      "Restructured Meta campaigns around video creative, driving CPC from Rp300+ down to Rp26.",
      "Ran GSC/GA4 reporting to steer content production toward rising queries.",
    ],
    results: {
      narrative:
        "Six months of SEO and content work multiplied organic clicks 13x and impressions nearly 16x, while the Meta video-campaign restructure cut CPC by an order of magnitude.",
      stats: [
        { value: "1.25K → 16.6K", label: "organic clicks in 6 months" },
        { value: "67.5K → 1.06M", label: "organic impressions" },
        { value: "Rp26", label: "CPC — from Rp300+" },
        { value: "2 websites", label: "built end-to-end" },
      ],
    },
    evidence: [
      {
        type: "image",
        src: "/images/p10_X16.jpg",
        caption: "Google Search Console — 1.25K → 16.6K clicks, 67.5K → 1.06M impressions",
      },
    ],
    tools: ["Search Console", "GA4", "Meta Ads Manager", "WordPress", "Semrush"],
  },
  {
    slug: "yobo-labs",
    client: "Yobo Labs",
    title: "Yobo Labs — Full-funnel performance for a US-market SaaS",
    role: "Performance Marketing",
    period: "Sep 2025 – now",
    market: "US + Indonesia",
    chapterStats: [
      { value: "200+ MQLs", label: "converted into contracts worth hundreds of millions IDR" },
      { value: "CRM v1.4", label: "lead scoring framework across 4 qualification dimensions" },
      { value: "SPARC", label: "repeatable content framework documented for GTM campaigns" },
    ],
    context:
      "Yobo Labs runs SaaS products for the US market with operations in Indonesia. The mandate: build a full-funnel performance engine where lead volume matters less than lead quality reaching sales.",
    problem: [
      "Lead flow existed but qualification was inconsistent — sales time went to the wrong leads.",
      "Campaign content was produced ad-hoc, with no repeatable framework across GTM pushes.",
    ],
    actions: [
      "Ran full-funnel US-market performance operations across paid channels.",
      "Designed the CRM lead-scoring framework (v1.4) across 4 qualification dimensions.",
      "Documented SPARC, a repeatable content framework for GTM campaigns.",
    ],
    results: {
      narrative:
        "The engagement is ongoing. 200+ MQLs have converted into contracts worth hundreds of millions IDR, with scoring and content now running on documented systems.",
      stats: [
        { value: "200+", label: "MQLs converted into contracts" },
        { value: "4", label: "qualification dimensions in CRM scoring v1.4" },
        { value: "SPARC", label: "content framework documented for GTM" },
      ],
    },
    /* Data mentah Yobo (deals tracker, ads CSV) = internal — hanya agregat yang tampil (PRD §7). */
    evidence: [],
    tools: ["Meta Ads Manager", "Google Ads", "HubSpot", "GA4"],
  },
  {
    slug: "ykk-ap",
    client: "YKK AP Sinar Fortuna",
    title: "YKK AP Sinar Fortuna — High-value B2B leads at 1,300% ROI",
    role: "Digital Marketing Freelance",
    period: "2023 – 2025",
    market: "Indonesia",
    chapterStats: [
      { value: "1,300%", label: "estimated ROI — Rp500M-avg project leads at Rp20K per result" },
      { value: "1,800+", label: "WhatsApp conversations via Meta Ads · >45% chat CVR" },
      { value: "+147%", label: "organic clicks (69→216) in 2 months of SEO work" },
    ],
    context:
      "YKK AP Sinar Fortuna sells premium architectural products where a single project averages around Rp500M. The goal: reach architects and project owners directly through digital, at a cost that makes B2B economics trivial.",
    problem: [
      "High-value, low-volume B2B leads — generic lead campaigns produce noise, not projects.",
      "Long consideration cycles need a conversational channel, not a form.",
      "Minimal organic search presence for high-intent product queries.",
    ],
    actions: [
      "Built Meta Ads campaigns routing to WhatsApp — 1,800+ conversations at ~Rp20K per result.",
      "Qualified conversations at >45% chat conversion rate.",
      "Ran SEO improvements that grew organic clicks 69 → 216 and impressions 4.7K → 12.5K in 2 months (Jun–Jul 2025).",
    ],
    results: {
      narrative:
        "With Rp500M average project value against ~Rp20K per WhatsApp lead, estimated campaign ROI reached 1,300% — and the SEO layer added compounding organic demand.",
      stats: [
        { value: "1,300%", label: "estimated ROI" },
        { value: "1,800+", label: "WhatsApp conversations" },
        { value: ">45%", label: "chat conversion rate" },
        { value: "69 → 216", label: "organic clicks in 2 months" },
      ],
    },
    evidence: [
      {
        type: "image",
        src: "/images/YKK AP Sinar Fortuna/GSC 12 month ykk.png",
        caption: "Google Search Console — 12-month organic performance",
      },
    ],
    tools: ["Meta Ads Manager", "WhatsApp Business", "Search Console", "WordPress"],
  },
];

/* ----------------------------------------------------------------------------
   §5.3 Capabilities
---------------------------------------------------------------------------- */

export const capabilities: Capability[] = [
  {
    icon: "</>",
    title: "SEO & Technical",
    items: [
      "Technical audits & cannibalization fixes",
      "Schema (JSON-LD) & hreflang implementation",
      "GSC / GA4 reporting & analysis",
      "AI Overview & GEO optimization",
    ],
  },
  {
    icon: "↗",
    title: "Performance Marketing",
    items: [
      "Meta, Google, TikTok Ads at scale",
      "Funnel architecture & CRO",
      "Budget management ($160K+ blended)",
      "Attribution & pixel-based tracking",
    ],
  },
  {
    icon: "⚙",
    title: "Web & AI Operations",
    items: [
      "4 end-to-end website builds shipped",
      "WordPress CMS ops & Core Web Vitals",
      "Claude-assisted SEO ops toolkit",
      "Workflow automation & QC systems",
    ],
  },
];

/* ----------------------------------------------------------------------------
   §5.4 Experience Timeline — 7 posisi
---------------------------------------------------------------------------- */

export const experience: ExperienceItem[] = [
  {
    date: "OCT 2025 — NOW",
    role: "Freelance SEO Specialist",
    company: "Verihubs",
    desc: "677-URL cannibalization audit, hreflang & schema fixes, AI-assisted SEO operations for ID + PH markets.",
  },
  {
    date: "SEP 2025 — NOW",
    role: "Performance Marketing",
    company: "Yobo Labs",
    desc: "Full-funnel US market ops — 200+ MQLs converted into contracts worth hundreds of millions IDR.",
  },
  {
    date: "JUN 2024 — SEP 2025",
    role: "Performance Marketing Strategist",
    company: "MAKA Motors",
    desc: "$160K+ blended budget, 600M+ impressions, website revamp driving +600% organic traffic MoM.",
  },
  {
    date: "AUG 2023 — JUN 2024",
    role: "Performance Marketing Supervisor",
    company: "GNET Indonesia",
    desc: "13x organic clicks growth, CPC down to Rp26, led two end-to-end website builds.",
  },
  {
    date: "2023 — 2025",
    role: "Digital Marketing Freelance",
    company: "YKK AP Sinar Fortuna",
    desc: "1,800+ WhatsApp conversations for Rp500M-avg project leads — est. 1,300% ROI.",
  },
  {
    date: "FEB — AUG 2023",
    role: "Digital Marketing Specialist",
    company: "Lixil TOSTEM",
    desc: "+447% Instagram follower growth in 90 days through structured content pillars.",
  },
  {
    date: "SEP 2021 — NOV 2022",
    role: "Social Media Specialist",
    company: "Indocryptoid",
    desc: "600+ pieces of content published across a year of daily crypto education & news.",
  },
];

/* ----------------------------------------------------------------------------
   §5.5 Toolbox — 2 baris marquee (arah berlawanan)
---------------------------------------------------------------------------- */

export const toolbox: [string[], string[]] = [
  [
    "Google Ads",
    "Meta Ads Manager",
    "TikTok Ads",
    "GA4",
    "Google Tag Manager",
    "Search Console",
    "Semrush",
    "Ahrefs",
    "Screaming Frog",
  ],
  [
    "WordPress",
    "Figma",
    "Claude",
    "Similarweb",
    "Canva",
    "Photoshop",
    "HubSpot",
    "Mailchimp",
    "AnswerThePublic",
  ],
];

/* ----------------------------------------------------------------------------
   §5.6 About + Certifications
---------------------------------------------------------------------------- */

export const about = {
  heading: "Beyond the numbers",
  paragraphs: [
    [
      { text: "I started in " },
      { text: "interior design", bold: true },
      {
        text: " (Universitas Tarumanagara, GPA 3.75) — where I learned that great work is about composing complexity into clarity. That instinct now drives how I build marketing systems.",
      },
    ],
    [
      { text: "Today I work at the intersection of " },
      { text: "creativity, data, and growth", bold: true },
      {
        text: ": equally comfortable debugging a JSON-LD schema, restructuring a 677-URL content architecture, or managing a $160K ad budget.",
      },
    ],
    [
      { text: "I build " },
      { text: "AI-assisted workflows", bold: true },
      {
        text: " (Claude) that automate the boring parts of SEO ops — so the thinking happens where it matters.",
      },
    ],
  ] satisfies RichSegment[][],
  photo: {
    src: "/images/Pengalaman berkunjung ke Google Office Jakarta.jpeg",
    alt: "Andrew Jevon at the Google Office, Jakarta",
  },
} as const;

export const certifications: Certification[] = [
  { issuer: "RevoU", name: "Full-Stack Digital Marketing" },
  { issuer: "Google Skillshop", name: "Ads Search" },
  { issuer: "Rakamin", name: "Paid Ads" },
  { issuer: "HubSpot", name: "Social Media Marketing" },
  { issuer: "Semrush", name: "SEO Principles" },
  { issuer: "Google", name: "Digital Garage" },
];

/* ----------------------------------------------------------------------------
   §5.7 Contact / Footer
---------------------------------------------------------------------------- */

export const contact = {
  heading: [
    { text: "Let's build something\nthat " },
    { text: "grows", gradient: true },
    { text: "." },
  ] satisfies TextPart[],
  sub: "Open to full-time, freelance, and consulting — Tangerang, Indonesia · remote-friendly.",
  email: site.email,
  emailCopyLabel: "⧉ copy",
  emailCopiedLabel: "✓ copied",
  linkedin: { label: "LinkedIn ↗", href: site.linkedin },
} as const;

export const footer = {
  copyright: `© 2026 Andrew Jevon · ${site.domain}`,
  credit: "Designed & built by Andrew Jevon — with Claude Code, Next.js & Three.js",
} as const;

/* ----------------------------------------------------------------------------
   Helpers
---------------------------------------------------------------------------- */

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

/** Case study berikutnya (untuk CTA "next case study", wrap-around). */
export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const i = caseStudies.findIndex((cs) => cs.slug === slug);
  if (i === -1) return undefined;
  return caseStudies[(i + 1) % caseStudies.length];
}
