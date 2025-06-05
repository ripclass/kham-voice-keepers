
const CommunityResources = () => {
  return (
    <section className="space-y-8">
      <h2 className="font-serif text-3xl md:text-4xl text-ink">Community Resources</h2>
      
      <div className="space-y-4">
        <div className="bg-muted/20 p-6 space-y-3">
          <h3 className="text-lg font-medium text-ink">
            <a href="https://mozilla.foundation/" target="_blank" rel="noopener noreferrer"
               className="hover:text-terracotta transition-colors">
              Mozilla Common Voice →
            </a>
          </h3>
          <p className="font-light text-ink/70 text-sm">
            Open source voice collection for underrepresented languages.
          </p>
        </div>

        <div className="bg-muted/20 p-6 space-y-3">
          <h3 className="text-lg font-medium text-ink">
            <a href="https://www.endangeredlanguages.com/" target="_blank" rel="noopener noreferrer"
               className="hover:text-terracotta transition-colors">
              Endangered Languages Project →
            </a>
          </h3>
          <p className="font-light text-ink/70 text-sm">
            Google's collaborative effort to preserve endangered languages worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommunityResources;
