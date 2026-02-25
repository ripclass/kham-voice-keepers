import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type PilotFrameProps = {
  title: string;
  subtitle: string;
  badgeLeft: string;
  badgeRight?: string;
  dark: boolean;
  onToggleTheme: () => void;
  children: ReactNode;
};

export default function PilotFrame({
  title,
  subtitle,
  badgeLeft,
  badgeRight = "V1.0",
  dark,
  onToggleTheme,
  children,
}: PilotFrameProps) {
  return (
    <div className="border border-ink/30 dark:border-paper/30 bg-background">
      <header className="border-b border-ink/20 dark:border-paper/20 px-4 md:px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="font-tech flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink/70 dark:text-paper/70">
              <span>{badgeLeft}</span>
              <span className="opacity-50">•</span>
              <span>{badgeRight}</span>
            </div>
            <h1 className="font-tech text-2xl md:text-4xl uppercase tracking-[0.08em] leading-tight text-ink dark:text-paper">{title}</h1>
            <p className="font-display text-sm md:text-base text-ink/80 dark:text-paper/80 max-w-2xl">{subtitle}</p>
          </div>
          <Button variant="outline" onClick={onToggleTheme} className="rounded-none font-tech uppercase tracking-[0.08em]">
            {dark ? "Light" : "Dark"}
          </Button>
        </div>
      </header>

      <div className="font-tech grid grid-cols-12 border-b border-ink/20 dark:border-paper/20 text-[11px] uppercase tracking-[0.14em] text-ink/60 dark:text-paper/60">
        <div className="col-span-6 md:col-span-3 px-4 py-2 border-r border-ink/20 dark:border-paper/20">Operational Interface</div>
        <div className="hidden md:block md:col-span-6 px-4 py-2 border-r border-ink/20 dark:border-paper/20">Internal Pilot Environment</div>
        <div className="col-span-6 md:col-span-3 px-4 py-2 text-right">Structured Output</div>
      </div>

      <div className="p-4 md:p-6">{children}</div>

      <footer className="font-tech border-t border-ink/20 dark:border-paper/20 px-4 md:px-6 py-2 text-[11px] uppercase tracking-[0.14em] text-ink/60 dark:text-paper/60 flex items-center justify-between">
        <span>KhaM for GOV • Internal Pilot Use Only</span>
        <span>Human Review Required</span>
      </footer>
    </div>
  );
}
