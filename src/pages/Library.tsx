
import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet-async";

const Library = () => {
  return (
    <>
      <Helmet>
        <title>KhaM Library – Research, Resources, and Language Preservation Tools</title>
        <meta name="description" content="Explore research on emotional accuracy in AI, endangered language links, and community-contributed tools." />
        <meta name="keywords" content="research on South Asian languages, emotional accuracy in NLP, voice preservation in AI, cultural phonetics glossary, endangered language tools" />
        <meta property="og:title" content="KhaM Research Library – Cultural and AI Voice Tools" />
        <meta property="og:description" content="A living archive of references, glossaries, and open-source support for endangered dialects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org/library" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KhaM Library – Research, Resources, and Language Preservation Tools" />
        <meta name="twitter:description" content="Explore research on emotional accuracy in AI, endangered language links, and community-contributed tools." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <link rel="canonical" href="https://khamlabs.org/library" />
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Navigation />
        
        <main className="pt-24 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Header */}
            <header className="text-center space-y-6">
              <h1 className="font-serif text-4xl md:text-6xl text-ink">
                Research & Resources
              </h1>
              <p className="text-lg md:text-xl font-light text-ink/80 max-w-2xl mx-auto">
                For linguists, developers, and anyone preserving the irreplaceable.
              </p>
            </header>

            {/* Essential Reading */}
            <section className="space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">Essential Reading</h2>
              
              <div className="space-y-6">
                <article className="border-b border-ink/20 pb-6">
                  <h3 className="text-xl font-medium text-ink mb-2">
                    "Emotion in South Asian Languages: Beyond Translation"
                  </h3>
                  <p className="font-light text-ink/70 mb-3">
                    A survey of emotional nuance that gets lost in current AI models.
                  </p>
                  <p className="text-sm text-terracotta italic">
                    Paper in progress • Expected publication: Q2 2025
                  </p>
                </article>

                <article className="border-b border-ink/20 pb-6">
                  <h3 className="text-xl font-medium text-ink mb-2">
                    <a href="https://www.ethnologue.com/" target="_blank" rel="noopener noreferrer" 
                       className="hover:text-terracotta transition-colors">
                      Ethnologue: Languages of the World →
                    </a>
                  </h3>
                  <p className="font-light text-ink/70">
                    Comprehensive reference for world languages and their endangered status.
                  </p>
                </article>

                <article className="border-b border-ink/20 pb-6">
                  <h3 className="text-xl font-medium text-ink mb-2">
                    <a href="https://en.wikipedia.org/wiki/Linguistic_landscape" target="_blank" rel="noopener noreferrer"
                       className="hover:text-terracotta transition-colors">
                      Language Landscape Research →
                    </a>
                  </h3>
                  <p className="font-light text-ink/70">
                    How languages exist in physical and digital spaces.
                  </p>
                </article>
              </div>
            </section>

            {/* Key Terms */}
            <section className="space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">Key Terms</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-ink">Dialect Drift</h3>
                    <p className="font-light text-ink/70 text-sm">
                      The gradual change in how a dialect is spoken across generations, 
                      often accelerated by digital communication.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-ink">Emotional Accuracy</h3>
                    <p className="font-light text-ink/70 text-sm">
                      The preservation of feeling and cultural context in language, 
                      beyond literal translation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-ink">Voice Layers</h3>
                    <p className="font-light text-ink/70 text-sm">
                      Local language models that can be overlaid on existing AI 
                      to add cultural and emotional context.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-ink">Memory Encoding</h3>
                    <p className="font-light text-ink/70 text-sm">
                      The process of preserving not just words, but the way they're 
                      said, the pauses, the emotional weight.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-ink">Cultural Phonetics</h3>
                    <p className="font-light text-ink/70 text-sm">
                      How sound patterns carry cultural meaning beyond their 
                      linguistic definition.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-ink">Oral Archive</h3>
                    <p className="font-light text-ink/70 text-sm">
                      A collection of spoken language that preserves context, 
                      emotion, and cultural significance.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Community Resources */}
            <section className="space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">Community Resources</h2>
              
              <div className="space-y-4">
                <div className="bg-muted/20 p-6 space-y-3">
                  <h3 className="text-lg font-medium text-ink">
                    <a href="https://mozilla.foundation/" target="_blank" rel="noopener noreferrer"
                       className="hover:text-terracotta transition-colors">
                      Mozilla Common Voice →
                    </a>
                  </h3>
                  <p className="font-light text-ink/70 text-sm">
                    Open source voice collection for underrepresented languages.
                  </p>
                </div>

                <div className="bg-muted/20 p-6 space-y-3">
                  <h3 className="text-lg font-medium text-ink">
                    <a href="https://www.endangeredlanguages.com/" target="_blank" rel="noopener noreferrer"
                       className="hover:text-terracotta transition-colors">
                      Endangered Languages Project →
                    </a>
                  </h3>
                  <p className="font-light text-ink/70 text-sm">
                    Google's collaborative effort to preserve endangered languages worldwide.
                  </p>
                </div>
              </div>
            </section>

            {/* Coming to This Library */}
            <section className="space-y-6 border-t border-ink/20 pt-8">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">Coming to This Library</h2>
              <div className="space-y-3 text-lg font-light text-ink/70">
                <p>• Downloadable South Asian voice datasets</p>
                <p>• Interactive dialect mapping tool</p>
                <p>• Collaboration guidelines for ethical voice collection</p>
                <p>• Open-source emotional context models</p>
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

export default Library;
