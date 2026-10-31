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
npm run smoke      # build, then render every route in jsdom
npm run format
```

## What is here

- **Homepage** — dark hero with a full product dashboard, trust band, problem/solution, four
  capabilities with interface crops, three-step narrative, analytics showcase, pricing preview, FAQ
  and closing CTA.
- **Design tokens** in `src/styles/tokens.css` — colour, fluid type, spacing, radii, elevation,
  breakpoints, motion. Tailwind CSS v4, configured in CSS (no config file).
- **Component layer** in `src/components` — layout primitives, buttons, cards, badges, form controls,
  accordion, and a family of illustrative product frames built from the same tokens.
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

FlowPilot AI is fictional. Editorial Unsplash photographs do not depict FlowPilot customers. The
founder quote and its time-saving claim are explicitly labelled illustrative, not a real customer
result. Product interface visuals are captioned illustrations with sample data; preview controls do
not connect to live data or AI. Pricing is labelled illustrative.
