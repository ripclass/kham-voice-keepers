import SystemHeaderNav from "@/components/system/SystemHeaderNav";
import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/ui/animated-hero";
import SystemPageFrame from "@/components/system/SystemPageFrame";
import SystemSection from "@/components/system/SystemSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>KhaM – Cultural Memory Infrastructure for South Asia</title>
        <meta name="description" content="KhaM is building cultural memory infrastructure for South Asian languages—preserving dialect, tone, and emotional nuance before they vanish from both memory and machine." />
        <meta property="og:title" content="KhaM – Cultural Memory Infrastructure for South Asia" />
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

      <div className="min-h-screen bg-paper text-ink dark:bg-background dark:text-foreground">
        <SystemHeaderNav />

        <main className="pt-8 pb-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-5">
            {/* ASCII-style module strip aligned to content frame */}
            <div className="kham-frame p-3 md:p-4">
              <div className="flex items-center gap-3 opacity-70">
                <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-foreground/90">Cultural Memory Infrastructure</span>
                <div className="flex-1 border-t border-dashed border-ink/30 dark:border-border" />
                <span className="font-tech text-[10px] uppercase tracking-[0.16em] text-ink/50 dark:text-foreground/75">System Active</span>
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
              subtitle="Named after Khayer and Mamtaj. A vessel for memory, not metrics."
            >
              <div id="what-is-kham" className="space-y-5">
                <SystemSection
                  title="Origin"
                  description="How KhaM came to be."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/90 dark:text-foreground/90">
                    KhaM means envelope—a place where memory is kept safe. What began as personal grief became
                    a public mission: preserving the voices, dialects, and emotional registers that formal language
                    systems often ignore. KhaM is not only a technical initiative. It is an act of continuity.
                  </p>
                </SystemSection>

                <SystemSection
                  title="The Irreplaceable"
                  description="What we're protecting."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    A dialect is never just vocabulary. It carries intimacy, humor, hierarchy, grief, and care.
                    When AI flattens language into neutral text, it erases cultural intelligence. KhaM exists
                    to protect what translation alone cannot hold.
                  </p>
                </SystemSection>
              </div>
            </SystemPageFrame>

            {/* Memory Infrastructure */}
            <SystemPageFrame
              title="Memory Infrastructure"
              subtitle="We are not only translating language. We are encoding memory."
            >
              <div className="space-y-5">
                <SystemSection
                  title="Scope"
                  description="Languages and dialects in scope."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    KhaM is building open infrastructure for culturally aware AI across South Asia—starting with
                    Bangla, Hindi, Urdu, Tamil, Telugu, Punjabi, Gujarati, and Marathi, including regional dialects
                    often excluded from mainstream systems.
                  </p>
                </SystemSection>

                <SystemSection
                  title="Method"
                  description="How we work."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    Our approach combines dialect documentation, emotional speech patterns, and context-aware voice
                    modeling. We prioritize fidelity over speed, and community consent over extraction—so the
                    resulting systems reflect real people, not generic language averages.
                  </p>
                  <blockquote className="mt-5 pl-4 border-l-2 border-terracotta/50 font-news text-lg md:text-xl text-ink/75 dark:text-foreground/90 italic">
                    "This isn't translation—it's memory encoding."
                  </blockquote>
                </SystemSection>
              </div>
            </SystemPageFrame>

            {/* Who It's For */}
            <SystemPageFrame
              title="Who It's For"
              subtitle="For people who know language is more than text."
            >
              <SystemSection
                title="Audience"
                description="Creators, linguists, builders, cultural workers."
              >
                <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                  KhaM is built for creators, linguists, researchers, AI teams, and cultural archivists working at
                  the edge of language and identity. It serves those who care about cadence, context, and emotional
                  truth—and who believe future AI should represent how communities actually speak and feel.
                </p>
              </SystemSection>
            </SystemPageFrame>

            {/* Why This Matters */}
            <SystemPageFrame
              title="Why This Matters"
              subtitle="If language is infrastructure, erasure is technical debt."
            >
              <div className="space-y-5">
                <SystemSection
                  title="The Problem"
                  description="What current AI misses."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    Most AI systems are optimized for dominant language standards, not lived linguistic diversity.
                    That gap affects representation, trust, and whose voice remains legible in the future. When
                    dialects are excluded from training data, cultures are excluded from capability.
                  </p>
                </SystemSection>

                <SystemSection
                  title="The Vision"
                  description="What KhaM is building toward."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/70 dark:text-foreground/90">
                    KhaM aims to make South Asian language intelligence culturally grounded, technically usable,
                    and openly extensible. The goal is not only better outputs. The goal is continuity: preserving
                    how meaning, emotion, and belonging are actually expressed.
                  </p>
                </SystemSection>
              </div>
            </SystemPageFrame>

            </div>

            {/* Footer aligned to same content width */}
            <footer className="kham-frame p-6 md:p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 opacity-70">
                  <div className="w-10 h-px bg-ink/60 dark:bg-foreground/50" />
                  <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-foreground/90">KhaM Labs</span>
                  <div className="flex-1 border-t border-dashed border-ink/30 dark:border-border" />
                  <span className="font-tech text-[10px] uppercase tracking-[0.16em] text-ink/50 dark:text-foreground/75">Archive Mode</span>
                </div>
                <blockquote className="font-news text-xl md:text-2xl text-ink/90 dark:text-foreground/90 italic">
                  "KhaM is not a product.<br />It's a promise."
                </blockquote>
                <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-ink/55 dark:text-foreground/80 pt-1">
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




