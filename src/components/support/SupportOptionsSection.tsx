
import { Button } from "@/components/ui/button";

const SupportOptionsSection = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-muted/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="font-serif text-3xl md:text-4xl text-ink text-center">
          Ways to Help
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Letter */}
          <div className="border border-ink/20 p-8 space-y-4 bg-paper">
            <h3 className="font-serif text-xl text-ink">Letter</h3>
            <p className="text-3xl font-light text-terracotta">$10</p>
            <p className="text-sm font-light text-ink/70">
              A handwritten thank you note. Your name in the early supporters list.
            </p>
          </div>

          {/* Page */}
          <div className="border border-ink/20 p-8 space-y-4 bg-muted/20">
            <h3 className="font-serif text-xl text-ink">Page</h3>
            <p className="text-3xl font-light text-terracotta">$50</p>
            <p className="text-sm font-light text-ink/70">
              Everything above + early access to voice samples and research updates.
            </p>
          </div>

          {/* Collab */}
          <div className="border border-ink/20 p-8 space-y-4 bg-paper">
            <h3 className="font-serif text-xl text-ink">Collab</h3>
            <p className="text-3xl font-light text-terracotta">$200</p>
            <p className="text-sm font-light text-ink/70">
              Direct input on priorities. Quarterly voice calls about progress.
            </p>
          </div>
        </div>

        <div className="text-center space-y-8 pt-8">
          <Button 
            className="bg-terracotta hover:bg-terracotta/90 text-paper px-8 py-4 text-lg rounded-none"
            onClick={() => window.open('https://coff.ee/KhaMLabs', '_blank')}
            aria-label="Support KhaM via Buy Me a Coffee"
          >
            Support on Buy Me a Coffee
          </Button>
          <p className="text-sm font-light text-ink/60">
            Secure payment via Stripe. No subscription, just one-time support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportOptionsSection;
