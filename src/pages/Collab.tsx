
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const Collab = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navigation />
      
      <div className="pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl text-ink">
              How to back this work
            </h1>
            <p className="text-lg md:text-xl font-light text-ink/80 max-w-2xl mx-auto">
              This isn't crowdfunding. It's an invitation to be part of something that matters.
            </p>
          </div>

          {/* Story + Current Goal */}
          <section className="space-y-8">
            <div className="space-y-6 text-lg font-light leading-relaxed">
              <p className="text-ink/90">
                I'm building KhaM because I realized that when my parents pass, 
                their exact way of speaking—the pause before they say "accha," 
                the specific warmth in how they pronounce my name—will disappear forever.
              </p>
              <p className="text-ink/80">
                No AI model captures the weight of a sigh in Bangla. No translation 
                algorithm understands that "bhalo theko" means more than "take care" 
                when said by someone who raised you.
              </p>
              <p className="text-ink/70">
                Right now, I need $500 to register KhaM as a proper organization. 
                After that, we build the infrastructure to hold these disappearing voices.
              </p>
            </div>
          </section>

          {/* Support Tiers */}
          <section className="space-y-12">
            <h2 className="font-serif text-3xl text-ink text-center">
              Ways to help
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Letter */}
              <div className="border border-ink/20 p-8 space-y-4">
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
              <div className="border border-ink/20 p-8 space-y-4">
                <h3 className="font-serif text-xl text-ink">Collab</h3>
                <p className="text-3xl font-light text-terracotta">$200</p>
                <p className="text-sm font-light text-ink/70">
                  Direct input on priorities. Quarterly voice calls about progress.
                </p>
              </div>
            </div>
          </section>

          {/* Where funds go */}
          <section className="space-y-8">
            <h3 className="font-serif text-2xl text-ink">Where your support goes:</h3>
            <div className="space-y-4 text-lg font-light text-ink/80">
              <p>• Registration and legal foundation ($500)</p>
              <p>• Voice recording equipment and storage ($1,200)</p>
              <p>• Model training compute time ($2,000)</p>
              <p>• Linguist collaboration fees ($1,500)</p>
              <p>• My time to build this properly (priceless, but rent exists)</p>
            </div>
          </section>

          {/* Payment Integration */}
          <section className="text-center space-y-8">
            <div className="space-y-4">
              <Button 
                className="bg-terracotta hover:bg-terracotta/90 text-paper px-8 py-4 text-lg rounded-none"
                onClick={() => window.open('https://buymeacoffee.com/kham', '_blank')}
              >
                Support on Buy Me a Coffee
              </Button>
              <p className="text-sm font-light text-ink/60">
                Secure payment via Stripe. No subscription, just one-time support.
              </p>
            </div>
          </section>

          {/* Thank you closing */}
          <section className="text-center space-y-6 pt-8 border-t border-ink/20">
            <blockquote className="font-serif text-2xl md:text-3xl text-ink italic">
              "Thank you for believing that some things<br />are too important to let disappear."
            </blockquote>
            <p className="text-lg font-light text-ink/70">
              Every contribution is a vote for memory over metrics.
            </p>
          </section>

        </div>
      </div>

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
  );
};

export default Collab;
