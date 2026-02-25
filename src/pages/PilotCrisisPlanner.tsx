import { type ChangeEvent, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { crisisConstraints, crisisTypes, missions } from "@/lib/pilotSeed";
import PilotFrame from "@/components/pilot/PilotFrame";
import { downloadDoc, downloadTxt, escapeHtml, openPrintPreview } from "@/lib/reportExport";

type ModeUsed = "ai" | "fallback";
type RoleTask = { role: string; task: string };
type TimelinePhase = { phase: string; actions: string[] };
type EvacuationPlan = {
  assembly_points: string[];
  priority_categories: string[];
  movement_windows: string[];
  coordination_requirements: string[];
};

type QualityGate = { passed: boolean; reasons: string[] };

type CrisisResponse = {
  reference_no: string;
  generated_at: string;
  mode_used: ModeUsed;
  fallback_reason?: string;
  relevance_status?: string;
  relevance_score?: number;
  relevance_warning?: string;
  mission_location: string;
  crisis_type: string;
  nationals_affected: number;
  condition_yellow: string[];
  condition_orange: string[];
  condition_red: string[];
  role_assigned_tasks: RoleTask[];
  timeline: TimelinePhase[];
  communication_templates: string[];
  evacuation_plan: EvacuationPlan;
  sitrep_template: string;
  assumptions_and_unknowns: string[];
  human_review_disclaimer: string;
  quality_gate: QualityGate;
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
  const [dark] = useState(true);
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

  const buildCrisisReportHtml = (d: CrisisResponse) => {
    const cond = (title: string, arr: string[]) => `<div class="section"><h3>${title}</h3><ul>${arr.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>`;
    const timeline = d.timeline
      .map((t) => `<h3>${escapeHtml(t.phase)}</h3><ul>${t.actions.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>`)
      .join("");
    const reasons = d.quality_gate.reasons.map((r) => `<li>${escapeHtml(r)}</li>`).join("");
    return `
      <h1>Consular Crisis Response Planner</h1>
      <div class="meta">Ref: ${escapeHtml(d.reference_no)} | Generated: ${escapeHtml(new Date(d.generated_at).toLocaleString())} | Mission: ${escapeHtml(d.mission_location)} | Crisis: ${escapeHtml(d.crisis_type)}</div>
      <div class="section"><h2>Quality Gate: ${d.quality_gate.passed ? "PASS" : "FAIL"}</h2>${d.quality_gate.passed ? "<p class='small'>All mandatory quality checks passed.</p>" : `<ul>${reasons}</ul>`}</div>
      ${cond("Condition Yellow", d.condition_yellow)}
      ${cond("Condition Orange", d.condition_orange)}
      ${cond("Condition Red", d.condition_red)}
      <div class="section"><h2>Timeline</h2>${timeline}</div>
      <div class="section"><h2>Evacuation Structure</h2>
        <h3>Assembly Points</h3><ul>${d.evacuation_plan.assembly_points.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
        <h3>Priority Categories</h3><ol>${d.evacuation_plan.priority_categories.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ol>
        <h3>Movement Windows</h3><ul>${d.evacuation_plan.movement_windows.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
      </div>
      <div class="section"><h2>SITREP Template</h2><pre>${escapeHtml(d.sitrep_template)}</pre></div>
      <div class="section"><h2>Review Note</h2><p>${escapeHtml(d.human_review_disclaimer)}</p></div>
      <div class="footer"><span>KhaM for GOV • Internal Pilot Use Only</span><span>Human Review Required</span></div>
    `;
  };

  const buildCrisisReportTxt = (d: CrisisResponse) => {
    const lines = [
      "CONSULAR CRISIS RESPONSE PLANNER",
      `Ref: ${d.reference_no}`,
      `Generated: ${new Date(d.generated_at).toLocaleString()}`,
      `Mission: ${d.mission_location}`,
      `Crisis: ${d.crisis_type}`,
      "",
      `QUALITY GATE: ${d.quality_gate.passed ? "PASS" : "FAIL"}`,
      ...d.quality_gate.reasons.map((r) => `- ${r}`),
      "",
      "CONDITION YELLOW:",
      ...d.condition_yellow.map((x) => `- ${x}`),
      "",
      "CONDITION ORANGE:",
      ...d.condition_orange.map((x) => `- ${x}`),
      "",
      "CONDITION RED:",
      ...d.condition_red.map((x) => `- ${x}`),
      "",
      "TIMELINE:",
      ...d.timeline.flatMap((t) => [`${t.phase}:`, ...t.actions.map((a) => `- ${a}`)]),
      "",
      "SITREP TEMPLATE:",
      d.sitrep_template,
      "",
      d.human_review_disclaimer,
      "",
      "KhaM for GOV • Internal Pilot Use Only",
    ];
    return lines.join("\n");
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-6">
        <PilotFrame
          title="Consular Crisis Response Planner"
          subtitle="Generate structured mission-ready response plans with phased actions, evacuation structure, and quality-gated compliance checks."
          badgeLeft="Emergency Planning Module"
          badgeRight="CR • V1.1">
          <div className="space-y-5">
          <Card className="rounded-none border-ink/30 dark:border-paper/25 shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="font-tech uppercase tracking-[0.08em] text-xl">Mission Briefing</CardTitle>
            <p className="font-display text-xs md:text-sm text-ink/75 dark:text-paper/75">
              Define mission context, constraints, and local conditions. The planner converts these into a phased, auditable response structure.
            </p>
          </CardHeader>
          <CardContent className="space-y-3 border-t border-dashed border-ink/20 dark:border-paper/20 pt-5">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="font-tech text-xs text-ink/80 dark:text-paper/80">Mission Location</label>
                <select className="w-full border border-dashed rounded-none p-2 bg-background font-display text-sm" value={missionLocation} onChange={(e) => setMissionLocation(e.target.value)}>{missions.map((m) => <option key={m}>{m}</option>)}</select>
              </div>
              <div>
                <label className="font-tech text-xs text-ink/80 dark:text-paper/80">Crisis Type</label>
                <select className="w-full border border-dashed rounded-none p-2 bg-background font-display text-sm" value={crisisType} onChange={(e) => setCrisisType(e.target.value)}>{crisisTypes.map((c) => <option key={c}>{c}</option>)}</select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="font-tech text-xs text-ink/80 dark:text-paper/80">Nationals Affected</label>
                <Input className="rounded-none border-dashed font-display" type="number" value={nationalsAffected} onChange={(e) => setNationalsAffected(Number(e.target.value))} />
              </div>
              <div>
                <label className="font-tech text-xs text-ink/80 dark:text-paper/80">Resource Inventory (comma-separated)</label>
                <Input className="rounded-none border-dashed font-display" value={resources} onChange={(e) => setResources(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="font-tech text-xs text-ink/80 dark:text-paper/80">Constraints</label>
              <div className="grid grid-cols-2 gap-2 text-sm mt-1">
                {crisisConstraints.map((c) => (
                  <label key={c} className="font-display flex items-center gap-2 text-ink/85 dark:text-paper/85">
                    <input className="accent-ink dark:accent-paper" type="checkbox" checked={selectedConstraints.includes(c)} onChange={() => toggleConstraint(c)} /> {c}
                  </label>
                ))}
              </div>
            </div>

            <label className="font-tech text-xs text-ink/80 dark:text-paper/80">Local Conditions (30+ chars)</label>
            <Textarea value={localConditions} onChange={(e) => setLocalConditions(e.target.value)} className="min-h-28 rounded-none border-dashed font-display" />

            <label className="font-tech text-xs text-ink/80 dark:text-paper/80">Situation Brief Upload (.txt/.pdf)</label>
            <Input className="rounded-none border-dashed font-tech text-xs" type="file" accept=".txt,.pdf,application/pdf,text/plain" onChange={(e) => void handleScenarioDocUpload(e)} />
            {scenarioDocName && <p className="text-xs text-ink/80 dark:text-paper/70">Attached: {scenarioDocName}</p>}

            <Button
              variant="outline"
              onClick={generatePlan}
              disabled={loading || resources.trim().length < 15 || localConditions.trim().length < 30 || selectedConstraints.length < 1}
              className="relative w-full md:w-auto rounded-none font-tech text-[11px] uppercase tracking-[0.14em] border border-dashed border-ink/40 dark:border-paper/40 bg-transparent text-ink dark:text-paper hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-all duration-200 before:content-[''] before:absolute before:-top-1 before:-left-1 before:w-2 before:h-2 before:border-t before:border-l before:border-current before:opacity-0 hover:before:opacity-100 after:content-[''] after:absolute after:-bottom-1 after:-right-1 after:w-2 after:h-2 after:border-b after:border-r after:border-current after:opacity-0 hover:after:opacity-100"
            >
              {loading ? "Generating..." : "Generate Response Plan"}
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </CardContent>
        </Card>

        {data && (
          <Card className="rounded-none border-ink/30 dark:border-paper/25 shadow-none">
            <CardHeader><CardTitle className="font-tech uppercase tracking-[0.08em] text-xl">Response Output</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex flex-wrap gap-3 items-center text-xs text-ink/80 dark:text-paper/80">
                <span>Ref: {data.reference_no}</span>
                <span>{new Date(data.generated_at).toLocaleString()}</span>
                <Badge variant={data.mode_used === "ai" ? "default" : "secondary"}>{data.mode_used.toUpperCase()}</Badge>
                {data.mode_used === "fallback" && data.fallback_reason && (
                  <span className="text-amber-600">reason: {data.fallback_reason}</span>
                )}
                {typeof data.relevance_score === "number" && (
                  <span title="Percentage of key scenario-planning fields sufficiently covered by the submitted brief.">Document Coverage: {Math.round(data.relevance_score * 100)}% ({data.relevance_status})</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="rounded-none font-tech text-[11px] uppercase tracking-[0.12em] border-dashed" onClick={() => openPrintPreview(`CR-${data.reference_no}`, buildCrisisReportHtml(data))}>Print / Save PDF</Button>
                <Button variant="outline" className="rounded-none font-tech text-[11px] uppercase tracking-[0.12em] border-dashed" onClick={() => downloadDoc(`CR-${data.reference_no}`, `crisis-report-${data.reference_no}.doc`, buildCrisisReportHtml(data))}>Download DOC</Button>
                <Button variant="outline" className="rounded-none font-tech text-[11px] uppercase tracking-[0.12em] border-dashed" onClick={() => downloadTxt(`crisis-report-${data.reference_no}.txt`, buildCrisisReportTxt(data))}>Download TXT</Button>
              </div>

              {data.relevance_warning && <p className="text-xs text-amber-600 dark:text-amber-400">{data.relevance_warning}</p>}

              <div className={`border rounded p-2 text-xs ${data.quality_gate.passed ? "border-emerald-600/40 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500/40" : "border-red-600/40 bg-red-50 dark:bg-red-900/20 dark:border-red-500/40"}`}>
                <p><strong>Quality Gate:</strong> {data.quality_gate.passed ? "PASS" : "FAIL"}</p>
                {!data.quality_gate.passed && (
                  <ul className="list-disc pl-5 mt-1">
                    {data.quality_gate.reasons.map((reason, i) => <li key={i}>{reason}</li>)}
                  </ul>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div><h3 className="font-tech uppercase tracking-[0.08em] text-xs">Condition Yellow</h3><ul className="list-disc pl-5">{data.condition_yellow.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                <div><h3 className="font-tech uppercase tracking-[0.08em] text-xs">Condition Orange</h3><ul className="list-disc pl-5">{data.condition_orange.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                <div><h3 className="font-tech uppercase tracking-[0.08em] text-xs">Condition Red</h3><ul className="list-disc pl-5">{data.condition_red.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
              </div>

              <div>
                <h3 className="font-tech uppercase tracking-[0.08em] text-sm">Role Task Matrix</h3>
                <ul className="list-disc pl-5">{data.role_assigned_tasks.map((r, i) => <li key={i}><strong>{r.role}:</strong> {r.task}</li>)}</ul>
              </div>

              <div>
                <h3 className="font-tech uppercase tracking-[0.08em] text-sm">Timeline</h3>
                {data.timeline.map((t, i) => (
                  <div key={i} className="mt-2 border rounded p-2">
                    <p className="font-medium">{t.phase}</p>
                    <ul className="list-disc pl-5">{t.actions.map((a, j) => <li key={j}>{a}</li>)}</ul>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-tech uppercase tracking-[0.08em] text-sm">Communication Scripts</h3>
                <ul className="list-disc pl-5">{data.communication_templates.map((c, i) => <li key={i}>{c}</li>)}</ul>
              </div>

              <div>
                <h3 className="font-tech uppercase tracking-[0.08em] text-sm">Evacuation Structure</h3>
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-medium">Assembly Points</p>
                    <ul className="list-disc pl-5">{data.evacuation_plan.assembly_points.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                  <div>
                    <p className="font-medium">Priority Categories (highest → lowest)</p>
                    <ol className="list-decimal pl-5">{data.evacuation_plan.priority_categories.map((a, i) => <li key={i}>{a}</li>)}</ol>
                  </div>
                  <div>
                    <p className="font-medium">Movement Windows</p>
                    <ul className="list-disc pl-5">{data.evacuation_plan.movement_windows.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                  <div>
                    <p className="font-medium">Coordination Requirements</p>
                    <ul className="list-disc pl-5">{data.evacuation_plan.coordination_requirements.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-tech uppercase tracking-[0.08em] text-sm">SITREP Template</h3>
                <pre className="whitespace-pre-wrap text-xs border rounded p-2 bg-background">{data.sitrep_template}</pre>
              </div>

              <div>
                <h3 className="font-tech uppercase tracking-[0.08em] text-sm">Assumptions & Unknowns</h3>
                <ul className="list-disc pl-5">{data.assumptions_and_unknowns.map((a, i) => <li key={i}>{a}</li>)}</ul>
              </div>

              <p className="text-xs text-ink/80 dark:text-paper/70">{data.human_review_disclaimer}</p>
            </CardContent>
          </Card>
        )}
          </div>
        </PilotFrame>
      </main>
    </div>
  );
}








