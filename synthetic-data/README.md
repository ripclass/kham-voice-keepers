# KhaM Voice Keepers — Synthetic Test Data

> **All content in this directory is SYNTHETIC and FICTIONAL.**
> Generated for software QA testing of KhaM for GOV pilots.
> No real legal advice, operational plans, or personal data is contained herein.

## Structure

```
synthetic-data/
├── MANIFEST.json              ← Index of all generated content
├── treaty-checker/
│   ├── valid-combinations-matrix.json
│   ├── inputs/
│   │   ├── txt/treaty/        ← Treaty text files (.txt)
│   │   └── txt/law/           ← National instrument text files (.txt)
│   │   └── pdf/treaty/        ← PDF versions
│   │   └── pdf/law/           ← PDF versions
│   ├── payloads/              ← JSONL and CSV payloads
│   ├── expected/              ← Expected output check files
│   └── bundles/               ← Per-case bundles with run-sheet
├── crisis-planner/
│   ├── valid-combinations-matrix.json
│   ├── inputs/
│   │   ├── txt/scenario/      ← Scenario brief text files (.txt)
│   │   └── pdf/scenario/      ← PDF versions
│   ├── payloads/              ← JSONL and CSV payloads
│   ├── expected/              ← Expected output check files
│   └── bundles/               ← Per-case bundles with run-sheet
└── packs/
    ├── synthetic-data-small.zip   ← Subset pack (20 cases)
    └── synthetic-data-full.zip    ← Full pack (all generated)
```

## Pilots

### Treaty Checker
Tests the AI's ability to compare an international treaty with a national
implementing instrument and identify gaps, alignments, and recommendations.

**Valid combos:** 100 (10 treaties × 10 national instruments)

### Crisis Planner
Tests the AI's ability to generate an operational response plan for a
mission facing a specific crisis scenario with a constraining factor.

**Valid combos:** 540 (15 missions × 6 types × 6 constraints)

## Fail Cases
Each pilot includes controlled fail cases — inputs designed to test system
edge cases. These are clearly marked with suffix `_FAIL` in the filename
and `"fail_case": true` in the payload.

## Usage
1. Use `.txt` files for paste-in testing
2. Use `.pdf` files for upload testing
3. Use `payloads/*.jsonl` for batch API testing
4. Use `bundles/*/run-sheet.txt` for manual QA walkthroughs
5. Use `packs/*.zip` for distribution

## Generation Date
2026-02-25T02:32:53.019Z
