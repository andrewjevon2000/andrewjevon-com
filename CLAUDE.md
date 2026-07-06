@AGENTS.md

# CLAUDE.md — andrewjevon.com

Portfolio pribadi Andrew Jevon (Technical Digital Marketer). Immersive dark site, WebGL scroll-driven, konten data-driven. Owner: Andrew Jevon (non-developer — jelaskan keputusan teknis secara singkat saat relevan).

## Stack

- Next.js 16, App Router, TypeScript strict
- Tailwind CSS v4 (token dari DESIGN.md sebagai CSS variables di `globals.css`)
- React Three Fiber + drei (WebGL), GSAP ScrollTrigger, Lenis (smooth scroll)
- Font via `next/font/google`: Space Grotesk, Inter, JetBrains Mono
- Deploy: Vercel. Analytics: GA4.

## Commands

- `npm run dev` — dev server (localhost:3000)
- `npm run build` — production build (WAJIB lolos sebelum menganggap task selesai)
- `npm run lint` — ESLint

## Architecture

```
src/
  app/
    layout.tsx          — root layout, fonts, metadata default, GA4
    page.tsx            — home (7 section)
    work/[slug]/page.tsx — case study (generateStaticParams, 5 slug)
    not-found.tsx       — custom 404
    sitemap.ts, robots.ts
  components/
    sections/           — Hero, SelectedWork, Capabilities, Experience, Toolbox, About, Contact
    webgl/              — ParticleField (dynamic import, ssr:false), adaptiveQuality util
    ui/                 — StatCard, Pill, Button, SectionHead, CountUp, Reveal
  lib/
    content.ts          — SEMUA konten (copy, metrik, case studies) — single source of truth
    schema.ts           — JSON-LD builders (Person, WebSite, Article)
public/
  images/               — foto, evidence screenshots (dioptimasi)
```

## Aturan Wajib

1. **DESIGN.md adalah hukum.** Semua warna/font/spacing/motion dari token — dilarang hardcode nilai baru tanpa persetujuan Andrew.
2. **Konten hanya dari `lib/content.ts`.** Jangan mengarang metrik, klien, atau klaim baru. Angka mengikuti format yang ada (contoh "1.25K → 16.6K" jangan diubah jadi persen).
3. **SSR-first.** Semua teks & metrik harus ada di HTML server-rendered. WebGL & animasi = progressive enhancement di atasnya. Canvas selalu `aria-hidden`, dynamic import.
4. **Reduced-motion & no-WebGL fallback** wajib di setiap fitur bergerak, bukan ditambahkan belakangan.
5. **Performance budget:** LCP = teks hero. Lighthouse target: desktop Perf ≥80, mobile ≥60, SEO ≥95, A11y ≥95. Asset 3D+font total ≤1.5MB gzip. Cek `npm run build` output size tiap milestone.
6. **Jangan install library baru** di luar stack di atas tanpa menjelaskan alasan + minta konfirmasi.
7. Komponen kecil dan fokus; server components kecuali butuh interaktivitas (`'use client'` seperlunya).
8. Commit per milestone dengan pesan deskriptif. Jangan commit `node_modules`, `.env`.
9. **Next.js 16 breaking changes.** Proyek ini menggunakan Next.js 16, bukan 15 — konvensi App Router/API bisa berbeda dari training data. Baca `node_modules/next/dist/docs/` untuk hal yang tidak familiar sebelum menulis kode (lihat AGENTS.md).

## Definition of Done (per task)

- `npm run build` sukses tanpa error/warning baru
- Responsive: 375px, 768px, 1440px
- Reduced-motion diuji (DevTools → Rendering → emulate)
- Tidak ada console error di browser
