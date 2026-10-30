import { Briefcase, Building2, ShieldCheck, Users } from 'lucide-react';
import { trust } from '@/content/home';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';

const icons = {
  users: Users,
  briefcase: Briefcase,
  building: Building2,
  shield: ShieldCheck,
} as const;

/**
 * Credibility without invented proof: audience definition, capability and
 * security posture — all generic, all labelled as an illustrative concept.
 */
export function TrustBand() {
  return (
    <Section tone="surface" spacing="md">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.55fr] lg:gap-16">
        <div>
          <Eyebrow>{trust.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-title-2">{trust.title}</h2>
          <p className="mt-4 max-w-sm text-body-sm text-fg-muted">{trust.description}</p>
        </div>

        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {trust.items.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];

            return (
              <div key={item.title} className="border-t border-line pt-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-canvas text-brand-600">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <h3 className="text-body font-medium text-fg">{item.title}</h3>
                </div>
                <p className="mt-3 text-body-sm text-fg-muted">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-10 border-t border-line pt-4 text-caption text-fg-subtle">
        {trust.footnote}
      </p>
    </Section>
  );
}
