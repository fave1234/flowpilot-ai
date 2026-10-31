import { useState } from 'react';
import { Check } from 'lucide-react';
import { pricing } from '@/content/home';
import { paths } from '@/config/paths';
import { cn } from '@/lib/cn';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { TextLink } from '@/components/ui/TextLink';

type BillingPeriod = 'monthly' | 'annual';

const billingOptions = [
  { value: 'monthly' as const, label: pricing.billing.monthly },
  { value: 'annual' as const, label: pricing.billing.annual, badge: pricing.billing.saving },
];

export function PricingPreview() {
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const isAnnual = billing === 'annual';

  return (
    <Section tone="surface" spacing="md" id="pricing">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-title-1">
            Simple plans, <span className="text-gradient-brand">no surprise line items.</span>
          </h2>
          <p className="mt-4 text-lead text-fg-muted">{pricing.description}</p>
          <Badge variant="outline" size="md" className="mt-5">
            Illustrative pricing
          </Badge>
        </div>

        <div className="flex flex-col items-start gap-2.5 lg:shrink-0 lg:items-end">
          <SegmentedControl
            label={pricing.billing.label}
            options={billingOptions}
            value={billing}
            onChange={setBilling}
            className="w-full sm:w-auto"
          />
          <p className="text-caption text-fg-subtle" aria-live="polite">
            {isAnnual ? pricing.billing.hintAnnual : pricing.billing.hintMonthly}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pricing.tiers.map((tier) => {
          const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;

          return (
            <Card
              key={tier.name}
              variant={tier.highlighted ? 'brand-soft' : 'default'}
              padding="lg"
              className={cn(
                'flex flex-col transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:shadow-e2',
                tier.highlighted
                  ? 'border-brand-200 shadow-e2 hover:border-brand-300'
                  : 'hover:border-line-strong',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-body font-medium text-fg">{tier.name}</h3>
                {tier.highlighted && (
                  <Badge variant="brand" size="sm">
                    Recommended
                  </Badge>
                )}
              </div>

              <div className="mt-5 flex min-h-[2.75rem] items-baseline gap-2">
                <span className="inline-flex items-baseline font-display text-[2.75rem] leading-none font-bold tracking-[-0.035em] text-fg tabular-nums">
                  <span key={billing} className="animate-price-in inline-block">
                    ${price}
                  </span>
                </span>
                <span className="text-caption text-fg-subtle">{tier.cadence}</span>
              </div>

              <p
                key={`${billing}-note`}
                className="animate-price-in mt-2 text-caption text-fg-subtle"
              >
                {price === 0
                  ? 'No card required'
                  : isAnnual
                    ? 'Billed annually · 20% off'
                    : 'Billed monthly'}
              </p>

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
          );
        })}
      </div>

      <div className="mt-7 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-caption text-fg-subtle">{pricing.note}</p>
        <TextLink to={paths.pricing}>Compare all plans</TextLink>
      </div>
    </Section>
  );
}
