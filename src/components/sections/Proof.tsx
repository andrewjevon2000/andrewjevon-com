import { proof } from "@/lib/content";
import Appear from "@/components/ui/Appear";

function Stars() {
  return (
    <div className="flex gap-1 text-blue" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      ))}
    </div>
  );
}

/* Section pendek: kartu testimoni dari orang yang pernah mempekerjakan Andrew.
   Kartu bertanda placeholder sampai foto + kutipan asli dikirim. */
export default function Proof() {
  return (
    <section id="proof-section" className="section scroll-mt-20 !pb-10 md:!pb-14">
      <div className="wrap flex flex-col gap-10">
        <Appear className="flex flex-col gap-4 text-center">
          <p className="hand text-[24px] text-blue">#{proof.kicker}</p>
          <h1 className="text-[38px] leading-none md:text-[60px]">{proof.heading}</h1>
          <p className="text-[18px] font-medium leading-[1.2] text-muted">{proof.sub}</p>
        </Appear>
        <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
          {proof.items.map((t, i) => (
            <Appear as="li" key={`${t.company}-${i}`} delay={i * 90} className="flex h-full flex-col gap-5 rounded-[50px] bg-card p-6 shadow-soft">
              <Stars />
              <p className={`text-[16px] font-semibold leading-[1.35] ${t.placeholder ? "italic text-muted" : "text-ink"}`}>“{t.quote}”</p>
              <div className="mt-auto flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card-3 text-[14px] font-semibold text-muted" aria-hidden>
                  {t.placeholder ? "?" : t.name.slice(0, 1)}
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-ink">
                    {t.name}
                    {t.placeholder && <span className="hand ml-2 text-[18px] text-blue">placeholder</span>}
                  </p>
                  <p className="text-[14px] font-medium text-muted">
                    {t.role} · {t.company}
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
