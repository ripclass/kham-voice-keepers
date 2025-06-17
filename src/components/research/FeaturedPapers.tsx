
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowRight } from "lucide-react";

const FeaturedPapers = () => {
  const [isAbstractOpen, setIsAbstractOpen] = useState(false);

  const featuredPaper = {
    title: "Emotion in South Asian Languages: Beyond Translation",
    type: "Whitepaper",
    status: "🔜 Q2 2025",
    statusType: "upcoming",
    description: "Abstract available",
    abstract: "South Asian languages are not just multilingual — they are emotionally polyphonic. A single word can carry affection, frustration, reverence, or rebellion depending on dialect, tone, and social context. This research explores the nuanced ways emotional expression manifests across different South Asian languages, moving beyond simple translation to understand cultural and linguistic factors that influence emotional communication in AI systems.",
    fullAbstract: "South Asian languages are not just multilingual — they are emotionally polyphonic. A single word can carry affection, frustration, reverence, or rebellion depending on dialect, tone, and social context.",
    link: "/research/emotion-paper"
  };

  const otherPapers = [
    {
      title: "Building Dialect-Aware Voice Agents",
      type: "Technical Note",
      status: "🔄 In Progress",
      statusType: "progress",
      description: "Working draft available",
      abstract: "Technical approaches to training voice models that understand and respond to dialectal variations in South Asian languages."
    },
    {
      title: "Cultural Code-Switching in South Asian Youth Speech",
      type: "Case Study",
      status: "🧪 Beta Interviews Underway",
      statusType: "research",
      description: "Early findings available",
      abstract: "Investigating how young South Asians switch between languages and dialects in digital communication."
    }
  ];

  const getStatusColor = (statusType: string) => {
    switch (statusType) {
      case "upcoming": return "bg-dusty/20 text-dusty";
      case "progress": return "bg-terracotta/20 text-terracotta";
      case "research": return "bg-ink/20 text-ink";
      default: return "bg-ink/20 text-ink";
    }
  };

  const allPapers = [featuredPaper, ...otherPapers];

  return (
    <section className="space-y-8">
      <h2 className="font-serif text-3xl md:text-4xl text-ink">
        Featured Papers & Abstracts
      </h2>
      
      <div className="space-y-6">
        {allPapers.map((paper, index) => (
          <Card key={index} className="border-ink/10 hover:border-ink/20 transition-all duration-300">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-serif text-ink">
                    {paper.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {paper.type}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(paper.statusType)}`}>
                      {paper.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-ink/70 leading-relaxed">
                {paper.abstract}
              </CardDescription>
              <p className="text-sm text-terracotta font-medium">
                {paper.description}
              </p>
              
              {paper.link && index === 0 && (
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
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
                            {paper.fullAbstract}
                          </p>
                          <p className="text-ink/70 leading-relaxed">
                            This research explores the nuanced ways emotional expression manifests across different South Asian languages, moving beyond simple translation to understand cultural and linguistic factors that influence emotional communication in AI systems.
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Link 
                    to={paper.link}
                    className="inline-flex items-center gap-2 text-ink hover:text-terracotta transition-colors font-medium underline decoration-ink/40 hover:decoration-terracotta"
                  >
                    <span>Read Full Paper</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPapers;
