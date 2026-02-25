# KhaM UI Migration Plan

## Objective
Refactor khamlabs.org into a consistent, minimal, operational UI language based on `KHAM_UI_LANGUAGE_RULESET.md`, with controlled rollout and rollback safety.

## Scope (Current Routes)
- `/` (Index)
- `/voices`
- `/library`
- `/roadmap`
- `/team`
- `/support`
- `/research`
- `/research/emotion-in-south-asian-languages-beyond-translation`
- `/research/building-dialect-aware-voice-agents`
- `/contact`
- `/pilot/treaty-checker`
- `/pilot/crisis-planner`

---

## Migration Strategy

### Phase 0 — Foundation (Done/Now)
- [x] UI language ruleset created
- [x] Pilot pages partially aligned
- [ ] Global token file finalized
- [ ] Shared system components introduced

### Phase 1 — System Primitives (1-2 days)
Create reusable layout + typography primitives under `src/components/system/`:
- `SystemPageFrame`
- `SystemSection`
- `SystemMetaStrip`
- `SystemButton`
- `SystemDataBlock`
- `SystemHeading`

Output:
- No net-new visual inventions per page
- All new work uses system primitives only

### Phase 2 — High-impact Pages (2-3 days)
Refactor in this order:
1. `Index.tsx`
2. `Research.tsx`
3. `Voices.tsx`
4. `Library.tsx`

Acceptance:
- Consistent frame + spacing rhythm
- Typography role discipline
- Dark mode readability pass

### Phase 3 — Product/Info Pages (2-3 days)
Refactor:
- `Roadmap.tsx`, `Team.tsx`, `Support.tsx`, `Contact.tsx`
- Research detail pages (`EmotionPaper`, `DialectAgents`)

Acceptance:
- Shared section templates
- Reduced ad-hoc classes
- Consistent action/button language

### Phase 4 — Pilot Final Polish (1 day)
- Tighten output typography hierarchy
- Final export template alignment
- UI regression review against checklist

### Phase 5 — Stabilization
- Visual QA across desktop + mobile
- Performance sanity (bundle split opportunities)
- Freeze `v1` UI system baseline

---

## Technical Rules During Migration
1. No one-off component styling in page files if system primitive exists.
2. Prefer token classes over hardcoded style values.
3. Keep spacing on an 8px rhythm where practical.
4. Preserve semantic structure and accessibility.
5. Every PR must pass `UI_ACCEPTANCE_CHECKLIST.md`.

---

## Rollout / Safety
- Refactor in small PRs per page group.
- Keep each phase separately deployable.
- Tag releases at phase boundaries.
- If regressions appear, rollback by phase commit.

---

## Suggested PR Sequence
1. `chore(ui): add system tokens + primitives`
2. `refactor(ui): migrate home and core marketing pages`
3. `refactor(ui): migrate research and library pages`
4. `refactor(ui): migrate support/contact/team pages`
5. `polish(ui): pilot output and export visual parity`

---

## Definition of Success
- Site feels like one product, not mixed templates.
- Minimal but functional visual language holds across all pages.
- Faster future changes via primitives instead of ad-hoc CSS.
