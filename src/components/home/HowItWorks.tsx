import { steps } from '@/content/home';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function HowItWorks() {
  return (
    <Section reveal spacing="md" id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        title="From scattered to settled in an afternoon."
        description="No migration project, no consultant, no six-week rollout. Three steps, and the workspace starts earning its place."
      />

      <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
        {steps.map((step, index) => (
          <ScrollReveal
            as="li"
            key={step.number}
            delay={index * 100}
            className="relative border-t border-line pt-6"
          >
            <span aria-hidden="true" className="absolute -top-px left-0 h-px w-10 bg-brand-500" />
            <span className="font-display text-caption font-semibold text-brand-600 tabular-nums">
              {step.number}
            </span>
            <h3 className="mt-3 text-title-3">{step.title}</h3>
            <p className="mt-2 text-body-sm text-fg-muted">{step.body}</p>
          </ScrollReveal>
        ))}
      </ol>
    </Section>
  );
}
