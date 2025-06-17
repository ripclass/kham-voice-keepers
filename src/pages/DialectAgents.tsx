import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DialectAgents = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Building Dialect-Aware Voice Agents",
    "author": {
      "@type": "Organization",
      "name": "KhaM Labs",
      "url": "https://khamlabs.org"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KhaM Labs",
      "url": "https://khamlabs.org"
    },
    "datePublished": "2025-06-17",
    "description": "Technical note on KhaM's approach to building dialect-aware voice agents for South Asian languages and dialects.",
    "keywords": "dialect AI, voice agents, South Asian dialects, speech technology, Bangla dialects, Hindi dialects"
  };

  return (
    <>
      <Helmet>
        <title>Building Dialect-Aware Voice Agents – KhaM Labs</title>
        <meta name="description" content="Technical note on KhaM's approach to building dialect-aware voice agents for South Asian languages and dialects." />
        <meta name="keywords" content="dialect AI, voice agents, South Asian dialects, speech technology, Bangla dialects, Hindi dialects, KhaM Labs" />
        
        <meta property="og:title" content="Building Dialect-Aware Voice Agents – KhaM Labs" />
        <meta property="og:description" content="Technical note on KhaM's approach to building dialect-aware voice agents for South Asian languages and dialects." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://khamlabs.org/research/building-dialect-aware-voice-agents" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Building Dialect-Aware Voice Agents – KhaM Labs" />
        <meta name="twitter:description" content="Technical note on KhaM's approach to building dialect-aware voice agents for South Asian languages and dialects." />
        
        <link rel="canonical" href="https://khamlabs.org/research/building-dialect-aware-voice-agents" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Navigation />
        
        <main className="pt-24 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/research"
              className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta/80 transition-colors font-medium mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Research</span>
            </Link>

            <article className="prose prose-lg max-w-none">
              <header className="mb-12 text-left">
                <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4 leading-tight">
                  Building Dialect-Aware Voice Agents
                </h1>
                <p className="text-lg text-ink/70 font-light">
                  KhaM Labs | Technical Note | Q2 2025
                </p>
              </header>

              <div className="space-y-8 text-ink/80 leading-relaxed">
                <section>
                  <h2 className="font-serif text-2xl text-ink mb-4">Overview</h2>
                  <p className="mb-4">
                    In South Asia, the difference between being understood and being misunderstood isn't just language — it's dialect. While most AI voice systems focus on standard Bangla, Hindi, Tamil, or Urdu, real-world users interact through dozens of local variants. From Chittagonian to Sylheti, Barisali to Bhojpuri, dialects carry not only lexical shifts but emotional, rhythmic, and social nuance.
                  </p>
                  <p>
                    This technical note outlines KhaM's approach to building dialect-aware voice agents that don't just translate, but speak as we do.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl text-ink mb-4">1. Why Dialect Matters in Voice AI</h2>
                  <ul className="space-y-2 ml-6">
                    <li><strong>Semantic variation:</strong> A single word may mean different things depending on the region.</li>
                    <li><strong>Pronunciation & intonation:</strong> Chittagonian's clipped endings vs. Barisali's drawn-out vowels.</li>
                    <li><strong>Emotional resonance:</strong> Dialects convey tone, sarcasm, grief, and warmth differently.</li>
                  </ul>
                  <p className="mt-4">
                    Without dialect-level tuning, AI agents risk sounding generic, insensitive, or outright incorrect.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl text-ink mb-4">2. KhaM's Dialect Modeling Pipeline</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif text-xl text-ink mb-3">2.1. Community-Sourced Data Collection</h3>
                      <ul className="space-y-2 ml-6">
                        <li>Field recordings with native speakers in natural, conversational contexts</li>
                        <li><strong>Use cases:</strong> storytelling, greetings, commands, apologies, humor</li>
                        <li><strong>Metadata tagging:</strong> age, gender, region, relationship between speakers</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl text-ink mb-3">2.2. Audio Segmentation & Annotation</h3>
                      <ul className="space-y-2 ml-6">
                        <li>Sentence-level slicing using speaker diarization</li>
                        <li>Emotional tone labeling (e.g., assertive, apologetic, playful)</li>
                        <li>Phonetic variations recorded for edge cases</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl text-ink mb-3">2.3. Acoustic Modeling (Fine-tuned TTS/ASR)</h3>
                      <ul className="space-y-2 ml-6">
                        <li>Custom training on dialectal datasets using open-source models (e.g., Whisper, Coqui, OpenVoice)</li>
                        <li>Phoneme set extensions to reflect dialect-specific sounds</li>
                        <li>Alignment with IPA (International Phonetic Alphabet) when needed</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl text-ink mb-3">2.4. Emotion & Contextual Intent Layer</h3>
                      <ul className="space-y-2 ml-6">
                        <li>Optional emotional presets per dialect (e.g., Sylheti: soft-sarcastic, Noakhali: comedic)</li>
                        <li>Context-to-tone mapping for agent logic (e.g., request → polite + rising tone)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="font-serif text-2xl text-ink mb-4">3. Agent Design Principles</h2>
                  <ul className="space-y-2 ml-6">
                    <li><strong>Localized Lexicon:</strong> Common dialect-specific words + code-switching terms</li>
                    <li><strong>Tone Matching:</strong> Emotionally consistent response generation</li>
                    <li><strong>Cultural Guardrails:</strong> Avoiding tone-deaf replies or formal overreach in casual settings</li>
                    <li><strong>Fallback Strategy:</strong> Switch to neutral tone or ask for clarification without sounding robotic</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-2xl text-ink mb-4">4. Deployment Use Cases</h2>
                  <ul className="space-y-2 ml-6">
                    <li><strong>Customer Support IVRs:</strong> Telcos and banks serving Tier 2/3 audiences</li>
                    <li><strong>Voice Assistants:</strong> Home or regional agents for healthcare, learning, or agriculture</li>
                    <li><strong>Chat-to-Voice Applications:</strong> Translating chat input into dialect-rich responses</li>
                    <li><strong>Media Personalization:</strong> Generating stories, audio books, or public service announcements in local dialects</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-2xl text-ink mb-4">5. Challenges & Considerations</h2>
                  <ul className="space-y-2 ml-6">
                    <li><strong>Data Scarcity:</strong> Most dialects lack clean, labeled datasets</li>
                    <li><strong>Spelling Ambiguity:</strong> Non-standardized orthographies create confusion in TTS</li>
                    <li><strong>Cross-Dialectal Overlap:</strong> Fluid regional borders can cause speaker blending</li>
                    <li><strong>Hardware Constraints:</strong> Running fine-tuned dialect models on low-power devices</li>
                  </ul>
                  <p className="mt-4">
                    KhaM mitigates these via hybrid data collection (field + synthetic), cross-validation through community review, and fallback to lightweight cloud inference when necessary.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl text-ink mb-4">6. Roadmap</h2>
                  <ul className="space-y-2 ml-6">
                    <li><strong>Q2 2025:</strong> Launch of Sylheti + Chittagonian prototype agents</li>
                    <li><strong>Q3 2025:</strong> Add Barisali, Noakhali, and Rangpuri</li>
                    <li><strong>Q4 2025:</strong> Open up Dialect Agent API for telco + fintech use cases</li>
                    <li><strong>2026:</strong> Full integration into KhaM voice assistant framework (JugaduGPT, Bhooter Raja, etc.)</li>
                  </ul>
                </section>

                <footer className="mt-12 pt-8 border-t border-ink/10 text-center">
                  <p className="text-ink/70">
                    Contact: <a href="mailto:ripon@khamlabs.org" className="text-terracotta hover:text-terracotta/80">ripon@khamlabs.org</a>
                  </p>
                  <p className="text-ink/70">
                    URL: <a href="https://khamlabs.org/research/building-dialect-aware-voice-agents" className="text-terracotta hover:text-terracotta/80">khamlabs.org/research/building-dialect-aware-voice-agents</a>
                  </p>
                </footer>
              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default DialectAgents;
