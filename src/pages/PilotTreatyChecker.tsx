import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TreatyResult = {
  treaty_article: string;
  obligation: string;
  national_mapping: string;
  status: string;
  severity: string;
  recommendation: string;
};

type TreatyResponse = {
  treaty: string;
  law: string;
  summary: string;
  results: TreatyResult[];
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://kham-pilot-api.onrender.com";

export default function PilotTreatyChecker() {
  const [treatyName, setTreatyName] = useState("Paris Agreement");
  const [lawName, setLawName] = useState("Bangladesh Climate Policy");
  const [treatyText, setTreatyText] = useState("");
  const [lawText, setLawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TreatyResponse | null>(null);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`${API_BASE}/api/treaty/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treaty_text: treatyText,
          national_law_text: lawText,
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navigation />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-serif text-4xl mb-2">Pilot: Treaty Compliance Checker</h1>
        <p className="text-ink/70 mb-8">Private pilot route for internal demos.</p>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={treatyName} onChange={(e) => setTreatyName(e.target.value)} placeholder="Treaty name" />
            <Input value={lawName} onChange={(e) => setLawName(e.target.value)} placeholder="National law name" />
            <Textarea
              value={treatyText}
              onChange={(e) => setTreatyText(e.target.value)}
              placeholder="Paste treaty text"
              className="min-h-40"
            />
            <Textarea
              value={lawText}
              onChange={(e) => setLawText(e.target.value)}
              placeholder="Paste national law/policy text"
              className="min-h-40"
            />
            <Button onClick={analyze} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Compliance"}
            </Button>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </CardContent>
        </Card>

        {data && (
          <Card>
            <CardHeader>
              <CardTitle>Result: {data.treaty} vs {data.law}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Summary:</strong> {data.summary}</p>
              {data.results.map((r, i) => (
                <div key={i} className="border border-ink/10 rounded-md p-3">
                  <p><strong>Article:</strong> {r.treaty_article}</p>
                  <p><strong>Obligation:</strong> {r.obligation}</p>
                  <p><strong>Mapping:</strong> {r.national_mapping}</p>
                  <p><strong>Status:</strong> {r.status} | <strong>Severity:</strong> {r.severity}</p>
                  <p><strong>Recommendation:</strong> {r.recommendation}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
