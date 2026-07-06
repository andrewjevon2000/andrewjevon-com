type SectionHeadProps = {
  index: string;
  title: string;
};

export default function SectionHead({ index, title }: SectionHeadProps) {
  return (
    <div className="mb-14 flex items-baseline gap-[18px]">
      <span className="grad-text font-mono text-[13px]">{index}</span>
      <h2 className="text-[clamp(28px,4vw,44px)] font-bold">{title}</h2>
      <span className="h-px flex-1 bg-line" aria-hidden />
    </div>
  );
}
