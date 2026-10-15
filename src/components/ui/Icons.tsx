import type { ToolIcon } from "@/lib/content";

/* Ikon dari situs live (path SVG Framer) — stroke biru 1.5, viewBox 24. */

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/* Ikon tool: brand mark monokrom biru (public/icons, Simple Icons) atau glyph garis sendiri. */
const BRAND: Partial<Record<ToolIcon, string>> = {
  figma: "/icons/figma.svg",
  semrush: "/icons/semrush.svg",
  meta: "/icons/meta.svg",
  ga4: "/icons/googleanalytics.svg",
  google: "/icons/googlesearchconsole.svg",
  claude: "/icons/claude.svg",
  elevenlabs: "/icons/elevenlabs.svg",
};

export function ToolGlyph({ icon, className }: { icon: ToolIcon; className?: string }) {
  const cls = className ?? "h-[38px] w-[38px] text-blue";
  const brand = BRAND[icon];
  if (brand) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={brand} alt="" className={cls} aria-hidden loading="lazy" />;
  }
  switch (icon) {
    case "codex":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path {...STROKE} strokeWidth={2} d="M8 6 3 12l5 6M16 6l5 6-5 6M13.5 4l-3 16" />
        </svg>
      );
    case "higgsfield":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path {...STROKE} strokeWidth={2.4} d="M5 4v16M19 4v16M5 12h14" />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        </svg>
      );
    case "cmux":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <rect {...STROKE} x="3" y="4" width="18" height="16" rx="3" />
          <path {...STROKE} strokeWidth={2} d="M7 9l3 3-3 3M12 15h5" />
        </svg>
      );
    case "capcut":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <circle {...STROKE} cx="6.5" cy="6.5" r="3" />
          <circle {...STROKE} cx="6.5" cy="17.5" r="3" />
          <path {...STROKE} strokeWidth={2} d="M9 8.5 20 17M9 15.5 20 7" />
        </svg>
      );
    default:
      return null;
  }
}

/* Panah coretan tangan (catatan "Click me", "Get started") */
export function SquiggleArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18.658 29.577" className={className ?? "h-[29px] w-[18px] text-blue"} aria-hidden>
      <path {...STROKE} d="M3.782 0S-4.728 5.568 3.782 9.375c8.51 3.807 1.843 9.375 1.843 9.375S-4.304 26.194 10.875 24" />
      <path {...STROKE} d="M8 29.577s16.754-1.378 8.25-6.75c-8.504-5.371-4.125-2.625-4.125-2.625" />
    </svg>
  );
}

/* Ikon FAQ: X coretan tangan (diputar jadi + saat tertutup) */
export function ScribbleX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16.36 20.82" className={className ?? "h-[17px] w-[14px] text-blue"} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.056 0S0 5.214 0 12.462" transform="translate(0.152 4.179) rotate(-30 10 6.25)" />
        <path d="M20.056 0S0 5.214 0 12.462" transform="translate(-1.848 4.179) rotate(78 10 6.25)" />
      </g>
    </svg>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "h-4 w-4"} aria-hidden>
      <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "h-4 w-4"} aria-hidden>
      <path {...STROKE} d="M3.75 5.25h16.5v13.5H3.75z" />
      <path {...STROKE} d="m3.75 6.75 8.25 6 8.25-6" />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "h-4 w-4"} aria-hidden>
      <path {...STROKE} strokeWidth={2} d="M19 12H5m7-7-7 7 7 7" />
    </svg>
  );
}

export function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink" aria-hidden>
      {open ? (
        <path {...STROKE} strokeWidth={2.5} d="M6 6l12 12M18 6 6 18" />
      ) : (
        <path {...STROKE} strokeWidth={2.5} d="M4 9h16M4 15h16" />
      )}
    </svg>
  );
}
