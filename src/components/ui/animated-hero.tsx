
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
    <div className="w-full min-h-screen flex items-center justify-center px-6 md:px-12 pt-20">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl lg:text-8xl max-w-4xl tracking-tighter text-center font-serif leading-tight">
              <span className="text-ink">A Container for</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-serif text-ink"
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
              <span className="text-ink">Voices</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-ink/80 text-center">
              KhaM is an open-source initiative preserving forgotten dialects, lost tone, and emotional language in AI—beginning with South Asia.
            </p>
          </div>
          <div className="pt-8">
            <Button 
              onClick={() => scrollToSection('what-is-kham')}
              className="bg-terracotta hover:bg-terracotta/90 text-paper px-8 py-3 text-lg rounded-none border-0 font-light gap-4"
              size="lg"
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
