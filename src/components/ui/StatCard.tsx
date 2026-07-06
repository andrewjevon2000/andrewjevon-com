type StatCardProps = {
  /* teks di sekitar angka gradient, mis. prefix "+" / suffix "%" tetap --txt */
  prefix?: string;
  value: string;
  suffix?: string;
  label: string;
};

export default function StatCard({ prefix, value, suffix, label }: StatCardProps) {
  return (
    <div className="rounded-[14px] border border-line bg-[image:linear-gradient(180deg,var(--panel),transparent)] px-6 py-[22px] transition-all duration-300 hover:-translate-y-[3px] hover:border-accent">
      <div className="font-mono text-[clamp(26px,3.4vw,40px)] font-extrabold text-txt">
        {prefix}
        <b className="grad-text font-extrabold">{value}</b>
        {suffix}
      </div>
      <div className="mt-1.5 text-[13px] text-dim">{label}</div>
    </div>
  );
}
