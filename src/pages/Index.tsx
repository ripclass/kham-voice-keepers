import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/ui/animated-hero";
import SystemPageFrame from "@/components/system/SystemPageFrame";
import SystemSection from "@/components/system/SystemSection";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>KhaM – Preserving Disappearing Voices in AI from South Asia</title>
        <meta name="description" content="KhaM is an open-source initiative preserving forgotten dialects, lost tone, and emotional language in AI—beginning with South Asia." />
        <meta property="og:title" content="KhaM – A Cultural Infrastructure Project for Preserving Language in AI" />
        <meta property="og:description" content="Protecting endangered voices and emotional nuance in South Asian languages through open-source tools and care." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KhaM – Preserving Disappearing Voices in AI from South Asia" />
        <meta name="twitter:description" content="KhaM is an open-source project preserving endangered South Asian dialects, voices, and emotional language in AI." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <link rel="canonical" href="https://khamlabs.org/" />

        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "KhaM",
            "url": "https://khamlabs.org",
            "logo": "https://khamlabs.org/logo.png",
            "description": "KhaM is an open-source cultural infrastructure project preserving endangered South Asian dialects and voices in AI.",
            "founder": {
              "@type": "Person",
              "name": "Ripon"
            },
            "sameAs": [
              "https://khamlabs.org"
            ]
          }`}
        </script>
      </Helmet>

      <div className="min-h-screen bg-paper text-ink dark:bg-background dark:text-paper">
        <Navigation />

        <main className="pt-24 pb-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-5">
            {/* ASCII-style module strip aligned to content frame */}
            <div className="kham-frame p-3 md:p-4 space-y-3">
              <div className="flex items-center gap-3 opacity-70">
                <Link to="/" className="font-tech text-[10px] uppercase tracking-[0.2em] text-ink/80 dark:text-paper/80 hover:text-ink dark:hover:text-paper transition-colors">KhaM</Link>
                <span className="font-tech text-[10px] text-ink/40 dark:text-paper/40">•</span>
                <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-paper/70">Cultural Memory Infrastructure</span>
                <div className="flex-1 border-t border-dashed border-ink/30 dark:border-paper/30" />
                <span className="font-tech text-[10px] uppercase tracking-[0.16em] text-ink/50 dark:text-paper/50">System Active</span>
              </div>

              <div className="pt-2 border-t border-dashed border-ink/20 dark:border-paper/20 flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
                {[
                  ["Voices", "/voices"],
                  ["Library", "/library"],
                  ["Roadmap", "/roadmap"],
                  ["Origin", "/#what-is-kham"],
                  ["Support", "/support"],
                  ["Research", "/research"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <Link
                    key={label}
                    to={href}
                    className="font-tech text-[11px] uppercase tracking-[0.12em] text-ink/70 dark:text-paper/70 hover:text-ink dark:hover:text-paper transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Hero aligned with body frame */}
            <div className="kham-frame overflow-hidden">
              <Hero />
            </div>

            {/* Content sections wrapped in consistent frame */}
            <div className="space-y-5">

            {/* What is KhaM */}
            <SystemPageFrame
              title="What is KhaM"
              subtitle="Named after the founder's parents: Khayer and Mamtaj. A vessel for memories, not metrics."
            >
              <div id="what-is-kham" className="space-y-5">
                <SystemSection
                  title="Origin"
                  description="How KhaM came to be."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/90 dark:text-paper/90">
                    KhaM means envelope. It's a container for stories never written down. Born out of personal grief
                    and the urgent need to preserve language before it fades, KhaM is more than a technical project.
                    It's an act of remembrance—a way to hold onto the voices that shaped us before they disappear forever.
                  </p>
                </SystemSection>

                <SystemSection
                  title="The Irreplaceable"
                  description="What we're protecting."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-paper/80">
                    Every dialect carries within it a universe of feeling—a way of seeing the world that cannot be
                    reduced to mere translation. We build not for efficiency, but for the irreplaceable.
                  </p>
                </SystemSection>
              </div>
            </SystemPageFrame>

            {/* Memory Infrastructure */}
            <SystemPageFrame
              title="Memory Infrastructure"
              subtitle="We're not just translating languages—we're encoding memory."
            >
              <div className="space-y-5">
                <SystemSection
                  title="Scope"
                  description="Languages and dialects in scope."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-paper/80">
                    KhaM is building cultural infrastructure that preserves not only words but the tones, pauses,
                    and emotional rhythms that make a language alive. We're starting with Bangla, Hindi, Urdu,
                    Tamil, Telugu, Punjabi, Gujarati, Marathi—and reaching into the dialects within, the ones
                    spoken between generations but never written down.
                  </p>
                </SystemSection>

                <SystemSection
                  title="Method"
                  description="How we work."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-paper/80">
                    Our work is about restoring nuance, honoring emotion, and creating open voice layers that
                    reflect real people—not just formal grammar. Every tool we build is slow-crafted, not rushed—
                    because we believe that speed can erase what silence once protected.
                  </p>
                  <blockquote className="mt-5 pl-4 border-l-2 border-terracotta/50 font-news text-lg md:text-xl text-ink/75 dark:text-paper/75 italic">
                    "This isn't translation—it's memory encoding."
                  </blockquote>
                </SystemSection>
              </div>
            </SystemPageFrame>

            {/* Who It's For */}
            <SystemPageFrame
              title="Who It's For"
              subtitle="Anyone who knows a voice is more than words."
            >
              <SystemSection
                title="Audience"
                description="Creators, linguists, builders, cultural workers."
              >
                <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-paper/80">
                  KhaM is for those who still care how things sound—creators who listen for cadence, not just content.
                  It's for linguists and researchers tracing the vanishing edges of oral cultures, where knowledge
                  lives in breath, not books. It's for AI builders who believe accuracy includes emotion, and for
                  cultural workers archiving what history forgot to write down.
                </p>
              </SystemSection>
            </SystemPageFrame>

            {/* Why This Matters */}
            <SystemPageFrame
              title="Why This Matters"
              subtitle="AI treats language like data. We treat it like culture."
            >
              <div className="space-y-5">
                <SystemSection
                  title="The Problem"
                  description="What current AI misses."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-paper/80">
                    Current AI treats language like data to process rather than culture to preserve. We're building
                    tools for efficiency, not tools for memory. But every older generation that passes takes with
                    them not just words, but ways of being. The pause before my grandmother says "accha," the
                    specific lilt when my aunt tells stories—these aren't just linguistic features. They're cultural DNA.
                  </p>
                </SystemSection>

                <SystemSection
                  title="The Vision"
                  description="What KhaM is building toward."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/70 dark:text-paper/70">
                    KhaM is about building for the irreplaceable. Imagine AI that doesn't just translate "I love you"
                    into Bengali, but knows the seventeen different ways Bengali expresses love—and which one your
                    mother would use when you're homesick.
                  </p>
                </SystemSection>
              </div>
            </SystemPageFrame>

            </div>

            {/* Footer aligned to same content width */}
            <footer className="kham-frame p-6 md:p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 opacity-70">
                  <div className="w-10 h-px bg-ink/60 dark:bg-paper/60" />
                  <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-paper/70">KhaM Labs</span>
                  <div className="flex-1 border-t border-dashed border-ink/30 dark:border-paper/30" />
                  <span className="font-tech text-[10px] uppercase tracking-[0.16em] text-ink/50 dark:text-paper/50">Archive Mode</span>
                </div>
                <blockquote className="font-news text-xl md:text-2xl text-ink/90 dark:text-paper/90 italic">
                  "KhaM is not a product.<br />It's a promise."
                </blockquote>
                <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-ink/55 dark:text-paper/55 pt-1">
                  © KhaM Labs · ripon@khamlabs.org
                </p>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;

