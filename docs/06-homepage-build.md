# 06 — Homepage build

Built against the approved architecture and design system. No existing token was changed to make it
work — the v0.2 pass only added `--glow-brand`, `--glow-brand-soft`, `--glow-halo` and
`--duration-slower`.

## Section map

| #   | Section            | Tone          | What it does                                                         | Code                                         |
| --- | ------------------ | ------------- | -------------------------------------------------------------------- | -------------------------------------------- |
| 1   | Hero               | ink `#101322` | Promise, dual CTA, ambient violet field, command centre with 4 views | `home/Hero` + `product/DashboardWindow`      |
| 2   | Trust band         | surface       | Audience definitions, capability, security posture, concept note     | `home/TrustBand`                             |
| 3   | Problem & solution | canvas        | Three administrative failures → one unified workspace (ink card)     | `home/ProblemSolution`                       |
| 4   | Four core features | surface       | Tab cards switch one large preview across the four capabilities      | `home/CoreFeatures` + `product/FeatureCrops` |
| 5   | How it works       | canvas        | Three steps on a hairline rule                                       | `home/HowItWorks`                            |
| 6   | Product showcase   | ink           | Deeper analytics view, bleeding to the right edge on desktop         | `home/Showcase` + `product/ShowcaseWindow`   |
| 7   | Pricing preview    | surface       | Three illustrative tiers, monthly/annual toggle, middle recommended  | `home/PricingPreview`                        |
| 8   | FAQ                | canvas        | Seven objections, first open                                         | `home/FaqSection`                            |
| 9   | Final CTA          | ink           | Closing conversion band                                              | `home/FinalCta`                              |
| 10  | Footer             | ink-950       | Navigation + demo disclosure                                         | `layout/SiteFooter`                          |

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
  button, active nav, focus bars and the "recommended" tier. The v0.2 pass adds three scoped accents:
  the ambient field behind the hero frame, a keyword gradient in four section headlines, and the
  "Save 20%" chip. None of them introduces a second CTA.
- **The dashboard is a sample app, not a toy.** Four tabs (Overview, Automations, Analytics, Team)
  share one skeleton — header, four KPIs, chart + list, footer strip — so switching never changes the
  hero's height. Each view is written at the same density as the original overview.
- **One interactive exception.** The tab strip is a real `tablist` (roving tabindex, arrow keys,
  Home/End) because it only swaps sample views. It is captioned like every other frame; nothing in it
  saves, sends or implies live data.
- **Feature picking replaces four static crops.** Hover, click or focus a card and one preview panel
  swaps copy, three highlights and the interface crop. The cards keep the elevation hover that the
  brief asked for; the panel re-mounts for a 420 ms entrance.
- **Trust without borrowed credibility.** No logos, no quotes, no percentages. The section argues
  from audience fit, capability and generic security posture, and says so in its footnote.
- **Sample data is realistic but invented** — Studio North, Jamie Lee, "Finalise pricing brief v2",
  durations rather than business results.

## Responsive behaviour

| Width     | Behaviour                                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1440+     | Content 1200 px; hero frame ~1104 px with frosted bezel; showcase bleeds to the viewport edge; header shows pill nav + two actions |
| 1024–1279 | Hero frame keeps its sidebar and tab strip; feature selector goes 2-up and the preview stacks at `lg`                              |
| 768–1023  | Sidebar drops from the hero frame, KPIs go 4-up, chart and priorities stay side by side; feature preview stacks                    |
| 375–767   | Dashboard tabs lose their icons and scroll horizontally if needed; KPI cards 2×2; footer strips hide; pricing toggle stacks        |

## Verification (v0.2)

- `npx tsc --noEmit` — clean.
- `npm run build` — 424 KB JS raw / 125.7 KB gzip · 66.5 KB CSS raw / 12.0 KB gzip.
- `npm run smoke` — all seven routes render; one `<h1>` each.
- Interaction pass in jsdom — 31/31 checks: tab selection + panel swap, arrow-key navigation,
  feature hover/click switch, monthly → annual prices ($18/$39 → $14/$31), `aria-pressed` state,
  accordion open/close with `inert`, no runtime errors.
- Manual DOM audit: header inversion, section order and tonal rhythm, caption presence on every frame.

## Known gaps (next build)

1. `/contact` is still a blueprint, so "Start for free" lands on a page that says the form is not
   built yet. The contact form + success state is the natural next step.
2. Features, Pricing, About content.
3. Route-level code splitting and an optional prerender pass before launch.
