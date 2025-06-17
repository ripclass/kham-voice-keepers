
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, University } from "lucide-react";

const ResearchContact = () => {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl text-ink">
          Research Partnerships
        </h2>
        <p className="text-ink/70 font-light">
          Collaborate with KhaM on linguistic AI research and cultural preservation.
        </p>
      </div>
      
      <Card className="border-terracotta/20 bg-terracotta/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <University className="w-6 h-6 text-terracotta" />
            <CardTitle className="text-xl font-serif text-ink">
              Academic & Research Collaboration
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-ink/70 text-base leading-relaxed">
            If you're a university, research lab, cultural archive, or organization working on linguistic AI, 
            we'd love to explore collaboration opportunities. We're particularly interested in:
          </CardDescription>
          
          <ul className="space-y-2 text-ink/70 ml-4">
            <li>• Joint research on South Asian dialectal AI</li>
            <li>• Shared dataset development and annotation</li>
            <li>• Cultural linguistics and emotion recognition studies</li>
            <li>• Open-source tool development for linguistic research</li>
          </ul>
          
          <div className="pt-4">
            <Button 
              className="bg-terracotta hover:bg-terracotta/90 text-paper font-medium"
              onClick={() => window.open('mailto:ripon@khamlabs.org?subject=Research Partnership Inquiry', '_blank')}
            >
              <Mail className="w-4 h-4 mr-2" />
              ripon@khamlabs.org
            </Button>
            <p className="text-sm text-ink/60 mt-3">
              Include "Research Partnership" in your subject line for priority review.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResearchContact;
