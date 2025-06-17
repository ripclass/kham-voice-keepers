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
        
        <main className="pt-24 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Header */}
            <header className="text-center space-y-6">
              <h1 className="font-serif text-4xl md:text-6xl text-ink">
                Adopt a Dialect.<br />Keep It Alive.
              </h1>
              <p className="text-lg md:text-xl font-light text-ink/80 max-w-2xl mx-auto">
                Every voice matters. Every dialect is a memory.<br />
                Support KhaM's mission to preserve and amplify the emotional languages of South Asia.
              </p>
            </header>

            {/* Why Support Matters */}
            <section className="space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">Why Support Matters</h2>
              <div className="space-y-6 text-lg font-light leading-relaxed">
                <p className="text-ink/90">
                  Languages don't die all at once — they fade one voice at a time.
                </p>
                <p className="text-ink/80">
                  South Asia has over 100 endangered dialects. Most have no digital presence.
                </p>
                <p className="text-ink/70">
                  KhaM is building an open-source voice library to preserve, honor, and amplify these sounds — through storytelling, community memory, and AI-powered future access.
                </p>
              </div>
            </section>

            {/* Ways to Help */}
            <section className="space-y-12">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Ways to Help
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* For Individuals */}
                <div className="border border-ink/20 p-8 space-y-4">
                  <div className="text-4xl">👤</div>
                  <h3 className="font-serif text-xl text-ink">For Individuals</h3>
                  <p className="text-3xl font-light text-terracotta">₹299/month</p>
                  <div className="space-y-3 text-sm font-light text-ink/70">
                    <p>• Choose a dialect</p>
                    <p>• Help train voices and collect stories</p>
                    <p>• Early access to KhaM's audio archive</p>
                    <p>• Supporter badge</p>
                  </div>
                </div>

                {/* For Brands & Institutions */}
                <div className="border border-ink/20 p-8 space-y-4 bg-muted/20">
                  <div className="text-4xl">🏢</div>
                  <h3 className="font-serif text-xl text-ink">For Brands & Institutions</h3>
                  <p className="text-3xl font-light text-terracotta">₹2 lakh+</p>
                  <div className="space-y-3 text-sm font-light text-ink/70">
                    <p>• Sponsor a dialect, become a guardian of culture</p>
                    <p>• Branded voice stories, reels, and cultural content</p>
                    <p>• CSR + campaign visibility</p>
                    <p>• Legacy placement in KhaM archive</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Dialects in Need */}
            <section className="space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">Dialects in Need of Adoption</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {['Sylheti', 'Chakma', 'Bodo', 'Bhojpuri', 'Marwari', 'Chittagonian'].map((dialect) => (
                  <div key={dialect} className="bg-paper border border-ink/10 p-4 space-y-2">
                    <h3 className="font-serif text-lg text-ink">{dialect}</h3>
                    <div className="space-y-1 text-xs font-light text-ink/70">
                      <p>• Real voices from the community</p>
                      <p>• AI-ready training</p>
                      <p>• A living story library</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Other Ways to Support */}
            <section className="space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">Other Ways to Support</h2>
              <div className="space-y-4 text-lg font-light text-ink/80">
                <p>• Volunteer with our voice recording team</p>
                <p>• Help us transcribe dialect stories</p>
                <p>• Donate — every rupee keeps a voice alive</p>
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
