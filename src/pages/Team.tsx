
import Navigation from "@/components/Navigation";

const Team = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navigation />
      
      <div className="pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl text-ink">
              Origin
            </h1>
            <p className="text-lg md:text-xl font-light text-ink/80 max-w-2xl mx-auto">
              Why this work is personal, and why it matters now.
            </p>
          </div>

          {/* About Ripon */}
          <section className="space-y-8">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                <h2 className="font-serif text-3xl text-ink">About Ripon</h2>
                
                <div className="space-y-6 text-lg font-light leading-relaxed">
                  <p className="text-ink/90">
                    I grew up hearing three languages at home: Bangla, Hindi, and English. 
                    But it wasn't just three languages—it was three ways of feeling, 
                    three different temperatures of love.
                  </p>
                  
                  <p className="text-ink/80">
                    When my mother says "khub bhalo" (very good), there's a specific 
                    warmth that no English translation captures. When my father calls 
                    me "beta," it carries the weight of his entire migration story.
                  </p>

                  <p className="text-ink/80">
                    I'm a developer by trade, but I started KhaM when I realized that 
                    all the AI I was building could translate words but not feelings. 
                    It could convert languages but not love.
                  </p>

                  <p className="text-ink/70">
                    This project began the day I understood that when my parents 
                    are gone, the exact way they pronounce my name will disappear 
                    forever—unless we do something about it.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-muted/20 p-6 space-y-4">
                  <h3 className="font-serif text-xl text-ink">Background</h3>
                  <div className="space-y-2 text-sm font-light text-ink/70">
                    <p>Full-stack developer</p>
                    <p>AI/ML experience</p>
                    <p>Bengali/Hindi speaker</p>
                    <p>First-gen immigrant</p>
                    <p>Based in Toronto</p>
                  </div>
                </div>

                <div className="bg-muted/20 p-6 space-y-4">
                  <h3 className="font-serif text-xl text-ink">Contact</h3>
                  <div className="space-y-2 text-sm font-light text-ink/70">
                    <p>
                      <a href="mailto:ripclass@gmail.com" 
                         className="text-terracotta hover:text-terracotta/80 transition-colors">
                        ripclass@gmail.com
                      </a>
                    </p>
                    <p>Always open to conversation</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why this work is personal */}
          <section className="space-y-8">
            <h2 className="font-serif text-3xl text-ink">Why this matters now</h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-terracotta pl-8 space-y-4">
                <h3 className="text-xl font-medium text-ink">The urgency</h3>
                <p className="text-lg font-light text-ink/80 leading-relaxed">
                  Every older generation that passes takes with them not just words, 
                  but ways of being. The pause before my grandmother says "accha," 
                  the specific lilt when my aunt tells stories—these aren't just 
                  linguistic features. They're cultural DNA.
                </p>
              </div>

              <div className="border-l-4 border-dusty pl-8 space-y-4">
                <h3 className="text-xl font-medium text-ink">The gap</h3>
                <p className="text-lg font-light text-ink/80 leading-relaxed">
                  Current AI treats language like data to process rather than 
                  culture to preserve. We're building tools for efficiency, 
                  not tools for memory. KhaM is about building for the irreplaceable.
                </p>
              </div>

              <div className="border-l-4 border-terracotta pl-8 space-y-4">
                <h3 className="text-xl font-medium text-ink">The hope</h3>
                <p className="text-lg font-light text-ink/80 leading-relaxed">
                  Imagine AI that doesn't just translate "I love you" into Bengali, 
                  but knows the seventeen different ways Bengali expresses love, 
                  and which one your mother would use when you're homesick.
                </p>
              </div>
            </div>
          </section>

          {/* Future collaborators */}
          <section className="space-y-6">
            <h3 className="font-serif text-2xl text-ink">Growing the team</h3>
            
            <div className="bg-muted/20 p-8 space-y-4">
              <p className="text-lg font-light text-ink/80">
                Right now, it's just me and a dream. But I'm actively seeking:
              </p>
              
              <div className="space-y-3 text-lg font-light text-ink/70">
                <p>• Linguists specializing in South Asian languages</p>
                <p>• AI researchers focused on cultural preservation</p>
                <p>• Community organizers who understand oral traditions</p>
                <p>• Developers who code with care, not just speed</p>
              </div>
              
              <p className="text-lg font-light text-ink/70 italic pt-4">
                If any of this resonates, reach out. We'll build this together.
              </p>
            </div>
          </section>

          {/* Closing */}
          <section className="text-center space-y-6 pt-8">
            <blockquote className="font-serif text-2xl md:text-3xl text-ink italic">
              "This isn't about preserving the past.<br />
              It's about carrying love forward."
            </blockquote>
            <p className="text-lg font-light text-ink/70">
              — Ripon, founder of KhaM
            </p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-ink py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <blockquote className="font-serif text-2xl md:text-3xl text-paper/90 mb-8">
            "KhaM is not a product.<br />It's a promise."
          </blockquote>
          
          <p className="text-paper/70 font-light">
            © KhaM Labs · ripon@khamlabs.org
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Team;
