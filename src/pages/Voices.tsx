
import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet-async";

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

      <div className="min-h-screen bg-paper text-ink">
        <Navigation />
        
        <main className="pt-24 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Header */}
            <header className="text-center space-y-6">
              <h1 className="font-serif text-4xl md:text-6xl text-ink">
                What We're Trying to Save
              </h1>
              <p className="text-lg md:text-xl font-light text-ink/80 max-w-2xl mx-auto">
                These are the voices that shaped us. Each one carries a universe of feeling.
              </p>
            </header>

            {/* Coming Soon Note */}
            <div className="text-center space-y-6 py-16 border border-ink/20 bg-muted/10">
              <h2 className="font-serif text-2xl text-ink/70">
                Voice samples coming soon
              </h2>
              <p className="text-lg font-light text-ink/60 max-w-2xl mx-auto">
                We're currently gathering recordings with full consent and cultural sensitivity. 
                Each voice will be presented with context, story, and respect.
              </p>
            </div>

            {/* What You'll Hear */}
            <section className="space-y-12">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                What You'll Hear
              </h2>
              
              <div className="space-y-8">
                <div className="border-l-4 border-terracotta pl-6 space-y-3">
                  <h3 className="text-xl font-medium text-ink">Bangla dialects from Sylhet</h3>
                  <p className="font-light text-ink/80">
                    "This is how my grandmother used to speak when she told stories 
                    about crossing the river during partition."
                  </p>
                  <p className="text-sm font-light text-ink/60 italic">
                    Recording planned: Winter 2024
                  </p>
                </div>

                <div className="border-l-4 border-dusty pl-6 space-y-3">
                  <h3 className="text-xl font-medium text-ink">Hindi with Punjabi influence</h3>
                  <p className="font-light text-ink/80">
                    "The way my father says 'beta' carries three generations of love. 
                    No AI has learned to hold that weight yet."
                  </p>
                  <p className="text-sm font-light text-ink/60 italic">
                    Recording planned: Spring 2025
                  </p>
                </div>

                <div className="border-l-4 border-terracotta pl-6 space-y-3">
                  <h3 className="text-xl font-medium text-ink">Urdu poetry recitation</h3>
                  <p className="font-light text-ink/80">
                    "When she recites Ghalib, each ghazal becomes a prayer. 
                    The pauses between words matter as much as the words themselves."
                  </p>
                  <p className="text-sm font-light text-ink/60 italic">
                    Recording planned: Summer 2025
                  </p>
                </div>
              </div>
            </section>

            {/* Sample Projects in Progress */}
            <section className="space-y-8 bg-muted/10 p-8">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">Sample Projects in Progress</h2>
              <div className="space-y-6 text-lg font-light text-ink/80">
                <p>
                  <strong>Emotional Speech AI for Bengali:</strong> Training models to understand 
                  the seventeen different ways Bengali expresses love.
                </p>
                <p>
                  <strong>Dialect Mapping Tool:</strong> Interactive archive showing how 
                  pronunciation changes across South Asian regions.
                </p>
                <p>
                  <strong>Cultural Context Models:</strong> AI that knows which tone your 
                  mother would use when you're homesick.
                </p>
              </div>
            </section>

            {/* Our Commitment to Voice Consent */}
            <section className="space-y-6 bg-muted/20 p-8">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">Our Commitment to Voice Consent</h2>
              <div className="space-y-4 text-lg font-light text-ink/80">
                <p>
                  Every voice recording is gathered with full informed consent.
                </p>
                <p>
                  Contributors maintain ownership of their voices and stories.
                </p>
                <p>
                  We work with community elders and cultural advisors to ensure 
                  respectful representation.
                </p>
                <p className="text-ink/70 italic">
                  This isn't data extraction. It's cultural collaboration.
                </p>
              </div>
            </section>

          </div>
        </main>

        {/* Footer */}
        <footer className="w-full bg-ink py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <blockquote className="font-serif text-2xl md:text-3xl text-paper/90 mb-8">
              "KhaM is not a product.<br />It's a promise."
            </blockquote>
            
            <p className="text-paper/70 font-light">
              © KhaM Labs · ripon@khamlabs.org
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Voices;
