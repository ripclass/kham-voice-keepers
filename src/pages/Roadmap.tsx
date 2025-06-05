import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet-async";

const Roadmap = () => {
  return (
    <>
      <Helmet>
        <title>Roadmap – Now, Next, Later for KhaM</title>
        <meta name="description" content="Our timeline for preserving disappearing voices in AI. This isn't a sprint - it's a memory marathon." />
        <meta property="og:title" content="Roadmap – Now, Next, Later for KhaM" />
        <meta property="og:description" content="Our timeline for preserving disappearing voices in AI. This isn't a sprint - it's a memory marathon." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org/roadmap" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Roadmap – Now, Next, Later for KhaM" />
        <meta name="twitter:description" content="Our timeline for preserving disappearing voices in AI. This isn't a sprint - it's a memory marathon." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <link rel="canonical" href="https://khamlabs.org/roadmap" />
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Navigation />
        
        <div className="pt-24 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Header */}
            <div className="text-center space-y-6">
              <h1 className="font-serif text-4xl md:text-6xl text-ink">
                Now, Next, Later
              </h1>
              <p className="text-lg md:text-xl font-light text-ink/80 max-w-2xl mx-auto">
                This isn't a sprint. This is a memory marathon.
              </p>
            </div>

            {/* Now - In Progress */}
            <section className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-dusty rounded-full"></div>
                <h2 className="font-serif text-3xl text-ink">Now</h2>
              </div>
              
              <div className="pl-7 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-dusty text-2xl mt-1">✓</div>
                  <div>
                    <h3 className="text-xl font-medium text-ink">Foundation work</h3>
                    <p className="font-light text-ink/70">
                      Building the basic infrastructure and gathering initial research.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-dusty text-2xl mt-1">⟳</div>
                  <div>
                    <h3 className="text-xl font-medium text-ink">Register organization</h3>
                    <p className="font-light text-ink/70">
                      Making KhaM official so we can accept larger contributions and grants.
                    </p>
                    <p className="text-sm text-dusty italic mt-1">In progress • $500 needed</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-dusty text-2xl mt-1">⟳</div>
                  <div>
                    <h3 className="text-xl font-medium text-ink">Community partnerships</h3>
                    <p className="font-light text-ink/70">
                      Connecting with linguists, cultural centers, and community elders.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Next - Coming Soon */}
            <section className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-terracotta rounded-full"></div>
                <h2 className="font-serif text-3xl text-ink">Next</h2>
              </div>
              
              <div className="pl-7 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-terracotta text-2xl mt-1">🔜</div>
                  <div>
                    <h3 className="text-xl font-medium text-ink">Fine-tune an open-source voice model for Bangla</h3>
                    <p className="font-light text-ink/70">
                      Starting with my mother tongue to prove the idea works—preserving not just the words, but the warmth, rhythm, and emotional weight of how we actually speak.
                    </p>
                    <p className="text-sm text-terracotta italic mt-1">Q1 2025</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-terracotta text-2xl mt-1">🔜</div>
                  <div>
                    <h3 className="text-xl font-medium text-ink">Gather anonymized voice data</h3>
                    <p className="font-light text-ink/70">
                      Working with communities to record emotional context and dialect variations.
                    </p>
                    <p className="text-sm text-terracotta italic mt-1">Q2 2025</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-terracotta text-2xl mt-1">🔜</div>
                  <div>
                    <h3 className="text-xl font-medium text-ink">Emotion mapping research</h3>
                    <p className="font-light text-ink/70">
                      Document how different dialects express feelings differently.
                    </p>
                    <p className="text-sm text-terracotta italic mt-1">Ongoing through 2025</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-terracotta text-2xl mt-1">🔜</div>
                  <div>
                    <h3 className="text-xl font-medium text-ink">Open dataset release</h3>
                    <p className="font-light text-ink/70">
                      Share our work with the global AI community, with full attribution.
                    </p>
                    <p className="text-sm text-terracotta italic mt-1">Q3 2025</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Later - Long-term Vision */}
            <section className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-ink/30 rounded-full"></div>
                <h2 className="font-serif text-3xl text-ink">Later</h2>
              </div>
              
              <div className="pl-7 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-ink/50 text-2xl mt-1">🕯️</div>
                  <div>
                    <h3 className="text-xl font-medium text-ink">Open South Asian LLM layer</h3>
                    <p className="font-light text-ink/70">
                      A language model that understands cultural context, not just words.
                    </p>
                    <p className="text-sm text-ink/50 italic mt-1">2026-2027</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-ink/50 text-2xl mt-1">🕯️</div>
                  <div>
                    <h3 className="text-xl font-medium text-ink">Voice synthesis with emotional accuracy</h3>
                    <p className="font-light text-ink/70">
                      AI that can speak like your grandmother, not just translate her words.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-ink/50 text-2xl mt-1">🕯️</div>
                  <div>
                    <h3 className="text-xl font-medium text-ink">Community archives</h3>
                    <p className="font-light text-ink/70">
                      Tools for families to preserve their own voices and stories.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-ink/50 text-2xl mt-1">🕯️</div>
                  <div>
                    <h3 className="text-xl font-medium text-ink">Global expansion</h3>
                    <p className="font-light text-ink/70">
                      Extend beyond South Asia to preserve disappearing voices worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Philosophy */}
            <section className="space-y-6 bg-muted/20 p-8 text-center">
              <blockquote className="font-serif text-2xl md:text-3xl text-ink italic">
                "We're not racing to market.<br />We're racing against time."
              </blockquote>
              <p className="text-lg font-light text-ink/70">
                Every day, voices disappear. Every day, we get a little closer to saving them.
              </p>
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
    </>
  );
};

export default Roadmap;
