import { ArrowLeft } from 'lucide-react';
import { paths } from '@/config/paths';
import { usePageMeta } from '@/lib/usePageMeta';
import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function NotFound() {
  usePageMeta({
    title: 'Page not found — FlowPilot AI',
    description: 'The page you were looking for does not exist.',
  });

  return (
    <Section spacing="lg" container="prose">
      <div className="flex flex-col items-start">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-5 text-display-2">This page took a different route.</h1>
        <p className="mt-4 text-lead text-fg-muted">
          The link may be out of date. Everything in the foundation is reachable from the homepage.
        </p>
        <ButtonLink to={paths.home} size="lg" className="mt-8">
          <ArrowLeft aria-hidden="true" />
          Back to the foundation
        </ButtonLink>
      </div>
    </Section>
  );
}
