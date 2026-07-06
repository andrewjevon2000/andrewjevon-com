# Playbook — Coding andrewjevon.com dengan Claude Code (localhost)

Fase 8 · Panduan langkah-demi-langkah untuk Andrew. Estimasi: 6–10 sesi.

---

## 0. Persiapan (sekali saja)

1. Install **Node.js 20+** (nodejs.org → LTS) dan **Git** (git-scm.com). Cek: `node -v`, `git --version`.
2. Install Claude Code: `npm install -g @anthropic-ai/claude-code` → jalankan `claude` → login.
3. Buat project:
   ```
   npx create-next-app@latest andrewjevon-com --typescript --tailwind --app --src-dir --eslint
   cd andrewjevon-com
   ```
4. Salin file dari folder handoff ini ke root project:
   - `CLAUDE.md` → root
   - `DESIGN.md` → root
   - `05-prototype-andrewjevon-com.html` → simpan sebagai `reference/prototype.html`
   - `03-prd-andrewjevon-com.md` → `reference/prd.md`
5. Buat folder `public/images/` → masukkan: foto profil (hero), foto kandid, dan file evidence terpilih dari folder `assets/evidence` (hanya yang akan tampil — JANGAN salin CSV mentah/deals tracker).
6. `git init && git add -A && git commit -m "chore: scaffold + handoff docs"`

## 1. Cara kerja per sesi

- Satu milestone = satu sesi Claude Code. Jangan rakus.
- Awali sesi: `claude` di folder project, paste prompt milestone di bawah.
- Akhiri sesi: cek Definition of Done (di CLAUDE.md), lalu `git add -A && git commit`.
- Kalau hasil melenceng: jangan tumpuk instruksi perbaikan panjang — `/clear`, perbaiki prompt, ulang.
- Review visual selalu di `npm run dev` → http://localhost:3000, bandingkan dengan `reference/prototype.html`.

## 2. Urutan Milestone & Prompt

### M1 — Design tokens & fondasi
> Read CLAUDE.md, DESIGN.md, and reference/prototype.html. Set up the design system: CSS variables in globals.css from DESIGN.md tokens, next/font setup (Space Grotesk, Inter, JetBrains Mono), base layout.tsx with dark background, and a small ui/ component library: SectionHead, Pill, Button (solid gradient + ghost), StatCard. Build a temporary /styleguide page rendering all of them for visual QA. Run build.

### M2 — Konten sebagai data
> Create src/lib/content.ts as the single source of truth, transcribing ALL content from reference/prd.md sections 5 and 6: hero copy, 3 headline stats, 5 case studies (slug, title, meta, 3 chapter stats each, context/problem/actions/results/tools for detail pages), capabilities, experience timeline (7 roles), toolbox, certifications, about paragraphs, contact. Type everything strictly. Do not invent or reword metrics.

### M3 — Layout statis Home (tanpa WebGL dulu)
> Build the full home page as static sections using content.ts and the ui components: Nav (fixed, blur), Hero (text + photo placeholder + 3 stat cards), SelectedWork (5 chapters), Capabilities, Experience timeline, Toolbox (static grid for now), About + certs, Contact + footer. Match reference/prototype.html visually. Fully responsive 375/768/1440. No animations yet. Run build.

### M4 — Motion layer
> Add the motion layer per DESIGN.md: Lenis smooth scroll, reveal-on-scroll (IntersectionObserver util or GSAP), stat count-up, toolbox marquee (2 rows, opposite directions, pause on hover), hover states. Everything must respect prefers-reduced-motion (all off, final values shown). Run build and test reduced-motion in DevTools.

### M5 — WebGL hero (sesi paling berat, mungkin 2 sesi)
> Implement the hero ParticleField with React Three Fiber per DESIGN.md WebGL section: cursor-reactive particles with gradient connection lines (g1→g2), subtle scroll reactivity, occasional formation of number fragments (600%, 40.6%, 13x). Dynamic import ssr:false, fade in after text renders, aria-hidden, adaptive quality via deviceMemory/hardwareConcurrency (particle count + DPR caps), static gradient+glow fallback for reduced-motion/no-WebGL. Hero text must remain the LCP. Run build; check bundle size impact.

### M6 — Halaman case study
> Build /work/[slug] with generateStaticParams for the 5 case studies from content.ts, following PRD section 6 structure: header, context, problem, what-I-did, results stat block, evidence gallery (next/image, lightbox on click, captions), tools, next-case-study link. Editorial and light — minimal motion, fast. Custom not-found.tsx on-brand. Run build.

### M7 — SEO & metadata
> Implement per-page metadata (title, description, OG images), JSON-LD via lib/schema.ts (Person + WebSite on home, Article on case studies), sitemap.ts, robots.ts, canonical URLs for domain andrewjevon.com. Verify JSON-LD with a validator. Run build.

### M8 — Polish & performance pass
> Run a full performance and a11y pass: next/image everywhere, font preload check, remove unused deps, verify no console errors, keyboard navigation + skip-to-content + focus states, color contrast AA, then run Lighthouse (mobile + desktop) and report scores against budget (desktop ≥80, mobile ≥60, SEO ≥95, A11y ≥95). Fix what's below budget. Delete /styleguide.

## 3. Setelah M8

Lanjut Fase 9 (QC & UAT — checklist terpisah akan saya siapkan) lalu Fase 10 (domain Hostinger + deploy Vercel). Jangan beli domain sebelum M8 selesai — tidak ada gunanya membayar lebih awal.

## 4. Troubleshooting cepat

- **Build error setelah M5:** biasanya three/drei versi tidak cocok — minta Claude Code: "pin compatible versions of three, @react-three/fiber, @react-three/drei and explain the choice".
- **Hero patah-patah di laptop:** turunkan particle count & matikan postprocessing; itu tuning pertama, bukan terakhir.
- **Font flash:** pastikan `display: 'swap'` dan subset `latin` di next/font.
- **Claude Code mengubah desain sendiri:** tunjuk kembali ke DESIGN.md ("re-read DESIGN.md; revert any token not defined there").
