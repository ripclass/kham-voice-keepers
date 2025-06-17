
const AboutSection = () => {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-ink mb-12">
          Who We Are
        </h2>
        
        <div className="space-y-8">
          <p className="text-lg md:text-xl font-light leading-relaxed text-ink/80">
            KhaM is a cultural AI lab based in South Asia.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed text-ink/70">
            We work with rural communities, AI researchers, linguists, and storytellers to preserve memory through voice — not in books, but in sound.
          </p>
          <p className="text-xl md:text-2xl font-light leading-relaxed text-ink/90 pt-4">
            A future that speaks like us… starts with you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
