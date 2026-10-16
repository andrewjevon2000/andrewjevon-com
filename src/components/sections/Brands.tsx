import { brands } from "@/lib/content";
import Appear from "@/components/ui/Appear";

/* Logo brand yang pernah bekerja sama, sebagai running text (arah berlawanan dengan ticker role).
   Tanpa kutipan atau rating, supaya tidak terbaca sebagai testimoni. Reduced motion: diam. */
export default function Brands() {
  const items = [...brands.items, ...brands.items];
  const track = (hidden?: boolean) => (
    <ul className="ticker-track items-center" aria-hidden={hidden || undefined}>
      {items.map((b, i) => (
        <li key={`${b.name}-${i}`} className="flex shrink-0 items-center gap-3 whitespace-nowrap rounded-[22px] bg-white px-4 py-3 shadow-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.src} alt="" width={36} height={36} className="h-9 w-9 object-contain" loading="lazy" />
          <span className="text-[15px] font-semibold text-ink">{b.name}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section className="overflow-hidden pb-4 pt-6 md:pt-8" aria-labelledby="brands-heading">
      <Appear className="flex flex-col gap-6">
        <h2 id="brands-heading" className="px-4 text-center text-[22px] leading-none md:text-[28px]">
          {brands.heading}
        </h2>
        <div className="ticker-rev flex py-2" style={{ "--ticker-gap": "16px", "--ticker-dur": "45s" } as React.CSSProperties}>
          {track()}
          {track(true)}
        </div>
      </Appear>
    </section>
  );
}
