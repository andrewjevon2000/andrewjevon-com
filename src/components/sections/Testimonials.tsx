import { testimonials } from "@/lib/content";
import Appear from "@/components/ui/Appear";
import { LinkedInIcon } from "@/components/ui/Icons";

/* Rekomendasi LinkedIn, gaya tile: kutipan di tengah tile abu-abu (bukan tint warna),
   nama dan peran sebagai keterangan di bawahnya. Kutipan verbatim (hanya dipotong). */

export default function Testimonials() {
  return (
    <section id="proof-section" className="section scroll-mt-28 !pt-0">
      <div className="wrap flex flex-col gap-10">
        <Appear className="text-center">
          <h2 className="text-[34px] leading-[1.05] md:text-[52px]">{testimonials.heading}</h2>
        </Appear>
        <ul className="grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-6">
          {testimonials.items.map((t, i) => (
            <Appear as="li" key={t.name} delay={(i % 3) * 80} className="flex flex-col gap-4">
              <blockquote className={`flex aspect-[16/10] items-center justify-center rounded-[32px] px-8 text-center text-[19px] font-semibold leading-[1.35] tracking-[-0.03em] text-ink md:text-[20px] bg-card-2`}>
                “{t.quote}”
              </blockquote>
              <div className="flex flex-col gap-0.5 text-center">
                <p className="text-[16px] font-semibold text-ink">{t.name}</p>
                <p className="text-[14px] font-medium text-muted">
                  {t.role} · {t.date}
                </p>
              </div>
            </Appear>
          ))}
        </ul>
        <Appear className="text-center">
          <a href={testimonials.proof.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[16px] font-semibold text-ink underline-offset-4 hover:underline">
            <LinkedInIcon /> {testimonials.proof.label}
          </a>
        </Appear>
      </div>
    </section>
  );
}
