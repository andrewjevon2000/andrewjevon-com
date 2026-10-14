import type { ToolIcon } from "@/lib/content";

/* Ikon dari situs live (path SVG Framer) — stroke biru 1.5, viewBox 24. */

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function ToolGlyph({ icon, className }: { icon: ToolIcon; className?: string }) {
  const cls = className ?? "h-[43px] w-[43px] text-blue";
  switch (icon) {
    case "google":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path {...STROKE} d="M12 12h8.25c0 4.011-2.884 7.44-6.835 8.127-3.951.688-7.824-1.565-9.179-5.339-1.356-3.774.199-7.977 3.685-9.959 3.486-1.983 7.892-1.172 10.444 1.921" />
        </svg>
      );
    case "meta":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path {...STROKE} d="M10.292 13.814C8.801 16.487 7.268 18.75 5.49 18.75c-5.786 0-2.893-13.5 1.448-13.5 4.34 0 7.233 13.5 11.573 13.5 5.785 0 2.892-13.5-1.448-13.5-1.183 0-2.26 1.003-3.282 2.463" />
        </svg>
      );
    case "ga4":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path {...STROKE} d="M21 19.5H3v-15" />
          <path {...STROKE} d="M18.75 6.75 12 13.5 9 10.5l-6 6" />
        </svg>
      );
    case "semrush":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <circle {...STROKE} cx="10.5" cy="10.5" r="7.5" />
          <path {...STROKE} d="m15.803 15.803 5.197 5.197" />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path {...STROKE} d="M8.5 3h7a3 3 0 0 1 0 6h-7a3 3 0 0 1 0-6Z" />
          <path {...STROKE} d="M8.5 9H12v6H8.5a3 3 0 0 1 0-6Z" />
          <circle {...STROKE} cx="15" cy="12" r="3" />
          <path {...STROKE} d="M8.5 15H12v3a3 3 0 1 1-3.5-3Z" />
        </svg>
      );
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
