import SystemHeaderNav from "@/components/system/SystemHeaderNav";
import { Helmet } from "react-helmet-async";
import ResearchHero from "@/components/research/ResearchHero";
import FeaturedPapers from "@/components/research/FeaturedPapers";
import DialectMap from "@/components/research/DialectMap";
import ContributeResearch from "@/components/research/ContributeResearch";
import ExternalResources from "@/components/research/ExternalResources";
import ResearchContact from "@/components/research/ResearchContact";
import SystemSection from "@/components/system/SystemSection";

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

      <div className="min-h-screen bg-paper text-ink dark:bg-background dark:text-paper">
        <SystemHeaderNav />

        <main className="pt-8 pb-20 px-4 md:px-6">
          {/* Module identity strip */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="flex items-center gap-3 opacity-60">
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-paper/70">KhaM</span>
              <span className="font-tech text-[10px] text-ink/40 dark:text-paper/40">•</span>
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-paper/70">Research</span>
              <div className="flex-1 border-t border-dashed border-ink/30 dark:border-paper/30" />
              <span className="font-tech text-[10px] uppercase tracking-[0.16em] text-ink/50 dark:text-paper/50">Open Publication</span>
            </div>
          </div>

          {/* Main framed content */}
          <div className="max-w-4xl mx-auto kham-frame">
            {/* Page header */}
            <header className="p-4 md:p-6 border-b border-dashed border-ink/20 dark:border-paper/20">
              <h1 className="font-tech uppercase tracking-[0.08em] text-2xl md:text-4xl text-ink dark:text-white">
                Research
              </h1>
              <p className="font-display mt-2 text-sm md:text-base text-ink/75 dark:text-paper/75">
                Researching emotion. Preserving language. Building memory.
              </p>
            </header>

            {/* Research Hero sub-section */}
            <div className="p-4 md:p-6 border-b border-dashed border-ink/15 dark:border-paper/15">
              <ResearchHero />
            </div>

            {/* Featured Papers */}
            <div className="p-4 md:p-6 space-y-5">
              <SystemSection
                title="Featured Papers"
                description="Published and in-progress academic work."
              >
                <FeaturedPapers />
              </SystemSection>

              {/* Dialect Map */}
              <SystemSection
                title="Dialect Map"
                description="Geographic distribution of languages and dialect clusters in scope."
              >
                <DialectMap />
              </SystemSection>

              {/* Contribute */}
              <SystemSection
                title="Contribute Research"
                description="How to participate in KhaM's research programs."
              >
                <ContributeResearch />
              </SystemSection>

              {/* External Resources */}
              <SystemSection
                title="External Resources"
                description="Curated external references and prior art."
              >
                <ExternalResources />
              </SystemSection>

              {/* Contact */}
              <SystemSection
                title="Research Contact"
                description="Get in touch with the KhaM research team."
              >
                <ResearchContact />
              </SystemSection>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-ink/20 dark:border-paper/20 bg-ink dark:bg-background py-12 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-3 opacity-60 mb-4">
              <div className="w-10 h-px bg-paper/60" />
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-paper/70">KhaM Labs · Research</span>
              <div className="flex-1 border-t border-dashed border-paper/30" />
            </div>
            <blockquote className="font-news text-xl md:text-2xl text-paper/90 italic">
              "Research is remembrance.<br />Memory is methodology."
            </blockquote>
            <p className="font-tech text-[11px] uppercase tracking-[0.12em] text-paper/50 pt-2">
              © KhaM Labs · ripon@khamlabs.org
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Research;
