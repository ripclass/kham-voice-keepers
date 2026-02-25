
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Disappearing", "Forgotten", "Lost", "Endangered", "Precious"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex items-center justify-center px-4 md:px-6 py-10 md:py-12">
      <div className="w-full">
        <div className="flex gap-6 md:gap-8 items-center justify-center flex-col">
          <div className="flex gap-3 flex-col">
            <h1 className="font-tech uppercase text-4xl md:text-6xl lg:text-7xl max-w-4xl tracking-[0.06em] text-center leading-tight text-ink dark:text-paper">
              <span>A Container for</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center min-h-[1.25em] md:min-h-[1.2em]">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-tech text-terracotta"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span>Voices</span>
            </h1>

            <p className="font-display text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-ink/80 dark:text-paper/80 text-center">
              KhaM is an open-source initiative preserving forgotten dialects, lost tone, and emotional language in AI—beginning with South Asia.
            </p>
          </div>
          <div className="pt-4 md:pt-5">
            <Button
              onClick={() => scrollToSection('what-is-kham')}
              className="rounded-none font-tech text-[11px] uppercase tracking-[0.14em] border border-dashed border-ink/80 dark:border-paper/80 !bg-ink/5 dark:!bg-paper/10 !text-ink dark:!text-paper hover:!bg-ink hover:!text-paper dark:hover:!bg-paper dark:hover:!text-ink font-semibold shadow-[inset_0_0_0_1px_rgba(0,0,0,0.45)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] gap-3"
              aria-label="Learn more about KhaM's mission"
            >
              Learn More <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
