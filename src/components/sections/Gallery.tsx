import Image from "next/image";
import { gallery } from "@/lib/content";
import Appear from "@/components/ui/Appear";

/* Galeri kreatif iklan dan momen: running row gambar (tinggi sama, lebar mengikuti),
   keterangan satu baris di bawah tiap gambar. Reduced motion: diam, bisa digeser. */
export default function Gallery() {
  const items = [...gallery.items, ...gallery.items];
  const track = (hidden?: boolean) => (
    <ul className="ticker-track items-start" aria-hidden={hidden || undefined}>
      {items.map((g, i) => (
        <li key={`${g.src}-${i}`} className="flex w-max shrink-0 flex-col gap-2">
          <div className="relative h-[260px] overflow-hidden rounded-[24px] bg-card-2 md:h-[340px]" style={{ aspectRatio: `${g.width} / ${g.height}` }}>
            <Image src={g.src} alt={hidden ? "" : g.alt} fill sizes="(max-width: 810px) 60vw, 420px" className="object-cover" />
          </div>
          <p className="px-1 text-[13px] font-medium text-muted">{g.caption}</p>
        </li>
      ))}
    </ul>
  );
  return (
    <section id="gallery-section" className="scroll-mt-28 overflow-hidden py-[60px] md:py-[90px]" aria-labelledby="gallery-heading">
      <Appear className="flex flex-col gap-8">
        <h2 id="gallery-heading" className="px-4 text-center text-[34px] leading-none md:text-[52px]">
          {gallery.heading}
        </h2>
        <div className="flex" style={{ "--ticker-gap": "14px", "--ticker-dur": "110s" } as React.CSSProperties}>
          {track()}
          {track(true)}
        </div>
      </Appear>
    </section>
  );
}
