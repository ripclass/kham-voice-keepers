import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const Support = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Support KhaM: Voices Worth Keeping</title>
        <meta name="description" content="Support KhaM's mission to preserve South Asian dialects and voices. Adopt a dialect, volunteer, or become a brand partner to keep endangered languages alive." />
        <meta name="keywords" content="support KhaM, adopt dialect, South Asian languages, voice preservation, cultural sponsorship, endangered dialects" />
        <meta property="og:title" content="Support KhaM: Voices Worth Keeping" />
        <meta property="og:description" content="Whether you're an individual, brand, or institution — help keep South Asia's disappearing voices alive through KhaM." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org/support" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Support KhaM: Voices Worth Keeping" />
        <meta name="twitter:description" content="Support KhaM's mission to preserve South Asian dialects through adoption, partnership, or volunteering." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <link rel="canonical" href="https://khamlabs.org/support" />
        
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Support KhaM: Voices Worth Keeping",
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
                Whether you're an individual, a brand, or an institution — you can help keep South Asia's disappearing voices alive through KhaM.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => scrollToSection('individuals')}
                  className="bg-terracotta text-paper px-8 py-3 text-lg font-light hover:bg-terracotta/90 transition-colors"
                >
                  I'm an Individual
                </button>
                <button 
                  onClick={() => scrollToSection('brands')}
                  className="border border-ink/20 text-ink px-8 py-3 text-lg font-light hover:bg-ink/5 transition-colors"
                >
                  I'm a Brand or Partner
                </button>
              </div>
            </div>
          </section>

          {/* For Individuals Section */}
          <section id="individuals" className="py-20 px-6 md:px-12 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-ink mb-16 text-center">
                For Individuals
              </h2>
              
              <div className="grid md:grid-cols-3 gap-12">
                {/* Adopt a Voice */}
                <div className="space-y-6">
                  <div className="text-4xl">💠</div>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink">Adopt a Voice</h3>
                  <h4 className="font-serif text-xl text-ink/80">₹299/month</h4>
                  <p className="text-lg font-light text-ink/70 mb-4">
                    Keep your dialect alive. Sponsor voice training and memory work.
                  </p>
                  
                  <ul className="space-y-3 text-lg font-light text-ink/70">
                    <li>• Choose a dialect</li>
                    <li>• Support recordings + story collection</li>
                    <li>• Get early access to the archive</li>
                    <li>• Digital badge of support</li>
                  </ul>
                  
                  <button className="bg-terracotta text-paper px-6 py-2 font-light hover:bg-terracotta/90 transition-colors w-full">
                    Adopt Now
                  </button>
                </div>

                {/* Volunteer */}
                <div className="space-y-6">
                  <div className="text-4xl">💠</div>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink">Volunteer</h3>
                  <p className="text-lg font-light text-ink/70 mb-4">
                    Help preserve voices in your community.
                  </p>
                  
                  <ul className="space-y-3 text-lg font-light text-ink/70">
                    <li>• Record voices in your community</li>
                    <li>• Help us transcribe and translate dialect stories</li>
                    <li>• Host a storytelling circle or listening party</li>
                  </ul>
                  
                  <button className="border border-ink/20 text-ink px-6 py-2 font-light hover:bg-ink/5 transition-colors w-full">
                    Join as a Volunteer
                  </button>
                </div>

                {/* Donate */}
                <div className="space-y-6">
                  <div className="text-4xl">💠</div>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink">Donate Any Amount</h3>
                  <p className="text-lg font-light text-ink/70 mb-4">
                    Every rupee keeps a voice alive — and brings it back for the future.
                  </p>
                  
                  <div className="pt-8">
                    <button className="bg-dusty text-ink px-6 py-2 font-light hover:bg-dusty/90 transition-colors w-full">
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* For Brands & Institutions Section */}
          <section id="brands" className="py-20 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-ink mb-16 text-center">
                For Brands & Institutions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                {/* Sponsor a Dialect */}
                <div className="space-y-6">
                  <div className="text-4xl">🔷</div>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink">Sponsor a Dialect</h3>
                  <h4 className="font-serif text-xl text-ink/80">Starting at ৳2 lakh</h4>
                  <p className="text-lg font-light text-ink/70 mb-4">
                    Let your brand adopt a dialect and revive a language.
                  </p>
                  
                  <ul className="space-y-3 text-lg font-light text-ink/70">
                    <li>• Brand credit on stories, reels, and archive</li>
                    <li>• Cultural impact + CSR visibility</li>
                    <li>• Dialect-specific microsite section</li>
                    <li>• Optional brand voice assistant / PR features</li>
                  </ul>
                  
                  <div className="flex flex-col gap-3 pt-4">
                    <button className="bg-dusty text-ink px-6 py-2 font-light hover:bg-dusty/90 transition-colors">
                      Download Sponsor Deck
                    </button>
                    <button className="border border-ink/20 text-ink px-6 py-2 font-light hover:bg-ink/5 transition-colors">
                      Contact Us
                    </button>
                  </div>
                </div>

                {/* Collaborate with KhaM */}
                <div className="space-y-6">
                  <div className="text-4xl">🔷</div>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink">Collaborate with KhaM</h3>
                  <p className="text-lg font-light text-ink/70 mb-4">
                    We welcome partnerships with:
                  </p>
                  
                  <ul className="space-y-3 text-lg font-light text-ink/70">
                    <li>• <strong>Creative agencies</strong> → co-produce campaigns</li>
                    <li>• <strong>Universities / AI Labs</strong> → contribute research + tools</li>
                    <li>• <strong>Cultural orgs + NGOs</strong> → help expand our archive</li>
                    <li>• <strong>Media platforms</strong> → co-release multilingual content</li>
                  </ul>
                  
                  <p className="text-lg font-light text-ink/80 pt-4">
                    Let's protect and project our region's voices — together.
                  </p>
                  
                  <button className="bg-terracotta text-paper px-6 py-2 font-light hover:bg-terracotta/90 transition-colors">
                    Become a Collaborator
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Current Dialects Seeking Adoption */}
          <section className="py-20 px-6 md:px-12 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-ink mb-16 text-center">
                Current Dialects Seeking Adoption
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {['Sylheti', 'Chakma', 'Bodo', 'Bhojpuri', 'Marwari', 'Chittagonian'].map((dialect) => (
                  <div key={dialect} className="bg-paper border border-ink/10 p-6 space-y-4">
                    <h3 className="font-serif text-xl text-ink">{dialect}</h3>
                    <ul className="space-y-2 text-sm font-light text-ink/70">
                      <li>• Real voices from elders + youth</li>
                      <li>• AI training corpus</li>
                      <li>• Story collection + reels</li>
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-lg font-light text-ink/70 mb-6">(...more loading)</p>
                <button className="border border-ink/20 text-ink px-8 py-3 text-lg font-light hover:bg-ink/5 transition-colors">
                  See the Voices
                </button>
              </div>
            </div>
          </section>

          {/* Who We Are */}
          <section className="py-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-ink mb-12">
                Who We Are
              </h2>
              
              <div className="space-y-8">
                <p className="text-lg md:text-xl font-light leading-relaxed text-ink/80">
                  KhaM is a cultural AI lab based in South Asia.
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed text-ink/70">
                  We work with rural communities, AI researchers, linguists, and storytellers to preserve memory through voice — not in books, but in sound.
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
