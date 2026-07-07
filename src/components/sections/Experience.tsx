import { experience } from "@/lib/content";
import SectionHead from "@/components/ui/SectionHead";

export default function Experience() {
  return (
    <section id="experience" className="py-[110px] max-md:py-[60px]">
      <div className="wrap">
        <SectionHead index="03" title="Experience" />
        <ol className="relative pl-[34px] before:absolute before:bottom-0 before:left-2 before:top-0 before:w-px before:bg-line">
          {experience.map((item) => (
            <li
              key={`${item.company}-${item.date}`}
              className="group relative py-[18px] pl-[14px] before:absolute before:-left-[30.5px] before:top-7 before:h-[9px] before:w-[9px] before:rounded-full before:border-2 before:border-dimmer before:bg-bg hover:before:border-accent hover:before:bg-accent hover:before:shadow-[0_0_14px_var(--accent-glow)]"
            >
              <p className="font-mono text-[11px] tracking-[0.08em] text-dimmer">{item.date}</p>
              <p className="font-sans text-[17px] font-bold">
                {item.role} · <span className="text-accent">{item.company}</span>
              </p>
              <p className="mt-[3px] text-sm text-dim">{item.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
