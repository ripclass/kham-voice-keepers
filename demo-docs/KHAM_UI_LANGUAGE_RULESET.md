# KhaM UI Language Ruleset (1-Page)

**Purpose:** Keep KhaM interfaces minimal, credible, and operationally readable.

---

## 1) Core Principle
Design like a control surface, not a marketing poster.

- **Minimal in content** (few elements)
- **Rich in structure** (lines, framing, rhythm)
- **High trust readability** (contrast, hierarchy, consistency)

---

## 2) Typography Roles
Use exactly three roles.

1. **Technical Voice (`font-tech`)**
   - For labels, headings, state text, metadata, buttons.
   - Tone: machine-precise, auditable.

2. **Display Voice (`font-display`)**
   - For helper text, section explanations, body support copy.
   - Tone: human-readable, calm.

3. **News/Editorial (`font-news`)**
   - Optional for long-form editorial sections only.
   - Avoid mixing with technical headings in the same block.

**Rule:** One block = one primary voice.

---

## 3) Layout Language (ASCII-Inspired)
Use structure cues without clutter.

- Corner accents (4 corners) for frame identity.
- Thin borders + dashed separators to segment intent.
- Micro top strip (module, version, state text).
- Footer as compliance/status rail.

**Avoid:** heavy shadows, rounded “app card” look, decorative gradients.

---

## 4) Hierarchy Rules
Every screen should read in this order:

1. Module identity (small, technical)
2. Primary heading (clear, short)
3. 1-line functional explanation
4. Input/work area
5. Output/evidence area
6. Footer compliance context

If scanning this order takes >3 seconds, simplify.

---

## 5) Spacing Rhythm
Use consistent rhythm instead of extra visuals.

- Outer sections: `space-y-5` (or equivalent)
- Inside cards: grouped by purpose with dashed break before forms
- Keep horizontal line lengths intentional (short marker + long rule)

**Rule:** Add space before adding components.

---

## 6) Color & Contrast
- Keep palette restrained (paper/ink + status colors).
- In dark mode, headings must remain explicit high contrast (`dark:text-white` where needed).
- Status colors (green/red/amber) must retain legibility in both themes.

**Minimum standard:** body/support text remains readable at a glance in dark mode.

---

## 7) Microcopy Style
Write like an operations analyst.

- Short, specific, instructional.
- Explain *what this section does* in 1 sentence.
- Prefer concrete nouns over abstract adjectives.

Good: “Provide treaty and domestic legal text. The checker maps obligations article-by-article.”
Bad: “Please upload your content for AI analysis.”

---

## 8) Buttons & Controls
- Technical styling: square edges, subtle motion, no playful effects.
- Label intent clearly (“Analyze Compliance”, “Generate Response Plan”).
- Keep primary action singular per section.

---

## 9) Functional Ornament (Do / Don’t)
### Do
- Use lines, ticks, tiny labels to guide scan flow.
- Use decorative elements that double as separators or anchors.

### Don’t
- Add visuals that carry no navigational meaning.
- Over-animate core workflow areas.
- Mix too many typographic personalities.

---

## 10) Definition of Done (UI Pass Checklist)
A screen is “KhaM-ready” only if all are true:

- [ ] Visual hierarchy is obvious in 3-second scan
- [ ] Dark mode text passes readability
- [ ] Heading/support text roles are consistent
- [ ] Framing lines and separators are purposeful
- [ ] Primary action is unambiguous
- [ ] Footer status/compliance context is present
- [ ] No decorative clutter without function

---

## Reference Implementation
Use current pilot pages (`PilotTreatyChecker`, `PilotCrisisPlanner`) + `PilotFrame` as baseline patterns.
