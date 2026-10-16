import type { Metadata } from "next";
import { Delicious_Handrawn, Geist, Inter, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/lib/content";
import ClickTracker from "@/components/analytics/ClickTracker";
import BottomBlur from "@/components/ui/BottomBlur";
import "./globals.css";

/* Font mengikuti situs live (DESIGN.md):
   Open Runde (body + heading, self-hosted, SIL OFL) · Instrument Serif italic (logo, nama)
   Delicious Handrawn (label tulisan tangan) · Geist 600 (nama besar di hero) · Inter 300 (rights) */
const openRunde = localFont({
  variable: "--font-open-runde",
  display: "swap",
  src: [
    { path: "../../public/fonts/open-runde-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/open-runde-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/open-runde-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/open-runde-700.woff2", weight: "700", style: "normal" },
  ],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
});

const deliciousHandrawn = Delicious_Handrawn({
  variable: "--font-delicious-handrawn",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "300",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s · Andrew Jevon",
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openRunde.variable} ${instrumentSerif.variable} ${deliciousHandrawn.variable} ${geist.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <BottomBlur />
        <ClickTracker />
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
