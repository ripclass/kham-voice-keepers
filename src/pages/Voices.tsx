import SystemHeaderNav from "@/components/system/SystemHeaderNav";
import { Helmet } from "react-helmet-async";
import SystemPageFrame from "@/components/system/SystemPageFrame";
import SystemSection from "@/components/system/SystemSection";

const Voices = () => {
  return (
    <>
      <Helmet>
        <title>Voices We're Saving – South Asian Dialects & Emotional Speech Archive</title>
        <meta name="description" content="A preview of the disappearing voices KhaM is preserving. Emotional nuance, consent, and context first." />
        <meta name="keywords" content="voice archive South Asia, Bangla dialect samples, ethical voice dataset, emotional speech in AI, AI for language preservation" />
        <meta property="og:title" content="Voices from South Asia – The Archive in Progress" />
        <meta property="og:description" content="Hear the emotional resonance of Bangla, Urdu, Hindi, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org/voices" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Voices We're Saving – South Asian Dialects & Emotional Speech Archive" />
        <meta name="twitter:description" content="A preview of the disappearing voices KhaM is preserving. Emotional nuance, consent, and context first." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <link rel="canonical" href="https://khamlabs.org/voices" />
      </Helmet>

      <div className="min-h-screen bg-paper text-ink dark:bg-background dark:text-paper">
        <SystemHeaderNav />

        <main className="pt-8 pb-20 px-4 md:px-6">
          {/* Module identity strip */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="flex items-center gap-3 opacity-60">
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-paper/70">KhaM</span>
              <span className="font-tech text-[10px] text-ink/40 dark:text-paper/40">•</span>
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-paper/70">Voice Archive</span>
              <div className="flex-1 border-t border-dashed border-ink/30 dark:border-paper/30" />
              <span className="font-tech text-[10px] uppercase tracking-[0.16em] text-ink/50 dark:text-paper/50">In Progress</span>
            </div>
          </div>

          {/* Main content */}
          <div className="max-w-4xl mx-auto space-y-5">

            {/* Page header frame */}
            <SystemPageFrame
              title="What We're Trying to Save"
              subtitle="Each voice carries a universe of feeling. These are the ones that shaped us."
            >
              {/* Coming Soon Notice */}
              <div className="border border-dashed border-ink/25 dark:border-paper/25 p-5 text-center space-y-3 bg-muted/10 dark:bg-muted/5">
                <p className="font-tech text-[11px] uppercase tracking-[0.16em] text-ink/60 dark:text-paper/60">
                  Status: Recordings Pending
                </p>
                <p className="font-display text-base text-ink/70 dark:text-paper/70 max-w-2xl mx-auto">
                  We're currently gathering recordings with full consent and cultural sensitivity.
                  Each voice will be presented with context, story, and respect.
                </p>
              </div>
            </SystemPageFrame>

            {/* What You'll Hear */}
            <SystemSection
              title="What You'll Hear"
              description="Planned recordings — context-first, consent-first."
            >
              <div className="space-y-5 pt-1">

                <div className="border-l-2 border-terracotta/50 pl-5 space-y-2">
                  <h3 className="font-tech text-sm uppercase tracking-[0.1em] text-ink dark:text-paper">
                    Bangla dialects from Sylhet
                  </h3>
                  <p className="font-display text-base leading-relaxed text-ink/80 dark:text-paper/80">
                    "This is how my grandmother used to speak when she told stories
                    about crossing the river during partition."
                  </p>
                  <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-ink/45 dark:text-paper/45">
                    Recording planned: Winter 2024
                  </p>
                </div>

                <div className="border-t border-dashed border-ink/15 dark:border-paper/15" />

                <div className="border-l-2 border-dusty/50 pl-5 space-y-2">
                  <h3 className="font-tech text-sm uppercase tracking-[0.1em] text-ink dark:text-paper">
                    Hindi with Punjabi influence
                  </h3>
                  <p className="font-display text-base leading-relaxed text-ink/80 dark:text-paper/80">
                    "The way my father says 'beta' carries three generations of love.
                    No AI has learned to hold that weight yet."
                  </p>
                  <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-ink/45 dark:text-paper/45">
                    Recording planned: Spring 2025
                  </p>
                </div>

                <div className="border-t border-dashed border-ink/15 dark:border-paper/15" />

                <div className="border-l-2 border-terracotta/50 pl-5 space-y-2">
                  <h3 className="font-tech text-sm uppercase tracking-[0.1em] text-ink dark:text-paper">
                    Urdu poetry recitation
                  </h3>
                  <p className="font-display text-base leading-relaxed text-ink/80 dark:text-paper/80">
                    "When she recites Ghalib, each ghazal becomes a prayer.
                    The pauses between words matter as much as the words themselves."
                  </p>
                  <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-ink/45 dark:text-paper/45">
                    Recording planned: Summer 2025
                  </p>
                </div>

              </div>
            </SystemSection>

            {/* Sample Projects in Progress */}
            <SystemSection
              title="Sample Projects in Progress"
              description="Active work happening in the archive pipeline."
            >
              <div className="space-y-4 pt-1">
                <div className="p-4 border border-dashed border-ink/20 dark:border-paper/20 space-y-1">
                  <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-ink/70 dark:text-paper/70">
                    Emotional Speech AI · Bengali
                  </p>
                  <p className="font-display text-base text-ink/80 dark:text-paper/80">
                    Training models to understand the seventeen different ways Bengali expresses love.
                  </p>
                </div>
                <div className="p-4 border border-dashed border-ink/20 dark:border-paper/20 space-y-1">
                  <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-ink/70 dark:text-paper/70">
                    Dialect Mapping Tool
                  </p>
                  <p className="font-display text-base text-ink/80 dark:text-paper/80">
                    Interactive archive showing how pronunciation changes across South Asian regions.
                  </p>
                </div>
                <div className="p-4 border border-dashed border-ink/20 dark:border-paper/20 space-y-1">
                  <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-ink/70 dark:text-paper/70">
                    Cultural Context Models
                  </p>
                  <p className="font-display text-base text-ink/80 dark:text-paper/80">
                    AI that knows which tone your mother would use when you're homesick.
                  </p>
                </div>
              </div>
            </SystemSection>

            {/* Consent Commitment */}
            <SystemSection
              title="Our Commitment to Voice Consent"
              description="Ethical foundation for every recording in the archive."
            >
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <span className="font-tech text-[10px] mt-1 text-ink/40 dark:text-paper/40 select-none">01</span>
                  <p className="font-display text-base text-ink/80 dark:text-paper/80">
                    Every voice recording is gathered with full informed consent.
                  </p>
                </div>
                <div className="border-t border-dashed border-ink/10 dark:border-paper/10" />
                <div className="flex items-start gap-3">
                  <span className="font-tech text-[10px] mt-1 text-ink/40 dark:text-paper/40 select-none">02</span>
                  <p className="font-display text-base text-ink/80 dark:text-paper/80">
                    Contributors maintain ownership of their voices and stories.
                  </p>
                </div>
                <div className="border-t border-dashed border-ink/10 dark:border-paper/10" />
                <div className="flex items-start gap-3">
                  <span className="font-tech text-[10px] mt-1 text-ink/40 dark:text-paper/40 select-none">03</span>
                  <p className="font-display text-base text-ink/80 dark:text-paper/80">
                    We work with community elders and cultural advisors to ensure respectful representation.
                  </p>
                </div>
                <blockquote className="mt-4 pl-4 border-l-2 border-terracotta/50 font-news text-base text-ink/65 dark:text-paper/65 italic">
                  "This isn't data extraction. It's cultural collaboration."
                </blockquote>
              </div>
            </SystemSection>

          </div>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-ink/20 dark:border-paper/20 bg-ink dark:bg-background py-12 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-3 opacity-60 mb-4">
              <div className="w-10 h-px bg-paper/60" />
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-paper/70">KhaM Labs · Voice Archive</span>
              <div className="flex-1 border-t border-dashed border-paper/30" />
            </div>
            <blockquote className="font-news text-xl md:text-2xl text-paper/90 italic">
              "KhaM is not a product.<br />It's a promise."
            </blockquote>
            <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-paper/50 pt-2">
              © KhaM Labs · ripon@khamlabs.org
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Voices;
