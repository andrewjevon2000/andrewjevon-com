import Image from "next/image";
import { about, site } from "@/lib/content";
import Appear from "@/components/ui/Appear";
import { LinkedInIcon } from "@/components/ui/Icons";
import { Mail } from "@/components/ui/Lucide";

export default function About() {
  return (
    <section id="about-section" className="section scroll-mt-28">
      <div className="wrap flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <Appear className="flex flex-col gap-6 lg:max-w-[560px]">
          <h2 className="text-[34px] leading-[1.05] md:text-[52px]">{about.heading}</h2>
          <div className="flex flex-col gap-3">
            {about.lines.map((line) => (
              <p key={line} className="text-[18px] font-medium leading-[1.4] text-muted">
                {line}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-light border border-card-3 px-4 text-[16px] font-medium">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-light border border-card-3 px-4 text-[16px] font-medium" data-track="email_click" data-location="about">
              <Mail /> {site.email}
            </a>
          </div>
        </Appear>

        <Appear className="relative mx-auto w-full max-w-[480px] lg:mx-0 lg:w-[480px]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[50px] shadow-soft lg:rounded-[70px]">
            <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(max-width: 810px) 100vw, 480px" className="object-cover" />
          </div>
          <p className="hand absolute -top-6 right-2 rotate-[14deg] text-[44px] text-blue lg:-right-6" aria-hidden>
            {about.sticker}
          </p>
        </Appear>
      </div>
    </section>
  );
}
