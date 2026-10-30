# 03 — Design system

The system lives in code. This document explains the intent and the rules; `/design-system` in the
browser is the reference implementation.

**Guiding idea:** _confident, not loud._ Deep ink structure, off-white air, one violet accent used
where it earns attention. Borders carry separation; shadows only describe depth.

---

## 1. Colour

Four families, each with one job. Semantic aliases are preferred in components.

### Ink (navy) — structure and dark surfaces

| Token     | Hex       | Use                                               |
| --------- | --------- | ------------------------------------------------- |
| `ink-950` | `#080A14` | Footer, deepest band                              |
| `ink-900` | `#101322` | Dark sections, dark buttons, illustration strokes |
| `ink-800` | `#171B2D` | Hover on dark buttons                             |
| `ink-700` | `#222741` | Dark surfaces inside dark bands                   |
| `ink-600` | `#2F3550` | Illustration chrome                               |
| `ink-500` | `#444C6B` | Secondary text inside mockups                     |
| `ink-400` | `#5B6280` | Rare, decorative                                  |

### Mist (neutral) — canvas, lines, secondary text

| Token      | Hex       | Use                                |
| ---------- | --------- | ---------------------------------- |
| `mist-50`  | `#FAFAFC` | Subtle panel fill                  |
| `mist-100` | `#F7F7FA` | **Canvas** (page background)       |
| `mist-200` | `#EDEEF4` | Badges, input fills, mockup chrome |
| `mist-300` | `#E1E3EC` | Stronger divider                   |
| `mist-400` | `#CDD0DD` | Disabled / placeholder marks       |
| `mist-500` | `#A9AEC2` | Meta text on ink                   |
| `mist-600` | `#7C8298` | Reserved                           |
| `mist-700` | `#5C6379` | Reserved                           |

### Brand (electric violet) — one action per screen

| Token       | Hex       | Use                                                     |
| ----------- | --------- | ------------------------------------------------------- |
| `brand-50`  | `#F4F2FF` | Tinted surface                                          |
| `brand-100` | `#EAE7FF` | Tinted surface border                                   |
| `brand-300` | `#BCB3FF` | Eyebrow on ink                                          |
| `brand-500` | `#7865F5` | **Signature accent** — graphics, marks, large text only |
| `brand-600` | `#6A56EE` | **Primary button background** (5.0:1 with white)        |
| `brand-700` | `#5743DA` | Hover, links, small text (6.5:1 on canvas)              |
| `brand-800` | `#4633B0` | Text on brand-50                                        |

### Halo (soft blue) — supporting accent

| Token      | Hex       | Use                                 |
| ---------- | --------- | ----------------------------------- |
| `halo-100` | `#EEF1FF` | Rare tint                           |
| `halo-200` | `#DCE3FE` | Avatar fills                        |
| `halo-300` | `#C7D2FE` | Links on ink (9.7:1)                |
| `halo-400` | `#A5B4FC` | Data marks, chart bars, bullet dots |

### Semantic aliases

`canvas` `#F7F7FA` · `surface` `#FFFFFF` · `surface-muted` `#FAFAFC` · `line` `#E5E7EF` ·
`line-strong` `#D5D8E4` · `fg` `#171827` · `fg-muted` `#5C6379` · `fg-subtle` `#666C80` ·
`fg-inverse` `#F7F7FA` · feedback: `danger-600/700` `#C0384A`/`#A12C3C`, `success-700` `#1A6B52`.

### Contrast (measured, not assumed)

| Pair                    | Ratio  | Verdict                                          |
| ----------------------- | ------ | ------------------------------------------------ |
| `fg` on canvas          | 16.4:1 | AAA                                              |
| `fg-muted` on canvas    | 5.6:1  | AA                                               |
| `fg-subtle` on canvas   | 4.9:1  | AA (captions only)                               |
| white on `brand-600`    | 5.0:1  | AA                                               |
| white on `brand-500`    | 4.2:1  | Fails AA for small text — **CTA uses brand-600** |
| `danger-700` on white   | 7.1:1  | AAA                                              |
| `halo-300` on `ink-900` | 9.7:1  | AAA                                              |

**Rule:** never place small text directly on `brand-500`. Never use violet for body copy.

### Colour rules

- Maximum one violet surface and one violet button visible per band.
- No gradients on UI. No glows, no blurred orbs.
- A dark band must be separated by at least one light band; never two dark bands in a row.
- Tinted surfaces (`brand-50`, `halo-100`) only for a highlighted tier or a suggestion, never as a
  general background.

---

## 2. Typography

**Manrope** (display, variable 200–800) for voice: headlines, section titles, numerals in cards.
**Inter** (interface, variable 100–900) for utility: body, UI, labels, tables.
Self-hosted latin subsets (73 KB total). No Google Fonts request at runtime.

| Style       | Size    | Line height | Tracking | Weight        | Use                                |
| ----------- | ------- | ----------- | -------- | ------------- | ---------------------------------- |
| `display-1` | 44 → 72 | 1.02        | −3.5%    | 700           | Homepage hero only                 |
| `display-2` | 36 → 56 | 1.05        | −3.2%    | 700           | Interior page H1                   |
| `title-1`   | 30 → 44 | 1.10        | −2.8%    | 700           | Section headings                   |
| `title-2`   | 24 → 30 | 1.20        | −2.2%    | 650           | Sub-section / design-system blocks |
| `title-3`   | 20      | 1.35        | −1.5%    | 600           | Card titles, mobile nav            |
| `lead`      | 17 → 19 | 1.65        | −0.5%    | 400           | Intro paragraph under a heading    |
| `body`      | 16      | 1.65        | 0        | 400           | Default body                       |
| `body-sm`   | 15      | 1.60        | 0        | 400           | Dense UI, nav, form labels         |
| `caption`   | 13      | 1.50        | 0        | 400           | Metadata, hints, captions          |
| `overline`  | 12      | 1.00        | +14%     | 600 uppercase | Eyebrows, column labels            |

Sizes are fluid via `clamp()` between 480 px and 1280 px viewport widths — the scale stays optically
consistent without per-breakpoint overrides.

**Rules**

- One `display-1` per site (homepage). Interior pages use `display-2`.
- Measure: 60–75 characters. Body copy is capped by `max-w-prose` (704 px) or `max-w-2xl` (672 px).
- No all-caps headlines. Uppercase is reserved for `overline`.
- No more than two weights of an accent colour in a single band.
- Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty` (set globally).

---

## 3. Space, layout and breakpoints

**Base unit: 4 px.** Every component offset sits on the scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64,
96, 128). Section rhythm:

| Token           | Range       | Applied                       |
| --------------- | ----------- | ----------------------------- |
| `py-section-sm` | 56 px       | Compact bands (status strips) |
| `py-section`    | 64 → 112 px | Default section               |
| `py-section-lg` | 80 → 144 px | Hero and closing bands        |

**Containers:** `content` 1200 px (primary grid) · `wide` 1344 px (full-bleed frames) ·
`prose` 704 px (long text). Gutters: `clamp(20 px, 0.9 rem + 1.6 vw, 48 px)`.

**Breakpoints** (Tailwind prefixes in brackets)

| Token | Width   | Layout intent                                                        |
| ----- | ------- | -------------------------------------------------------------------- |
| `sm`  | 480 px  | Large phone: stack → 2-up grids                                      |
| `md`  | 768 px  | Tablet portrait: 2–3 column grids, product sidebar appears           |
| `lg`  | 1024 px | Tablet landscape / small laptop: full desktop nav, 2-column sections |
| `xl`  | 1280 px | Desktop: widest type sizes, secondary product panels                 |
| `2xl` | 1536 px | Wide desktop: extra product chrome, never wider content              |

Rules: never introduce a horizontal scrollbar; test at 360, 768, 1024, 1440. Grids are
`grid gap-5` with `sm:`/`lg:` column counts — no fixed pixel widths for content blocks.

---

## 4. Radius, borders, elevation

| Radius | Value  | Applied to                   |
| ------ | ------ | ---------------------------- |
| `xs`   | 6 px   | Swatch scale, small chips    |
| `sm`   | 8 px   | Inline chips, logo hit area  |
| `md`   | 10 px  | **Buttons, inputs, selects** |
| `lg`   | 14 px  | **Cards**                    |
| `xl`   | 18 px  | Large panels                 |
| `2xl`  | 24 px  | Product frame                |
| `3xl`  | 32 px  | Reserved                     |
| full   | 999 px | Badges, avatar, nav pill     |

**Borders:** always 1 px, colour `line`; hover → `line-strong`. Dark bands use `white/10`.
**Elevation:** `shadow-e1` controls and resting cards · `shadow-e2` hover and dropdowns ·
`shadow-e3` sheets · `shadow-frame` product mockups. All shadows are low-alpha navy; none are used
on flat text bands.

---

## 5. Components

### Buttons (`Button`, `ButtonLink`, `buttonStyles`)

| Variant     | Use                                                                  |
| ----------- | -------------------------------------------------------------------- |
| `primary`   | The single most important action in a band (`brand-600`, white text) |
| `secondary` | Alternative action on light (`surface` + `line` border)              |
| `ghost`     | Low-priority navigation actions                                      |
| `dark`      | Primary action on light when violet would be too much                |
| `inverse`   | Secondary action on ink bands                                        |

Sizes: `sm` 36 px · `md` 44 px · `lg` 48 px. Radius 10 px. Focus: 2 px `brand-600` outline, 3 px
offset (`halo-300` on ink). Icons are 16 px and inherit `currentColor`; arrow icons translate 2 px on
hover. Disabled: 50% opacity, pointer events off.

Rules: sentence case labels, 2–4 words, verbs first ("Start for free", "Explore the design system").
Never two `primary` buttons in the same visual band.

### Cards (`Card`)

Variants: `default` (white + line + e1), `muted` (surface-muted), `ink` (dark), `brand-soft`
(violet tint), `plain`. Padding: `sm` 16, `md` 24, `lg` 28–32. Radius 14 px.
Only cards that are entirely a link get `interactive` (0.5 px lift + `shadow-e2` + stronger border).
Never nest a card inside a card.

### Badges (`Badge`)

Metadata only — status, category, version. Not clickable. 6 px/4 px padding, 11–13 px text, pill
radius. Variants: `neutral`, `muted`, `brand`, `outline`, `inverse`; optional 6 px dot.

### Forms (`Field`, `Input`, `Textarea`, `Select`, `Checkbox`)

44 px control height, 10 px radius, white surface, `line` border, `e1` shadow. Focus: `brand-400`
border + 3 px `brand-500/25` ring. Error: `danger-200` border, `danger-700` message, `aria-invalid`.
Label above (always visible, 15 px medium), hint/optional text below in `caption`. `Field` wires
`htmlFor` and `aria-describedby` via a render prop — no `cloneElement`. Validation appears on blur,
never on every keystroke.

### Accordion

Single-open disclosure; button + `aria-expanded`/`aria-controls`; plus icon rotates 45° to a close
state; closed panels are removed from the accessibility tree (`hidden`). Used for FAQs only.

### Navigation

Sticky header, 64 px mobile / 72 px desktop. At rest it is transparent on canvas; after 8 px of
scroll, or when the mobile panel is open, it becomes `canvas/88` with a hairline border and backdrop
blur. Desktop: centred pill nav; active item is a white pill with `e1`. Mobile: 40 px bordered menu
button, panel with 56 px rows, primary CTA at the end, scroll lock, `Escape` to close, auto-close on
route change and on desktop breakpoint.

**Over a dark band:** the header inverts (light logo, translucent white nav pill, white menu button)
and shares the band's background. It flips back to the light treatment after 8 px of scroll. Because
a sticky header occupies layout space, a transparent header over the ink hero would leave a light
strip above it — the ink background is deliberate.

---

## 6. Product mockup language

The interface frames (`components/product/`) are the signature visual asset.

- Built from DOM and SVG — sharp at any density, styled by the same tokens, no image payload.
- Composition: window chrome → sidebar → primary view → secondary panel. Panels drop out at smaller
  widths rather than shrinking text.
- Three frame variants share the same atoms: `DashboardWindow` (hero command centre),
  `ShowcaseWindow` (analytics: icon rail, tabs, line chart, table) and the four `FeatureCrops`
  (one region each).
- Content is realistic but generic: "Studio North", "Finalise pricing brief v2", dates, durations.
- Text never goes below 12 px. Below that, replace detail with an abstract row rather than shrinking
  the type.
- **Never interactive:** `aria-hidden`, `pointer-events-none`, no focusable controls. Anything that
  would be a button is a styled span.
- Camera rules per section: one region per frame (a task list, a rule card, the suggestion panel), not
  the whole app repeated.
- Always captioned: "Illustrative interface… no live data, integrations or AI is connected."

---

## 7. Motion

| Token  | Value  | Applied                        |
| ------ | ------ | ------------------------------ |
| `fast` | 140 ms | Hover, focus, colour           |
| `base` | 220 ms | Buttons, card lift, menu panel |
| `slow` | 420 ms | Section reveals (planned)      |

Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (exponential ease-out). No bounce, no overshoot, no parallax,
no scroll-jacking. All durations collapse to ~0 under `prefers-reduced-motion: reduce`.

---

## 8. Accessibility checklist (applies to every new component)

- [ ] Colour pair meets AA; text under 16 px uses `fg`, `fg-muted`, `brand-700` or darker.
- [ ] Visible focus state using the global outline, or an explicit equivalent.
- [ ] Interactive element is a real `<button>`, `<a>`/`<Link>`, `input`, `select` or `textarea`.
- [ ] Hit area ≥ 44 × 44 px on touch.
- [ ] Label, `aria-describedby`, `aria-invalid` wired for form controls.
- [ ] Disclosure/menu/dialog exposes expanded state and closes on `Escape`.
- [ ] Icon-only control has an accessible name; decorative icons are `aria-hidden`.
- [ ] Heading order is sequential; one `h1` per page.
- [ ] Nothing relies on colour alone to communicate state.

---

## 9. Do / don't

| Do                                    | Don't                                                    |
| ------------------------------------- | -------------------------------------------------------- |
| Let whitespace separate ideas         | Fill every band edge-to-edge with cards                  |
| Use one violet CTA per band           | Use violet for links, icons, badges and buttons together |
| Crop one interface region per section | Squeeze the whole app into a 300 px column               |
| Write plain, specific sentences       | Use "revolutionary", "unleash", "10× your output"        |
| Caption mockups as illustrative       | Imply the product is live                                |
| Use borders to structure              | Use heavy drop shadows to create hierarchy               |
| Keep display type tight (−3%)         | Track out headlines or use uppercase display             |

---

## 10. Changing the system

1. Change a token in `src/styles/tokens.css` — never hard-code a colour or size in a component.
2. If a new pattern is needed, add a variant to the existing component rather than a one-off class set.
3. Add the component to `/design-system` **and** to the inventory list once it is used on a page.
4. Re-run `npm run typecheck && npm run build`; check 360 / 768 / 1024 / 1440.
