/**
 * content.ts — SINGLE SOURCE OF TRUTH untuk seluruh konten situs.
 *
 * Struktur mengikuti situs live andrewjevon.com (Framer, Okt 2026) slot per slot;
 * copy diperbarui dari dokumen "Andrew Jevon: Rangkuman Pekerjaan & Achievement".
 * ATURAN (CLAUDE.md #2): dilarang mengarang/mengubah metrik.
 */

/* ----------------------------------------------------------------------------
   Types
---------------------------------------------------------------------------- */

export type ToolIcon = "google" | "meta" | "ga4" | "semrush" | "figma";

export type CaseStudy = {
  slug: string;
  client: string;
  /** Judul lengkap (metadata, JSON-LD, kartu "next"). */
  title: string;
  /** Tag tulisan tangan di kartu & header, tanpa "#". */
  tag: string;
  /** Subjudul di bawah nama project. */
  subtitle: string;
  /** Baris tools (tulisan tangan abu-abu). */
  toolsLine: string;
  toolIcons: ToolIcon[];
  role: string;
  period: string;
  market: string;
  /** Kartu "#RESULT". */
  result: string;
  /** Gambar utama + thumbnail kartu. */
  image: { src: string; alt: string; width: number; height: number };
  /** Paragraf konteks (tebal, gelap). */
  context: string;
  challenge: string;
  actions: string[];
  results: string;
  liveUrl?: string;
};

export type Faq = { q: string; a: string };

/* ----------------------------------------------------------------------------
   Site / metadata
---------------------------------------------------------------------------- */

export const site = {
  name: "Andrew Jevon",
  domain: "andrewjevon.com",
  url: "https://andrewjevon.com",
  title: "Andrew Jevon — UX × Growth · Web, SEO & Conversion",
  description:
    "I design websites and journeys around what people actually search for — 4+ years in technical SEO, performance marketing and website builds across Indonesia, Philippines and US markets.",
  email: "andrewjevon2000@gmail.com",
  linkedin: "https://linkedin.com/in/andrewjevon",
  location: "Tangerang, Indonesia",
  jobTitle: "Growth-focused UX Designer · Technical Marketer",
} as const;

export const nav = {
  logo: "Andrew Jevon",
  links: [
    { label: "Work", href: "#works-section" },
    { label: "About", href: "#about-section" },
    { label: "FAQs", href: "#faqs-section" },
    { label: "Contact", href: "#contact-section" },
  ],
  cta: { label: "Get In Touch", href: "#contact-section" },
} as const;

/* ----------------------------------------------------------------------------
   Hero — kartu flip (depan: foto; belakang: Experience + Tools)
---------------------------------------------------------------------------- */

export const hero = {
  name: "Andrew Jevon",
  sticker: "UX × Growth",
  clickMe: "Click me",
  photo: { src: "/images/site/profile.png", alt: "Andrew Jevon — growth-focused UX designer" },
  back: {
    experience: {
      title: "Experience",
      items: ["4-year Technical SEO", "4-year Performance Ads", "4 website builds shipped"],
    },
    tools: {
      title: "Tools that I use",
      items: ["Search Console", "GA4", "Figma"],
    },
    cta: { label: "Get in touch", href: "#contact-section" },
  },
} as const;

/* ----------------------------------------------------------------------------
   Selected Work
---------------------------------------------------------------------------- */

export const works = {
  kicker: "Selected Work",
  heading: "Case studies that moved the numbers",
  sub: "Four projects across web, search and conversion — each starts with a user problem and ends with a real number.",
  cta: { label: "Get In Touch", href: "#contact-section" },
  note: "Get started",
} as const;

export const caseStudies: CaseStudy[] = [
  {
    slug: "maka-motors",
    client: "MAKA Motors",
    title: "MAKA Motors — Rebuilding the website around what EV buyers ask",
    tag: "Website Revamp · Information Architecture",
    subtitle:
      "Rebuilding the website end to end — wireframe to deployment — around the questions EV buyers actually ask. +600% organic traffic MoM.",
    toolsLine: "Figma · WordPress · GA4 · Search Console · Semrush · Similarweb · Meta Ads Manager",
    toolIcons: ["figma", "google", "ga4", "semrush"],
    role: "Website Revamp Lead",
    period: "Jun 2024 – Sep 2025",
    market: "Indonesia",
    result: "+600% organic MoM",
    image: {
      src: "/images/MAKA Motors/Website MAKA Motors.png",
      alt: "makamotors.com after the revamp",
      width: 2533,
      height: 1341,
    },
    context:
      "MAKA Motors is an Indonesian EV startup launching Cavalry, an electric motorcycle in a category most Indonesians had never considered. Nobody was searching for the brand yet — but they were searching with questions: Is there a subsidy? Can I pay in installments? Which one is the best? The website had to answer them.",
    challenge:
      "A brand-new category with near-zero organic footprint, and a website that wasn't built to rank or convert. The highest-demand questions — “motor listrik subsidi” (12,100 searches/month), “motor listrik terbaik”, “kredit motor listrik” — had no clear home on the site, and campaign traffic landed on pages that produced reach, not leads.",
    actions: [
      "Used search intent as user research: keyword data (Semrush) and competitor traffic (Similarweb) decided which questions the site had to answer first.",
      "Led the website revamp end to end — wireframes and UI/UX, CMS, server, GA4 and Core Web Vitals — through to deployment.",
      "Structured the site so the top buyer questions stay one tap away: price & installments, rent-to-own, showrooms, charging, WhatsApp support — with one primary action, Test Ride.",
      "Grew SEO visibility from 6.6% to 40.6% in 7 weeks — #1 for “motor listrik terbaik” and “motor listrik subsidi”.",
      "Worked with product, brand and dev on pixel-based attribution and funnel friction, so campaign traffic landed on pages built to convert.",
      "Managed the blended Meta, Google, TikTok and YouTube budget; a Meta lead campaign produced 1,000+ qualified leads under Rp10,000 each.",
    ],
    results:
      "The revamp lifted organic traffic +600% month-over-month: 60K+ organic clicks and 1M+ impressions in six months (GSC), CTR 5.2%, average position in the top 10. The Sheila On 7 campaign lifted monthly website leads 70%+ above baseline. Combined organic and paid delivered 20K+ leads in six months — category-scale demand for a brand-new EV.",
    liveUrl: "https://www.makamotors.com/",
  },
  {
    slug: "verihubs",
    client: "Verihubs",
    title: "Verihubs — 677 URLs, one clear answer each",
    tag: "Content Architecture · SEO Ops",
    subtitle:
      "677 URLs, one clear answer each — untangling years of overlapping content across ID, PH and global EN. Qualified SEO leads 9% → 32%.",
    toolsLine: "Search Console · Ahrefs · Screaming Frog · WordPress REST API · Claude",
    toolIcons: ["google", "ga4", "semrush"],
    role: "Freelance SEO",
    period: "Oct 2025 – now",
    market: "ID · PH · global EN",
    result: "9% → 32% qualified leads",
    image: {
      src: "/images/site/verihubs-site.jpg",
      alt: "verihubs.com",
      width: 1200,
      height: 12427,
    },
    context:
      "Verihubs is an identity-verification (KYC / biometrics) company publishing for Indonesia, the Philippines and a global English audience. Its buyers — compliance, product and engineering teams — research carefully before they ever talk to sales. Years of content production had left them landing on overlapping, outdated answers.",
    challenge:
      "Hundreds of URLs competed for the same keywords: readers landed on the oldest version of an answer, and no page was strong enough to rank. The PH market needed correct hreflang and schema, backlink equity was distorted 19:1 toward one page, and manual reporting consumed hours that should go to strategy.",
    actions: [
      "Ran a full content inventory: 677-URL cannibalization audit plus a 188-article inventory (ID/PH/EN) via the WordPress REST API, enriched with Ahrefs; 280 of 335 articles verified for accuracy.",
      "Consolidated the deepfake cluster — 13 heavily cannibalized articles into one pillar with a final redirect map.",
      "Let demand decide production: replaced a planned batch of 10 PH face-recognition articles (only ~530 combined B2B search volume) with 4 supporting + 6 filler pieces.",
      "Fixed hreflang on the PH blog and a JSON-LD bug (missing /ph/ prefix); refreshed the “kyc philippines” pillar after the FATF grey-list exit.",
      "Designed a brand-accurate UX/UI mockup for the PH blog — floating table of contents, mobile bottom sheet.",
      "Built the verihubs-seo-ops toolkit — weekly GSC digest, cannibalization check, pre-publish sweep — plus a content governance model (VERIFIED / PARTIAL / FAILED, Gates 0–5).",
    ],
    results:
      "Qualified SEO leads grew ~3x: the qualified share rose from 9% in January to 32% in June 2026. The engagement is ongoing — consolidation, market fixes and AI-assisted operations now run as a repeatable, documented system the team maintains.",
    liveUrl: "https://verihubs.com/",
  },
  {
    slug: "gnet",
    client: "GNET Indonesia",
    title: "GNET Indonesia — Two websites from zero, 13x organic clicks",
    tag: "Website Builds · Findability",
    subtitle:
      "Two websites built from zero, so buyers could find the brand directly — 13x organic clicks in 6 months.",
    toolsLine: "Search Console · GA4 · WordPress · Semrush · Meta Ads Manager",
    toolIcons: ["google", "ga4", "semrush", "meta"],
    role: "Perf. Supervisor · Site Lead",
    period: "Aug 2023 – Jun 2024",
    market: "Indonesia",
    result: "13x organic clicks",
    image: {
      src: "/images/p10_X16.jpg",
      alt: "GNET — 1.25K to 16.6K organic clicks (GSC)",
      width: 1120,
      height: 528,
    },
    context:
      "GNET Indonesia is a building-materials brand in a market where distributors, not manufacturers, own the customer relationship. When a buyer searched for a product, they found a distributor — not the brand. Digital had to give GNET its own front door.",
    challenge:
      "Minimal organic presence — a baseline of 1.25K clicks and 67.5K impressions in six months. The brand had no website of its own to own product search demand, and paid CPC above Rp300 made scale uneconomical.",
    actions: [
      "Built gnetindonesia.com and flooring.gnetindonesia.com end to end on the brand side: brief approval, vendor pitching, wireframe and UI/UX review, backend coordination, through to handover (BAST).",
      "Led editorial SEO and content optimization steered by Search Console — organic clicks 1.25K → 16.6K in six months.",
      "Restructured Meta campaigns around video showing the product in use (“GNET Atap Spandek”): CPC Rp300+ → Rp26, CTR 9.4%.",
      "Ran cart-abandon retargeting (CPAS) with a carousel of the top 5 products: CTR 1.98% at ~Rp100 CPC.",
    ],
    results:
      "Six months of work multiplied organic clicks 13x (1.25K → 16.6K) and impressions nearly 16x (67.5K → 1.06M), while the Meta video restructure cut CPC by an order of magnitude. The brand now owns its own product search demand.",
    liveUrl: "https://gnetindonesia.com/",
  },
  {
    slug: "ykk-ap",
    client: "YKK AP Sinar Fortuna",
    title: "YKK AP Sinar Fortuna — Replacing the form with a conversation",
    tag: "Conversion Journey · Search",
    subtitle:
      "Replacing the lead form with a WhatsApp conversation for Rp500M-average projects — an estimated 1,300% ROI.",
    toolsLine: "Meta Ads Manager · WhatsApp Business · Search Console · WordPress",
    toolIcons: ["meta", "google", "ga4"],
    role: "Digital Mktg · Freelance",
    period: "2023 – now",
    market: "Indonesia",
    result: "~1,300% ROI",
    image: {
      src: "/images/site/ykk-gsc.png",
      alt: "YKK AP — 12-month organic performance (GSC)",
      width: 2560,
      height: 1528,
    },
    context:
      "YKK AP Sinar Fortuna sells premium architectural products where a single project averages around Rp500M. Architects and project owners compare options for weeks and ask detailed questions before they trust anyone. A lead form asks them to commit before any of that trust exists.",
    challenge:
      "High-value, low-volume B2B leads where generic campaigns produce noise, not projects. Long consideration cycles needed a conversation, not a form — and on the search side, a 90-day audit found 63 cannibalized queries and a content plan that didn't match demand.",
    actions: [
      "Designed the journey around a conversation: Meta Ads route straight into WhatsApp — 1,800+ conversations at ~Rp20K per result, qualified in chat at a 45%+ chat conversion rate.",
      "Audited 90 days of Search Console data (296 URLs, 8,075 page-query pairs): 63 cannibalized queries; recommended pausing the August content batch to fix titles and meta and consolidate pages first.",
      "Checked the content plan against demand — Fronterra & Granroof had ~200 impressions and 2 clicks despite 13 planned articles, with cannibalization risk in 5 of them.",
      "Built an interactive colour-selection page (/contoh-warna/) on the Seven ACP colour codes.",
      "SEO improvements grew organic clicks 69 → 216 and impressions 4.7K → 12.5K in two months.",
    ],
    results:
      "With Rp500M average project value against ~Rp20K per WhatsApp conversation, estimated campaign ROI reached 1,300% — and the search layer keeps adding organic demand: 10.9K clicks and 921K impressions over the last 12 months, average position 4.9.",
    liveUrl: "https://ykksinarfortuna.id/",
  },
];

/* ----------------------------------------------------------------------------
   How I Work
---------------------------------------------------------------------------- */

export const howIWork = {
  kicker: "How I Work",
  heading: "From search data to a site people use",
  toolStackLabel: "My Tool Stack",
  tools: [
    { icon: "google", name: "Search Console" },
    { icon: "ga4", name: "GA4" },
    { icon: "figma", name: "Figma" },
    { icon: "semrush", name: "Semrush" },
  ] as { icon: ToolIcon; name: string }[],
  processLabel: "Work Process",
  steps: [
    {
      title: "Research",
      body: "Search queries, Search Console data and competitor research (Semrush, Similarweb) show what users actually ask, where they get stuck, and where the gaps are.",
    },
    {
      title: "Structure & Build",
      body: "Information architecture, wireframes and page templates built around those questions — then the build itself: CMS, schema, hreflang and Core Web Vitals, through to deployment.",
    },
    {
      title: "Journeys & Funnels",
      body: "Clear paths from first visit to lead — landing pages, forms and WhatsApp flows — fed by full-funnel campaigns on Meta, Google and TikTok, with lead-quality scoring.",
    },
    {
      title: "Measure & Automate",
      body: "GSC and GA4 reporting, pixel-based attribution, and Claude-assisted SEO ops that automate the repetitive work so time goes to the next improvement.",
    },
  ],
  photo: {
    src: "/images/site/google-office.jpeg",
    alt: "Andrew Jevon at the Google Office, Jakarta",
  },
  sticker: "Hi, I'm Andrew",
} as const;

/* ----------------------------------------------------------------------------
   Ticker
---------------------------------------------------------------------------- */

export const ticker = {
  line: "I TURN SEARCH DATA INTO SITES PEOPLE USE",
  tags: ["#UX", "#SEO", "#Performance", "#Web"],
} as const;

/* ----------------------------------------------------------------------------
   FAQ
---------------------------------------------------------------------------- */

export const faqs = {
  kicker: "Questions",
  heading: "What I can do for you",
  sub: "The questions I get asked most",
  items: [
    {
      q: "What do you actually do?",
      a: "I design and build websites and conversion journeys around real user demand. My background is technical SEO and performance marketing, so I start from data — what people search for, where they drop off — then design the structure, pages and funnels that answer it. 4+ years across Indonesia, the Philippines and the US, with a BFA in Interior Design behind it.",
    },
    {
      q: "Which markets do you work in?",
      a: "Indonesia, the Philippines and the US. I've handled dual-market ID + PH SEO with hreflang and schema, and full-funnel US-market SaaS performance, so I adapt structure and messaging to each market.",
    },
    {
      q: "Are you a UX designer or a marketer?",
      a: "Both — and that's the point. Most designers never see the search and campaign data; most marketers never shape the site. I do both, so design decisions come with numbers: a website revamp I ran from wireframe to deployment lifted organic traffic +600% MoM (MAKA Motors), two sites built from zero grew organic clicks 13x (GNET), and I've managed $160K+ in paid budget across Meta, Google, TikTok and YouTube.",
    },
    {
      q: "Do you build websites too?",
      a: "Yes — four end-to-end website builds: wireframes and UI/UX, information architecture, on-page SEO, WordPress CMS, server and Core Web Vitals. This site is built with Next.js.",
    },
    {
      q: "How do you use AI in your work?",
      a: "I build Claude-assisted workflows that automate the repetitive parts of the job — weekly GSC digests, cannibalization checks and pre-publish sweeps — so my time goes to research and design decisions.",
    },
  ] as Faq[],
} as const;

/* ----------------------------------------------------------------------------
   Contact
---------------------------------------------------------------------------- */

export const contact = {
  kicker: "Contact Me",
  heading: "Get In Touch",
  sub: "Open to UX, growth and hybrid roles — full-time, freelance and consulting. Tangerang, Indonesia · remote-friendly.",
  form: {
    name: { label: "Name", placeholder: "Jane Smith" },
    email: { label: "Email", placeholder: "jane@company.com" },
    topic: { label: "What are you looking for?", placeholder: "e.g.: UX role, website build, SEO audit" },
    message: { label: "Message (about your project)", placeholder: "Tell me about the role or project" },
    submit: "Send message",
  },
  note: "Send a Message",
  email: site.email,
  linkedin: site.linkedin,
} as const;

/* ----------------------------------------------------------------------------
   Footer
---------------------------------------------------------------------------- */

export const footer = {
  logo: "Andrew Jevon",
  kicker: "Hire me",
  heading: "Have a role or project in mind? Let's talk.",
  sub: "Full-time, freelance and consulting.",
  cta: { label: "Get In Touch", href: "#contact-section" },
  note: "Get started",
  socialLabel: "Social Media",
  columns: [
    { title: "Pages", links: [{ label: "Home", href: "/" }, { label: "Contact", href: "/#contact-section" }] },
    {
      title: "Quick Links",
      links: [
        { label: "Work", href: "/#works-section" },
        { label: "FAQs", href: "/#faqs-section" },
        { label: "About", href: "/#about-section" },
        { label: "Contact", href: "/#contact-section" },
      ],
    },
  ],
  copyright: "©2026 Andrew Jevon. All rights reserved.",
  credit: "Built by Andrew Jevon",
} as const;

/* ----------------------------------------------------------------------------
   Helpers
---------------------------------------------------------------------------- */

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const i = caseStudies.findIndex((cs) => cs.slug === slug);
  if (i === -1) return undefined;
  return caseStudies[(i + 1) % caseStudies.length];
}
