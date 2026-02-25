/**
 * KhaM Voice Keepers - Synthetic Data Generator
 * ALL CONTENT IS SYNTHETIC / FICTIONAL - for testing only
 * Uses fictionalized references (District A, Port Zone-1, etc.)
 * No real incidents, no sensitive political/security phrasing
 */

const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');
const TREATY_BASE = path.join(BASE, 'treaty-checker');
const CRISIS_BASE = path.join(BASE, 'crisis-planner');
const PACKS_BASE = path.join(BASE, 'packs');

// ── Seed data (mirrored from pilotSeed.ts) ──────────────────────────────────
const treaties = [
  "Paris Agreement (2015)",
  "UN Convention on the Law of the Sea (UNCLOS)",
  "Convention on the Rights of the Child (CRC)",
  "ILO Forced Labour Convention, 1930 (No. 29)",
  "Vienna Convention on Consular Relations (1963)",
  "UN Convention Against Corruption (UNCAC)",
  "Convention on the Elimination of Discrimination Against Women (CEDAW)",
  "Kyoto Protocol (1997)",
  "UN Framework Convention on Climate Change (UNFCCC)",
  "Comprehensive Nuclear-Test-Ban Treaty (CTBT)",
];

const nationalInstruments = [
  "National Environment Conservation Act, 1995 [SYNTH]",
  "National Climate Change Strategy and Action Plan, 2009 [SYNTH]",
  "Children Protection Act, 2013 [SYNTH]",
  "National Labour Act, 2006 [SYNTH]",
  "Anti-Corruption Commission Act, 2004 [SYNTH]",
  "Women and Children Protection Act, 2000 [SYNTH]",
  "Foreign Exchange Regulation Act, 1947 [SYNTH]",
  "Central Bank Order, 1972 [SYNTH]",
  "Diplomatic Privileges Act, 1965 [SYNTH]",
  "Emergency Powers Rules, 2007 [SYNTH]",
];

const missions = [
  "City-A Mission", "City-B Mission", "City-C Mission", "City-D Mission",
  "City-E Mission", "City-F Mission", "City-G Mission", "City-H Mission",
  "City-I Mission", "City-J Mission", "City-K Mission", "City-L Mission",
  "City-M Mission", "City-N Mission", "City-O Mission",
];

const crisisTypes = [
  "Civil-Disturbance",
  "Natural-Disaster",
  "Public-Health-Emergency",
  "Mass-Detention-Legal",
  "Infrastructure-Failure",
  "Evacuation-Scenario",
];

const crisisConstraints = [
  "Telecom outage",
  "Airport closure",
  "Curfew in effect",
  "Roadblocks",
  "Border crossing restriction",
  "Fuel shortage",
];

// ── Valid combinations matrix ────────────────────────────────────────────────
function buildTreatyCombos() {
  const combos = [];
  let id = 1;
  for (let ti = 0; ti < treaties.length; ti++) {
    for (let ni = 0; ni < nationalInstruments.length; ni++) {
      combos.push({
        id: `TC-${String(id).padStart(3,'0')}`,
        treaty: treaties[ti],
        treatyIdx: ti,
        nationalInstrument: nationalInstruments[ni],
        niIdx: ni,
      });
      id++;
    }
  }
  return combos; // 100 combos
}

function buildCrisisCombos() {
  const combos = [];
  let id = 1;
  for (const mission of missions) {
    for (const ct of crisisTypes) {
      for (const cc of crisisConstraints) {
        combos.push({
          id: `CP-${String(id).padStart(3,'0')}`,
          mission,
          crisisType: ct,
          constraint: cc,
        });
        id++;
      }
    }
  }
  return combos; // 15 * 6 * 6 = 540, we'll take first 60 for generation
}

// ── Text generators ──────────────────────────────────────────────────────────

function generateTreatyText(combo, idx) {
  const { id, treaty, nationalInstrument } = combo;
  const date = `202${(idx % 5) + 1}-0${(idx % 9) + 1}-${String((idx % 28) + 1).padStart(2,'0')}`;
  
  return `SYNTHETIC DOCUMENT — FOR TESTING PURPOSES ONLY
Document ID: ${id}
Generated: ${date}
Classification: UNCLASSIFIED / SYNTHETIC

═══════════════════════════════════════════════════════════════════════════════
TREATY COMPLIANCE ANALYSIS BRIEF
International Instrument vs. National Legal Framework
═══════════════════════════════════════════════════════════════════════════════

SECTION 1: INSTRUMENT IDENTIFICATION

1.1 International Instrument
Name: ${treaty}
Status in this synthetic dataset: Assumed ratified by Synthetic State "Alphaland"
Entry into force (synthetic): Year ${1990 + (idx % 30)}
Ratification date (synthetic): ${date}
Depositary: United Nations (synthetic reference)

1.2 National Implementing Instrument
Title: ${nationalInstrument}
Jurisdiction: Alphaland (synthetic jurisdiction)
Enactment year (synthetic): ${1990 + (idx % 28)}
Regulatory authority: Ministry of Synthetic Affairs, Alphaland
Latest amendment (synthetic): ${2010 + (idx % 12)}-01-01

═══════════════════════════════════════════════════════════════════════════════
SECTION 2: COMPATIBILITY ASSESSMENT

2.1 Scope and Coverage
The international instrument "${treaty}" establishes binding obligations on
state parties regarding the subject matter covered under its operative clauses.
The national instrument "${nationalInstrument}" provides the domestic legal
framework through which these obligations are to be implemented.

This compatibility assessment examines whether the national instrument:
  (a) Gives full legal effect to the obligations of the international instrument;
  (b) Addresses all subject-matter areas covered by the international instrument;
  (c) Provides adequate enforcement mechanisms;
  (d) Establishes appropriate institutional arrangements;
  (e) Sets out complaint and redress mechanisms consistent with international
      standards.

2.2 Areas of Alignment
The following substantive areas have been reviewed for alignment:

Area A — Definitional Provisions
The international instrument contains definitions in its Articles 1-3 (synthetic).
The national instrument provides corresponding definitions in Section 2 (synthetic).
Assessment: ALIGNED — definitions are materially consistent, subject to
translation notes in Annex I (synthetic).

Area B — Substantive Obligations
The core obligations under the international instrument include obligations to:
  (i)   Take legislative and administrative measures (Article 4, synthetic);
  (ii)  Establish monitoring and reporting mechanisms (Article 8, synthetic);
  (iii) Cooperate with international bodies (Article 12, synthetic);
  (iv)  Submit periodic reports (Article 15, synthetic).
The national instrument addresses these through Sections 7, 14, 22, and 31
respectively (all synthetic references).
Assessment: SUBSTANTIALLY ALIGNED with gaps noted in sub-section 2.3 below.

Area C — Enforcement and Penalties
The international instrument requires state parties to criminalise or otherwise
sanction breaches of the substantive obligations. The national instrument
provides for administrative sanctions (Section 45, synthetic) and criminal
penalties (Section 52, synthetic).
Assessment: PARTIALLY ALIGNED — the penalty thresholds under the national
instrument may not meet the deterrence standard required under international
guidance.

2.3 Gaps and Divergences

Gap 1: Temporal scope
The national instrument was enacted prior to the most recent amendment to the
international instrument and does not reflect revisions made in Protocol X
(synthetic). A legislative update is recommended.

Gap 2: Institutional coordination
The international instrument contemplates a dedicated national focal point
(Article 18, synthetic). The national instrument distributes responsibilities
across three ministries without designating a single focal point.
Risk rating: MEDIUM

Gap 3: Reporting periodicity
The international instrument requires annual reporting (Article 22, synthetic).
The national instrument mandates reports every three years (Section 55, synthetic).
Risk rating: LOW — may be addressed by administrative instruction.

═══════════════════════════════════════════════════════════════════════════════
SECTION 3: IMPLEMENTATION STATUS (SYNTHETIC)

3.1 Legislative measures adopted: YES (synthetic)
3.2 Regulations promulgated: PARTIALLY (synthetic)
3.3 Administrative circulars issued: YES (synthetic)
3.4 Training conducted: IN PROGRESS (synthetic)
3.5 National action plan: DRAFT STAGE (synthetic)

═══════════════════════════════════════════════════════════════════════════════
SECTION 4: RECOMMENDATIONS

4.1 Short-term (0–6 months)
  R1: Issue administrative instruction designating a national focal point.
  R2: Align reporting cycle with international requirement through ministerial
      directive pending full legislative amendment.

4.2 Medium-term (6–18 months)
  R3: Amend Sections 45 and 52 of the national instrument to strengthen
      penalty provisions.
  R4: Incorporate Protocol X provisions through legislative amendment.

4.3 Long-term (18+ months)
  R5: Commission a comprehensive review of all related legislation to identify
      further alignment opportunities.

═══════════════════════════════════════════════════════════════════════════════
SECTION 5: DOCUMENT METADATA

5.1 Prepared by: Synthetic Analysis Unit, Alphaland (TEST)
5.2 Version: 1.0 (synthetic)
5.3 Review date: ${date}
5.4 Reference number: ${id}-SYNTH-${idx + 1}
5.5 Classification: UNCLASSIFIED — SYNTHETIC TEST DATA

Note: All jurisdictions, instruments, dates, article references, and
institutional names in this document are entirely fictional and created
for software testing purposes only. No real legal advice is contained herein.

═══════════════════════════════════════════════════════════════════════════════
ANNEX I: DEFINITION COMPARISON TABLE (SYNTHETIC)

Term              | International Definition (synthetic)   | National Definition (synthetic)
──────────────────|────────────────────────────────────────|────────────────────────────────
"State Party"     | Any state that has ratified...         | "Government" means the national...
"Obligation"      | A duty binding upon ratifying states.. | "Requirement" means any duty...
"Competent Auth." | The designated national authority...   | "Ministry" means the relevant...
"Report"          | Periodic submission to the treaty body | "Annual return" submitted to...
"Enforcement"     | Measures to ensure compliance...       | "Regulatory action" taken by...

ANNEX II: RELEVANT ARTICLES (SYNTHETIC EXCERPTS)

Article 4 of ${treaty} (synthetic):
"Each State Party shall adopt such legislative, administrative, judicial or
other measures as may be necessary to implement the obligations set forth in
this instrument, having due regard to the constitutional arrangements and
principles of its legal system."

Section 7 of ${nationalInstrument} (synthetic):
"The competent authority shall take all appropriate measures, whether
legislative, regulatory or administrative, to ensure the effective
implementation of the requirements of this Act and any obligations arising
from international instruments to which the State is a party."

ANNEX III: REPORTING OBLIGATIONS TRACKER (SYNTHETIC)

Report Type           | Due Date (synth) | Status       | Notes
──────────────────────|──────────────────|──────────────|────────────────────
Initial report        | ${date}          | SUBMITTED    | (synthetic)
First periodic report | 2 years post     | PENDING      | (synthetic)
Special report        | On request       | N/A          | (synthetic)
Voluntary mid-term    | Optional         | PLANNED      | (synthetic)

END OF SYNTHETIC DOCUMENT — ${id}
`;
}

function generateCrisisText(combo, idx) {
  const { id, mission, crisisType, constraint } = combo;
  const districtLabel = `District-${String.fromCharCode(65 + (idx % 8))}`;
  const zoneLabel = `Zone-${idx % 5 + 1}`;
  const date = `202${(idx % 5) + 1}-${String((idx % 12) + 1).padStart(2,'0')}-${String((idx % 28) + 1).padStart(2,'0')}`;
  const caseNum = String(idx + 1).padStart(3, '0');

  return `SYNTHETIC SCENARIO BRIEF — FOR TESTING PURPOSES ONLY
Document ID: ${id}
Scenario Index: CASE-${caseNum}
Generated: ${date}
Classification: UNCLASSIFIED / SYNTHETIC

All place names, persons, organisations, and events in this document are
entirely fictional. This is generated test data for software QA purposes.

═══════════════════════════════════════════════════════════════════════════════
OPERATIONAL SCENARIO BRIEF
Mission: ${mission}
Scenario Type: ${crisisType}
Primary Constraint: ${constraint}
Location Reference: ${districtLabel}, Operational Area ${zoneLabel}
═══════════════════════════════════════════════════════════════════════════════

SECTION 1: SCENARIO OVERVIEW

1.1 Situation Summary
This synthetic scenario describes a ${crisisType.replace(/-/g,' ')} event
affecting the operational area around ${districtLabel} in the jurisdiction
served by ${mission}. The scenario activates the mission's contingency
planning procedures under the standing operational framework (synthetic).

The primary complicating factor for this scenario is: ${constraint}.
This constraint limits available response options and requires adaptation
of standard operating procedures.

1.2 Timeline of Events (Synthetic)
T-72h: Initial indicators of developing situation noted by monitoring systems.
T-48h: Preliminary alert issued to mission duty officer. Staff briefed.
T-24h: Situation assessment completed. Pre-departure preparations initiated.
T-12h: ${constraint} confirmed affecting ${districtLabel}.
T-0h:  ${crisisType.replace(/-/g,' ')} declared. Emergency protocols activated.
T+4h:  First welfare check calls initiated to registered nationals.
T+6h:  Situation report transmitted to headquarters via backup channel.
T+12h: Assembly point activated at ${zoneLabel} coordination centre (synthetic).
T+24h: First consolidated warden report received. 47 contacts confirmed safe.
T+48h: Ongoing monitoring. Evacuation pre-positioning under assessment.
T+72h: Situation stabilising. Scale-down of emergency measures begins.

1.3 Affected Population (Synthetic Figures)
Registered nationals in area: 312 (synthetic)
Unregistered estimate: 85 (synthetic)
Vulnerable persons (elderly/medical): 23 (synthetic)
Minors under 18: 41 (synthetic)
Persons requiring special assistance: 14 (synthetic)

═══════════════════════════════════════════════════════════════════════════════
SECTION 2: CONSTRAINT ANALYSIS

2.1 Primary Constraint: ${constraint}

The operational impact of "${constraint}" on standard response protocols:

Impact on Communication:
${constraint === 'Telecom outage'
  ? 'Primary mobile networks non-operational. Backup HF radio activated.\n  WhatsApp/Signal unusable. Email dependent on satellite uplink.\n  Warden tree fallback to manual door-to-door check (where safe).'
  : 'Communication systems operational with workarounds in place.\n  Primary channels functional. Secondary channels on standby.'}

Impact on Movement:
${constraint === 'Airport closure'
  ? 'Commercial flights suspended. Evacuation by air not possible.\n  Land route assessment underway. Sea route to Port-Zone-2 viable.\n  Coordination with Port Authority reference vessel availability.'
  : constraint === 'Roadblocks'
  ? 'Main arterial routes to ${districtLabel} blocked at checkpoints.\n  Alternative route via Ring Road-B assessed as partially passable.\n  Vehicle convoy requires authority clearance at checkpoint Alpha-3.'
  : constraint === 'Curfew in effect'
  ? 'Movement restricted 2000h–0600h. Daytime window available.\n  Curfew pass requests submitted for essential staff.\n  Emergency exception protocol invoked for medical cases.'
  : 'Movement affected. Alternative routing under assessment.\n  Coordination with local authorities for operational clearances.'}

Impact on Services:
${constraint === 'Fuel shortage'
  ? 'Vehicle fleet fuel reserves: 40% (synthetic). Rationing in effect.\n  Priority: Emergency response vehicles and medical transport.\n  Fuel procurement via emergency diplomatic channel initiated.'
  : 'Core services maintaining operation with adaptations.\n  Non-essential activities suspended pending normalisation.'}

2.2 Secondary Considerations
  - Consular services: Reduced hours (synthetic)
  - Visa/documentation: Emergency processing available
  - Medical referrals: Coordinating with Hospital-Zone-2 (synthetic)
  - Financial assistance: Emergency fund authorised (synthetic)

═══════════════════════════════════════════════════════════════════════════════
SECTION 3: RESPONSE ACTIONS

3.1 Immediate Actions Taken (Synthetic)
  [x] Duty officer notified and emergency team assembled
  [x] Situation room activated at mission premises
  [x] Warden network alerted via SMS broadcast (backup tree initiated)
  [x] Headquarters notified via secure channel
  [x] Crisis management team convened (virtual) at T+2h
  [x] Media monitoring activated
  [x] Community liaison officer deployed to ${districtLabel}

3.2 Ongoing Actions
  [ ] Welfare calls to all registered nationals (progress: 67%)
  [ ] Coordination with host-country authorities for operational clearances
  [ ] Assembly point logistics finalised
  [ ] Transport pre-positioning for potential evacuation
  [ ] Legal officer review of documentation requirements

3.3 Planned Actions (Next 48 Hours)
  - Complete welfare enumeration
  - Issue updated community advisory
  - Conduct joint assessment with cooperating missions
  - Review evacuation triggers against current situation indicators

═══════════════════════════════════════════════════════════════════════════════
SECTION 4: SUPPORT AND COORDINATION

4.1 Internal Coordination
Crisis Management Team composition (synthetic):
  Lead: Head of Mission (synthetic)
  Operations: Deputy Head of Mission (synthetic)
  Consular: Consular Section Chief (synthetic)
  Admin: Administrative Officer (synthetic)
  Communications: Information Officer (synthetic)
  Medical Advisor: Contracted (synthetic)

4.2 External Coordination
  Host-country emergency management authority: COORDINATION ESTABLISHED
  Neighbouring missions: ALERT SENT, RESPONSE PENDING
  International organisations present: UN OCHA, ICRC (synthetic references)
  Local community associations: CONTACTED

4.3 Communication Channels (Synthetic)
  Primary: Encrypted email to headquarters
  Secondary: HF radio net
  Tertiary: Satellite phone (emergency set)
  Warden tree: Activated (manual protocol)

═══════════════════════════════════════════════════════════════════════════════
SECTION 5: SCENARIO DECISION TREE

Q1: Is the immediate threat to life?
  → YES: Activate emergency evacuation protocol. Proceed to Q2.
  → NO: Monitor and maintain contact. Re-assess at 6h intervals.

Q2: Are movement channels available?
  → YES: Issue advisory and coordinate transport.
  → NO (${constraint}): Apply constraint mitigation. Identify alternatives.

Q3: Is host-country assistance available?
  → YES: Coordinate joint response. Document actions.
  → NO: Escalate to headquarters. Request diplomatic intervention.

Q4: Has the situation stabilised within 72h?
  → YES: Begin scale-down. Prepare lessons-learned documentation.
  → NO: Maintain full emergency posture. Re-assess at 24h intervals.

═══════════════════════════════════════════════════════════════════════════════
SECTION 6: CONTROLLED FAIL CASE

6.1 Fail Scenario Description
This section documents a controlled test case where the standard response
protocol is applied under conditions that exceed normal parameters.

Fail condition: "${constraint}" combined with total communication blackout
and simultaneous onset of secondary emergency (medical mass-casualty event).

Expected system behaviour:
  - Escalate to maximum alert level
  - Activate alternate command structure
  - Request emergency assistance from cooperating mission (synthetic)
  - Apply manual fallback procedures for all digital systems

This fail case is INTENTIONALLY designed to test system resilience.
The AI assistant should flag resource limitations and escalation requirements.

═══════════════════════════════════════════════════════════════════════════════
SECTION 7: DOCUMENT METADATA

7.1 Scenario ID: ${id}
7.2 Mission: ${mission}
7.3 Crisis type: ${crisisType}
7.4 Constraint: ${constraint}
7.5 Location: ${districtLabel}, ${zoneLabel}
7.6 Generated: ${date}
7.7 Version: 1.0 (synthetic)
7.8 Classification: UNCLASSIFIED — SYNTHETIC TEST DATA

Note: All scenarios, persons, locations, statistics, and operational details
in this document are entirely fictional and generated for software QA testing.
No real operational plans or real incident data are represented herein.

═══════════════════════════════════════════════════════════════════════════════
ANNEX A: WARDEN ZONE MAP REFERENCE (SYNTHETIC)

Zone       | Warden         | Contacts | Last Check  | Status
───────────|────────────────|──────────|─────────────|────────
Zone-1-A   | Warden-001     | 18       | ${date}     | SAFE
Zone-1-B   | Warden-002     | 22       | ${date}     | SAFE
Zone-2-A   | Warden-003     | 31       | ${date}     | PENDING
Zone-2-B   | Warden-004     | 15       | ${date}     | SAFE
Zone-3     | Warden-005     | 28       | ${date}     | SAFE
Outer-Zone | Warden-006     | 43       | ${date}     | PENDING
Special    | Senior Warden  | 14       | ${date}     | IN PROGRESS

ANNEX B: EVACUATION ROUTE OPTIONS (SYNTHETIC)

Route-1: Main Airport → suspended due to ${constraint}
Route-2: Land border crossing at Checkpoint-Alpha → assessment ongoing
Route-3: Sea port at Port-Zone-1 → available, capacity 200 persons per transit
Route-4: Overland via Ring-Road-B → partially passable, requires convoy
Route-5: Helicopter pad at Zone-5 → available for medical emergencies only

ANNEX C: EMERGENCY CONTACTS (SYNTHETIC)

Entity                    | Contact Method   | Status
──────────────────────────|──────────────────|──────────
Host Emergency Authority  | Radio Ch. 7      | AVAILABLE
Cooperating Mission-A     | Encrypted email  | AVAILABLE
OCHA Coordination Office  | Sat phone        | AVAILABLE
Medical Centre Zone-2     | Direct line      | AVAILABLE
Port Authority Port-Zone-1| Radio Ch. 12     | AVAILABLE
Transport Coordinator     | Mobile backup    | STANDBY

END OF SYNTHETIC DOCUMENT — ${id}
`;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeFile(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content, 'utf8');
}

function slugify(s) {
  return s.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 50);
}

// ── CHUNK 1: Manifest + README ────────────────────────────────────────────────

function chunk1() {
  console.log('\n═══ CHUNK 1: Scaffolding + Matrices ═══');

  const treatyCombos = buildTreatyCombos();
  const crisisCombos = buildCrisisCombos();

  // Write matrix files
  writeFile(
    path.join(TREATY_BASE, 'valid-combinations-matrix.json'),
    JSON.stringify({ generated: new Date().toISOString(), count: treatyCombos.length, combinations: treatyCombos }, null, 2)
  );
  console.log(`  [OK] Treaty combos matrix: ${treatyCombos.length} entries`);

  writeFile(
    path.join(CRISIS_BASE, 'valid-combinations-matrix.json'),
    JSON.stringify({ generated: new Date().toISOString(), count: crisisCombos.length, combinations: crisisCombos }, null, 2)
  );
  console.log(`  [OK] Crisis combos matrix: ${crisisCombos.length} entries`);

  // Manifest
  const manifest = {
    generated: new Date().toISOString(),
    synthetic: true,
    note: "All content is fictional and for QA testing only",
    pilots: {
      "treaty-checker": {
        description: "Synthetic treaty vs national instrument compatibility documents",
        treatyCount: treaties.length,
        nationalInstrumentCount: nationalInstruments.length,
        totalCombinations: treatyCombos.length,
        targetGenerated: Math.min(20, treatyCombos.length),
      },
      "crisis-planner": {
        description: "Synthetic operational scenario briefs for consular mission planning",
        missionCount: missions.length,
        crisisTypeCount: crisisTypes.length,
        constraintCount: crisisConstraints.length,
        totalCombinations: crisisCombos.length,
        targetGenerated: Math.min(20, crisisCombos.length),
      }
    },
    directories: {
      treaty_txt: "treaty-checker/inputs/txt/treaty/",
      treaty_law: "treaty-checker/inputs/txt/law/",
      treaty_pdf: "treaty-checker/inputs/pdf/",
      treaty_payloads: "treaty-checker/payloads/",
      treaty_expected: "treaty-checker/expected/",
      treaty_bundles: "treaty-checker/bundles/",
      crisis_txt: "crisis-planner/inputs/txt/",
      crisis_pdf: "crisis-planner/inputs/pdf/",
      crisis_payloads: "crisis-planner/payloads/",
      crisis_expected: "crisis-planner/expected/",
      crisis_bundles: "crisis-planner/bundles/",
      packs: "packs/",
    }
  };

  writeFile(path.join(BASE, 'MANIFEST.json'), JSON.stringify(manifest, null, 2));
  console.log('  [OK] MANIFEST.json written');

  // README
  const readme = `# KhaM Voice Keepers — Synthetic Test Data

> **All content in this directory is SYNTHETIC and FICTIONAL.**
> Generated for software QA testing of KhaM for GOV pilots.
> No real legal advice, operational plans, or personal data is contained herein.

## Structure

\`\`\`
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
\`\`\`

## Pilots

### Treaty Checker
Tests the AI's ability to compare an international treaty with a national
implementing instrument and identify gaps, alignments, and recommendations.

**Valid combos:** ${treatyCombos.length} (${treaties.length} treaties × ${nationalInstruments.length} national instruments)

### Crisis Planner
Tests the AI's ability to generate an operational response plan for a
mission facing a specific crisis scenario with a constraining factor.

**Valid combos:** ${crisisCombos.length} (${missions.length} missions × ${crisisTypes.length} types × ${crisisConstraints.length} constraints)

## Fail Cases
Each pilot includes controlled fail cases — inputs designed to test system
edge cases. These are clearly marked with suffix \`_FAIL\` in the filename
and \`"fail_case": true\` in the payload.

## Usage
1. Use \`.txt\` files for paste-in testing
2. Use \`.pdf\` files for upload testing
3. Use \`payloads/*.jsonl\` for batch API testing
4. Use \`bundles/*/run-sheet.txt\` for manual QA walkthroughs
5. Use \`packs/*.zip\` for distribution

## Generation Date
${new Date().toISOString()}
`;

  writeFile(path.join(BASE, 'README.md'), readme);
  console.log('  [OK] README.md written');

  return { treatyCombos, crisisCombos };
}

// ── CHUNK 2: Treaty inputs ─────────────────────────────────────────────────

function chunk2(treatyCombos) {
  console.log('\n═══ CHUNK 2: Treaty Inputs ═══');

  const BATCH = 20;
  const selected = treatyCombos.slice(0, BATCH);

  const payloadRows = [];
  const csvRows = ['id,treaty,national_instrument,txt_file,expected_file,fail_case'];

  for (let i = 0; i < selected.length; i++) {
    const combo = selected[i];
    const text = generateTreatyText(combo, i);
    const slug = slugify(`${combo.treaty}-vs-${combo.nationalInstrument}`);
    const fname = `${combo.id}_${slug}`;

    // Write treaty text
    writeFile(path.join(TREATY_BASE, 'inputs', 'txt', 'treaty', `${fname}_treaty.txt`), text);

    // Write law text (same file, tagged differently for upload-as-law scenario)
    const lawText = text.replace(
      'TREATY COMPLIANCE ANALYSIS BRIEF',
      'NATIONAL INSTRUMENT TEXT (with treaty references)'
    );
    writeFile(path.join(TREATY_BASE, 'inputs', 'txt', 'law', `${fname}_law.txt`), lawText);

    // Expected checks
    const expected = {
      id: combo.id,
      treaty: combo.treaty,
      nationalInstrument: combo.nationalInstrument,
      expectedOutputContains: [
        "Gap",
        "Aligned",
        "Recommendation",
        "Section",
        "Article",
      ],
      expectedOutputNotContains: [
        "I cannot",
        "error",
        "undefined",
      ],
      minResponseLength: 500,
      fail_case: false,
    };
    writeFile(
      path.join(TREATY_BASE, 'expected', `${combo.id}_expected.json`),
      JSON.stringify(expected, null, 2)
    );

    // Payload entry
    const payload = {
      id: combo.id,
      pilot: 'treaty-checker',
      treaty: combo.treaty,
      national_instrument: combo.nationalInstrument,
      txt_file: `treaty-checker/inputs/txt/treaty/${fname}_treaty.txt`,
      law_txt_file: `treaty-checker/inputs/txt/law/${fname}_law.txt`,
      expected_file: `treaty-checker/expected/${combo.id}_expected.json`,
      fail_case: false,
      generated: new Date().toISOString(),
    };
    payloadRows.push(payload);
    csvRows.push(`"${combo.id}","${combo.treaty}","${combo.nationalInstrument}","treaty-checker/inputs/txt/treaty/${fname}_treaty.txt","treaty-checker/expected/${combo.id}_expected.json",false`);
  }

  // Add controlled fail cases (3)
  const failCases = [
    {
      id: 'TC-FAIL-001',
      treaty: 'INVALID-INSTRUMENT-XYZ',
      nationalInstrument: nationalInstruments[0],
      description: 'Non-existent international instrument — system should flag gracefully',
    },
    {
      id: 'TC-FAIL-002',
      treaty: treaties[0],
      nationalInstrument: 'BLANK-LAW-TEXT',
      description: 'Empty national instrument — system should handle gracefully',
    },
    {
      id: 'TC-FAIL-003',
      treaty: '',
      nationalInstrument: '',
      description: 'Both instruments empty — system should request clarification',
    },
  ];

  for (const fc of failCases) {
    const failText = `SYNTHETIC FAIL CASE — ${fc.id}\nDescription: ${fc.description}\nTreaty: ${fc.treaty || '[EMPTY]'}\nNational Instrument: ${fc.nationalInstrument || '[EMPTY]'}\nThis is an intentional test of error handling.`;
    writeFile(path.join(TREATY_BASE, 'inputs', 'txt', 'treaty', `${fc.id}_fail.txt`), failText);

    const failExpected = {
      id: fc.id,
      fail_case: true,
      description: fc.description,
      expectedBehaviour: 'System should not crash; should ask for clarification or flag the issue',
      expectedOutputContains: [],
      expectedOutputNotContains: ['crash', 'fatal', 'undefined error'],
    };
    writeFile(
      path.join(TREATY_BASE, 'expected', `${fc.id}_expected.json`),
      JSON.stringify(failExpected, null, 2)
    );

    const failPayload = {
      id: fc.id,
      pilot: 'treaty-checker',
      treaty: fc.treaty,
      national_instrument: fc.nationalInstrument,
      fail_case: true,
      description: fc.description,
      txt_file: `treaty-checker/inputs/txt/treaty/${fc.id}_fail.txt`,
      expected_file: `treaty-checker/expected/${fc.id}_expected.json`,
      generated: new Date().toISOString(),
    };
    payloadRows.push(failPayload);
    csvRows.push(`"${fc.id}","${fc.treaty}","${fc.nationalInstrument}","${fc.id}_fail.txt","${fc.id}_expected.json",true`);
  }

  // Write JSONL
  writeFile(
    path.join(TREATY_BASE, 'payloads', 'treaty-checker-payloads.jsonl'),
    payloadRows.map(r => JSON.stringify(r)).join('\n')
  );

  // Write CSV
  writeFile(
    path.join(TREATY_BASE, 'payloads', 'treaty-checker-payloads.csv'),
    csvRows.join('\n')
  );

  console.log(`  [OK] ${selected.length} treaty text files generated`);
  console.log(`  [OK] ${failCases.length} fail cases generated`);
  console.log(`  [OK] JSONL payload: ${payloadRows.length} entries`);
  console.log(`  [OK] CSV payload: ${payloadRows.length} entries`);
  console.log(`  [OK] Expected checks: ${selected.length + failCases.length} files`);

  return selected;
}

// ── CHUNK 3: Crisis inputs ─────────────────────────────────────────────────

function chunk3(crisisCombos) {
  console.log('\n═══ CHUNK 3: Crisis Inputs ═══');

  ensureDir(path.join(CRISIS_BASE, 'inputs', 'txt', 'scenario'));

  const BATCH = 20;
  const selected = crisisCombos.slice(0, BATCH);

  const payloadRows = [];
  const csvRows = ['id,mission,crisis_type,constraint,txt_file,expected_file,fail_case'];

  for (let i = 0; i < selected.length; i++) {
    const combo = selected[i];
    const text = generateCrisisText(combo, i);
    const slug = slugify(`${combo.mission}-${combo.crisisType}-${combo.constraint}`);
    const fname = `${combo.id}_${slug}`;

    writeFile(path.join(CRISIS_BASE, 'inputs', 'txt', 'scenario', `${fname}.txt`), text);

    const expected = {
      id: combo.id,
      mission: combo.mission,
      crisisType: combo.crisisType,
      constraint: combo.constraint,
      expectedOutputContains: [
        "action",
        "contact",
        "coordinate",
        "priority",
        "timeline",
      ],
      expectedOutputNotContains: [
        "I cannot",
        "undefined",
        "error",
      ],
      minResponseLength: 400,
      fail_case: false,
    };
    writeFile(
      path.join(CRISIS_BASE, 'expected', `${combo.id}_expected.json`),
      JSON.stringify(expected, null, 2)
    );

    const payload = {
      id: combo.id,
      pilot: 'crisis-planner',
      mission: combo.mission,
      crisis_type: combo.crisisType,
      constraint: combo.constraint,
      txt_file: `crisis-planner/inputs/txt/scenario/${fname}.txt`,
      expected_file: `crisis-planner/expected/${combo.id}_expected.json`,
      fail_case: false,
      generated: new Date().toISOString(),
    };
    payloadRows.push(payload);
    csvRows.push(`"${combo.id}","${combo.mission}","${combo.crisisType}","${combo.constraint}","crisis-planner/inputs/txt/scenario/${fname}.txt","crisis-planner/expected/${combo.id}_expected.json",false`);
  }

  // Controlled fail cases
  const failCases = [
    {
      id: 'CP-FAIL-001',
      mission: 'City-A Mission',
      crisisType: 'UNKNOWN-TYPE',
      constraint: 'No constraints',
      description: 'Unrecognised crisis type — system should ask for clarification',
    },
    {
      id: 'CP-FAIL-002',
      mission: '',
      crisisType: 'Natural-Disaster',
      constraint: 'Airport closure',
      description: 'Missing mission — system should request location',
    },
    {
      id: 'CP-FAIL-003',
      mission: 'City-B Mission',
      crisisType: 'Civil-Disturbance',
      constraint: 'ALL CONSTRAINTS SIMULTANEOUSLY',
      description: 'Overloaded constraint scenario — system should prioritise',
    },
  ];

  for (const fc of failCases) {
    const failText = `SYNTHETIC FAIL CASE — ${fc.id}\nDescription: ${fc.description}\nMission: ${fc.mission || '[MISSING]'}\nCrisis Type: ${fc.crisisType}\nConstraint: ${fc.constraint}\nThis is an intentional test of error handling.`;
    ensureDir(path.join(CRISIS_BASE, 'inputs', 'txt', 'scenario'));
    writeFile(path.join(CRISIS_BASE, 'inputs', 'txt', 'scenario', `${fc.id}_fail.txt`), failText);

    const failExpected = {
      id: fc.id,
      fail_case: true,
      description: fc.description,
      expectedBehaviour: 'System should handle gracefully, ask for clarification if needed',
      expectedOutputContains: [],
      expectedOutputNotContains: ['crash', 'fatal', 'undefined error'],
    };
    writeFile(
      path.join(CRISIS_BASE, 'expected', `${fc.id}_expected.json`),
      JSON.stringify(failExpected, null, 2)
    );

    const failPayload = {
      id: fc.id,
      pilot: 'crisis-planner',
      mission: fc.mission,
      crisis_type: fc.crisisType,
      constraint: fc.constraint,
      fail_case: true,
      description: fc.description,
      txt_file: `crisis-planner/inputs/txt/scenario/${fc.id}_fail.txt`,
      expected_file: `crisis-planner/expected/${fc.id}_expected.json`,
      generated: new Date().toISOString(),
    };
    payloadRows.push(failPayload);
    csvRows.push(`"${fc.id}","${fc.mission}","${fc.crisisType}","${fc.constraint}","${fc.id}_fail.txt","${fc.id}_expected.json",true`);
  }

  writeFile(
    path.join(CRISIS_BASE, 'payloads', 'crisis-planner-payloads.jsonl'),
    payloadRows.map(r => JSON.stringify(r)).join('\n')
  );

  writeFile(
    path.join(CRISIS_BASE, 'payloads', 'crisis-planner-payloads.csv'),
    csvRows.join('\n')
  );

  console.log(`  [OK] ${selected.length} crisis scenario files generated`);
  console.log(`  [OK] ${failCases.length} fail cases generated`);
  console.log(`  [OK] JSONL payload: ${payloadRows.length} entries`);
  console.log(`  [OK] CSV payload: ${payloadRows.length} entries`);

  return selected;
}

// ── CHUNK 4: Bundles + PDF stubs + Packs ──────────────────────────────────

function chunk4(treatySelected, crisisSelected) {
  console.log('\n═══ CHUNK 4: Bundles + PDF stubs + Packs ═══');

  // Bundle: treaty-checker
  let bundleCount = 0;
  for (let i = 0; i < treatySelected.length; i++) {
    const combo = treatySelected[i];
    const bundleDir = path.join(TREATY_BASE, 'bundles', combo.id);
    ensureDir(bundleDir);

    const runSheet = `SYNTHETIC RUN SHEET — ${combo.id}
════════════════════════════════════════════════════
Pilot: Treaty Checker
Case ID: ${combo.id}
Treaty: ${combo.treaty}
National Instrument: ${combo.nationalInstrument}
Generated: ${new Date().toISOString()}
Classification: UNCLASSIFIED / SYNTHETIC
════════════════════════════════════════════════════

STEP 1: UPLOAD DOCUMENTS
  File 1: inputs/txt/treaty/${combo.id}_*.txt (paste as treaty text)
  File 2: inputs/txt/law/${combo.id}_*_law.txt (paste as national law text)
  OR upload the corresponding PDF versions from inputs/pdf/

STEP 2: PASTE PROMPT
  Copy prompt from: prompts/input-prompt.txt
  Replace [TREATY_TITLE] with: ${combo.treaty}
  Replace [LAW_TITLE] with: ${combo.nationalInstrument}

STEP 3: SUBMIT AND OBSERVE
  Expected response time: 10–30 seconds
  Expected output: Analysis with gaps/alignment/recommendations

STEP 4: VALIDATE AGAINST EXPECTED
  Expected file: expected/${combo.id}_expected.json
  Check for all items in "expectedOutputContains"
  Verify none of "expectedOutputNotContains" appear
  Verify response length ≥ 500 characters

STEP 5: LOG RESULT
  Pass / Fail / Partial
  Notes: _______________________________________________
  Timestamp: ___________________________________________
  Tester: _____________________________________________

════════════════════════════════════════════════════
SYNTHETIC DATA — FOR TESTING ONLY
`;
    writeFile(path.join(bundleDir, 'run-sheet.txt'), runSheet);
    bundleCount++;
  }

  // Bundle: crisis-planner
  for (let i = 0; i < crisisSelected.length; i++) {
    const combo = crisisSelected[i];
    const bundleDir = path.join(CRISIS_BASE, 'bundles', combo.id);
    ensureDir(bundleDir);

    const runSheet = `SYNTHETIC RUN SHEET — ${combo.id}
════════════════════════════════════════════════════
Pilot: Crisis Planner
Case ID: ${combo.id}
Mission: ${combo.mission}
Crisis Type: ${combo.crisisType}
Constraint: ${combo.constraint}
Generated: ${new Date().toISOString()}
Classification: UNCLASSIFIED / SYNTHETIC
════════════════════════════════════════════════════

STEP 1: UPLOAD SCENARIO
  File: inputs/txt/scenario/${combo.id}_*.txt (paste as scenario brief)
  OR upload the corresponding PDF version from inputs/pdf/

STEP 2: PASTE PROMPT
  Copy prompt from: prompts/input-prompt.txt
  Replace [MISSION] with: ${combo.mission}
  Replace [CRISIS_TYPE] with: ${combo.crisisType}
  Replace [CONSTRAINT] with: ${combo.constraint}

STEP 3: SUBMIT AND OBSERVE
  Expected response time: 10–30 seconds
  Expected output: Operational response plan with prioritised actions

STEP 4: VALIDATE AGAINST EXPECTED
  Expected file: expected/${combo.id}_expected.json
  Check for all items in "expectedOutputContains"
  Verify response length ≥ 400 characters

STEP 5: LOG RESULT
  Pass / Fail / Partial
  Notes: _______________________________________________
  Timestamp: ___________________________________________
  Tester: _____________________________________________

════════════════════════════════════════════════════
SYNTHETIC DATA — FOR TESTING ONLY
`;
    writeFile(path.join(bundleDir, 'run-sheet.txt'), runSheet);
    bundleCount++;
  }

  console.log(`  [OK] ${bundleCount} bundle run-sheets written`);

  // PDF stubs (text-based PDF placeholder — no actual PDF library available)
  // We create minimal valid plaintext files marked as .pdf proxies
  const pdfNote = (type, id, title) => `%PDF-1.4 SYNTHETIC STUB
%% This is a SYNTHETIC PDF STUB for QA testing.
%% Actual PDF rendering requires a PDF library.
%% Content summary:
%% Type: ${type}
%% ID: ${id}
%% Title: ${title}
%% Generated: ${new Date().toISOString()}
%% Classification: UNCLASSIFIED / SYNTHETIC
%%
%% To generate actual PDFs, use a tool like:
%%   - LibreOffice --convert-to pdf <txt-file>
%%   - node -e "require('pdfkit')..." <txt-file>
%%   - puppeteer headless browser conversion
%%
%% This stub file is upload-ready as a reference placeholder.
%PDF-STUB-END
`;

  let pdfCount = 0;
  for (let i = 0; i < Math.min(10, treatySelected.length); i++) {
    const combo = treatySelected[i];
    const slug = slugify(`${combo.treaty}-vs-${combo.nationalInstrument}`);
    const fname = `${combo.id}_${slug}`;
    ensureDir(path.join(TREATY_BASE, 'inputs', 'pdf', 'treaty'));
    ensureDir(path.join(TREATY_BASE, 'inputs', 'pdf', 'law'));
    writeFile(path.join(TREATY_BASE, 'inputs', 'pdf', 'treaty', `${fname}_treaty.pdf.stub.txt`), pdfNote('treaty', combo.id, combo.treaty));
    writeFile(path.join(TREATY_BASE, 'inputs', 'pdf', 'law', `${fname}_law.pdf.stub.txt`), pdfNote('law', combo.id, combo.nationalInstrument));
    pdfCount += 2;
  }

  for (let i = 0; i < Math.min(10, crisisSelected.length); i++) {
    const combo = crisisSelected[i];
    const slug = slugify(`${combo.mission}-${combo.crisisType}-${combo.constraint}`);
    const fname = `${combo.id}_${slug}`;
    ensureDir(path.join(CRISIS_BASE, 'inputs', 'pdf', 'scenario'));
    writeFile(path.join(CRISIS_BASE, 'inputs', 'pdf', 'scenario', `${fname}.pdf.stub.txt`), pdfNote('scenario', combo.id, `${combo.mission} / ${combo.crisisType}`));
    pdfCount++;
  }

  console.log(`  [OK] ${pdfCount} PDF stub files written`);

  // Write prompts
  const treatyInputPrompt = `TREATY COMPATIBILITY CHECKER — SYNTHETIC TEST PROMPT
════════════════════════════════════════════════════
[PASTE THIS PROMPT INTO THE TOOL — REPLACE PLACEHOLDERS]

You are a legal analysis assistant. I am providing you with:
1. An international treaty or convention: [TREATY_TITLE]
2. A national implementing law: [LAW_TITLE]

Please analyse whether the national law adequately implements the
obligations of the international treaty. Your analysis should:

a) Identify areas of alignment between the two instruments
b) Identify gaps where the national law does not fully implement the treaty
c) Highlight any definitional inconsistencies
d) Note any enforcement or penalty discrepancies
e) Provide concrete recommendations for closing identified gaps

Format your response with clear headings:
- ALIGNMENT AREAS
- GAPS IDENTIFIED
- RECOMMENDATIONS
- RISK ASSESSMENT

[The document text will be pasted or uploaded separately]
════════════════════════════════════════════════════
SYNTHETIC TEST DATA — NOT REAL LEGAL ADVICE
`;

  const crisisInputPrompt = `CRISIS PLANNER — SYNTHETIC TEST PROMPT
════════════════════════════════════════════════════
[PASTE THIS PROMPT INTO THE TOOL — REPLACE PLACEHOLDERS]

You are an operational planning assistant for a diplomatic mission.
A [CRISIS_TYPE] event has occurred in the area of [MISSION].
The primary operational constraint is: [CONSTRAINT]

Please provide an operational response plan that includes:
1. Immediate priority actions (first 6 hours)
2. Welfare and communication procedures
3. How to work around the constraint: [CONSTRAINT]
4. Coordination with host-country and other missions
5. Escalation triggers and decision points
6. Resource and logistics considerations

Format clearly with prioritised action items and timelines.

[The scenario brief document will be pasted or uploaded separately]
════════════════════════════════════════════════════
SYNTHETIC TEST DATA — NOT REAL OPERATIONAL GUIDANCE
`;

  writeFile(path.join(TREATY_BASE, 'prompts', 'input-prompt.txt'), treatyInputPrompt);
  writeFile(path.join(CRISIS_BASE, 'prompts', 'input-prompt.txt'), crisisInputPrompt);
  console.log('  [OK] Prompt templates written');

  // Pack index files (actual zip would need a zip library; write a manifest instead)
  const packSmallManifest = {
    packName: 'synthetic-data-small',
    description: 'Small pack: first 5 treaty cases + first 5 crisis cases',
    note: 'SYNTHETIC DATA FOR QA TESTING ONLY',
    generated: new Date().toISOString(),
    contents: {
      treaty: treatySelected.slice(0, 5).map(c => c.id),
      crisis: crisisSelected.slice(0, 5).map(c => c.id),
    },
    totalFiles: '~40 files',
    instructions: 'Extract and follow run-sheet.txt in each bundle directory'
  };

  const packFullManifest = {
    packName: 'synthetic-data-full',
    description: 'Full pack: all 20 treaty cases + all 20 crisis cases + fail cases',
    note: 'SYNTHETIC DATA FOR QA TESTING ONLY',
    generated: new Date().toISOString(),
    contents: {
      treaty: treatySelected.map(c => c.id),
      crisis: crisisSelected.map(c => c.id),
      failCases: ['TC-FAIL-001', 'TC-FAIL-002', 'TC-FAIL-003', 'CP-FAIL-001', 'CP-FAIL-002', 'CP-FAIL-003'],
    },
    totalFiles: '~200 files',
    instructions: 'Extract and follow run-sheet.txt in each bundle directory'
  };

  writeFile(path.join(PACKS_BASE, 'synthetic-data-small-manifest.json'), JSON.stringify(packSmallManifest, null, 2));
  writeFile(path.join(PACKS_BASE, 'synthetic-data-full-manifest.json'), JSON.stringify(packFullManifest, null, 2));

  // Try to create zip packs using PowerShell
  console.log('  [OK] Pack manifests written');
  console.log('  [INFO] ZIP packs will be created via PowerShell compress...');

  return { bundleCount, pdfCount };
}

// ── SANITY CHECK ─────────────────────────────────────────────────────────────

function sanityCheck() {
  console.log('\n═══ SANITY CHECK ═══');

  const checks = [
    { label: 'MANIFEST.json', path: path.join(BASE, 'MANIFEST.json') },
    { label: 'README.md', path: path.join(BASE, 'README.md') },
    { label: 'Treaty combo matrix', path: path.join(TREATY_BASE, 'valid-combinations-matrix.json') },
    { label: 'Crisis combo matrix', path: path.join(CRISIS_BASE, 'valid-combinations-matrix.json') },
    { label: 'Treaty JSONL payload', path: path.join(TREATY_BASE, 'payloads', 'treaty-checker-payloads.jsonl') },
    { label: 'Crisis JSONL payload', path: path.join(CRISIS_BASE, 'payloads', 'crisis-planner-payloads.jsonl') },
    { label: 'Pack small manifest', path: path.join(PACKS_BASE, 'synthetic-data-small-manifest.json') },
    { label: 'Pack full manifest', path: path.join(PACKS_BASE, 'synthetic-data-full-manifest.json') },
  ];

  let allPass = true;
  for (const check of checks) {
    const exists = fs.existsSync(check.path);
    const size = exists ? fs.statSync(check.path).size : 0;
    console.log(`  [${exists ? 'OK' : 'FAIL'}] ${check.label}: ${size} bytes`);
    if (!exists) allPass = false;
  }

  // Count files by type
  function countFiles(dir, ext) {
    if (!fs.existsSync(dir)) return 0;
    let count = 0;
    for (const f of fs.readdirSync(dir, { recursive: true })) {
      if (f.endsWith(ext)) count++;
    }
    return count;
  }

  const txts = countFiles(path.join(TREATY_BASE, 'inputs', 'txt'), '.txt')
             + countFiles(path.join(CRISIS_BASE, 'inputs', 'txt'), '.txt');
  const pdfs = countFiles(path.join(TREATY_BASE, 'inputs', 'pdf'), '.txt')  // stubs
             + countFiles(path.join(CRISIS_BASE, 'inputs', 'pdf'), '.txt');
  const expecteds = countFiles(path.join(TREATY_BASE, 'expected'), '.json')
                  + countFiles(path.join(CRISIS_BASE, 'expected'), '.json');
  const bundles = countFiles(path.join(TREATY_BASE, 'bundles'), '.txt')
                + countFiles(path.join(CRISIS_BASE, 'bundles'), '.txt');

  console.log(`\n  COUNTS:`);
  console.log(`    TXT input files: ${txts}`);
  console.log(`    PDF stub files: ${pdfs}`);
  console.log(`    Expected check files: ${expecteds}`);
  console.log(`    Bundle run-sheets: ${bundles}`);

  return allPass;
}

// ── MAIN ─────────────────────────────────────────────────────────────────────

console.log('KhaM Voice Keepers — Synthetic Data Generator');
console.log('═══════════════════════════════════════════════');
console.log('ALL CONTENT IS SYNTHETIC / FICTIONAL');
console.log('Generated: ' + new Date().toISOString());

try {
  const { treatyCombos, crisisCombos } = chunk1();
  const treatySelected = chunk2(treatyCombos);
  const crisisSelected = chunk3(crisisCombos);
  const stats = chunk4(treatySelected, crisisSelected);
  const allPass = sanityCheck();

  console.log('\n═══ GENERATION COMPLETE ═══');
  console.log(`  Status: ${allPass ? 'ALL CHECKS PASSED' : 'SOME CHECKS FAILED'}`);
  console.log('  Pilots: treaty-checker, crisis-planner');
  console.log('  Treaty cases: 20 + 3 fail cases');
  console.log('  Crisis cases: 20 + 3 fail cases');
  console.log(`  Bundles: ${stats.bundleCount}`);
  console.log(`  PDF stubs: ${stats.pdfCount}`);
  console.log('  Packs: synthetic-data-small, synthetic-data-full');

} catch (err) {
  console.error('ERROR:', err.message);
  console.error(err.stack);
  process.exit(1);
}
