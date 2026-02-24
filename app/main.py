from enum import Enum
from typing import List

from fastapi import FastAPI
from pydantic import BaseModel, Field, field_validator

app = FastAPI(title="KhaM Pilot API")


# ---------- Health ----------
@app.get("/api/health")
def health():
    return {"ok": True}


# ---------- Treaty Checker ----------
class StrictSchema(BaseModel):
    model_config = {"extra": "forbid"}


class TreatyAnalyzeRequest(StrictSchema):
    treaty_text: str = Field(..., min_length=1, max_length=100000)
    national_law_text: str = Field(..., min_length=1, max_length=100000)
    treaty_name: str = Field(default="Unknown Treaty", min_length=1, max_length=255)
    law_name: str = Field(default="Unknown Law", min_length=1, max_length=255)

    @field_validator("treaty_text", "national_law_text", "treaty_name", "law_name")
    @classmethod
    def must_not_be_blank(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("must not be blank")
        return trimmed


class ComplianceStatus(str, Enum):
    compliant = "compliant"
    partial = "partial"
    gap = "gap"


class SeverityLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class TreatyAnalysisResult(StrictSchema):
    treaty_article: str = Field(..., min_length=1, max_length=255)
    obligation: str = Field(..., min_length=1, max_length=5000)
    national_mapping: str = Field(..., min_length=1, max_length=5000)
    status: ComplianceStatus
    severity: SeverityLevel
    recommendation: str = Field(..., min_length=1, max_length=5000)


class TreatyAnalyzeResponse(StrictSchema):
    treaty: str = Field(..., min_length=1, max_length=255)
    law: str = Field(..., min_length=1, max_length=255)
    summary: str = Field(..., min_length=1, max_length=5000)
    results: List[TreatyAnalysisResult] = Field(default_factory=list)


@app.post("/api/treaty/analyze", response_model=TreatyAnalyzeResponse)
def treaty_analyze(payload: TreatyAnalyzeRequest) -> TreatyAnalyzeResponse:
    # Placeholder output structure (LLM wiring next)
    return TreatyAnalyzeResponse(
        treaty=payload.treaty_name,
        law=payload.law_name,
        summary="Initial analysis scaffold ready.",
        results=[
            TreatyAnalysisResult(
                treaty_article="Article X",
                obligation="State shall ...",
                national_mapping="Partially addressed in Section Y",
                status=ComplianceStatus.partial,
                severity=SeverityLevel.medium,
                recommendation="Amend Section Y to explicitly include ...",
            )
        ],
    )


# ---------- Crisis Planner ----------
class CrisisGenerateRequest(StrictSchema):
    country: str = Field(..., min_length=1, max_length=255)
    crisis_type: str = Field(..., min_length=1, max_length=255)
    nationals_affected: int = Field(..., ge=0, le=50000000)
    embassy_resources: List[str] = Field(default_factory=list, max_length=100)
    local_conditions: str = Field(default="", max_length=5000)

    @field_validator("country", "crisis_type")
    @classmethod
    def must_not_be_blank(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("must not be blank")
        return trimmed

    @field_validator("local_conditions")
    @classmethod
    def normalize_text(cls, value: str) -> str:
        return value.strip()

    @field_validator("embassy_resources")
    @classmethod
    def normalize_resources(cls, value: List[str]) -> List[str]:
        normalized = [item.strip() for item in value]
        if any(not item for item in normalized):
            raise ValueError("embassy_resources must not contain blank entries")
        return normalized


class CrisisScenario(StrictSchema):
    country: str = Field(..., min_length=1, max_length=255)
    crisis_type: str = Field(..., min_length=1, max_length=255)
    nationals_affected: int = Field(..., ge=0, le=50000000)


class CrisisGenerateResponse(StrictSchema):
    scenario: CrisisScenario
    condition_yellow: List[str] = Field(..., min_length=1)
    condition_orange: List[str] = Field(..., min_length=1)
    condition_red: List[str] = Field(..., min_length=1)


@app.post("/api/crisis/generate", response_model=CrisisGenerateResponse)
def crisis_generate(payload: CrisisGenerateRequest) -> CrisisGenerateResponse:
    # Placeholder output structure (LLM wiring next)
    return CrisisGenerateResponse(
        scenario=CrisisScenario(
            country=payload.country,
            crisis_type=payload.crisis_type,
            nationals_affected=payload.nationals_affected,
        ),
        condition_yellow=[
            "Activate monitoring cell",
            "Verify contact tree and communication channels",
        ],
        condition_orange=[
            "Prepare transport and safe assembly points",
            "Coordinate with host authorities and nearby missions",
        ],
        condition_red=[
            "Execute evacuation sequence by priority group",
            "Dispatch hourly status reports to HQ",
        ],
    )
