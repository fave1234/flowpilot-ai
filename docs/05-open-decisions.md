# 05 — Decisions needed before the homepage build

Each item states the current default (already in the code), the alternative, and the cost of changing
your mind later. Only the first three are blocking; the rest can be answered during the page build.

## Blocking

### 1. Frontend stack — Vite + React + Tailwind (current) vs Next.js

- **Current:** Vite 8 SPA, static output, client-side metadata.
- **Alternative:** Next.js App Router for per-route static HTML (better SEO, heavier tooling).
- **Trade-off:** the SPA is faster to iterate and simpler to maintain; SEO needs a prerender step or a
  migration later. Components port almost unchanged.
- **Recommendation:** stay on Vite, add prerendering before a real launch.

### 2. Typography — Manrope + Inter (current) vs a single family

- **Current:** Manrope for display/headings, Inter for body/UI. Familiar pairing, strong hierarchy.
- **Alternative:** Inter only (more uniform, less distinctive) or Manrope only (warmer, less legible
  in dense UI at 13 px).
- **Recommendation:** keep the pairing. It is the cheapest way to look designed rather than templated.

### 3. Primary CTA destination and label

- **Current:** "Start free" → `/contact` (the only page that can accept intent). No signup page exists.
- **Alternatives:** "Book a walkthrough" → `/contact` (more honest for a fictional product);
  "Request access" → `/contact`; or add a lightweight `/signup` route.
- **Note:** "Start free" implies a working product. If honesty is the priority, "Request access" is the
  safer label.

## Confirm during the build

### 4. How loudly the demo nature is disclosed

Current: footer line on every page + `<meta name="robots" content="noindex">` + captions on mockups +
the homepage's foundation notice.
Options: add a one-line notice in the hero, or keep disclosure to footer/captions only (more
"in character").

### 5. Integrations on the Features page

Current plan: generic category chips (calendar, docs, chat, tasks).
Alternative: omit the band entirely. Fabricated partner logos are **not** an option per the content
rules.

### 6. Pricing presentation

- Currency: USD only with a note (current plan) vs USD/GBP/CAD switcher.
- Annual framing: "two months free" vs "save 17%".
- Tier names: Starter / Team / Scale vs Solo / Studio / Scale.

### 7. About page framing

Current plan: in-character product story, clearly fictional, plus a short "how this site was designed"
note and labelled team placeholders.
Alternative: present the whole site openly as a design case study (changes tone across the site).

### 8. Contact form behaviour

Current: client-side validation only; success state explicitly says nothing was sent.
If you want real delivery we need an endpoint (Formspree/Resend/API route) plus a privacy note — and
the consent copy must be reviewed first.

### 9. Product mockup depth on the homepage

Current plan: three half-frames (task list + suggestion, automation rules, focus chart) rather than
the full app repeated. Alternative: one large full-width frame in the hero and text-only narrative
sections below. The first reads more editorial; the second is bolder but risks legibility.

### 10. Dark band budget on the homepage

Current plan: two ink bands (principles/honesty + closing CTA). Alternative: one (closing only) for a
lighter, more editorial page.

### 11. Analytics and tracking

Current: none. If required, add a cookieless tool (e.g. Plausible) and a short privacy line in the
footer. Not recommended for a fictional demo.

### 12. Logo and favicon

Current: a flight-path chevron with a violet crossbar and a soft-blue beacon (SVG, used in header and
favicon). Alternatives: a monogram tile or a typographic "FP" mark. Easy to swap later — one component
plus `public/favicon.svg`.
