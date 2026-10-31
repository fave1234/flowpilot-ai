# 01 — Project analysis

## 1. What we are building

A five-page premium SaaS marketing website for **FlowPilot AI**, a fictional AI-powered productivity
platform. The work has two jobs:

1. **Demonstrate design and engineering quality** — this is a portfolio-grade artefact, judged on
   typography, hierarchy, restraint and responsiveness.
2. **Behave like a real marketing site** — working navigation, real routing, functional CTAs and form
   states, realistic sample content, and honest labelling of anything simulated.

**Positioning:** _Less busywork. More meaningful work._
**Audience:** entrepreneurs, freelancers, startup founders and small business teams in the US, UK and
Canada.
**Desired feeling:** intelligent, efficient, reliable, innovative, approachable.

## 2. Audience and what each segment needs

| Segment                               | Situation                                 | What the page must answer                     | What loses them                                                         |
| ------------------------------------- | ----------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| Solo founders & freelancers           | Everything is a task; no ops support      | "Will this actually save me time this week?"  | Enterprise speak, seat-based minimums, setup that sounds like a project |
| Startup founders (2–20)               | Too many tools, no shared source of truth | "Can my team adopt this without a migration?" | Vague AI claims, pricing that hides the real cost                       |
| Small business teams (ops, marketing) | Repeated handoffs and chasing             | "Does it connect to what we already use?"     | Decorative feature grids with no product detail                         |
| The evaluator (this brief)            | Judges craft                              | "Is the system coherent and maintainable?"    | Inconsistency, template aesthetics, dead links                          |

**Practical consequences**

- The primary action must be cheap to understand: one label, one destination, present in header,
  hero and closing band.
- Pricing must be legible at a glance, in USD-first framing with a note on currency for UK/CA buyers.
- Copy is written in short, declarative sentences with American spelling (audience majority), no
  growth-hack exclamation marks.
- Product proof has to come from **interface clarity**, not invented social proof.

## 3. Jobs to be done (marketing site)

1. Understand the product in under five seconds from the hero.
2. See the product before signing up (a credible, labelled interface view).
3. Understand what it costs without a sales call.
4. Trust the team enough to hand over an email address.
5. Complete the primary CTA on any device without hunting for the button.

## 4. Content rules (non-negotiable for this project)

These are encoded in the codebase, not just in this document.

- **No invented customers, logos, testimonials or business results.** No logo walls, no "used by
  10,000 teams", no "saves 12 hours a week", no named quotes.
- **No claims that simulated AI is real.** The interface mockup is `aria-hidden`, non-interactive,
  and captioned "Illustrative interface… no live data, integrations or AI is connected".
- **Sample data is realistic but generic** — "Studio North", "Jamie Lee", real-shaped task names.
- **Pricing and plans are labelled illustrative** on the page where they appear.
- **No dead links.** Every navigation item and CTA resolves to a real route. Where a real endpoint
  does not exist (contact form), the UI says so in the success state.
- **The demo nature is disclosed** in the footer of every page and in the page `<meta name="robots"
content="noindex">` until a real product exists.

## 5. Visual direction and anti-goals

**Direction:** editorial SaaS. Deep ink navy as the structural colour, off-white canvas, one electric
violet accent used sparingly, soft blue as a supporting mark colour. Generous whitespace, tight
display typography, hairline borders, low-alpha shadows, real interface geometry.

**Explicit anti-goals** (the "generic AI site" tells):

- Purple-to-pink gradients, glows, blurred orbs, floating 3D shapes.
- Dark-mode-by-default hero with neon accents.
- Icon grids with six identical rounded squares and no product detail.
- Auto-playing carousels, marquees, scroll-jacking, parallax.
- Oversized emoji, "✨ AI-powered" badges everywhere, fake chat windows.
- More than one accent colour competing for attention on a screen.
- Crowded sections: two ideas per band, maximum.

## 6. Scope for this phase

**In scope, delivered now**

- Requirements analysis and architecture decision.
- Design-system foundation: tokens (colour, type, space, radius, elevation, breakpoints, motion).
- Reusable component layer, responsive header/footer, routing, 404, SEO helper.
- A living `/design-system` reference, including the product mockup language.
- Structure for all five pages (blueprint pages, not final content).

**Out of scope until sign-off**

- Homepage composition and its section copy.
- Final content for Features, Pricing, About and Contact.
- Contact-form transmission, analytics, CMS integration.

## 7. Technical constraints from the environment

| Constraint                                                | Consequence                                                                                                |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Node 22 + npm registry reachable; no backend, no database | Static front-end; forms are client-validated only                                                          |
| Preview served through a proxy host (`*.e2b.app`)         | Dev server must allow arbitrary hosts (`allowedHosts: true`) and bind `0.0.0.0`                            |
| No browser binary in the build environment                | Visual QA is manual in the preview; correctness is enforced with type-checking, build and a DOM smoke test |
| Fonts must not depend on a third-party CDN                | Inter and Manrope are self-hosted (latin subset, 73 KB total)                                              |
| No stock photography available                            | Product imagery is built from DOM/SVG, which also keeps the mockups honest and sharp                       |
| SPA without SSR                                           | Per-page metadata is applied client-side; see the SEO trade-off in doc 02                                  |

## 8. Risks and mitigations

| Risk                               | Mitigation                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Site reads as a template           | Bespoke product frame, editorial type scale, restrained palette, no gradient/glow vocabulary           |
| Fictional product feels dishonest  | Explicit demo disclosure, captions on every mockup, no fabricated proof                                |
| Mockups become illegible on mobile | Cropped single-region frames; no shrinking of the full app below 12px text                             |
| Violet overuse                     | Violet reserved for primary action, focus and one highlighted surface per band                         |
| SPA SEO weakness                   | Documented; static pre-render or Next.js migration path prepared (components are portable)             |
| Accessibility regressions          | Token contrast checked, visible focus rings, real labels, reduced-motion support, keyboard-tested menu |
| Visual drift as pages are added    | Everything composes from tokens and the documented primitives; `/design-system` is the reference       |

## 9. Success criteria for the finished site

- Hero understood in five seconds by someone outside the project.
- One primary CTA per page, reachable within one screen on mobile.
- Navigation and every CTA functional on desktop, tablet and mobile (360 → 1440+).
- No layout shift from fonts; no horizontal scroll at any breakpoint.
- Lighthouse targets once deployed: performance ≥ 95, accessibility ≥ 95, best-practice ≥ 95.
- A developer can add a new page by composing existing components without new CSS.
- No invented proof anywhere in the site, verified by a final content audit.
