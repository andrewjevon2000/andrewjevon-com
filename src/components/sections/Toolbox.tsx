import { toolbox } from "@/lib/content";
import Pill from "@/components/ui/Pill";
import SectionHead from "@/components/ui/SectionHead";

/* Marquee 2 baris arah berlawanan (32s/38s), pause on hover.
   Reduced motion / no-JS: CSS fallback = grid wrap statis, duplikat disembunyikan. */
function MarqueeRow({ tools, reverse }: { tools: readonly string[]; reverse?: boolean }) {
  const row = (hidden?: boolean) => (
    <div className="track" aria-hidden={hidden || undefined}>
      {tools.map((tool) => (
        <Pill key={tool}>{tool}</Pill>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${reverse ? "marquee-rev" : ""} py-[26px]`}>
      {row()}
      {row(true)}
    </div>
  );
}

export default function Toolbox() {
  return (
    <section className="pt-[60px]">
      <div className="wrap">
        <SectionHead index="04" title="Toolbox" />
      </div>
      <div className="border-y border-line">
        <MarqueeRow tools={toolbox[0]} />
      </div>
      <div className="border-b border-line">
        <MarqueeRow tools={toolbox[1]} reverse />
      </div>
    </section>
  );
}
