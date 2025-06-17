
import { Button } from "@/components/ui/button";

const IndividualsSection = () => {
  return (
    <section id="individuals" className="py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-16">
        <h2 className="font-serif text-3xl md:text-4xl text-ink text-center">
          For Individuals
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Adopt a Voice */}
          <div className="border border-ink/20 p-8 space-y-4">
            <h3 className="font-serif text-xl text-ink">Adopt a Voice</h3>
            <p className="text-3xl font-light text-terracotta">₹299/month</p>
            <p className="text-sm font-light text-ink/70">
              Keep your dialect alive. Sponsor voice training and memory work.
            </p>
            <ul className="space-y-2 text-sm font-light text-ink/70">
              <li>• Choose a dialect</li>
              <li>• Support recordings + story collection</li>
              <li>• Get early access to the archive</li>
              <li>• Digital badge of support</li>
            </ul>
            <Button className="bg-terracotta hover:bg-terracotta/90 text-paper px-8 py-4 text-lg rounded-none w-full">
              Adopt Now
            </Button>
          </div>

          {/* Volunteer */}
          <div className="border border-ink/20 p-8 space-y-4">
            <h3 className="font-serif text-xl text-ink">Volunteer</h3>
            <p className="text-sm font-light text-ink/70 mb-4">
              Help preserve voices in your community.
            </p>
            <ul className="space-y-2 text-sm font-light text-ink/70">
              <li>• Record voices in your community</li>
              <li>• Help us transcribe and translate dialect stories</li>
              <li>• Host a storytelling circle or listening party</li>
            </ul>
            <Button 
              variant="outline"
              className="border-ink/20 text-ink hover:bg-ink/5 px-8 py-4 text-lg font-light rounded-none border-0 w-full"
            >
              Join as a Volunteer
            </Button>
          </div>

          {/* Donate */}
          <div className="border border-ink/20 p-8 space-y-4">
            <h3 className="font-serif text-xl text-ink">Donate Any Amount</h3>
            <p className="text-sm font-light text-ink/70 mb-4">
              Every rupee keeps a voice alive — and brings it back for the future.
            </p>
            <div className="pt-8">
              <Button className="bg-dusty hover:bg-dusty/90 text-ink px-8 py-4 text-lg rounded-none w-full">
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
