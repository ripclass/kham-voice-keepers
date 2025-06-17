
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mic, Code, BookOpen } from "lucide-react";

const ContributeResearch = () => {
  const contributions = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Linguists & Ethnographers",
      description: "Academic researchers studying South Asian languages and cultural patterns"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Students of Sociolinguistics",
      description: "Graduate students and researchers exploring language in social contexts"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Open-Source AI Collaborators",
      description: "Developers working on speech recognition, NLP, and voice modeling"
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Dialect Speakers & Recorders",
      description: "Native speakers who can contribute authentic voice samples and cultural context"
    }
  ];

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl text-ink">
          Contribute to Research
        </h2>
        <p className="text-ink/70 font-light">
          Join our research community and help preserve South Asian linguistic heritage.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contributions.map((contribution, index) => (
          <Card key={index} className="border-ink/10 hover:border-terracotta/30 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="text-terracotta">
                  {contribution.icon}
                </div>
                <CardTitle className="text-lg font-serif text-ink">
                  {contribution.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-ink/70">
                {contribution.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center pt-6">
        <Button 
          className="bg-terracotta hover:bg-terracotta/90 text-paper font-medium px-8 py-3"
          onClick={() => window.open('mailto:ripon@khamlabs.org?subject=KhaM Research Circle Interest', '_blank')}
        >
          Join the KhaM Research Circle →
        </Button>
        <p className="text-sm text-ink/60 mt-3">
          We'll send you updates on research opportunities and collaboration calls.
        </p>
      </div>
    </section>
  );
};

export default ContributeResearch;
