import { type ChangeEvent, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { crisisConstraints, crisisTypes, missions } from "@/lib/pilotSeed";

type ModeUsed = "ai" | "fallback";
type RoleTask = { role: string; task: string };
type TimelinePhase = { phase: string; actions: string[] };

type CrisisResponse = {
  reference_no: string;
  generated_at: string;
  mode_used: ModeUsed;
  fallback_reason?: string;
  mission_location: string;
  crisis_type: string;
  nationals_affected: number;
  condition_yellow: string[];
  condition_orange: string[];
  condition_red: string[];
  role_assigned_tasks: RoleTask[];
  timeline: TimelinePhase[];
  communication_templates: string[];
  sitrep_template: string;
  assumptions_and_unknowns: string[];
  human_review_disclaimer: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://kham-pilot-api.onrender.com";

const readGroundingDoc = async (file: File): Promise<string> => {
  const filename = file.name.toLowerCase();
  if (!filename.endsWith(".txt") && !filename.endsWith(".pdf")) throw new Error("Only .txt and .pdf files are supported.");

  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/api/utils/extract-text`, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Extraction failed (${res.status})`);
  const json = (await res.json()) as { extracted_text: string };
  return json.extracted_text?.trim() || "";
};

export default function PilotCrisisPlanner() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [missionLocation, setMissionLocation] = useState(missions[2]);
  const [crisisType, setCrisisType] = useState(crisisTypes[0]);
  const [nationalsAffected, setNationalsAffected] = useState(50000);
  const [resources, setResources] = useState("2 mission vehicles, 12 staff, hotline, temporary shelter partner");
  const [localConditions, setLocalConditions] = useState("Intermittent telecom and roadblocks in two districts.");
  const [scenarioDocText, setScenarioDocText] = useState("");
  const [scenarioDocName, setScenarioDocName] = useState<string | null>(null);
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>(["Telecom outage", "Roadblocks"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CrisisResponse | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleConstraint = (value: string) => {
    setSelectedConstraints((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const handleScenarioDocUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await readGroundingDoc(file);
      setScenarioDocText(text);
      setScenarioDocName(file.name);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to read scenario document.");
      setScenarioDocText("");
      setScenarioDocName(null);
    }
  };

  const generatePlan = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const embassyResources = resources.split(",").map((s) => s.trim()).filter(Boolean);
      const res = await fetch(`${API_BASE}/api/crisis/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mission_location: missionLocation,
          crisis_type: crisisType,
          nationals_affected: nationalsAffected,
          embassy_resources: embassyResources,
          constraints: selectedConstraints,
          local_conditions: localConditions,
          scenario_doc_text: scenarioDocText || undefined,
        }),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setData((await res.json()) as CrisisResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-5">
        <Card className="border-ink/20">
          <CardContent className="py-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-ink/60">KhaM for GOV • INTERNAL PILOT USE ONLY</p>
              <h1 className="font-news text-2xl md:text-3xl">Consular Crisis Response Planner</h1>
            </div>
            <Button variant="outline" onClick={() => setDark((v) => !v)}>{dark ? "Light" : "Dark"}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-news text-xl">Mission Briefing</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-ink/70">Mission Location</label>
                <select className="w-full border rounded-md p-2 bg-background" value={missionLocation} onChange={(e) => setMissionLocation(e.target.value)}>{missions.map((m) => <option key={m}>{m}</option>)}</select>
              </div>
              <div>
                <label className="text-xs text-ink/70">Crisis Type</label>
                <select className="w-full border rounded-md p-2 bg-background" value={crisisType} onChange={(e) => setCrisisType(e.target.value)}>{crisisTypes.map((c) => <option key={c}>{c}</option>)}</select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-ink/70">Nationals Affected</label>
                <Input type="number" value={nationalsAffected} onChange={(e) => setNationalsAffected(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-xs text-ink/70">Resource Inventory (comma-separated)</label>
                <Input value={resources} onChange={(e) => setResources(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="text-xs text-ink/70">Constraints</label>
              <div className="grid grid-cols-2 gap-2 text-sm mt-1">
                {crisisConstraints.map((c) => (
                  <label key={c} className="flex items-center gap-2"><input type="checkbox" checked={selectedConstraints.includes(c)} onChange={() => toggleConstraint(c)} /> {c}</label>
                ))}
              </div>
            </div>

            <label className="text-xs text-ink/70">Local Conditions (30+ chars)</label>
            <Textarea value={localConditions} onChange={(e) => setLocalConditions(e.target.value)} className="min-h-24" />

            <label className="text-xs text-ink/70">Situation Brief Upload (.txt/.pdf)</label>
            <Input type="file" accept=".txt,.pdf,application/pdf,text/plain" onChange={(e) => void handleScenarioDocUpload(e)} />
            {scenarioDocName && <p className="text-xs text-ink/60">Attached: {scenarioDocName}</p>}

            <Button
              onClick={generatePlan}
              disabled={loading || resources.trim().length < 15 || localConditions.trim().length < 30 || selectedConstraints.length < 1}
              className="w-full md:w-auto"
            >
              {loading ? "Generating..." : "Generate Response Plan"}
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </CardContent>
        </Card>

        {data && (
          <Card>
            <CardHeader><CardTitle className="font-news text-xl">Operational Order Output</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex flex-wrap gap-3 items-center text-xs text-ink/70">
                <span>Ref: {data.reference_no}</span>
                <span>{new Date(data.generated_at).toLocaleString()}</span>
                <Badge variant={data.mode_used === "ai" ? "default" : "secondary"}>{data.mode_used.toUpperCase()}</Badge>
                {data.mode_used === "fallback" && data.fallback_reason && (
                  <span className="text-amber-600">reason: {data.fallback_reason}</span>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div><h3 className="font-semibold">Condition Yellow</h3><ul className="list-disc pl-5">{data.condition_yellow.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                <div><h3 className="font-semibold">Condition Orange</h3><ul className="list-disc pl-5">{data.condition_orange.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                <div><h3 className="font-semibold">Condition Red</h3><ul className="list-disc pl-5">{data.condition_red.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
