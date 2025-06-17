
import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet-async";
import SupportHeader from "@/components/support/SupportHeader";
import WhyItMatters from "@/components/support/WhyItMatters";
import IndividualSupport from "@/components/support/IndividualSupport";
import BrandSupport from "@/components/support/BrandSupport";
import VoicesSection from "@/components/support/VoicesSection";
import OtherSupport from "@/components/support/OtherSupport";
import SupportFooter from "@/components/support/SupportFooter";

const Support = () => {
  return (
    <>
      <Helmet>
        <title>Support KhaM – Adopt a Dialect, Keep It Alive</title>
        <meta name="description" content="Support KhaM's mission to preserve South Asian dialects and voices. Adopt a dialect, become a brand partner, or help preserve endangered languages." />
        <meta name="keywords" content="support KhaM, adopt dialect, South Asian languages, voice preservation, cultural sponsorship, endangered dialects" />
        <meta property="og:title" content="Support KhaM – Adopt a Dialect, Keep It Alive" />
        <meta property="og:description" content="Every voice matters. Every dialect is a memory. Support KhaM's mission to preserve and amplify the emotional languages of South Asia." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org/support" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Support KhaM – Adopt a Dialect, Keep It Alive" />
        <meta name="twitter:description" content="Support KhaM's mission to preserve South Asian dialects and voices through adoption, partnership, or donation." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <link rel="canonical" href="https://khamlabs.org/support" />
        
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Support KhaM – Adopt a Dialect",
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
        
        <main className="pt-24 pb-20 px-6 md:px-12">
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
