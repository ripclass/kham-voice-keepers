import SystemHeaderNav from "@/components/system/SystemHeaderNav";
import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/ui/animated-hero";
import SystemPageFrame from "@/components/system/SystemPageFrame";
import SystemSection from "@/components/system/SystemSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>KhaM - Sovereign AI for South Asia</title>
        <meta name="description" content="The languages of South Asia are not just multilingual - they are emotionally polyphonic. KhaM is building the cultural infrastructure to preserve them in AI before they disappear from both memory and machine." />
        <meta property="og:title" content="KhaM - Sovereign AI for South Asia" />
        <meta property="og:description" content="Protecting endangered voices and emotional nuance in South Asian languages through open-source tools and care." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KhaM - Preserving Disappearing Voices in AI from South Asia" />
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
              subtitle="Named after my parents - Khayer and Mamtaj. A vessel for memory, not metrics."
            >
              <div id="what-is-kham" className="space-y-5">
                <SystemSection
                  title="Origin"
                  description="How KhaM came to be."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/90 dark:text-foreground/90">
                    I grew up in Chittagong. The language I spoke at home - Chatgayaan - wasn't considered real.
                    No script. No prestige. So we were taught to hide it. To speak proper Bangla. To translate
                    ourselves into acceptability.
                  </p>
                </SystemSection>

                <SystemSection
                  title="The Irreplaceable"
                  description="What we're protecting."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    But Chatgayaan was how my mother loved me. It was how neighbors joked, how elders prayed,
                    how loss and joy were carried in voice - not grammar.
                  </p>
                </SystemSection>
              </div>
            </SystemPageFrame>

            {/* The Argument */}
            <SystemPageFrame
              title="The Argument"
              subtitle="Who controls a language in AI controls its future."
            >
              <div className="space-y-5">
                <SystemSection
                  title="Core Position"
                  description="Why this is a sovereignty issue."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    Right now, the languages of South Asia — spoken by over 1.8 billion people — are being processed by AI systems built in the West, trained on Western data, and optimized for Western emotional registers.
                  </p>
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95 mt-4">
                    This is not a translation problem. It is a sovereignty problem. When Bengali is processed by a model that has never understood the seventeen ways it expresses love, something irreplaceable is lost. When Sylheti, Chittagonian, Rangpuri disappear from the training data, they disappear from the future.
                  </p>
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95 mt-4">
                    KhaM is building the open cultural infrastructure that changes this — starting with the dialects, tones, and emotional registers that no current AI can hold.
                  </p>
                </SystemSection>

                <SystemSection
                  title="Signal Metrics"
                  description="Scale and urgency."
                >
                  <ul className="space-y-3">
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95"><span className="font-tech text-terracotta">1.8B</span> — South Asian language speakers globally</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95"><span className="font-tech text-terracotta">~12</span> — Major dialects KhaM is actively documenting</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95"><span className="font-tech text-terracotta">17</span> — Ways Bengali expresses love — invisible to current AI</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95"><span className="font-tech text-terracotta">0</span> — Open emotional speech datasets for South Asian dialects — until now</li>
                  </ul>
                </SystemSection>
              </div>
            </SystemPageFrame>

            {/* Who It's For */}
            <SystemPageFrame
              title="Who It's For"
              subtitle="Early-stage, open-source, and actively looking for people who feel the same urgency."
            >
              <SystemSection
                title="Audience"
                description="Creators, linguists, builders, cultural workers."
              >
                <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                  KhaM is for people working at the edge of language and memory: linguistic experts in South Asian
                  languages, AI researchers, voice contributors, diaspora organizers, and institutions that care about
                  cultural continuity.
                </p>
              </SystemSection>
            </SystemPageFrame>

            {/* Why This Matters */}
            <SystemPageFrame
              title="Why This Matters"
              subtitle="Not translation tools. Memory tools."
            >
              <div className="space-y-5">
                <SystemSection
                  title="The Problem"
                  description="What current AI misses."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    KhaM is building open infrastructure for culturally-aware AI - starting with voice, emotion,
                    and dialect. Everything we create will be released openly so researchers, developers, and
                    communities can build on it.
                  </p>
                </SystemSection>

                <SystemSection
                  title="The Vision"
                  description="What KhaM is building toward."
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/70 dark:text-foreground/90">
                    These are not obscure languages. They are living tongues, spoken across millions of homes,
                    carried across oceans by diaspora communities, and almost entirely absent from AI systems being
                    built today. KhaM is documenting them - one dialect at a time.
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




