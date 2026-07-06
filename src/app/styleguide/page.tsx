import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import SectionHead from "@/components/ui/SectionHead";
import StatCard from "@/components/ui/StatCard";
import { Button as AstryxButton } from "@astryxdesign/core/Button";
import { Badge } from "@astryxdesign/core/Badge";
import { Card } from "@astryxdesign/core/Card";
import { Text } from "@astryxdesign/core/Text";
import { AstryxFormDemo } from "./AstryxFormDemo";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false },
};

/* Halaman QA sementara — dihapus di M8. */

const colors = [
  { name: "--bg", varName: "var(--bg)" },
  { name: "--bg2", varName: "var(--bg2)" },
  { name: "--panel", varName: "var(--panel)" },
  { name: "--line", varName: "var(--line)" },
  { name: "--txt", varName: "var(--txt)" },
  { name: "--dim", varName: "var(--dim)" },
  { name: "--dimmer", varName: "var(--dimmer)" },
  { name: "--g1", varName: "var(--g1)" },
  { name: "--g2", varName: "var(--g2)" },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-dimmer">{title}</h3>
      {children}
    </section>
  );
}

export default function Styleguide() {
  return (
    <main className="mx-auto w-full max-w-[1160px] px-8 py-20">
      <h1 className="mb-2 text-[clamp(28px,4vw,44px)] font-bold">
        Aurora <em className="grad-text not-italic">styleguide</em>
      </h1>
      <p className="mb-12 text-dim">Temporary QA page — deleted at M8.</p>

      <Block title="Color tokens">
        <div className="flex flex-wrap gap-4">
          {colors.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-xl border border-line"
                style={{ background: c.varName }}
              />
              <span className="font-mono text-[11px] text-dim">{c.name}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-xl" style={{ background: "var(--grad)" }} />
            <span className="font-mono text-[11px] text-dim">--grad</span>
          </div>
        </div>
      </Block>

      <Block title="Typography">
        <div className="flex flex-col gap-6">
          <h1 className="text-[clamp(38px,6vw,72px)] font-bold leading-[1.04]">
            Hero h1 — into <em className="grad-text not-italic">growth</em>.
          </h1>
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold">Section h2 — Selected Work</h2>
          <h3 className="text-[clamp(21px,2.6vw,30px)] font-bold">
            Chapter title — MAKA Motors
          </h3>
          <p className="max-w-[520px] text-[17px] text-dim">
            Body / sub — 4+ years running the web, SEO, and performance backbone of marketing
            teams.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            Kicker — Andrew Jevon — Technical digital marketer
          </p>
          <p className="font-mono text-[13px] text-dim">
            Mono meta — JUN 2024 – SEP 2025 · INDONESIA
          </p>
        </div>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button href="#">View work ↓</Button>
          <Button variant="ghost" href="#">
            Get in touch
          </Button>
        </div>
      </Block>

      <Block title="Pills">
        <div className="flex flex-wrap gap-2">
          <Pill>Google Ads</Pill>
          <Pill>Meta Ads Manager</Pill>
          <Pill>GA4</Pill>
          <Pill>Search Console</Pill>
          <Pill>Ahrefs</Pill>
          <Pill>Claude</Pill>
        </div>
      </Block>

      <Block title="Stat cards">
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          <StatCard
            prefix="+"
            value="600"
            suffix="%"
            label="organic traffic growth MoM — MAKA Motors website revamp"
          />
          <StatCard
            prefix="$"
            value="160"
            suffix="K+"
            label="blended ad budget managed across Meta, Google, TikTok, YouTube"
          />
          <StatCard
            value="20"
            suffix="K+"
            label="leads generated in 6 months for a new EV category"
          />
        </div>
      </Block>

      <Block title="Section head">
        <SectionHead index="01" title="Selected Work" />
      </Block>

      <Block title="Astryx components (Meta design system)">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-4">
            <AstryxButton label="Primary" variant="primary" />
            <AstryxButton label="Secondary" variant="secondary" />
            <AstryxButton label="Ghost" variant="ghost" />
            <AstryxButton label="Destructive" variant="destructive" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge label="Neutral" variant="neutral" />
            <Badge label="Info" variant="info" />
            <Badge label="Success" variant="success" />
            <Badge label="Warning" variant="warning" />
            <Badge label="Error" variant="error" />
            <Badge label="Purple" variant="purple" />
            <Badge label="Cyan" variant="cyan" />
          </div>
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
            <Card>
              <Text type="label" size="lg">
                Astryx Card
              </Text>
              <Text type="body" color="secondary">
                Default card variant dengan padding token spacing-4.
              </Text>
            </Card>
            <Card variant="muted">
              <Text type="label" size="lg">
                Muted Card
              </Text>
              <Text type="body" color="secondary">
                Variant muted untuk konten de-emphasized.
              </Text>
            </Card>
          </div>
          <AstryxFormDemo />
        </div>
      </Block>

      <Block title="Surfaces">
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-panel p-8">
            <p className="text-sm text-dim">
              Panel surface — <b className="text-txt">--panel</b> on --bg, border --line, radius
              16px.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-bg2 p-8">
            <p className="text-sm text-dim">
              Alternating section — <b className="text-txt">--bg2</b>.
            </p>
          </div>
        </div>
      </Block>
    </main>
  );
}
