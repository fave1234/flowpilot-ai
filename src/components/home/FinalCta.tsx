import { ArrowRight } from 'lucide-react';
import { finalCta } from '@/content/home';
import { primaryCta } from '@/content/site';
import { paths } from '@/config/paths';
import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function FinalCta() {
  return (
    <Section reveal tone="ink" spacing="lg">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Eyebrow tone="inverse" rule={false} className="justify-center">
          Ready when you are
        </Eyebrow>
        <h2 className="mt-5 text-display-2 text-white">
          Make room for <span className="gradient-text-inverse">the work that matters.</span>
        </h2>
        <p className="mt-4 max-w-xl text-lead text-mist-400">{finalCta.description}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink to={primaryCta.to} size="lg">
            {finalCta.primary}
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to={paths.pricing} variant="inverse" size="lg">
            {finalCta.secondary}
          </ButtonLink>
        </div>

        <p className="mt-5 text-caption text-mist-500">
          14-day trial · No card required · Cancel any time
        </p>
      </div>
    </Section>
  );
}
