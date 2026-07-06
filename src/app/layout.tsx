import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

/* ⚠ Tempting = demo "PERSONAL USE ONLY" — WAJIB beli lisensi komersial sebelum launch (lihat DESIGN.md) */
const tempting = localFont({
  src: "../fonts/tempting.woff2",
  variable: "--font-tempting",
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andrewjevon.com"),
  title: {
    default: "Andrew Jevon — Technical Digital Marketer · SEO × Performance × Web",
    template: "%s · Andrew Jevon",
  },
  description:
    "Technical digital marketer with 4+ years running the web, SEO, and performance backbone of marketing teams — Indonesia, Philippines, US markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${tempting.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
