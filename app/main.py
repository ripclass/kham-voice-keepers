from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="KhaM Pilot API")


# ---------- Health ----------
@app.get("/api/health")
def health():
    return {"ok": True}


# ---------- Treaty Checker ----------
class TreatyAnalyzeRequest(BaseModel):
    treaty_text: str
    national_law_text: str
    treaty_name: Optional[str] = "Unknown Treaty"
    law_name: Optional[str] = "Unknown Law"


@app.post("/api/treaty/analyze")
def treaty_analyze(payload: TreatyAnalyzeRequest):
    if not payload.treaty_text.strip() or not payload.national_law_text.strip():
        raise HTTPException(status_code=400, detail="Both treaty_text and national_law_text are required.")

    # Placeholder output structure (LLM wiring next)
    return {
        "treaty": payload.treaty_name,
        "law": payload.law_name,
        "summary": "Initial analysis scaffold ready.",
        "results": [
            {
                "treaty_article": "Article X",
                "obligation": "State shall ...",
                "national_mapping": "Partially addressed in Section Y",
                "status": "partial",   # compliant | partial | gap
                "severity": "medium",  # low | medium | high
                "recommendation": "Amend Section Y to explicitly include ..."
            }
        ]
    }


# ---------- Crisis Planner ----------
class CrisisGenerateRequest(BaseModel):
    country: str
    crisis_type: str
    nationals_affected: int
    embassy_resources: List[str] = []
    local_conditions: str = ""


@app.post("/api/crisis/generate")
def crisis_generate(payload: CrisisGenerateRequest):
    if payload.nationals_affected < 0:
        raise HTTPException(status_code=400, detail="nationals_affected must be >= 0.")

    # Placeholder output structure (LLM wiring next)
    return {
        "scenario": {
            "country": payload.country,
            "crisis_type": payload.crisis_type,
            "nationals_affected": payload.nationals_affected
        },
        "condition_yellow": [
            "Activate monitoring cell",
            "Verify contact tree and communication channels"
        ],
        "condition_orange": [
            "Prepare transport and safe assembly points",
            "Coordinate with host authorities and nearby missions"
        ],
        "condition_red": [
            "Execute evacuation sequence by priority group",
            "Dispatch hourly status reports to HQ"
        ]
    }
