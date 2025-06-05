
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="font-serif text-6xl md:text-8xl text-ink mb-6">404</h1>
          <p className="text-xl md:text-2xl font-light text-ink/80 mb-8">
            This page has disappeared, like a voice in the wind.
          </p>
          <a 
            href="/" 
            className="inline-block bg-terracotta hover:bg-terracotta/90 text-paper px-8 py-3 text-lg rounded-none border-0 font-light transition-colors"
          >
            Return Home →
          </a>
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

export default NotFound;
