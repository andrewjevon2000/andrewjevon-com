import Link from "next/link";

type ButtonProps = {
  variant?: "solid" | "ghost";
  href?: string;
  external?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

/* font-sans (bukan display): script font tidak terbaca di ukuran tombol */
const base =
  "inline-block cursor-pointer rounded-full px-[26px] py-[13px] font-sans text-sm transition-all duration-250";

const variants = {
  solid:
    "bg-[image:var(--grad)] font-bold text-black hover:-translate-y-0.5 hover:shadow-[0_0_34px_var(--accent-glow)]",
  ghost:
    "border border-line font-medium text-txt hover:border-accent hover:text-accent",
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
