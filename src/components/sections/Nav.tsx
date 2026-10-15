"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";
import { Menu, X } from "@/components/ui/Lucide";

/* Nav mengikuti situs live:
   - desktop: transparan di atas; setelah scroll jadi pill putih melayang di tengah
   - mobile: kartu putih melayang (radius 44) dengan logo, CTA kontak (selalu terlihat) + hamburger */
export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const resolve = (href: string) => (onHome ? href : `/${href}`);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Desktop */}
      <div className={`hidden transition-all duration-500 md:block ${scrolled ? "px-10 pt-4" : "px-10 pt-5 xl:px-[120px]"}`}>
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled ? "max-w-[780px] rounded-[28px] bg-white/90 px-4 py-2 shadow-soft backdrop-blur-md" : "max-w-[1200px]"
          }`}
        >
          <Link href="/" className="serif text-[40px] leading-[0.8] text-ink">
            {nav.logo}
          </Link>
          <nav className="flex items-center gap-1" aria-label="Main">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={resolve(l.href)}
                className="rounded-[18px] bg-card px-3 py-3 text-[16px] font-semibold leading-[1.3] text-ink transition-colors hover:bg-card-2"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a href={resolve(nav.cta.href)} className="btn btn-dark" data-track="contact_cta_click" data-location="nav">
            {nav.cta.label}
          </a>
        </div>
      </div>

      {/* Mobile */}
      <div className="px-3 pt-5 md:hidden">
        <div className="rounded-[44px] bg-white px-[18px] py-[18px] shadow-soft">
          <div className="flex h-11 items-center justify-between">
            <Link href="/" className="serif text-[32px] leading-[0.8] text-ink" onClick={() => setOpen(false)}>
              {nav.logo}
            </Link>
            <div className="flex items-center gap-1">
            <a
              href={resolve(nav.cta.href)}
              onClick={() => setOpen(false)}
              className="btn btn-dark px-3.5 py-2.5 text-[14px]"
              data-track="contact_cta_click"
              data-location="nav_mobile"
            >
              {nav.cta.label}
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center"
            >
              {open ? <X className="h-6 w-6 text-ink" strokeWidth={2.5} /> : <Menu className="h-6 w-6 text-ink" strokeWidth={2.5} />}
            </button>
            </div>
          </div>
          {open && (
            <nav className="mt-4 flex flex-col gap-2 border-t border-card-2 pt-4" aria-label="Main">
              {nav.links.map((l) => (
                <a
                  key={l.href}
                  href={resolve(l.href)}
                  onClick={() => setOpen(false)}
                    className="rounded-[18px] bg-card px-4 py-3 text-[16px] font-semibold text-ink"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
