
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Index = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navigation />
      
      {/* Hero Section */}
      <main>
        <section className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-20">
          <div className="max-w-4xl text-center space-y-8">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ink leading-tight">
              A Container for Disappearing Voices
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-ink/80">
              KhaM is an open-source initiative preserving forgotten dialects, lost tone, and emotional language in AI—beginning with South Asia.
            </p>
            <div className="pt-8">
              <Button 
                onClick={() => scrollToSection('what-is-kham')}
                className="bg-terracotta hover:bg-terracotta/90 text-paper px-8 py-3 text-lg rounded-none border-0 font-light"
                aria-label="Learn more about KhaM's mission"
              >
                Learn More →
              </Button>
            </div>
          </div>
        </section>

        {/* What is KhaM */}
        <section id="what-is-kham" className="py-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-ink mb-12 text-center">
              What is KhaM
            </h2>
            <div className="space-y-8">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-ink/90">
                KhaM means envelope—named after the founder's parents: Khayer and Mamtaj. It's a vessel for memories, not metrics. A container for stories never written down.
              </p>
              <p className="text-lg md:text-xl font-light leading-relaxed text-ink/80">
                Born out of personal grief and the urgent need to preserve language before it fades, KhaM is more than a technical project. It's an act of remembrance, a way to hold onto the voices that shaped us before they disappear forever.
              </p>
              <p className="text-lg md:text-xl font-light leading-relaxed text-ink/70">
                Every dialect carries within it a universe of feeling, a way of seeing the world that cannot be reduced to mere translation. We build not for efficiency, but for the irreplaceable.
              </p>
            </div>
          </div>
        </section>

        {/* Memory Infrastructure */}
        <section className="py-20 px-6 md:px-12 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-ink mb-16 text-center">
              We're Building Memory Infrastructure
            </h2>
            
            <div className="border-l-2 border-terracotta/30 pl-8 md:pl-12">
              <p className="text-lg md:text-xl font-light leading-relaxed text-ink/80">
                We're not just translating languages—we're encoding memory. KhaM is building cultural infrastructure that preserves not only words but the tones, pauses, and emotional rhythms that make a language alive. We're starting with Bangla, Hindi, Urdu, Tamil, Telugu, Punjabi, Gujarati, Marathi—and reaching into the dialects within, the ones spoken between generations but never written down. Our work is about restoring nuance, honoring emotion, and creating open voice layers that reflect real people—not just formal grammar. Every tool we build is slow-crafted, not rushed—because we believe that speed can erase what silence once protected.
              </p>
            </div>
            
            <div className="mt-16 text-center">
              <blockquote className="font-serif text-2xl md:text-3xl text-ink italic">
                "This isn't translation—it's memory encoding."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-ink mb-16 text-center">
              Who It's For
            </h2>
            
            <div className="space-y-8">
              <p className="text-lg md:text-xl font-light leading-relaxed text-ink/80">
                KhaM is for those who still care how things sound—creators who listen for cadence, not just content. It's for linguists and researchers tracing the vanishing edges of oral cultures, where knowledge lives in breath, not books. It's for AI builders who believe accuracy includes emotion, and for cultural workers archiving what history forgot to write down. KhaM is for anyone who knows a voice is more than words—it's memory, identity, and the echo of those who came before.
              </p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-20 px-6 md:px-12 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-ink mb-16 text-center">
              Why This Matters
            </h2>
            
            <div className="space-y-8">
              <p className="text-lg md:text-xl font-light leading-relaxed text-ink/80">
                Current AI treats language like data to process rather than culture to preserve. We're building tools for efficiency, not tools for memory. But every older generation that passes takes with them not just words, but ways of being. The pause before my grandmother says "accha," the specific lilt when my aunt tells stories—these aren't just linguistic features. They're cultural DNA.
              </p>
              <p className="text-lg md:text-xl font-light leading-relaxed text-ink/70">
                KhaM is about building for the irreplaceable. Imagine AI that doesn't just translate "I love you" into Bengali, but knows the seventeen different ways Bengali expresses love, and which one your mother would use when you're homesick.
              </p>
            </div>
          </div>
        </section>
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
  );
};

export default Index;
