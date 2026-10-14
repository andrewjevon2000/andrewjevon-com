import Image from "next/image";
import { howIWork } from "@/lib/content";
import { ToolGlyph } from "@/components/ui/Icons";
import Appear from "@/components/ui/Appear";

export default function HowIWork() {
  return (
    <section id="about-section" className="section scroll-mt-20">
      <div className="wrap flex flex-col gap-[50px]">
        <Appear className="flex flex-col gap-5 text-center lg:text-left">
          <p className="hand text-[24px] text-blue">#{howIWork.kicker}</p>
          <h1 className="text-[38px] leading-none md:text-[60px]">{howIWork.heading}</h1>
        </Appear>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-[60px] lg:w-[588px]">
            {/* Tool stack */}
            <Appear className="flex flex-col gap-6">
              <p className="hand text-center text-[28px] text-muted lg:text-left">{howIWork.toolStackLabel}</p>
              <ul className="flex justify-center gap-2.5 lg:justify-start">
                {howIWork.tools.map((t) => (
                  <li key={t.name} className="group relative">
                    <div className="grid h-20 w-20 place-items-center rounded-[32px] bg-card-2 shadow-soft">
                      <ToolGlyph icon={t.icon} />
                    </div>
                    <span className="hand pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[17px] text-blue opacity-0 transition-opacity group-hover:opacity-100">
                      {t.name}
                    </span>
                    <span className="sr-only">{t.name}</span>
                  </li>
                ))}
              </ul>
            </Appear>

            {/* Work process */}
            <div className="flex flex-col gap-6">
              <p className="hand text-center text-[28px] text-muted lg:text-left">{howIWork.processLabel}</p>
              <ol className="grid gap-3 md:grid-cols-2 md:gap-2.5">
                {howIWork.steps.map((s, i) => (
                  <Appear key={s.title} delay={i * 90}>
                  <li className="flex h-full flex-col gap-4 rounded-[50px] bg-card p-[22px] shadow-soft">
                    <div className="flex flex-col gap-2.5">
                      <p className="hand text-[24px] text-blue">#Step {i + 1}</p>
                      <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em]">{s.title}</p>
                    </div>
                    <p className="text-[16px] font-medium leading-[1.3] text-muted">{s.body}</p>
                  </li>
                  </Appear>
                ))}
              </ol>
            </div>
          </div>

          {/* Foto */}
          <Appear className="relative lg:w-[529px]">
            <div className="relative aspect-[343/500] w-full overflow-hidden rounded-[50px] shadow-soft lg:aspect-[529/639] lg:rounded-[80px]">
              <Image
                src={howIWork.photo.src}
                alt={howIWork.photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 529px"
                className="object-cover"
              />
            </div>
            <p
              className="hand absolute -top-2 right-0 w-[70%] rotate-[14deg] text-right text-[54px] text-blue lg:-right-6 lg:top-6 lg:w-auto lg:rotate-[22deg]"
              aria-hidden
            >
              {howIWork.sticker}
            </p>
          </Appear>
        </div>
      </div>
    </section>
  );
}
