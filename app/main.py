from fastapi import FastAPI

app = FastAPI(title="KhaM Pilot API")

@app.get("/api/health")
def health():
    return {"ok": True}
