import type { Metadata } from "next";
import { nav, site } from "@/lib/content";
import { personSchema, websiteSchema, itemListSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/sections/Nav";
import SectionChips from "@/components/work/SectionChips";
import Hero from "@/components/sections/Hero";
import RolesTicker from "@/components/sections/RolesTicker";
import Brands from "@/components/sections/Brands";
import SelectedWork from "@/components/sections/SelectedWork";
import Testimonials from "@/components/sections/Testimonials";
import Speed from "@/components/sections/Speed";
import Expertise from "@/components/sections/Expertise";
import About from "@/components/sections/About";
import Faqs from "@/components/sections/Faqs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  alternates: { canonical: site.url },
};

/* Urutan (PRD homepage v1.0 + elemen personal yang dipertahankan Andrew):
   Hero → ticker role → chip section (HP) → Brands → Case studies → Testimonials → Fast results
   → Skills → About → FAQ → Contact → Footer. Sedikit teks, judul langsung. */
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
        <div className="relative">
          <SectionChips items={[...nav.sections]} flush />
        <Brands />
        <SelectedWork />
        <Testimonials />
        <Speed />
        <Expertise />
        <About />
        <Faqs />
        <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
