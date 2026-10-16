import { rolesTicker, tools } from "@/lib/content";
import { ToolGlyph } from "@/components/ui/Icons";

/* Running text daftar role, diselingi logo tools (ukuran seragam, 40px).
   Dua salinan untuk loop mulus; salinan kedua aria-hidden; reduced-motion = diam (CSS). */
export default function RolesTicker() {
  const track = (hidden?: boolean) => (
    <div className="ticker-track items-center" aria-hidden={hidden || undefined}>
      {rolesTicker.map((role, i) => {
        const tool = tools[i % tools.length];
        return (
          <span key={`${role}-${i}`} className="flex items-center gap-[40px] whitespace-nowrap md:gap-[60px]">
            <span className="text-[28px] font-semibold leading-none tracking-[-0.04em] text-ink md:text-[44px]">{role}</span>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] bg-white shadow-soft md:h-16 md:w-16 md:rounded-[22px]">
              <ToolGlyph icon={tool.icon} className="h-8 w-8 object-contain md:h-9 md:w-9" />
            </span>
          </span>
        );
      })}
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
