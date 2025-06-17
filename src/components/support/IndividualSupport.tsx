
import { Button } from "@/components/ui/button";

const IndividualSupport = () => {
  return (
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
        asChild
        className="bg-terracotta hover:bg-terracotta/90 text-paper rounded-none"
        aria-label="Adopt a voice"
      >
        <a 
          href="mailto:ripon@khamlabs.org?subject=Adopt%20a%20Voice%20–%20Individual%20Support"
          target="_blank"
          rel="noopener noreferrer"
        >
          Adopt a Voice →
        </a>
      </Button>
    </div>
  );
};

export default IndividualSupport;
