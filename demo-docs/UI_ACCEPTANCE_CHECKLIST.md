# UI Acceptance Checklist (KhaM)

## Visual Language
- [ ] Uses system primitives (`src/components/system/*`) where applicable
- [ ] No conflicting typography voices inside one block
- [ ] Framing lines/corners are functional, not decorative clutter
- [ ] Spacing rhythm is consistent (`space-y-*` and section breathing)

## Typography & Copy
- [ ] Technical headings/labels use mono role (`font-tech`)
- [ ] Helper/body text uses display role (`font-display`)
- [ ] Microcopy is concise and operational (no vague filler)

## Controls
- [ ] Buttons follow technical style (square, readable default state, clear hover)
- [ ] Inputs/dropdowns/textareas are visually coherent with the system
- [ ] Focus states are visible and keyboard-accessible

## Dark Mode / Readability
- [ ] Headings are clearly visible in dark mode
- [ ] Small text remains readable at normal zoom
- [ ] Status states (pass/fail/warning) are legible in both themes

## Output Sections (Data-heavy)
- [ ] Section headers are structured and scannable
- [ ] Data blocks avoid visual clutter (spacing + grouping)
- [ ] Tables/lists have readable density and alignment

## Export / Reporting
- [ ] Export templates preserve KhaM typography and hierarchy
- [ ] Footer compliance context is present
- [ ] Reference metadata is included and readable

## Ship Gate
- [ ] Build passes
- [ ] No major console errors
- [ ] Desktop + mobile smoke check completed
