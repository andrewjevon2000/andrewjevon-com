import { contact } from "@/lib/content";
import ContactForm from "@/components/ui/ContactForm";
import { SquiggleArrow } from "@/components/ui/Icons";

export default function Contact() {
  return (
    <section id="contact-section" className="section scroll-mt-20">
      <div className="wrap flex flex-col items-center gap-[50px]">
        <div className="flex max-w-[520px] flex-col gap-5 text-center">
          <p className="hand text-[24px] text-blue">#{contact.kicker}</p>
          <h1 className="text-[38px] leading-none md:text-[60px]">{contact.heading}</h1>
          <p className="text-[18px] font-medium leading-[1.2] text-muted">{contact.sub}</p>
        </div>
        <div className="relative w-full max-w-[720px]">
          <ContactForm />
          <p className="hand absolute -bottom-12 right-2 flex -rotate-[20deg] items-end gap-1 text-[18px] text-blue" aria-hidden>
            <SquiggleArrow className="h-[29px] w-[18px] text-blue" />
            <span>{contact.note}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
