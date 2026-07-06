# PRD — andrewjevon.com

Portfolio Website Andrew Jevon · v1.0 · 6 Juli 2026
Referensi: 01-project-plan, 02-research-deep-dive (arah desain terkunci: Immersive Data-Editorial)

---

## 1. Ringkasan

Website portfolio pribadi immersive (WebGL scroll-driven) yang memposisikan **Andrew Jevon sebagai Technical Digital Marketer — SEO × Performance × Web**, dengan angka pencapaian sebagai elemen visual utama. Domain: **andrewjevon.com**. Semua metrik CV disetujui untuk publik.

**Tagline hero (draft):** "I turn complex marketing data into growth."
Sub: Technical digital marketer with 4+ years running the web, SEO, and performance backbone of marketing teams — Indonesia, Philippines, US markets.

## 2. Tujuan & Metrik Sukses

| Tujuan | Ukuran |
|---|---|
| Menarik peluang karier & klien freelance | Inquiry via email/LinkedIn dari situs |
| Membuktikan kemampuan (show, don't tell) | Situs immersive yang tetap lolos performance budget |
| Terindeks & menguasai SERP nama sendiri | #1 untuk "Andrew Jevon" dalam 2–4 minggu post-launch |
| Performance budget | Lighthouse desktop ≥80 Perf, mobile ≥60 Perf, SEO ≥95, A11y ≥95 |

## 3. Audiens

1. **Recruiter/hiring manager** (ID + SEA + remote global) — butuh scan cepat: siapa, bisa apa, buktinya.
2. **Potential client** (founder/CMO butuh SEO/performance) — butuh kredibilitas + cara kontak.
3. **Sesama praktisi** — amplifikasi, referral.

Perilaku kunci: recruiter rata-rata memberi <60 detik. → Aturan desain: **informasi inti harus tersampaikan meski user hanya scroll 2 layar**; immersive tidak boleh menyandera konten.

## 4. Information Architecture

```
/                    → Home (one-page immersive, 7 section)
/work/maka-motors    → Case study 1 (flagship)
/work/verihubs       → Case study 2
/work/gnet           → Case study 3
/work/yobo-labs      → Case study 4 (dipisah dari YKK per feedback Andrew 7 Jul)
/work/ykk-ap         → Case study 5
/cv                  → (opsional v1.1) HTML CV / link download PDF
404                  → Custom, on-brand
```

Halaman utama = immersive penuh. Halaman /work/* = **editorial ringan** (teks + gambar + stat block, motion minimal) — cepat, scannable, print-friendly.

## 5. Spesifikasi Section — Home

### 5.1 Hero (immersive)
- WebGL canvas full-viewport: particle/shader field yang bereaksi terhadap cursor & scroll. Partikel dapat membentuk/melebur angka-angka kunci (600%, 40.6%, 13x).
- Konten (server-rendered, tampil sebelum canvas hydrate): nama, tagline, sub-positioning, 3 metrik headline, CTA "View work ↓" + "Get in touch".
- 3 metrik headline: **+600% organic traffic (MoM)** · **$160K+ ad budget managed** · **20K+ leads generated**.
- Foto Andrew: treatment monokrom/duotone menyatu dengan dark canvas.

### 5.2 Selected Work (4 chapter, scroll-driven)
Tiap case study = satu "chapter" dengan transisi WebGL antar chapter. Konten per chapter: klien + periode, satu kalimat masalah, 2–3 stat besar (count-up on view), link "Read case study →".

| Chapter | Klien | Stat yang ditonjolkan |
|---|---|---|
| 01 | MAKA Motors | +600% organic MoM · 6.6%→40.6% SEO visibility · 1M+ visits |
| 02 | Verihubs | 677-URL audit · 2 negative-SEO clusters found · AI toolkit |
| 03 | GNET Indonesia | 1.25K→16.6K clicks · 67.5K→1.06M impressions · CPC Rp26 |
| 04 | Yobo Labs | 200+ MQLs · CRM scoring v1.4 · SPARC framework |
| 05 | YKK AP Sinar Fortuna | 1,300% ROI · 1,800+ WA conversations · +147% organic clicks |

**Design language (keputusan Fase 7):** dual-color gradient sebagai identitas — dipakai HANYA pada: display keyword, angka metrik, CTA solid, glow, dan garis partikel. Body text & surface tetap monokrom (rasio ±90/10) agar gradient tetap terasa premium, tidak murahan. Kandidat tema (Andrew memilih di prototype): Signal (green→cyan), Aurora (violet→cyan), Ember (coral→magenta), Ocean (blue→violet). Semua pasangan analogous/adjacent-hue — menghindari komplementer yang menghasilkan "mud zone" di tengah gradient.

### 5.3 Capabilities
3 pilar + daftar keahlian di bawah masing-masing:
- **SEO & Technical** — technical audits, cannibalization, schema/hreflang, GSC/GA4, AI Overview/GEO optimization
- **Performance Marketing** — Meta/Google/TikTok Ads, funnel & CRO, budget management, attribution
- **Web & AI Operations** — end-to-end website builds (4 situs), WordPress CMS ops, AI-assisted SEO toolkit (Claude), workflow automation

### 5.4 Experience Timeline
7 posisi dari CV, format kompak: tahun — role — perusahaan — 1 baris hasil terbaik. Scroll-linked progress line.

### 5.5 Toolbox
Logo/nama tools: Google Ads, Meta Ads, TikTok Ads, GA4, GTM, GSC, Semrush, Ahrefs, WordPress, Figma, Claude.

### 5.6 Certifications & Education
RevoU FSDM, Google Skillshop, Rakamin, Google Digital Garage + Untar (Interior Design, GPA 3.75 — sengaja ditampilkan: menjelaskan sisi desain).

### 5.7 Contact / Footer
- Email: andrewjevon2000@gmail.com (mailto + copy button)
- LinkedIn: linkedin.com/in/andrewjevon
- Lokasi: Tangerang, Indonesia · Open to: full-time / freelance / consulting (konfirmasi)
- Footer kecil: "Designed & built by Andrew Jevon — with Claude Code, Next.js & Three.js" (ini selling point, bukan disclaimer)

## 6. Spesifikasi Halaman Case Study (/work/*)

Struktur seragam:
1. Header: klien, role, periode, market
2. **Context** (2–3 kalimat)
3. **Problem** (bullet 2–4)
4. **What I did** (bullet 3–6, verba aktif)
5. **Results** — stat block 3–4 kartu angka + narasi singkat
6. **Evidence** — screenshot GSC/GA4/Ads (lihat §7)
7. **Tools used** + CTA next case study

## 7. Evidence — Status Setelah Ekstraksi PDF Portfolio (7 Jul 2026)

53 gambar diekstrak dari `Digital Marketing Portfolio.pdf` → tersimpan di `outputs/assets/evidence/` (penamaan `pXX_*` = nomor halaman PDF). Status:

| Case study | Status (update 7 Jul — Andrew menambahkan folder evidence) |
|---|---|
| MAKA Motors | ✅ LENGKAP: grafik GSC, visibility & top-100, analisa kompetitor Similarweb, Meta Ads per funnel, SEO Monthly Report PDF, screenshot website, poster campaign Duta, report xlsx |
| GNET | ✅ GSC asli (p10_X16: 1.25K→16.6K klik, 67.5K→1.06M impresi) + foto tim GIAS. Kurang: screenshot Meta Ads CPC Rp26 (opsional) |
| YKK | ✅ GSC 12 bulan PNG + CSV export lengkap (queries/pages/devices/countries) |
| Verihubs | ✅ 3 exhibit HTML interaktif (cannibalization, lead quality shift, hreflang/schema audit) — bisa di-embed langsung, nilai tambah unik |
| Yobo Labs | ✅ CSV campaign all-time + deals tracker → **hanya boleh tampil sebagai agregat** |

**⚠️ Data sensitif:** `Yobo New Deals Tracker.csv` (nama klien, nilai kontrak, incentive) dan CSV ads (spend detail) = bahan mentah internal, DILARANG tampil raw di website. Hanya agregat yang sudah disetujui ("200+ MQLs", "contracts worth hundreds of millions IDR"). Foto personal (Google Office, tim GIAS, IIMS) → kandidat section About.

**Aturan angka tunggal (kritis):** ada inkonsistensi antara CV dan PDF portfolio yang harus diseragamkan sebelum publik — GNET CTR ditulis 9,4% di CV tapi 10,27% di PDF; impresi ditulis +1.400% (CV) vs +1.220% (PDF), padahal screenshot GSC menunjukkan 67,5K→1,06M (≈15,7x). Keputusan desain: **website selalu menampilkan angka mentah before→after dari screenshot** (mis. "1.25K → 16.6K clicks"), bukan persentase hasil hitungan — lebih kredibel dan tidak bisa salah. Persentase hanya dipakai jika terverifikasi dari sumbernya.

Aturan lain: blur data akun/biaya sensitif; placeholder mockup dipakai untuk slot yang masih kurang. Akses scrape akun tidak diperlukan.

### 7b. Data tambahan dari PDF portfolio (masuk konten)
- MAKA: 1.000+ qualified leads dari satu campaign Meta, CPL < Rp10.000.
- YKK: WA chat conversion rate (CVR) > 45%; SEO Jun–Jul 2025: klik 69→216, impresi 4,7K→12,5K dalam 2 bulan.
- Sertifikat tambahan: Social Media Marketing (HubSpot Academy), SEO Principles (Semrush Academy).
- Tools tambahan untuk section Toolbox: Screaming Frog, Similarweb, Canva, Photoshop, Whimsical, AnswerThePublic, Mailchimp, HubSpot.
- Positioning title di PDF: "Digital Marketing Strategist" — website memakai positioning PRD ("Technical Digital Marketer") sesuai keputusan riset; konsisten di semua kanal sebaiknya disamakan nanti.
- Catatan email: Gmail mengabaikan titik — `andrew.jevon2000@` dan `andrewjevon2000@` adalah inbox yang sama. Untuk display dipakai `andrewjevon2000@gmail.com` (pilihan Andrew, 7 Jul 2026).

## 8. Functional Requirements

| ID | Requirement | Prioritas |
|---|---|---|
| F1 | WebGL hero interaktif (cursor + scroll reactive) dengan SSR text fallback | Must |
| F2 | Smooth scroll (Lenis) + scroll-triggered chapter transitions (GSAP) | Must |
| F3 | Number count-up saat metrik masuk viewport | Must |
| F4 | Adaptive quality: GPU/deviceMemory detection → turunkan DPR/particle | Must |
| F5 | `prefers-reduced-motion` → nonaktifkan WebGL & smooth scroll, layout statis penuh | Must |
| F6 | 4 halaman case study editorial | Must |
| F7 | Copy-email button, mailto, link LinkedIn | Must |
| F8 | Custom 404 | Should |
| F9 | Dark/light toggle | Won't (v1 dark-only, konsisten dengan arah) |
| F10 | Blog/CMS | Won't v1 |

## 9. Non-Functional Requirements

- **SEO:** metadata unik per halaman, OG image per case study, JSON-LD `Person` + `WebSite` + `Article` (case study), sitemap.xml, robots.txt, canonical. Konten inti harus ada di HTML (bukan hanya dalam canvas).
- **Performance:** LCP = teks hero (bukan canvas); canvas dynamic-import setelah first paint; asset 3D ≤ total 1.5MB gzip; font subset & preload; target CWV: LCP <2.5s desktop / <4s mobile 4G.
- **A11y:** semua konten keyboard-navigable, kontras AA, canvas `aria-hidden`, skip-to-content, reduced-motion.
- **Analytics:** GA4 + GSC verification sejak hari pertama launch.
- **Browser support:** Chrome/Safari/Firefox/Edge 2 versi terakhir; WebGL gagal → fallback statis otomatis.

## 10. Tech Stack (final)

- Next.js 15 (App Router, TypeScript) + Tailwind CSS
- Three.js via React Three Fiber + drei; postprocessing seperlunya
- GSAP ScrollTrigger + Lenis
- Font: Geist / Inter (sans) + Geist Mono (angka) — open license, substitusi bisa diputuskan di prototype
- Design language baseline: DESIGN.md dari getdesign.md (kandidat: Shopify / Bugatti) → dikustomisasi jadi token "AJ"
- Hosting: **Vercel** (free tier) · Domain: **andrewjevon.com via Hostinger** → DNS ke Vercel
- Repo: GitHub → auto-deploy

## 11. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| WebGL setengah-jadi terlihat amatir | Prototype dulu (Fase 7) sebelum coding; polish per chapter, bukan semua sekaligus; berani pangkas 1 efek daripada 5 efek medioker |
| Scope creep immersive → tidak launch | Definisi MVP immersive: hero + transisi chapter. Efek lain = backlog v1.1 |
| Mobile berat | Adaptive quality (F4) + uji di Android mid-range nyata |
| Metrik klien digugat kemudian hari | Semua sudah dinyatakan boleh publik oleh Andrew (6 Jul 2026); screenshot di-blur bagian sensitif |
| Foto belum tersimpan sebagai file | Andrew simpan file foto asli ke folder project saat Fase 8 |

## 12. Acceptance Criteria (gerbang launch)

1. Semua section Home + 4 case study terisi konten final (bukan lorem/placeholder evidence boleh menyusul v1.1)
2. Lighthouse: Perf desktop ≥80, mobile ≥60, SEO ≥95, A11y ≥95, Best Practices ≥95
3. Reduced-motion & non-WebGL fallback berfungsi
4. Semua link hidup (0 broken), form/mailto teruji
5. Terindeks: GSC verified, sitemap submitted
6. UAT sign-off oleh Andrew (skenario di Fase 9)
