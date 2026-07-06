import Link from "next/link";

/* Placeholder — home dibangun penuh di M3. */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
        andrewjevon.com — under construction
      </p>
      <h1 className="text-[clamp(38px,6vw,72px)] font-bold leading-[1.04]">
        I turn complex marketing data into <em className="grad-text not-italic">growth</em>.
      </h1>
      <p className="text-dim">
        M1 selesai — lihat{" "}
        <Link href="/styleguide" className="text-accent underline underline-offset-4">
          /styleguide
        </Link>{" "}
        untuk visual QA.
      </p>
    </main>
  );
}
