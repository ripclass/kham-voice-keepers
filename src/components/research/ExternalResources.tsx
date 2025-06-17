
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const ExternalResources = () => {
  const resources = [
    {
      name: "Ethnologue",
      description: "Comprehensive reference for languages of Bangladesh, India, and South Asia",
      url: "https://www.ethnologue.com/subgroups/indo-aryan-30",
      category: "Language Database"
    },
    {
      name: "UNESCO Atlas of Languages in Danger",
      description: "Global reference for endangered languages including South Asian dialects",
      url: "http://www.unesco.org/languages-atlas/",
      category: "Preservation"
    },
    {
      name: "Papers With Code: Speech Emotion Recognition",
      description: "Latest research and benchmarks in speech emotion recognition",
      url: "https://paperswithcode.com/task/speech-emotion-recognition",
      category: "Technical Research"
    },
    {
      name: "OpenSLR",
      description: "Open speech and language resources for inspiration and benchmarking",
      url: "https://openslr.org/",
      category: "Speech Resources"
    }
  ];

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl text-ink">
          External Resources We Rely On
        </h2>
        <p className="text-ink/70 font-light">
          Key databases, research platforms, and resources that inform our work.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="border-ink/10 hover:border-ink/20 transition-all duration-300 group cursor-pointer">
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block h-full"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg font-serif text-ink group-hover:text-terracotta transition-colors">
                      {resource.name}
                    </CardTitle>
                    <div className="text-xs text-terracotta font-medium uppercase tracking-wide">
                      {resource.category}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-ink/40 group-hover:text-terracotta transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-ink/70">
                  {resource.description}
                </CardDescription>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ExternalResources;
