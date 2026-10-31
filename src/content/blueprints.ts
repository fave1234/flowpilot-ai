import { paths } from '@/config/paths';

export type PlannedSection = {
  title: string;
  note: string;
  tag?: string;
};

export type PageBlueprint = {
  to: string;
  label: string;
  eyebrow: string;
  title: string;
  lead: string;
  meta: { title: string; description: string };
  sections: PlannedSection[];
  decisions?: string[];
};

export const pageBlueprints: Record<'features' | 'pricing' | 'about' | 'contact', PageBlueprint> = {
  features: {
    to: paths.features,
    label: 'Features',
    eyebrow: 'Features',
    title: 'Capability without clutter.',
    lead: 'A features page that sells the shape of the working day, with each capability anchored to a real interface view rather than a decorative icon grid.',
    meta: {
      title: 'Features — FlowPilot AI',
      description:
        'Planned features page for FlowPilot AI: daily command centre, workflow automation and focus protection. Foundation release.',
    },
    sections: [
      {
        title: 'Outcome statement',
        note: 'One paragraph naming the three things FlowPilot removes: triage, chasing, context switching.',
      },
      {
        title: 'Capability grid',
        note: 'Six capabilities in a two- or three-column grid, each with a nine-word summary and a link anchor.',
        tag: 'Component: Card',
      },
      {
        title: 'Deep-dive: Today view',
        note: 'Full-width product frame with three callouts pinned to the interface. Mobile falls back to stacked callouts.',
        tag: 'Product UI',
      },
      {
        title: 'Deep-dive: Automations',
        note: 'Before/after comparison of a manual handoff versus a FlowPilot rule. Shown as an illustrative diagram, not a claim.',
      },
      {
        title: 'Integrations band',
        note: 'Generic category chips (calendar, docs, chat, tasks) instead of fabricated partner logos.',
        tag: 'Content policy',
      },
      {
        title: 'Design principles',
        note: 'Three statements about how the product behaves — calm defaults, explicit automation, reversible actions.',
      },
      {
        title: 'FAQ + CTA',
        note: 'Six questions covering fit, data handling and switching cost, followed by the standard closing CTA.',
      },
    ],
    decisions: [
      'Decide whether integrations are shown as categories or omitted entirely.',
      'Approve the depth of product mockups on this page (two frames or three).',
    ],
  },

  pricing: {
    to: paths.pricing,
    label: 'Pricing',
    eyebrow: 'Pricing',
    title: 'Straightforward pricing.',
    lead: 'Three tiers, a working monthly/annual toggle, and copy that makes the billing terms obvious. All figures are illustrative sample data.',
    meta: {
      title: 'Pricing — FlowPilot AI',
      description:
        'Illustrative pricing for FlowPilot AI, a fictional product. Three sample tiers with a monthly and annual toggle. Foundation release.',
    },
    sections: [
      {
        title: 'Pricing intro + billing toggle',
        note: 'Headline, subline and a real segmented control. Toggle state is functional; no payment flow is connected.',
        tag: 'Interactive',
      },
      {
        title: 'Three-tier table',
        note: 'Starter, Team and Scale. Middle tier visually emphasised with one border and one badge — no colour-blocked cards.',
        tag: 'Component: Card',
      },
      {
        title: 'Included in every plan',
        note: 'Five-row strip covering security basics, data export and support expectations.',
      },
      {
        title: 'Comparison detail',
        note: 'Accessible table for feature differences, collapsing to stacked rows on mobile.',
      },
      {
        title: 'Billing and cancellation FAQ',
        note: 'Answers written for US, UK and Canadian buyers: currency, tax, notice period.',
      },
      {
        title: 'Closing CTA',
        note: 'Repeats the primary action with a secondary link to contact for larger teams.',
      },
    ],
    decisions: [
      'Confirm that all prices stay clearly labelled illustrative.',
      'Confirm currency display (USD only, or USD/GBP/CAD).',
      'Choose annual discount framing (two months free vs a percentage).',
    ],
  },

  about: {
    to: paths.about,
    label: 'About',
    eyebrow: 'About',
    title: 'Built for the work that matters.',
    lead: 'A short, credible company story for a fictional team — written as a design case study rather than pretending to be a real business.',
    meta: {
      title: 'About — FlowPilot AI',
      description:
        'About FlowPilot AI, a fictional AI product studio project: the positioning, principles and design approach behind the marketing site.',
    },
    sections: [
      {
        title: 'Mission statement',
        note: 'Two sentences on why administrative drag is the real cost of running a small team.',
      },
      {
        title: 'Origin story',
        note: 'A brief, clearly fictional narrative — labelled as a design brief rather than a company history.',
        tag: 'Content policy',
      },
      {
        title: 'Operating principles',
        note: 'Four numbered principles, each with a one-line consequence for the product.',
      },
      {
        title: 'How this site was designed',
        note: 'A short, honest methodology note: audience, positioning, design system, then composition.',
        tag: 'Meta',
      },
      {
        title: 'Team placeholders',
        note: 'Four role-based profiles with initials avatars. Names are deliberately generic and marked as placeholders.',
      },
      {
        title: 'Closing CTA',
        note: 'Invite to the contact page rather than a newsletter sign-up.',
      },
    ],
    decisions: [
      'Confirm whether the site presents itself as a case study or stays fully in character.',
      'Decide if team placeholders appear at all, or if the page closes with principles only.',
    ],
  },

  contact: {
    to: paths.contact,
    label: 'Contact',
    eyebrow: 'Contact',
    title: 'Start a conversation.',
    lead: 'A working form with real validation states and an explicit demo notice. Nothing is transmitted anywhere; the success state says so.',
    meta: {
      title: 'Contact — FlowPilot AI',
      description:
        'Contact FlowPilot AI. A demonstration contact form with client-side validation; no messages are sent.',
    },
    sections: [
      {
        title: 'Form + context panel',
        note: 'Two columns on desktop: the form, and a panel explaining what happens next and what this demo does not do.',
        tag: 'Component: Field',
      },
      {
        title: 'Form model',
        note: 'Name, work email, company, team size, topic, message, consent. Inline validation on blur, never on every keystroke.',
        tag: 'Interactive',
      },
      {
        title: 'Success state',
        note: 'Confirms what would happen and states plainly that no message was sent and no data was stored.',
        tag: 'Content policy',
      },
      {
        title: 'Alternative routes',
        note: 'Response-time expectation and a placeholder email address, shown as text until a real inbox exists.',
      },
      {
        title: 'Short FAQ',
        note: 'Three questions about trials, migration and support hours.',
      },
    ],
    decisions: [
      'Confirm whether the form stays local-only or posts to a real endpoint.',
      'Approve the consent wording before any data collection is enabled.',
    ],
  },
};
