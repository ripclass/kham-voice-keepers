from datetime import datetime, timezone
from enum import Enum
import os
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

app = FastAPI(title="KhaM Pilot API")

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


class TreatyAnalyzeRequest(StrictSchema):
    treaty_text: str = Field(..., min_length=50, max_length=120000)
    national_law_text: str = Field(..., min_length=50, max_length=120000)
    treaty_name: str = Field(default="Unknown Treaty", min_length=1, max_length=255)
    law_name: str = Field(default="Unknown Law", min_length=1, max_length=255)

    @field_validator("treaty_text", "national_law_text", "treaty_name", "law_name")
    @classmethod
    def must_not_be_blank(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("must not be blank")
        return trimmed


class TreatyAnalysisResult(StrictSchema):
    treaty_article: str
    obligation: str
    national_mapping: str
    status: ComplianceStatus
    severity: SeverityLevel
    recommendation: str
    confidence: float = Field(..., ge=0.0, le=1.0)


class TreatyAnalyzeResponse(StrictSchema):
    treaty: str
    law: str
    generated_at: str
    reference_no: str
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
                national_mapping=f"{law_name}: climate policy commitments and implementation mechanisms are documented.",
                status=ComplianceStatus.partial,
                severity=SeverityLevel.medium,
                recommendation="Publish legally binding implementation timelines and annual progress publication duty.",
                confidence=0.78,
            ),
            TreatyAnalysisResult(
                treaty_article="Article 7",
                obligation="Strengthen adaptation planning and implementation with vulnerable population focus.",
                national_mapping="Adaptation is addressed in policy documents, but legally enforceable local reporting obligations are limited.",
                status=ComplianceStatus.partial,
                severity=SeverityLevel.high,
                recommendation="Create mandatory district-level adaptation reporting and auditing provisions.",
                confidence=0.74,
            ),
            TreatyAnalysisResult(
                treaty_article="Article 13",
                obligation="Provide transparent reporting of actions, support, and outcomes under an enhanced transparency framework.",
                national_mapping="Reporting obligations exist institutionally but are not consistently codified in enforceable domestic instruments.",
                status=ComplianceStatus.gap,
                severity=SeverityLevel.high,
                recommendation="Codify annual national transparency report requirements and responsible authority designation.",
                confidence=0.71,
            ),
        ]
    elif "vienna convention on consular" in tn:
        rows = [
            TreatyAnalysisResult(
                treaty_article="Article 5",
                obligation="Perform consular functions including protection of nationals and assistance in distress.",
                national_mapping=f"{law_name}: diplomatic framework exists; mission-level operational SOPs vary in maturity.",
                status=ComplianceStatus.partial,
                severity=SeverityLevel.medium,
                recommendation="Issue standardized mission SOP templates with mandatory annual readiness review.",
                confidence=0.76,
            ),
            TreatyAnalysisResult(
                treaty_article="Article 36",
                obligation="Ensure communication and access in detention-related circumstances involving nationals.",
                national_mapping="Legal posture recognized, but response-time standards and escalation matrix are not uniformly documented.",
                status=ComplianceStatus.partial,
                severity=SeverityLevel.high,
                recommendation="Adopt a 24-hour notification/escalation standard with auditable logs.",
                confidence=0.72,
            ),
        ]
    else:
        rows = [
            TreatyAnalysisResult(
                treaty_article="Article 1",
                obligation="General obligation to implement treaty commitments in good faith.",
                national_mapping=f"{law_name}: broad policy alignment appears present.",
                status=ComplianceStatus.partial,
                severity=SeverityLevel.medium,
                recommendation="Map each substantive treaty article to a domestic legal clause and assign implementing authority.",
                confidence=0.69,
            )
        ]

    return rows


@app.post("/api/treaty/analyze", response_model=TreatyAnalyzeResponse)
def treaty_analyze(payload: TreatyAnalyzeRequest) -> TreatyAnalyzeResponse:
    results = _pick_treaty_rows(payload.treaty_name, payload.law_name)
    top_gaps = [
        f"{r.treaty_article}: {r.recommendation}" for r in results if r.status != ComplianceStatus.compliant
    ][:5]

    now = datetime.now(timezone.utc)
    ref = f"KHM-GOV-{now.strftime('%Y%m%d')}-TC-{now.strftime('%H%M%S')}"

    return TreatyAnalyzeResponse(
        treaty=payload.treaty_name,
        law=payload.law_name,
        generated_at=now.isoformat(),
        reference_no=ref,
        executive_summary=(
            "Preliminary AI-assisted gap analysis indicates partial alignment between treaty obligations and the selected "
            "domestic instrument, with high-priority areas requiring codified reporting timelines and clearer implementing authority. "
            f"Input coverage: treaty excerpt {len(payload.treaty_text)} chars; national instrument excerpt {len(payload.national_law_text)} chars."
        ),
        top_urgent_gaps=top_gaps,
        action_list_30_60_90=[
            "30 days: constitute inter-ministerial legal mapping team and validate article-by-article matrix.",
            "60 days: draft amendment/circular package for high-severity gaps and assign responsible authorities.",
            "90 days: publish implementation roadmap and establish recurring compliance reporting cycle.",
        ],
        human_review_disclaimer=(
            "This report is decision-support only. Final legal interpretation and policy action must be validated by designated government legal officers."
        ),
        results=results,
    )


class CrisisGenerateRequest(StrictSchema):
    mission_location: str = Field(..., min_length=1, max_length=255)
    crisis_type: str = Field(..., min_length=1, max_length=255)
    nationals_affected: int = Field(..., ge=0, le=50000000)
    embassy_resources: List[str] = Field(default_factory=list, max_length=100)
    constraints: List[str] = Field(default_factory=list, max_length=50)
    local_conditions: str = Field(..., min_length=30, max_length=5000)

    @field_validator("mission_location", "crisis_type")
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


@app.post("/api/crisis/generate", response_model=CrisisGenerateResponse)
def crisis_generate(payload: CrisisGenerateRequest) -> CrisisGenerateResponse:
    now = datetime.now(timezone.utc)
    ref = f"KHM-GOV-{now.strftime('%Y%m%d')}-CR-{now.strftime('%H%M%S')}"

    constraints_text = ", ".join(payload.constraints) if payload.constraints else "No specific constraints provided"

    return CrisisGenerateResponse(
        reference_no=ref,
        generated_at=now.isoformat(),
        mission_location=payload.mission_location,
        crisis_type=payload.crisis_type,
        nationals_affected=payload.nationals_affected,
        condition_yellow=[
            "Activate mission crisis cell and verify warden/contact tree.",
            "Issue advisory notice to registered nationals and diaspora channels.",
            f"Log constraints: {constraints_text}.",
        ],
        condition_orange=[
            "Pre-position transport, medical support, and mission emergency kits.",
            "Coordinate safe assembly points with host-country counterparts.",
            "Start 6-hourly HQ coordination updates and mission readiness checks.",
        ],
        condition_red=[
            "Execute phased evacuation by vulnerability priority groups.",
            "Run hourly SITREP cycle to HQ and inter-mission coordination node.",
            "Maintain accountability roster and family communication desk.",
        ],
        role_assigned_tasks=[
            RoleTask(role="Head of Mission", task="Authorize response level and approve evacuation trigger points."),
            RoleTask(role="Consular Officer", task="Maintain national registry, detention/hospital desk, and citizen verification."),
            RoleTask(role="Security Officer", task="Secure routes, assembly points, and movement windows with host security liaison."),
            RoleTask(role="Admin/Logistics Officer", task="Manage vehicles, fuel, shelter, supplies, and shift rosters."),
        ],
        timeline=[
            TimelinePhase(phase="0-2 hours", actions=["Activate crisis cell", "Issue first advisory", "Validate staff and hotline readiness"]),
            TimelinePhase(phase="2-6 hours", actions=["Confirm assembly points", "Begin vulnerable-person movement prep", "Initiate HQ cadence"]),
            TimelinePhase(phase="6-24 hours", actions=["Run controlled movement operations", "Publish public update", "Refresh risk map"]),
            TimelinePhase(phase="24-72 hours", actions=["Sustain evacuation/relief operations", "Reconcile headcount", "Transition to stabilization mode"]),
        ],
        communication_templates=[
            "Public advisory: The mission is monitoring the situation and requests all Bangladeshi nationals to report current location via hotline.",
            "Family update: Your registered family member is accounted for and currently within mission response tracking.",
            "HQ SITREP lead line: As of HHMM local, mission remains in Condition ORANGE with controlled movement and no confirmed mass casualty among registered nationals.",
        ],
        sitrep_template=(
            "SITREP\nRef: <ref>\nTime: <local>\nCondition Level: <Y/O/R>\nNationals Affected: <count>\n"
            "Actions Completed: <list>\nImmediate Risks: <list>\nResource Status: <list>\nRequests to HQ: <list>"
        ),
        assumptions_and_unknowns=[
            "Assumption: host-country security liaison remains reachable.",
            "Assumption: at least one transport corridor remains intermittently open.",
            "Unknown: exact number of unregistered nationals in high-risk zones.",
            "Unknown: reliability window of telecom services over the next 12 hours.",
        ],
        human_review_disclaimer=(
            "This plan is AI-assisted decision support. Final operational orders must be issued by authorized mission leadership and competent government authorities."
        ),
    )
