
import { Button } from "@/components/ui/button";

const OtherSupport = () => {
  return (
    <section className="space-y-8">
      <h2 className="font-serif text-3xl md:text-4xl text-ink">Other Ways to Support</h2>
      <div className="space-y-4 text-lg font-light text-ink/80">
        <p>• Volunteer with our voice recording team</p>
        <p>• Help us transcribe dialect stories</p>
        <p>• Donate — every dollar keeps a voice alive</p>
      </div>
      <Button 
        asChild
        className="bg-terracotta hover:bg-terracotta/90 text-paper rounded-none"
        aria-label="Write to us"
      >
        <a 
          href="mailto:ripon@khamlabs.org?subject=General%20Support%20Inquiry"
          target="_blank"
          rel="noopener noreferrer"
        >
          Write to Us →
        </a>
      </Button>
    </section>
  );
};

export default OtherSupport;
