
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeaturedPapers = () => {
  const papers = [
    {
      title: "Emotion in South Asian Languages: Beyond Translation",
      type: "Whitepaper",
      status: "🔜 Q2 2025",
      statusType: "upcoming",
      description: "Abstract available",
      abstract: "Exploring how emotional expression varies across South Asian languages and the implications for AI voice modeling."
    },
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

  return (
    <section className="space-y-8">
      <h2 className="font-serif text-3xl md:text-4xl text-ink">
        Featured Papers & Abstracts
      </h2>
      
      <div className="space-y-6">
        {papers.map((paper, index) => (
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
            <CardContent>
              <CardDescription className="text-ink/70 leading-relaxed">
                {paper.abstract}
              </CardDescription>
              <p className="text-sm text-terracotta mt-3 font-medium">
                {paper.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPapers;
