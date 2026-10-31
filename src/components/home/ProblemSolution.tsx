import { CheckCircle2, Layers, RefreshCw, Search } from 'lucide-react';
import { problem } from '@/content/home';
import { paths } from '@/config/paths';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const icons = { layers: Layers, refresh: RefreshCw, search: Search } as const;

export function ProblemSolution() {
  return (
    <Section reveal spacing="md">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
        <ScrollReveal>
          <Eyebrow>{problem.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-xl text-title-1">{problem.title}</h2>
          <p className="mt-5 max-w-lg text-lead text-fg-muted">{problem.lead}</p>

          <ul className="mt-9 divide-y divide-line border-y border-line">
            {problem.painPoints.map((point) => {
              const Icon = icons[point.icon as keyof typeof icons];

              return (
                <li key={point.title} className="flex gap-4 py-5">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md border border-line bg-surface text-fg-muted">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-body font-medium text-fg">{point.title}</h3>
                    <p className="mt-1 max-w-md text-body-sm text-fg-muted">{point.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={100} className="lg:sticky lg:top-24">
          <Card variant="ink" padding="lg">
            <Eyebrow tone="inverse">{problem.solution.eyebrow}</Eyebrow>
            <h3 className="mt-4 text-title-2 text-white">{problem.solution.title}</h3>

            <ul className="mt-6 flex flex-col gap-4">
              {problem.solution.points.map((point) => (
                <li key={point} className="flex gap-3 text-body-sm text-mist-300">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-halo-400"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-white/10 pt-5">
              <TextLink to={paths.features} tone="inverse">
                See how the workspace fits together
              </TextLink>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </Section>
  );
}
