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
    results: List[TreatyAnalysisResult] = Field(default_factory=list)


def _pick_treaty_rows(treaty_name: str, law_name: str) -> List[TreatyAnalysisResult]:
    tn = treaty_name.lower()
    rows: List[TreatyAnalysisResult] = []

    if "paris" in tn or "unfccc" in tn or "kyoto" in tn:
        rows = [
            TreatyAnalysisResult(
                treaty_article="Article 4",
                obligation="Prepare, communicate, and maintain mitigation contributions and measures.",
                treaty_clause_text="Each Party shall prepare, communicate and maintain successive nationally determined contributions.",
                national_mapping=f"{law_name}: climate policy commitments and implementation mechanisms are documented.",
                domestic_clause_text=f"{law_name}: policy commitments to mitigation and reporting are present in broad terms.",
                status=ComplianceStatus.partial,
                severity=SeverityLevel.medium,
                recommendation="Publish legally binding implementation timelines and annual progress publication duty.",
                confidence=0.78,
                confidence_rationale="Reasonable correspondence exists, but domestic language is policy-level and not fully binding to treaty cadence.",
            ),
            TreatyAnalysisResult(
                treaty_article="Article 7",
                obligation="Strengthen adaptation planning and implementation with vulnerable population focus.",
                treaty_clause_text="Parties should strengthen their cooperation on enhancing action on adaptation.",
                national_mapping="Adaptation is addressed in policy documents, but legally enforceable local reporting obligations are limited.",
                domestic_clause_text="Adaptation is present in strategy statements; binding local reporting clauses are not explicit.",
                status=ComplianceStatus.partial,
                severity=SeverityLevel.high,
                recommendation="Create mandatory district-level adaptation reporting and auditing provisions.",
                confidence=0.74,
                confidence_rationale="Mapping is inferential from policy intent and lacks direct enforceable clause linkage.",
            ),
            TreatyAnalysisResult(
                treaty_article="Article 13",
                obligation="Provide transparent reporting of actions, support, and outcomes under an enhanced transparency framework.",
                treaty_clause_text="Each Party shall provide information necessary to track progress made in implementing and achieving its NDC.",
                national_mapping="Reporting obligations exist institutionally but are not consistently codified in enforceable domestic instruments.",
                domestic_clause_text="Reporting practice exists administratively; enforceable statutory transparency obligations are limited.",
                status=ComplianceStatus.gap,
                severity=SeverityLevel.high,
                recommendation="Codify annual national transparency report requirements and responsible authority designation.",
                confidence=0.71,
                confidence_rationale="High-level transparency intent is visible but direct legal transposition is incomplete.",
            ),
        ]
    elif "vienna convention on consular" in tn:
        rows = [
            TreatyAnalysisResult(
                treaty_article="Article 5",
                obligation="Perform consular functions including protection of nationals and assistance in distress.",
                treaty_clause_text="Consular functions consist in protecting in the receiving State the interests of the sending State and of its nationals.",
                national_mapping=f"{law_name}: diplomatic framework exists; mission-level operational SOPs vary in maturity.",
                domestic_clause_text=f"{law_name}: framework-level consular authority exists; mission SOP specificity varies.",
                status=ComplianceStatus.partial,
                severity=SeverityLevel.medium,
                recommendation="Issue standardized mission SOP templates with mandatory annual readiness review.",
                confidence=0.76,
                confidence_rationale="Legal basis is present, but operational mapping is not uniformly codified across mission SOPs.",
            ),
            TreatyAnalysisResult(
                treaty_article="Article 36",
                obligation="Ensure communication and access in detention-related circumstances involving nationals.",
                treaty_clause_text="Consular officers shall be free to communicate with nationals of the sending State and to have access to them.",
                national_mapping="Legal posture recognized, but response-time standards and escalation matrix are not uniformly documented.",
                domestic_clause_text="Consular access principles are recognized; standard response-time obligations are not uniformly specified.",
                status=ComplianceStatus.partial,
                severity=SeverityLevel.high,
                recommendation="Adopt a 24-hour notification/escalation standard with auditable logs.",
                confidence=0.72,
                confidence_rationale="Mapping relies on practice-level interpretation rather than explicit national clause language.",
            ),
        ]
    else:
        rows = [
            TreatyAnalysisResult(
                treaty_article="Article 1",
                obligation="General obligation to implement treaty commitments in good faith.",
                treaty_clause_text="Each State Party shall take necessary measures to implement treaty obligations in good faith.",
                national_mapping=f"{law_name}: broad policy alignment appears present.",
                domestic_clause_text=f"{law_name}: broad policy and administrative alignment appears present in available excerpts.",
                status=ComplianceStatus.partial,
                severity=SeverityLevel.medium,
                recommendation="Map each substantive treaty article to a domestic legal clause and assign implementing authority.",
                confidence=0.69,
                confidence_rationale="Assessment is generalized due to limited domain-specific clause evidence in provided excerpts.",
            )
        ]

    return rows


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
        action_list_30_60_90=[
            "30 days: convene legal and policy focal points; validate each cited article-to-clause mapping with source text annex.",
            "60 days: issue ministerial circular/package draft for high-severity gaps with implementing authority and timeline.",
            "90 days: publish compliance roadmap, create review dashboard, and pre-brief upcoming international review positions.",
        ],
        human_review_disclaimer=(
            "Fallback mode generated this report without successful live LLM completion. Treat as structured draft and validate by legal officers before policy action."
        ),
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
    if not results:
        return None

    top_urgent_gaps = _coerce_string_list(ai_json.get("top_urgent_gaps"), max_items=5)
    action_list = _coerce_string_list(ai_json.get("action_list_30_60_90"), max_items=3)
    if len(action_list) < 3:
        action_list = [
            "30 days: validate article-level legal mapping and assign owners.",
            "60 days: draft targeted legal amendments and implementation directives.",
            "90 days: publish compliance roadmap and monitoring cadence.",
        ]

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
        results=results,
    )


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
    sitrep_template: str
    assumptions_and_unknowns: List[str]
    human_review_disclaimer: str


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
            TimelinePhase(phase="2-6 hours", actions=["Confirm assembly points", "Prioritize vulnerable cohorts", "Issue movement SOP to field teams"]),
            TimelinePhase(phase="6-24 hours", actions=["Run controlled movement operations", "Update employers/families", "Refresh risk grid each cycle"]),
            TimelinePhase(phase="24-72 hours", actions=["Sustain evacuation/relief", "Reconcile headcount and missing-person cases", "Prepare stabilization transition brief"]),
        ],
        communication_templates=[
            "Public advisory: The Bangladesh Mission requests all nationals in affected zones to report location via hotline/WhatsApp and avoid unauthorized movement until corridor windows are confirmed.",
            "Employer coordination note: Provide worker roster by district, immediate shelter status, and transport availability within 2 hours.",
            "Family message: Your family member's status is currently under mission tracking; next official update window is HH:MM local.",
            "HQ SITREP lead line: As of HHMM local, mission posture is <Y/O/R>; affected nationals <count>; movement status <active/paused>; critical needs <list>.",
        ],
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
            "Assumptions and unknowns must include at least three each, specific to this scenario and not generic. "
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
    sitrep = str(ai_json.get("sitrep_template", "")).strip()
    human_review = str(ai_json.get("human_review_disclaimer", "")).strip()

    if not yellow or not orange or not red or not role_tasks or not timeline or not comms:
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
        sitrep_template=sitrep,
        assumptions_and_unknowns=assumptions,
        human_review_disclaimer=human_review,
    )


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
    return response
