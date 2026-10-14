import type { Metadata } from "next";
import { Delicious_Handrawn, Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/lib/content";
import "./globals.css";

/* Satu keluarga sans untuk display + body, mengikuti model tipografi Meta
   (DESIGN-meta.md, Optimistic VF) — Hanken Grotesk = padanan open-license terdekat */
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

/* Aurora Light (14 Okt 2026): serif italic untuk kata kunci headline + logo,
   tulisan tangan untuk label section — mengikuti situs Framer andrewjevon.com */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const deliciousHandrawn = Delicious_Handrawn({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andrewjevon.com"),
  title: {
    default: "Andrew Jevon — UX × Growth · Web, SEO & Conversion",
    template: "%s · Andrew Jevon",
  },
  description:
    "I design websites and journeys around what people actually search for — 4+ years in technical SEO, performance marketing and website builds across Indonesia, Philippines, and US markets.",
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

// GA4 dimuat hanya jika NEXT_PUBLIC_GA_ID di-set (Vercel env, Fase 10).
// Dev tanpa ID = tidak ada gtag yang termuat.
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${deliciousHandrawn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
