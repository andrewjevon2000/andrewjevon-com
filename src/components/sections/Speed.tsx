import { speed } from "@/lib/content";
import Appear from "@/components/ui/Appear";

/* Kecepatan kerja. Angka sengaja berbeda dari kartu Selected Work. */
export default function Speed() {
  return (
    <section className="section scroll-mt-28 !pt-0">
      <div className="wrap flex flex-col gap-10">
        <Appear className="text-center">
          <h2 className="text-[34px] leading-none md:text-[52px]">{speed.heading}</h2>
        </Appear>
        <ul className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {speed.items.map((it, i) => (
            <Appear as="li" key={it.company} delay={i * 80} className="flex h-full flex-col gap-2 rounded-[32px] bg-card-2 p-6">
              <p className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-ink">{it.time}</p>
              <p className="text-[16px] font-medium leading-[1.35] text-ink">{it.result}</p>
              <p className="mt-auto pt-1 text-[13px] font-semibold text-muted">{it.company}</p>
            </Appear>
          ))}
        </ul>
      </div>
    </section>
  );
}
