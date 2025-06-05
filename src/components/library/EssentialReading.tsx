
const EssentialReading = () => {
  return (
    <section className="space-y-8">
      <h2 className="font-serif text-3xl md:text-4xl text-ink">Essential Reading</h2>
      
      <div className="space-y-6">
        <article className="border-b border-ink/20 pb-6">
          <h3 className="text-xl font-medium text-ink mb-2">
            "Emotion in South Asian Languages: Beyond Translation"
          </h3>
          <p className="font-light text-ink/70 mb-3">
            A survey of emotional nuance that gets lost in current AI models.
          </p>
          <p className="text-sm text-terracotta italic">
            Paper in progress • Expected publication: Q2 2025
          </p>
        </article>

        <article className="border-b border-ink/20 pb-6">
          <h3 className="text-xl font-medium text-ink mb-2">
            <a href="https://www.ethnologue.com/" target="_blank" rel="noopener noreferrer" 
               className="hover:text-terracotta transition-colors">
              Ethnologue: Languages of the World →
            </a>
          </h3>
          <p className="font-light text-ink/70">
            Comprehensive reference for world languages and their endangered status.
          </p>
        </article>

        <article className="border-b border-ink/20 pb-6">
          <h3 className="text-xl font-medium text-ink mb-2">
            <a href="https://en.wikipedia.org/wiki/Linguistic_landscape" target="_blank" rel="noopener noreferrer"
               className="hover:text-terracotta transition-colors">
              Language Landscape Research →
            </a>
          </h3>
          <p className="font-light text-ink/70">
            How languages exist in physical and digital spaces.
          </p>
        </article>
      </div>
    </section>
  );
};

export default EssentialReading;
