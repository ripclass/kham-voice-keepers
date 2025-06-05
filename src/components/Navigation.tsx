import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/voices", label: "Voices" },
    { path: "/collab", label: "Collab" },
    { path: "/library", label: "Library" },
    { path: "/roadmap", label: "Roadmap" },
    { path: "/team", label: "Origin" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-paper/95 backdrop-blur-sm border-b border-ink/10 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl text-ink hover:text-terracotta transition-colors">
            KhaM
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-light transition-colors ${
                  location.pathname === item.path
                    ? "text-terracotta"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu placeholder - keeping simple for now */}
          <div className="md:hidden">
            <Link to="/collab" className="text-sm text-terracotta font-light">
              Support
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
