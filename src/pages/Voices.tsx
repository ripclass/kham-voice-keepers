
import Navigation from "@/components/Navigation";

const Voices = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navigation />
      
      <div className="pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl text-ink">
              What we're trying to save
            </h1>
            <p className="text-lg md:text-xl font-light text-ink/80 max-w-2xl mx-auto">
              These are the voices that shaped us. Each one carries a universe of feeling.
            </p>
          </div>

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

          {/* Preview of what's coming */}
          <section className="space-y-12">
            <h2 className="font-serif text-3xl text-ink text-center">
              What you'll hear here
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

          {/* Consent and ethics note */}
          <section className="space-y-6 bg-muted/20 p-8">
            <h3 className="font-serif text-xl text-ink">Our commitment</h3>
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
      </div>

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
  );
};

export default Voices;
