# FlowPilot AI — marketing site foundation

**Less busywork. More meaningful work.**

A premium SaaS marketing website for FlowPilot AI, a fictional AI productivity platform. This
repository currently contains the **project analysis, architecture and design-system foundation** —
the homepage and page content are intentionally not built yet.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run typecheck
npm run format
```

## What is here

- **Design tokens** in `src/styles/tokens.css` — colour, fluid type, spacing, radii, elevation,
  breakpoints, motion. Tailwind CSS v4, configured in CSS (no config file).
- **Component layer** in `src/components` — layout primitives, buttons, cards, badges, form controls,
  accordion, product mockup.
- **Responsive shell** — sticky header with mobile navigation, footer, routing, 404, skip link.
- **Living reference** at `/design-system` — every token and component, including the illustrative
  product interface.
- **Page blueprints** at `/features`, `/pricing`, `/about`, `/contact` — planned composition, shown
  openly rather than faked.

## Pages

| Route            | Status                                                      |
| ---------------- | ----------------------------------------------------------- |
| `/`              | Foundation overview (homepage composition pending approval) |
| `/features`      | Blueprint                                                   |
| `/pricing`       | Blueprint                                                   |
| `/about`         | Blueprint                                                   |
| `/contact`       | Blueprint                                                   |
| `/design-system` | Living reference                                            |

## Documentation

Start with [`docs/README.md`](./docs/README.md), then
[`docs/05-open-decisions.md`](./docs/05-open-decisions.md) for what needs sign-off.

## Content policy

FlowPilot AI is fictional. No invented customers, testimonials, logos or business results appear
anywhere. Every product interface is a captioned illustration; nothing implies live data or working AI.
