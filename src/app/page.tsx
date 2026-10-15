import type { Metadata } from "next";
import { site } from "@/lib/content";
import { personSchema, websiteSchema, itemListSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import RolesTicker from "@/components/sections/RolesTicker";
import Brands from "@/components/sections/Brands";
import SelectedWork from "@/components/sections/SelectedWork";
import Speed from "@/components/sections/Speed";
import Expertise from "@/components/sections/Expertise";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Faqs from "@/components/sections/Faqs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  alternates: { canonical: site.url },
};

/* Urutan (PRD homepage v1.0 + elemen personal yang dipertahankan Andrew):
   Hero → ticker role → Brands → Selected Work → I move fast → Expertise
   → Process → About → FAQ → Contact → Footer */
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
        <RolesTicker />
        <Brands />
        <SelectedWork />
        <Speed />
        <Expertise />
        <Process />
        <About />
        <Faqs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
