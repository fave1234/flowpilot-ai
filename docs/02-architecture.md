# 02 — Architecture

## 1. Stack recommendation

**Chosen: Vite + React 19 + TypeScript + Tailwind CSS v4 + React Router 7.**

| Option                                 | Strengths                                                                                                            | Weaknesses here                                                                                                                                        | Verdict                                                  |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| **Vite + React SPA**                   | Instant HMR, tiny config surface, static-first output, trivial to host; design iteration is the fastest of the three | No SSR/SSG, so meta tags are applied client-side                                                                                                       | **Chosen**                                               |
| Next.js (App Router)                   | SSG/SSR per route, best-in-class SEO and image handling, file-based routing                                          | Heavier dev server, more config to maintain, framework surface far exceeds a five-page static site; preview/HMR behind a proxy needs extra host config | Alternative if organic search becomes a real requirement |
| Astro                                  | Excellent static output and near-zero JS, islands architecture                                                       | Component ergonomics for an interactive SPA-like experience (mobile menu, toggle states) need more bespoke wiring; smaller ecosystem familiarity       | Rejected for this brief                                  |
| Plain HTML/CSS                         | Zero dependencies                                                                                                    | No component reuse, no type safety, poor maintainability at this component count                                                                       | Rejected                                                 |
| CSS-in-JS (styled-components, Emotion) | Scoped styles                                                                                                        | Runtime cost, no token-first workflow, weaker DX than utility tokens                                                                                   | Rejected                                                 |

**Why Vite wins for this brief.** The site has no data fetching, no auth, no CMS and no personalisation:
the value is entirely in design quality and component consistency. Vite gives sub-100 ms rebuilds and
a flat, readable codebase — the whole system lives in `src/styles/tokens.css` plus 15 small components.
The cost is SEO, which is documented and reversible (section 9).

### Versions in use

`react 19.3` · `react-dom 19.3` · `react-router-dom 7.18` · `vite 8.3` · `typescript 5.9` ·
`tailwindcss 4.3` (`@tailwindcss/vite`) · `lucide-react 1.65` · `clsx` + `tailwind-merge`.

Tailwind v4 is configured **in CSS** (`@theme` inside `src/styles/tokens.css`) — there is no
`tailwind.config.js`. Tokens are simultaneously design decisions and utility classes.

### Supporting libraries (deliberately few)

- **`lucide-react`** — 1.5–2px stroke icon set that matches the typography weight. No custom icon font.
- **`clsx` + `tailwind-merge`** — one `cn()` helper for conditional classes and conflict resolution.
- **No animation library.** Motion is CSS transitions on tokens; reduced-motion is honoured globally.
- **No component library (shadcn/MUI).** The visual language is bespoke; importing a system would fight it.

## 2. Rendering and runtime model

- **Client-rendered SPA**, `BrowserRouter`, code-split later at route level if the bundle grows.
- **No global state manager.** Page-local state only: mobile menu (open), accordion (open index), form
  fields (future), pricing cadence (future).
- **No layout shift from fonts:** self-hosted variable fonts with `font-display: swap` and a
  pre-set canvas colour in `index.html`.
- **Design tokens → utilities → components → pages.** No page contains a hex value or a magic pixel
  value that is not on the 4px scale.

## 3. Folder structure

```
src/
├─ App.tsx                     # Shell + route table
├─ main.tsx                    # React root + BrowserRouter
├─ assets/fonts/               # Self-hosted Inter + Manrope (latin subset) + OFL licences
├─ styles/
│  ├─ tokens.css               # ★ Single source of truth: @theme tokens
│  ├─ globals.css              # Base layer, focus treatment, utilities, reduced motion
│  └─ fonts.css                # @font-face declarations
├─ config/paths.ts             # Route table (no string literals in components)
├─ content/
│  ├─ site.ts                  # Name, tagline, nav, footer nav, CTA targets
│  └─ blueprints.ts            # Page composition plans + per-page decisions
├─ lib/
│  ├─ cn.ts                    # clsx + tailwind-merge
│  ├─ usePageMeta.ts           # Title/description/OG updates per route
│  └─ ScrollToTop.tsx          # Resets scroll on navigation
├─ components/
│  ├─ layout/                  # Container, Section, SiteHeader (+ mobile nav), SiteFooter
│  ├─ ui/                      # Button, Badge, Card, Eyebrow, SectionHeading, Field, Input,
│  │                           # Textarea, Select, Checkbox, Accordion, TextLink, Logo
│  └─ product/AppWindow.tsx    # Illustrative product interface
└─ pages/                      # Home, Features, Pricing, About, Contact, DesignSystem, NotFound,
                               # BlueprintPage (shared interior-page placeholder)
```

**Naming and composition rules**

- `components/ui` never imports from `pages`; `pages` compose `layout` + `ui` + `product`.
- Variants are typed unions mapped to class records (`const variants: Record<Variant, string>`), never
  ad-hoc conditional strings at call sites.
- Content lives in `content/`, not inline in JSX, wherever it is reused (nav, CTA, blueprint data).
- A new page is one file in `pages/` plus one route in `App.tsx` and one path key in `config/paths.ts`.

## 4. Design-token layer

`src/styles/tokens.css` defines four colour families (`ink`, `mist`, `brand`, `halo`), semantic
aliases (`canvas`, `surface`, `line`, `fg`, `fg-muted`, `fg-subtle`), a fluid type scale
(`display-1` → `overline`), section spacing rhythm, container widths, radii, four elevation levels,
five breakpoints and motion tokens.

Because they are declared in `@theme`, they are available both as CSS variables and as utilities:
`--color-brand-600` → `bg-brand-600`, `--radius-lg` → `rounded-lg`, `--shadow-e2` → `shadow-e2`.

Changing a token changes every page. There is one place to rebrand.

## 5. Routing and CTA map

| Route            | Purpose                             | Primary CTA                            |
| ---------------- | ----------------------------------- | -------------------------------------- |
| `/`              | Homepage (blueprint until approved) | Explore the design system (foundation) |
| `/features`      | Capability story                    | Start free                             |
| `/pricing`       | Tiers + FAQ                         | Start free                             |
| `/about`         | Company / method                    | Start free                             |
| `/contact`       | Working enquiry form                | Send message (demo)                    |
| `/design-system` | Living reference (internal)         | Back to foundation                     |
| `*`              | 404 with recovery link              | Back to foundation                     |

- `primaryCta` and `primaryNav` are declared once in `src/content/site.ts`; the header, mobile panel,
  footer and pages all read from there, so the conversion path cannot drift.
- Navigation is `NavLink`-based, so the active state and `aria-current="page"` are automatic.
- In-page anchor scrolling uses native `#` anchors plus `scroll-padding-top` for the sticky header.

## 6. Accessibility approach

- Semantic landmarks: single `<h1>` per page, `<header>`, `<main id="main">`, `<footer>`, skip link.
- Keyboard: focus-visible ring system (2px brand, 3px offset), mobile menu closes on `Escape`, locks
  body scroll, and closes when the viewport becomes desktop; focus moves into the panel on open.
- Forms: persistent visible labels, `aria-describedby` wiring through `Field`, `aria-invalid` on error.
- Disclosure: `aria-expanded` + `aria-controls` on the accordion and menu.
- Contrast: body text 16.4:1, muted 5.6:1, captions 4.9:1, white on the CTA violet 5.0:1.
- `prefers-reduced-motion` collapses all durations globally.
- Product mockup is `aria-hidden` and non-focusable, with a text caption that carries the meaning.

## 7. Performance position (current build)

| Asset  | Size                               |
| ------ | ---------------------------------- |
| CSS    | 46.7 KB raw / **8.9 KB gzip**      |
| JS     | 364 KB raw / **111.5 KB gzip**     |
| Fonts  | 73 KB (two variable latin subsets) |
| Images | none (product art is DOM/SVG)      |

Notes and next steps: 111 KB gzipped is acceptable for a React SPA but not lean by marketing-site
standards. Planned for the page build phase: route-level `React.lazy` (design system and the pages
off the critical path), and if needed a pre-render step. No image payload means LCP is text-bound.

## 8. Quality gates

- `npm run typecheck` — strict TypeScript, `noUnusedLocals`, `noUnusedParameters`.
- `npm run build` — type-check + production build.
- `npm run smoke` — builds, then renders every route in jsdom and fails on a crash, a missing `<h1>`,
  duplicate `h1`s or an empty page. Standing in for a browser, which this environment does not have.
- `npm run format` — Prettier (`printWidth 100`, single quotes).
- Manual: keyboard-only pass, 360/768/1024/1440 responsive pass, contrast spot-check.

## 9. SEO trade-off (needs your awareness)

A client-rendered SPA ships an almost-empty HTML shell. `usePageMeta` updates the title, description
and OG tags after mount — good enough for link previews in most modern crawlers and for a noindex
demo, but **not** the right foundation for a site that must rank.

Two reversible options when SEO matters:

1. **Keep the SPA, add prerendering** at build time (e.g. `vite-plugin-prerender` or an
   `vite build --ssr` pass with a small script) so each route ships real HTML. ~Half a day, no
   component changes.
2. **Port to Next.js App Router.** Routes become folders, `usePageMeta` becomes `export const metadata`,
   everything else is unchanged because the component layer is framework-agnostic React + Tailwind.
   ~1–2 days including re-testing.

Recommendation: build the pages in the current stack, then add prerendering before any real launch.

## 10. Deployment

- Static output in `dist/` — any static host (Netlify, Vercel, Cloudflare Pages, S3 + CDN).
- SPA fallback required: rewrite all unknown paths to `index.html`.
- `vite.config.ts` sets `allowedHosts: true` so the sandbox preview proxy can serve the app. **This must
  be replaced with an explicit host allowlist before production.** (It only affects the dev server,
  not the built site.)
- `dist/` and `node_modules/` are git-ignored.
