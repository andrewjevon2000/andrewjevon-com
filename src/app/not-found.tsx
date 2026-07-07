import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <p className="grad-text font-mono text-[clamp(64px,14vw,140px)] font-extrabold leading-none">
        404
      </p>
      <h1 className="mt-6 text-[clamp(24px,4vw,36px)] font-medium">This page drifted off-grid.</h1>
      <p className="mt-3 max-w-md text-dim">
        The link may be broken, or the page may have moved. Let&apos;s get you back to the work.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back home</Button>
        <Button variant="ghost" href="/#work">
          View work
        </Button>
      </div>
      <Link
        href="/#contact"
        className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-dimmer transition-colors hover:text-accent"
      >
        Or get in touch →
      </Link>
    </main>
  );
}
