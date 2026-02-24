import { type ChangeEvent, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { treaties, nationalInstruments } from "@/lib/pilotSeed";

type ModeUsed = "ai" | "fallback";

type TreatyResult = {
  treaty_article: string;
  obligation: string;
  national_mapping: string;
  status: string;
  severity: string;
  recommendation: string;
  confidence: number;
};

type TreatyResponse = {
  treaty: string;
  law: string;
  generated_at: string;
  reference_no: string;
  mode_used: ModeUsed;
  classification: string;
  executive_summary: string;
  top_urgent_gaps: string[];
  action_list_30_60_90: string[];
  human_review_disclaimer: string;
  results: TreatyResult[];
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://kham-pilot-api.onrender.com";

const steps = [
  "Parsing treaty obligations",
  "Parsing domestic provisions",
  "Mapping obligations to national instrument",
  "Scoring gaps and generating recommendations",
];

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

export default function PilotTreatyChecker() {
  const [treatyName, setTreatyName] = useState(treaties[0]);
  const [lawName, setLawName] = useState(nationalInstruments[0]);
  const [treatyText, setTreatyText] = useState("");
  const [lawText, setLawText] = useState("");
  const [treatyDocText, setTreatyDocText] = useState("");
  const [lawDocText, setLawDocText] = useState("");
  const [treatyDocName, setTreatyDocName] = useState<string | null>(null);
  const [lawDocName, setLawDocName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TreatyResponse | null>(null);

  const progressLabel = useMemo(() => (stepIndex >= 0 ? steps[Math.min(stepIndex, 3)] : ""), [stepIndex]);
  const treatySourceReady = treatyText.trim().length >= 50 || treatyDocText.trim().length > 0;
  const lawSourceReady = lawText.trim().length >= 50 || lawDocText.trim().length > 0;

  const handleTreatyDocUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setTreatyDocText("");
      setTreatyDocName(null);
      return;
    }

    try {
      const text = await readGroundingDoc(file);
      setTreatyDocText(text);
      setTreatyDocName(file.name);
    } catch (e) {
      setTreatyDocText("");
      setTreatyDocName(null);
      setError(e instanceof Error ? e.message : "Failed to read treaty document.");
    }
  };

  const handleLawDocUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setLawDocText("");
      setLawDocName(null);
      return;
    }

    try {
      const text = await readGroundingDoc(file);
      setLawDocText(text);
      setLawDocName(file.name);
    } catch (e) {
      setLawDocText("");
      setLawDocName(null);
      setError(e instanceof Error ? e.message : "Failed to read law document.");
    }
  };

  const analyze = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    setStepIndex(0);

    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < 3 ? prev + 1 : prev));
    }, 650);

    try {
      const res = await fetch(`${API_BASE}/api/treaty/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treaty_text: treatyText,
          national_law_text: lawText,
          treaty_doc_text: treatyDocText || undefined,
          law_doc_text: lawDocText || undefined,
          treaty_name: treatyName,
          law_name: lawName,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Request failed (${res.status}): ${txt}`);
      }

      const json = (await res.json()) as TreatyResponse;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      clearInterval(timer);
      setStepIndex(3);
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
              <h1 className="font-serif text-3xl">International Treaty Compliance Checker</h1>
            </div>
            <div className="text-right text-xs text-ink/70">
              <p>Classification: INTERNAL PILOT USE ONLY</p>
              <p>Ref: {data?.reference_no ?? "KHM-GOV-YYYYMMDD-TC-HHMMSS"}</p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader><CardTitle>Input Panel</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <label className="text-sm">Treaty</label>
              <select className="w-full border rounded-md p-2 bg-white" value={treatyName} onChange={(e) => setTreatyName(e.target.value)}>
                {treaties.map((t) => <option key={t}>{t}</option>)}
              </select>

              <label className="text-sm">National Instrument</label>
              <select className="w-full border rounded-md p-2 bg-white" value={lawName} onChange={(e) => setLawName(e.target.value)}>
                {nationalInstruments.map((n) => <option key={n}>{n}</option>)}
              </select>

              <label className="text-sm">Treaty Text (or excerpt)</label>
              <Textarea value={treatyText} onChange={(e) => setTreatyText(e.target.value)} className="min-h-24" />

              <label className="text-sm">Treaty Doc Upload (.txt/.pdf)</label>
              <Input type="file" accept=".txt,.pdf,application/pdf,text/plain" onChange={(e) => void handleTreatyDocUpload(e)} />
              {treatyDocName && <p className="text-xs text-ink/60">Attached treaty doc: {treatyDocName}</p>}

              <label className="text-sm">National Law Text (or excerpt)</label>
              <Textarea value={lawText} onChange={(e) => setLawText(e.target.value)} className="min-h-24" />

              <label className="text-sm">Law Doc Upload (.txt/.pdf)</label>
              <Input type="file" accept=".txt,.pdf,application/pdf,text/plain" onChange={(e) => void handleLawDocUpload(e)} />
              {lawDocName && <p className="text-xs text-ink/60">Attached law doc: {lawDocName}</p>}

              <Button onClick={analyze} disabled={loading || !treatySourceReady || !lawSourceReady} className="w-full">{loading ? "Analyzing..." : "Analyze Compliance"}</Button>
              <p className="text-xs text-ink/60">Provide either 50+ chars or a grounding doc for both treaty and law inputs.</p>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Processing Timeline</CardTitle></CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm">
                  {steps.map((s, i) => (
                    <li key={s} className={`p-2 rounded ${stepIndex >= i ? "bg-ink/10" : "bg-ink/5"}`}>
                      {stepIndex > i ? "✓" : stepIndex === i && loading ? "…" : "○"} {s}
                    </li>
                  ))}
                </ol>
                {progressLabel && <p className="mt-3 text-xs text-ink/60">Current: {progressLabel}</p>}
              </CardContent>
            </Card>

            {data && (
              <Card>
                <CardHeader>
                  <CardTitle>Policy Memo Output</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-ink/70">
                    <p><strong>Reference:</strong> {data.reference_no}</p>
                    <p><strong>Date:</strong> {new Date(data.generated_at).toLocaleString()}</p>
                    <p><strong>Classification:</strong> {data.classification}</p>
                    <p><strong>Mode:</strong> <Badge variant={data.mode_used === "ai" ? "default" : "secondary"}>{data.mode_used.toUpperCase()}</Badge></p>
                  </div>

                  <p><strong>Executive Summary:</strong> {data.executive_summary}</p>

                  <div>
                    <h3 className="font-semibold mb-2">Obligation Matrix</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border border-ink/20">
                        <thead className="bg-ink/10">
                          <tr>
                            <th className="p-2 border">Article</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Severity</th>
                            <th className="p-2 border">Confidence</th>
                            <th className="p-2 border">Recommendation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.results.map((r, i) => (
                            <tr key={i}>
                              <td className="p-2 border">{r.treaty_article}</td>
                              <td className="p-2 border">{r.status}</td>
                              <td className="p-2 border">{r.severity}</td>
                              <td className="p-2 border">{Math.round(r.confidence * 100)}%</td>
                              <td className="p-2 border">{r.recommendation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold">Top 5 Urgent Gaps</h3>
                    <ul className="list-disc pl-5 text-sm">{data.top_urgent_gaps.map((g, i) => <li key={i}>{g}</li>)}</ul>
                  </div>

                  <div>
                    <h3 className="font-semibold">Action List (30/60/90)</h3>
                    <ul className="list-disc pl-5 text-sm">{data.action_list_30_60_90.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>

                  <p className="text-xs text-ink/60 border-t pt-3">{data.human_review_disclaimer}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-ink/50">FOR INTERNAL PILOT USE ONLY • Confidential working demo</p>
      </main>
    </div>
  );
}
