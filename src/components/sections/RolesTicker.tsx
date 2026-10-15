import { rolesTicker } from "@/lib/content";
import { Sparkle } from "@/components/ui/Lucide";

/* Running text daftar role, langsung di bawah hero. Dua salinan untuk loop mulus;
   salinan kedua aria-hidden; reduced-motion = diam (CSS). */
export default function RolesTicker() {
  const track = (hidden?: boolean) => (
    <div className="ticker-track items-center" aria-hidden={hidden || undefined}>
      {rolesTicker.map((r, i) => (
        <span key={`${r}-${i}`} className="flex items-center gap-[60px] whitespace-nowrap">
          <span className="text-[28px] font-semibold leading-none tracking-[-0.04em] text-ink md:text-[44px]">{r}</span>
          <Sparkle className="h-6 w-6 text-blue md:h-8 md:w-8" />
        </span>
      ))}
    </div>
  );
  return (
    <section className="overflow-hidden border-y border-card-2 py-7 md:py-9" aria-label="Roles">
      <div className="flex" style={{ "--ticker-gap": "60px", "--ticker-dur": "70s" } as React.CSSProperties}>
        {track()}
        {track(true)}
      </div>
    </section>
  );
}
