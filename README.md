# FlowPilot AI — marketing site

**Less busywork. More meaningful work.**

A premium SaaS marketing website for FlowPilot AI, a fictional AI productivity platform. The homepage
is built; Features, Pricing, About and Contact are shown as open blueprints awaiting content.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run typecheck
npm run smoke      # build, render every route in jsdom, then test the interactions
npm run format
```

## What is here

- **Homepage** — dark hero with an ambient violet field and a glass dashboard carrying four switchable
  sample views (Overview, Automations, Analytics, Team), trust band, problem/solution, four
  capabilities with a shared interactive preview, three-step narrative, analytics showcase, pricing
  preview with a monthly/annual toggle, FAQ accordion and closing CTA.
- **Design tokens** in `src/styles/tokens.css` — colour, fluid type, spacing, radii, elevation,
  breakpoints, motion. Tailwind CSS v4, configured in CSS (no config file).
- **Component layer** in `src/components` — layout primitives, buttons, cards, badges, form controls,
  accordion, segmented control, and a family of illustrative product frames built from the same
  tokens. The hero dashboard is the one interactive frame; everything else is static.
- **Responsive shell** — sticky header that inverts over the dark hero, mobile navigation, footer,
  routing, 404, skip link.
- **Living reference** at `/design-system` — every token and component in the browser.

## Pages

| Route            | Status           |
| ---------------- | ---------------- |
| `/`              | Homepage — built |
| `/features`      | Blueprint        |
| `/pricing`       | Blueprint        |
| `/about`         | Blueprint        |
| `/contact`       | Blueprint        |
| `/design-system` | Living reference |

## Documentation

Start with [`docs/README.md`](./docs/README.md), then
[`docs/05-open-decisions.md`](./docs/05-open-decisions.md) for the decision log.

## Content policy

FlowPilot AI is fictional. No invented customers, testimonials, logos or business results appear
anywhere. Every product interface is a captioned illustration with no text below 12px, and nothing
implies live data or working AI. The one interactive exception is the hero dashboard's view tablist,
which only swaps between four sample screens; every static crop remains `aria-hidden` and
non-interactive. Pricing is labelled illustrative.
