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

            {/* Founder / Origin */}
            <SystemPageFrame
              title="Founder"
              subtitle="Ripon · Builder · Filmmaker · Native Speaker"
            >
              <div className="space-y-5">
                <SystemSection
                  title="Profile"
                  description="Background"
                >
                  <ul className="space-y-2">
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Grew up in Chittagong, Bangladesh</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Native Chatgayaan and Bengali speaker</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Fluent in Hindi, Urdu, English</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Currently based in Dhaka</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Filmmaker and solo builder</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Self-taught coder</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">ripon@khamlabs.org</li>
                  </ul>
                </SystemSection>

                <SystemSection
                  title="Origin"
                  description="Why KhaM exists"
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    I grew up in Chittagong. The language I spoke at home — Chatgayaan — wasn't considered real. No script. No prestige. So we were taught to hide it. To speak proper Bangla. To translate ourselves into acceptability.
                  </p>
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95 mt-4">
                    But Chatgayaan was how my mother loved me. It was how neighbors joked, how elders prayed, how loss and joy were carried in voice — not grammar.
                  </p>
                  <blockquote className="mt-5 pl-4 border-l-2 border-terracotta/50 font-news text-lg md:text-xl text-ink/75 dark:text-foreground/90 italic">
                    "If we don't preserve this — not the dictionary, but the tone — we'll lose more than language. We'll lose the way we were loved."
                  </blockquote>
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95 mt-4">
                    I am a filmmaker, a writer, and a builder. I've made many things. None of them felt like home until KhaM. This project started as something personal — a realization that the AI systems being built today will shape which languages, dialects, and emotional registers survive into the future. And right now, ours are not in that conversation.
                  </p>
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95 mt-4">
                    KhaM is my attempt to change that. Open-source, community-led, built with care rather than speed. Named after my parents — Khayer and Mamtaj. A vessel for memory, not metrics.
                  </p>
                </SystemSection>
              </div>
            </SystemPageFrame>

            {/* What We Build */}
            <SystemPageFrame
              title="What We Build"
              subtitle="Not translation tools. Memory tools."
            >
              <div className="space-y-5">
                <SystemSection
                  title="Build Scope"
                  description="Open infrastructure"
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    KhaM is building open infrastructure for culturally-aware AI — starting with voice, emotion, and dialect. Everything we create will be released openly so researchers, developers, and communities can build on it.
                  </p>
                </SystemSection>

                <SystemSection title="01 Voice Archive" description="In progress">
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    A growing collection of South Asian dialects recorded with full consent, cultural context, and community participation. Each voice comes with a story, not just a waveform.
                  </p>
                </SystemSection>

                <SystemSection title="02 Emotional Speech Models" description="Building">
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    Open-source AI models trained to understand emotional nuance — the seventeen ways Bengali expresses love, the pause before an elder says your name, the lilt that carries grief.
                  </p>
                </SystemSection>

                <SystemSection title="03 Open Datasets" description="Coming soon">
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    Fully attributed, community-owned datasets released for any researcher, developer, or institution working on South Asian language AI. No extraction. Cultural collaboration.
                  </p>
                </SystemSection>
              </div>
            </SystemPageFrame>

            {/* The Dialect Map */}
            <SystemPageFrame
              title="The Dialect Map"
              subtitle="Tracking what AI has forgotten."
            >
              <div className="space-y-5">
                <SystemSection
                  title="Coverage"
                  description="Living tongues, underrepresented in AI"
                >
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    These are not obscure languages. They are living tongues, spoken across millions of homes, carried across oceans by diaspora communities, and almost entirely absent from the AI systems being built today. KhaM is documenting them — one dialect at a time.
                  </p>
                  <p className="mt-4">
                    <a href="#contact" className="font-tech text-[11px] uppercase tracking-[0.12em] text-terracotta hover:underline">Contribute a Voice →</a>
                  </p>
                </SystemSection>

                <SystemSection title="Dialect Status" description="Current tracking map">
                  <ul className="space-y-3">
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Sylheti — North-East Sylhet · Diaspora — In Fine-Tuning</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Chittagonian / Chatgaya — South-East Hills & Port — Recording</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Comilla — South-Eastern Plains — Recording</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Rangpuri / Bogra Cluster — Northern Belt — Recording</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Standard Bangla — National / Media — Baseline Ready</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Noakhali — Coastal South-East — Training</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Dhakaiya / Faridpuri — Central Urban Belt — Recording</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Barisali · Patna-Dinajpur · Khulnai — Multiple regions — Coming Soon</li>
                  </ul>
                </SystemSection>
              </div>
            </SystemPageFrame>

            {/* Get Involved */}
            <SystemPageFrame
              title="Get Involved"
              subtitle="Let's build this together."
            >
              <div className="space-y-5">
                <SystemSection title="Invitation" description="Join the mission">
                  <p className="font-display text-base md:text-lg leading-relaxed text-ink/80 dark:text-foreground/95">
                    KhaM is early-stage, open-source, and actively looking for people who feel the same urgency. We are one person with a clear vision and a growing community. If any of this resonates, write to us.
                  </p>
                  <p className="mt-4 font-tech text-sm md:text-base tracking-[0.08em] text-terracotta">ripon@khamlabs.org</p>
                </SystemSection>

                <SystemSection title="Ways to Contribute" description="Where you can help">
                  <ul className="space-y-3">
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Linguistic expertise in South Asian languages</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">AI research &amp; cultural preservation</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Voice contribution &amp; dialect recording</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Institutional partnership &amp; grants</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Diaspora community organizing</li>
                    <li className="font-display text-base md:text-lg leading-relaxed text-ink/85 dark:text-foreground/95">Just want to share your story</li>
                  </ul>
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





