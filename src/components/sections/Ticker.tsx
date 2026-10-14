import { ticker } from "@/lib/content";

/* Dua baris ticker (headline abu-abu + tag tulisan tangan biru), arah berlawanan.
   Salinan kedua aria-hidden; reduced-motion = diam (CSS). */
function Row({ items, className, gap, dur, reverse }: { items: readonly string[]; className: string; gap: number; dur: number; reverse?: boolean }) {
  const track = (hidden?: boolean) => (
    <div className="ticker-track" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={`${t}-${i}`} className={className}>
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={`flex overflow-hidden ${reverse ? "ticker-rev" : ""}`}
      style={{ "--ticker-gap": `${gap}px`, "--ticker-dur": `${dur}s` } as React.CSSProperties}
    >
      {track()}
      {track(true)}
    </div>
  );
}

export default function Ticker() {
  return (
    <section className="flex flex-col gap-6 overflow-hidden py-[120px]">
      <Row items={[ticker.line, ticker.line]} className="whitespace-nowrap text-[64px] font-bold leading-[0.9] tracking-[-0.05em] text-card-3 md:text-[140px]" gap={60} dur={40} />
      <div className="h-[5px] w-full bg-card-2" aria-hidden />
      <Row items={[...ticker.tags, ...ticker.tags, ...ticker.tags]} className="hand whitespace-nowrap text-[64px] text-blue md:text-[140px]" gap={24} dur={34} reverse />
    </section>
  );
}
