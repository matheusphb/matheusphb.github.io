interface PillProps {
  label: string;
  variant?: 'solid' | 'outline';
}

export function Pill({ label, variant = 'solid' }: PillProps) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider';
  const style =
    variant === 'outline'
      ? 'border border-slate-200 bg-white text-slate-500'
      : 'bg-slate-900 text-white';

  return <span className={`${base} ${style}`}>{label}</span>;
}
