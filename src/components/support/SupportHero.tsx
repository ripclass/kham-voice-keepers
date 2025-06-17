
import { Button } from "@/components/ui/button";

interface SupportHeroProps {
  onScrollToSection: (id: string) => void;
}

const SupportHero = ({ onScrollToSection }: SupportHeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-20">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="font-serif text-4xl md:text-6xl text-ink">
          How to Back This Work
        </h1>
        <p className="text-lg md:text-xl font-light text-ink/80 max-w-2xl mx-auto">
          This isn't crowdfunding. It's an invitation to be part of something that matters.
        </p>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => onScrollToSection('individuals')}
            className="bg-terracotta hover:bg-terracotta/90 text-paper px-8 py-6 text-lg font-light rounded-none"
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
