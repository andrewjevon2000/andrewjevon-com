"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";

/* Nav sadar-konteks: di home ('/') pakai anchor bare (#work → Lenis smooth-scroll);
   di sub-halaman prefix '/' agar navigasi lintas-halaman (/#work). */
export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const resolve = (href: string) => (onHome ? href : `/${href}`);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[rgba(255,255,255,.85)] backdrop-blur-[14px]">
      <div className="wrap flex h-[60px] items-center justify-between">
        <Link href="/" className="serif-em text-[24px] leading-none">
          {nav.logo.text}
        </Link>
        <div className="hidden items-center gap-[26px] text-[13px] text-dim md:flex">
          {nav.links.map((l) => (
            <a key={l.href} href={resolve(l.href)} className="transition-colors hover:text-txt">
              {l.label}
            </a>
          ))}
          <a
            href={resolve(nav.cta.href)}
            className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-80"
          >
            {nav.cta.label}
          </a>
        </div>
      </div>
    </nav>
  );
}
