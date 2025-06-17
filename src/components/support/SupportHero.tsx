
import { Button } from "@/components/ui/button";

interface SupportHeroProps {
  onScrollToSection: (id: string) => void;
}

const SupportHero = ({ onScrollToSection }: SupportHeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-20">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ink leading-tight">
          Adopt a Dialect.<br />Keep It Alive.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-ink/80">
          Whether you're an individual, a brand, or an institution — you can help keep South Asia's disappearing voices alive through KhaM.
        </p>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => onScrollToSection('individuals')}
            className="bg-terracotta text-paper hover:bg-terracotta/90 px-8 py-6 text-lg font-light rounded-none border-0"
          >
            I'm an Individual
          </Button>
          <Button 
            onClick={() => onScrollToSection('brands')}
            variant="outline"
            className="border-ink/20 text-ink hover:bg-ink/5 px-8 py-6 text-lg font-light rounded-none border-0"
          >
            I'm a Brand or Partner
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SupportHero;
