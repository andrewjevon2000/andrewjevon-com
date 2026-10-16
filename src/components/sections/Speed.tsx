import { speed } from "@/lib/content";
import Appear from "@/components/ui/Appear";

/* Kecepatan kerja, gaya tile: angka waktu sebagai "benda" di tengah tile, hasil di bawahnya. */
export default function Speed() {
  return (
    <section className="section scroll-mt-28 !pt-0">
      <div className="wrap flex flex-col gap-10">
        <Appear className="text-center">
          <h2 className="text-[34px] leading-none md:text-[52px]">{speed.heading}</h2>
        </Appear>
        <ul className="grid grid-cols-2 gap-6 md:gap-6 lg:grid-cols-4">
          {speed.items.map((it, i) => (
            <Appear as="li" key={it.company} delay={i * 80} className="flex flex-col gap-3">
              <div className="flex aspect-square items-center justify-center rounded-[32px] bg-card-2">
                <p className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-ink md:text-[40px]">{it.time}</p>
              </div>
              <div className="flex flex-col gap-0.5 text-center">
                <p className="text-[15px] font-semibold leading-[1.3] text-ink">{it.result}</p>
                <p className="text-[13px] font-medium text-muted">{it.company}</p>
              </div>
            </Appear>
          ))}
        </ul>
      </div>
    </section>
  );
}
