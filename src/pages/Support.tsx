
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const Support = () => {
  const dialects = [
    {
      name: "Chittagonian",
      contexts: [
        "Real voices from the coastal south",
        "AI-ready audio model in progress", 
        "Stories of sea, spice, and survival"
      ]
    },
    {
      name: "Sylheti",
      contexts: [
        "Deeply expressive, diaspora-spread",
        "Voice-rich storytelling, folk magic",
        "Great for romantic, emotional, or nostalgic tones"
      ]
    },
    {
      name: "Noakhali",
      contexts: [
        "Fast, funny, and full of charm",
        "Digitally underrepresented but culturally iconic",
        "Ideal for comic timing and punchline reels"
      ]
    },
    {
      name: "Rangpuri",
      contexts: [
        "Rooted in folk riddles, haat bazaar life",
        "Smooth tone, warm rhythm",
        "Strong emotional bonding potential"
      ]
    },
    {
      name: "Khulnai Dialect",
      contexts: [
        "Delta-born, rustic and powerful",
        "Unique blend of Bangla + Urdu loanwords",
        "Great for natural world narratives and regional myths"
      ]
    },
    {
      name: "Barisali",
      contexts: [
        "Lyrical, animated, and full of character",
        "Strong vowel shifts, unique cadence",
        "Often parodied — rarely preserved"
      ]
    },
    {
      name: "Comilla Dialect",
      contexts: [
        "Mixed tone with Tripura influences",
        "Soft-spoken, elder-generation storytelling",
        "Great for cross-border cultural memory mapping"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Support KhaM – Adopt a Dialect, Keep It Alive</title>
        <meta name="description" content="Support KhaM's mission to preserve South Asian dialects and voices. Adopt a dialect, become a brand partner, or help preserve endangered languages." />
        <meta name="keywords" content="support KhaM, adopt dialect, South Asian languages, voice preservation, cultural sponsorship, endangered dialects" />
        <meta property="og:title" content="Support KhaM – Adopt a Dialect, Keep It Alive" />
        <meta property="og:description" content="Every voice matters. Every dialect is a memory. Support KhaM's mission to preserve and amplify the emotional languages of South Asia." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org/support" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Support KhaM – Adopt a Dialect, Keep It Alive" />
        <meta name="twitter:description" content="Support KhaM's mission to preserve South Asian dialects and voices through adoption, partnership, or donation." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <link rel="canonical" href="https://khamlabs.org/support" />
        
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Support KhaM – Adopt a Dialect",
            "url": "https://khamlabs.org/support",
            "description": "Support KhaM's mission to preserve endangered South Asian dialects and voices",
            "isPartOf": {
              "@type": "Organization",
              "name": "KhaM",
              "url": "https://khamlabs.org"
            }
          }`}
        </script>
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Navigation />
        
        <main className="pt-24 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-16">
            
            <header className="text-center space-y-6">
              <h1 className="font-serif text-4xl md:text-6xl text-ink">
                Adopt a Dialect.<br />Keep It Alive.
              </h1>
              <p className="text-lg md:text-xl font-light text-ink/80 max-w-2xl mx-auto">
                Every voice matters. Every dialect is a memory.<br />
                Support KhaM's mission to preserve and amplify the emotional languages of South Asia.
              </p>
            </header>

            <section className="space-y-12">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Ways to Help
              </h2>
              
              <div className="space-y-12">
                {/* For Individuals */}
                <div className="border border-ink/20 p-8 space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-ink">For Individuals</h3>
                    <div className="space-y-2">
                      <p className="text-3xl font-light text-terracotta">$5/month — Adopt a Voice</p>
                      <p className="text-lg font-light text-ink/80">
                        Preserve a dialect. Keep memory alive.<br />
                        Your contribution helps us collect voices, stories, and build the emotional language layer of South Asia.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-serif text-lg text-ink">Includes:</h4>
                    <div className="space-y-2 text-sm font-light text-ink/70">
                      <p>• Choose a dialect to support</p>
                      <p>• Help train voices and collect stories</p>
                      <p>• Early access to KhaM's audio archive</p>
                      <p>• Digital supporter badge</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-terracotta hover:bg-terracotta/90 text-paper rounded-none"
                    aria-label="Adopt a voice"
                  >
                    Adopt a Voice →
                  </Button>
                </div>

                {/* For Brands & Institutions */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-ink">For Brands & Institutions</h3>
                    <p className="text-lg font-light text-ink/80">
                      Partner with KhaM to protect language, deepen regional trust, and solve real CX problems — all while leaving a cultural legacy.
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Tier 1 */}
                    <div className="border border-ink/20 p-8 space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-serif text-xl text-ink">Tier 1: Voice Supporter</h4>
                        <p className="text-2xl font-light text-terracotta">$2,000</p>
                      </div>
                      <div className="space-y-2 text-sm font-light text-ink/70">
                        <p>• Sponsor 1 dialect's voice model</p>
                        <p>• Co-branded storytelling content (3–5 reels)</p>
                        <p>• Logo and brand mention on khamlabs.org</p>
                        <p>• Social media and PR visibility</p>
                        <p>• Usage rights for marketing</p>
                      </div>
                    </div>

                    {/* Tier 2 */}
                    <div className="border border-ink/20 p-8 space-y-4 bg-muted/10">
                      <div className="space-y-2">
                        <h4 className="font-serif text-xl text-ink">Tier 2: Cultural Partner</h4>
                        <p className="text-2xl font-light text-terracotta">$10,000</p>
                      </div>
                      <div className="space-y-2 text-sm font-light text-ink/70">
                        <p>• Everything in Tier 1</p>
                        <p>• 10+ custom story videos in dialect</p>
                        <p>• Dedicated landing page: "Voices from [Dialect], sponsored by [Brand]"</p>
                        <p>• Optional co-branded dialect voice assistant</p>
                        <p>• Behind-the-scenes impact content</p>
                        <p>• First-mover visibility in regional cultural AI</p>
                      </div>
                    </div>

                    {/* Tier 3 */}
                    <div className="border border-ink/20 p-8 space-y-4 bg-muted/20">
                      <div className="space-y-2">
                        <h4 className="font-serif text-xl text-ink">Tier 3: Cultural Guardian</h4>
                        <p className="text-2xl font-light text-terracotta">$25,000</p>
                      </div>
                      <div className="space-y-2 text-sm font-light text-ink/70">
                        <p>• All features in Tiers 1 & 2</p>
                        <p>• High-production hero film (60–90 sec)</p>
                        <p>• On-ground cultural event (workshop, archive drive, or showcase)</p>
                        <p>• Permanent credit in KhaM's cultural memory archive</p>
                        <p>• Brand-integrated voice persona (usable in IVRs/chatbots)</p>
                        <p>• PR and legacy storytelling across platforms</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-terracotta hover:bg-terracotta/90 text-paper rounded-none"
                    aria-label="Talk to us about partnership"
                  >
                    Talk to Us →
                  </Button>
                </div>
              </div>
            </section>

            {/* Voices in Need of Adoption */}
            <section className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="font-serif text-3xl md:text-4xl text-ink">Voices in Need of Adoption</h2>
                <p className="text-lg font-light text-ink/70 max-w-3xl mx-auto">
                  These are not just dialects. They are living memories, musical patterns, and emotional blueprints of our people.
                  Help us preserve them — one voice at a time.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dialects.map((dialect) => (
                  <div 
                    key={dialect.name} 
                    className="bg-paper border border-ink/10 p-6 space-y-4 hover:shadow-lg hover:border-ink/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <h3 className="font-serif text-lg text-ink">{dialect.name}</h3>
                    <div className="space-y-2">
                      {dialect.contexts.map((context, index) => (
                        <p key={index} className="text-sm font-light text-ink/70">
                          • {context}
                        </p>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-terracotta hover:bg-terracotta/90 text-paper text-sm rounded-none mt-4"
                      aria-label={`Adopt ${dialect.name} dialect`}
                    >
                      Adopt {dialect.name}
                    </Button>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">Other Ways to Support</h2>
              <div className="space-y-4 text-lg font-light text-ink/80">
                <p>• Volunteer with our voice recording team</p>
                <p>• Help us transcribe dialect stories</p>
                <p>• Donate — every dollar keeps a voice alive</p>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center space-y-8">
              <div className="space-y-4">
                <Button 
                  className="bg-terracotta hover:bg-terracotta/90 text-paper px-8 py-4 text-lg rounded-none"
                  aria-label="Adopt a dialect now"
                >
                  Adopt a Dialect Now
                </Button>
                <p className="text-sm font-light text-ink/60">
                  Join the mission to preserve disappearing voices.
                </p>
              </div>
            </section>

            {/* Thank you closing */}
            <section className="text-center space-y-6 pt-8 border-t border-ink/20">
              <blockquote className="font-serif text-2xl md:text-3xl text-ink italic">
                "A future that speaks like us… starts with you."
              </blockquote>
              <p className="text-lg font-light text-ink/70">
                KhaM is a South Asian cultural AI lab preserving memory through voice.
              </p>
            </section>

          </div>
        </main>

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

export default Support;
