import { faqs } from "@/lib/content";
import { ScribbleX } from "@/components/ui/Icons";
import Appear from "@/components/ui/Appear";

/* Accordion native <details> — bisa dibuka tanpa JS, teks jawaban tetap di HTML. */
export default function Faqs() {
  return (
    <section id="faqs-section" className="section scroll-mt-28">
      <div className="wrap flex flex-col items-center gap-[50px]">
        <Appear className="text-center">
          <h2 className="text-[38px] leading-none md:text-[60px]">{faqs.heading}</h2>
        </Appear>
        <Appear className="flex w-full max-w-[820px] flex-col gap-3">
          {faqs.items.map((f) => (
            <details key={f.q} className="group rounded-[46px] bg-card shadow-softer">
              <summary className="flex cursor-pointer list-none items-center gap-6 rounded-[50px] bg-card-2 p-6 [&::-webkit-details-marker]:hidden">
                <span className="hand text-[28px] text-blue" aria-hidden>
                  ?
                </span>
                <span className="flex-1 text-[18px] md:text-[20px] font-semibold leading-[1.2] tracking-[-0.03em] text-ink">{f.q}</span>
                <ScribbleX className="h-[17px] w-[14px] shrink-0 text-blue transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <div className="flex flex-col gap-2.5 px-6 pb-6 pt-5">
                {f.a.map((line) => (
                  <p key={line} className="text-[16px] font-medium leading-[1.35] text-muted">{line}</p>
                ))}
              </div>
            </details>
          ))}
        </Appear>
      </div>
    </section>
  );
}
