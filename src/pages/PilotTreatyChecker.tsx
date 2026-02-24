import { type ChangeEvent, useEffect, useMemo, useState } from "react";
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
  "Parse treaty obligations",
  "Parse domestic provisions",
  "Map obligation matrix",
  "Generate memo and risk scores",
];

const readGroundingDoc = async (file: File): Promise<string> => {
  const filename = file.name.toLowerCase();
  if (!filename.endsWith(".txt") && !filename.endsWith(".pdf")) {
    throw new Error("Only .txt and .pdf files are supported.");
  }

  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/api/utils/extract-text`, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Extraction failed (${res.status})`);

  const json = (await res.json()) as { extracted_text: string };
  return json.extracted_text?.trim() || "";
};

export default function PilotTreatyChecker() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const treatyReady = treatyText.trim().length >= 50 || treatyDocText.trim().length > 0;
  const lawReady = lawText.trim().length >= 50 || lawDocText.trim().length > 0;
  const progressLabel = useMemo(() => (stepIndex >= 0 ? steps[Math.min(stepIndex, 3)] : ""), [stepIndex]);

  const handleUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    setText: (s: string) => void,
    setName: (s: string | null) => void,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await readGroundingDoc(file);
      setText(text);
      setName(file.name);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
      setText("");
      setName(null);
    }
  };

  const analyze = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    setStepIndex(0);

    const timer = setInterval(() => setStepIndex((p) => (p < 3 ? p + 1 : p)), 500);

    try {
      const res = await fetch(`${API_BASE}/api/treaty/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treaty_name: treatyName,
          law_name: lawName,
          treaty_text: treatyText,
          national_law_text: lawText,
          treaty_doc_text: treatyDocText || undefined,
          law_doc_text: lawDocText || undefined,
        }),
      });
      if (!res.ok) throw new Error(`Analyze failed (${res.status})`);
      setData((await res.json()) as TreatyResponse);
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
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-5">
        <Card className="border-ink/20">
          <CardContent className="py-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-ink/60">KhaM for GOV • INTERNAL PILOT USE ONLY</p>
              <h1 className="font-news text-2xl md:text-3xl">International Treaty Compliance Checker</h1>
            </div>
            <Button variant="outline" onClick={() => setDark((v) => !v)}>{dark ? "Light" : "Dark"}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-news text-xl">Input Brief</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-ink/70">Treaty</label>
                <select className="w-full border rounded-md p-2 bg-background" value={treatyName} onChange={(e) => setTreatyName(e.target.value)}>{treaties.map((t) => <option key={t}>{t}</option>)}</select>
              </div>
              <div>
                <label className="text-xs text-ink/70">National Instrument</label>
                <select className="w-full border rounded-md p-2 bg-background" value={lawName} onChange={(e) => setLawName(e.target.value)}>{nationalInstruments.map((n) => <option key={n}>{n}</option>)}</select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs text-ink/70">Treaty text (50+ chars) or upload</label>
                <Textarea value={treatyText} onChange={(e) => setTreatyText(e.target.value)} className="min-h-24" />
                <Input type="file" accept=".txt,.pdf,application/pdf,text/plain" onChange={(e) => void handleUpload(e, setTreatyDocText, setTreatyDocName)} />
                {treatyDocName && <p className="text-xs text-ink/60">Attached: {treatyDocName}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs text-ink/70">Law text (50+ chars) or upload</label>
                <Textarea value={lawText} onChange={(e) => setLawText(e.target.value)} className="min-h-24" />
                <Input type="file" accept=".txt,.pdf,application/pdf,text/plain" onChange={(e) => void handleUpload(e, setLawDocText, setLawDocName)} />
                {lawDocName && <p className="text-xs text-ink/60">Attached: {lawDocName}</p>}
              </div>
            </div>

            <Button onClick={analyze} disabled={loading || !treatyReady || !lawReady} className="w-full md:w-auto">
              {loading ? "Analyzing..." : "Analyze Compliance"}
            </Button>
            {!!progressLabel && <p className="text-xs text-ink/60">{progressLabel}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </CardContent>
        </Card>

        {data && (
          <Card>
            <CardHeader>
              <CardTitle className="font-news text-xl">Policy Memo Output</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex flex-wrap gap-3 items-center text-xs text-ink/70">
                <span>Ref: {data.reference_no}</span>
                <span>{new Date(data.generated_at).toLocaleString()}</span>
                <Badge variant={data.mode_used === "ai" ? "default" : "secondary"}>{data.mode_used.toUpperCase()}</Badge>
              </div>
              <p><strong>Executive Summary:</strong> {data.executive_summary}</p>
              <div className="overflow-x-auto">
                <table className="w-full border text-xs">
                  <thead className="bg-ink/10"><tr><th className="p-2 border">Article</th><th className="p-2 border">Status</th><th className="p-2 border">Severity</th><th className="p-2 border">Confidence</th></tr></thead>
                  <tbody>
                    {data.results.map((r, i) => (
                      <tr key={i}><td className="p-2 border">{r.treaty_article}</td><td className="p-2 border">{r.status}</td><td className="p-2 border">{r.severity}</td><td className="p-2 border">{Math.round(r.confidence * 100)}%</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
