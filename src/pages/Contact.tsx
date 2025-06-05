
import Navigation from "@/components/Navigation";
import { Helmet } from 'react-helmet';


const Contact = () => {
  return (
    <Helmet>
  <title>Contact – Reach Out to KhaM</title>
  <meta name="description" content="Want to collaborate, ask questions, or support the project? Reach out to the KhaM team directly." />
  <meta property="og:title" content="Contact – Reach Out to KhaM" />
  <meta property="og:description" content="Let’s talk. We’re open to collaboration, questions, and support." />
  <meta property="og:url" content="https://khamlabs.org/contact" />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>

    <div className="min-h-screen bg-paper text-ink">
      <Navigation />
      
      <div className="pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto space-y-16 text-center">
          
          {/* Header */}
          <div className="space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl text-ink">
              Let's talk
            </h1>
            <p className="text-lg md:text-xl font-light text-ink/80">
              This work is better when it's collaborative.
            </p>
          </div>

          {/* Contact Info */}
          <section className="space-y-8">
            <div className="bg-muted/20 p-12 space-y-6">
              <h2 className="font-serif text-2xl text-ink">Write to me</h2>
              <p className="text-2xl font-light text-terracotta">
                <a href="mailto:ripon@khamlabs.org" 
                   className="hover:text-terracotta/80 transition-colors">
                  ripon@khamlabs.org
                </a>
              </p>
              <p className="text-lg font-light text-ink/70">
                I read every message. I respond to all serious inquiries.
              </p>
            </div>
          </section>

          {/* What to write about */}
          <section className="space-y-8">
            <h3 className="font-serif text-xl text-ink">Good reasons to reach out:</h3>
            
            <div className="text-left space-y-4 text-lg font-light text-ink/80">
              <p>• You want to collaborate on voice preservation</p>
              <p>• You have linguistic expertise in South Asian languages</p>
              <p>• You're working on similar cultural AI projects</p>
              <p>• You have voices you'd like to help preserve</p>
              <p>• You want to support this work financially</p>
              <p>• You just want to share your story about language and family</p>
            </div>
          </section>

          {/* Closing */}
          <section className="space-y-6 pt-8">
            <p className="text-lg font-light text-ink/70 italic">
              "Every email is a conversation.<br />
              Every conversation matters."
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

export default Contact;
