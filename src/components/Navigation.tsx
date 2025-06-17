
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/voices", label: "Voices" },
    { path: "/library", label: "Library" },
    { path: "/roadmap", label: "Roadmap" },
    { path: "/team", label: "Origin" },
    { path: "/support", label: "Support" },
    { path: "/research", label: "Research" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLinkClick = () => {
    setOpen(false);
  };

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
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="p-2">
                  <Menu className="h-6 w-6 text-ink" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-paper border-l border-ink/10">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`text-lg font-light transition-colors ${
                        location.pathname === item.path
                          ? "text-terracotta"
                          : "text-ink/70 hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
