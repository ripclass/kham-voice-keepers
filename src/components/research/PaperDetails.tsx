
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const PaperDetails = () => {
  const [isAbstractOpen, setIsAbstractOpen] = useState(false);

  return (
    <section className="space-y-8">
      <Card className="border-terracotta/20 bg-terracotta/5">
        <CardHeader>
          <div className="space-y-4">
            <CardTitle className="font-serif text-2xl md:text-3xl text-ink leading-tight">
              Emotion in South Asian Languages: Beyond Translation
            </CardTitle>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-sm">
                Whitepaper
              </Badge>
              <Badge className="text-sm bg-dusty/20 text-dusty">
                🔜 Q2 2025
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-ink/80 leading-relaxed font-light">
            Exploring how emotional expression varies across South Asian languages and the implications for AI voice modeling.
          </p>
          
          <Collapsible open={isAbstractOpen} onOpenChange={setIsAbstractOpen}>
            <CollapsibleTrigger className="group flex items-center gap-2 text-terracotta hover:text-terracotta/80 transition-colors font-medium">
              <span className="underline decoration-terracotta/40 hover:decoration-terracotta transition-all">
                Abstract available
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAbstractOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="bg-paper border border-ink/10 rounded-lg p-6 space-y-4">
                <h4 className="font-serif text-lg text-ink mb-3">Abstract</h4>
                <div className="prose prose-ink max-w-none">
                  <p className="text-ink/70 leading-relaxed mb-4">
                    [Abstract content will be added here - this is a placeholder for the full abstract and introduction content that will be manually populated.]
                  </p>
                  <p className="text-ink/70 leading-relaxed">
                    This research explores the nuanced ways emotional expression manifests across different South Asian languages, moving beyond simple translation to understand cultural and linguistic factors that influence emotional communication in AI systems.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </section>
  );
};

export default PaperDetails;
