# 06 — Homepage build

Built against the approved architecture and design system. No tokens were changed to make it work;
every section composes existing primitives.

## Section map

| #   | Section            | Tone          | What it does                                                              | Code                                         |
| --- | ------------------ | ------------- | ------------------------------------------------------------------------- | -------------------------------------------- |
| 1   | Hero               | ink `#101322` | Promise, dual CTA, full-width command-centre dashboard                    | `home/Hero` + `product/DashboardWindow`      |
| 2   | Trust band         | surface       | Audience definitions, capability, security posture, concept note          | `home/TrustBand`                             |
| 3   | Problem & solution | canvas        | Three administrative failures → one unified workspace (ink card)          | `home/ProblemSolution`                       |
| 4   | Four core features | surface       | Automation, projects, collaboration, insights — one interface region each | `home/CoreFeatures` + `product/FeatureCrops` |
| 5   | How it works       | canvas        | Three steps on a hairline rule                                            | `home/HowItWorks`                            |
| 6   | Product showcase   | ink           | Deeper analytics view, bleeding to the right edge on desktop              | `home/Showcase` + `product/ShowcaseWindow`   |
| 7   | Pricing preview    | surface       | Three illustrative tiers, middle recommended                              | `home/PricingPreview`                        |
| 8   | FAQ                | canvas        | Seven objections, first open                                              | `home/FaqSection`                            |
| 9   | Final CTA          | ink           | Closing conversion band                                                   | `home/FinalCta`                              |
| 10  | Footer             | ink-950       | Navigation + demo disclosure                                              | `layout/SiteFooter`                          |

## Design decisions worth reviewing

- **Hero is dark, and so is the header over it.** The header is a sticky element, so it occupies
  layout space; giving it the hero's ink background keeps the band seamless. It flips to the light
  treatment after 8 px of scroll.
- **Two frame scales.** The hero frame is wide, dense and chrome-heavy (the "screenshot" moment). The
  showcase frame is a different product surface — icon rail, tabs, line chart and table — so the
  second look adds information instead of repeating the first.
- **Feature crops are single regions**, not the whole app: a rule builder, a board, a task thread and
  a time chart. At tablet the board drops a column instead of compressing three into 90 px each.
- **Violet discipline.** One violet action per band; violet appears in the frames only as primary
  button, active nav, focus bars and the "recommended" tier.
- **Trust without borrowed credibility.** No logos, no quotes, no percentages. The section argues
  from audience fit, capability and generic security posture, and says so in its footnote.
- **Sample data is realistic but invented** — Studio North, Jamie Lee, "Finalise pricing brief v2",
  durations rather than business results.

## Responsive behaviour

| Width     | Behaviour                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1440+     | Content 1200 px; hero frame ~1104 px; showcase bleeds to the viewport edge; header shows pill nav + two actions           |
| 1024–1279 | Hero frame loses its right-hand automation panel; feature grid still 2-up; showcase bleed reduced                         |
| 768–1023  | Sidebar drops from the hero frame, KPIs go 4-up, chart and priorities stay side by side; features go 1-up with wide crops |
| 375–767   | Frames show the primary view only; KPI cards 2×2; chart keeps seven bars; menu collapses to the full-width panel          |

## Verification

- `npm run typecheck` — clean.
- `npm run build` — 120.7 KB JS gzip · 9.8 KB CSS gzip.
- `npm run smoke` — all seven routes render; one `<h1>` each; zero focusable elements inside any
  illustration.
- Manual DOM audit: header inversion, section order and tonal rhythm, caption presence on every frame.

## Known gaps (next build)

1. `/contact` is still a blueprint, so "Start for free" lands on a page that says the form is not
   built yet. The contact form + success state is the natural next step.
2. Features, Pricing, About content.
3. Route-level code splitting and an optional prerender pass before launch.
