
import SystemHeaderNav from "@/components/system/SystemHeaderNav";
import { Helmet } from "react-helmet-async";
import SupportHeader from "@/components/support/SupportHeader";
import WhyItMatters from "@/components/support/WhyItMatters";
import IndividualSupport from "@/components/support/IndividualSupport";
import BrandSupport from "@/components/support/BrandSupport";
import VoicesSection from "@/components/support/VoicesSection";
import OtherSupport from "@/components/support/OtherSupport";
import SupportFooter from "@/components/support/SupportFooter";

const Support = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Support KhaM – Adopt a Dialect, Keep It Alive",
    "url": "https://khamlabs.org/support",
    "description": "Support KhaM's mission to preserve endangered South Asian dialects and voices. Adopt a dialect, become a brand partner, or help preserve endangered languages through our cultural preservation initiative.",
    "mainEntity": {
      "@type": "Organization",
      "name": "KhaM Labs",
      "url": "https://khamlabs.org",
      "description": "KhaM is a South Asian cultural AI lab preserving memory through voice and dialect preservation",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "ripon@khamlabs.org",
        "contactType": "Customer Service"
      }
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Adopt a Voice - Individual Support",
        "price": "5.00",
        "priceCurrency": "USD",
        "description": "Monthly contribution to preserve a South Asian dialect"
      },
      {
        "@type": "Offer", 
        "name": "Voice Supporter - Brand Partnership",
        "price": "2000.00",
        "priceCurrency": "USD",
        "description": "Sponsor 1 dialect's voice model with co-branded content"
      },
      {
        "@type": "Offer",
        "name": "Cultural Partner - Brand Partnership", 
        "price": "10000.00",
        "priceCurrency": "USD",
        "description": "Comprehensive cultural partnership with custom content"
      },
      {
        "@type": "Offer",
        "name": "Cultural Guardian - Brand Partnership",
        "price": "25000.00", 
        "priceCurrency": "USD",
        "description": "Premium partnership with high-production content and events"
      }
    ],
    "keywords": "South Asian dialect preservation, voice AI sponsorship, cultural memory project, endangered language support, Bangla dialect adoption, Hindi voice models, linguistic diversity funding",
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
          "name": "Support",
          "item": "https://khamlabs.org/support"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Support KhaM – Adopt a Dialect, Keep It Alive | Preserve South Asian Voices</title>
        <meta name="description" content="Support KhaM's mission to preserve endangered South Asian dialects and voices. Adopt a dialect for $5/month, become a brand partner, or help preserve linguistic diversity through our cultural AI initiative." />
        <meta name="keywords" content="support KhaM, adopt dialect, South Asian languages, voice preservation, cultural sponsorship, endangered dialects, Bangla voice models, Hindi AI voices, linguistic diversity, cultural AI funding, dialect adoption program" />
        
        {/* Enhanced Open Graph tags */}
        <meta property="og:title" content="Support KhaM – Adopt a Dialect, Keep It Alive" />
        <meta property="og:description" content="Every voice matters. Every dialect is a memory. Support KhaM's mission to preserve and amplify the emotional languages of South Asia through our dialect adoption program." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org/support" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-support.jpg" />
        <meta property="og:image:alt" content="KhaM Support - Preserve South Asian Dialects" />
        <meta property="og:site_name" content="KhaM Labs" />
        <meta property="og:locale" content="en_US" />
        
        {/* Enhanced Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@khamlabs" />
        <meta name="twitter:title" content="Support KhaM – Adopt a Dialect, Keep It Alive" />
        <meta name="twitter:description" content="Support KhaM's mission to preserve South Asian dialects and voices through adoption, partnership, or donation. Every contribution preserves cultural memory." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-support.jpg" />
        <meta name="twitter:image:alt" content="KhaM Support - Preserve South Asian Dialects" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://khamlabs.org/support" />
        <meta name="author" content="KhaM Labs" />
        <meta name="language" content="en" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Additional structured data for nonprofit organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            "name": "KhaM Labs",
            "alternateName": "KhaM",
            "url": "https://khamlabs.org",
            "logo": "https://khamlabs.org/lovable-uploads/5aa78c8b-ada8-4093-a72f-4dbca14e687b.png",
            "description": "Cultural AI lab preserving South Asian dialects and voices through technology and community support",
            "foundingDate": "2024",
            "missionCoverageTier": "Regional",
            "nonprofitStatus": "NonprofitType",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "ripon@khamlabs.org",
              "contactType": "Customer Service",
              "availableLanguage": ["English", "Bengali", "Hindi"]
            },
            "areaServed": {
              "@type": "Place",
              "name": "South Asia"
            },
            "knowsAbout": ["Language Preservation", "AI Voice Technology", "Cultural Heritage", "Dialect Documentation"],
            "sameAs": [
              "https://twitter.com/khamlabs",
              "https://github.com/khamlabs"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <SystemHeaderNav />
        
        <main className="pt-8 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-16">
            <SupportHeader />
            <WhyItMatters />

            <section className="space-y-12">
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Ways to Help
              </h2>
              
              <div className="space-y-12">
                <IndividualSupport />
                <BrandSupport />
              </div>
            </section>

            <VoicesSection />
            <OtherSupport />
            <SupportFooter />
          </div>
        </main>

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
    </>
  );
};

export default Support;
