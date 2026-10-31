import { ArrowRight, CircleDashed, Clock } from 'lucide-react';
import type { PageBlueprint } from '@/content/blueprints';
import { usePageMeta } from '@/lib/usePageMeta';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';
import { paths } from '@/config/paths';

/**
 * Interior-page placeholder used while the foundation is under review.
 * It shows the agreed composition (so structure can be approved) without
 * pretending the page is finished.
 */
export function BlueprintPage({ page }: { page: PageBlueprint }) {
  usePageMeta(page.meta);

  return (
    <Section spacing="lg">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <Badge variant="muted">Blueprint</Badge>
        </div>
        <h1 className="max-w-3xl text-display-2">{page.title}</h1>
        <p className="max-w-2xl text-lead text-fg-muted">{page.lead}</p>
      </div>

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div>
          <Card variant="muted" padding="sm" className="flex items-start gap-3">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-line bg-surface text-fg-muted">
              <Clock aria-hidden="true" className="size-3.5" />
            </span>
            <p className="text-body-sm text-fg-muted">
              <span className="font-medium text-fg">Not built yet.</span> The sections below are the
              proposed composition for this page. Content and layout are implemented once the
              foundation is signed off.
            </p>
          </Card>

          <h2 className="mt-8 text-overline font-semibold tracking-[0.14em] text-fg-subtle uppercase">
            Planned sections
          </h2>

          <ol className="mt-4 divide-y divide-line border-y border-line">
            {page.sections.map((section, index) => (
              <li key={section.title} className="flex gap-4 py-5 sm:gap-6">
                <span className="mt-0.5 font-display text-caption font-semibold text-brand-600 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-body font-medium text-fg">{section.title}</h3>
                    {section.tag && (
                      <Badge variant="outline" size="sm">
                        {section.tag}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-body-sm text-fg-muted">{section.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:sticky lg:top-24">
          <Card padding="md">
            <div className="flex items-center gap-2">
              <CircleDashed aria-hidden="true" className="size-4 text-brand-600" />
              <h2 className="text-title-3">Decisions for this page</h2>
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {(page.decisions ?? []).map((decision) => (
                <li key={decision} className="flex gap-2.5 text-body-sm text-fg-muted">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-halo-400"
                  />
                  {decision}
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-line pt-4">
              <TextLink to={paths.designSystem}>Review the design system</TextLink>
            </div>
          </Card>

          <p className="mt-4 flex items-center gap-1.5 px-1 text-caption text-fg-subtle">
            <ArrowRight aria-hidden="true" className="size-3.5" />
            Next in sequence: homepage composition
          </p>
        </aside>
      </div>
    </Section>
  );
}
