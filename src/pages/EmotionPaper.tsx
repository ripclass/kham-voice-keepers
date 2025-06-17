
import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EmotionPaper = () => {
  return (
    <>
      <Helmet>
        <title>Emotion in South Asian Languages: Beyond Translation – KhaM Labs</title>
        <meta name="description" content="KhaM Labs whitepaper exploring how emotional expression varies across South Asian languages and the implications for AI voice modeling." />
        <meta name="keywords" content="South Asian languages, emotion recognition, dialect AI, KhaM Labs research, emotional modeling, voice AI" />
        
        <meta property="og:title" content="Emotion in South Asian Languages: Beyond Translation – KhaM Labs" />
        <meta property="og:description" content="A comprehensive whitepaper on emotional patterns in South Asian dialects and their implications for AI development." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://khamlabs.org/research/emotion-in-south-asian-languages-beyond-translation" />
        
        <link rel="canonical" href="https://khamlabs.org/research/emotion-in-south-asian-languages-beyond-translation" />
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Navigation />
        
        <main className="pt-24 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link 
              to="/research" 
              className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta/80 transition-colors mb-8 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research
            </Link>

            <article className="prose prose-lg max-w-none">
              {/* Title and subtitle */}
              <header className="mb-12">
                <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-4">
                  Emotion in South Asian Languages: Beyond Translation
                </h1>
                <p className="text-xl text-ink/70 font-light">
                  KhaM Labs Whitepaper | Expected Publication: Q2 2025
                </p>
              </header>

              {/* Abstract */}
              <section className="bg-terracotta/5 border border-terracotta/20 rounded-lg p-8 mb-12">
                <h2 className="font-serif text-2xl text-ink mb-4">Abstract</h2>
                <p className="text-ink/80 leading-relaxed text-lg">
                  South Asian languages are not just multilingual — they are emotionally polyphonic. A single word can carry affection, frustration, reverence, or rebellion depending on dialect, tone, and social context. Current AI models, even those trained on massive multilingual corpora, consistently fail to grasp these emotional subtleties. This paper explores why translation is not enough, how dialect-specific emotional patterns shape speech, and what's required to build AI that doesn't just speak — but feels like us. We propose a new emotional modeling framework rooted in the lived, spoken rhythms of South Asia.
                </p>
              </section>

              {/* Main content */}
              <div className="space-y-8 text-ink/80 leading-relaxed">
                <section>
                  <h2 className="font-serif text-3xl text-ink mb-4">1. Introduction</h2>
                  <p className="mb-4">
                    Language models are improving. But emotionally? They're still tone-deaf. Across Bangladesh, India, Nepal, and Sri Lanka, users increasingly interact with AI — through chatbots, IVRs, virtual assistants — that speak in clean, formal, grammatically correct language. But the moment they encounter a dialect, a joke, a tone of grief or sarcasm, they falter.
                  </p>
                  <p className="mb-4">
                    This is not a failure of translation. It's a failure of emotional recognition.
                  </p>
                  <p>
                    KhaM is building emotional infrastructure — not just language models — to ensure AI understands how we feel, not just what we say.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-3xl text-ink mb-4">2. Three Core Problems with AI in South Asia</h2>
                  
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl text-ink mb-3">2.1. Translation Is Not Tone</h3>
                    <p className="mb-4">
                      Most AI relies on sentence-level translation. But "I'm sorry" doesn't mean the same thing in every dialect — or carry the same weight.
                    </p>
                    <ul className="space-y-2 mb-4 pl-6">
                      <li>"Doya kore maf koren" (Bengali) → formal, reverent</li>
                      <li>"(h)A(n)sa (k)hota hoilam" (Sylheti) → casual, intimate, almost childlike</li>
                      <li>"Ai(n) ar Kijjum?" (Chittagonian) → indirect, resigned, situational</li>
                    </ul>
                    <p>
                      The same sentiment is emotionally non-transferable without dialectal and tonal context.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-serif text-2xl text-ink mb-3">2.2. Emotion Is Dialectal</h3>
                    <p className="mb-4">
                      Sylheti anger is sharp and fast. Noakhali sorrow is drawn out and nasal. Barisali sarcasm comes with a rise-fall rhythm.
                    </p>
                    <p className="mb-2">Emotions in South Asia are performed through:</p>
                    <ul className="space-y-2 mb-4 pl-6">
                      <li>Rhythmic pattern</li>
                      <li>Code-switching ("Tui ar kotha bolish na, please")</li>
                      <li>Social cues (using certain pronouns to express affection or distance)</li>
                    </ul>
                    <p>
                      AI doesn't know when anger is humorous or when grief is polite.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-ink mb-3">2.3. Language Is Socially Layered</h3>
                    <p className="mb-4">
                      Who speaks matters more than what's said. Gender, age, caste, class, location — all shift emotional tone.
                    </p>
                    <p>
                      A teenage girl from Noakhali saying "What happend?" in her dialect, carries a different weight than an older man from Rangpur using the same words.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="font-serif text-3xl text-ink mb-4">3. Case Studies: Emotion in Context</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-dusty/5 border border-dusty/20 rounded-lg p-6">
                      <h3 className="font-serif text-xl text-ink mb-3">Sylheti</h3>
                      <p className="font-medium mb-2">"Kita-re ba, Toi to amar (k)hotha mone ra(k)hosh na?"</p>
                      <p className="text-sm text-ink/60 mb-2">Literal: Will you not remember my words?</p>
                      <p className="text-sm">Emotional tone: Quiet pleading, deeply intimate, often used by aging parents or in romantic goodbyes.</p>
                    </div>

                    <div className="bg-dusty/5 border border-dusty/20 rounded-lg p-6">
                      <h3 className="font-serif text-xl text-ink mb-3">Noakhali</h3>
                      <p className="font-medium mb-2">"Kisu (h)oile to anne A(n)re ar phone diton-no/ diban no?"</p>
                      <p className="text-sm text-ink/60 mb-2">Literal: If something happens, you won't even call me, right?</p>
                      <p className="text-sm">Tone: Passive-aggressive sorrow, laced with guilt and humor. Used in farewells.</p>
                    </div>

                    <div className="bg-dusty/5 border border-dusty/20 rounded-lg p-6">
                      <h3 className="font-serif text-xl text-ink mb-3">Chittagonian</h3>
                      <p className="font-medium mb-2">"Borr gom (h)oiyi."</p>
                      <p className="text-sm text-ink/60 mb-2">Literal: Felt amazing.</p>
                      <p className="text-sm">Emotional tone: Playful admiration, youth slang, tone varies with facial expression.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="font-serif text-3xl text-ink mb-4">4. What AI Misses — and Why It Matters</h2>
                  <p className="mb-4">
                    When voice assistants or customer support bots use neutral Bangla, they often sound robotic or out-of-place. Users in Tier 2/3 cities don't feel heard. Worse, they feel disregarded.
                  </p>
                  <p className="mb-2">This leads to:</p>
                  <ul className="space-y-2 mb-4 pl-6">
                    <li>Miscommunication in support systems</li>
                    <li>Frustration with automated experiences</li>
                    <li>Loss of trust</li>
                  </ul>
                  <p>
                    Emotionally intelligent AI in South Asia must be dialect-aware.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-3xl text-ink mb-4">5. The KhaM Approach: Emotionally-Aware Language Modeling</h2>
                  <p className="mb-4">
                    KhaM is building the emotional memory layer for South Asian languages through:
                  </p>
                  <ul className="space-y-2 mb-4 pl-6">
                    <li>Dialect-specific voice recordings (with tone, emotion, rhythm)</li>
                    <li>Speaker-aligned tagging (Who is speaking? To whom? In what context?)</li>
                    <li>Cultural use-case modeling (lullabies ≠ arguments ≠ market banter)</li>
                    <li>Agent voice design with emotional presets per dialect</li>
                  </ul>
                  <p>
                    We don't just record words. We record how the words feel.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-3xl text-ink mb-4">6. Conclusion</h2>
                  <p className="mb-4">
                    Until AI can understand how a Barisali mother soothes a child, or how a Sylheti youth flirts in half-English code-switch, it will never truly feel local.
                  </p>
                  <p className="mb-4">
                    Translation isn't enough. Emotion lives in dialects.
                  </p>
                  <p>
                    Preserving them isn't just cultural work — it's emotional AI done right.
                  </p>
                </section>

                <section className="bg-ink/5 border border-ink/20 rounded-lg p-6">
                  <h2 className="font-serif text-2xl text-ink mb-4">Appendix: Dialects We Are Prioritizing</h2>
                  <ul className="space-y-2 pl-6">
                    <li>Sylheti</li>
                    <li>Chittagonian</li>
                    <li>Noakhali</li>
                    <li>Barisali</li>
                    <li>Rangpuri (North Bengal)</li>
                    <li>Khulnai (Southwest)</li>
                    <li>Comilla / Tripura-border Bangla</li>
                  </ul>
                </section>

                <footer className="text-center pt-8 border-t border-ink/10">
                  <p className="text-terracotta font-medium">
                    Contact: <a href="mailto:ripon@khamlabs.org" className="hover:underline">ripon@khamlabs.org</a> | <a href="https://khamlabs.org/research" className="hover:underline">khamlabs.org/research</a>
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

export default EmotionPaper;
