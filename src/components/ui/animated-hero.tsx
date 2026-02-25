import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 md:px-6 py-8 md:py-10">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
        <div className="border border-dashed border-ink/25 dark:border-border p-5 md:p-7 flex flex-col justify-center">
          <h1 className="font-tech uppercase text-3xl md:text-5xl lg:text-6xl tracking-[0.06em] leading-tight text-ink dark:text-foreground">
            Sovereign AI<br />
            <span className="text-terracotta">for South Asia</span>
          </h1>

          <p className="mt-4 font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/90 max-w-2xl">
            The languages of South Asia are not just multilingual — they are emotionally polyphonic. KhaM is building the cultural infrastructure to preserve them in AI before they disappear from both memory and machine.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => navigate('/#get-involved')}
              className="rounded-none font-tech text-[11px] uppercase tracking-[0.14em] border border-dashed border-ink/80 dark:border-foreground/60 !bg-ink/5 dark:!bg-foreground/10 !text-ink dark:!text-paper hover:!bg-ink hover:!text-paper dark:hover:!bg-paper dark:hover:!text-ink font-semibold shadow-[inset_0_0_0_1px_rgba(0,0,0,0.45)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] gap-3"
              aria-label="Get involved with KhaM"
            >
              Get Involved <MoveRight className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigate('/#founder')}
              className="rounded-none font-tech text-[11px] uppercase tracking-[0.14em] border border-dashed border-ink/40 dark:border-border text-ink/80 dark:text-foreground/85 hover:text-ink dark:hover:text-foreground"
              aria-label="Read the origin story"
            >
              Read the origin story
            </Button>
          </div>
        </div>

        <div className="border border-dashed border-ink/25 dark:border-border p-5 md:p-7 bg-paper/40 dark:bg-foreground/5 flex flex-col justify-between">
          <div>
            <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-terracotta mb-4">On Language &amp; Sovereignty</p>
            <blockquote className="font-news italic text-xl md:text-2xl leading-relaxed text-ink/90 dark:text-foreground/95">
              "A language that doesn't exist in AI doesn't exist in the future. We are building so that future remembers us — not just in words, but in feeling."
            </blockquote>
            <p className="mt-4 font-tech text-[11px] uppercase tracking-[0.12em] text-ink/60 dark:text-foreground/70">
              — Ripon, Founder of KhaM
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-dashed border-ink/25 dark:border-border">
            <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-ink/55 dark:text-foreground/65">Memory Infrastructure</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
