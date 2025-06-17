
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Voices from "./pages/Voices";
import Library from "./pages/Library";
import Roadmap from "./pages/Roadmap";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Research from "./pages/Research";
import EmotionPaper from "./pages/EmotionPaper";
import DialectAgents from "./pages/DialectAgents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/voices" element={<Voices />} />
            <Route path="/library" element={<Library />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/team" element={<Team />} />
            <Route path="/support" element={<Support />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/emotion-paper" element={<EmotionPaper />} />
            <Route path="/research/dialect-agents" element={<DialectAgents />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
