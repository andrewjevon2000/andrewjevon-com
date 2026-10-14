import Link from "next/link";

type ButtonProps = {
  variant?: "solid" | "ghost";
  href?: string;
  external?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

/* tracking -0.14px mengikuti button-md Meta (DESIGN-meta.md) */
const base =
  "inline-block cursor-pointer rounded-full px-[26px] py-[13px] font-sans text-sm tracking-[-0.14px] transition-all duration-250";

const variants = {
  solid:
    "bg-ink font-bold text-white hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]",
  ghost:
    "border border-line bg-panel font-medium text-txt shadow-[var(--shadow)] hover:border-accent hover:text-accent",
};

export default function Button({
  variant = "solid",
  href,
  external,
  onClick,
  children,
}: ButtonProps) {
  const className = `${base} ${variants[variant]}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
