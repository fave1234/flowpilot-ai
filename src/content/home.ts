/**
 * Homepage content model.
 *
 * All product data is illustrative sample content for a fictional product.
 * No customers, testimonials, benchmarks or business results are represented.
 */
import type { AccordionItem } from '@/components/ui/Accordion';

export const homeMeta = {
  title: 'FlowPilot AI — Less busywork. More meaningful work.',
  description:
    'FlowPilot AI brings projects, tasks and automations into one calm workspace for founders, freelancers and small teams. A fictional product, built as a design concept.',
};

export const hero = {
  badge: 'AI workspace for small teams',
  headline: ['Less busywork.', 'More meaningful work.'],
  lead: 'FlowPilot brings your projects, tasks and automations into one calm workspace — then plans the day around what actually moves the work forward.',
  primaryCta: 'Start for free',
  secondaryCta: 'See how it works',
  reassurance: '14-day trial · No card required · Set up in an afternoon',
};

export const trust = {
  eyebrow: 'Who it is for',
  title: 'Built for the way small teams actually work',
  description:
    'FlowPilot is designed for the people who run the work and do it — not for an operations department that does not exist.',
  items: [
    {
      icon: 'users',
      title: 'Founders & operators',
      body: 'One place for priorities, projects and follow-ups — without hiring an ops lead to hold it together.',
    },
    {
      icon: 'briefcase',
      title: 'Freelancers & studios',
      body: 'Client work, timelines and notes stay in one workspace you can hand over cleanly at the end.',
    },
    {
      icon: 'building',
      title: 'Growing teams',
      body: 'Shared context from day one, with permissions that stay understandable as the team changes.',
    },
    {
      icon: 'shield',
      title: 'Security by default',
      body: 'Role-based access, exportable data and no training on your content. Enterprise controls when you need them.',
    },
  ],
  footnote: 'Illustrative concept — no customer logos, benchmarks or real results are shown.',
} as const;

export const problem = {
  eyebrow: 'The problem',
  title: 'Most of the day disappears into work about work.',
  lead: 'Small teams do not lose time to big decisions. They lose it to the small administrative loops between them.',
  painPoints: [
    {
      icon: 'layers',
      title: 'Scattered tools',
      body: 'The brief is in a doc, the deadline in a calendar, the decision in a thread, and the actual work somewhere else.',
    },
    {
      icon: 'refresh',
      title: 'Manual busywork',
      body: 'Status updates, reminders and handoffs are copied by hand — every week, in every direction.',
    },
    {
      icon: 'search',
      title: 'Lost context',
      body: 'Yesterday’s decision is buried three tools deep, so it gets re-litigated or quietly dropped.',
    },
  ],
  solution: {
    eyebrow: 'The workspace',
    title: 'One place where the work moves forward',
    points: [
      'Projects, tasks and notes share one source of truth.',
      'Automations take the repeatable steps off your plate.',
      'A daily plan surfaces what matters next, not everything at once.',
    ],
  },
};

export const features = [
  {
    key: 'automation',
    icon: 'zap',
    eyebrow: 'Rules engine',
    title: 'Workflow automation',
    body: 'Turn repeated handoffs into rules. Every run is logged, previewable and reversible.',
    highlights: [
      'A preview of every run before it fires',
      'Full history — reverse a rule, keep the log',
      'Trigger on notes, tasks, dates or webhooks',
    ],
  },
  {
    key: 'projects',
    icon: 'board',
    eyebrow: 'Plans and boards',
    title: 'Project management',
    body: 'Plan from first brief to final handoff — lists, boards and timelines over the same work.',
    highlights: [
      'List, board and timeline on one dataset',
      'Templates for the briefs you write weekly',
      'Dependencies that stay readable at a glance',
    ],
  },
  {
    key: 'collaboration',
    icon: 'chat',
    eyebrow: 'Shared context',
    title: 'Team collaboration',
    body: 'Comments, mentions and decisions stay attached to the work instead of drifting into chat.',
    highlights: [
      'Threads that live on the task, not in chat',
      'Decisions recorded and searchable later',
      'Guest access for client-facing projects',
    ],
  },
  {
    key: 'insights',
    icon: 'chart',
    eyebrow: 'Time and trends',
    title: 'Business insights',
    body: 'See where time actually goes across projects, and which work to stop doing.',
    highlights: [
      'Planned versus completed work, weekly',
      'Time by project and by person',
      'Automation activity in the same view',
    ],
  },
] as const;

export type FeatureKey = (typeof features)[number]['key'];

export const steps = [
  {
    number: '01',
    title: 'Connect what you already use',
    body: 'Bring in your projects, documents and calendar. Nothing needs to be rebuilt on day one.',
  },
  {
    number: '02',
    title: 'Set the outcomes for the week',
    body: 'Choose the three or four results that matter. FlowPilot organises everything else around them.',
  },
  {
    number: '03',
    title: 'Review your plan each morning',
    body: 'Open one view, accept or reshape the plan, and give the rest of the day to the work itself.',
  },
];

export const pricing = {
  eyebrow: 'Pricing',
  title: 'Simple plans, no surprise line items.',
  description:
    'Start for free, add your team when the workspace earns it. All prices on this page are illustrative sample data for this concept.',
  billing: {
    label: 'Billing period',
    monthly: 'Monthly',
    annual: 'Annual',
    saving: 'Save 20%',
    hintMonthly: 'Switch to annual and save 20%.',
    hintAnnual: 'Annual billing applied — 20% off the monthly price.',
  },
  tiers: [
    {
      name: 'Starter',
      priceMonthly: 0,
      priceAnnual: 0,
      cadence: 'forever',
      description: 'For one person getting the week under control.',
      features: ['1 workspace', '3 active projects', '5 automations', '30-day history'],
      cta: 'Start for free',
      variant: 'secondary' as const,
      highlighted: false,
    },
    {
      name: 'Team',
      priceMonthly: 18,
      priceAnnual: 14,
      cadence: 'per seat / month',
      description: 'For small teams working to the same rhythm.',
      features: [
        'Unlimited projects',
        'Unlimited automations',
        'Shared views and permissions',
        '12-month history',
      ],
      cta: 'Start for free',
      variant: 'primary' as const,
      highlighted: true,
    },
    {
      name: 'Scale',
      priceMonthly: 39,
      priceAnnual: 31,
      cadence: 'per seat / month',
      description: 'For teams that need more control and support.',
      features: [
        'SSO and audit log',
        'Advanced permissions',
        'Priority support',
        'Unlimited history',
      ],
      cta: 'Talk to us',
      variant: 'secondary' as const,
      highlighted: false,
    },
  ],
  note: 'Illustrative pricing. Per seat, before tax. Cancel any time.',
};

export const faqs: AccordionItem[] = [
  {
    question: 'Who is FlowPilot designed for?',
    answer:
      'Small teams that run their own operations: founders, freelancers, studios and teams of two to twenty. It assumes you do not have a full-time operations role, and that you would rather not create one.',
  },
  {
    question: 'Do we have to migrate everything on day one?',
    answer:
      'No. Most teams start with one active project and one weekly ritual — a planning session, a client update, a handoff. The workspace grows around the work you already have.',
  },
  {
    question: 'How do automations actually work?',
    answer:
      'You write a rule: when something happens, do this next. FlowPilot shows a preview of every run, keeps a log, and lets you reverse a rule without losing the history behind it.',
  },
  {
    question: 'What happens to our data if we leave?',
    answer:
      'You can export projects, tasks, notes and automation history as standard files at any time. There is no lock-in period and no export fee.',
  },
  {
    question: 'Can we use it with clients, or is it internal only?',
    answer:
      'Both. Client-facing projects can be shared with limited permissions, so a client sees progress without seeing your team’s internal notes.',
  },
  {
    question: 'Is there a free plan?',
    answer:
      'Yes. The Starter plan is free indefinitely for one person, with three active projects and five automations. Paid plans are per seat, per month, and can be cancelled any time.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'An afternoon for a single project and a weekly planning routine. A small team usually has its first shared workspace running the same day.',
  },
];

export const finalCta = {
  title: 'Make room for the work that matters.',
  description:
    'Set up your first project this afternoon. Keep the plan, the context and the follow-ups in one place.',
  primary: 'Start for free',
  secondary: 'Explore pricing',
};
