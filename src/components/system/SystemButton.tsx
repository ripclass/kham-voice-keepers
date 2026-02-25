import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function SystemButton({ label, className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`rounded-none px-3 py-2 font-tech text-[11px] uppercase tracking-[0.12em] border border-dashed border-ink dark:border-paper bg-background text-ink dark:text-paper hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-all duration-200 ${className}`}
    >
      {label}
    </button>
  );
}
