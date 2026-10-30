# 04 — Page blueprints

The canonical version of this data lives in `src/content/blueprints.ts` and is rendered on each
placeholder page, so the site and the documentation cannot drift. This document adds the reasoning.

## Shared anatomy

Every page follows the same skeleton, which is what makes the site feel like one product:

1. **Band** — `Section` with one tone (canvas / surface / ink) and one spacing step.
2. **Heading block** — `SectionHeading`: eyebrow, `title-1`, one `lead` paragraph. Left-aligned by
   default; centred only for short closing bands.
3. **Body** — grid of cards, a product frame, or a list. Never more than two content ideas per band.
4. **Exit** — text link or CTA that moves the reader one step closer to contact.

Alternating tones: canvas → surface → canvas. Ink is used at most twice per page (one proof/closing
moment and the footer). No two dark bands adjacent.

## Conversion map

| Page     | Primary CTA                    | Secondary                       | Notes                                       |
| -------- | ------------------------------ | ------------------------------- | ------------------------------------------- |
| Home     | Start free → `/contact`        | See how it works → `/features`  | Repeated once in the closing band           |
| Features | Start free → `/contact`        | View pricing → `/pricing`       | Per-capability anchors, no per-feature CTAs |
| Pricing  | Start free → `/contact?plan=…` | Talk to us → `/contact`         | Plan choice pre-selects the contact topic   |
| About    | Start free → `/contact`        | Read the features → `/features` | No newsletter sign-up                       |
| Contact  | Send message (demo)            | Back to features                | Success state states nothing was sent       |

---

## Home

**Job:** earn belief in 90 seconds, then get out of the way.

| #   | Section                | Content intent                                                      | Visual                                                       |
| --- | ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | Hero                   | Positioning line, one sentence of audience, primary + secondary CTA | `display-1` headline, product frame cropped at the fold      |
| 2   | Three outcomes         | Decide what is next · automate the repeatable · protect focus       | Three text blocks, hairline dividers, no icons-as-decoration |
| 3   | Narrative 1 — Decide   | The morning plan: what matters today and why                        | Half-frame: suggestion panel + task list                     |
| 4   | Narrative 2 — Automate | Rules that remove handoffs, reversible by default                   | Half-frame: automation rule cards + toggle states            |
| 5   | Narrative 3 — Protect  | Focus blocks, notification batching, meeting hygiene                | Chart/marks frame, restrained                                |
| 6   | How it works           | Connect → prioritise → review each morning (three steps)            | Numbered list, one horizontal rule                           |
| 7   | Principles / honesty   | Labelled statement of what is and is not real                       | Ink band, three short principles                             |
| 8   | Pricing preview        | Three tiers, one highlighted, link to full page                     | Small cards, no toggle here                                  |
| 9   | FAQ                    | Four objections: switching, data, price, AI reliability             | Accordion                                                    |
| 10  | Closing CTA            | Single violet button, one line of copy                              | Ink band                                                     |

_Mobile:_ hero frame crops to the task list only; narrative frames become stacked text + cropped frame.

## Features

**Job:** show the shape of the working day, not an inventory of features.

| #   | Section                 | Intent                                                                        |
| --- | ----------------------- | ----------------------------------------------------------------------------- |
| 1   | Intro                   | Name the three things FlowPilot removes: triage, chasing, context switching   |
| 2   | Capability grid         | Six capabilities, nine-word summaries, anchor links                           |
| 3   | Deep dive — Today       | Full-width frame with three annotations                                       |
| 4   | Deep dive — Automations | Before/after handoff diagram (illustrative)                                   |
| 5   | Integrations            | Category chips: calendar, docs, chat, tasks — **no fabricated partner logos** |
| 6   | Principles              | Calm defaults, explicit automation, reversible actions                        |
| 7   | FAQ                     | Six questions on fit, data, switching cost                                    |
| 8   | Closing CTA             | Ink band                                                                      |

## Pricing

**Job:** remove price anxiety. All figures illustrative.

| #   | Section                | Intent                                                                   |
| --- | ---------------------- | ------------------------------------------------------------------------ |
| 1   | Intro + cadence toggle | Real segmented control; annual framing stated plainly                    |
| 2   | Tier grid              | Starter / Team / Scale. Middle tier emphasised with a border + one badge |
| 3   | Included in every plan | Security basics, export, support expectations                            |
| 4   | Comparison detail      | Accessible `<table>`, collapsing to stacked rows on mobile               |
| 5   | Billing FAQ            | Currency, tax, notice period — written for US/UK/CA buyers               |
| 6   | Closing CTA            | Primary + "talk to us" secondary                                         |

**Sample tiers (illustrative, pending approval):** Starter $0 — 1 workspace, 3 automations ·
Team $18/seat/mo — unlimited automations, shared views · Scale $39/seat/mo — SSO, audit log, priority
support. No invented customer counts or savings claims.

## About

**Job:** make the project legible as a piece of design work without pretending to be a real company.

| #   | Section                    | Intent                                                             |
| --- | -------------------------- | ------------------------------------------------------------------ |
| 1   | Mission                    | Why administrative drag is the real cost for small teams           |
| 2   | Origin story               | Short, clearly fictional narrative for the product                 |
| 3   | Operating principles       | Four principles, each with a product consequence                   |
| 4   | How this site was designed | Audience → positioning → system → composition (case-study honesty) |
| 5   | Team placeholders          | Four role-based profiles, initials avatars, labelled placeholders  |
| 6   | Closing CTA                | Contact, not newsletter                                            |

## Contact

**Job:** make the form feel safe, and be honest about what it does.

| #   | Section            | Intent                                                                      |
| --- | ------------------ | --------------------------------------------------------------------------- |
| 1   | Intro + form       | Two columns: form, and a panel explaining what happens next                 |
| 2   | Form model         | Name, work email, company, team size, topic, message, consent               |
| 3   | Validation states  | On blur; inline, `aria-invalid`, explicit messages; never a red-only signal |
| 4   | Success state      | Confirms intent, states plainly that no message was sent and no data stored |
| 5   | Alternative routes | Response expectation; email address as text until a real inbox exists       |
| 6   | Short FAQ          | Trials, migration, support hours                                            |

---

## Content inventory (sample data in use)

- Product: FlowPilot AI · tagline "Less busywork. More meaningful work."
- Illustrative workspace: Studio North · members Jamie Lee, Alex Morgan
- Sample tasks: "Finalise pricing brief v2", "Draft homepage narrative", "Review automation rules",
  "Send Q4 planning notes"
- Sample automations: "Meeting notes → tasks", "Weekly plan → calendar", "Inbox triage (draft only)"
- Sample metrics inside mockups: durations and counts only (e.g. "3h 20m planned"); never results,
  savings or growth claims
