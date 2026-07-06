type PillProps = {
  children: React.ReactNode;
};

export default function Pill({ children }: PillProps) {
  return (
    <span className="whitespace-nowrap rounded-full border border-line px-5 py-[9px] font-mono text-[13px] text-dim transition-colors duration-250 hover:border-accent hover:text-accent">
      {children}
    </span>
  );
}
