import Image from "next/image";
import { about, certifications } from "@/lib/content";
import SectionHead from "@/components/ui/SectionHead";

export default function About() {
  return (
    <section id="about" className="bg-bg2 py-[110px] max-md:py-[60px]">
      <div className="wrap">
        <SectionHead index="05" title={about.heading} />
        <div className="grid items-center gap-12 md:grid-cols-[1.5fr_1fr]">
          <div>
            {about.paragraphs.map((para, i) => (
              <p key={i} className="mb-4 text-base text-dim">
                {para.map((seg, j) =>
                  seg.bold ? (
                    <b key={j} className="font-semibold text-txt">
                      {seg.text}
                    </b>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  ),
                )}
              </p>
            ))}
            <div className="mt-[22px] flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={`${cert.issuer}-${cert.name}`}
                  className="rounded-[8px] border border-line px-3 py-[7px] font-mono text-xs text-dim"
                >
                  <span className="text-accent">{cert.issuer}</span> — {cert.name}
                </span>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line">
            <Image
              src={about.photo.src}
              alt={about.photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
