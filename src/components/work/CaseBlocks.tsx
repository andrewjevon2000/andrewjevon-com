import Image from "next/image";
import type { BarChart, Decision, EvidenceImage, Exhibit, ResearchTable, Stat } from "@/lib/content";
import Appear from "@/components/ui/Appear";
import type { Brief as BriefT, Funnel as FunnelT, Learnings as LearningsT, Merge as MergeT, Tiles as TilesT, Tree as TreeT } from "@/lib/content";

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
        <Appear as="li" key={h.label} delay={i * 80} className="flex h-full flex-col gap-2 rounded-[50px] bg-card p-[22px] shadow-soft md:p-7">
          <p className="text-[32px] font-semibold leading-none tracking-[-0.05em] text-blue md:text-[40px]">{h.value}</p>
          <p className="text-[16px] font-medium leading-[1.3] text-muted">{h.label}</p>
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
          <Appear as="li" key={d.title} delay={i * 90} className="flex h-full flex-col gap-4 rounded-[50px] bg-card p-[22px] shadow-soft md:p-7">
              <p className="hand text-[24px] text-blue">#Decision {i + 1}</p>
              <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em] text-ink">{d.title}</p>
              <p className="text-[16px] font-medium leading-[1.3] text-muted">{d.body}</p>
              <div className="mt-auto rounded-[24px] bg-card-2 p-4">
                <p className="hand text-[18px] text-blue">Evidence</p>
                <p className="mt-1 text-[15px] font-medium leading-[1.35] text-ink">{d.evidence}</p>
              </div>
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
            <Appear as="li" key={it.src} delay={(i % 3) * 70} className="h-full">
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
          <Appear as="li" key={ex.href} delay={i * 80} className="h-full">
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
          </Appear>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Blok visual tambahan ---------- */


export function Brief({ brief }: { brief: BriefT }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 md:gap-4">
      {[
        ["Problem", brief.problem],
        ["Approach", brief.approach],
      ].map(([k, v], i) => (
        <Appear key={k} delay={i * 80}>
          <div className="flex h-full flex-col gap-3 rounded-[50px] bg-card-2 p-[22px] md:p-7">
            <p className="hand text-[24px] text-blue">#{k}</p>
            <p className="text-[18px] font-medium leading-[1.35] text-ink md:text-[20px]">{v}</p>
          </div>
        </Appear>
      ))}
    </div>
  );
}

export function SiteTree({ tree }: { tree: TreeT }) {
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle kicker="Structure" title={tree.title} intro={tree.intro} />
      <Appear className="rounded-[50px] bg-card p-5 shadow-soft md:p-8">
        <div className="mx-auto w-fit rounded-[18px] bg-ink px-6 py-3 text-center text-white">
          <p className="text-[18px] font-semibold">{tree.root.label}</p>
          <p className="text-[14px] font-medium opacity-70">{tree.root.note}</p>
        </div>
        <div className="mx-auto h-6 w-0.5 bg-card-3" aria-hidden />
        <ul className="relative ml-3 grid gap-4 border-l-2 border-card-3 pl-5 md:ml-0 md:grid-cols-4 md:gap-3 md:border-l-0 md:pl-0 md:pt-6 md:before:absolute md:before:inset-x-[12.5%] md:before:top-0 md:before:h-0.5 md:before:bg-card-3">
          {tree.branches.map((b) => (
            <li
              key={b.label}
              className="relative before:absolute before:-left-5 before:top-7 before:h-0.5 before:w-4 before:bg-card-3 md:before:-top-6 md:before:left-1/2 md:before:h-6 md:before:w-0.5"
            >
              <div className={`rounded-[18px] px-4 py-3 shadow-softer md:text-center ${b.conversion ? "bg-blue text-white" : "bg-white text-ink"}`}>
                <p className="text-[16px] font-semibold">{b.label}</p>
                <p className={`text-[13px] font-medium ${b.conversion ? "text-white/80" : "text-muted"}`}>{b.note}</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 md:flex-col">
                {b.leaves.map((l) => (
                  <span key={l} className="rounded-[12px] bg-card-2 px-3 py-1.5 text-[14px] font-medium text-muted md:text-center">
                    {l}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[16px] font-medium text-muted">
          {tree.flow.map((f, i) => (
            <span key={f} className="flex items-center gap-2">
              <span className={i === tree.flow.length - 1 ? "font-semibold text-blue" : ""}>{f}</span>
              {i < tree.flow.length - 1 && <span aria-hidden>→</span>}
            </span>
          ))}
        </p>
        <p className="hand mt-4 text-center text-[20px] text-muted">{tree.caption}</p>
      </Appear>
    </div>
  );
}

export function FunnelBlock({ funnel }: { funnel: FunnelT }) {
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle kicker="Journey" title={funnel.title} intro={funnel.intro} />
      <ol className="grid gap-3 md:grid-cols-4 md:gap-3">
        {funnel.steps.map((st, i) => (
          <Appear as="li" key={st.label} delay={i * 110} className={`relative flex h-full flex-col gap-2 rounded-[50px] p-[22px] shadow-soft md:p-7 ${st.win ? "bg-blue text-white" : "bg-card"}`}>
              <p className={`hand text-[24px] ${st.win ? "text-white/80" : "text-blue"}`}>#Step {i + 1}</p>
              <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em]">{st.label}</p>
              <p className={`text-[16px] font-medium leading-[1.3] ${st.win ? "text-white/85" : "text-muted"}`}>{st.detail}</p>
              {i < funnel.steps.length - 1 && (
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[22px] text-blue md:-right-4 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0" aria-hidden>
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              )}
          </Appear>
        ))}
      </ol>
    </div>
  );
}

export function MergeBlock({ merge }: { merge: MergeT }) {
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle kicker="Content inventory" title={merge.title} intro={merge.intro} />
      <Appear className="rounded-[50px] bg-card p-5 shadow-soft md:p-8">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1.2fr] md:gap-8">
          <ul className="flex flex-col gap-2">
            {merge.from.map((f) => (
              <li key={f} className="rounded-[14px] border-2 border-dashed border-card-3 bg-white px-4 py-2.5 text-[15px] font-medium text-muted">
                {f}
              </li>
            ))}
          </ul>
          <p className="text-center text-[32px] text-blue" aria-hidden>
            <span className="md:hidden">↓</span>
            <span className="hidden md:inline">→</span>
          </p>
          <div className="rounded-[24px] bg-blue p-6 text-white">
            <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em]">{merge.to.label}</p>
            <p className="mt-1 text-[15px] font-medium text-white/85">{merge.to.note}</p>
          </div>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {merge.actions.map((a) => (
            <li key={a.label} className="rounded-[18px] bg-card-2 px-4 py-3">
              <p className="text-[17px] font-semibold text-ink">{a.label}</p>
              <p className="text-[14px] font-medium text-muted">{a.note}</p>
            </li>
          ))}
        </ul>
      </Appear>
    </div>
  );
}

export function TilesBlock({ tiles }: { tiles: TilesT }) {
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle kicker="Structure" title={tiles.title} intro={tiles.intro} />
      <ul className={`grid gap-3 md:gap-4 ${tiles.items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {tiles.items.map((t, i) => (
          <Appear as="li" key={t.name} delay={i * 90} className="flex h-full flex-col gap-3 rounded-[50px] bg-card p-[22px] shadow-soft md:p-7">
              <span className="w-fit rounded-[12px] bg-blue px-3 py-1 text-[14px] font-semibold text-white">{t.code}</span>
              <p className="text-[22px] font-semibold leading-[1.3] tracking-[-0.04em] text-ink">{t.name}</p>
              <p className="text-[16px] font-medium leading-[1.3] text-muted">{t.body}</p>
          </Appear>
        ))}
      </ul>
    </div>
  );
}

export function LearningsBlock({ learnings }: { learnings: LearningsT }) {
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle kicker="What I learned" title="Takeaways" />
      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        <Appear>
          <blockquote className="flex h-full items-center rounded-[50px] bg-ink p-7 text-white md:p-10">
            <p className="serif text-[28px] leading-[1.15] md:text-[36px]">“{learnings.quote}”</p>
          </blockquote>
        </Appear>
        <div className="grid gap-3">
          {learnings.points.map((pt, i) => (
            <Appear key={pt.title} delay={80 + i * 80}>
              <div className="rounded-[32px] bg-card p-5 shadow-soft">
                <p className="text-[18px] font-semibold text-ink">{pt.title}</p>
                <p className="mt-1 text-[15px] font-medium leading-[1.35] text-muted">{pt.body}</p>
              </div>
            </Appear>
          ))}
          <Appear delay={260}>
            <div className="rounded-[32px] bg-card-2 p-5">
              <p className="hand text-[22px] text-blue">Next time</p>
              <p className="mt-1 text-[15px] font-medium leading-[1.35] text-ink">{learnings.next}</p>
            </div>
          </Appear>
        </div>
      </div>
    </div>
  );
}
