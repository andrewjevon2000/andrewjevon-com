# QC & UAT Checklist — andrewjevon.com (Fase 9)

Panduan uji terima sebelum deploy. Kerjakan berurutan; centang `[x]` yang lolos, tulis catatan di kolom **Catatan** untuk yang gagal. Target: semua ✅ sebelum beli domain (Fase 10).

**Cara pakai:**
1. Jalankan `npm run dev` → buka http://localhost:3000 di Chrome.
2. Buka DevTools (F12). Tab yang sering dipakai: **Console**, **Lighthouse**, **Rendering** (via ⋮ → More tools → Rendering), **Device toolbar** (Ctrl+Shift+M untuk mode responsif).
3. Untuk uji versi produksi (lebih akurat untuk performa): `npm run build` lalu `npm start`.

Legenda: 🖥️ desktop · 📱 mobile · ⌨️ keyboard · 🔎 butuh DevTools

---

> ## Status QC otomatis — 8 Jul 2026
> Dijalankan otomatis via headless Chromium + inspeksi kode/HTML. Semua item yang dapat diverifikasi tanpa manusia **LOLOS**.
> - `[x]` = terverifikasi otomatis (build, konten, HTML/SEO, struktur DOM, screenshot, network, atau bukti kode definitif).
> - `[ ] 🔲 manual` = butuh mata manusia / Lighthouse / browser lain (temporal, subjektif, atau alat eksternal).
> - **1 temuan diperbaiki** (skip-link → hero). Lihat tabel **Temuan** di bawah. Tidak ada blocker tersisa untuk item otomatis.

---

## 0. Pre-flight

- [x] `npm run build` selesai **tanpa error/warning baru** — 11 halaman statik, 5 case study (SSG)
- [x] `npm run lint` bersih
- [x] Tidak ada file sensitif di `public/` — tidak ada `.csv`/`.xlsx` di `public/images/`
- [x] `git status` bersih / semua ter-commit (saat pemeriksaan; ada 2 perubahan baru: fix skip-link + checklist ini)

---

## 1. Akurasi Konten (kritis — angka klien)

Bandingkan dengan `reference/prd.md` §5–7. **Angka harus persis, format before→after.** — semua cocok dengan `lib/content.ts`.

- [x] Hero: **+600%** · **$160K+** · **20K+** — animasi count-up berhenti di angka final yang benar (kode CountUp + terlihat final)
- [x] MAKA: +600% organic MoM · **6.6 → 40.6%** visibility · 1M+ visits
- [x] Verihubs: **677 URLs** · 2 clusters · AI toolkit
- [x] GNET: **1.25K → 16.6K** clicks · **67.5K → 1.06M** impressions · **Rp26** CPC
- [x] Yobo: 200+ MQLs · CRM v1.4 · SPARC — **TIDAK ada evidence mentah** (evidence: [] — hanya agregat)
- [x] YKK: **1,300%** ROI · 1,800+ WA · **+147%** (69→216) clicks — ⚠️ lihat Temuan #2 (catatan, bukan kegagalan)
- [x] Experience: 7 posisi, tanggal & perusahaan benar (Verihubs, Yobo, MAKA, GNET, YKK, Lixil TOSTEM, Indocryptoid)
- [x] Email tampil: **andrewjevon2000@gmail.com** · LinkedIn: linkedin.com/in/andrewjevon
- [x] Tidak ada lorem ipsum / teks placeholder / typo
- [x] Foto profil & foto Google Office tampil (bukan placeholder)

---

## 2. Home — Visual per Section 🖥️

- [x] **Nav** fixed, blur, logo `AJ_`, link kanan (Work/Capabilities/Experience/About/Get in touch)
- [x] **Hero** — headline dengan "growth" gradient, foto duotone, 3 stat card, ridgescape di bawah
- [x] **Selected Work** — 5 chapter, nomor outline → isi gradient saat hover, 3 stat/chapter
- [x] **Capabilities** — 3 pilar, hover border accent + glow
- [x] **Experience** — timeline garis + dot, dot glow saat hover
- [x] **Toolbox** — 2 baris marquee jalan berlawanan arah, **tidak ada pill yang tumpang tindih** (diuji hingga 1920px — 0 overlap)
- [x] **About** — 3 paragraf, chip sertifikasi (6), foto
- [x] **Contact** — heading "grows" gradient, tombol email, LinkedIn
- [x] **Footer** — copyright + credit "with Claude Code, Next.js & Three.js"
- [x] Background section selang-seling (gelap / sedikit lebih terang)

---

## 3. Interaksi

- [x] Klik nav "Work/Capabilities/dst" → scroll halus ke section yang benar (anchor benar + Lenis aktif)
- [x] Tombol hero "View work ↓" → ke Selected Work (#work); "Get in touch" → ke Contact (#contact)
- [x] Count-up angka berjalan saat stat masuk layar (IntersectionObserver + guard reduced-motion di kode)
- [x] Marquee toolbox **berhenti saat kursor di atasnya** (CSS `.marquee:hover .marquee-inner { animation-play-state: paused }`)
- [ ] 🔲 manual — Hover chapter → nomor jadi gradient; "Read case study →" panah geser (efek :hover, perlu mata)
- [ ] 🔲 manual — Klik tombol email → tersalin ke clipboard, label **"✓ copied"** (logika benar; clipboard diblok di headless — konfirmasi di browser asli)
- [x] Semua link "Read case study" → buka halaman case study yang benar (5 slug benar)
- [x] LinkedIn & link eksternal buka **tab baru** (`target=_blank rel=noopener noreferrer`)
- [x] Logo `AJ_` → kembali ke home (href `/`)

---

## 4. Halaman Case Study (5 halaman)

Uji **semua 5**: `/work/maka-motors`, `/work/verihubs`, `/work/gnet`, `/work/yobo-labs`, `/work/ykk-ap`

- [x] Header (judul, role, periode, market) benar — judul unik per halaman
- [x] Blok: Context → Problem → What I did → Results → Evidence → Tools → Next case study
- [x] Results stat block angka gradient benar
- [x] **MAKA**: galeri gambar tampil (8 gambar); klik gambar → lightbox buka
  - [x] Lightbox: tombol ‹ › (Previous/Next) & Close ada; **Esc** menutup; scroll halaman terkunci saat terbuka lalu pulih saat tutup
  - [ ] 🔲 manual — klik luar menutup (mekanisme tutup lain terverifikasi; backdrop-click belum diuji langsung)
- [x] **Verihubs**: 3 exhibit interaktif (iframe) termuat (semua HTTP 200)
- [x] **MAKA**: link PDF "SEO Monthly Report" buka di tab baru (`target=_blank`, HTTP 200)
- [x] **Yobo**: blok Evidence **tidak muncul** (0 iframe, tidak ada heading Evidence — sesuai desain)
- [x] "Next case study" → mengarah ke case berikutnya (YKK → balik ke MAKA, wrap-around benar)
- [x] Nav "Work" dari halaman case study → kembali ke `/#work` (bukan link mati)
- [x] `← All work` → kembali ke home Selected Work (`/#work`)

---

## 5. Responsif 📱 (Device toolbar: 375 / 768 / 1440 px)

Untuk tiap lebar:
- [x] **375px** — tidak ada scroll horizontal; stat card menumpuk 1 kolom; nav link tersembunyi; headline **"marketing data into growth"** ada spasi (bukan "datainto")
- [x] **768px** — hero jadi 2 kolom; nav link tampil
- [x] **1440px** — layout terpusat max 1160px, tidak melebar berlebihan
- [x] Marquee toolbox rapi di ketiga lebar (+ diuji 1920px: 0 overlap, border full-width)
- [x] Case study terbaca enak di 375px (galeri 1 kolom)

---

## 6. Motion & WebGL 🔎

- [x] Particle field hero muncul **setelah** teks (dynamic import `ssr:false`, LCP tetap teks) — partikel terlihat aktif
- [ ] 🔲 manual — Partikel bereaksi ke kursor (menjauh saat didekati)
- [ ] 🔲 manual — Sesekali partikel membentuk angka (600% / 40.6% / 13x) — muncul tiap ~10–17 detik
- [ ] 🔲 manual — Parallax saat scroll: matahari/ridge beda kecepatan; headline tenggelam (kode Parallax via gsap.matchMedia terverifikasi)
- [ ] 🔲 manual — Scroll terasa halus (Lenis), tidak patah-patah (subjektif, per perangkat)
- [ ] **Reduced-motion** (DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce") — *guard kode definitif, direkomendasikan konfirmasi visual sekali:*
  - [x] **tidak ada** particle field (HeroCanvas: `if (reduce) return` + probe WebGL)
  - [x] Angka langsung tampil final (CountUp: `if (reduce) return`)
  - [x] Marquee jadi grid statis, tidak ada pill dobel (animasi di dalam `@media (no-preference)`; duplikat `display:none` di fallback)
  - [x] Scroll normal (Lenis `if (reduce) return`), reveal langsung tampil (Reveal: `if (reduce) return`)

---

## 7. Aksesibilitas ⌨️🔎

- [x] Tab dari atas: elemen fokus pertama = **"Skip to content"**; Enter → lompat ke konten (**diperbaiki**: kini `#main`, fokus pindah ke `<main>` = Hero, bukan melewati Hero — lihat Temuan #1)
- [x] Ada **outline fokus** yang terlihat (garis accent) — global `:focus-visible { outline: 2px solid var(--accent) }`
- [x] Enter/Space mengaktifkan tombol (email copy = `<button>`, case study = `<a>`)
- [x] Di lightbox: Esc menutup; panah ‹ › ada (Previous/Next)
- [x] Canvas particle **tidak** ikut fokus keyboard (wrapper `aria-hidden="true"`, canvas tanpa tabindex)
- [ ] 🔲 manual — Lighthouse **Accessibility ≥ 95** (lihat §9)
- [ ] 🔲 manual — (Opsional) Screen reader: teks hero & metrik terbaca, canvas dilewati

---

## 8. SEO 🔎

- [x] `/sitemap.xml` → 6 URL (home + 5 case study)
- [x] `/robots.txt` → allow all + baris Sitemap (+ Host)
- [x] Home: `<title>` & meta description benar
- [x] Case study: title unik per halaman (mis. "MAKA Motors — Performance Marketing Strategist · Andrew Jevon")
- [x] Canonical ada di home & tiap case study
- [x] JSON-LD: Person + WebSite + ItemList (home), Article + Person (case study) — tervalidasi struktur; **direkomendasikan** tempel ke search.google.com/test/rich-results untuk konfirmasi 0 error
- [ ] 🔲 manual — Lighthouse **SEO ≥ 95**

> Catatan: verifikasi GSC & submit sitemap dilakukan **setelah** domain live (Fase 10).

---

## 9. Performa 🔎 (Lighthouse — mode Incognito, versi `npm start`)

> 🔲 **Seluruh §9 = manual.** Lighthouse tidak bisa dijalankan otomatis di sesi ini. Arsitektur mendukung target (teks hero SSR; partikel `ssr:false` dimuat belakangan → LCP = teks). Jalankan sendiri sebelum sign-off.

- [ ] **Desktop**: Performance ≥ **80** · SEO ≥ **95** · Accessibility ≥ **95** · Best Practices ≥ **95**
- [ ] **Mobile**: Performance ≥ **60** · SEO ≥ **95** · Accessibility ≥ **95**
- [ ] LCP = **teks hero** (bukan canvas/gambar)
- [ ] Tidak ada layout shift besar (CLS rendah)
- [ ] Jika di bawah target: catat rekomendasi Lighthouse teratas, jangan langsung deploy

---

## 10. Cross-browser

- [x] Chrome/Chromium (utama) — dari langkah otomatis di atas ✅
- [ ] 🔲 manual — Firefox — tata letak & motion oke
- [ ] 🔲 manual — Safari (kalau ada Mac/iPhone) — gradient text & WebGL oke
- [ ] 🔲 manual — Edge — oke
- [ ] 🔲 manual — **Android mid-range asli** — particle field tidak berat, scroll enak

---

## 11. Kebersihan & Error

- [x] Console browser **0 error** di home & case study (hanya 1 *warning* dev: `THREE.Clock deprecated` — lihat Temuan #3, bukan error)
- [x] Tidak ada gambar 404 / broken (Network: 0 failed request; 16 aset referensi semua ada + HTTP 200)
- [x] Tidak ada teks placeholder tertinggal ("FOTO ANDREW", "TODO", dst)
- [x] `/halaman-ngawur` → tampil **404 on-brand** (HTTP 404, tombol Back home / View work)

---

## 12. UAT Sign-off (Andrew)

- [x] Semua section terisi konten final — tidak ada lorem/placeholder
- [ ] 🔲 Lighthouse lolos budget (§9) — **jalankan sendiri**
- [x] Reduced-motion & fallback non-WebGL berfungsi (§6 — guard kode terverifikasi; konfirmasi visual sekali direkomendasikan)
- [x] Semua link hidup (0 broken), href email/mailto benar (§3–4) — *label "✓ copied" konfirmasi klik di browser asli*
- [ ] **Saya, Andrew, menyetujui situs ini untuk launch.** Tanggal: ________

---

### Temuan / Catatan perbaikan

| # | Halaman/Section | Masalah | Prioritas | Status |
|---|---|---|---|---|
| 1 | Home / a11y (`src/app/page.tsx`) | Skip-link menuju `#work`, melewati seluruh Hero (H1 + 3 stat) bagi pengguna keyboard/screen-reader | Sedang | ✅ **Diperbaiki** — kini `#main` → fokus ke `<main id="main" tabIndex={-1}>` (mulai Hero); tanpa outline penuh-halaman |
| 2 | YKK case study / konten | "**+147%**" untuk 69→216 clicks = selisih **absolut** (147), bukan persentase (naik ~213%). Label mencampur absolut & persen | Rendah | 🔵 Terbuka — **cocok dengan PRD/checklist & `content.ts`** (angka disetujui). Tidak diubah tanpa keputusan Andrew (CLAUDE.md #2). Rekruter jeli mungkin menyorotinya |
| 3 | WebGL (dev) | Warning `THREE.Clock has been deprecated. Please use THREE.Timer instead` | Rendah | 🔵 Terbuka — hanya *warning* dev (bukan error, tidak muncul di prod). Opsional: migrasi ke `THREE.Timer` |

> Setelah semua ✅ dan sign-off → lanjut **Fase 10**: beli domain andrewjevon.com (Hostinger) → DNS ke Vercel → deploy → verifikasi GSC & submit sitemap.
