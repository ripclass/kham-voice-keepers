
import { Button } from "@/components/ui/button";

const BrandsSection = () => {
  return (
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
              <Button className="bg-dusty text-ink hover:bg-dusty/90 font-light rounded-none border-0">
                Download Sponsor Deck
              </Button>
              <Button 
                variant="outline"
                className="border-ink/20 text-ink hover:bg-ink/5 font-light rounded-none border-0"
              >
                Contact Us
              </Button>
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
            
            <Button className="bg-terracotta text-paper hover:bg-terracotta/90 font-light rounded-none border-0">
              Become a Collaborator
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
