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

## Still open (non-blocking)

These can be answered during the remaining page builds. Each item states the current default in code.

### Integrations on the Features page

- **Current plan:** generic category chips (calendar, docs, chat, tasks) — no partner logos.
- **Alternative:** omit the band and lean on the automation narrative instead.

### Pricing presentation

- **Current:** USD only, "per seat / month", three tiers (Starter $0, Team $18, Scale $39), labelled
  illustrative on the homepage preview.
- **Open:** a currency switcher (USD/GBP/CAD), annual framing ("two months free" vs "save 17%"), and
  whether the full pricing page keeps the same tier names.

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
