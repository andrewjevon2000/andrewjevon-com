# QC & UAT Checklist — andrewjevon.com (Fase 9)

Panduan uji terima sebelum deploy. Kerjakan berurutan; centang `[x]` yang lolos, tulis catatan di kolom **Catatan** untuk yang gagal. Target: semua ✅ sebelum beli domain (Fase 10).

**Cara pakai:**
1. Jalankan `npm run dev` → buka http://localhost:3000 di Chrome.
2. Buka DevTools (F12). Tab yang sering dipakai: **Console**, **Lighthouse**, **Rendering** (via ⋮ → More tools → Rendering), **Device toolbar** (Ctrl+Shift+M untuk mode responsif).
3. Untuk uji versi produksi (lebih akurat untuk performa): `npm run build` lalu `npm start`.

Legenda: 🖥️ desktop · 📱 mobile · ⌨️ keyboard · 🔎 butuh DevTools

---

## 0. Pre-flight

- [ ] `npm run build` selesai **tanpa error/warning baru**
- [ ] `npm run lint` bersih
- [ ] Tidak ada file sensitif di `public/` — jalankan: cek tidak ada `.csv`/`.xlsx` di `public/images/` (deals tracker & ad-spend hanya boleh di `evidence-raw/` yang gitignored)
- [ ] `git status` bersih / semua ter-commit

---

## 1. Akurasi Konten (kritis — angka klien)

Bandingkan dengan `reference/prd.md` §5–7. **Angka harus persis, format before→after.**

- [ ] Hero: **+600%** · **$160K+** · **20K+** — dan animasi count-up berhenti di angka final yang benar
- [ ] MAKA: +600% organic MoM · **6.6 → 40.6%** visibility · 1M+ visits
- [ ] Verihubs: **677 URLs** · 2 clusters · AI toolkit
- [ ] GNET: **1.25K → 16.6K** clicks · **67.5K → 1.06M** impressions · **Rp26** CPC
- [ ] Yobo: 200+ MQLs · CRM v1.4 · SPARC — **dan TIDAK ada evidence mentah** (hanya agregat)
- [ ] YKK: **1,300%** ROI · 1,800+ WA · **+147%** (69→216) clicks
- [ ] Experience: 7 posisi, tanggal & perusahaan benar (Verihubs, Yobo, MAKA, GNET, YKK, Lixil TOSTEM, Indocryptoid)
- [ ] Email tampil: **andrewjevon2000@gmail.com** · LinkedIn: linkedin.com/in/andrewjevon
- [ ] Tidak ada lorem ipsum / teks placeholder / typo
- [ ] Foto profil & foto Google Office tampil (bukan placeholder)

---

## 2. Home — Visual per Section 🖥️

- [ ] **Nav** fixed, blur, logo `AJ_`, link kanan (Work/Capabilities/Experience/About/Get in touch)
- [ ] **Hero** — headline dengan "growth" gradient, foto duotone, 3 stat card, ridgescape di bawah
- [ ] **Selected Work** — 5 chapter, nomor outline → isi gradient saat hover, 3 stat/chapter
- [ ] **Capabilities** — 3 pilar, hover border accent + glow
- [ ] **Experience** — timeline garis + dot, dot glow saat hover
- [ ] **Toolbox** — 2 baris marquee jalan berlawanan arah, **tidak ada pill yang tumpang tindih** (cek juga di layar lebar >1600px)
- [ ] **About** — 3 paragraf, chip sertifikasi, foto
- [ ] **Contact** — heading "grows" gradient, tombol email, LinkedIn
- [ ] **Footer** — copyright + credit "with Claude Code, Next.js & Three.js"
- [ ] Background section selang-seling (gelap / sedikit lebih terang)

---

## 3. Interaksi

- [ ] Klik nav "Work/Capabilities/dst" → scroll halus ke section yang benar
- [ ] Tombol hero "View work ↓" → ke Selected Work; "Get in touch" → ke Contact
- [ ] Count-up angka berjalan saat stat masuk layar (bukan langsung muncul)
- [ ] Marquee toolbox **berhenti saat kursor di atasnya**
- [ ] Hover chapter → nomor jadi gradient; "Read case study →" panah geser
- [ ] Klik tombol email → tersalin ke clipboard, label berubah **"✓ copied"**
- [ ] Semua link "Read case study" → buka halaman case study yang benar
- [ ] LinkedIn & link eksternal buka **tab baru**
- [ ] Logo `AJ_` → kembali ke home

---

## 4. Halaman Case Study (5 halaman)

Uji **semua 5**: `/work/maka-motors`, `/work/verihubs`, `/work/gnet`, `/work/yobo-labs`, `/work/ykk-ap`

- [ ] Header (judul, role, periode, market) benar
- [ ] Blok: Context → Problem → What I did → Results → Evidence → Tools → Next case study
- [ ] Results stat block angka gradient benar
- [ ] **MAKA**: galeri gambar tampil; klik gambar → lightbox buka
  - [ ] Lightbox: panah ‹ › ganti gambar; **Esc** menutup; klik luar menutup; scroll halaman terkunci saat terbuka
- [ ] **Verihubs**: 3 exhibit interaktif (iframe) termuat & bisa di-scroll
- [ ] **MAKA**: link PDF "SEO Monthly Report" buka di tab baru
- [ ] **Yobo**: blok Evidence **tidak muncul** (memang sengaja — data internal)
- [ ] "Next case study" → mengarah ke case berikutnya (YKK → balik ke MAKA)
- [ ] Nav "Work" dari halaman case study → kembali ke `/#work` (bukan link mati)
- [ ] `← All work` → kembali ke home Selected Work

---

## 5. Responsif 📱 (Device toolbar: 375 / 768 / 1440 px)

Untuk tiap lebar:
- [ ] **375px** — tidak ada scroll horizontal; stat card & chapter menumpuk 1 kolom; nav link tersembunyi; headline **"marketing data into growth"** ada spasi (bukan "datainto")
- [ ] **768px** — hero jadi 2 kolom; nav link tampil
- [ ] **1440px** — layout terpusat max 1160px, tidak melebar berlebihan
- [ ] Marquee toolbox rapi di ketiga lebar
- [ ] Case study terbaca enak di 375px (galeri 1 kolom)

---

## 6. Motion & WebGL 🔎

- [ ] Particle field hero muncul (fade-in) **setelah** teks, bukan sebelum
- [ ] Partikel bereaksi ke kursor (menjauh saat didekati)
- [ ] Sesekali partikel membentuk angka (600% / 40.6% / 13x) — sabar, muncul tiap ~10–17 detik
- [ ] Parallax saat scroll: matahari/ridge bergerak beda kecepatan; **headline tenggelam** di balik ridge depan
- [ ] Scroll terasa halus (Lenis), tidak patah-patah di laptop Anda
- [ ] **Reduced-motion** (DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce"):
  - [ ] Reload → **tidak ada** particle field (fallback gradient statis)
  - [ ] Angka langsung tampil final (tanpa count-up)
  - [ ] Marquee jadi grid statis (tidak bergerak), tidak ada pill dobel
  - [ ] Scroll normal (bukan smooth Lenis), reveal langsung tampil

---

## 7. Aksesibilitas ⌨️🔎

- [ ] Tab dari atas: elemen fokus pertama = **"Skip to content"** (muncul kiri-atas), Enter → lompat ke konten
- [ ] Tab menyusuri semua link/tombol — ada **outline fokus** yang terlihat (garis accent)
- [ ] Enter/Space mengaktifkan tombol (email copy, buka case study)
- [ ] Di lightbox: Esc menutup, panah ← → navigasi
- [ ] Canvas particle **tidak** ikut fokus keyboard (aria-hidden) 🔎 cek di Elements
- [ ] Lighthouse **Accessibility ≥ 95** (lihat §9)
- [ ] (Opsional) Screen reader cepat: teks hero & metrik terbaca, canvas dilewati

---

## 8. SEO 🔎

- [ ] `/sitemap.xml` → 6 URL (home + 5 case study)
- [ ] `/robots.txt` → allow all + baris Sitemap
- [ ] Home: `<title>` & meta description benar (lihat tab browser & View Source)
- [ ] Case study: title unik per halaman (mis. "MAKA Motors — Performance Marketing Strategist · Andrew Jevon")
- [ ] Canonical ada di home & tiap case study (View Source → cari `rel="canonical"`)
- [ ] JSON-LD valid — tempel URL/HTML ke **search.google.com/test/rich-results**: Person + WebSite (home), Article (case study), **0 error**
- [ ] Lighthouse **SEO ≥ 95**

> Catatan: verifikasi GSC & submit sitemap dilakukan **setelah** domain live (Fase 10).

---

## 9. Performa 🔎 (Lighthouse — mode Incognito, versi `npm start`)

DevTools → Lighthouse → pilih kategori → Analyze. Jalankan **2×** (desktop & mobile).

- [ ] **Desktop**: Performance ≥ **80** · SEO ≥ **95** · Accessibility ≥ **95** · Best Practices ≥ **95**
- [ ] **Mobile**: Performance ≥ **60** · SEO ≥ **95** · Accessibility ≥ **95**
- [ ] LCP = **teks hero** (bukan canvas/gambar) — cek di detail "Largest Contentful Paint"
- [ ] Tidak ada layout shift besar (CLS rendah)
- [ ] Jika di bawah target: catat rekomendasi Lighthouse teratas di bawah, jangan langsung deploy

---

## 10. Cross-browser

- [ ] Chrome (utama) ✅ dari langkah di atas
- [ ] Firefox — tata letak & motion oke
- [ ] Safari (kalau ada Mac/iPhone) — gradient text & WebGL oke
- [ ] Edge — oke
- [ ] **Android mid-range asli** (bukan emulator) — particle field tidak berat, scroll enak

---

## 11. Kebersihan & Error

- [ ] Console browser **0 error** di home & semua case study (🔎 tab Console)
- [ ] Tidak ada gambar 404 / broken (🔎 tab Network, filter Img, cari status merah)
- [ ] Tidak ada teks placeholder tertinggal ("FOTO ANDREW", "TODO", dst)
- [ ] `/halaman-ngawur` → tampil **404 on-brand** (angka 404 gradient, tombol Back home/View work)

---

## 12. UAT Sign-off (Andrew)

- [ ] Semua section terisi konten final — **tidak ada lorem/placeholder** (evidence tambahan boleh menyusul v1.1)
- [ ] Lighthouse lolos budget (§9)
- [ ] Reduced-motion & fallback non-WebGL berfungsi (§6)
- [ ] Semua link hidup (0 broken), email/mailto teruji (§3–4)
- [ ] **Saya, Andrew, menyetujui situs ini untuk launch.** Tanggal: ________

---

### Temuan / Catatan perbaikan

| # | Halaman/Section | Masalah | Prioritas | Status |
|---|---|---|---|---|
|   |   |   |   |   |
|   |   |   |   |   |

> Setelah semua ✅ dan sign-off → lanjut **Fase 10**: beli domain andrewjevon.com (Hostinger) → DNS ke Vercel → deploy → verifikasi GSC & submit sitemap.
