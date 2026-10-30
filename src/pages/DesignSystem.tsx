import type { ReactNode } from 'react';
import { ArrowRight, Check, CircleDashed, Info, Minus } from 'lucide-react';
import { usePageMeta } from '@/lib/usePageMeta';
import { Section } from '@/components/layout/Section';
import { AppWindow } from '@/components/product/AppWindow';
import { Badge } from '@/components/ui/Badge';
import { Button, ButtonLink, buttonStyles } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Field } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { paths } from '@/config/paths';

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

const navSections = [
  { id: 'colour', label: 'Colour' },
  { id: 'typography', label: 'Typography' },
  { id: 'space', label: 'Space & radius' },
  { id: 'elevation', label: 'Elevation' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'badges', label: 'Badges' },
  { id: 'cards', label: 'Cards' },
  { id: 'forms', label: 'Form controls' },
  { id: 'product-ui', label: 'Product UI' },
  { id: 'motion', label: 'Motion' },
  { id: 'inventory', label: 'Inventory' },
];

const families = [
  {
    name: 'Ink',
    role: 'Dark surfaces, headings, structure',
    swatches: [
      { step: '950', hex: '#080A14' },
      { step: '900', hex: '#101322', note: 'base' },
      { step: '800', hex: '#171B2D' },
      { step: '700', hex: '#222741' },
      { step: '600', hex: '#2F3550' },
      { step: '500', hex: '#444C6B' },
      { step: '400', hex: '#5B6280' },
    ],
  },
  {
    name: 'Mist',
    role: 'Canvas, borders, secondary text',
    swatches: [
      { step: '50', hex: '#FAFAFC' },
      { step: '100', hex: '#F7F7FA', note: 'canvas' },
      { step: '200', hex: '#EDEEF4' },
      { step: '300', hex: '#E1E3EC' },
      { step: '400', hex: '#CDD0DD' },
      { step: '500', hex: '#A9AEC2' },
      { step: '600', hex: '#7C8298' },
      { step: '700', hex: '#5C6379' },
    ],
  },
  {
    name: 'Brand',
    role: 'Primary action, focus, accent',
    swatches: [
      { step: '50', hex: '#F4F2FF' },
      { step: '100', hex: '#EAE7FF' },
      { step: '200', hex: '#D6D0FF' },
      { step: '300', hex: '#BCB3FF' },
      { step: '400', hex: '#9C8EFB' },
      { step: '500', hex: '#7865F5', note: 'base' },
      { step: '600', hex: '#6A56EE', note: 'CTA' },
      { step: '700', hex: '#5743DA' },
      { step: '800', hex: '#4633B0' },
      { step: '900', hex: '#2C2073' },
    ],
  },
  {
    name: 'Halo',
    role: 'Supporting accent, data marks',
    swatches: [
      { step: '100', hex: '#EEF1FF' },
      { step: '200', hex: '#DCE3FE' },
      { step: '300', hex: '#C7D2FE' },
      { step: '400', hex: '#A5B4FC', note: 'base' },
      { step: '500', hex: '#8B9BF8' },
    ],
  },
];

const semanticTokens = [
  { name: 'Canvas', token: 'bg-canvas', hex: '#F7F7FA', note: 'Page background' },
  { name: 'Surface', token: 'bg-surface', hex: '#FFFFFF', note: 'Cards, inputs, panels' },
  { name: 'Muted surface', token: 'bg-surface-muted', hex: '#FAFAFC', note: 'Alternating bands' },
  { name: 'Line', token: 'border-line', hex: '#E5E7EF', note: 'Default hairline border' },
  {
    name: 'Line strong',
    token: 'border-line-strong',
    hex: '#D5D8E4',
    note: 'Hover / active border',
  },
  { name: 'Text', token: 'text-fg', hex: '#171827', note: '16.4:1 on canvas' },
  { name: 'Text muted', token: 'text-fg-muted', hex: '#5C6379', note: '5.6:1 on canvas' },
  { name: 'Text subtle', token: 'text-fg-subtle', hex: '#666C80', note: '4.9:1 on canvas' },
  { name: 'Brand', token: 'bg-brand-500', hex: '#7865F5', note: 'Graphics & large text only' },
  { name: 'Brand CTA', token: 'bg-brand-600', hex: '#6A56EE', note: '5.0:1 with white text' },
  { name: 'Halo', token: 'bg-halo-400', hex: '#A5B4FC', note: 'Data marks, illustration' },
  { name: 'Danger', token: 'text-danger-700', hex: '#A12C3C', note: 'Errors, 7.1:1 on white' },
];

const typeSpecimens = [
  {
    name: 'display-1',
    sample: 'Less busywork.',
    className: 'text-display-1',
    spec: '44 → 72px · 1.02 · −3.5% · Manrope 700',
  },
  {
    name: 'display-2',
    sample: 'More meaningful work.',
    className: 'text-display-2',
    spec: '36 → 56px · 1.05 · −3.2% · Manrope 700',
  },
  {
    name: 'title-1',
    sample: 'A daily plan you can trust',
    className: 'text-title-1',
    spec: '30 → 44px · 1.10 · −2.8% · Manrope 700',
  },
  {
    name: 'title-2',
    sample: 'Automate the repeatable',
    className: 'text-title-2',
    spec: '24 → 30px · 1.20 · −2.2% · Manrope 650',
  },
  {
    name: 'title-3',
    sample: 'Protect your focus time',
    className: 'text-title-3',
    spec: '20px · 1.35 · −1.5% · Manrope 600',
  },
  {
    name: 'lead',
    sample: 'One sentence that frames the section without overselling it.',
    className: 'text-lead text-fg-muted',
    spec: '17 → 19px · 1.65 · Inter 400',
  },
  {
    name: 'body',
    sample: 'Body copy runs at a comfortable 16px with a 1.65 line height.',
    className: 'text-body',
    spec: '16px · 1.65 · Inter 400',
  },
  {
    name: 'body-sm',
    sample: 'Interface copy, navigation and dense supporting text.',
    className: 'text-body-sm',
    spec: '15px · 1.60 · Inter 400',
  },
  {
    name: 'caption',
    sample: 'Captions, metadata and form guidance.',
    className: 'text-caption text-fg-subtle',
    spec: '13px · 1.50 · Inter 400',
  },
  {
    name: 'overline',
    sample: 'Section label',
    className: 'text-overline uppercase text-brand-700',
    spec: '12px · +14% · Inter 600',
  },
];

const spacingSteps = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];
const radiusSteps = [
  { name: 'xs', value: '6px', className: 'rounded-xs' },
  { name: 'sm', value: '8px', className: 'rounded-sm' },
  { name: 'md', value: '10px', className: 'rounded-md' },
  { name: 'lg', value: '14px', className: 'rounded-lg' },
  { name: 'xl', value: '18px', className: 'rounded-xl' },
  { name: '2xl', value: '24px', className: 'rounded-2xl' },
  { name: '3xl', value: '32px', className: 'rounded-3xl' },
];
const elevationSteps = [
  { name: 'shadow-e1', note: 'Controls, cards at rest' },
  { name: 'shadow-e2', note: 'Hover, dropdowns' },
  { name: 'shadow-e3', note: 'Sheets, popovers' },
  { name: 'shadow-frame', note: 'Product mockup frames' },
];

const inventory = {
  built: [
    'Container / Section / grid rhythm',
    'Button & ButtonLink (5 variants × 3 sizes)',
    'Badge, Card, Eyebrow, SectionHeading',
    'Field, Input, Textarea, Select, Checkbox',
    'Accordion, TextLink, Logo',
    'Sticky header + mobile navigation',
    'Footer, 404, SEO helper',
    'Product frame illustration',
  ],
  planned: [
    'Segmented toggle (pricing cadence)',
    'Comparison table (responsive)',
    'Testimonial-free proof band',
    'Section reveal on scroll',
    'Toast / inline form status',
    'Breadcrumbs',
  ],
};

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export function DesignSystem() {
  usePageMeta({
    title: 'Design system — FlowPilot AI',
    description:
      'The FlowPilot AI design system: colour, typography, spacing, elevation, components and product mockup language.',
  });

  return (
    <>
      <Section spacing="md">
        <Eyebrow>Foundation</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-display-2">The design system.</h1>
        <p className="mt-5 max-w-2xl text-lead text-fg-muted">
          A living reference for every token and component in the marketing site. It is built from
          the same code the pages use — nothing here is a static picture of the system.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="brand" size="md">
            v0.1
          </Badge>
          <Badge variant="outline" size="md">
            Tokens in src/styles/tokens.css
          </Badge>
          <Badge variant="outline" size="md">
            Tailwind CSS v4
          </Badge>
        </div>
      </Section>

      <div className="border-t border-line">
        <Section spacing="md">
          <div className="grid gap-12 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-overline font-semibold tracking-[0.14em] text-fg-subtle uppercase">
                  On this page
                </p>
                <nav aria-label="Design system sections" className="mt-4">
                  <ul className="flex flex-col gap-0.5">
                    {navSections.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="-mx-2 block rounded-sm px-2 py-1.5 text-body-sm text-fg-muted transition-colors hover:bg-mist-200/60 hover:text-fg"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-6 rounded-md border border-line bg-surface-muted p-3">
                  <p className="text-caption text-fg-subtle">
                    Change a token once and every page updates. No hard-coded hex values in
                    components.
                  </p>
                </div>
              </div>
            </aside>

            <div className="flex min-w-0 flex-col gap-16">
              {/* -------------------------------------------------------- Colour */}
              <Block
                id="colour"
                eyebrow="01 · Colour"
                title="Deep ink, quiet neutrals, one electric accent"
                description="Navy carries structure and dark bands. Neutrals do the everyday work so violet can stay scarce — it marks the single most important action on a screen."
              >
                <div className="flex flex-col gap-7">
                  {families.map((family) => (
                    <div key={family.name}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-body font-medium text-fg">{family.name}</h3>
                        <p className="text-caption text-fg-subtle">{family.role}</p>
                      </div>
                      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-10">
                        {family.swatches.map((swatch) => (
                          <div key={swatch.step}>
                            <div
                              className="h-12 rounded-sm border border-ink-900/[0.06]"
                              style={{ backgroundColor: swatch.hex }}
                            />
                            <p className="mt-1.5 text-[11px] leading-tight font-medium text-fg">
                              {swatch.step}
                              {swatch.note && (
                                <span className="ml-1 font-normal text-fg-subtle">
                                  {swatch.note}
                                </span>
                              )}
                            </p>
                            <p className="font-mono text-[10px] text-fg-subtle">{swatch.hex}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="mt-10 text-body font-medium text-fg">Semantic tokens</h3>
                <div className="mt-3 overflow-hidden rounded-lg border border-line">
                  {semanticTokens.map((token, index) => (
                    <div
                      key={token.token}
                      className={`flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 ${
                        index > 0 ? 'border-t border-line' : ''
                      }`}
                    >
                      <span
                        className="size-5 shrink-0 rounded-[5px] border border-ink-900/10"
                        style={{ backgroundColor: token.hex }}
                      />
                      <span className="w-32 text-body-sm font-medium text-fg">{token.name}</span>
                      <code className="font-mono text-[11px] text-brand-700">{token.token}</code>
                      <span className="ml-auto text-caption text-fg-subtle">{token.note}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 flex items-start gap-2 text-caption text-fg-subtle">
                  <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                  Contrast ratios are measured against the canvas. Brand&nbsp;500 only carries small
                  text inside the illustrative product frame.
                </p>
              </Block>

              {/* ---------------------------------------------------- Typography */}
              <Block
                id="typography"
                eyebrow="02 · Typography"
                title="Manrope for voice, Inter for utility"
                description="Display type is set tight and dark so it reads as one confident statement. Interface type stays neutral and roomy. Sizes are fluid between 480px and 1280px."
              >
                <div className="divide-y divide-line border-y border-line">
                  {typeSpecimens.map((specimen) => (
                    <div
                      key={specimen.name}
                      className="grid gap-2 py-5 sm:grid-cols-[minmax(0,1fr)_13rem] sm:items-baseline sm:gap-8"
                    >
                      <p className={`${specimen.className} min-w-0 break-words`}>
                        {specimen.sample}
                      </p>
                      <div className="sm:text-right">
                        <p className="font-mono text-[11px] text-brand-700">{specimen.name}</p>
                        <p className="text-caption text-fg-subtle">{specimen.spec}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Block>

              {/* --------------------------------------------------------- Space */}
              <Block
                id="space"
                eyebrow="03 · Space & radius"
                title="A 4px scale with generous section rhythm"
                description="Sections breathe at 64–144px vertically. Components stick to the 4px step, so alignment is automatic rather than eyeballed."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Card variant="muted" padding="md">
                    <p className="text-body-sm font-medium text-fg">Control heights</p>
                    <ul className="mt-3 flex flex-col gap-2 text-body-sm text-fg-muted">
                      <li className="flex justify-between gap-4">
                        <span>Small</span>
                        <span className="tabular-nums">36px</span>
                      </li>
                      <li className="flex justify-between gap-4">
                        <span>Medium</span>
                        <span className="tabular-nums">44px</span>
                      </li>
                      <li className="flex justify-between gap-4">
                        <span>Large</span>
                        <span className="tabular-nums">48px</span>
                      </li>
                    </ul>
                  </Card>
                  <Card variant="muted" padding="md">
                    <p className="text-body-sm font-medium text-fg">Containers</p>
                    <ul className="mt-3 flex flex-col gap-2 text-body-sm text-fg-muted">
                      <li className="flex justify-between gap-4">
                        <span>Content</span>
                        <span className="tabular-nums">1200px</span>
                      </li>
                      <li className="flex justify-between gap-4">
                        <span>Wide</span>
                        <span className="tabular-nums">1344px</span>
                      </li>
                      <li className="flex justify-between gap-4">
                        <span>Prose</span>
                        <span className="tabular-nums">704px</span>
                      </li>
                    </ul>
                  </Card>
                </div>

                <p className="mt-7 text-overline font-semibold tracking-[0.14em] text-fg-subtle uppercase">
                  Spacing scale
                </p>
                <div className="mt-3 flex flex-wrap items-end gap-3">
                  {spacingSteps.map((step) => (
                    <div key={step} className="flex flex-col items-center gap-1.5">
                      <div
                        className="rounded-[3px] bg-brand-200"
                        style={{ width: step, height: step, maxHeight: 96 }}
                      />
                      <span className="text-[10px] text-fg-subtle tabular-nums">{step}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-7 text-overline font-semibold tracking-[0.14em] text-fg-subtle uppercase">
                  Radius
                </p>
                <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                  {radiusSteps.map((radius) => (
                    <div key={radius.name}>
                      <div
                        className={`grid h-16 place-items-center border border-line bg-surface shadow-e1 ${radius.className}`}
                      >
                        <span className="text-caption text-fg-subtle">{radius.value}</span>
                      </div>
                      <p className="mt-1.5 font-mono text-[10px] text-fg-subtle">{radius.name}</p>
                    </div>
                  ))}
                </div>
              </Block>

              {/* ----------------------------------------------------- Elevation */}
              <Block
                id="elevation"
                eyebrow="04 · Elevation"
                title="Borders first, shadows second"
                description="Every surface has a hairline border. Shadows are low-alpha ink, used only to describe depth — never as decoration."
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  {elevationSteps.map((step) => (
                    <div
                      key={step.name}
                      className={`rounded-lg border border-line bg-surface p-5 ${step.name}`}
                    >
                      <p className="font-mono text-[11px] text-brand-700">{step.name}</p>
                      <p className="mt-1 text-caption text-fg-subtle">{step.note}</p>
                    </div>
                  ))}
                </div>
              </Block>

              {/* ------------------------------------------------------- Buttons */}
              <Block
                id="buttons"
                eyebrow="05 · Actions"
                title="One primary action per screen"
                description="Violet is reserved for the action that matters. Secondary buttons carry a border, ghost buttons carry none. Focus rings are always visible against the band behind them."
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">
                    Primary action
                    <ArrowRight aria-hidden="true" />
                  </Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="dark">Dark</Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button size="sm">Small · 36px</Button>
                  <Button size="md">Medium · 44px</Button>
                  <Button size="lg">Large · 48px</Button>
                  <Button size="sm" variant="secondary">
                    <Check aria-hidden="true" />
                    With icon
                  </Button>
                </div>

                <div className="mt-6 rounded-lg bg-ink-900 p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary">Primary on ink</Button>
                    <Button variant="inverse">Inverse</Button>
                    <ButtonLink to={paths.contact} variant="inverse">
                      Link button
                      <ArrowRight aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <a
                    href={paths.pricing}
                    className={buttonStyles({ variant: 'secondary', size: 'sm' })}
                  >
                    Styled native link
                  </a>
                  <span className="text-caption text-fg-subtle">
                    `buttonStyles()` exports the same treatment for anchors and router links.
                  </span>
                </div>
              </Block>

              {/* -------------------------------------------------------- Badges */}
              <Block
                id="badges"
                eyebrow="06 · Metadata"
                title="Badges label, they do not act"
                description="Pills are for state, category and version metadata. Anything clickable is a button."
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="neutral">Neutral</Badge>
                  <Badge variant="muted">Muted</Badge>
                  <Badge variant="brand" dot>
                    Brand
                  </Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="neutral" size="md">
                    Medium size
                  </Badge>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2.5 rounded-lg bg-ink-900 p-4">
                  <Badge variant="inverse" dot>
                    On ink
                  </Badge>
                  <Badge variant="inverse">Illustrative</Badge>
                </div>
              </Block>

              {/* --------------------------------------------------------- Cards */}
              <Block
                id="cards"
                eyebrow="07 · Surfaces"
                title="Calm containers, one hover behaviour"
                description="Cards use a 14px radius, a hairline border and the smallest useful shadow. Only cards that are entirely a link lift on hover."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card padding="md">
                    <p className="text-overline font-semibold tracking-[0.14em] text-fg-subtle uppercase">
                      Default
                    </p>
                    <h3 className="mt-2 text-title-3">A plan you can revisit</h3>
                    <p className="mt-2 text-body-sm text-fg-muted">
                      White surface on the off-white canvas. The workhorse card for feature and
                      content blocks.
                    </p>
                  </Card>
                  <Card variant="muted" padding="md">
                    <p className="text-overline font-semibold tracking-[0.14em] text-fg-subtle uppercase">
                      Muted
                    </p>
                    <h3 className="mt-2 text-title-3">Quiet callouts</h3>
                    <p className="mt-2 text-body-sm text-fg-muted">
                      Recedes slightly. Used for notes, captions and secondary information.
                    </p>
                  </Card>
                  <Card variant="ink" padding="md">
                    <p className="text-overline font-semibold tracking-[0.14em] text-mist-500 uppercase">
                      Ink
                    </p>
                    <h3 className="mt-2 text-title-3 text-white">Contrast moments</h3>
                    <p className="mt-2 text-body-sm text-mist-400">
                      For pricing emphasis or a closing statement. Never inside another card.
                    </p>
                  </Card>
                  <Card variant="brand-soft" padding="md">
                    <p className="text-overline font-semibold tracking-[0.14em] text-brand-700 uppercase">
                      Brand soft
                    </p>
                    <h3 className="mt-2 text-title-3">Tinted emphasis</h3>
                    <p className="mt-2 text-body-sm text-fg-muted">
                      A restrained violet tint for the one highlighted tier or suggestion.
                    </p>
                  </Card>
                </div>
              </Block>

              {/* --------------------------------------------------------- Forms */}
              <Block
                id="forms"
                eyebrow="08 · Forms"
                title="Labels above, guidance below"
                description="Every control has a persistent visible label, a 44px hit area and an explicit error message wired with aria-describedby."
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Work email" hint="We reply within two working days.">
                    {(control) => <Input type="email" placeholder="you@company.com" {...control} />}
                  </Field>
                  <Field label="Work email" error="Enter a valid email address." optional>
                    {(control) => <Input type="email" defaultValue="not-an-email" {...control} />}
                  </Field>
                  <Field label="Team size" optional>
                    {(control) => (
                      <Select {...control}>
                        <option>Just me</option>
                        <option>2 – 5 people</option>
                        <option>6 – 20 people</option>
                        <option>21+ people</option>
                      </Select>
                    )}
                  </Field>
                  <Field label="Company" hint="Disabled state shown for completeness.">
                    {(control) => <Input defaultValue="Studio North" disabled {...control} />}
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="What are you trying to fix?">
                      {(control) => (
                        <Textarea
                          placeholder="A short description is plenty."
                          rows={4}
                          {...control}
                        />
                      )}
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Checkbox
                      id="consent-demo"
                      label="I understand this is a demonstration form and that no message will be sent."
                    />
                  </div>
                </div>
              </Block>

              {/* ---------------------------------------------------- Product UI */}
              <Block
                id="product-ui"
                eyebrow="09 · Product language"
                title="Mockups built from the same tokens"
                description="Interface frames are DOM, not screenshots: they stay sharp at any size, respect the type system and can be cropped per section. They are decorative — no working controls, always captioned."
              >
                <div className="rounded-xl border border-line bg-mist-200/60 p-4 sm:p-6">
                  <AppWindow />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: 'Half-panel crops',
                      note: 'Show one region of the interface per section instead of repeating the whole app.',
                    },
                    {
                      title: 'Never shrink to illegible',
                      note: 'Below 12px, replace detail with abstract rows rather than asking users to squint.',
                    },
                    {
                      title: 'Always captioned',
                      note: 'Every frame carries an “illustrative” label. Nothing implies live data or real AI.',
                    },
                  ].map((rule) => (
                    <div key={rule.title} className="border-t border-line pt-3">
                      <p className="text-body-sm font-medium text-fg">{rule.title}</p>
                      <p className="mt-1 text-caption text-fg-muted">{rule.note}</p>
                    </div>
                  ))}
                </div>
              </Block>

              {/* --------------------------------------------------------- Motion */}
              <Block
                id="motion"
                eyebrow="10 · Motion"
                title="Short, eased, and never in the way"
                description="Motion confirms an interaction; it does not perform. Everything collapses to near-zero duration when the user prefers reduced motion."
              >
                <div className="divide-y divide-line border-y border-line">
                  {[
                    ['fast', '140ms', 'Hover, focus, colour changes'],
                    ['base', '220ms', 'Buttons, card lift, menu panel'],
                    ['slow', '420ms', 'Page-level reveals (planned)'],
                  ].map(([name, duration, use]) => (
                    <div
                      key={name}
                      className="grid gap-1 py-3.5 sm:grid-cols-[7rem_6rem_1fr] sm:items-center sm:gap-4"
                    >
                      <code className="font-mono text-[11px] text-brand-700">{name}</code>
                      <span className="text-body-sm text-fg tabular-nums">{duration}</span>
                      <span className="text-caption text-fg-subtle">{use}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-caption text-fg-subtle">
                  Easing: <code className="font-mono">cubic-bezier(0.22, 1, 0.36, 1)</code> —
                  exponential ease-out, no overshoot.
                </p>
              </Block>

              {/* ------------------------------------------------------ Inventory */}
              <Block
                id="inventory"
                eyebrow="11 · Inventory"
                title="What exists today"
                description="A component only counts as part of the system once it is in this list, styled from tokens and used on a page."
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Check aria-hidden="true" className="size-4 text-brand-600" />
                      <h3 className="text-body font-medium text-fg">Built</h3>
                    </div>
                    <ul className="mt-3 flex flex-col gap-2">
                      {inventory.built.map((item) => (
                        <li key={item} className="flex gap-2.5 text-body-sm text-fg-muted">
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 size-3.5 shrink-0 text-fg-subtle"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CircleDashed aria-hidden="true" className="size-4 text-fg-subtle" />
                      <h3 className="text-body font-medium text-fg">Planned</h3>
                    </div>
                    <ul className="mt-3 flex flex-col gap-2">
                      {inventory.planned.map((item) => (
                        <li key={item} className="flex gap-2.5 text-body-sm text-fg-muted">
                          <Minus
                            aria-hidden="true"
                            className="mt-0.5 size-3.5 shrink-0 text-fg-subtle"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Block>

              <div className="flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-body-sm text-fg-muted">
                  Questions on the system become changes here first, then on the pages.
                </p>
                <ButtonLink to={paths.home} variant="secondary">
                  Back to the foundation
                </ButtonLink>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Local layout helpers                                                        */
/* -------------------------------------------------------------------------- */

function Block({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-6 border-b border-line pb-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-title-2">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-body-sm text-fg-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}
