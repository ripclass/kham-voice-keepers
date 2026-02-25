import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const navLinks: [string, string][] = [
  ["The Vision", "the-argument"],
  ["Origin", "founder"],
  ["What We Build", "what-we-build"],
  ["Dialects", "dialect-map"],
  ["Contact", "get-involved"],
];

const SystemHeaderNav = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <header className="w-full border-b border-dashed border-ink/20 dark:border-border bg-paper/95 dark:bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="font-tech text-sm uppercase tracking-[0.2em] text-ink dark:text-foreground hover:text-terracotta dark:hover:text-terracotta transition-colors shrink-0"
          >
            KhaM
          </a>

          <div className="flex-1 border-t border-dashed border-ink/25 dark:border-border" />

          <nav className="flex items-center gap-x-4 md:gap-x-5 flex-wrap justify-end">
            {navLinks.map(([label, id]) => (
              <button
                key={label}
                type="button"
                onClick={() => jumpTo(id)}
                className="font-tech text-[11px] uppercase tracking-[0.12em] text-ink/65 dark:text-foreground/65 hover:text-ink dark:hover:text-foreground transition-colors whitespace-nowrap"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className="ml-2 rounded-none border border-dashed border-ink/60 dark:border-foreground/40 p-1.5 text-ink/80 dark:text-foreground/80 hover:text-ink dark:hover:text-foreground hover:bg-ink/5 dark:hover:bg-foreground/10 transition-colors"
          >
            {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default SystemHeaderNav;
