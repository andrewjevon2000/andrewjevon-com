import Image from "next/image";
import type { BarChart, Decision, EvidenceImage, Exhibit, ResearchTable, Stat } from "@/lib/content";
import Appear from "@/components/ui/Appear";

/* Blok tambahan halaman project — bahasa visual sama dengan home:
   kartu abu-abu radius 50, label tulisan tangan biru, angka Open Runde 600. */

export function SectionTitle({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <Appear className="flex flex-col gap-4">
      <p className="hand text-[24px] text-blue">#{kicker}</p>
      <h2 className="text-[28px] leading-none md:text-[40px]">{title}</h2>
      {intro && <p className="max-w-[720px] text-[18px] font-medium leading-[1.3] text-muted">{intro}</p>}
    </Appear>
  );
}

export function Highlights({ items }: { items: [Stat, Stat, Stat] }) {
  return (
    <ul className="grid gap-2.5 md:grid-cols-3">
      {items.map((h, i) => (
        <Appear key={h.label} delay={i * 80}>
          <li className="flex h-full flex-col gap-2 rounded-[50px] bg-card p-[22px] shadow-soft md:p-7">
            <p className="text-[32px] font-semibold leading-none tracking-[-0.05em] text-blue md:text-[40px]">{h.value}</p>
            <p className="text-[16px] font-medium leading-[1.3] text-muted">{h.label}</p>
          </li>
        </Appear>
      ))}
    </ul>
  );
}

export function Research({ table }: { table: ResearchTable }) {
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle kicker="Research" title={table.title} intro={table.intro} />
      <Appear className="rounded-[50px] bg-card p-4 shadow-soft md:p-8">
        {/* ≥ tablet: tabel */}
        <table className="hidden w-full border-collapse text-left md:table">
          <thead>
            <tr>
              {table.columns.map((c) => (
                <th key={c} className="hand pb-4 pr-4 text-[22px] font-normal text-muted">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r) => (
              <tr key={r[0]} className="border-t border-card-2">
                {r.map((cell, i) => (
                  <td
                    key={i}
                    className={`py-4 pr-4 align-top text-[18px] ${
                      i === 0 ? "font-semibold text-ink" : i === r.length - 1 ? "font-semibold text-blue" : "font-medium text-muted"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* HP: kartu bertumpuk */}
        <ul className="flex flex-col gap-2.5 md:hidden">
          {table.rows.map((r) => (
            <li key={r[0]} className="rounded-[32px] bg-white p-5 shadow-softer">
              <p className="text-[18px] font-semibold text-ink">{r[0]}</p>
              <p className="mt-1 text-[16px] font-medium text-muted">{r[1]}</p>
              <div className="mt-3 flex items-center justify-between border-t border-card-2 pt-3">
                <span className="text-[16px] font-medium text-muted">{r[2]} / mo</span>
                <span className="text-[18px] font-semibold text-blue">{r[3]}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="hand mt-5 text-[20px] text-muted">{table.source}</p>
      </Appear>
    </div>
  );
}

export function Decisions({ items }: { items: Decision[] }) {
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle kicker="Key Decisions" title="Design decisions & the evidence" />
      <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
        {items.map((d, i) => (
          <Appear key={d.title} delay={i * 90}>
            <li className="flex h-full flex-col gap-4 rounded-[50px] bg-card p-[22px] shadow-soft md:p-7">
              <p className="hand text-[24px] text-blue">#Decision {i + 1}</p>
              <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em] text-ink">{d.title}</p>
              <p className="text-[16px] font-medium leading-[1.3] text-muted">{d.body}</p>
              <div className="mt-auto rounded-[24px] bg-card-2 p-4">
                <p className="hand text-[18px] text-blue">Evidence</p>
                <p className="mt-1 text-[15px] font-medium leading-[1.35] text-ink">{d.evidence}</p>
              </div>
            </li>
          </Appear>
        ))}
      </ol>
    </div>
  );
}

export function Bars({ chart }: { chart: BarChart }) {
  const max = Math.max(...chart.bars.map((b) => b.value));
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle kicker="Result" title={chart.title} />
      <Appear className="rounded-[50px] bg-card p-6 shadow-soft md:p-8">
        <div
          className="grid h-[220px] grid-cols-6 items-end gap-2 md:h-[280px] md:gap-4"
          role="img"
          aria-label={`${chart.title}: ${chart.bars.map((b) => `${b.label} ${b.value}%`).join(", ")}`}
        >
          {chart.bars.map((b) => (
            <div key={b.label} className="relative flex h-full flex-col justify-end rounded-[18px] bg-card-2">
              <span
                className="absolute inset-x-0 text-center text-[16px] font-semibold text-ink md:text-[20px]"
                style={{ bottom: `calc(${(b.value / max) * 82}% + 8px)` }}
              >
                {b.value}%
              </span>
              <i className="block rounded-[18px] bg-blue" style={{ height: `${(b.value / max) * 82}%` }} />
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-6 gap-2 text-center text-[14px] font-medium text-muted md:gap-4">
          {chart.bars.map((b) => (
            <span key={b.label}>{b.label}</span>
          ))}
        </div>
        <p className="mt-5 text-[16px] font-medium text-muted">{chart.note}</p>
      </Appear>
    </div>
  );
}

export function Evidence({ items }: { items: EvidenceImage[] }) {
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle kicker="Evidence" title="Screenshots & artefacts" intro="Tap any image to open it full size." />
      <ul className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {items.map((it, i) => {
          const portrait = it.height > it.width * 1.2;
          return (
            <Appear key={it.src} delay={(i % 3) * 70}>
              <li className="h-full">
                <a
                  href={it.src}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full flex-col overflow-hidden rounded-[32px] bg-card-2 shadow-softer transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className={`relative w-full overflow-hidden bg-white ${portrait ? "aspect-[4/5]" : "aspect-[16/10]"}`}>
                    <Image
                      src={it.src}
                      alt={it.alt}
                      fill
                      sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className={`transition-transform duration-500 group-hover:scale-[1.03] ${portrait ? "object-cover object-top" : "object-contain p-3"}`}
                    />
                  </div>
                  <p className="p-5 text-[15px] font-medium leading-[1.35] text-ink">{it.caption}</p>
                </a>
              </li>
            </Appear>
          );
        })}
      </ul>
    </div>
  );
}

export function Exhibits({ items }: { items: Exhibit[] }) {
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle kicker="Exhibits" title="Interactive case files" intro="Working documents from the engagement — open in a new tab." />
      <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
        {items.map((ex, i) => (
          <Appear key={ex.href} delay={i * 80}>
            <li className="h-full">
              <a
                href={ex.href}
                target="_blank"
                rel="noopener"
                className="flex h-full flex-col gap-3 rounded-[50px] bg-card p-[22px] shadow-soft transition-transform duration-300 hover:-translate-y-1 md:p-7"
              >
                <p className="hand text-[24px] text-blue">#Exhibit {i + 1}</p>
                <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em] text-ink">{ex.title}</p>
                <p className="text-[16px] font-medium leading-[1.3] text-muted">{ex.desc}</p>
                <span className="mt-auto pt-2 text-[16px] font-semibold text-blue">Open exhibit ↗</span>
              </a>
            </li>
          </Appear>
        ))}
      </ul>
    </div>
  );
}
