import { toolbox } from "@/lib/content";
import Pill from "@/components/ui/Pill";
import SectionHead from "@/components/ui/SectionHead";

/* M3: grid statis. Marquee 2 baris arah berlawanan menyusul di M4 (DESIGN.md Motion). */
export default function Toolbox() {
  return (
    <section className="pt-[60px]">
      <div className="wrap">
        <SectionHead index="04" title="Toolbox" />
      </div>
      <div className="border-y border-line py-[26px]">
        <div className="wrap flex flex-wrap gap-4">
          {toolbox.flat().map((tool) => (
            <Pill key={tool}>{tool}</Pill>
          ))}
        </div>
      </div>
    </section>
  );
}
