import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import Capabilities from "@/components/sections/Capabilities";
import Experience from "@/components/sections/Experience";
import Toolbox from "@/components/sections/Toolbox";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-panel focus:px-5 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <Capabilities />
        <Experience />
        <Toolbox />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
