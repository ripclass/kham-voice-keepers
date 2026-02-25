
import SystemHeaderNav from "@/components/system/SystemHeaderNav";
import { Helmet } from "react-helmet-async";
import LibraryHeader from "@/components/library/LibraryHeader";
import EssentialReading from "@/components/library/EssentialReading";
import KeyTerms from "@/components/library/KeyTerms";
import CommunityResources from "@/components/library/CommunityResources";
import ComingToLibrary from "@/components/library/ComingToLibrary";
import LibraryFooter from "@/components/library/LibraryFooter";

const Library = () => {
  return (
    <>
      <Helmet>
        <title>KhaM Library – Research, Resources, and Language Preservation Tools</title>
        <meta name="description" content="Explore research on emotional accuracy in AI, endangered language links, and community-contributed tools." />
        <meta name="keywords" content="research on South Asian languages, emotional accuracy in NLP, voice preservation in AI, cultural phonetics glossary, endangered language tools" />
        <meta property="og:title" content="KhaM Research Library – Cultural and AI Voice Tools" />
        <meta property="og:description" content="A living archive of references, glossaries, and open-source support for endangered dialects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org/library" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KhaM Library – Research, Resources, and Language Preservation Tools" />
        <meta name="twitter:description" content="Explore research on emotional accuracy in AI, endangered language links, and community-contributed tools." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <link rel="canonical" href="https://khamlabs.org/library" />
        
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "KhaM Library – Research & Resources",
            "url": "https://khamlabs.org/library",
            "description": "Research library for linguistic preservation, AI voice tools, and South Asian language resources",
            "isPartOf": {
              "@type": "Organization",
              "name": "KhaM",
              "url": "https://khamlabs.org"
            }
          }`}
        </script>
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <SystemHeaderNav />
        
        <main className="pt-8 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-16">
            <LibraryHeader />
            <EssentialReading />
            <KeyTerms />
            <CommunityResources />
            <ComingToLibrary />
          </div>
        </main>

        <LibraryFooter />
      </div>
    </>
  );
};

export default Library;
