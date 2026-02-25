import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { treaties, nationalInstruments } from "@/lib/pilotSeed";
import PilotFrame from "@/components/pilot/PilotFrame";
import { downloadDoc, downloadPdf, downloadTxt, escapeHtml, openPrintPreview } from "@/lib/reportExport";

type ModeUsed = "ai" | "fallback";

type TreatyResult = {
  treaty_article: string;
  obligation: string;
  treaty_clause_text?: string;
  national_mapping: string;
  domestic_clause_text?: string;
  status: string;
  severity: string;
  recommendation: string;
  confidence: number;
  confidence_rationale?: string;
};

type QualityGate = { passed: boolean; reasons: string[] };

type TreatyResponse = {
  treaty: string;
  law: string;
  generated_at: string;
  reference_no: string;
  mode_used: ModeUsed;
  fallback_reason?: string;
  relevance_status?: string;
  relevance_score?: number;
  relevance_warning?: string;
  classification: string;
  executive_summary: string;
  top_urgent_gaps: string[];
  action_list_30_60_90: string[];
  human_review_disclaimer: string;
  quality_gate: QualityGate;
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
  const [dark] = useState(true);
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

  const treatyChars = treatyText.trim().length;
  const lawChars = lawText.trim().length;
  const treatyReady = treatyChars >= 50 || treatyDocText.trim().length > 0;
  const lawReady = lawChars >= 50 || lawDocText.trim().length > 0;
  const progressLabel = useMemo(() => (stepIndex >= 0 ? steps[Math.min(stepIndex, 3)] : ""), [stepIndex]);
  const canAnalyze = treatyReady && lawReady;
  const analyzeHint = !treatyReady
    ? `Treaty input needs at least 50 chars or a file upload (${treatyChars}/50).`
    : !lawReady
      ? `Law input needs at least 50 chars or a file upload (${lawChars}/50).`
      : "Ready to analyze.";

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
      if (!res.ok) {
        let detail = "";
        try {
          const errJson = (await res.json()) as { detail?: unknown };
          detail = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail ?? "");
        } catch {
          detail = await res.text();
        }
        throw new Error(`Analyze failed (${res.status})${detail ? `: ${detail}` : ""}`);
      }
      setData((await res.json()) as TreatyResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      clearInterval(timer);
      setStepIndex(3);
      setLoading(false);
    }
  };

  const buildTreatyReportHtml = (d: TreatyResponse) => {
    const rows = d.results
      .map(
        (r) => `<tr><td>${escapeHtml(r.treaty_article)}</td><td>${escapeHtml(r.status)}</td><td>${escapeHtml(r.severity)}</td><td>${Math.round(r.confidence * 100)}%</td><td>${escapeHtml(r.confidence_rationale || "-")}</td></tr>`,
      )
      .join("");
    const gaps = d.top_urgent_gaps.map((g) => `<li>${escapeHtml(g)}</li>`).join("");
    const actions = d.action_list_30_60_90.map((a) => `<li>${escapeHtml(a)}</li>`).join("");
    const reasons = d.quality_gate.reasons.map((r) => `<li>${escapeHtml(r)}</li>`).join("");

    return `
      <h1>International Treaty Compliance Checker</h1>
      <div class="meta">Ref: ${escapeHtml(d.reference_no)} | Generated: ${escapeHtml(new Date(d.generated_at).toLocaleString())} | Mode: ${escapeHtml(d.mode_used.toUpperCase())}</div>
      <div class="section"><h2>Executive Summary</h2><p>${escapeHtml(d.executive_summary)}</p></div>
      <div class="section"><h2>Quality Gate: ${d.quality_gate.passed ? "PASS" : "FAIL"}</h2>${d.quality_gate.passed ? "<p class='small'>All mandatory quality checks passed.</p>" : `<ul>${reasons}</ul>`}</div>
      <div class="section"><h2>Compliance Matrix</h2><table><thead><tr><th>Article</th><th>Status</th><th>Severity</th><th>Confidence</th><th>Rationale</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="section"><h2>Priority Gaps</h2><ul>${gaps}</ul></div>
      <div class="section"><h2>Action Queue 30/60/90</h2><ol>${actions}</ol></div>
      <div class="section"><h2>Review Note</h2><p>${escapeHtml(d.human_review_disclaimer)}</p></div>
      <div class="footer"><span>KhaM for GOV • Internal Pilot Use Only</span><span>Human Review Required</span></div>
    `;
  };

  const buildTreatyReportTxt = (d: TreatyResponse) => {
    const lines = [
      "INTERNATIONAL TREATY COMPLIANCE CHECKER",
      `Ref: ${d.reference_no}`,
      `Generated: ${new Date(d.generated_at).toLocaleString()}`,
      `Mode: ${d.mode_used.toUpperCase()}`,
      "",
      `QUALITY GATE: ${d.quality_gate.passed ? "PASS" : "FAIL"}`,
      ...d.quality_gate.reasons.map((r) => `- ${r}`),
      "",
      `SUMMARY: ${d.executive_summary}`,
      "",
      "PRIORITY GAPS:",
      ...d.top_urgent_gaps.map((g) => `- ${g}`),
      "",
      "ACTION QUEUE 30/60/90:",
      ...d.action_list_30_60_90.map((a) => `- ${a}`),
      "",
      "COMPLIANCE MATRIX:",
      ...d.results.map((r) => `- ${r.treaty_article} | ${r.status} | ${r.severity} | ${Math.round(r.confidence * 100)}%`),
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
          title="International Treaty Compliance Checker"
          subtitle="Map treaty obligations against domestic legal instruments with auditable, side-by-side citations and quality-gated outputs."
          badgeLeft="Policy Compliance Module"
          badgeRight="TC • V1.1">
          <div className="space-y-5">
          <Card className="rounded-none border-ink/30 dark:border-paper/25 shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="font-tech uppercase tracking-[0.08em] text-xl">Input Brief</CardTitle>
            <p className="font-display text-xs md:text-sm text-ink/75 dark:text-paper/75">
              Provide treaty and domestic legal text (paste or upload). The checker maps obligations article-by-article and flags enforceability gaps.
            </p>
          </CardHeader>
          <CardContent className="space-y-3 border-t border-dashed border-ink/20 dark:border-paper/20 pt-5">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="font-tech text-xs text-ink/80 dark:text-paper/80">Treaty</label>
                <select className="w-full border border-dashed rounded-none p-2 bg-background font-display text-sm" value={treatyName} onChange={(e) => setTreatyName(e.target.value)}>{treaties.map((t) => <option key={t}>{t}</option>)}</select>
              </div>
              <div>
                <label className="font-tech text-xs text-ink/80 dark:text-paper/80">National Instrument</label>
                <select className="w-full border border-dashed rounded-none p-2 bg-background font-display text-sm" value={lawName} onChange={(e) => setLawName(e.target.value)}>{nationalInstruments.map((n) => <option key={n}>{n}</option>)}</select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="font-tech text-xs text-ink/80 dark:text-paper/80">Treaty text (50+ chars) or upload</label>
                <Textarea value={treatyText} onChange={(e) => setTreatyText(e.target.value)} className="min-h-28 rounded-none border-dashed font-display" />
                <p className="font-tech text-[11px] text-ink/65 dark:text-paper/65">Chars: {treatyChars}/50</p>
                <Input className="rounded-none border-dashed font-tech text-xs" type="file" accept=".txt,.pdf,application/pdf,text/plain" onChange={(e) => void handleUpload(e, setTreatyDocText, setTreatyDocName)} />
                {treatyDocName && <p className="text-xs text-ink/80 dark:text-paper/70">Attached: {treatyDocName}</p>}
              </div>
              <div className="space-y-2">
                <label className="font-tech text-xs text-ink/80 dark:text-paper/80">Law text (50+ chars) or upload</label>
                <Textarea value={lawText} onChange={(e) => setLawText(e.target.value)} className="min-h-28 rounded-none border-dashed font-display" />
                <p className="font-tech text-[11px] text-ink/65 dark:text-paper/65">Chars: {lawChars}/50</p>
                <Input className="rounded-none border-dashed font-tech text-xs" type="file" accept=".txt,.pdf,application/pdf,text/plain" onChange={(e) => void handleUpload(e, setLawDocText, setLawDocName)} />
                {lawDocName && <p className="text-xs text-ink/80 dark:text-paper/70">Attached: {lawDocName}</p>}
              </div>
            </div>

            <Button
              variant="outline"
              onClick={analyze}
              disabled={loading || !canAnalyze}
              className="relative w-full md:w-auto rounded-none font-tech text-[11px] uppercase tracking-[0.14em] border border-dashed border-ink/80 dark:border-paper/80 !bg-ink/5 dark:!bg-paper/10 !text-ink dark:!text-paper hover:!bg-ink hover:!text-paper dark:hover:!bg-paper dark:hover:!text-ink !opacity-100 font-semibold shadow-[inset_0_0_0_1px_rgba(0,0,0,0.45)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] transition-all duration-200 before:content-[''] before:absolute before:-top-1 before:-left-1 before:w-2 before:h-2 before:border-t before:border-l before:border-current before:opacity-0 hover:before:opacity-100 after:content-[''] after:absolute after:-bottom-1 after:-right-1 after:w-2 after:h-2 after:border-b after:border-r after:border-current after:opacity-0 hover:after:opacity-100"
            >
              {loading ? "Analyzing..." : "Analyze Compliance"}
            </Button>
            <p className={`font-tech text-[11px] ${canAnalyze ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}>{analyzeHint}</p>
            {!!progressLabel && <p className="text-xs text-ink/80 dark:text-paper/70">{progressLabel}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </CardContent>
        </Card>

        {data && (
          <Card className="rounded-none border-ink/30 dark:border-paper/25 shadow-none">
            <CardHeader>
              <CardTitle className="font-tech uppercase tracking-[0.08em] text-xl">Analysis Output</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm font-display leading-relaxed">
              <div className="flex flex-wrap gap-3 items-center text-xs text-ink/80 dark:text-paper/80">
                <span>Ref: {data.reference_no}</span>
                <span>{new Date(data.generated_at).toLocaleString()}</span>
                <Badge variant={data.mode_used === "ai" ? "default" : "secondary"}>{data.mode_used.toUpperCase()}</Badge>
                {data.mode_used === "fallback" && data.fallback_reason && (
                  <span className="text-amber-600">reason: {data.fallback_reason}</span>
                )}
                {typeof data.relevance_score === "number" && (
                  <span title="Percentage of key treaty obligations addressed by the submitted document.">Document Coverage: {Math.round(data.relevance_score * 100)}% ({data.relevance_status})</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="rounded-none font-tech text-[11px] uppercase tracking-[0.12em] border border-dashed border-ink/80 dark:border-paper/80 !bg-ink/5 dark:!bg-paper/10 !text-ink dark:!text-paper hover:!bg-ink hover:!text-paper dark:hover:!bg-paper dark:hover:!text-ink !opacity-100 font-semibold shadow-[inset_0_0_0_1px_rgba(0,0,0,0.45)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]" onClick={() => void downloadPdf(`treaty-report-${data.reference_no}.pdf`, `TC-${data.reference_no}`, buildTreatyReportTxt(data))}>Download PDF</Button>
                <Button variant="outline" className="rounded-none font-tech text-[11px] uppercase tracking-[0.12em] border border-dashed border-ink/80 dark:border-paper/80 !bg-ink/5 dark:!bg-paper/10 !text-ink dark:!text-paper hover:!bg-ink hover:!text-paper dark:hover:!bg-paper dark:hover:!text-ink !opacity-100 font-semibold shadow-[inset_0_0_0_1px_rgba(0,0,0,0.45)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]" onClick={() => downloadDoc(`TC-${data.reference_no}`, `treaty-report-${data.reference_no}.doc`, buildTreatyReportHtml(data))}>Download DOC</Button>
                <Button variant="outline" className="rounded-none font-tech text-[11px] uppercase tracking-[0.12em] border border-dashed border-ink/80 dark:border-paper/80 !bg-ink/5 dark:!bg-paper/10 !text-ink dark:!text-paper hover:!bg-ink hover:!text-paper dark:hover:!bg-paper dark:hover:!text-ink !opacity-100 font-semibold shadow-[inset_0_0_0_1px_rgba(0,0,0,0.45)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]" onClick={() => downloadTxt(`treaty-report-${data.reference_no}.txt`, buildTreatyReportTxt(data))}>Download TXT</Button>
                <Button variant="outline" className="rounded-none font-tech text-[11px] uppercase tracking-[0.12em] border border-dashed border-ink/80 dark:border-paper/80 !bg-ink/5 dark:!bg-paper/10 !text-ink dark:!text-paper hover:!bg-ink hover:!text-paper dark:hover:!bg-paper dark:hover:!text-ink !opacity-100 font-semibold shadow-[inset_0_0_0_1px_rgba(0,0,0,0.45)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]" onClick={() => openPrintPreview(`TC-${data.reference_no}`, buildTreatyReportHtml(data))}>Print View</Button>
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

              <p className="font-display"><span className="font-tech uppercase tracking-[0.08em] text-xs mr-2">Summary</span>{data.executive_summary}</p>
              <div className="overflow-x-auto">
                <table className="w-full border text-xs">
                  <thead className="bg-ink/10"><tr><th className="p-2 border">Article</th><th className="p-2 border">Status</th><th className="p-2 border">Severity</th><th className="p-2 border">Confidence</th><th className="p-2 border">Confidence Rationale</th></tr></thead>
                  <tbody>
                    {data.results.map((r, i) => (
                      <tr key={i}><td className="p-2 border">{r.treaty_article}</td><td className="p-2 border">{r.status}</td><td className="p-2 border">{r.severity}</td><td className="p-2 border">{Math.round(r.confidence * 100)}%</td><td className="p-2 border">{r.confidence_rationale || "-"}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="font-tech uppercase tracking-[0.08em] text-sm mb-2">Citation Map</h3>
                <div className="space-y-2">
                  {data.results.map((r, i) => (
                    <div key={i} className="border border-dashed rounded-none p-3 text-xs bg-background/40">
                      <p><strong>{r.treaty_article}</strong></p>
                      <p><strong>Treaty clause:</strong> {r.treaty_clause_text || r.obligation}</p>
                      <p><strong>Domestic clause:</strong> {r.domestic_clause_text || r.national_mapping}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-tech uppercase tracking-[0.08em] text-sm mb-2">Priority Gaps</h3>
                <ul className="list-disc pl-5 space-y-1">{data.top_urgent_gaps.map((g, i) => <li key={i}>{g}</li>)}</ul>
              </div>

              <div>
                <h3 className="font-tech uppercase tracking-[0.08em] text-sm mb-2">Action Queue 30/60/90</h3>
                <ul className="list-disc pl-5 space-y-1">{data.action_list_30_60_90.map((a, i) => <li key={i}>{a}</li>)}</ul>
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











