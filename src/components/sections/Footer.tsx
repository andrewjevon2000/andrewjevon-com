import Link from "next/link";
import { caseStudies, footer, site } from "@/lib/content";
import { LinkedInIcon, MailIcon, SquiggleArrow } from "@/components/ui/Icons";

export default function Footer() {
  const columns = [
    ...footer.columns,
    { title: "Projects", links: caseStudies.map((cs) => ({ label: cs.client, href: `/work/${cs.slug}` })) },
  ];
  return (
    <footer className="px-4 py-[50px] md:px-10 xl:px-[120px]">
      <div className="wrap flex flex-col gap-6 rounded-[50px] bg-card-2 px-6 py-10 shadow-softer lg:flex-row lg:justify-between lg:gap-10 md:p-[50px]">
        <div className="flex flex-col items-start gap-7 lg:max-w-[340px]">
          <Link href="/" className="serif text-[40px] leading-[0.8] text-ink">
            {footer.logo}
          </Link>
          <div className="flex flex-col gap-4">
            <p className="hand text-[18px] text-blue">#{footer.kicker}</p>
            <h2 className="text-[22px] leading-none md:text-[32px]">{footer.heading}</h2>
            <p className="text-[18px] font-medium leading-[1.2] text-muted">{footer.sub}</p>
          </div>
          <div className="flex flex-col items-start">
            <a href={footer.cta.href} className="btn btn-dark">
              {footer.cta.label}
            </a>
            <span className="hand inline-flex items-start gap-1 pl-1 text-[18px] text-blue" aria-hidden>
              <SquiggleArrow className="h-[29px] w-[18px] text-blue" />
              <span className="pt-7">{footer.note}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:items-end">
          <div className="flex flex-col gap-3 lg:items-end">
            <p className="text-[18px] font-medium text-muted">{footer.socialLabel}</p>
            <div className="flex gap-2">
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-light text-[16px] font-medium">
                <LinkedInIcon /> LinkedIn
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-light text-[16px] font-medium">
                <MailIcon /> Email
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-1">
                <p className="mb-2 text-[18px] font-medium text-blue">{col.title}</p>
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} className="rounded-[18px] px-3 py-2.5 text-[16px] font-semibold text-ink transition-colors hover:bg-card -mx-3">
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap flex flex-col gap-1 px-8 pt-5 font-inter text-[12px] font-light text-muted md:flex-row md:justify-between">
        <p>{footer.copyright}</p>
        <p>{footer.credit}</p>
      </div>
    </footer>
  );
}
