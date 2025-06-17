
import DialectCard from "./DialectCard";

const VoicesSection = () => {
  const dialects = [
    {
      name: "Chittagonian",
      contexts: [
        "Real voices from the coastal south",
        "AI-ready audio model in progress", 
        "Stories of sea, spice, and survival"
      ]
    },
    {
      name: "Sylheti",
      contexts: [
        "Deeply expressive, diaspora-spread",
        "Voice-rich storytelling, folk magic",
        "Great for romantic, emotional, or nostalgic tones"
      ]
    },
    {
      name: "Noakhali",
      contexts: [
        "Fast, funny, and full of charm",
        "Digitally underrepresented but culturally iconic",
        "Ideal for comic timing and punchline reels"
      ]
    },
    {
      name: "Rangpuri",
      contexts: [
        "Rooted in folk riddles, haat bazaar life",
        "Smooth tone, warm rhythm",
        "Strong emotional bonding potential"
      ]
    },
    {
      name: "Khulnai Dialect",
      contexts: [
        "Delta-born, rustic and powerful",
        "Unique blend of Bangla + Urdu loanwords",
        "Great for natural world narratives and regional myths"
      ]
    },
    {
      name: "Barisali",
      contexts: [
        "Lyrical, animated, and full of character",
        "Strong vowel shifts, unique cadence",
        "Often parodied — rarely preserved"
      ]
    },
    {
      name: "Comilla Dialect",
      contexts: [
        "Mixed tone with Tripura influences",
        "Soft-spoken, elder-generation storytelling",
        "Great for cross-border cultural memory mapping"
      ]
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl text-ink">Voices in Need of Adoption</h2>
        <p className="text-lg font-light text-ink/70 max-w-3xl mx-auto">
          These are not just dialects. They are living memories, musical patterns, and emotional blueprints of our people.
          Help us preserve them — one voice at a time.
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dialects.map((dialect) => (
          <DialectCard 
            key={dialect.name}
            name={dialect.name}
            contexts={dialect.contexts}
          />
        ))}
      </div>
    </section>
  );
};

export default VoicesSection;
