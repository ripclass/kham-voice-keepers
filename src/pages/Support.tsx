
import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet-async";
import SupportHero from "@/components/support/SupportHero";
import IndividualsSection from "@/components/support/IndividualsSection";
import BrandsSection from "@/components/support/BrandsSection";
import DialectsSection from "@/components/support/DialectsSection";
import AboutSection from "@/components/support/AboutSection";
import SupportFooter from "@/components/support/SupportFooter";

const Support = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Support KhaM: Voices Worth Keeping</title>
        <meta name="description" content="Support KhaM's mission to preserve South Asian dialects and voices. Adopt a dialect, volunteer, or become a brand partner to keep endangered languages alive." />
        <meta name="keywords" content="support KhaM, adopt dialect, South Asian languages, voice preservation, cultural sponsorship, endangered dialects" />
        <meta property="og:title" content="Support KhaM: Voices Worth Keeping" />
        <meta property="og:description" content="Whether you're an individual, brand, or institution — help keep South Asia's disappearing voices alive through KhaM." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org/support" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Support KhaM: Voices Worth Keeping" />
        <meta name="twitter:description" content="Support KhaM's mission to preserve South Asian dialects through adoption, partnership, or volunteering." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <link rel="canonical" href="https://khamlabs.org/support" />
        
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Support KhaM: Voices Worth Keeping",
            "url": "https://khamlabs.org/support",
            "description": "Support KhaM's mission to preserve endangered South Asian dialects and voices",
            "isPartOf": {
              "@type": "Organization",
              "name": "KhaM",
              "url": "https://khamlabs.org"
            }
          }`}
        </script>
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Navigation />
        
        <main>
          <SupportHero onScrollToSection={scrollToSection} />
          <IndividualsSection />
          <BrandsSection />
          <DialectsSection />
          <AboutSection />
        </main>

        <SupportFooter />
      </div>
    </>
  );
};

export default Support;
