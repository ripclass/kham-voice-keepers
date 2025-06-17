
import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet-async";
import ResearchHero from "@/components/research/ResearchHero";
import PaperDetails from "@/components/research/PaperDetails";
import FeaturedPapers from "@/components/research/FeaturedPapers";
import DialectMap from "@/components/research/DialectMap";
import ContributeResearch from "@/components/research/ContributeResearch";
import ExternalResources from "@/components/research/ExternalResources";
import ResearchContact from "@/components/research/ResearchContact";

const Research = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Research – KhaM Labs",
    "url": "https://khamlabs.org/research",
    "description": "KhaM's research into South Asian dialectal AI, emotion recognition, and cultural linguistics. Publishing papers on dialect-aware voice agents and emotional infrastructure for AI.",
    "mainEntity": {
      "@type": "Organization",
      "name": "KhaM Labs",
      "url": "https://khamlabs.org",
      "description": "South Asian cultural AI lab developing emotional infrastructure through dialect research and voice modeling"
    },
    "keywords": "South Asian linguistics research, dialect AI, emotion recognition, cultural linguistics, voice modeling, Bengali dialects, Hindi speech research, sociolinguistics AI",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://khamlabs.org"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Research",
          "item": "https://khamlabs.org/research"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Research – KhaM Labs | South Asian Dialectal AI & Emotion Recognition</title>
        <meta name="description" content="KhaM's research into South Asian dialectal AI, emotion recognition, and cultural linguistics. Publishing papers on dialect-aware voice agents and emotional infrastructure for AI in South Asia." />
        <meta name="keywords" content="South Asian linguistics research, dialect AI, emotion recognition, cultural linguistics, voice modeling, Bengali dialects, Hindi speech research, sociolinguistics AI, KhaM research papers" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Research – KhaM Labs | South Asian Dialectal AI Research" />
        <meta property="og:description" content="Researching emotion, preserving language, building memory. KhaM's academic work on South Asian dialectal AI and cultural linguistics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org/research" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-research.jpg" />
        <meta property="og:site_name" content="KhaM Labs" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@khamlabs" />
        <meta name="twitter:title" content="Research – KhaM Labs | South Asian Dialectal AI Research" />
        <meta name="twitter:description" content="Researching emotion, preserving language, building memory. KhaM's academic work on South Asian dialectal AI." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-research.jpg" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://khamlabs.org/research" />
        <meta name="author" content="KhaM Labs" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Navigation />
        
        <main className="pt-24 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-16">
            <ResearchHero />
            <PaperDetails />
            <FeaturedPapers />
            <DialectMap />
            <ContributeResearch />
            <ExternalResources />
            <ResearchContact />
          </div>
        </main>

        <footer className="w-full bg-ink py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <blockquote className="font-serif text-2xl md:text-3xl text-paper/90 mb-8">
              "Research is remembrance.<br />Memory is methodology."
            </blockquote>
            
            <p className="text-paper/70 font-light">
              © KhaM Labs · ripon@khamlabs.org
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Research;
