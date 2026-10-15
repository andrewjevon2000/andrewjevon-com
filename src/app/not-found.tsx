import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-[150px] text-center md:pt-[200px]">
        <p className="hand text-[24px] text-blue">#404</p>
        <h1 className="mt-4 text-[38px] leading-none md:text-[60px]">Page not found</h1>
        <p className="mt-5 max-w-md text-[18px] font-medium text-muted">
          The link may be broken, or the page may have moved. Let&apos;s get you back to the work.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-dark">
            Back home
          </Link>
          <Link href="/#works-section" className="btn btn-light">
            View work
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
