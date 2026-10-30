import { Link } from 'react-router-dom';
import { ArrowRight, Check, CircleDashed, Layers, Sparkles } from 'lucide-react';
import { paths } from '@/config/paths';
import { pageBlueprints } from '@/content/blueprints';
import { usePageMeta } from '@/lib/usePageMeta';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink, buttonStyles } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

const palette = [
  { name: 'Ink navy', hex: '#101322', className: 'bg-ink-900' },
  { name: 'Off-white', hex: '#F7F7FA', className: 'bg-mist-100 border border-line' },
  { name: 'Electric violet', hex: '#7865F5', className: 'bg-brand-500' },
  { name: 'Soft blue', hex: '#A5B4FC', className: 'bg-halo-400' },
];

const coverage = [
  'Buttons & links',
  'Cards & badges',
  'Form controls',
  'Product frames',
  'Responsive shell',
];

const status = [
  {
    icon: Check,
    label: 'Decided',
    title: 'The system',
    items: [
      'Positioning and content rules',
      'Colour, type, space and motion tokens',
      'Component API for all five pages',
    ],
  },
  {
    icon: Layers,
    label: 'Built',
    title: 'The foundation',
    items: [
      'Responsive header, footer and routing',
      'Design system reference page',
      'Illustrative product mockup language',
    ],
  },
  {
    icon: CircleDashed,
    label: 'Pending',
    title: 'The composition',
    items: [
      'Homepage sections and product crop',
      'Features, pricing, about and contact',
      'Contact form behaviour review',
    ],
    pending: true,
  },
];

const pageMap = [
  pageBlueprints.home,
  pageBlueprints.features,
  pageBlueprints.pricing,
  pageBlueprints.about,
  pageBlueprints.contact,
];

const decisions = [
  'Frontend stack: Vite + React + TypeScript + Tailwind.',
  'Type pairing: Manrope for display, Inter for interface.',
  'Primary CTA: “Start free” routes to the contact form.',
  'Product mockups stay labelled illustrative, with no invented proof.',
];

export function Home() {
  usePageMeta(pageBlueprints.home.meta);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <Section spacing="lg">
        <Badge variant="brand" dot size="md">
          Foundation release · v0.1
        </Badge>

        <h1 className="mt-6 max-w-4xl text-display-1">
          Less busywork.
          <br />
          More meaningful work<span className="text-brand-600">.</span>
        </h1>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <p className="max-w-xl text-lead text-fg-muted">
              FlowPilot AI is a fictional AI productivity platform for founders, freelancers and
              small teams. This build is the marketing foundation — strategy, architecture, design
              system and a responsive shell. The homepage composition comes next, on your approval.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink to={paths.designSystem} size="lg">
                Explore the design system
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <a href="#page-map" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                See the page plan
              </a>
            </div>

            <dl className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-caption">
              {[
                ['Audience', 'Founders & small teams'],
                ['Market', 'US · UK · Canada'],
                ['Type', 'Manrope + Inter'],
              ].map(([term, value]) => (
                <div key={term} className="flex items-center gap-2">
                  <dt className="text-fg-subtle">{term}</dt>
                  <dd className="font-medium text-fg-muted">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Foundation snapshot — a working preview of the design language */}
          <Card padding="none" className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2">
                <Sparkles aria-hidden="true" className="size-4 text-brand-600" />
                <span className="text-body-sm font-medium text-fg">Design language</span>
              </div>
              <Badge variant="outline" size="sm">
                Tokens live
              </Badge>
            </div>

            <div className="px-5 py-5">
              <p className="text-overline font-semibold tracking-[0.14em] text-fg-subtle uppercase">
                Palette
              </p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {palette.map((swatch) => (
                  <div key={swatch.name}>
                    <div className={`h-11 rounded-sm ${swatch.className}`} />
                    <p className="mt-1.5 text-[11px] leading-tight font-medium text-fg">
                      {swatch.name}
                    </p>
                    <p className="font-mono text-[10px] text-fg-subtle">{swatch.hex}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] items-center gap-5 border-t border-line px-5 py-5">
              <p className="font-display text-[3.25rem] leading-none font-bold tracking-[-0.04em] text-fg">
                Aa
              </p>
              <div>
                <p className="text-body-sm font-medium text-fg">Manrope · display</p>
                <p className="text-body-sm text-fg-muted">Inter · interface</p>
                <p className="mt-1 text-caption text-fg-subtle">
                  Fluid scale, −3% tracking at display sizes.
                </p>
              </div>
            </div>

            <div className="border-t border-line px-5 py-4">
              <p className="text-overline font-semibold tracking-[0.14em] text-fg-subtle uppercase">
                Component coverage
              </p>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {coverage.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-caption text-fg-muted">
                    <Check aria-hidden="true" className="size-3.5 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      {/* -------------------------------------------------------------- Status */}
      <Section tone="surface" spacing="md" id="status">
        <SectionHeading
          eyebrow="Where we are"
          title="Foundation first. Composition second."
          description="A marketing site only works when the system underneath it is decided. This release locks that system, so the five pages can be composed quickly and consistently."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {status.map(({ icon: Icon, label, title, items, pending }) => (
            <Card key={label} padding="lg" className="flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-9 place-items-center rounded-md border border-line bg-canvas text-brand-600">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <Badge variant={pending ? 'outline' : 'muted'} size="sm">
                  {label}
                </Badge>
              </div>
              <h3 className="mt-5 text-title-3">{title}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-body-sm text-fg-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1 shrink-0 rounded-full bg-mist-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Page map */}
      <Section spacing="md" id="page-map">
        <SectionHeading
          eyebrow="Page structure"
          title="Five pages, one system."
          description="Every page shares the same grid, section rhythm and component vocabulary. Open any blueprint to see the planned composition and the decisions attached to it."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pageMap.map((page, index) => (
            <Link key={page.to} to={page.to} className="group block h-full">
              <Card interactive padding="lg" className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-display text-caption font-semibold text-brand-600 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 text-fg-subtle transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quint)] group-hover:translate-x-0.5"
                  />
                </div>
                <h3 className="mt-4 text-title-3">{page.label}</h3>
                <p className="mt-2 text-body-sm text-fg-muted">{page.lead}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {page.sections.slice(0, 3).map((section) => (
                    <Badge key={section.title} variant="muted" size="sm">
                      {section.title.split(/[—:]/)[0].trim()}
                    </Badge>
                  ))}
                  <Badge variant="outline" size="sm">
                    +{page.sections.length - 3}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}

          <Link to={paths.designSystem} className="group block h-full">
            <Card interactive padding="lg" variant="brand-soft" className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="font-display text-caption font-semibold text-brand-700 tabular-nums">
                  06
                </span>
                <Sparkles aria-hidden="true" className="size-4 text-brand-600" />
              </div>
              <h3 className="mt-4 text-title-3">Design system</h3>
              <p className="mt-2 text-body-sm text-fg-muted">
                The living reference: tokens, type scale, components, form states and the product
                mockup language.
              </p>
              <p className="mt-auto pt-5 text-caption font-medium text-brand-700">
                Open reference →
              </p>
            </Card>
          </Link>
        </div>
      </Section>

      {/* ----------------------------------------------------------- Approval */}
      <Section tone="ink" spacing="lg">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            tone="inverse"
            eyebrow="Approval"
            title="Ready for your review."
            description="The homepage is intentionally not built yet. Confirm the foundation below and the composition starts immediately — section by section, with the same content rules."
          />

          <div>
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {decisions.map((decision, index) => (
                <li key={decision} className="flex items-start gap-4 py-4">
                  <span className="mt-0.5 font-display text-caption font-semibold text-halo-400 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-body-sm text-mist-300">{decision}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to={paths.designSystem} size="lg">
                Review the design system
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to={paths.features} variant="inverse" size="lg">
                Open a page blueprint
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
