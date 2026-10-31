# 05 — Decisions and resolution log

## Resolved (approved)

| #   | Decision             | Resolution                                                                                                                                                                            |
| --- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Frontend stack       | **Approved:** Vite + React 19 + TypeScript + Tailwind v4. SSR trade-off accepted — the site stays `noindex`, so client-side metadata is acceptable. Do not switch frameworks.         |
| 2   | Typography           | **Approved:** Manrope for display, Inter for interface.                                                                                                                               |
| 3   | Design system        | **Approved,** including `#6A56EE` for buttons and `#666C80` for captions (both AA).                                                                                                   |
| 4   | Primary CTA          | **"Start for free" → `/contact`.** This is a conversion-focused portfolio concept; the brief's label wins over the more conservative "Request access".                                |
| 5   | Disclosure           | Footer line + mockup captions + `noindex` only. No in-hero notice — the hero stays clean and conversion-focused.                                                                      |
| 6   | Trust section        | Communicated through audience definitions, capability statements and generic security messaging, plus an "Illustrative concept" note. No logos, quotes, benchmarks or certifications. |
| 7   | Homepage composition | Built in the order specified: hero → trust → problem/solution → four features → how it works → showcase → pricing preview → FAQ → final CTA → footer.                                 |

## Implemented decisions (homepage build)

- **Dark band budget:** three ink bands (hero, showcase, closing CTA) separated by at least two light
  bands. Showcase uses a dark band so the analytics frame reads as a distinct, deeper view rather than
  a repeat of the hero.
- **Mockup depth:** full dashboard in the hero, full analytics view in the showcase, and four
  single-region crops for the features. No frame repeats the whole app twice.
- **Header over the hero:** the header is ink while it sits on the hero and flips to the light
  treatment after 8 px of scroll (it occupies layout space, so a transparent header would have left a
  light strip above the hero).
- **Frame text floor:** 12 px. Detail is removed rather than shrunk; sidebars and secondary panels
  drop out at tablet instead of compressing the primary view.

## Resolved — v0.2 visual polish pass (31 Oct 2026)

| #   | Decision              | Resolution                                                                                                                                                                                                      |
| --- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8   | Hero dashboard        | **Approved:** four interactive views (Overview, Automations, Analytics, Team) on a real tablist. Static illustration was the original rule; the tab strip is now the single exception and is keyboard operable. |
| 9   | Ambient depth         | **Approved:** one violet radial field behind the hero frame, a frosted glass bezel and translucent chrome (`border-white/10`, `backdrop-blur`). This replaces the old "no glows" rule for that band only.       |
| 10  | Headline emphasis     | **Approved:** violet → indigo gradient on one keyword phrase in four section headlines (features, showcase, pricing, FAQ). Display sizes only; solid ink everywhere else.                                       |
| 11  | Feature section       | **Approved:** hover/click/focus tab cards drive one large preview instead of four static crops. Cards keep body copy, index and an elevation hover.                                                             |
| 12  | FAQ motion            | **Approved:** measured height via `grid-template-rows` + opacity, `inert` while closed. Plus → × rotation kept, slowed to 420 ms and given a violet fill.                                                       |
| 13  | CTA micro-interaction | **Approved:** 2 px hover lift plus a single 620 ms light sweep on filled buttons (`primary`, `dark`). No loops, no idle animation.                                                                              |

Still open (unchanged): currency switcher, contact delivery, analytics, full Features/Pricing page
content, route-level code splitting.

## Still open (non-blocking)

These can be answered during the remaining page builds. Each item states the current default in code.

### Integrations on the Features page

- **Current plan:** generic category chips (calendar, docs, chat, tasks) — no partner logos.
- **Alternative:** omit the band and lean on the automation narrative instead.

### Pricing presentation

- **Resolved for the homepage preview:** USD only, three tiers (Starter $0, Team $18/14, Scale $39/31)
  with a Monthly / Annual segmented toggle. Annual is framed as **Save 20%** and shows the monthly
  equivalent ($14, $31) with "billed annually · 20% off" under each price. Still labelled illustrative.
- **Open:** a currency switcher (USD/GBP/CAD) and whether the full pricing page keeps the same tier
  names and cadence copy.

### About page framing

- **Current plan:** in-character product story, clearly fictional, plus a short "how this site was
  designed" note and labelled team placeholders.
- **Alternative:** present the whole site openly as a design case study (changes tone site-wide).

### Contact form behaviour

- **Current plan:** client-side validation only; the success state states plainly that nothing was
  sent.
- **If real delivery is wanted:** an endpoint (Resend, Formspree or an API route) and reviewed consent
  copy. Not recommended until the concept is approved.

### Analytics and tracking

- **Current:** none. If required, a cookieless tool plus one line in the footer. Not recommended for a
  fictional demo.

### Logo and favicon

- **Current:** flight-path chevron with a violet crossbar and a soft-blue beacon, used in the header,
  product chrome and `public/favicon.svg`.
- **Alternative:** a monogram tile or a typographic "FP" mark. Cheap to swap.
