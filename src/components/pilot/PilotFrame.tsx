import { ReactNode } from "react";
type PilotFrameProps = {
  title: string;
  subtitle: string;
  badgeLeft: string;
  badgeRight?: string;
  children: ReactNode;
};

export default function PilotFrame({
  title,
  subtitle,
  badgeLeft,
  badgeRight = "V1.0",
  children,
}: PilotFrameProps) {
  return (
    <div className="relative bg-background overflow-hidden border border-ink/25 dark:border-paper/25">
      <div className="pointer-events-none absolute left-0 top-0 w-10 h-10 border-l border-t border-ink/40 dark:border-paper/40" />
      <div className="pointer-events-none absolute right-0 top-0 w-10 h-10 border-r border-t border-ink/40 dark:border-paper/40" />
      <div className="pointer-events-none absolute left-0 bottom-0 w-10 h-10 border-l border-b border-ink/40 dark:border-paper/40" />
      <div className="pointer-events-none absolute right-0 bottom-0 w-10 h-10 border-r border-b border-ink/40 dark:border-paper/40" />

      <header className="relative border-b border-ink/20 dark:border-paper/20 px-4 md:px-6 py-6 md:py-7">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="font-tech flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink/70 dark:text-paper/70">
            <span>KhaM</span>
            <span className="opacity-50">•</span>
            <span>{badgeLeft}</span>
            <span className="opacity-50">•</span>
            <span>{badgeRight}</span>
          </div>
          <div className="font-tech text-[10px] uppercase tracking-[0.16em] text-ink/60 dark:text-paper/60">System Active</div>
        </div>

        <div className="flex items-center gap-2 opacity-70 mb-3">
          <div className="w-10 h-px bg-ink/60 dark:bg-paper/60" />
          <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-paper/70">001</span>
          <div className="flex-1 border-t border-dashed border-ink/40 dark:border-paper/40" />
        </div>

        <h1 className="font-tech text-2xl md:text-4xl uppercase tracking-[0.08em] leading-tight text-ink dark:text-white">
          {title}
        </h1>
        <p className="font-display text-sm md:text-base mt-2 max-w-2xl text-ink/80 dark:text-white/85">{subtitle}</p>
      </header>

      <div className="font-tech grid grid-cols-12 border-b border-ink/20 dark:border-paper/20 text-[11px] uppercase tracking-[0.14em] text-ink/60 dark:text-paper/60">
        <div className="col-span-6 md:col-span-3 px-4 py-2 border-r border-ink/20 dark:border-paper/20">Operational Interface</div>
        <div className="hidden md:block md:col-span-6 px-4 py-2 border-r border-ink/20 dark:border-paper/20">Internal Pilot Environment</div>
        <div className="col-span-6 md:col-span-3 px-4 py-2 text-right">Structured Output</div>
      </div>

      <div className="p-4 md:p-6">{children}</div>

      <footer className="font-tech border-t border-ink/20 dark:border-paper/20 px-4 md:px-6 py-2 text-[11px] uppercase tracking-[0.14em] text-ink/60 dark:text-paper/60">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>KhaM for GOV • Internal Pilot Use Only</span>
          <span>Human Review Required</span>
        </div>
      </footer>
    </div>
  );
}
