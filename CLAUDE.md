@AGENTS.md

# CLAUDE.md — andrewjevon.com

Portfolio pribadi Andrew Jevon (Growth Digital Marketer). Tampilan putih mengikuti situs live sebelumnya (Framer) — rebuild 1:1 di Next.js, konten data-driven. Owner: Andrew Jevon (non-developer — jelaskan keputusan teknis secara singkat saat relevan).

## Stack

- Next.js 16, App Router, TypeScript strict
- Tailwind CSS v4 (token dari DESIGN.md sebagai CSS variables di `globals.css`)
- Font: Open Runde (self-hosted `public/fonts`, body + heading), Instrument Serif italic, Delicious Handrawn, Geist, Inter via `next/font`
- Komponen UI: custom (`src/components/ui/` + `sections/`), token di `globals.css` dari DESIGN.md.
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
    page.tsx            — home (Hero, RolesTicker, Proof, Achievements, HowIWork, Faqs, Contact)
    work/[slug]/page.tsx — halaman project (generateStaticParams, 4 slug)
    not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx
  components/
    sections/           — Nav, Hero, RolesTicker, Proof, Achievements, HowIWork, Faqs, Contact, Footer
    work/CaseBlocks.tsx — blok halaman project: Highlights, Research, Decisions, Bars, Evidence, Exhibits
    ui/                 — Icons (SVG dari situs live), ContactForm, Appear (animasi muncul)
  lib/
    content.ts          — SEMUA konten (copy, metrik, case studies) — single source of truth
    schema.ts, og.tsx   — JSON-LD, OG image
public/
  fonts/                — Open Runde woff2
  images/site/          — foto profil, foto Google, gambar project
```

## Aturan Wajib

1. **DESIGN.md adalah hukum.** Tampilan = situs live sebelumnya; semua warna/font/spacing/motion dari token — dilarang hardcode nilai baru atau mengubah layout tanpa persetujuan Andrew.
2. **Konten hanya dari `lib/content.ts`.** Jangan mengarang metrik, klien, atau klaim baru. Angka mengikuti format yang ada (contoh "1.25K → 16.6K" jangan diubah jadi persen).
3. **SSR-first.** Semua teks & metrik harus ada di HTML server-rendered; interaksi (flip, nav, form) = progressive enhancement.
4. **Reduced-motion & no-WebGL fallback** wajib di setiap fitur bergerak, bukan ditambahkan belakangan.
5. **Performance budget:** Lighthouse target: desktop Perf ≥80, mobile ≥60, SEO ≥95, A11y ≥95. Font total ≤700KB. Cek `npm run build` output tiap milestone.
6. **Jangan install library baru** di luar stack di atas tanpa menjelaskan alasan + minta konfirmasi.
7. Komponen kecil dan fokus; server components kecuali butuh interaktivitas (`'use client'` seperlunya).
8. Commit per milestone dengan pesan deskriptif. Jangan commit `node_modules`, `.env`.
9. **Next.js 16 breaking changes.** Proyek ini menggunakan Next.js 16, bukan 15 — konvensi App Router/API bisa berbeda dari training data. Baca `node_modules/next/dist/docs/` untuk hal yang tidak familiar sebelum menulis kode (lihat AGENTS.md).

## Definition of Done (per task)

- `npm run build` sukses tanpa error/warning baru
- Responsive: 375px, 768px, 1440px
- Reduced-motion diuji (DevTools → Rendering → emulate)
- Tidak ada console error di browser
