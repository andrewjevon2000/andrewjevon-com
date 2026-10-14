# DESIGN.md — andrewjevon.com

Design system "Aurora Light" — Data-Editorial di kanvas putih (sejak 14 Okt 2026; sebelumnya immersive dark). Sumber kebenaran visual untuk seluruh project.
Referensi hidup: `05-prototype-andrewjevon-com.html` (prototype approved 7 Jul 2026).

## Philosophy

Situs immersive dark dengan disiplin editorial. Angka pencapaian adalah ornamen utama — bukan ilustrasi, bukan stock art. Gradient adalah identitas, tapi dijatah ketat (aturan 90/10): surface & body text monokrom, gradient hanya untuk momen penting. Kontras antara canvas WebGL yang hidup dan tipografi yang disiplin adalah sumber kesan premium.

## Color Tokens — "Aurora Light" (14 Okt 2026)

**Keputusan (Andrew, 14 Okt 2026):** situs mengikuti tampilan putih situs Framer andrewjevon.com yang sudah live. Palet gelap Aurora (near-black + gradient violet→cyan) diganti; struktur, spacing, motion dan WebGL tetap.

```css
--bg:      #ffffff;   /* base canvas — putih */
--bg2:     #f6f6f7;   /* alternating section background */
--panel:   #ffffff;   /* cards — dibedakan lewat border + bayangan lembut */
--line:    #ececee;   /* borders, dividers */
--txt:     #141414;   /* primary text */
--dim:     #5f5f68;   /* secondary text — 6.3:1 di putih */
--dimmer:  #6f6f78;   /* tertiary/labels — 5.1:1 (WCAG AA) */
--ink:     #141414;   /* CTA solid, logo, node root */
--g1:      #2f7cf6;   /* accent — biru Framer */
--g2:      #1d4ed8;   /* accent gelap (ujung gradient) */
--grad:    linear-gradient(100deg, #2f7cf6, #1d4ed8);
--accent:  var(--g1);
--accent-soft: color-mix(in srgb, var(--g1) 10%, white);
--accent-glow: color-mix(in srgb, var(--g1) 28%, transparent);
--shadow:    0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06);
--shadow-lg: 0 2px 4px rgba(0,0,0,.05), 0 16px 32px rgba(0,0,0,.08);
```

### Penekanan (aturan 90/10 tetap berlaku) — HANYA untuk:
1. Kata kunci di display headline — **Instrument Serif italic**, warna `--txt` (kelas `.grad-text` di dalam h1/h2, atau `.serif-em`)
2. Angka metrik (stat numbers) — `--accent` biru (kelas `.grad-text` di luar heading)
3. CTA solid — `--ink` hitam, teks putih, pill
4. Label section tulisan tangan (`.hand`, Delicious Handrawn, `--accent`) — format `#Selected Work`
5. Glow blobs hero — opacity ≤ .10
6. Garis koneksi particle field (biru)

### JANGAN:
- Gradient pada body text, border, atau background section
- Warna selain `--accent` dan `--ink` sebagai aksen
- Bayangan lebih pekat dari `--shadow-lg` (terlihat murahan di putih)
- Teks di bawah 4.5:1 di `--bg` / `--bg2`

## Typography

| Peran | Font | Weight | Catatan |
|---|---|---|---|
| Display / headings + body | Hanken Grotesk | 300, 400, 500, 700 | SATU keluarga untuk display & body, mengikuti model Meta |
| Kata kunci headline, logo | Instrument Serif | 400 italic | Penekanan ala Framer; via `next/font/google` |
| Label section | Delicious Handrawn | 400 | `.hand` — "#Selected Work"; via `next/font/google` |
| Angka, meta, label teknis | JetBrains Mono | 400, 600, 800 | SEMUA metrik & tanggal pakai mono |

**Keputusan tipografi (7 Jul 2026, Andrew):** mengikuti sistem tipografi Meta (DESIGN-meta.md, Optimistic VF) dengan **Hanken Grotesk** sebagai padanan open-license — satu keluarga sans untuk display + body. Karakter kunci dari Meta: **heading weight 500 (BUKAN bold 700)**, line-height ketat (h1 1.16 · h2 1.17 · h3 1.25), body 16px/1.5 dengan letter-spacing −0.16px, button 14px/700/−0.14px. Riwayat: Space Grotesk (awal) → GG Wolfram (pixel, dilepas) → Tempting (script, dilepas — demo license) → Hanken Grotesk (final). Alfena Pixel & Tempting DITOLAK permanen: demo/personal-use license.

Scale (ukuran clamp tetap, karakter Meta): hero h1 `clamp(38px, 6vw, 72px)` lh 1.16 · section h2 `clamp(28px, 4vw, 44px)` lh 1.17 · chapter title `clamp(21px, 2.6vw, 30px)` lh 1.25 · stat number `clamp(26px, 3.4vw, 40px)` (mono 800) · kicker/label 11–13px, uppercase, letter-spacing .2–.28em (mono).

Load: Hanken Grotesk & JetBrains Mono via `next/font/google` (subset latin, display swap). Jangan pakai Google Fonts CDN di production.

## Spacing & Layout

- Container: max-width 1160px, padding-x 32px
- Section padding-y: 110px (60px mobile)
- Grid gaps: 14–20px (cards), 30–48px (kolom major)
- Radii: cards 12–16px, pills 99px, buttons 99px
- Section backgrounds selang-seling `--bg` / `--bg2`

## Component Library

Semua komponen UI custom, dibangun dengan token Aurora + Tailwind v4 (`src/components/ui/` + `src/components/sections/`). **DESIGN-meta.md** tetap jadi referensi POLA (typography scale, button variants, badges & status, cards & containers, forms & inputs, elevation & depth) — bukan sumber warna/brand.

Catatan: Astryx (@astryxdesign/core) sempat diintegrasikan lalu **dilepas di M8** (7 Jul 2026, keputusan Andrew) karena tidak ada komponen yang benar-benar dipakai di situs — hanya menambah ~21KB gzip CSS tak terpakai. Kalau kelak butuh komponen fungsional kompleks (dialog, table, form) yang belum ada, boleh install ulang: `npm i @astryxdesign/core @astryxdesign/theme-neutral`.

## Components

- **Stat card**: panel bg gradient-to-transparent, border `--line`, hover: border `--accent` + translateY(-3px)
- **Chapter**: grid `110px 1fr`, border-top `--line`, nomor outline stroke (`-webkit-text-stroke 1px --dimmer`) → hover jadi gradient fill
- **Pill/tool tag**: mono 13px, border `--line`, hover border+teks accent
- **Timeline**: garis kiri 1px `--line`, dot 9px hover glow accent
- **Buttons**: solid = gradient bg + hover glow `0 0 34px --accent-glow` + translateY(-2px); ghost = border `--line` hover accent
- **Email button**: mono, panel bg, click → copy + label "✓ copied"
- **Nav**: fixed, blur(14px), bg rgba(8,8,12,.65), border-bottom `--line`, tinggi 60px

## Motion

- Reveal on scroll: opacity 0→1 + translateY 34px→0, 0.7s ease, threshold .15, sekali saja (unobserve)
- Count-up: 1400ms, easing cubic-out, trigger threshold .6
- Hover transitions: 0.25–0.3s
- Marquee toolbox: 32s/38s linear infinite, 2 baris arah berlawanan, pause on hover
- Smooth scroll: Lenis (lerp default). Chapter transitions: GSAP ScrollTrigger
- **Parallax** (GSAP ScrollTrigger scrub, GPU transform only): glow blobs ±0.16–0.22, foto hero −0.07, nomor chapter −0.06 (kecepatan relatif terhadap viewport center). Halus — parallax adalah depth cue, bukan atraksi. Elemen teks body TIDAK di-parallax (keterbacaan)
- **prefers-reduced-motion: SEMUA animasi off, angka langsung final, WebGL diganti gradient statis + glow blobs**

## Hero Scene — "Aurora Ridgescape" (layered parallax, ref: Dribbble "Parallax Mountain")

Hero = pemandangan abstrak bertumpuk dalam palet brand, BUKAN gunung literal/ilustratif:
- Lapisan (belakang→depan): particle field (bintang) → sun/glow horizon (radial g1+g2, blur, opacity .55) → ridge jauh (#191340, stroke tipis g1 30%) → ridge tengah (#110e28, stroke g2 18%) → **teks hero** → ridge depan (warna --bg, menyatu dengan section berikutnya)
- Kecepatan parallax (scrub terhadap viewport center): sun 0.38 · ridge jauh 0.22 · ridge tengah 0.11 · teks hero 0.15 (tenggelam) · ridge depan −0.06 (naik) · glow blobs ±0.16–0.22 · foto −0.07
- Efek kunci: saat scroll, headline TENGGELAM di belakang ridge depan — stat cards tetap di atas (z-index tertinggi)
- Ridge = SVG polygon flat fill (murah dirender); di build final ridge boleh ditingkatkan jadi mesh R3F dengan mist/fog tipis
- Transform GPU-only, `will-change:transform` pada layer aktif

## WebGL (R3F)

- Hero: particle field (berperan sebagai bintang di atas ridgescape), reaktif cursor (repulsi radius ~140px) & scroll; garis koneksi gradient g1→g2; partikel sesekali membentuk fragmen angka (600%, 40.6%, 13x)
- Jumlah partikel: desktop ~110–300, mobile ≤ 50, via deteksi `navigator.deviceMemory` / `hardwareConcurrency`; DPR cap 1.5 mobile / 2 desktop
- Canvas selalu `aria-hidden`, dynamic import (`next/dynamic`, ssr:false), muncul fade-in SETELAH teks hero ter-render
- Fallback tanpa WebGL: CSS gradient + glow blobs (visual tetap layak)

## Voice & Copy

Bahasa Inggris. Kalimat pendek, confident, tanpa buzzword kosong ("passionate", "results-driven" dilarang). Angka selalu spesifik dan format mentah before→after bila dari screenshot (contoh: "1.25K → 16.6K clicks"). Title case hanya nama; sisanya sentence case.
