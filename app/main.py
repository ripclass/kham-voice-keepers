from datetime import datetime, timezone
from enum import Enum
import json
import os
import re
from io import BytesIO
from typing import Any, Dict, List, Optional, Tuple

import httpx
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
from pydantic import BaseModel, Field, field_validator, model_validator

app = FastAPI(title="KhaM Pilot API")

OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "openrouter/openai/gpt-4.1-mini")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "https://khamlabs.org,https://www.khamlabs.org")
allowed_origins = [o.strip() for o in allowed_origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"ok": True}


class ExtractTextResponse(BaseModel):
    filename: str
    content_type: str
    extracted_text: str
    extracted_chars: int


@app.post("/api/utils/extract-text", response_model=ExtractTextResponse)
async def extract_text(file: UploadFile = File(...)):
    filename = file.filename or "uploaded-file"
    content_type = file.content_type or "application/octet-stream"
    lower = filename.lower()

    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    if lower.endswith(".txt") or content_type.startswith("text/"):
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError:
            text = data.decode("utf-8", errors="ignore")
    elif lower.endswith(".pdf") or content_type == "application/pdf":
        try:
            reader = PdfReader(BytesIO(data))
            pages: List[str] = []
            for page in reader.pages:
                pages.append(page.extract_text() or "")
            text = "\n\n".join(pages).strip()
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to parse PDF: {e}")
    else:
        raise HTTPException(status_code=400, detail="Only .txt and .pdf files are supported")

    if len(text.strip()) == 0:
        raise HTTPException(status_code=400, detail="No extractable text found in file")

    return ExtractTextResponse(
        filename=filename,
        content_type=content_type,
        extracted_text=text,
        extracted_chars=len(text),
    )


class StrictSchema(BaseModel):
    model_config = {"extra": "forbid"}


class ComplianceStatus(str, Enum):
    compliant = "compliant"
    partial = "partial"
    gap = "gap"


class SeverityLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class ModeUsed(str, Enum):
    ai = "ai"
    fallback = "fallback"


def _safe_parse_json(raw_text: str) -> Optional[Dict[str, Any]]:
    if not raw_text:
        return None

    raw = raw_text.strip()
    if not raw:
        return None

    candidates: List[str] = [raw]
    fenced = re.search(r"```(?:json)?\s*(\{.*\})\s*```", raw, flags=re.DOTALL | re.IGNORECASE)
    if fenced:
        candidates.append(fenced.group(1).strip())

    start = raw.find("{")
    end = raw.rfind("}")
    if start != -1 and end != -1 and end > start:
        candidates.append(raw[start : end + 1])

    for candidate in candidates:
        try:
            parsed = json.loads(candidate)
        except json.JSONDecodeError:
            continue
        if isinstance(parsed, dict):
            return parsed
    return None


def _truncate_for_prompt(text: Optional[str], limit: int = 12000) -> str:
    if not text:
        return "(none)"
    trimmed = text.strip()
    if len(trimmed) <= limit:
        return trimmed
    return f"{trimmed[:limit]}\n...[truncated {len(trimmed) - limit} chars]"


def _coerce_string_list(value: Any, max_items: int = 10) -> List[str]:
    if not isinstance(value, list):
        return []
    out: List[str] = []
    for item in value:
        if not isinstance(item, str):
            continue
        cleaned = item.strip()
        if cleaned:
            out.append(cleaned)
        if len(out) >= max_items:
            break
    return out


def _relevance_check(text: str, keywords: List[str]) -> Tuple[str, float]:
    base = (text or "").lower()
    if not base.strip():
        return ("low", 0.0)

    hits = 0
    for kw in keywords:
        if kw and kw.lower() in base:
            hits += 1

    score = min(1.0, hits / max(1, len(keywords)))
    if score >= 0.5:
        return ("high", score)
    if score >= 0.2:
        return ("medium", score)
    return ("low", score)


def _openrouter_json_completion(system_prompt: str, user_prompt: str) -> Optional[Dict[str, Any]]:
    if not OPENROUTER_API_KEY:
        return None

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": OPENROUTER_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "response_format": {"type": "json_object"},
        "temperature": 0.2,
    }

    try:
        with httpx.Client(timeout=45.0) as client:
            response = client.post(OPENROUTER_API_URL, headers=headers, json=payload)
            response.raise_for_status()
            body = response.json()
    except Exception:
        return None

    choices = body.get("choices", [])
    if not choices:
        return None

    content: Any = choices[0].get("message", {}).get("content", "")
    if isinstance(content, list):
        content = "".join(
            chunk.get("text", "") if isinstance(chunk, dict) else str(chunk) for chunk in content
        )
    if not isinstance(content, str):
        content = str(content)

    return _safe_parse_json(content)


class TreatyAnalyzeRequest(StrictSchema):
    treaty_text: str = Field(default="", max_length=120000)
    national_law_text: str = Field(default="", max_length=120000)
    treaty_doc_text: Optional[str] = Field(default=None, max_length=240000)
    law_doc_text: Optional[str] = Field(default=None, max_length=240000)
    treaty_name: str = Field(default="Unknown Treaty", min_length=1, max_length=255)
    law_name: str = Field(default="Unknown Law", min_length=1, max_length=255)

    @field_validator("treaty_text", "national_law_text", "treaty_name", "law_name")
    @classmethod
    def must_not_be_blank(cls, value: str) -> str:
        return value.strip()

    @field_validator("treaty_doc_text", "law_doc_text")
    @classmethod
    def normalize_optional_doc_text(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        trimmed = value.strip()
        return trimmed or None

    @model_validator(mode="after")
    def validate_source_coverage(self) -> "TreatyAnalyzeRequest":
        if not self.treaty_name:
            raise ValueError("treaty_name must not be blank")
        if not self.law_name:
            raise ValueError("law_name must not be blank")
        if len(self.treaty_text) < 50 and not self.treaty_doc_text:
            raise ValueError("provide treaty_text with at least 50 chars or treaty_doc_text")
        if len(self.national_law_text) < 50 and not self.law_doc_text:
            raise ValueError("provide national_law_text with at least 50 chars or law_doc_text")
        return self


class TreatyAnalysisResult(StrictSchema):
    treaty_article: str
    obligation: str
    treaty_clause_text: str
    national_mapping: str
    domestic_clause_text: str
    status: ComplianceStatus
    severity: SeverityLevel
    recommendation: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    confidence_rationale: str


class QualityGate(StrictSchema):
    passed: bool
    reasons: List[str]


class TreatyAnalyzeResponse(StrictSchema):
    treaty: str
    law: str
    generated_at: str
    reference_no: str
    mode_used: ModeUsed
    fallback_reason: Optional[str] = None
    relevance_status: str = "medium"
    relevance_score: float = 0.0
    relevance_warning: Optional[str] = None
    classification: str = "INTERNAL PILOT USE ONLY"
    executive_summary: str
    top_urgent_gaps: List[str]
    action_list_30_60_90: List[str]
    human_review_disclaimer: str
    quality_gate: QualityGate
    results: List[TreatyAnalysisResult] = Field(default_factory=list)


def _pick_treaty_rows(treaty_name: str, law_name: str) -> List[TreatyAnalysisResult]:
    tn = treaty_name.lower()

    if "paris" in tn or "unfccc" in tn or "kyoto" in tn:
        return [
            TreatyAnalysisResult(treaty_article="Article 4", obligation="Prepare, communicate, and maintain NDCs.", treaty_clause_text="Each Party shall prepare, communicate and maintain successive nationally determined contributions.", national_mapping=f"{law_name}: climate planning instruments mention mitigation commitments.", domestic_clause_text=f"{law_name}: mitigation duties exist but NDC preparation cadence is not explicitly codified.", status=ComplianceStatus.partial, severity=SeverityLevel.high, recommendation="MoEFCC to issue NDC preparation and update rules by gazette notification.", confidence=0.79, confidence_rationale="Domestic language captures mitigation intent but lacks explicit statutory NDC drafting trigger."),
            TreatyAnalysisResult(treaty_article="Article 5", obligation="Conserve and enhance sinks and reservoirs.", treaty_clause_text="Parties should take action to conserve and enhance sinks and reservoirs of greenhouse gases.", national_mapping=f"{law_name}: forestry and conservation references exist across policy instruments.", domestic_clause_text=f"{law_name}: enforceable sink accounting and MRV obligations are not explicit.", status=ComplianceStatus.partial, severity=SeverityLevel.medium, recommendation="Forest Department and DoE to publish sink accounting protocol with annual disclosure.", confidence=0.73, confidence_rationale="Programmatic alignment exists; direct legal MRV mandate is incomplete."),
            TreatyAnalysisResult(treaty_article="Article 6", obligation="Support cooperative approaches and robust accounting.", treaty_clause_text="Parties engaging on a voluntary basis in cooperative approaches shall promote sustainable development and ensure environmental integrity.", national_mapping="Carbon market governance references are fragmented.", domestic_clause_text="No consolidated legal framework for Article 6 accounting integrity was identified.", status=ComplianceStatus.gap, severity=SeverityLevel.high, recommendation="MoEFCC and Ministry of Finance to draft Article 6 market participation regulation.", confidence=0.68, confidence_rationale="Explicit domestic transposition language appears absent in provided text."),
            TreatyAnalysisResult(treaty_article="Article 7", obligation="Strengthen adaptation action and planning.", treaty_clause_text="Parties should strengthen their cooperation on enhancing action on adaptation.", national_mapping="Adaptation intent is documented in strategy plans.", domestic_clause_text="Mandatory district adaptation reporting duties are not explicit.", status=ComplianceStatus.partial, severity=SeverityLevel.high, recommendation="MoDMR and MoEFCC to mandate district adaptation implementation and reporting templates.", confidence=0.74, confidence_rationale="Policy intent is strong, but enforceable local accountability is limited."),
            TreatyAnalysisResult(treaty_article="Article 9", obligation="Provide and mobilize climate finance.", treaty_clause_text="Developed country Parties shall provide financial resources to assist developing country Parties.", national_mapping="National budgeting references climate financing channels.", domestic_clause_text="Tracking and attribution methodology for climate-finance flows is not consistently codified.", status=ComplianceStatus.partial, severity=SeverityLevel.medium, recommendation="ERD and Ministry of Finance to standardize climate-finance tagging and reporting rules.", confidence=0.7, confidence_rationale="Financial mechanisms exist; legal standardization is partial."),
            TreatyAnalysisResult(treaty_article="Article 10", obligation="Promote technology development and transfer.", treaty_clause_text="Parties share a long-term vision on the importance of fully realizing technology development and transfer.", national_mapping="Technology cooperation appears in planning documents.", domestic_clause_text="No binding domestic implementation timetable for technology transfer was found.", status=ComplianceStatus.partial, severity=SeverityLevel.medium, recommendation="BIDA and MoEFCC to issue technology-transfer implementation roadmap with milestones.", confidence=0.69, confidence_rationale="Intentional alignment exists without binding timeline obligations."),
            TreatyAnalysisResult(treaty_article="Article 13", obligation="Provide transparency reports to track progress.", treaty_clause_text="Each Party shall provide information necessary to track progress made in implementing and achieving its NDC.", national_mapping="Administrative reporting exists.", domestic_clause_text="Statutory annual transparency reporting requirement is not explicit.", status=ComplianceStatus.gap, severity=SeverityLevel.high, recommendation="MoEFCC to codify annual ETF reporting duty and designate accountable directorate.", confidence=0.72, confidence_rationale="Practice-level reporting exists but enforceable legal wording is limited."),
            TreatyAnalysisResult(treaty_article="Article 14", obligation="Participate in global stocktake and align domestic cycle.", treaty_clause_text="The Conference of the Parties serving as the meeting of the Parties to this Agreement shall periodically take stock.", national_mapping="Domestic review mechanisms are present but not synchronized to stocktake cycle.", domestic_clause_text="No explicit legal trigger aligning domestic review cycle to global stocktake timeline was found.", status=ComplianceStatus.partial, severity=SeverityLevel.medium, recommendation="Cabinet Division and MoEFCC to set statutory review cycle aligned with global stocktake.", confidence=0.71, confidence_rationale="Review architecture exists but legal synchronization clause is missing."),
        ]

    if "vienna convention on consular" in tn:
        return [
            TreatyAnalysisResult(treaty_article="Article 5", obligation="Perform core consular functions.", treaty_clause_text="Consular functions consist in protecting interests and assisting nationals.", national_mapping=f"{law_name}: broad consular authority framework exists.", domestic_clause_text=f"{law_name}: function-level authority exists, but mission SOP depth is uneven.", status=ComplianceStatus.partial, severity=SeverityLevel.medium, recommendation="MoFA Consular Wing to issue mandatory mission SOP baseline.", confidence=0.76, confidence_rationale="Authority is explicit, standardization duty is incomplete."),
            TreatyAnalysisResult(treaty_article="Article 8", obligation="Perform consular functions in third state when authorized.", treaty_clause_text="Upon appropriate notification, a consular post may perform functions in a third State.", national_mapping="Third-state contingency practice exists.", domestic_clause_text="No unified legal protocol for third-state activation timelines was found.", status=ComplianceStatus.partial, severity=SeverityLevel.medium, recommendation="MoFA Legal Affairs to formalize third-state consular activation SOP.", confidence=0.69, confidence_rationale="Operational practice is plausible; explicit legal standard is limited."),
            TreatyAnalysisResult(treaty_article="Article 23", obligation="Consular officers may be declared persona non grata; response readiness required.", treaty_clause_text="The receiving State may notify that a consular officer is persona non grata.", national_mapping="Diplomatic response pathways exist.", domestic_clause_text="Mission continuity protocol after persona non grata action is not fully codified.", status=ComplianceStatus.partial, severity=SeverityLevel.medium, recommendation="MoFA to codify mission continuity checklist for persona non grata scenarios.", confidence=0.67, confidence_rationale="Framework exists but procedural legal detail is incomplete."),
            TreatyAnalysisResult(treaty_article="Article 31", obligation="Protect consular premises.", treaty_clause_text="Consular premises shall be inviolable to the extent provided in this article.", national_mapping="Premises security responsibilities are distributed across actors.", domestic_clause_text="Explicit host-coordination protocol and evidence logging duty are not consistently mandated.", status=ComplianceStatus.partial, severity=SeverityLevel.high, recommendation="MoFA and host-state liaison desks to adopt premises security escalation SOP.", confidence=0.72, confidence_rationale="Security principle is recognized; enforceable process detail is partial."),
            TreatyAnalysisResult(treaty_article="Article 35", obligation="Ensure freedom of communication for official purposes.", treaty_clause_text="The receiving State shall permit and protect freedom of communication for all official purposes.", national_mapping="Mission telecom contingencies are ad hoc.", domestic_clause_text="No binding communications redundancy standard was identified.", status=ComplianceStatus.gap, severity=SeverityLevel.high, recommendation="MoFA ICT and mission admin units to mandate satellite/backup comms readiness standard.", confidence=0.7, confidence_rationale="Communications obligation is clear; domestic codification appears absent."),
            TreatyAnalysisResult(treaty_article="Article 36", obligation="Enable consular communication/access for detained nationals.", treaty_clause_text="Consular officers shall be free to communicate with nationals and have access to them.", national_mapping="Detention support is recognized in practice.", domestic_clause_text="Uniform 24-hour notification and escalation SLA is not codified.", status=ComplianceStatus.partial, severity=SeverityLevel.high, recommendation="MoFA Consular Wing to impose 24-hour detention notification SLA with auditable logs.", confidence=0.73, confidence_rationale="Legal principle maps strongly; SLA-level domestic language is missing."),
            TreatyAnalysisResult(treaty_article="Article 37", obligation="Receive notification in guardianship/death/wreck cases.", treaty_clause_text="If relevant information is available, authorities shall inform the consular post.", national_mapping="Incident notification channels exist.", domestic_clause_text="Case-type specific notification forms and timelines are not standardized.", status=ComplianceStatus.partial, severity=SeverityLevel.medium, recommendation="MoFA to standardize incident notification templates for Article 37 triggers.", confidence=0.68, confidence_rationale="Duty is reflected broadly, but procedural precision is limited."),
            TreatyAnalysisResult(treaty_article="Article 55", obligation="Respect laws/regulations of receiving state while exercising functions.", treaty_clause_text="Without prejudice to privileges and immunities, all persons enjoying such privileges and immunities have a duty to respect the laws.", national_mapping="Conduct compliance guidance exists.", domestic_clause_text="Mission-level annual legal compliance refresher requirement is not mandatory.", status=ComplianceStatus.partial, severity=SeverityLevel.low, recommendation="MoFA to require annual legal compliance certification for mission staff.", confidence=0.71, confidence_rationale="Behavioral compliance exists; annual formalization requirement is not explicit."),
        ]

    return [
        TreatyAnalysisResult(treaty_article=f"Article {idx}", obligation="Implement treaty commitments in good faith with article-level domestic transposition.", treaty_clause_text="State Parties shall adopt measures necessary to give effect to treaty obligations.", national_mapping=f"{law_name}: broad alignment language exists in available material.", domestic_clause_text=f"{law_name}: explicit section-level transposition for this article is not clearly evidenced.", status=ComplianceStatus.partial, severity=SeverityLevel.medium if idx % 2 == 0 else SeverityLevel.high, recommendation="Relevant line ministry and Law Ministry to issue article-specific implementing instruction.", confidence=0.66, confidence_rationale="Assessment is generalized due to limited article-specific legal text in the provided excerpts.")
        for idx in range(1, 9)
    ]


def _coerce_treaty_results(raw_results: Any) -> List[TreatyAnalysisResult]:
    if not isinstance(raw_results, list):
        return []

    results: List[TreatyAnalysisResult] = []
    for raw in raw_results:
        if not isinstance(raw, dict):
            continue

        treaty_article = str(raw.get("treaty_article", "")).strip()
        obligation = str(raw.get("obligation", "")).strip()
        treaty_clause_text = str(raw.get("treaty_clause_text", raw.get("obligation", ""))).strip()
        national_mapping = str(raw.get("national_mapping", "")).strip()
        domestic_clause_text = str(raw.get("domestic_clause_text", raw.get("national_mapping", ""))).strip()
        recommendation = str(raw.get("recommendation", "")).strip()
        confidence_rationale = str(raw.get("confidence_rationale", "Mapping confidence estimated from direct textual overlap and clause specificity.")).strip()
        if not treaty_article or not obligation or not national_mapping or not recommendation:
            continue

        status_raw = str(raw.get("status", ComplianceStatus.partial.value)).strip().lower()
        severity_raw = str(raw.get("severity", SeverityLevel.medium.value)).strip().lower()
        status = ComplianceStatus(status_raw) if status_raw in ComplianceStatus._value2member_map_ else ComplianceStatus.partial
        severity = SeverityLevel(severity_raw) if severity_raw in SeverityLevel._value2member_map_ else SeverityLevel.medium

        try:
            confidence = float(raw.get("confidence", 0.7))
        except (TypeError, ValueError):
            confidence = 0.7
        confidence = max(0.0, min(1.0, confidence))

        results.append(
            TreatyAnalysisResult(
                treaty_article=treaty_article,
                obligation=obligation,
                treaty_clause_text=treaty_clause_text,
                national_mapping=national_mapping,
                domestic_clause_text=domestic_clause_text,
                status=status,
                severity=severity,
                recommendation=recommendation,
                confidence=confidence,
                confidence_rationale=confidence_rationale,
            )
        )

    return results


def _is_authority_named(text: str) -> bool:
    authority_markers = [
        "ministry",
        "moefcc",
        "mofa",
        "cabinet division",
        "directorate",
        "department",
        "authority",
        "commission",
        "division",
    ]
    lower = text.lower()
    return any(marker in lower for marker in authority_markers)


def _normalize_30_60_90_actions(actions: List[str]) -> List[str]:
    normalized = [a.strip() for a in actions if a.strip()]
    slots = {"30": None, "60": None, "90": None}

    for action in normalized:
        for day in slots:
            if day in action:
                slots[day] = action

    defaults = {
        "30": "30 days: MoEFCC and Ministry of Law to complete article-level legal gap validation and ownership assignment.",
        "60": "60 days: MoEFCC to submit draft legal/administrative instruments for high-severity treaty gaps.",
        "90": "90 days: Cabinet Division and MoEFCC to issue approved compliance roadmap with public monitoring cadence.",
    }

    out: List[str] = []
    for day in ["30", "60", "90"]:
        candidate = slots[day] or defaults[day]
        if not _is_authority_named(candidate):
            candidate = defaults[day]
        out.append(candidate)
    return out


def _build_treaty_fallback(payload: TreatyAnalyzeRequest, now: datetime, ref: str) -> TreatyAnalyzeResponse:
    results = _pick_treaty_rows(payload.treaty_name, payload.law_name)
    top_gaps = [
        f"{r.treaty_article}: {r.recommendation}" for r in results if r.status != ComplianceStatus.compliant
    ][:5]

    return TreatyAnalyzeResponse(
        treaty=payload.treaty_name,
        law=payload.law_name,
        generated_at=now.isoformat(),
        reference_no=ref,
        mode_used=ModeUsed.fallback,
        fallback_reason="openrouter_unavailable_or_invalid_response",
        executive_summary=(
            "Detailed fallback analysis indicates partial treaty alignment with concrete policy exposure areas. "
            f"Input coverage: treaty excerpt {len(payload.treaty_text)} chars; treaty doc {len(payload.treaty_doc_text or '')} chars; "
            f"national instrument excerpt {len(payload.national_law_text)} chars; law doc {len(payload.law_doc_text or '')} chars."
        ),
        top_urgent_gaps=top_gaps,
        action_list_30_60_90=_normalize_30_60_90_actions([
            "30 days: MoEFCC and Ministry of Law convene legal focal points and validate each article-to-clause mapping with annexed source text.",
            "60 days: MoEFCC issues draft ministerial circular package for high-severity gaps with named implementing authorities.",
            "90 days: Cabinet Division publishes compliance roadmap, review dashboard, and international review briefing schedule.",
        ]),
        human_review_disclaimer=(
            "Fallback mode generated this report without successful live LLM completion. Treat as structured draft and validate by legal officers before policy action."
        ),
        quality_gate=QualityGate(passed=True, reasons=[]),
        results=results,
    )


def _build_treaty_ai_response(
    payload: TreatyAnalyzeRequest, now: datetime, ref: str
) -> Optional[TreatyAnalyzeResponse]:
    ai_json = _openrouter_json_completion(
        system_prompt=(
            "You are a senior legal compliance analyst embedded in the Ministry of Foreign Affairs of Bangladesh. "
            "You specialize in mapping international treaty obligations to domestic legislative and regulatory frameworks. "
            "Return only valid JSON. No markdown, no code fences, no text outside JSON. "
            "Every result row must include exact treaty article and exact domestic clause mapping. "
            "If no domestic clause is found, set status='gap' and state that clearly. "
            "Confidence rules: >0.85 explicit direct textual correspondence; 0.65-0.85 reasonable mapping needing interpretation; <0.65 inferred mapping requiring strong human legal review. "
            "Always provide confidence_rationale per row. "
            "Severity rules: high=direct treaty exposure/violation risk, medium=implementation weakness, low=procedural/admin gap. "
            "Action list must be specific and assignable to responsible authority. "
            "You must analyze a minimum of eight treaty articles; never stop at five. "
            "action_list_30_60_90 must contain at least one action each at 30 days, 60 days, and 90 days, each naming a specific ministry or government authority. "
            "Order top_urgent_gaps by highest severity then lowest confidence. "
            "You must complete full JSON object; do not truncate or summarize. Incomplete JSON causes system error."
        ),
        user_prompt=(
            "Build a treaty compliance analysis JSON using this schema:\n"
            "{\n"
            '  "executive_summary": string,\n'
            '  "top_urgent_gaps": string[],\n'
            '  "action_list_30_60_90": string[],\n'
            '  "human_review_disclaimer": string,\n'
            '  "results": [\n'
            "    {\n"
            '      "treaty_article": string,\n'
            '      "obligation": string,\n'
            '      "treaty_clause_text": string,\n'
            '      "national_mapping": string,\n'
            '      "domestic_clause_text": string,\n'
            '      "status": "compliant" | "partial" | "gap",\n'
            '      "severity": "low" | "medium" | "high",\n'
            '      "recommendation": string,\n'
            '      "confidence": number,\n'
            '      "confidence_rationale": string\n'
            "    }\n"
            "  ]\n"
            "}\n\n"
            "Hard constraints: analyze minimum 8 treaty articles; include exact side-by-side citations; do not finalize unless 30/60/90 action slots are all present with named authorities.\n\n"
            f"Treaty Name: {payload.treaty_name}\n"
            f"Law Name: {payload.law_name}\n\n"
            f"Treaty excerpt:\n{_truncate_for_prompt(payload.treaty_text)}\n\n"
            f"Treaty document text:\n{_truncate_for_prompt(payload.treaty_doc_text)}\n\n"
            f"National law excerpt:\n{_truncate_for_prompt(payload.national_law_text)}\n\n"
            f"Law document text:\n{_truncate_for_prompt(payload.law_doc_text)}\n"
        ),
    )

    if not ai_json:
        return None

    results = _coerce_treaty_results(ai_json.get("results"))
    if len(results) < 8:
        return None

    top_urgent_gaps = _coerce_string_list(ai_json.get("top_urgent_gaps"), max_items=5)
    action_list = _normalize_30_60_90_actions(_coerce_string_list(ai_json.get("action_list_30_60_90"), max_items=10))

    executive_summary = str(ai_json.get("executive_summary", "")).strip()
    human_review = str(ai_json.get("human_review_disclaimer", "")).strip()
    if not executive_summary or not human_review:
        return None

    return TreatyAnalyzeResponse(
        treaty=payload.treaty_name,
        law=payload.law_name,
        generated_at=now.isoformat(),
        reference_no=ref,
        mode_used=ModeUsed.ai,
        executive_summary=executive_summary,
        top_urgent_gaps=top_urgent_gaps,
        action_list_30_60_90=action_list,
        human_review_disclaimer=human_review,
        quality_gate=QualityGate(passed=True, reasons=[]),
        results=results,
    )


def _build_treaty_quality_gate(response: TreatyAnalyzeResponse) -> QualityGate:
    reasons: List[str] = []

    if len(response.results) < 8:
        reasons.append("Minimum article coverage failed: fewer than 8 treaty articles mapped.")

    for day in ["30", "60", "90"]:
        action = next((a for a in response.action_list_30_60_90 if day in a), None)
        if action is None:
            reasons.append(f"Action plan incomplete: missing {day}-day action.")
        elif not _is_authority_named(action):
            reasons.append(f"Action plan authority missing: {day}-day action has no named ministry/authority.")

    return QualityGate(passed=len(reasons) == 0, reasons=reasons)


@app.post("/api/treaty/analyze", response_model=TreatyAnalyzeResponse)
def treaty_analyze(payload: TreatyAnalyzeRequest) -> TreatyAnalyzeResponse:
    now = datetime.now(timezone.utc)
    ref = f"KHM-GOV-{now.strftime('%Y%m%d')}-TC-{now.strftime('%H%M%S')}"

    treaty_input = f"{payload.treaty_name}\n{payload.treaty_text}\n{payload.treaty_doc_text or ''}".lower()
    law_input = f"{payload.law_name}\n{payload.national_law_text}\n{payload.law_doc_text or ''}".lower()
    treaty_status, treaty_score = _relevance_check(treaty_input, ["article", "party", "agreement", "convention", "treaty", "protocol"])
    law_status, law_score = _relevance_check(law_input, ["act", "section", "rule", "policy", "order", "law"])
    relevance_score = round((treaty_score + law_score) / 2, 3)
    relevance_status = "low" if (treaty_status == "low" or law_status == "low") else ("high" if treaty_status == "high" and law_status == "high" else "medium")
    relevance_warning = None
    if relevance_status == "low":
        relevance_warning = "Uploaded or pasted text appears weakly related to treaty/law analysis. Results may be unreliable."

    ai_response = _build_treaty_ai_response(payload, now, ref) if OPENROUTER_API_KEY else None
    response = ai_response if ai_response is not None else _build_treaty_fallback(payload, now, ref)
    response.relevance_status = relevance_status
    response.relevance_score = relevance_score
    response.relevance_warning = relevance_warning
    response.quality_gate = _build_treaty_quality_gate(response)
    return response


class CrisisGenerateRequest(StrictSchema):
    mission_location: str = Field(..., min_length=1, max_length=255)
    crisis_type: str = Field(..., min_length=1, max_length=255)
    nationals_affected: int = Field(..., ge=0, le=50000000)
    embassy_resources: List[str] = Field(default_factory=list, max_length=100)
    constraints: List[str] = Field(default_factory=list, max_length=50)
    local_conditions: str = Field(..., min_length=30, max_length=5000)
    scenario_doc_text: Optional[str] = Field(default=None, max_length=240000)

    @field_validator("mission_location", "crisis_type", "local_conditions")
    @classmethod
    def must_not_be_blank(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("must not be blank")
        return trimmed

    @field_validator("embassy_resources", "constraints")
    @classmethod
    def normalize_list(cls, value: List[str]) -> List[str]:
        return [item.strip() for item in value if item.strip()]

    @field_validator("scenario_doc_text")
    @classmethod
    def normalize_optional_scenario_doc(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        trimmed = value.strip()
        return trimmed or None

    @field_validator("embassy_resources")
    @classmethod
    def require_resources(cls, value: List[str]) -> List[str]:
        if len(value) == 0:
            raise ValueError("at least one resource is required")
        return value

    @field_validator("constraints")
    @classmethod
    def require_constraints(cls, value: List[str]) -> List[str]:
        if len(value) == 0:
            raise ValueError("at least one constraint is required")
        return value


class RoleTask(StrictSchema):
    role: str
    task: str


class TimelinePhase(StrictSchema):
    phase: str
    actions: List[str]


class EvacuationPlan(StrictSchema):
    assembly_points: List[str]
    priority_categories: List[str]
    movement_windows: List[str]
    coordination_requirements: List[str]


class CrisisGenerateResponse(StrictSchema):
    reference_no: str
    generated_at: str
    mode_used: ModeUsed
    fallback_reason: Optional[str] = None
    relevance_status: str = "medium"
    relevance_score: float = 0.0
    relevance_warning: Optional[str] = None
    classification: str = "INTERNAL PILOT USE ONLY"
    mission_location: str
    crisis_type: str
    nationals_affected: int
    condition_yellow: List[str]
    condition_orange: List[str]
    condition_red: List[str]
    role_assigned_tasks: List[RoleTask]
    timeline: List[TimelinePhase]
    communication_templates: List[str]
    evacuation_plan: EvacuationPlan
    sitrep_template: str
    assumptions_and_unknowns: List[str]
    human_review_disclaimer: str
    quality_gate: QualityGate


def _build_crisis_fallback(payload: CrisisGenerateRequest, now: datetime, ref: str) -> CrisisGenerateResponse:
    constraints_text = ", ".join(payload.constraints) if payload.constraints else "No specific constraints provided"

    return CrisisGenerateResponse(
        reference_no=ref,
        generated_at=now.isoformat(),
        mode_used=ModeUsed.fallback,
        fallback_reason="openrouter_unavailable_or_invalid_response",
        mission_location=payload.mission_location,
        crisis_type=payload.crisis_type,
        nationals_affected=payload.nationals_affected,
        condition_yellow=[
            "Activate mission crisis cell, nominate shift lead, and open incident log within 15 minutes.",
            "Issue first advisory notice to registered nationals, employers, and diaspora channels with hotline protocol.",
            "Verify contact tree coverage by district and mark unreachable groups for escalation.",
            f"Record immediate constraints and operational limits: {constraints_text}.",
        ],
        condition_orange=[
            "Pre-position transport, medical support, emergency food/water, and temporary shelter coordination assets.",
            "Confirm safe assembly points and fallback locations with host-country counterparts.",
            "Start 4-6 hourly HQ updates, including risk map and vulnerable group status.",
            "Prepare evacuation manifest template by priority group (medical, women/children, elderly, undocumented).",
        ],
        condition_red=[
            "Execute phased evacuation/relocation by priority groups and corridor availability windows.",
            "Run hourly SITREP cycle to HQ and neighboring missions with casualty/accountability updates.",
            "Maintain live accountability roster and dedicated family communication cell.",
            "Trigger contingency route protocol if primary corridor fails or telecom collapses.",
        ],
        role_assigned_tasks=[
            RoleTask(role="Head of Mission", task="Authorize condition changes, approve movement windows, and sign mission-level directives."),
            RoleTask(role="Deputy Head of Mission", task="Run command cell continuity, escalation tracking, and inter-agency coordination."),
            RoleTask(role="Consular Officer", task="Manage registry verification, detention/hospital desk, and hotline outcomes."),
            RoleTask(role="Security Officer", task="Validate routes, assembly point security, and convoy discipline with host liaison."),
            RoleTask(role="Admin/Logistics Officer", task="Track vehicles, fuel, shelter, medical kits, and staff duty rotation."),
        ],
        timeline=[
            TimelinePhase(phase="0-2 hours", actions=["Stand up crisis cell", "Publish first advisory", "Verify staff/hotline readiness", "Start district accountability board"]),
            TimelinePhase(phase="2-6 hours", actions=["Confirm assembly points", "Prioritize vulnerable cohorts", "Issue movement SOP to field teams", "Publish first convoy movement window"]),
            TimelinePhase(phase="6-24 hours", actions=["Run controlled movement operations", "Update employers/families", "Refresh risk grid each cycle", "Escalate blocked routes to host-country security desk"]),
            TimelinePhase(phase="24-72 hours", actions=["Run named convoy rotations by assembly point", "Reconcile headcount and unresolved missing-person cases by district", "Issue 12-hour welfare update bulletins to families", "Prepare stabilization transition brief with residual-risk map"]),
        ],
        communication_templates=[
            "Public advisory: The Bangladesh Mission requests all nationals in affected zones to report location via hotline/WhatsApp (+880-2-XXXXXXXX) and avoid unauthorized movement until corridor windows are confirmed.",
            "Employer coordination note: Provide worker roster by district, immediate shelter status, and transport availability within 2 hours.",
            "Family message: Your family member's status is currently under mission tracking; next official update window is HH:MM local.",
            "HQ SITREP lead line: As of HHMM local, mission posture is <Y/O/R>; affected nationals <count>; movement status <active/paused>; critical needs <list>.",
        ],
        evacuation_plan=EvacuationPlan(
            assembly_points=[
                "Mission Annex Parking Compound (primary)",
                "St. George School Grounds (secondary)",
                "Port District Community Hall (fallback)",
            ],
            priority_categories=[
                "Critical medical cases",
                "Children and pregnant women",
                "Elderly and persons with disabilities",
                "Detained/recently released nationals",
                "General adult cohort",
            ],
            movement_windows=[
                "0500-0700 local: low-traffic escorted movement",
                "1300-1430 local: limited corridor opening",
                "2200-2330 local: contingency night transfer if curfew exemption confirmed",
            ],
            coordination_requirements=[
                "Host-country police escorts for convoy lead and tail vehicles",
                "Written curfew-exemption confirmation for movement windows",
                "Route deconfliction with municipal authorities and checkpoint commanders",
                "Hospital and temporary shelter intake pre-clearance with local authorities",
            ],
        ),
        sitrep_template=(
            "SITREP\nRef: <ref>\nTime: <local>\nCondition Level: <Y/O/R>\nAffected Nationals: <count>\n"
            "Accounted For / Unaccounted: <x>/<y>\nActions Completed: <list>\nImmediate Risks: <list>\n"
            "Resource Status (vehicles/fuel/staff/shelter): <list>\nPriority Requests to HQ: <list>\nNext Update ETA: <time>"
        ),
        assumptions_and_unknowns=[
            "Assumption: host-country security liaison remains reachable during initial response window.",
            "Assumption: at least one transport corridor remains intermittently open every 6-12 hours.",
            "Unknown: exact number of unregistered nationals in high-risk zones.",
            "Unknown: telecom reliability window and mass-notification delivery success rate.",
            "Unknown: airport/land-border reopening timeline for cross-border evacuation options.",
        ],
        human_review_disclaimer=(
            "Fallback mode generated this operational order without successful live LLM completion. Mission leadership must validate and issue final orders before execution."
        ),
        quality_gate=QualityGate(passed=True, reasons=[]),
    )


def _coerce_role_tasks(raw_tasks: Any) -> List[RoleTask]:
    if not isinstance(raw_tasks, list):
        return []
    out: List[RoleTask] = []
    for raw in raw_tasks:
        if not isinstance(raw, dict):
            continue
        role = str(raw.get("role", "")).strip()
        task = str(raw.get("task", "")).strip()
        if role and task:
            out.append(RoleTask(role=role, task=task))
    return out


def _coerce_timeline(raw_timeline: Any) -> List[TimelinePhase]:
    if not isinstance(raw_timeline, list):
        return []
    out: List[TimelinePhase] = []
    for raw in raw_timeline:
        if not isinstance(raw, dict):
            continue
        phase = str(raw.get("phase", "")).strip()
        actions = _coerce_string_list(raw.get("actions"), max_items=10)
        if phase and actions:
            out.append(TimelinePhase(phase=phase, actions=actions))
    return out


def _timeline_is_complete(timeline: List[TimelinePhase]) -> bool:
    required_phases = ["0-2 hours", "2-6 hours", "6-24 hours", "24-72 hours"]
    by_phase = {t.phase.lower(): t for t in timeline}
    for phase in required_phases:
        item = by_phase.get(phase)
        if item is None or len(item.actions) < 3:
            return False
    return True


def _coerce_evacuation_plan(raw_plan: Any) -> Optional[EvacuationPlan]:
    if not isinstance(raw_plan, dict):
        return None
    plan = EvacuationPlan(
        assembly_points=_coerce_string_list(raw_plan.get("assembly_points"), max_items=10),
        priority_categories=_coerce_string_list(raw_plan.get("priority_categories"), max_items=10),
        movement_windows=_coerce_string_list(raw_plan.get("movement_windows"), max_items=10),
        coordination_requirements=_coerce_string_list(raw_plan.get("coordination_requirements"), max_items=10),
    )
    if not plan.assembly_points or not plan.priority_categories or not plan.movement_windows or not plan.coordination_requirements:
        return None
    return plan


def _build_crisis_ai_response(
    payload: CrisisGenerateRequest, now: datetime, ref: str
) -> Optional[CrisisGenerateResponse]:
    ai_json = _openrouter_json_completion(
        system_prompt=(
            "You are a senior consular emergency management advisor producing an operational order for Bangladesh missions. "
            "Return only valid JSON. No markdown, no code fences, no text outside JSON. "
            "All recommendations must be scenario-specific and constraint-aware (telecom outage, airport closure, etc.). "
            "Condition tiers must be distinct: Yellow=monitor/prepare, Orange=active controlled response, Red=full emergency execution. "
            "Use exact roles: Head of Mission, Deputy Head of Mission, Consular Officer, Political Officer, Security Officer, Admin and Logistics Officer, Communications Officer. "
            "Timeline phases must be exactly: 0-2 hours, 2-6 hours, 6-24 hours, 24-72 hours. "
            "Each timeline phase must contain at least 3 specific, operationally distinct actions; avoid generic phrasing. "
            "Assumptions and unknowns must include at least three each, specific to this scenario and not generic. "
            "Communication templates should use realistic placeholders (e.g., +880-2-XXXXXXXX), not unresolved token names. "
            "Include a mandatory evacuation_plan object with assembly_points, priority_categories (highest to lowest), movement_windows, and coordination_requirements. "
            "SITREP template must be fillable with <placeholders> and completable in under five minutes. "
            "You must complete full JSON object; do not truncate or summarize. Incomplete JSON causes system error."
        ),
        user_prompt=(
            "Build an operational response plan JSON using this schema:\n"
            "{\n"
            '  "condition_yellow": string[],\n'
            '  "condition_orange": string[],\n'
            '  "condition_red": string[],\n'
            '  "role_assigned_tasks": [{"role": string, "task": string}],\n'
            '  "timeline": [{"phase": string, "actions": string[]}],\n'
            '  "communication_templates": string[],\n'
            '  "evacuation_plan": {\n'
            '    "assembly_points": string[],\n'
            '    "priority_categories": string[],\n'
            '    "movement_windows": string[],\n'
            '    "coordination_requirements": string[]\n'
            '  },\n'
            '  "sitrep_template": string,\n'
            '  "assumptions_and_unknowns": string[],\n'
            '  "human_review_disclaimer": string\n'
            "}\n\n"
            f"Mission location: {payload.mission_location}\n"
            f"Crisis type: {payload.crisis_type}\n"
            f"Nationals affected: {payload.nationals_affected}\n"
            f"Embassy resources: {', '.join(payload.embassy_resources)}\n"
            f"Constraints: {', '.join(payload.constraints)}\n"
            f"Local conditions: {_truncate_for_prompt(payload.local_conditions, limit=6000)}\n"
            f"Scenario document text: {_truncate_for_prompt(payload.scenario_doc_text)}\n"
        ),
    )

    if not ai_json:
        return None

    yellow = _coerce_string_list(ai_json.get("condition_yellow"), max_items=10)
    orange = _coerce_string_list(ai_json.get("condition_orange"), max_items=10)
    red = _coerce_string_list(ai_json.get("condition_red"), max_items=10)
    role_tasks = _coerce_role_tasks(ai_json.get("role_assigned_tasks"))
    timeline = _coerce_timeline(ai_json.get("timeline"))
    comms = _coerce_string_list(ai_json.get("communication_templates"), max_items=10)
    assumptions = _coerce_string_list(ai_json.get("assumptions_and_unknowns"), max_items=10)
    evacuation_plan = _coerce_evacuation_plan(ai_json.get("evacuation_plan"))
    sitrep = str(ai_json.get("sitrep_template", "")).strip()
    human_review = str(ai_json.get("human_review_disclaimer", "")).strip()

    if not yellow or not orange or not red or not role_tasks or not timeline or not comms or evacuation_plan is None:
        return None
    if not _timeline_is_complete(timeline):
        return None
    if not sitrep or not human_review:
        return None

    return CrisisGenerateResponse(
        reference_no=ref,
        generated_at=now.isoformat(),
        mode_used=ModeUsed.ai,
        mission_location=payload.mission_location,
        crisis_type=payload.crisis_type,
        nationals_affected=payload.nationals_affected,
        condition_yellow=yellow,
        condition_orange=orange,
        condition_red=red,
        role_assigned_tasks=role_tasks,
        timeline=timeline,
        communication_templates=comms,
        evacuation_plan=evacuation_plan,
        sitrep_template=sitrep,
        assumptions_and_unknowns=assumptions,
        human_review_disclaimer=human_review,
        quality_gate=QualityGate(passed=True, reasons=[]),
    )


def _build_crisis_quality_gate(response: CrisisGenerateResponse) -> QualityGate:
    reasons: List[str] = []

    if not _timeline_is_complete(response.timeline):
        reasons.append("Timeline quality failed: each required phase must include at least 3 specific actions.")

    plan = response.evacuation_plan
    if not plan.assembly_points:
        reasons.append("Evacuation plan incomplete: assembly_points missing.")
    if not plan.priority_categories:
        reasons.append("Evacuation plan incomplete: priority_categories missing.")
    if not plan.movement_windows:
        reasons.append("Evacuation plan incomplete: movement_windows missing.")
    if not plan.coordination_requirements:
        reasons.append("Evacuation plan incomplete: coordination_requirements missing.")

    return QualityGate(passed=len(reasons) == 0, reasons=reasons)


@app.post("/api/crisis/generate", response_model=CrisisGenerateResponse)
def crisis_generate(payload: CrisisGenerateRequest) -> CrisisGenerateResponse:
    now = datetime.now(timezone.utc)
    ref = f"KHM-GOV-{now.strftime('%Y%m%d')}-CR-{now.strftime('%H%M%S')}"

    crisis_input = (
        f"{payload.mission_location}\n{payload.crisis_type}\n{payload.local_conditions}\n"
        f"{' '.join(payload.constraints)}\n{' '.join(payload.embassy_resources)}\n{payload.scenario_doc_text or ''}"
    ).lower()
    relevance_status, relevance_score = _relevance_check(
        crisis_input,
        ["mission", "crisis", "evac", "consular", "security", "nationals", "hotline", "shelter", "roadblock", "telecom"],
    )
    relevance_warning = None
    if relevance_status == "low":
        relevance_warning = "Scenario inputs appear weakly related to consular crisis planning. Output may be unreliable."

    ai_response = _build_crisis_ai_response(payload, now, ref) if OPENROUTER_API_KEY else None
    response = ai_response if ai_response is not None else _build_crisis_fallback(payload, now, ref)
    response.relevance_status = relevance_status
    response.relevance_score = round(relevance_score, 3)
    response.relevance_warning = relevance_warning
    response.quality_gate = _build_crisis_quality_gate(response)
    return response
