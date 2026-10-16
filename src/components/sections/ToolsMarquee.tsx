import { tools, toolsMarquee } from "@/lib/content";
import { ToolGlyph } from "@/components/ui/Icons";
import Appear from "@/components/ui/Appear";

/* Tools sebagai running text di area atas (logo resmi + nama), arah searah ticker role.
   Menggantikan baris "Tools I use" di Skills. Reduced motion: diam. */
export default function ToolsMarquee() {
  const items = [...tools, ...tools];
  const track = (hidden?: boolean) => (
    <ul className="ticker-track items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={`${t.icon}-${i}`} className="flex shrink-0 items-center gap-3 whitespace-nowrap rounded-[22px] bg-white px-4 py-3 shadow-soft">
          <ToolGlyph icon={t.icon} className="h-8 w-8 object-contain" />
          <span className="text-[15px] font-semibold text-ink">{t.name}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section className="overflow-hidden pb-2 pt-8 md:pt-10" aria-labelledby="tools-heading">
      <Appear className="flex flex-col gap-5">
        <h2 id="tools-heading" className="px-4 text-center text-[22px] leading-none md:text-[28px]">
          {toolsMarquee.heading}
        </h2>
        <div className="flex py-2" style={{ "--ticker-gap": "16px", "--ticker-dur": "90s" } as React.CSSProperties}>
          {track()}
          {track(true)}
        </div>
      </Appear>
    </section>
  );
}
