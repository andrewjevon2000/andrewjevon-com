import { contact } from "@/lib/content";
import ContactForm from "@/components/ui/ContactForm";
import { SquiggleArrow } from "@/components/ui/Icons";
import Appear from "@/components/ui/Appear";

export default function Contact() {
  return (
    <section id="contact-section" className="section scroll-mt-28">
      <div className="wrap flex flex-col items-center gap-[50px]">
        <Appear className="flex max-w-[640px] flex-col gap-5 text-center">
          <h2 className="text-[34px] leading-[1.05] md:text-[52px]">{contact.heading}</h2>
          <p className="text-[18px] font-medium leading-[1.3] text-muted">{contact.sub}</p>
        </Appear>
        <Appear className="relative w-full max-w-[720px]">
          <ContactForm />
          <p className="mt-6 text-center text-[16px] font-medium text-muted">
            {contact.emailPrefix}{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold text-ink underline underline-offset-4" data-track="email_click" data-location="contact">
              {contact.email}
            </a>
          </p>
          <p className="hand absolute -bottom-14 right-2 hidden -rotate-[20deg] items-end gap-1 text-[18px] text-blue md:flex" aria-hidden>
            <SquiggleArrow className="h-[29px] w-[18px] text-blue" />
            <span>{contact.note}</span>
          </p>
        </Appear>
      </div>
    </section>
  );
}
