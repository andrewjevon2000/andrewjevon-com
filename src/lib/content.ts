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

export type ToolIcon =
  | "google"
  | "meta"
  | "ga4"
  | "semrush"
  | "figma"
  | "claude"
  | "codex"
  | "higgsfield"
  | "elevenlabs"
  | "cmux"
  | "capcut";

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
  /** 3 angka kunci di bawah kartu tag. */
  highlights: [Stat, Stat, Stat];
  brief: Brief;
  tree?: Tree;
  funnel?: Funnel;
  merge?: Merge;
  tiles?: Tiles;
  learnings: Learnings;
  research?: ResearchTable;
  decisions?: Decision[];
  chart?: BarChart;
  evidence: EvidenceImage[];
  exhibits?: Exhibit[];
};

export type Stat = { value: string; label: string };
export type EvidenceImage = { src: string; alt: string; caption: string; width: number; height: number };
export type Exhibit = { href: string; title: string; desc: string };
export type Decision = { title: string; body: string; evidence: string };
export type ResearchTable = { title: string; intro: string; columns: string[]; rows: string[][]; source: string };
export type BarChart = { title: string; bars: { label: string; value: number }[]; note: string };

export type Brief = { problem: string; approach: string };
export type Tree = {
  title: string;
  intro: string;
  root: { label: string; note: string };
  branches: { label: string; note: string; leaves: string[]; conversion?: true }[];
  flow: string[];
  caption: string;
};
export type Funnel = { title: string; intro: string; steps: { label: string; detail: string; win?: true }[] };
export type Merge = {
  title: string;
  intro: string;
  from: string[];
  to: { label: string; note: string };
  actions: { label: string; note: string }[];
};
export type Tiles = { title: string; intro: string; items: { code: string; name: string; body: string }[] };
export type Learnings = { quote: string; points: { title: string; body: string }[]; next: string };

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
      items: ["Figma · Search Console · GA4", "Claude · Codex · cmux", "Higgsfield · ElevenLabs · CapCut"],
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
      src: "/images/site/maka-site.jpg",
      alt: "makamotors.com after the revamp",
      width: 1600,
      height: 847,
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
    brief: {
      problem: "A brand-new category with no search demand for the brand, and a website that wasn't built to answer buyers' first questions: subsidy, installments, which one is best.",
      approach: "Use search intent as user research, structure the site around those questions, and ship the revamp end to end: UI/UX, CMS, server, GA4, Core Web Vitals.",
    },
    tree: {
      title: "Top questions, one tap away",
      intro: "The shipped site keeps buyers' first questions visible on every screen: a persistent quick-action rail plus one primary action, Test Ride.",
      root: { label: "Home", note: "Cavalry hero · Test Ride Sekarang" },
      branches: [
        { label: "MAKA Cavalry", note: "Product", leaves: ["Specs & range", "Fast Charging Station"] },
        { label: "Harga & Cicilan", note: "Price & financing", leaves: ["Installments", "Daftar Sewa Milik"] },
        { label: "Articles", note: "Search-intent content", leaves: ["terbaik", "subsidi", "kredit"] },
        { label: "Test Ride / Pesan", note: "Conversion", leaves: ["Lokasi Showroom", "Customer Care (WhatsApp)"], conversion: true },
      ],
      flow: ["Question", "Answer page", "Cavalry", "Test ride / order"],
      caption: "Simplified from the live navigation and quick-action rail.",
    },
    learnings: {
      quote: "When a category is new, the first question isn't “what is this?” — it's “can I afford it?”",
      points: [
        { title: "Search data is user research at scale", body: "It doesn't replace interviews, but it surfaces real questions from thousands of people at no cost." },
        { title: "SEO and UX are the same problem", body: "A structure search engines understand is usually one people can navigate too." },
      ],
      next: "Run usability tests with five prospective buyers on the financing page, to check the installment flow is really easy to understand.",
    },
    highlights: [
      { value: "6.6 → 40.6%", label: "SEO visibility in 7 weeks (Semrush)" },
      { value: "60K+", label: "organic clicks · 1M+ impressions in 6 months (GSC)" },
      { value: "70%+", label: "more monthly website leads vs baseline — Sheila On 7 campaign" },
    ],
    research: {
      title: "Search intent as user research",
      intro:
        "A new category has no brand searches yet — but it has questions. Keyword data showed what buyers were already asking, and the site was built to answer them first.",
      columns: ["Keyword", "Buyer's question", "Searches / month", "Ranking"],
      rows: [
        ["motor listrik subsidi", "Can I get the government subsidy?", "12,100", "#5 → #1"],
        ["motor listrik terbaik", "Which electric motorcycle is best?", "3,600", "#3 → #1"],
        ["kredit motor listrik", "Can I pay in installments?", "1,900", "#4 → #1"],
        ["motor listrik terbaru", "What's new on the market?", "1,600", "#40 → #1"],
      ],
      source: "Semrush position tracking, maka-motors.com — May 9 → Jun 30, 2025",
    },
    decisions: [
      {
        title: "Search demand decides the structure",
        body: "Pages and content were planned around the highest-demand buyer questions — subsidy, best-in-class, installments — not around the org chart.",
        evidence: "#1 for “motor listrik subsidi” (12,100/mo) and “motor listrik terbaik” (3,600/mo).",
      },
      {
        title: "Keep the top questions one tap away",
        body: "A persistent quick-action rail keeps price & installments, rent-to-own, showrooms, charging and WhatsApp support in reach on every page, with one primary action: Test Ride.",
        evidence: "Shipped on the live site — see the homepage screenshot above.",
      },
      {
        title: "Less friction between interest and a lead",
        body: "Pixel-based attribution and funnel-friction work with product, brand and dev, so campaign traffic landed on pages built to convert.",
        evidence: "Monthly website leads 70%+ above baseline during the Sheila On 7 campaign · 1,000+ qualified Meta leads under Rp10,000 each.",
      },
    ],
    evidence: [
      { src: "/images/MAKA Motors/grafik GSC MAKA Motors.jpeg", alt: "Google Search Console graph for maka-motors.com", caption: "Google Search Console — organic growth after the revamp", width: 1600, height: 780 },
      { src: "/images/MAKA Motors/grafik visibility MAKA Motors.jpeg", alt: "Semrush visibility trend 6.6% to 40.6%", caption: "Semrush — visibility 6.6% → 40.6% in 7 weeks", width: 1556, height: 937 },
      { src: "/images/MAKA Motors/grafik visibility top 100 MAKA Motors.jpeg", alt: "Semrush keyword visibility, top 100 positions", caption: "Semrush — keyword visibility, top 100", width: 1553, height: 940 },
      { src: "/images/MAKA Motors/grafik organic search analysis competitor MAKA Motors.jpeg", alt: "Similarweb competitor organic search analysis", caption: "Similarweb — competitor organic search analysis", width: 1560, height: 412 },
      { src: "/images/p07_X19.png", alt: "MAKA Motors Google Search ad on a phone", caption: "Google Search ad — Cavalry", width: 370, height: 304 },
      { src: "/images/p07_X17.png", alt: "MAKA Motors TikTok in-feed ad", caption: "TikTok in-feed ad — Cavalry", width: 370, height: 350 },
      { src: "/images/MAKA Motors/meta ads conversion.jpeg", alt: "Meta Ads Manager conversion results", caption: "Meta Ads — conversion campaign results", width: 1499, height: 356 },
      { src: "/images/MAKA Motors/Poster MAKA Cavalry edisi collab Brand Ambassador Duta Shiela on 7.jpeg", alt: "MAKA Cavalry poster with brand ambassador Duta (Sheila On 7)", caption: "Campaign poster — brand-ambassador collab with Duta (Sheila On 7)", width: 2250, height: 4000 },
      { src: "/images/MAKA Motors/Pengalaman booth activation MAKA Motors di event IIMS.jpeg", alt: "MAKA Motors booth activation at IIMS", caption: "Offline activation — IIMS booth", width: 960, height: 1280 },
    ],
  },
  {
    slug: "verihubs",
    client: "Verihubs",
    title: "Verihubs — 677 URLs, one clear answer each",
    tag: "Content Architecture · SEO Ops",
    subtitle:
      "677 URLs, one clear answer each — untangling years of overlapping content across ID, PH and global EN. Qualified SEO leads 9% → 32%.",
    toolsLine: "Search Console · Ahrefs · Screaming Frog · WordPress REST API · Claude",
    toolIcons: ["google", "ga4", "semrush", "claude"],
    role: "Freelance SEO",
    period: "Oct 2025 – now",
    market: "ID · PH · global EN",
    result: "9% → 32% qualified leads",
    image: {
      src: "/images/site/verihubs-site.jpg",
      alt: "verihubs.com",
      width: 1200,
      height: 700,
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
    brief: {
      problem: "Years of content left hundreds of URLs competing for the same keywords — readers landed on outdated answers, and nothing ranked well.",
      approach: "Inventory every page, give each topic one pillar with a redirect map, fix the market signals, and build tooling so new content doesn't recreate the problem.",
    },
    merge: {
      title: "Many pages → one clear answer",
      intro: "A content inventory is a core UX method: list every page and what it's for. Here it covered 677 URLs; the deepfake cluster alone had 13 articles competing for the same questions.",
      from: ["Deepfake article 1", "Deepfake article 2", "Deepfake article 3", "… 13 articles"],
      to: { label: "One pillar page", note: "Complete and current — the 12 others redirect to it (final redirect map)." },
      actions: [
        { label: "Keep", note: "Strong, unique pages" },
        { label: "Merge", note: "Overlapping topics into one pillar" },
        { label: "Redirect", note: "Thin or outdated duplicates" },
        { label: "Verify", note: "280 of 335 articles fact-checked" },
      ],
    },
    tiles: {
      title: "Right page, right market",
      intro: "Verihubs publishes for three audiences. Each reader should land on their own market's version — hreflang and schema tell search engines which is which.",
      items: [
        { code: "ID", name: "Indonesia", body: "Indonesian-language blog; child articles per product for banking and hospital verticals." },
        { code: "PH", name: "Philippines", body: "Hreflang fixed, JSON-LD /ph/ prefix bug fixed; “kyc philippines” pillar refreshed after the FATF grey-list exit." },
        { code: "EN", name: "Global English", body: "23-article plan built on gaps against Sumsub, Persona and Veriff." },
      ],
    },
    learnings: {
      quote: "More content isn't more help. One great answer beats thirteen good ones.",
      points: [
        { title: "A content audit is UX research", body: "Mapping every page shows exactly where readers get confused, long before any dashboard does." },
        { title: "The maintainer is a user too", body: "Designing the team's workflow is what keeps the structure clean after the project ends." },
      ],
      next: "Pair the audit with a short survey of the sales team on the questions prospects ask most, then check that each one has a page.",
    },
    highlights: [
      { value: "677", label: "URLs audited for cannibalization" },
      { value: "13 → 1", label: "deepfake articles consolidated into one pillar + redirect map" },
      { value: "280 / 335", label: "articles verified for accuracy" },
    ],
    chart: {
      title: "Qualified share of SEO leads · Jan – Jun 2026",
      bars: [
        { label: "Jan", value: 9 },
        { label: "Feb", value: 12 },
        { label: "Mar", value: 18 },
        { label: "Apr", value: 20 },
        { label: "May", value: 17 },
        { label: "Jun", value: 32 },
      ],
      note: "Share of SEO leads qualified by the sales team, per month. Qualified leads ~3x over the period.",
    },
    decisions: [
      {
        title: "One question, one page",
        body: "Instead of publishing more, consolidate: each topic gets one canonical page that is complete and current, and old duplicates redirect to it.",
        evidence: "677 URLs audited · deepfake cluster: 13 articles → 1 pillar with a final redirect map.",
      },
      {
        title: "Demand before production",
        body: "Search volume decides what gets written. A planned batch that didn't have demand was replaced before anyone wrote it.",
        evidence: "10 PH face-recognition articles (~530 combined B2B volume) → 4 supporting + 6 filler pieces.",
      },
      {
        title: "Design for the people who maintain it",
        body: "The audit became a weekly routine the team runs: reporting, overlap checks and a pre-publish sweep, with a governance model for every article.",
        evidence: "verihubs-seo-ops plugin: gsc-weekly-digest · cannibalization-check · post-draft-sweep · statuses VERIFIED / PARTIAL / FAILED, Gates 0–5.",
      },
    ],
    evidence: [],
    exhibits: [
      { href: "/images/Verihubs/verihubs_cannibalization_exhibit.html", title: "Case file — cannibalization audit", desc: "Structural cluster audit (677 URLs) and the deepfake consolidation." },
      { href: "/images/Verihubs/verihubs_ph_hreflang_schema_audit.html", title: "PH hreflang & schema fix audit", desc: "Before/after of the hreflang and JSON-LD fixes on the Philippines blog." },
      { href: "/images/Verihubs/verihubs_lead_quality_shift.html", title: "Lead quality shift", desc: "Monthly qualified vs unqualified SEO leads, Oct 2025 → Jul 2026." },
    ],
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
    brief: {
      problem: "Buyers searching for a product found distributors, not the brand — GNET had no website of its own and almost no organic presence.",
      approach: "Build the brand's own websites around how buyers search, steer content with Search Console data, and let video show the product.",
    },
    tiles: {
      title: "Two sites, one brand",
      intro: "Both builds were run end to end on the brand side with an external vendor: brief approval, vendor pitching, wireframe and UI/UX review, backend coordination, handover (BAST).",
      items: [
        { code: "01", name: "gnetindonesia.com", body: "The main brand website — product categories, editorial SEO content, PageSpeed performance 98." },
        { code: "02", name: "flooring.gnetindonesia.com", body: "A dedicated subdomain for the flooring line, so that product search has its own front door." },
      ],
    },
    learnings: {
      quote: "If buyers can't find you, someone else answers for you.",
      points: [
        { title: "Owning the answer builds the brand", body: "A product page that answers the search does more for a manufacturer than another distributor listing." },
        { title: "Search data is a live roadmap", body: "Rising queries told us what to build next more reliably than guesses in a meeting." },
      ],
      next: "Add a simple product finder (“what are you building?”) to guide homeowners who don't know product names yet.",
    },
    highlights: [
      { value: "13x", label: "organic clicks — 1.25K → 16.6K in 6 months" },
      { value: "Rp26", label: "Meta CPC, down from Rp300+ · CTR 9.4%" },
      { value: "98", label: "PageSpeed performance score, gnetindonesia.com" },
    ],
    decisions: [
      {
        title: "Give the brand its own front door",
        body: "Two websites built from zero so product searches land on GNET, not only on distributors — run end to end on the brand side with an external vendor.",
        evidence: "gnetindonesia.com + flooring.gnetindonesia.com: brief → vendor pitch → wireframe & UI/UX review → backend → handover (BAST).",
      },
      {
        title: "Let Search Console steer the content",
        body: "Editorial SEO and on-page optimization prioritized by what buyers were already searching for.",
        evidence: "Impressions 67.5K → 1.06M, clicks 1.25K → 16.6K in six months.",
      },
      {
        title: "Show the product in use",
        body: "Meta campaigns restructured around video of the product being installed, plus cart-abandon retargeting with the top 5 products.",
        evidence: "“GNET Atap Spandek” video: CPC Rp300+ → Rp26, CTR 9.4% · CPAS retargeting: CTR 1.98% at ~Rp100 CPC.",
      },
    ],
    evidence: [
      { src: "/images/p11_X15.png", alt: "PageSpeed Insights desktop score 98 for gnetindonesia.com", caption: "PageSpeed Insights — performance 98 (desktop)", width: 1119, height: 534 },
      { src: "/images/p09_X11.png", alt: "Meta Ads Manager campaign table for GNET", caption: "Meta Ads Manager — GNET campaigns", width: 1239, height: 227 },
      { src: "/images/p09_X12.png", alt: "GNET Imlek sale ad creative", caption: "Meta ad creative — seasonal promo", width: 375, height: 325 },
      { src: "/images/p08_X9.jpg", alt: "GNET Instagram ad", caption: "Instagram ad — GNET product", width: 800, height: 384 },
      { src: "/images/p08_X10.jpg", alt: "GNET Instagram ad", caption: "Instagram ad — GNET product", width: 800, height: 390 },
      { src: "/images/p08_X11.jpg", alt: "GNET Instagram ad", caption: "Instagram ad — GNET product", width: 778, height: 469 },
    ],
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
      src: "/images/site/ykk-gsc.jpg",
      alt: "YKK AP — 12-month organic performance (GSC)",
      width: 1600,
      height: 955,
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
    brief: {
      problem: "High-value, low-volume B2B leads with long consideration cycles — a lead form asks buyers to commit before any trust exists.",
      approach: "Route Meta Ads straight into WhatsApp, qualify inside the conversation, and fix search before writing more content.",
    },
    funnel: {
      title: "From ad to project, in four steps",
      intro: "The journey was cut down to the fewest steps that still give sales what they need.",
      steps: [
        { label: "Meta ad", detail: "Architects & project owners" },
        { label: "WhatsApp chat", detail: "1,800+ conversations · ~Rp20K each" },
        { label: "Qualified in chat", detail: "45%+ chat conversion rate" },
        { label: "Project", detail: "~Rp500M average value", win: true },
      ],
    },
    learnings: {
      quote: "The best conversion step is the one buyers already use.",
      points: [
        { title: "The channel is part of the UX", body: "Moving from a form to WhatsApp changed the experience more than any landing-page redesign would have." },
        { title: "Qualification can feel like service", body: "The same questions that slow down a form speed up a conversation." },
      ],
      next: "Tag every chat by project stage in a CRM, so the journey from first message to signed project is measured end to end instead of estimated.",
    },
    highlights: [
      { value: "1,800+", label: "WhatsApp conversations at ~Rp20K per result" },
      { value: "45%+", label: "chat conversion rate" },
      { value: "63", label: "cannibalized queries found in a 90-day Search Console audit" },
    ],
    decisions: [
      {
        title: "A conversation instead of a form",
        body: "For a Rp500M-average decision, the first step should feel like talking to an expert. Meta Ads route straight into WhatsApp, and qualification happens inside the chat.",
        evidence: "1,800+ conversations at ~Rp20K each · 45%+ chat conversion · estimated ROI 1,300%.",
      },
      {
        title: "Fix search before writing more",
        body: "A 90-day Search Console audit came first: titles, meta and page consolidation before the next content batch.",
        evidence: "296 URLs, 8,075 page-query pairs · 63 cannibalized queries · August batch paused; organic clicks 69 → 216 in two months.",
      },
      {
        title: "Match the plan to demand",
        body: "Content planned for products nobody searched for was cut before it was written.",
        evidence: "Fronterra & Granroof: ~200 impressions and 2 clicks against 13 planned articles, cannibalization risk in 5 of them.",
      },
    ],
    evidence: [
      { src: "/images/p12_X17.png", alt: "Meta Ads Manager campaigns for YKK AP Sinar Fortuna", caption: "Meta Ads Manager — WhatsApp conversation campaigns", width: 1194, height: 553 },
      { src: "/images/p14_X20.png", alt: "Google Ads search campaign table for ykksinarfortuna.id", caption: "Google Ads — search campaigns", width: 1104, height: 392 },
    ],
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
    { icon: "figma", name: "Figma" },
    { icon: "google", name: "Search Console" },
    { icon: "ga4", name: "GA4" },
    { icon: "semrush", name: "Semrush" },
    { icon: "meta", name: "Meta Ads" },
    { icon: "claude", name: "Claude" },
    { icon: "codex", name: "Codex" },
    { icon: "cmux", name: "cmux" },
    { icon: "higgsfield", name: "Higgsfield" },
    { icon: "elevenlabs", name: "ElevenLabs" },
    { icon: "capcut", name: "CapCut" },
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
      a: "Two ways. For SEO ops I build Claude-assisted workflows that automate the repetitive parts — weekly GSC digests, cannibalization checks and pre-publish sweeps — so my time goes to research and design decisions. For creative production I run an AI-assisted workflow with Claude, Codex, Higgsfield, ElevenLabs and CapCut for ads and video.",
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
