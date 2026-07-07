import { contact } from "@/lib/content";
import Button from "@/components/ui/Button";
import EmailButton from "@/components/ui/EmailButton";

export default function Contact() {
  return (
    <section id="contact" className="relative pb-[90px] pt-[150px] text-center max-md:pt-[90px]">
      <div className="wrap">
        <h2 className="text-[clamp(34px,5.4vw,62px)]">
          {contact.heading.map((part, i) =>
            part.gradient ? (
              <em key={i} className="grad-text not-italic">
                {part.text}
              </em>
            ) : (
              part.text.split("\n").map((line, j) => (
                <span key={`${i}-${j}`}>
                  {j > 0 && <br />}
                  {line}
                </span>
              ))
            ),
          )}
        </h2>
        <p className="mx-auto mb-9 mt-[22px] max-w-[440px] text-[17px] text-dim">{contact.sub}</p>
        <EmailButton />
        <div className="mt-[22px]">
          <Button variant="ghost" href={contact.linkedin.href} external>
            {contact.linkedin.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
