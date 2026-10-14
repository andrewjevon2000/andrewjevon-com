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

/** Visual bukti di atas halaman case study (proof-first). */
export type ProofVisual =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "bars"; title: string; bars: { label: string; value: number }[]; legend: string }
  | { kind: "funnel"; title: string; steps: { label: string; detail: string; win?: true }[] };

/** Satu blok konten UX; semua field opsional selain id/label/title. */
export type UxSection = {
  id: string;
  /** Label pendek untuk kicker & chip navigasi mobile. */
  label: string;
  title: TextPart[];
  intro?: string;
  /** Tabel data → kartu bertumpuk di mobile. */
  table?: { columns: string[]; rows: string[][]; source: string };
  points?: { title: string; body: string }[];
  /** Peta situs sederhana (diturunkan dari navigasi live). */
  tree?: {
    root: { label: string; note: string };
    branches: { label: string; note: string; leaves: string[]; conversion?: true }[];
    caption: string;
  };
  steps?: { title: string; body: string }[];
};

export type DesignDecision = {
  title: string;
  body: string;
  /** Bukti terukur / yang bisa dilihat — bukan opini. */
  evidence: string;
};

/** Lapisan UX case study (proof-first). Hanya fakta dari content/achievements doc. */
export type UxCaseStudy = {
  tag: string;
  headline: TextPart[];
  subhead: string;
  proof: ProofVisual;
  badges: [Stat, Stat, Stat];
  brief: { problem: string; approach: string };
  sections: UxSection[];
  decisions?: DesignDecision[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  /** Judul chapter di home + halaman detail. */
  title: string;
  /** Format UX proof-first; tanpa ini halaman memakai layout lama. */
  ux?: UxCaseStudy;
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
  title: "Andrew Jevon — UX × Growth · Web, SEO & Conversion",
  description:
    "I design websites and journeys around what people actually search for — 4+ years in technical SEO, performance marketing and website builds across Indonesia, Philippines, and US markets.",
  email: "andrewjevon2000@gmail.com",
  linkedin: "https://linkedin.com/in/andrewjevon",
  location: "Tangerang, Indonesia",
} as const;

export const nav = {
  logo: { text: "Andrew Jevon", accent: "" },
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
  kicker: "UX × Growth",
  /** \n = line break di desktop. */
  headline: [
    { text: "I design websites\naround what people\nactually " },
    { text: "search for", gradient: true },
    { text: "." },
  ] satisfies TextPart[],
  sub: "Interior-design trained, data-driven. 4+ years in technical SEO and performance marketing, turned into websites and journeys people can find and use — across Indonesia, Philippines, and US markets.",
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
      countTo: 13,
      suffix: "x",
      label: "organic clicks in 6 months — GNET Indonesia websites",
    },
    {
      countTo: 32,
      suffix: "%",
      label: "qualified share of SEO leads, up from 9% — Verihubs, H1 2026",
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
    title: "MAKA Motors — Designing for a category nobody searched for",
    ux: {
      tag: "Website Revamp · Information Architecture",
      headline: [{ text: "Designing for a category " }, { text: "nobody searched for", gradient: true }],
      subhead:
        "MAKA Motors' website, rebuilt end to end — from wireframe to deployment — around the questions EV buyers actually ask.",
      proof: {
        kind: "image",
        src: "/images/MAKA Motors/Website MAKA Motors.png",
        alt: "Revamped MAKA Motors homepage: Cavalry hero with a Test Ride Sekarang button and a quick-action rail for showroom locations, fast charging, rent-to-own, price & installments, and customer care",
        width: 2533,
        height: 1341,
      },
      badges: [
        { value: "+600%", label: "organic traffic MoM post revamp" },
        { value: "#1", label: '"motor listrik terbaik" & "subsidi"' },
        { value: "60K+", label: "organic clicks in 6 months (GSC)" },
      ],
      brief: {
        problem:
          "A brand-new category with no existing search demand capture, and a website that wasn't built to rank or convert.",
        approach:
          "Treat search queries as user research, structure the site around them, and ship the revamp end to end: UI/UX, CMS, server, GA4, and Core Web Vitals.",
      },
      sections: [
        {
          id: "research",
          label: "Research",
          title: [{ text: "Search intent as " }, { text: "user research", gradient: true }],
          intro:
            "A new category has no brand searches yet, but it has questions. Keyword data showed what buyers were already asking, and the site was built to answer them.",
          table: {
            columns: ["Keyword", "Buyer's question", "Volume / mo", "Rank"],
            rows: [
              ["motor listrik subsidi", "Can I get the government subsidy?", "12,100", "#5 → #1"],
              ["motor listrik terbaik", "Which electric motorcycle is best?", "3,600", "#3 → #1"],
              ["kredit motor listrik", "Can I pay in installments?", "1,900", "#4 → #1"],
              ["motor listrik terbaru", "What's new on the market?", "1,600", "#40 → #1"],
            ],
            source: "Semrush position tracking — maka-motors.com, May 9 → Jun 30",
          },
        },
        {
          id: "structure",
          label: "Structure",
          title: [{ text: "Top questions, " }, { text: "one tap away", gradient: true }],
          intro:
            "The shipped site keeps buyers' first questions visible on every screen: a persistent quick-action rail for price & installments, rent-to-own, showrooms, fast charging and WhatsApp support — and one primary hero action, Test Ride.",
          tree: {
            root: { label: "Home", note: "Cavalry hero · Test Ride Sekarang" },
            branches: [
              { label: "MAKA Cavalry", note: "Product", leaves: ["Fast Charging Station"] },
              { label: "Harga & Cicilan", note: "Price & financing", leaves: ["Daftar Sewa Milik"] },
              {
                label: "Articles",
                note: "Search-intent content",
                leaves: ["terbaik", "subsidi", "kredit"],
              },
              {
                label: "Test Ride / Pesan",
                note: "Conversion",
                leaves: ["Lokasi Showroom", "Customer Care (WhatsApp)"],
                conversion: true,
              },
            ],
            caption: "Simplified from the live navigation and quick-action rail.",
          },
        },
        {
          id: "process",
          label: "Process",
          title: [{ text: "Wireframe " }, { text: "to deployment", gradient: true }],
          steps: [
            { title: "Research", body: "Keyword research in Semrush and competitor traffic analysis in Similarweb." },
            { title: "Wireframe & UI/UX", body: "Wireframes and UI/UX for the new site." },
            { title: "Build", body: "CMS, server, on-page SEO and Core Web Vitals, through to deployment." },
            { title: "Measure", body: "GA4, Search Console and pixel-based attribution, with product, brand and dev." },
          ],
        },
      ],
      decisions: [
        {
          title: "Search demand decides the structure",
          body: "Pages and content were planned around the highest-demand buyer questions — subsidy, best-in-class, installments — not around the org chart.",
          evidence: '#1 for "motor listrik subsidi" (12,100/mo) and "motor listrik terbaik" (3,600/mo).',
        },
        {
          title: "Keep the top questions one tap away",
          body: "A persistent quick-action rail keeps price & installments, rent-to-own, showrooms, charging and WhatsApp support in reach on every page.",
          evidence: "Shipped on the live site — see the homepage screenshot above.",
        },
        {
          title: "Less friction between interest and a lead",
          body: "Worked with product, brand and dev on pixel-based attribution and funnel friction, so campaign traffic landed on pages built to convert.",
          evidence: "Sheila On 7 campaign: monthly website leads 70%+ above baseline · 1,000+ qualified Meta leads under Rp10,000 each.",
        },
      ],
    },
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
      "Led the website revamp end to end — wireframe, UI/UX, CMS, server, GA4, and Core Web Vitals — with architecture and content built to rank.",
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
        { value: "60K+", label: "organic clicks in 6 months (GSC) · CTR 5.2%" },
        { value: "70%+", label: "more monthly website leads vs baseline — Sheila On 7 campaign" },
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
    title: "Verihubs — 677 URLs, one clear answer each",
    ux: {
      tag: "Content Architecture · SEO Ops",
      headline: [{ text: "677 URLs, " }, { text: "one clear answer", gradient: true }, { text: " each" }],
      subhead:
        "Untangling years of overlapping content for an identity-verification company publishing in Indonesia, the Philippines, and global English.",
      proof: {
        kind: "bars",
        title: "Qualified share of SEO leads · H1 2026",
        bars: [
          { label: "Jan", value: 9 },
          { label: "Feb", value: 12 },
          { label: "Mar", value: 18 },
          { label: "Apr", value: 20 },
          { label: "May", value: 17 },
          { label: "Jun", value: 32 },
        ],
        legend: "Qualified leads as a share of all SEO leads, per month",
      },
      badges: [
        { value: "9% → 32%", label: "qualified share, Jan → Jun 2026" },
        { value: "~3x", label: "qualified SEO leads" },
        { value: "677 URLs", label: "cannibalization audit" },
      ],
      brief: {
        problem:
          "Years of content production left hundreds of URLs competing for the same keywords — overlapping answers for readers, diluted rankings for search.",
        approach:
          "Inventory every page, consolidate each topic into one pillar with a redirect map, fix the market signals, and build tooling so new content doesn't recreate the problem.",
      },
      sections: [
        {
          id: "inventory",
          label: "Inventory",
          title: [{ text: "A content inventory, " }, { text: "at scale", gradient: true }],
          intro:
            "A content inventory is a core UX method: list every page and what it's for. Here it covered a 677-URL cannibalization audit and a full inventory of 188 articles across ID, PH and EN, pulled via the WordPress REST API and enriched with Ahrefs data.",
          points: [
            {
              title: "Deepfake cluster → one pillar",
              body: "13 articles with heavy cannibalization identified, one pillar chosen, and a final redirect map.",
            },
            {
              title: "Content verified",
              body: "280 of 335 articles checked for accuracy, including factual corrections on live PH articles.",
            },
            {
              title: "Demand before production",
              body: "A planned batch of 10 PH face-recognition articles was replaced with 4 supporting + 6 filler pieces after research showed only ~530 combined B2B search volume.",
            },
          ],
        },
        {
          id: "markets",
          label: "Markets",
          title: [{ text: "Right page, " }, { text: "right market", gradient: true }],
          intro:
            "Verihubs publishes for Indonesia, the Philippines and global English. Each reader should land on their own market's version.",
          points: [
            { title: "Hreflang", body: "Audited and fixed hreflang on the PH blog." },
            { title: "Schema", body: "Fixed a JSON-LD bug where the /ph/ prefix was missing." },
            {
              title: "PH pillar",
              body: 'Refreshed the "kyc philippines" pillar after the Philippines exited the FATF grey list.',
            },
          ],
        },
        {
          id: "reading",
          label: "Reading UX",
          title: [{ text: "A better " }, { text: "reading experience", gradient: true }],
          intro: "A brand-accurate UX/UI mockup for the PH blog.",
          points: [
            { title: "Floating table of contents", body: "Jump between sections of long compliance articles." },
            { title: "Mobile bottom sheet", body: "Section navigation that fits small screens." },
          ],
        },
        {
          id: "toolkit",
          label: "Team toolkit",
          title: [{ text: "Designed for " }, { text: "the people who maintain it", gradient: true }],
          intro:
            "A clean structure only lasts if the team can keep it clean. The verihubs-seo-ops plugin turns the audit into a weekly routine.",
          steps: [
            { title: "gsc-weekly-digest", body: "Automated weekly Search Console reporting." },
            { title: "cannibalization-check", body: "Flags overlap before a new article competes with an old one." },
            { title: "post-draft-sweep", body: "Pre-publish compliance sweep on every draft." },
            {
              title: "Governance",
              body: "Content statuses VERIFIED / PARTIAL / FAILED with Gates 0–5 and an Official Numbers registry with TTL.",
            },
          ],
        },
      ],
    },
    role: "Freelance SEO Specialist",
    period: "Oct 2025 – now",
    market: "ID + PH + global EN",
    chapterStats: [
      { value: "9% → 32%", label: "qualified share of SEO leads, Jan → Jun 2026" },
      {
        value: "677 URLs",
        label: "keyword cannibalization audit, restructured for ranking consolidation",
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
        { value: "9% → 32%", label: "qualified share of SEO leads, H1 2026" },
        { value: "~3x", label: "qualified SEO leads" },
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
    title: "GNET Indonesia — A direct line to buyers distributors used to own",
    ux: {
      tag: "Website Builds · Findability",
      headline: [{ text: "A direct line to buyers " }, { text: "distributors used to own", gradient: true }],
      subhead: "Two brand websites built from zero, so buyers could find GNET products directly.",
      proof: {
        kind: "image",
        src: "/images/p10_X16.jpg",
        alt: "Google Search Console for gnetindonesia.com: 16.6K clicks and 1.06M impressions in the last 6 months versus 1.25K and 67.5K in the previous 6 months",
        width: 1120,
        height: 528,
      },
      badges: [
        { value: "1.25K → 16.6K", label: "organic clicks in 6 months" },
        { value: "67.5K → 1.06M", label: "organic impressions" },
        { value: "Rp26", label: "CPC — from Rp300+" },
      ],
      brief: {
        problem:
          "Minimal organic presence, and a market where distributors — not the manufacturer — own the customer relationship.",
        approach:
          "Give the brand its own websites to own product search, steer content with Search Console data, and let video show the product.",
      },
      sections: [
        {
          id: "sites",
          label: "Two sites",
          title: [{ text: "Two sites, " }, { text: "one brand", gradient: true }],
          points: [
            { title: "gnetindonesia.com", body: "The main brand website, built end to end." },
            { title: "flooring.gnetindonesia.com", body: "A dedicated subdomain for the flooring line." },
          ],
        },
        {
          id: "process",
          label: "Process",
          title: [{ text: "Brief " }, { text: "to handover", gradient: true }],
          intro: "Both builds were run end to end on the brand side, with an external vendor.",
          steps: [
            { title: "Brief", body: "Wrote and got approval on the website brief." },
            { title: "Vendor pitch", body: "Ran vendor pitching and selection." },
            { title: "Wireframe & UI/UX", body: "Reviewed wireframes and UI/UX with the vendor." },
            { title: "Build", body: "Coordinated backend development through to launch." },
            { title: "Handover", body: "Formal handover and acceptance (BAST)." },
          ],
        },
      ],
      decisions: [
        {
          title: "Let search data steer content",
          body: "Editorial SEO and on-page optimization were prioritized by what Search Console showed buyers were searching for.",
          evidence: "Clicks 1.25K → 16.6K and impressions 67.5K → 1.06M in 6 months.",
        },
        {
          title: "Show the product in use",
          body: 'Meta campaigns restructured around video creative — starting with "GNET Atap Spandek".',
          evidence: "CPC Rp300+ → Rp26 · CTR 9.4%.",
        },
        {
          title: "Bring back high-intent visitors",
          body: "Cart-abandon retargeting (CPAS) with a carousel of the top 5 products.",
          evidence: "CTR 1.98% at ~Rp100 CPC.",
        },
      ],
    },
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
    slug: "ykk-ap",
    client: "YKK AP Sinar Fortuna",
    title: "YKK AP Sinar Fortuna — Replacing the form with a conversation",
    ux: {
      tag: "Conversion Journey · Search",
      headline: [{ text: "Replacing the form " }, { text: "with a conversation", gradient: true }],
      subhead:
        "A chat-first journey for premium architectural products, where one project averages around Rp500M.",
      proof: {
        kind: "funnel",
        title: "From ad to project",
        steps: [
          { label: "Meta ad", detail: "Architects & project owners" },
          { label: "WhatsApp chat", detail: "1,800+ conversations · ~Rp20K each" },
          { label: "Qualified in chat", detail: ">45% chat conversion rate" },
          { label: "Project", detail: "~Rp500M average value", win: true },
        ],
      },
      badges: [
        { value: "1,300%", label: "estimated ROI" },
        { value: "1,800+", label: "WhatsApp conversations" },
        { value: "69 → 216", label: "organic clicks in 2 months" },
      ],
      brief: {
        problem:
          "High-value, low-volume B2B leads with long consideration cycles — generic lead forms produce noise, not projects.",
        approach:
          "Route Meta Ads straight into WhatsApp, qualify inside the conversation, and add a search layer for high-intent product queries.",
      },
      sections: [
        {
          id: "audit",
          label: "Search audit",
          title: [{ text: "Fix search " }, { text: "before writing more", gradient: true }],
          intro:
            "A 90-day Search Console audit covered 296 URLs and 8,075 page-query pairs (1,077 clicks, 141,125 impressions).",
          points: [
            {
              title: "63 cannibalized queries",
              body: "Recommended pausing the August batch to fix titles and meta descriptions and consolidate pages first.",
            },
            {
              title: "Plan vs demand",
              body: "Fronterra & Granroof had ~200 impressions and 2 clicks despite 13 planned articles; the plan review flagged cannibalization risk in 5 of the 13.",
            },
          ],
        },
        {
          id: "colours",
          label: "Colour picker",
          title: [{ text: "Choosing a colour, " }, { text: "interactively", gradient: true }],
          intro:
            "An interactive colour-selection page (/contoh-warna/) built on the Seven ACP colour codes.",
        },
      ],
    },
    role: "Digital Marketing Freelance",
    period: "2023 – now",
    market: "Indonesia",
    chapterStats: [
      { value: "1,300%", label: "estimated ROI — Rp500M-avg project leads at Rp20K per result" },
      { value: "1,800+", label: "WhatsApp conversations via Meta Ads · >45% chat CVR" },
      { value: "69 → 216", label: "organic clicks in 2 months of SEO work" },
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
];

/* ----------------------------------------------------------------------------
   §5.3 Capabilities
---------------------------------------------------------------------------- */

export const capabilities: Capability[] = [
  {
    icon: "◐",
    title: "UX & Web Builds",
    items: [
      "Website revamps — wireframe to deployment",
      "Information architecture from search intent",
      "Conversion journeys — forms → WhatsApp",
      "4 end-to-end website builds shipped",
    ],
  },
  {
    icon: "</>",
    title: "SEO & Technical",
    items: [
      "Technical audits & cannibalization fixes",
      "Schema (JSON-LD) & hreflang implementation",
      "GSC / GA4 reporting & analysis",
      "Claude-assisted SEO ops toolkit",
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
    date: "2023 — NOW",
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
      { text: "design, data, and growth", bold: true },
      {
        text: ": equally comfortable wireframing a website revamp, restructuring a 677-URL content architecture, or managing a $160K ad budget.",
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
