import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function SystemPageFrame({ title, subtitle, children }: Props) {
  return (
    <section className="kham-frame">
      <header className="p-4 md:p-6 border-b border-dashed border-ink/20 dark:border-paper/25">
        <h1 className="font-tech uppercase tracking-[0.08em] text-2xl md:text-4xl text-ink dark:text-paper">{title}</h1>
        {subtitle && <p className="font-display mt-2 text-sm md:text-base text-ink/85 dark:text-paper/92">{subtitle}</p>}
      </header>
      <div className="p-4 md:p-6">{children}</div>
    </section>
  );
}
