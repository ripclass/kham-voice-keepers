
const WhyMattersSection = () => {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="font-serif text-3xl md:text-4xl text-ink">Why This Matters</h2>
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
      </div>
    </section>
  );
};

export default WhyMattersSection;
