import Link from "next/link";
import { footer } from "@/lib/content";
import { LinkedInIcon } from "@/components/ui/Icons";
import { ArrowRight, Mail } from "@/components/ui/Lucide";

/* Footer ringkas: nama, tagline, Work / LinkedIn / Email, copyright tahun berjalan.
   Link absolut ("/#…") karena footer juga tampil di halaman studi kasus. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-4 py-[50px] md:px-10 xl:px-[120px]">
      <div className="wrap flex flex-col gap-6 rounded-[50px] bg-card-2 px-6 py-10 shadow-softer md:flex-row md:items-center md:justify-between md:p-[50px]">
        <div className="flex flex-col gap-3">
          <Link href="/" className="serif text-[40px] leading-[0.8] text-ink">
            {footer.logo}
          </Link>
          <p className="text-[18px] font-medium leading-[1.3] text-muted">{footer.tagline}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-2">
          {footer.links.map((l) => {
            const isEmail = l.href.startsWith("mailto:");
            const external = "external" in l && l.external;
            return (
              <a
                key={l.label}
                href={l.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(isEmail ? { "data-track": "email_click", "data-location": "footer" } : {})}
                className="btn btn-light px-4 text-[16px] font-medium"
              >
                {l.label === "LinkedIn" ? <LinkedInIcon /> : isEmail ? <Mail /> : <ArrowRight className="h-4 w-4" />} {l.label}
              </a>
            );
          })}
        </nav>
      </div>
      <p className="wrap px-8 pt-5 font-inter text-[12px] font-light text-muted">
        ©{year} {footer.copyright}
      </p>
    </footer>
  );
}
