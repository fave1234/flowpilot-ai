import { Check, TrendingUp } from 'lucide-react';
import { paths } from '@/config/paths';
import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ShowcaseWindow } from '@/components/product/ShowcaseWindow';

const callouts = [
  'Planned versus completed work, without a quarterly spreadsheet.',
  'Time by project and by person — including the work nobody logged.',
  'Every automation run recorded, reviewable and reversible.',
];

export function Showcase() {
  return (
    <Section tone="ink" spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
        <div className="max-w-md">
          <Eyebrow tone="inverse">A deeper look</Eyebrow>
          <h2 className="mt-4 text-title-1 text-white">
            See where the week <span className="gradient-text-inverse">actually went.</span>
          </h2>
          <p className="mt-4 text-lead text-mist-400">
            Insights bring focus time, project progress and automation activity into one quarterly
            view — so you can cut what is not working without guessing.
          </p>

          <ul className="mt-7 flex flex-col gap-3.5">
            {callouts.map((callout) => (
              <li key={callout} className="flex gap-3 text-body-sm text-mist-300">
                <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-halo-400" />
                <span>{callout}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink to={paths.features} variant="inverse">
              Explore the product
            </ButtonLink>
            <span className="flex items-center gap-1.5 text-caption text-mist-500">
              <TrendingUp aria-hidden="true" className="size-3.5" />
              Sample quarter
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <ShowcaseWindow />
        </div>
      </div>
    </Section>
  );
}
