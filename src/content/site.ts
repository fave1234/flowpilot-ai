import { paths } from '@/config/paths';

export const site = {
  name: 'FlowPilot AI',
  shortName: 'FlowPilot',
  tagline: 'Less busywork. More meaningful work.',
  description:
    'FlowPilot AI is a fictional AI productivity platform that helps small teams decide what to do next, automate the repeatable, and protect time for work that matters.',
  /** Set to true only for real deployments with a real inbox. */
  contactEmail: null as string | null,
} as const;

export type NavItem = { label: string; to: string };

export const primaryNav: NavItem[] = [
  { label: 'Features', to: paths.features },
  { label: 'Pricing', to: paths.pricing },
  { label: 'About', to: paths.about },
  { label: 'Contact', to: paths.contact },
];

/** Single source of truth for the primary conversion action. */
export const primaryCta: NavItem = { label: 'Start for free', to: paths.contact };
export const secondaryCta: NavItem = { label: 'See how it works', to: paths.features };

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Product',
    items: [
      { label: 'Features', to: paths.features },
      { label: 'Pricing', to: paths.pricing },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About', to: paths.about },
      { label: 'Contact', to: paths.contact },
    ],
  },
  {
    heading: 'Foundation',
    items: [{ label: 'Design system', to: paths.designSystem }],
  },
];
