import { type ChangeEvent, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { crisisConstraints, crisisTypes, missions } from "@/lib/pilotSeed";

type RoleTask = { role: string; task: string };
type TimelinePhase = { phase: string; actions: string[] };
type ModeUsed = "ai" | "fallback";

type CrisisResponse = {
  reference_no: string;
  generated_at: string;
  mode_used: ModeUsed;
  classification: string;
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
  if (filename.endsWith(".txt")) {
    return (await file.text()).trim();
  }

  if (filename.endsWith(".pdf")) {
    return `[PDF FILE: ${file.name}] PDF extraction not implemented on client; upload a .txt export for full text grounding.`;
  }

  throw new Error("Only .txt and .pdf files are supported.");
};

export default function PilotCrisisPlanner() {
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

  const toggleConstraint = (value: string) => {
    setSelectedConstraints((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleScenarioDocUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setScenarioDocText("");
      setScenarioDocName(null);
      return;
    }

    try {
      const text = await readGroundingDoc(file);
      setScenarioDocText(text);
      setScenarioDocName(file.name);
    } catch (e) {
      setScenarioDocText("");
      setScenarioDocName(null);
      setError(e instanceof Error ? e.message : "Failed to read scenario document.");
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
      <main className="max-w-6xl mx-auto px-6 pt-10 pb-16">
        <header className="mb-8 border border-ink/15 rounded-lg p-4 bg-white/80">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs tracking-wide text-ink/60">KhaM Labs • KhaM for GOV</p>
              <h1 className="font-serif text-3xl">Consular Crisis Response Planner</h1>
            </div>
            <div className="text-right text-xs text-ink/70">
              <p>Classification: INTERNAL PILOT USE ONLY</p>
              <p>Ops Order Preview</p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader><CardTitle>Mission Briefing Input</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <label className="text-sm">Mission Location</label>
              <select className="w-full border rounded-md p-2 bg-white" value={missionLocation} onChange={(e) => setMissionLocation(e.target.value)}>
                {missions.map((m) => <option key={m}>{m}</option>)}
              </select>

              <label className="text-sm">Crisis Type</label>
              <select className="w-full border rounded-md p-2 bg-white" value={crisisType} onChange={(e) => setCrisisType(e.target.value)}>
                {crisisTypes.map((c) => <option key={c}>{c}</option>)}
              </select>

              <label className="text-sm">Nationals Affected</label>
              <Input type="number" value={nationalsAffected} onChange={(e) => setNationalsAffected(Number(e.target.value))} />

              <label className="text-sm">Resource Inventory</label>
              <Input value={resources} onChange={(e) => setResources(e.target.value)} placeholder="comma separated" />

              <label className="text-sm">Constraints</label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {crisisConstraints.map((c) => (
                  <label key={c} className="flex items-center gap-2">
                    <input type="checkbox" checked={selectedConstraints.includes(c)} onChange={() => toggleConstraint(c)} /> {c}
                  </label>
                ))}
              </div>

              <label className="text-sm">Local Conditions</label>
              <Textarea value={localConditions} onChange={(e) => setLocalConditions(e.target.value)} className="min-h-24" />

              <label className="text-sm">Situation Brief Upload (.txt/.pdf)</label>
              <Input type="file" accept=".txt,.pdf,application/pdf,text/plain" onChange={(e) => void handleScenarioDocUpload(e)} />
              {scenarioDocName && <p className="text-xs text-ink/60">Attached scenario brief: {scenarioDocName}</p>}

              <Button
                onClick={generatePlan}
                disabled={
                  loading ||
                  resources.trim().length < 15 ||
                  localConditions.trim().length < 30 ||
                  selectedConstraints.length < 1
                }
                className="w-full"
              >
                {loading ? "Generating..." : "Generate Response Plan"}
              </Button>
              <p className="text-xs text-ink/60">Provide resource details, select at least one constraint, and write 30+ chars for local conditions.</p>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            {data ? (
              <Card>
                <CardHeader><CardTitle>Operational Order Output</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-ink/70">
                    <p><strong>Reference:</strong> {data.reference_no}</p>
                    <p><strong>Date:</strong> {new Date(data.generated_at).toLocaleString()}</p>
                    <p><strong>Mission:</strong> {data.mission_location} | <strong>Crisis:</strong> {data.crisis_type}</p>
                    <p><strong>Mode:</strong> <Badge variant={data.mode_used === "ai" ? "default" : "secondary"}>{data.mode_used.toUpperCase()}</Badge></p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Condition Yellow</h3>
                    <ul className="list-disc pl-5">{data.condition_yellow.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Condition Orange</h3>
                    <ul className="list-disc pl-5">{data.condition_orange.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Condition Red</h3>
                    <ul className="list-disc pl-5">{data.condition_red.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>

                  <div>
                    <h3 className="font-semibold">Role-Assigned Tasks</h3>
                    <ul className="list-disc pl-5">{data.role_assigned_tasks.map((t, i) => <li key={i}><strong>{t.role}:</strong> {t.task}</li>)}</ul>
                  </div>

                  <div>
                    <h3 className="font-semibold">Timeline</h3>
                    {data.timeline.map((p) => (
                      <div key={p.phase} className="border border-ink/10 rounded p-2 mt-2">
                        <p className="font-medium">{p.phase}</p>
                        <ul className="list-disc pl-5">{p.actions.map((a, i) => <li key={i}>{a}</li>)}</ul>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold">Communication Templates</h3>
                    <ul className="list-disc pl-5">{data.communication_templates.map((t, i) => <li key={i}>{t}</li>)}</ul>
                  </div>

                  <div>
                    <h3 className="font-semibold">SITREP Format</h3>
                    <pre className="whitespace-pre-wrap text-sm bg-ink/5 rounded p-3">{data.sitrep_template}</pre>
                  </div>

                  <div>
                    <h3 className="font-semibold">Assumptions & Unknowns</h3>
                    <ul className="list-disc pl-5">{data.assumptions_and_unknowns.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>

                  <p className="text-xs text-ink/60 border-t pt-3">{data.human_review_disclaimer}</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader><CardTitle>Awaiting scenario generation</CardTitle></CardHeader>
                <CardContent className="text-ink/60 text-sm">Generate a plan to render the full operational order document preview.</CardContent>
              </Card>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-ink/50">FOR INTERNAL PILOT USE ONLY • Confidential working demo</p>
      </main>
    </div>
  );
}
