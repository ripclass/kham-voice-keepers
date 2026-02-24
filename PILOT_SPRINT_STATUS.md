# KhaM GOV Pilot Sprint Status

Updated: 2026-02-24 22:43 GMT+6

## Scope (locked)
- /api/health
- /api/treaty/analyze
- /api/crisis/generate

## Current Status
- Backend deploy: ✅ live (`https://kham-pilot-api.onrender.com`)
- Health endpoint: ✅ returns `{ "ok": true }`
- Treaty endpoint: ✅ returns structured JSON
- Crisis endpoint: ✅ returns structured JSON

## Swarm Roles (lean)
- Lilith: orchestration/checklist
- Prometheus: API contract and output quality
- Hephaestus: implementation/integration
- Maat: QA and edge tests
- Atlas: policy-safe wording

## Next 3 actions
1. Frontend routes (hidden): `/pilot/treaty-checker` and `/pilot/crisis-planner`
2. Connect forms to backend endpoints and render output cards
3. Add prompt-backed generation (replace placeholders) with provider key in backend service

## Risk Notes
- Free Render cold-start can delay first response.
- Current outputs are scaffolds; LLM generation not wired yet.
