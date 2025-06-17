
import { Button } from "@/components/ui/button";

const BrandSupport = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-serif text-2xl text-ink">For Brands & Institutions</h3>
        <p className="text-lg font-light text-ink/80">
          Partner with KhaM to protect language, deepen regional trust, and solve real CX problems — all while leaving a cultural legacy.
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Tier 1 */}
        <div className="border border-ink/20 p-8 space-y-4">
          <div className="space-y-2">
            <h4 className="font-serif text-xl text-ink">Tier 1: Voice Supporter</h4>
            <p className="text-2xl font-light text-terracotta">$2,000</p>
          </div>
          <div className="space-y-2 text-sm font-light text-ink/70">
            <p>• Sponsor 1 dialect's voice model</p>
            <p>• Co-branded storytelling content (3–5 reels)</p>
            <p>• Logo and brand mention on khamlabs.org</p>
            <p>• Social media and PR visibility</p>
            <p>• Usage rights for marketing</p>
          </div>
        </div>

        {/* Tier 2 */}
        <div className="border border-ink/20 p-8 space-y-4 bg-muted/10">
          <div className="space-y-2">
            <h4 className="font-serif text-xl text-ink">Tier 2: Cultural Partner</h4>
            <p className="text-2xl font-light text-terracotta">$10,000</p>
          </div>
          <div className="space-y-2 text-sm font-light text-ink/70">
            <p>• Everything in Tier 1</p>
            <p>• 10+ custom story videos in dialect</p>
            <p>• Dedicated landing page: "Voices from [Dialect], sponsored by [Brand]"</p>
            <p>• Optional co-branded dialect voice assistant</p>
            <p>• Behind-the-scenes impact content</p>
            <p>• First-mover visibility in regional cultural AI</p>
          </div>
        </div>

        {/* Tier 3 */}
        <div className="border border-ink/20 p-8 space-y-4 bg-muted/20">
          <div className="space-y-2">
            <h4 className="font-serif text-xl text-ink">Tier 3: Cultural Guardian</h4>
            <p className="text-2xl font-light text-terracotta">$25,000</p>
          </div>
          <div className="space-y-2 text-sm font-light text-ink/70">
            <p>• All features in Tiers 1 & 2</p>
            <p>• High-production hero film (60–90 sec)</p>
            <p>• On-ground cultural event (workshop, archive drive, or showcase)</p>
            <p>• Permanent credit in KhaM's cultural memory archive</p>
            <p>• Brand-integrated voice persona (usable in IVRs/chatbots)</p>
            <p>• PR and legacy storytelling across platforms</p>
          </div>
        </div>
      </div>
      
      <Button 
        asChild
        className="bg-terracotta hover:bg-terracotta/90 text-paper rounded-none"
        aria-label="Talk to us about partnership"
      >
        <a 
          href="mailto:ripon@khamlabs.org?subject=Dialect%20Sponsorship%20Inquiry"
          target="_blank"
          rel="noopener noreferrer"
        >
          Talk to Us →
        </a>
      </Button>
    </div>
  );
};

export default BrandSupport;
