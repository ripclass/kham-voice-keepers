
interface DialectCardProps {
  name: string;
  contexts: string[];
}

const DialectCard = ({ name, contexts }: DialectCardProps) => {
  const mailtoLink = `mailto:hello@khamlabs.org?subject=Adopt%20${encodeURIComponent(name)}%20–%20Voice%20Sponsorship`;

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
      <a 
        href={mailtoLink}
        className="block text-left text-terracotta font-medium hover:text-terracotta/80 hover:underline transition-all duration-200 mt-4 py-2"
        aria-label={`Adopt ${name} dialect`}
      >
        Adopt {name}
      </a>
    </div>
  );
};

export default DialectCard;
