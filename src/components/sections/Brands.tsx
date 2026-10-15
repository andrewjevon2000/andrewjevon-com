import { brands } from "@/lib/content";
import Appear from "@/components/ui/Appear";

/* Logo brand yang pernah bekerja sama. Sengaja tanpa kutipan atau rating,
   supaya tidak terbaca sebagai testimoni/endorsement. */
export default function Brands() {
  return (
    <section className="px-4 pb-6 pt-[72px] md:px-10 md:pt-[100px] xl:px-[120px]" aria-labelledby="brands-heading">
      <Appear className="wrap flex flex-col gap-6 text-center">
        <h2 id="brands-heading" className="text-[26px] leading-none md:text-[32px]">
          {brands.heading}
        </h2>
        <ul className="flex flex-wrap justify-center gap-3 md:gap-4">
          {brands.items.map((b) => (
            <li key={b.name} className="flex items-center gap-3 rounded-[22px] bg-white px-4 py-3 shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.src} alt="" width={36} height={36} className="h-9 w-9 object-contain" loading="lazy" />
              <span className="text-[15px] font-semibold text-ink">{b.name}</span>
            </li>
          ))}
        </ul>
      </Appear>
    </section>
  );
}
