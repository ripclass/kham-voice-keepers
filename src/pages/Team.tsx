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
                    I grew up in Chittagong. The language I spoke at home—Chatgayaan—wasn't considered real. 
                    It had no script. No books. No prestige. So we were taught to hide it. To speak "proper" Bangla. 
                    To translate ourselves to be accepted.
                  </p>
                  
                  <p className="text-ink/80">
                    But Chatgayaan was how my mother loved me. It was how neighbors joked, how elders prayed, 
                    how loss and joy were carried in voice, not grammar.
                  </p>

                  <p className="text-ink/80">
                    Over time, I learned Bangla, Hindi, and English too. But none of them could replace that feeling—the 
                    exact warmth of my mother saying (K)Haiiu na? ("Eaten yet?"), or the way someone older said my name.
                  </p>

                  <p className="text-ink/70">
                    I'm a filmmaker, a writer, and a builder. I've made a lot of things. But none of them felt like home.
                    KhaM started when I realized: if we don't preserve this—not the dictionary, but the tone—we'll lose more than language.
                    We'll lose the way we were loved.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-muted/20 p-6 space-y-4">
                  <h3 className="font-serif text-xl text-ink">Background</h3>
                  <div className="space-y-2 text-sm font-light text-ink/70">
                    <p>Filmmaker, writer, and solo builder</p>
                    <p>Deep storytelling + product strategy roots</p>
                    <p>Native Bengali speaker, fluent in Hindi, Urdu, and English</p>
                    <p>Grew up in Chittagong, Bangladesh</p>
                    <p>Currently based in Dhaka</p>
                    <p>Self-taught coder, rebuilding technical skills hands-on</p>
                    <p>Working across AI, culture, and memory infrastructure</p>
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
