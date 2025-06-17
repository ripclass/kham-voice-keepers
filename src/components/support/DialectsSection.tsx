
import { Button } from "@/components/ui/button";

const DialectsSection = () => {
  const dialects = ['Sylheti', 'Chakma', 'Bodo', 'Bhojpuri', 'Marwari', 'Chittagonian'];

  return (
    <section className="py-20 px-6 md:px-12 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-ink mb-16 text-center">
          Current Dialects Seeking Adoption
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {dialects.map((dialect) => (
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
          <Button 
            variant="outline"
            className="border-ink/20 text-ink hover:bg-ink/5 px-8 py-6 text-lg font-light rounded-none border-0"
          >
            See the Voices
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DialectsSection;
