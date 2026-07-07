"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Parallax scrub (DESIGN.md Hero Scene + Motion):
   setiap elemen [data-plx="<speed>"] digeser y = speed × tinggi rentang scroll
   trigger-nya. GPU transform only. Halus — depth cue, bukan atraksi.
   gsap.matchMedia menangani prefers-reduced-motion secara otomatis. */
export default function Parallax() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-plx]");
      for (const el of els) {
        const speed = parseFloat(el.dataset.plx ?? "0");
        if (!speed) continue;
        const scope = el.closest<HTMLElement>("header, section") ?? el;
        const isHero = scope.tagName === "HEADER";
        gsap.to(el, {
          y: () => speed * (isHero ? scope.offsetHeight : window.innerHeight * 0.6),
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: isHero ? "top top" : "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return null;
}
