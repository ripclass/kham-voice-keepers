
import Navigation from "@/components/Navigation";

const Library = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navigation />
      
      <div className="pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl text-ink">
              Research & Resources
            </h1>
            <p className="text-lg md:text-xl font-light text-ink/80 max-w-2xl mx-auto">
              For linguists, developers, and anyone preserving the irreplaceable.
            </p>
          </div>

          {/* Open Papers & Research */}
          <section className="space-y-8">
            <h2 className="font-serif text-3xl text-ink">Essential Reading</h2>
            
            <div className="space-y-6">
              <div className="border-b border-ink/20 pb-6">
                <h3 className="text-xl font-medium text-ink mb-2">
                  "Emotion in South Asian Languages: Beyond Translation"
                </h3>
                <p className="font-light text-ink/70 mb-3">
                  A survey of emotional nuance that gets lost in current AI models.
                </p>
                <p className="text-sm text-terracotta italic">
                  Paper in progress • Expected publication: Q2 2025
                </p>
              </div>

              <div className="border-b border-ink/20 pb-6">
                <h3 className="text-xl font-medium text-ink mb-2">
                  <a href="https://www.ethnologue.com/" target="_blank" rel="noopener noreferrer" 
                     className="hover:text-terracotta transition-colors">
                    Ethnologue: Languages of the World →
                  </a>
                </h3>
                <p className="font-light text-ink/70">
                  Comprehensive reference for world languages and their endangered status.
                </p>
              </div>

              <div className="border-b border-ink/20 pb-6">
                <h3 className="text-xl font-medium text-ink mb-2">
                  <a href="https://en.wikipedia.org/wiki/Linguistic_landscape" target="_blank" rel="noopener noreferrer"
                     className="hover:text-terracotta transition-colors">
                    Language Landscape Research →
                  </a>
                </h3>
                <p className="font-light text-ink/70">
                  How languages exist in physical and digital spaces.
                </p>
              </div>
            </div>
          </section>

          {/* Glossary */}
          <section className="space-y-8">
            <h2 className="font-serif text-3xl text-ink">Key Terms</h2>
            
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

          {/* External Resources */}
          <section className="space-y-8">
            <h2 className="font-serif text-3xl text-ink">Community Resources</h2>
            
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

          {/* Future Resources */}
          <section className="space-y-6 border-t border-ink/20 pt-8">
            <h3 className="font-serif text-xl text-ink">Coming to this library</h3>
            <div className="space-y-3 text-lg font-light text-ink/70">
              <p>• Downloadable South Asian voice datasets</p>
              <p>• Interactive dialect mapping tool</p>
              <p>• Collaboration guidelines for ethical voice collection</p>
              <p>• Open-source emotional context models</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Library;
