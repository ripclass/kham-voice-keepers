
import { Button } from "@/components/ui/button";

const IndividualsSection = () => {
  return (
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
            
            <Button className="bg-terracotta text-paper hover:bg-terracotta/90 w-full font-light rounded-none border-0">
              Adopt Now
            </Button>
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
            
            <Button 
              variant="outline"
              className="border-ink/20 text-ink hover:bg-ink/5 w-full font-light rounded-none border-0"
            >
              Join as a Volunteer
            </Button>
          </div>

          {/* Donate */}
          <div className="space-y-6">
            <div className="text-4xl">💠</div>
            <h3 className="font-serif text-2xl md:text-3xl text-ink">Donate Any Amount</h3>
            <p className="text-lg font-light text-ink/70 mb-4">
              Every rupee keeps a voice alive — and brings it back for the future.
            </p>
            
            <div className="pt-8">
              <Button className="bg-dusty text-ink hover:bg-dusty/90 w-full font-light rounded-none border-0">
                Donate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndividualsSection;
