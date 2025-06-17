import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DialectMap = () => {
  const dialects = [
    { name: "Dhakaiya / Faridpuri / Narayanganj", region: "Central Urban Belt", status: "🟡 Recording", statusText: "Field recording in progress" },
    { name: "Mymensingh / Manikganj", region: "Central-North", status: "🔄 Prepping Scripts", statusText: "Writing recording material, onboarding speakers" },
    { name: "Comilla", region: "South-Eastern Plains", status: "🟡 Recording", statusText: "Field recording in progress" },
    { name: "Noakhali", region: "Coastal South-East", status: "🟠 Training", statusText: "Audio aligned, model training underway" },
    { name: "Sylheti", region: "North-East (Sylhet, diaspora)", status: "🔴 In Fine-Tuning", statusText: "Emotion + rhythm layers in progress" },
    { name: "Pabna–Sirajganj", region: "Rajshahi transition zone", status: "⚪️ Coming Soon", statusText: "Scheduled for next round" },
    { name: "Standard Bangla", region: "National / Media", status: "✅ Ready (Baseline)", statusText: "Voice model baseline available" },
    { name: "Chittagonian / Chatgaya", region: "South-East Hills & Port", status: "🟠 Training", statusText: "Audio aligned, model training underway" },
    { name: "Rangpuri / Rajshahi / Bogra Cluster", region: "Northern Belt", status: "🟡 Recording", statusText: "Field recording in progress" },
    { name: "Barisali", region: "South-Central", status: "🟡 Recording", statusText: "Field recording in progress" },
    { name: "Khulnai", region: "South-West (Khulna–Bagerhat)", status: "🔄 Sourcing Speakers", statusText: "Writing recording material, onboarding speakers" },
    { name: "Comilla–Tripura Border", region: "Border Dialect Zone", status: "⚪️ Coming Soon", statusText: "Scheduled for next round" }
  ];

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl text-ink">
          The Dialect Map
        </h2>
        <p className="text-ink/70 font-light">
          A comprehensive index of South Asian dialects KhaM is documenting — with real-time status updates across the collection pipeline.
        </p>
      </div>
      
      <Card className="border-ink/10">
        <CardHeader>
          <CardTitle className="text-xl font-serif text-ink">
            Currently Tracking: {dialects.length} Dialects
          </CardTitle>
          <CardDescription>
            Real-time progress across field recording, training, and fine-tuning phases
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow className="border-ink/10">
                  <TableHead className="text-ink font-medium">Dialect / Cluster</TableHead>
                  <TableHead className="text-ink font-medium">Region Covered</TableHead>
                  <TableHead className="text-ink font-medium">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dialects.map((dialect, index) => (
                  <TableRow key={index} className="border-ink/10 hover:bg-ink/5 transition-colors">
                    <TableCell className="font-medium text-ink">{dialect.name}</TableCell>
                    <TableCell className="text-ink/70">{dialect.region}</TableCell>
                    <TableCell className="text-ink/80" title={dialect.statusText}>
                      {dialect.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {dialects.map((dialect, index) => (
              <div key={index} className="p-4 border border-ink/10 rounded-lg hover:border-ink/20 transition-all space-y-2">
                <div className="font-medium text-ink">{dialect.name}</div>
                <div className="text-sm text-ink/60">{dialect.region}</div>
                <div className="text-sm text-ink/80" title={dialect.statusText}>
                  {dialect.status}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-ink/5 rounded-lg space-y-3">
            <h4 className="font-medium text-ink">Status Key (Progression Order):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-ink/70">
              <div><span className="font-mono">⚪️</span> Coming Soon – Scheduled for next round</div>
              <div><span className="font-mono">🔄</span> Prepping Scripts – Writing recording material, onboarding speakers</div>
              <div><span className="font-mono">🟡</span> Recording – Field recording in progress</div>
              <div><span className="font-mono">🟠</span> Training – Audio aligned, model training underway</div>
              <div><span className="font-mono">🔴</span> In Fine-Tuning – Emotion + rhythm layers in progress</div>
              <div><span className="font-mono">✅</span> Ready – Voice model baseline available</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DialectMap;
