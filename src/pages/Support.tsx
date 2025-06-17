import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const Support = () => {
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
        
        {/* Hero Section */}
        <main>
          <section className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-20">
            <div className="max-w-4xl text-center space-y-8">
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ink leading-tight">
                Adopt a Dialect.<br />Keep It Alive.
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-ink/80">
                Every voice matters. Every dialect is a memory.<br />
                Support KhaM's mission to preserve and amplify the emotional languages of South Asia.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-terracotta hover:bg-terracotta/90 text-paper px-8 py-3 text-lg rounded-none border-0 font-light"
                  aria-label="Adopt a dialect"
                >
                  Adopt a Dialect
                </Button>
                <Button 
                  variant="outline"
                  className="border-ink/20 text-ink hover:bg-ink/5 px-8 py-3 text-lg rounded-none font-light"
                  aria-label="Become a brand partner"
                >
                  Become a Brand Partner
                </Button>
              </div>
            </div>
          </section>

          {/* Why Support Matters */}
          <section className="py-20 px-6 md:px-12 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-ink mb-16 text-center">
                Why Support Matters
              </h2>
              
              <div className="space-y-8">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-ink/90">
                  Languages don't die all at once — they fade one voice at a time.
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed text-ink/80">
                  South Asia has over 100 endangered dialects. Most have no digital presence.
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed text-ink/70">
                  KhaM is building an open-source voice library to preserve, honor, and amplify these sounds — through storytelling, community memory, and AI-powered future access.
                </p>
              </div>
            </div>
          </section>

          {/* How You Can Help */}
          <section className="py-20 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-ink mb-16 text-center">
                How You Can Help
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                {/* For Individuals */}
                <div className="space-y-6">
                  <div className="text-4xl">👤</div>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink">For Individuals</h3>
                  <h4 className="font-serif text-xl text-ink/80">Adopt a Voice — ₹299/month</h4>
                  
                  <ul className="space-y-3 text-lg font-light text-ink/70">
                    <li>• Choose a dialect</li>
                    <li>• Help train voices and collect stories</li>
                    <li>• Early access to KhaM's audio archive</li>
                    <li>• Supporter badge</li>
                  </ul>
                  
                  <Button 
                    className="bg-terracotta hover:bg-terracotta/90 text-paper px-6 py-2 rounded-none border-0 font-light"
                  >
                    Adopt Now
                  </Button>
                </div>

                {/* For Brands & Institutions */}
                <div className="space-y-6">
                  <div className="text-4xl">🏢</div>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink">For Brands & Institutions</h3>
                  <h4 className="font-serif text-xl text-ink/80">Sponsor a Dialect. Become a Guardian of Culture.</h4>
                  
                  <ul className="space-y-3 text-lg font-light text-ink/70">
                    <li>• Starting at ৳2 lakh per dialect</li>
                    <li>• Branded voice stories, reels, and cultural content</li>
                    <li>• CSR + campaign visibility</li>
                    <li>• Legacy placement in KhaM archive</li>
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="bg-dusty hover:bg-dusty/90 text-ink px-6 py-2 rounded-none border-0 font-light"
                    >
                      Download Sponsor Deck
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-ink/20 text-ink hover:bg-ink/5 px-6 py-2 rounded-none font-light"
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dialects in Need of Adoption */}
          <section className="py-20 px-6 md:px-12 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-ink mb-16 text-center">
                Dialects in Need of Adoption
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {['Sylheti', 'Chakma', 'Bodo', 'Bhojpuri', 'Marwari', 'Chittagonian'].map((dialect) => (
                  <div key={dialect} className="bg-paper border border-ink/10 p-6 space-y-4">
                    <h3 className="font-serif text-xl text-ink">{dialect}</h3>
                    <ul className="space-y-2 text-sm font-light text-ink/70">
                      <li>• Real voices from the community</li>
                      <li>• AI-ready training</li>
                      <li>• A living story library</li>
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  variant="outline"
                  className="border-ink/20 text-ink hover:bg-ink/5 px-8 py-3 text-lg rounded-none font-light"
                >
                  See the Voices
                </Button>
              </div>
            </div>
          </section>

          {/* Other Ways to Support */}
          <section className="py-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-ink mb-16 text-center">
                Other Ways to Support
              </h2>
              
              <div className="space-y-8 mb-12">
                <p className="text-lg md:text-xl font-light leading-relaxed text-ink/80">
                  • Volunteer with our voice recording team
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed text-ink/80">
                  • Help us transcribe dialect stories
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed text-ink/80">
                  • Donate — every rupee keeps a voice alive
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline"
                  className="border-ink/20 text-ink hover:bg-ink/5 px-6 py-2 rounded-none font-light"
                >
                  Volunteer
                </Button>
                <Button 
                  className="bg-terracotta hover:bg-terracotta/90 text-paper px-6 py-2 rounded-none border-0 font-light"
                >
                  Donate
                </Button>
              </div>
            </div>
          </section>

          {/* Who We Are */}
          <section className="py-20 px-6 md:px-12 bg-muted/30">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-ink mb-12">
                Who We Are
              </h2>
              
              <div className="space-y-8">
                <p className="text-lg md:text-xl font-light leading-relaxed text-ink/80">
                  KhaM is a South Asian cultural AI lab preserving memory through voice.
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed text-ink/70">
                  We collaborate with communities, researchers, and storytellers to keep our languages alive — not in books, but in sound.
                </p>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-ink/90 pt-4">
                  A future that speaks like us… starts with you.
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
    </>
  );
};

export default Support;
