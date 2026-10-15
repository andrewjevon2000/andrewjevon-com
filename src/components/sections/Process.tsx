import { workProcess } from "@/lib/content";
import Appear from "@/components/ui/Appear";

export default function Process() {
  return (
    <section id="process-section" className="section scroll-mt-28 !pt-0">
      <div className="wrap flex flex-col gap-[50px]">
        <Appear className="flex flex-col gap-5 text-center">
          <h2 className="mx-auto max-w-[760px] text-[34px] leading-[1.05] md:text-[52px]">{workProcess.heading}</h2>
        </Appear>
        <ol className="grid gap-3 md:gap-4 lg:grid-cols-3">
          {workProcess.steps.map((s, i) => (
            <Appear as="li" key={s.title} delay={i * 90} className="flex h-full flex-col gap-4 rounded-[50px] bg-card p-7 shadow-soft">
              <div className="flex flex-col gap-2.5">
                <p className="hand text-[24px] text-blue">#Step {i + 1}</p>
                <h3 className="text-[24px] leading-[1.2] tracking-[-0.04em]">{s.title}</h3>
              </div>
              <p className="text-[16px] font-medium leading-[1.4] text-muted">{s.body}</p>
            </Appear>
          ))}
        </ol>
      </div>
    </section>
  );
}
