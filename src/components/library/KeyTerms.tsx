
const KeyTerms = () => {
  return (
    <section className="space-y-8">
      <h2 className="font-serif text-3xl md:text-4xl text-ink">Key Terms</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-ink">Dialect Drift</h3>
            <p className="font-light text-ink/70 text-sm">
              The gradual change in how a dialect is spoken across generations, 
              often accelerated by digital communication.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-ink">Emotional Accuracy</h3>
            <p className="font-light text-ink/70 text-sm">
              The preservation of feeling and cultural context in language, 
              beyond literal translation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-ink">Voice Layers</h3>
            <p className="font-light text-ink/70 text-sm">
              Local language models that can be overlaid on existing AI 
              to add cultural and emotional context.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-ink">Memory Encoding</h3>
            <p className="font-light text-ink/70 text-sm">
              The process of preserving not just words, but the way they're 
              said, the pauses, the emotional weight.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-ink">Cultural Phonetics</h3>
            <p className="font-light text-ink/70 text-sm">
              How sound patterns carry cultural meaning beyond their 
              linguistic definition.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-ink">Oral Archive</h3>
            <p className="font-light text-ink/70 text-sm">
              A collection of spoken language that preserves context, 
              emotion, and cultural significance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyTerms;
