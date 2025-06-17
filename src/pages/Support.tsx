
import Navigation from "@/components/Navigation";
import { Helmet } from "react-helmet-async";
import SupportHero from "@/components/support/SupportHero";
import IndividualsSection from "@/components/support/IndividualsSection";
import BrandsSection from "@/components/support/BrandsSection";
import DialectsSection from "@/components/support/DialectsSection";
import AboutSection from "@/components/support/AboutSection";
import WhyMattersSection from "@/components/support/WhyMattersSection";
import SupportOptionsSection from "@/components/support/SupportOptionsSection";
import FundingBreakdownSection from "@/components/support/FundingBreakdownSection";
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
        <title>Support KhaM – Help Preserve Disappearing Languages in AI</title>
        <meta name="description" content="Join the mission to preserve South Asian dialects. Support KhaM with a story, tool, or collaboration." />
        <meta name="keywords" content="support cultural AI, contribute to open-source language preservation, support South Asian AI project, collaborate on memory preservation, fund voice-based AI projects" />
        <meta property="og:title" content="Support KhaM – Build Memory Infrastructure Together" />
        <meta property="og:description" content="Help register KhaM and preserve emotional nuance in disappearing languages." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khamlabs.org/support" />
        <meta property="og:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Support KhaM – Help Preserve Disappearing Languages in AI" />
        <meta name="twitter:description" content="Join the mission to preserve South Asian dialects. Support KhaM with a story, tool, or collaboration." />
        <meta name="twitter:image" content="https://khamlabs.org/og/kham-main.jpg" />
        <link rel="canonical" href="https://khamlabs.org/support" />
      </Helmet>

      <div className="min-h-screen bg-paper text-ink">
        <Navigation />
        
        <main className="pt-24">
          <SupportHero onScrollToSection={scrollToSection} />
          <WhyMattersSection />
          <SupportOptionsSection />
          <IndividualsSection />
          <BrandsSection />
          <FundingBreakdownSection />
          <DialectsSection />
          <AboutSection />
          
          {/* Thank you closing */}
          <section className="py-20 px-6 md:px-12 text-center space-y-6 border-t border-ink/20">
            <div className="max-w-4xl mx-auto space-y-6">
              <blockquote className="font-serif text-2xl md:text-3xl text-ink italic">
                "Thank you for believing that some things<br />are too important to let disappear."
              </blockquote>
              <p className="text-lg font-light text-ink/70">
                Every contribution is a vote for memory over metrics.
              </p>
            </div>
          </section>
        </main>

        <SupportFooter />
      </div>
    </>
  );
};

export default Support;
