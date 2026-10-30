import { Check } from 'lucide-react';
import { pricing } from '@/content/home';
import { paths } from '@/config/paths';
import { cn } from '@/lib/cn';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';

export function PricingPreview() {
  return (
    <Section tone="surface" spacing="md" id="pricing">
      <div className="max-w-2xl">
        <Eyebrow>{pricing.eyebrow}</Eyebrow>
        <h2 className="mt-4 text-title-1">{pricing.title}</h2>
        <p className="mt-4 text-lead text-fg-muted">{pricing.description}</p>
        <Badge variant="outline" size="md" className="mt-5">
          Illustrative pricing
        </Badge>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pricing.tiers.map((tier) => (
          <Card
            key={tier.name}
            variant={tier.highlighted ? 'brand-soft' : 'default'}
            padding="lg"
            className={cn('flex flex-col', tier.highlighted && 'border-brand-200 shadow-e2')}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-body font-medium text-fg">{tier.name}</h3>
              {tier.highlighted && (
                <Badge variant="brand" size="sm">
                  Recommended
                </Badge>
              )}
            </div>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-[2.75rem] leading-none font-bold tracking-[-0.035em] text-fg">
                {tier.price}
              </span>
              <span className="text-caption text-fg-subtle">{tier.cadence}</span>
            </div>

            <p className="mt-3 text-body-sm text-fg-muted">{tier.description}</p>

            <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-line pt-6">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-body-sm text-fg-muted">
                  <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand-600" />
                  {feature}
                </li>
              ))}
            </ul>

            <ButtonLink to={paths.contact} variant={tier.variant} fullWidth className="mt-7">
              {tier.cta}
            </ButtonLink>
          </Card>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-caption text-fg-subtle">{pricing.note}</p>
        <TextLink to={paths.pricing}>Compare all plans</TextLink>
      </div>
    </Section>
  );
}
