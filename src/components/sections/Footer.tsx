import { footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line py-[30px] text-[12.5px] text-dimmer">
      <div className="wrap flex flex-wrap justify-between gap-2.5">
        <p>
          <b className="font-medium text-dim">{footer.copyright}</b>
        </p>
        <p>
          {footer.credit.split(" — ")[0]} —{" "}
          <b className="font-medium text-dim">{footer.credit.split(" — ")[1]}</b>
        </p>
      </div>
    </footer>
  );
}
