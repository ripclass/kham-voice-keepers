import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function SystemSection({ title, description, children }: Props) {
  return (
    <section className="rounded-none border border-ink/25 dark:border-paper/25">
      <div className="p-4 border-b border-dashed border-ink/20 dark:border-paper/20">
        <h2 className="font-tech uppercase tracking-[0.08em] text-sm md:text-base">{title}</h2>
        {description && <p className="font-display mt-1 text-xs md:text-sm text-ink/75 dark:text-paper/75">{description}</p>}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}
