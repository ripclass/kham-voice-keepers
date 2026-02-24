import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CrisisResponse = {
  scenario: {
    country: string;
    crisis_type: string;
    nationals_affected: number;
  };
  condition_yellow: string[];
  condition_orange: string[];
  condition_red: string[];
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://kham-pilot-api.onrender.com";

export default function PilotCrisisPlanner() {
  const [country, setCountry] = useState("Jordan");
  const [crisisType, setCrisisType] = useState("civil_unrest");
  const [nationalsAffected, setNationalsAffected] = useState(50000);
  const [resources, setResources] = useState("2 vehicles, 12 staff, hotline");
  const [localConditions, setLocalConditions] = useState("Intermittent telecom and roadblocks in two districts.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CrisisResponse | null>(null);

  const generatePlan = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const embassyResources = resources
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch(`${API_BASE}/api/crisis/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country,
          crisis_type: crisisType,
          nationals_affected: nationalsAffected,
          embassy_resources: embassyResources,
          local_conditions: localConditions,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Request failed (${res.status}): ${txt}`);
      }

      const json = (await res.json()) as CrisisResponse;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navigation />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-serif text-4xl mb-2">Pilot: Consular Crisis Response Planner</h1>
        <p className="text-ink/70 mb-8">Private pilot route for internal demos.</p>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Scenario Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
            <Input value={crisisType} onChange={(e) => setCrisisType(e.target.value)} placeholder="Crisis type" />
            <Input
              type="number"
              value={nationalsAffected}
              onChange={(e) => setNationalsAffected(Number(e.target.value))}
              placeholder="Nationals affected"
            />
            <Input
              value={resources}
              onChange={(e) => setResources(e.target.value)}
              placeholder="Resources (comma separated)"
            />
            <Textarea
              value={localConditions}
              onChange={(e) => setLocalConditions(e.target.value)}
              placeholder="Local conditions"
              className="min-h-28"
            />
            <Button onClick={generatePlan} disabled={loading}>
              {loading ? "Generating..." : "Generate Response Plan"}
            </Button>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </CardContent>
        </Card>

        {data && (
          <Card>
            <CardHeader>
              <CardTitle>
                Plan: {data.scenario.country} / {data.scenario.crisis_type}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Nationals affected:</strong> {data.scenario.nationals_affected}</p>

              <div>
                <h3 className="font-semibold mb-2">Condition Yellow</h3>
                <ul className="list-disc pl-5 space-y-1">{data.condition_yellow.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Condition Orange</h3>
                <ul className="list-disc pl-5 space-y-1">{data.condition_orange.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Condition Red</h3>
                <ul className="list-disc pl-5 space-y-1">{data.condition_red.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
