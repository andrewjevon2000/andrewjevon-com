import type { Metadata } from "next";
import { site } from "@/lib/content";
import { personSchema, websiteSchema, itemListSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import HowIWork from "@/components/sections/HowIWork";
import Ticker from "@/components/sections/Ticker";
import Faqs from "@/components/sections/Faqs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  alternates: { canonical: site.url },
};

export default function Home() {
  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema(), itemListSchema()]} />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <SelectedWork />
        <HowIWork />
        <Ticker />
        <Faqs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
