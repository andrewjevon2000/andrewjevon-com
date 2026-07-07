import Link from "next/link";
import { nav } from "@/lib/content";

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[rgba(8,8,12,.65)] backdrop-blur-[14px]">
      <div className="wrap flex h-[60px] items-center justify-between">
        <Link href="/" className="font-mono text-[15px] font-extrabold">
          {nav.logo.text}
          <span className="text-accent">{nav.logo.accent}</span>
        </Link>
        <div className="hidden items-center gap-[26px] text-[13px] text-dim md:flex">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-txt">
              {l.label}
            </a>
          ))}
          <a href={nav.cta.href} className="text-accent">
            {nav.cta.label}
          </a>
        </div>
      </div>
    </nav>
  );
}
