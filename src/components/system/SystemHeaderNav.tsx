import { Link } from "react-router-dom";

const navLinks: [string, string][] = [
  ["Voices", "/voices"],
  ["Library", "/library"],
  ["Roadmap", "/roadmap"],
  ["Origin", "/team"],
  ["Support", "/support"],
  ["Research", "/research"],
  ["Contact", "/contact"],
];

/**
 * SystemHeaderNav — unified KhaM ASCII-style site header.
 * Replaces the legacy Navigation component across all top-level pages.
 */
const SystemHeaderNav = () => {
  return (
    <header className="w-full border-b border-dashed border-ink/20 dark:border-paper/25 bg-paper/95 dark:bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center gap-3">
          {/* Brand / home link */}
          <Link
            to="/"
            className="font-tech text-sm uppercase tracking-[0.2em] text-ink dark:text-paper hover:text-terracotta dark:hover:text-terracotta transition-colors shrink-0"
          >
            KhaM
          </Link>

          {/* Dashed separator line */}
          <div className="flex-1 border-t border-dashed border-ink/25 dark:border-paper/25" />

          {/* Right-aligned nav links */}
          <nav className="flex items-center gap-x-4 md:gap-x-5 flex-wrap justify-end">
            {navLinks.map(([label, href]) => (
              <Link
                key={label}
                to={href}
                className="font-tech text-[11px] uppercase tracking-[0.12em] text-ink/65 dark:text-paper/65 hover:text-ink dark:hover:text-paper transition-colors whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SystemHeaderNav;
