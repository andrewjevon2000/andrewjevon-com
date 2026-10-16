import Image from "next/image";
import { built } from "@/lib/content";
import Appear from "@/components/ui/Appear";

/* Bento screenshot hal yang dibangun: tile lebar untuk situs dan dashboard, tile biasa untuk sisanya.
   Satu baris keterangan di bawah tile. */
export default function Built() {
  return (
    <section id="built-section" className="section scroll-mt-28 !pt-0">
      <div className="wrap flex flex-col gap-10">
        <Appear className="text-center">
          <h2 className="text-[34px] leading-[1.05] md:text-[52px]">{built.heading}</h2>
        </Appear>
        <ul className="grid gap-6 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
          {built.items.map((b, i) => (
            <Appear as="li" key={b.src} delay={(i % 3) * 80} className={`flex flex-col gap-2 ${b.wide ? "lg:col-span-3" : "lg:col-span-2"}`}>
              <div className={`relative w-full overflow-hidden rounded-[28px] bg-card-2 ${b.wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                <Image src={b.src} alt={b.alt} fill sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 600px" className="object-cover object-left-top" />
              </div>
              <p className="px-1 text-center text-[14px] font-medium text-muted">{b.caption}</p>
            </Appear>
          ))}
        </ul>
      </div>
    </section>
  );
}
