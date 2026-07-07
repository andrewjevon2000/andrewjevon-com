import { capabilities } from "@/lib/content";
import SectionHead from "@/components/ui/SectionHead";

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-bg2 py-[110px] max-md:py-[60px]">
      <div className="wrap">
        <SectionHead index="02" title="Capabilities" />
        <div className="grid gap-5 md:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-2xl border border-line bg-panel p-[30px] transition-all duration-300 hover:border-accent hover:shadow-[0_12px_44px_-18px_var(--accent-glow)]"
            >
              <div className="mb-4 font-mono text-[22px] text-accent" aria-hidden>
                {cap.icon}
              </div>
              <h3 className="mb-3 text-[19px]">{cap.title}</h3>
              <ul className="text-sm text-dim">
                {cap.items.map((item) => (
                  <li
                    key={item}
                    className="relative py-[5px] pl-[18px] before:absolute before:left-0 before:text-accent before:content-['—']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
