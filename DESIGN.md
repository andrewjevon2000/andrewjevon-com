# DESIGN.md — andrewjevon.com

Design system "Aurora" — Immersive Data-Editorial. Sumber kebenaran visual untuk seluruh project.
Referensi hidup: `05-prototype-andrewjevon-com.html` (prototype approved 7 Jul 2026).

## Philosophy

Tampilan mengikuti situs live andrewjevon.com yang sudah ada (template Framer "Sketch", disetujui Andrew 15 Okt 2026) — **bukan desain baru**. Kanvas putih, kartu abu-abu lembut dengan radius besar, label tulisan tangan biru, tombol hitam pill. Angka pencapaian tetap jadi ornamen utama. Rebuild di Next.js dimaksudkan 1:1 secara visual; perubahan hanya pada isi (copy & data).

## Color Tokens

```css
--bg:      #ffffff;   /* kanvas */
--card:    #fafafa;   /* kartu terang: process, FAQ luar, pill nav/tombol terang */
--card-2:  #f2f2f2;   /* kartu project, footer, FAQ dalam, ikon tool */
--card-3:  #eeeeee;   /* belakang kartu hero, teks ticker besar */
--ink:     #323232;   /* teks utama, tombol gelap */
--muted:   #8a8a8a;   /* teks sekunder, label tulisan tangan abu-abu */
--blue:    #009dff;   /* aksen: label tulisan tangan, ikon, tombol Live Preview */
--shadow:      2px 4px 35px rgba(34,54,84,.03);
--shadow-sm:   2px 4px 35px rgba(34,54,84,.02);
--shadow-card: 14px 14px 35px rgba(34,54,84,.18);  /* hanya kartu flip hero */
```

### JANGAN
- Gradient, warna aksen lain, atau latar gelap.
- Bayangan lebih pekat dari `--shadow-card`.
- Border garis: kartu dibedakan lewat tone abu-abu + bayangan.

## Typography

| Peran | Font | Ukuran desktop / mobile | Catatan |
|---|---|---|---|
| Body, heading, tombol | Open Runde (self-hosted, OFL, `public/fonts`) | h1 60/38 · 600 · ls -0.05em · lh 1 | Heading `tracking -0.05em`, body `-0.03em` |
| Subheading / body abu | Open Runde 500 | 18px lh 1.2 `--muted` | |
| Judul kartu | Open Runde 600 | 22px lh 1.3 | |
| Logo, nama di hero | Instrument Serif italic | 40 (logo) · 110/83 (hero, putih) | |
| Label section, sticker, catatan | Delicious Handrawn | 24 (`#Label`), 28 (abu), 34–54 (sticker), 17–18 (catatan) | lh 0.8, ls 0.04em |
| Nama besar hero | Geist 600 | ~254px / 83px, `--card-3` | background |
| Ticker | Open Runde 700 140/64 · Delicious Handrawn 140/64 | | |
| Rights footer | Inter 300 12px | | |

Semua via `next/font` (Google) kecuali Open Runde (`next/font/local`).

## Spacing & Layout

- Container max 1200px; section padding 120px (desktop) / 80px 16px (mobile).
- Radius: kartu project/process/FAQ dalam/footer 50px · FAQ luar 46px · ikon tool 32px · tombol 18px · hero card 55/44px · gambar project 70/32px · foto Google 80/50px · nav mobile 44px.
- Gap: grid kartu 16/12px · teks heading 20px · section inner 50px.
- Tombol: padding 14px (gelap) / 12px (terang & biru), 16px/600.

## Components

- **Nav**: desktop transparan → pill putih melayang setelah scroll 40px; mobile kartu putih radius 44 + hamburger.
- **Hero**: kartu flip (klik) 401×501 / 304×378; depan foto + nama serif putih; belakang Experience/Tools/CTA; sticker tulisan tangan; nama besar Geist di belakang.
- **Selected Work**: teks kiri 410px + grid 2 kolom kartu (gambar 250px + tag + nama); kolom kedua diturunkan 40px.
- **How I Work**: tool stack (ikon 80×80), 4 kartu proses 2 kolom, foto 529×639 + sticker.
- **Ticker**: 2 baris arah berlawanan; reduced-motion = diam.
- **FAQ**: `<details>` native, lebar 820, ikon X coretan berputar 45° saat tertutup.
- **Contact**: form di kartu `--card` (mailto); catatan "Send a Message".
- **Footer**: kartu `--card-2` radius 50, 3 kolom link + sosial.

## Motion

- Hanya: flip hero (0.9s), hover kartu naik 4px, nav pill transisi 0.5s, ticker.
- Semua di-nonaktifkan oleh `prefers-reduced-motion`.

## Voice & Copy

Lihat `src/lib/content.ts`. Tidak ada klaim di luar dokumen achievements Andrew.
