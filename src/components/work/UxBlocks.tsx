import Image from "next/image";
import type {
  DesignDecision,
  ProofVisual,
  Stat,
  TextPart,
  UxSection,
} from "@/lib/content";

/* Blok-blok case study proof-first. Server components — teks & angka ada di HTML. */

export function Parts({ parts }: { parts: TextPart[] }) {
  return (
    <>
      {parts.map((p, i) =>
        p.gradient ? (
          <span key={i} className="grad-text">
            {p.text}
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="hand mb-2">#{children}</p>
  );
}

/* ---------- Proof hero ---------- */

function ProofBars({ proof }: { proof: Extract<ProofVisual, { kind: "bars" }> }) {
  const max = Math.max(...proof.bars.map((b) => b.value));
  return (
    <div className="rounded-[16px] border border-line bg-panel p-5 pb-6 shadow-[var(--shadow)] md:p-7 md:pb-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-dim">{proof.title}</h2>
      <div
        className="mt-5 grid h-[200px] grid-cols-6 items-end gap-2 md:h-[240px] md:gap-4"
        role="img"
        aria-label={`${proof.title}: ${proof.bars.map((b) => `${b.label} ${b.value}%`).join(", ")}`}
      >
        {proof.bars.map((b) => (
          <div key={b.label} className="relative flex h-full flex-col justify-end rounded-[10px] bg-bg2">
            <span
              className="absolute inset-x-0 text-center font-mono text-xs font-semibold text-txt"
              style={{ bottom: `calc(${(b.value / max) * 85}% + 6px)` }}
            >
              {b.value}%
            </span>
            <i
              className="block rounded-[10px] bg-accent"
              style={{ height: `${(b.value / max) * 85}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-6 gap-2 text-center font-mono text-[11px] text-dim md:gap-4">
        {proof.bars.map((b) => (
          <span key={b.label}>{b.label}</span>
        ))}
      </div>
      <p className="mt-3 text-xs text-dimmer">{proof.legend}</p>
    </div>
  );
}

function ProofFunnel({ proof }: { proof: Extract<ProofVisual, { kind: "funnel" }> }) {
  return (
    <div className="rounded-[16px] border border-line bg-panel p-5 pb-6 shadow-[var(--shadow)] md:p-7 md:pb-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-dim">{proof.title}</h2>
      <ol className="mt-5 grid gap-2.5 md:grid-cols-4 md:gap-0">
        {proof.steps.map((s, i) => (
          <li
            key={s.label}
            className={`relative border border-line px-4 py-4 max-md:rounded-[12px] md:-ml-px md:first:rounded-l-[12px] md:last:rounded-r-[12px] ${
              s.win ? "bg-accent-soft" : "bg-bg2"
            }`}
          >
            <span className="font-mono text-[11px] text-dimmer">{String(i + 1).padStart(2, "0")}</span>
            <p className={`mt-1 font-medium ${s.win ? "grad-text" : ""}`}>{s.label}</p>
            <p className="mt-1 text-[13px] text-dim">{s.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProofHero({ proof, badges }: { proof: ProofVisual; badges: [Stat, Stat, Stat] }) {
  return (
    <figure className="relative mt-8 md:mb-10 md:mt-10">
      {proof.kind === "image" && (
        <a
          href={proof.src}
          target="_blank"
          rel="noopener"
          className="group block overflow-hidden rounded-[16px] border border-line bg-panel shadow-[var(--shadow)]"
          aria-label="Open full-size screenshot"
        >
          <Image
            src={proof.src}
            alt={proof.alt}
            width={proof.width}
            height={proof.height}
            priority
            sizes="(max-width: 880px) 100vw, 880px"
            className="h-auto w-full"
          />
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-[rgba(20,20,20,.8)] px-3 py-1.5 font-mono text-[11px] text-white md:hidden">
            Tap to zoom ↗
          </span>
        </a>
      )}
      {proof.kind === "bars" && <ProofBars proof={proof} />}
      {proof.kind === "funnel" && <ProofFunnel proof={proof} />}

      <div className="mt-3 grid grid-cols-3 gap-2 md:absolute md:-bottom-9 md:left-6 md:mt-0 md:flex md:gap-3">
        {badges.map((b) => (
          <div
            key={b.label}
            className="rounded-[12px] border border-line bg-panel px-3 py-2.5 md:min-w-[170px] shadow-[var(--shadow)] md:px-4 md:py-3 md:shadow-[var(--shadow-lg)]"
          >
            <div className="grad-text font-mono text-[clamp(15px,4.2vw,26px)] font-extrabold leading-tight [overflow-wrap:anywhere]">
              {b.value}
            </div>
            <div className="mt-1 text-[11px] leading-snug text-dim md:text-xs">{b.label}</div>
          </div>
        ))}
      </div>
    </figure>
  );
}

/* ---------- Brief ---------- */

export function Brief({ problem, approach }: { problem: string; approach: string }) {
  return (
    <div className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
      {[
        ["Problem", problem],
        ["Approach", approach],
      ].map(([k, v]) => (
        <div key={k} className="rounded-[14px] bg-bg2 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dimmer">{k}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-txt">{v}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- Section pieces ---------- */

function DataTable({ table }: { table: NonNullable<UxSection["table"]> }) {
  const [first, ...rest] = table.columns;
  return (
    <figure className="mt-6">
      {/* Desktop: tabel */}
      <table className="hidden w-full border-collapse text-left text-[15px] md:table">
        <thead>
          <tr>
            {table.columns.map((c) => (
              <th key={c} className="pb-3 pr-4 font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-dimmer">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r) => (
            <tr key={r[0]} className="border-t border-line">
              {r.map((cell, i) => (
                <td
                  key={i}
                  className={`py-4 pr-4 align-top ${
                    i === 0 ? "font-medium text-txt" : i === 1 ? "italic text-dim" : "font-mono text-txt"
                  } ${i === r.length - 1 ? "grad-text font-semibold" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile: kartu bertumpuk */}
      <ul className="grid gap-2.5 md:hidden">
        {table.rows.map((r) => (
          <li key={r[0]} className="rounded-[12px] border border-line bg-panel p-4">
            <p className="font-medium">{r[0]}</p>
            <p className="mt-1 border-b border-line pb-3 text-sm italic text-dim">{r[1]}</p>
            <dl className="mt-3 grid grid-cols-2 gap-2">
              {rest.slice(1).map((c, i) => (
                <div key={c}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-dimmer">{c}</dt>
                  <dd className={`font-mono text-sm ${i === rest.length - 2 ? "grad-text font-semibold" : ""}`}>
                    {r[i + 2]}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <figcaption className="mt-3 text-xs text-dimmer">
        <span className="sr-only">{first}. </span>
        {table.source}
      </figcaption>
    </figure>
  );
}

function SiteTree({ tree }: { tree: NonNullable<UxSection["tree"]> }) {
  return (
    <figure className="mt-6">
      <div className="mx-auto w-fit rounded-[12px] bg-ink px-5 py-3 text-center text-white">
        <p className="text-sm font-medium">{tree.root.label}</p>
        <p className="text-xs opacity-70">{tree.root.note}</p>
      </div>
      <div className="mx-auto h-5 w-px bg-line" aria-hidden />
      <ul className="relative ml-3 grid gap-3 border-l border-line pl-5 md:ml-0 md:grid-cols-4 md:border-l-0 md:pl-0 md:pt-5 md:before:absolute md:before:inset-x-[12.5%] md:before:top-0 md:before:h-px md:before:bg-line">
        {tree.branches.map((b) => (
          <li
            key={b.label}
            className="relative before:absolute before:-left-5 before:top-5 before:h-px before:w-4 before:bg-line md:before:-top-5 md:before:left-1/2 md:before:h-5 md:before:w-px"
          >
            <div
              className={`rounded-[12px] border px-4 py-3 md:text-center ${
                b.conversion ? "border-accent bg-accent-soft" : "border-line bg-panel"
              }`}
            >
              <p className="text-sm font-medium">{b.label}</p>
              <p className="text-xs text-dim">{b.note}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5 md:flex-col">
              {b.leaves.map((l) => (
                <span key={l} className="rounded-[8px] bg-bg2 px-2.5 py-1 text-xs text-dim md:text-center">
                  {l}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <figcaption className="mt-4 text-xs text-dimmer">{tree.caption}</figcaption>
    </figure>
  );
}

function Steps({ steps }: { steps: NonNullable<UxSection["steps"]> }) {
  return (
    <>
      <ol
        className="-mx-8 mt-6 flex snap-x snap-mandatory scroll-px-8 gap-3 overflow-x-auto px-8 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:overflow-visible md:px-0"
        style={{ gridTemplateColumns: `repeat(${Math.min(steps.length, 5)}, minmax(0, 1fr))` }}
      >
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="w-[78%] shrink-0 snap-start rounded-[14px] border border-line bg-panel p-5 md:w-auto"
          >
            <span className="font-mono text-2xl font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-2 font-medium">{s.title}</p>
            <p className="mt-1 text-sm text-dim">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-1 text-right font-mono text-[11px] text-dimmer md:hidden" aria-hidden>
        swipe →
      </p>
    </>
  );
}

function Points({ points }: { points: NonNullable<UxSection["points"]> }) {
  return (
    <ul className={`mt-6 grid gap-3 ${points.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {points.map((p) => (
        <li key={p.title} className="rounded-[14px] border border-line bg-panel p-5">
          <p className="font-medium">{p.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-dim">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function UxSectionBlock({ section, index }: { section: UxSection; index: number }) {
  return (
    <section id={section.id} className="scroll-mt-[124px] border-t border-line py-12 md:scroll-mt-[84px] md:py-16">
      <Kicker>
        {String(index).padStart(2, "0")} · {section.label}
      </Kicker>
      <h2 className="text-[clamp(26px,4vw,40px)]">
        <Parts parts={section.title} />
      </h2>
      {section.intro && <p className="mt-4 max-w-[680px] text-[17px] leading-relaxed text-dim">{section.intro}</p>}
      {section.table && <DataTable table={section.table} />}
      {section.tree && <SiteTree tree={section.tree} />}
      {section.steps && <Steps steps={section.steps} />}
      {section.points && <Points points={section.points} />}
    </section>
  );
}

export function Decisions({ decisions, index }: { decisions: DesignDecision[]; index: number }) {
  return (
    <section id="decisions" className="scroll-mt-[124px] border-t border-line py-12 md:scroll-mt-[84px] md:py-16">
      <Kicker>{String(index).padStart(2, "0")} · Decisions</Kicker>
      <h2 className="text-[clamp(26px,4vw,40px)]">
        Design decisions <span className="grad-text">& the evidence</span>
      </h2>
      <ol className="mt-6">
        {decisions.map((d, i) => (
          <li key={d.title} className="grid gap-2 border-t border-line py-6 first:border-t-0 md:grid-cols-[64px_1fr] md:gap-5">
            <span className="serif-em text-4xl text-dimmer" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-[19px]">{d.title}</h3>
              <p className="mt-2 text-dim">{d.body}</p>
              <p className="mt-3 rounded-[10px] bg-bg2 px-4 py-3 text-sm">
                <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Evidence</span>
                {d.evidence}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
