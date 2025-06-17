
import { Button } from "@/components/ui/button";

interface DialectCardProps {
  name: string;
  contexts: string[];
}

const DialectCard = ({ name, contexts }: DialectCardProps) => {
  return (
    <div className="bg-paper border border-ink/10 p-6 space-y-4 hover:shadow-lg hover:border-ink/20 transition-all duration-300 hover:-translate-y-1">
      <h3 className="font-serif text-lg text-ink">{name}</h3>
      <div className="space-y-2">
        {contexts.map((context, index) => (
          <p key={index} className="text-sm font-light text-ink/70">
            • {context}
          </p>
        ))}
      </div>
      <Button 
        className="w-full bg-terracotta hover:bg-terracotta/90 text-paper text-sm rounded-none mt-4"
        aria-label={`Adopt ${name} dialect`}
      >
        Adopt {name}
      </Button>
    </div>
  );
};

export default DialectCard;
