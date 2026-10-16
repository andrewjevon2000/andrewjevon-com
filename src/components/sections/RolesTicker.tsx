import { rolesTicker } from "@/lib/content";

/* Running text daftar role (teks saja; logo tools punya marquee sendiri di bawahnya). */
export default function RolesTicker() {
  const track = (hidden?: boolean) => (
    <div className="ticker-track items-center" aria-hidden={hidden || undefined}>
      {rolesTicker.map((role, i) => (
        <span key={`${role}-${i}`} className="flex items-center gap-[40px] whitespace-nowrap md:gap-[60px]">
          <span className="text-[28px] font-semibold leading-none tracking-[-0.04em] text-ink md:text-[44px]">{role}</span>
          <span className="h-2 w-2 shrink-0 rounded-full bg-card-3" aria-hidden />
        </span>
      ))}
    </div>
  );
  return (
    <section className="overflow-hidden py-4 md:py-6" aria-label="Roles">
      <div className="flex" style={{ "--ticker-gap": "40px", "--ticker-dur": "80s" } as React.CSSProperties}>
        {track()}
        {track(true)}
      </div>
    </section>
  );
}
