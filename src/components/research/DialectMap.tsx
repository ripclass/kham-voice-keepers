import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DialectMap = () => {
  const dialects = [
    { name: "Sylheti", region: "Bangladesh/India", status: "recording", color: "bg-terracotta/20 text-terracotta" },
    { name: "Chittagonian", region: "Bangladesh", status: "training", color: "bg-dusty/20 text-dusty" },
    { name: "Noakhali", region: "Bangladesh", status: "recording", color: "bg-terracotta/20 text-terracotta" },
    { name: "Mymensingh", region: "Bangladesh", status: "recording", color: "bg-terracotta/20 text-terracotta" },
    { name: "Rangpuri", region: "Bangladesh/India", status: "recording", color: "bg-terracotta/20 text-terracotta" },
    { name: "Bhojpuri", region: "India", status: "training", color: "bg-dusty/20 text-dusty" }
  ];

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl text-ink">
          The Dialect Map
        </h2>
        <p className="text-ink/70 font-light">
          A visual index of dialects KhaM is archiving — with real-time status updates.
        </p>
      </div>
      
      <Card className="border-ink/10">
        <CardHeader>
          <CardTitle className="text-xl font-serif text-ink">
            Currently Tracking: {dialects.length} Dialects
          </CardTitle>
          <CardDescription>
            Status Legend: Recording → Training → Ready → Sponsored
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dialects.map((dialect, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-ink/10 rounded-lg hover:border-ink/20 transition-all">
                <div className="space-y-1">
                  <h3 className="font-medium text-ink">{dialect.name}</h3>
                  <p className="text-sm text-ink/60">{dialect.region}</p>
                </div>
                <Badge className={`text-xs capitalize ${dialect.color}`}>
                  {dialect.status}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-ink/5 rounded-lg">
            <p className="text-sm text-ink/70 text-center">
              Interactive map visualization coming soon. Each dialect will show collection progress, 
              sample recordings, and cultural context.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DialectMap;
