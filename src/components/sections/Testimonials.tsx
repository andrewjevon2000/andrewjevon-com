import { testimonials } from "@/lib/content";
import Appear from "@/components/ui/Appear";
import { LinkedInIcon } from "@/components/ui/Icons";

/* Rekomendasi LinkedIn, kutipan verbatim (hanya dipotong). Tanpa foto: inisial di lingkaran. */
export default function Testimonials() {
  return (
    <section id="proof-section" className="section scroll-mt-28 !pt-0">
      <div className="wrap flex flex-col gap-10">
        <Appear className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[34px] leading-[1.05] md:text-[52px]">{testimonials.heading}</h2>
          <p className="text-[18px] font-medium leading-[1.3] text-muted">{testimonials.sub}</p>
          <a href={testimonials.proof.href} target="_blank" rel="noopener noreferrer" className="btn btn-light border border-card-3 px-4 text-[15px] font-medium">
            <LinkedInIcon /> {testimonials.proof.label}
          </a>
        </Appear>
        <ul className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Appear as="li" key={t.name} delay={(i % 3) * 80} className="flex h-full flex-col gap-5 rounded-[40px] bg-card p-6 shadow-soft md:p-7">
              <blockquote className="text-[16px] font-semibold leading-[1.4] text-ink">“{t.quote}”</blockquote>
              <div className="mt-auto flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card-3 text-[15px] font-semibold text-ink" aria-hidden>
                  {t.name.slice(0, 1)}
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-ink">{t.name}</p>
                  <p className="text-[13px] font-medium leading-[1.35] text-muted">
                    {t.role} · {t.date}
                  </p>
                </div>
              </div>
            </Appear>
          ))}
        </ul>
      </div>
    </section>
  );
}
