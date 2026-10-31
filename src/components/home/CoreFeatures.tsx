import { useState } from 'react';
import { ArrowRight, BarChart3, LayoutGrid, MessageSquare, Zap } from 'lucide-react';
import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import { features, type FeatureKey } from '@/content/home';
import { paths } from '@/config/paths';
import { cn } from '@/lib/cn';
import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  AutomationCrop,
  BoardCrop,
  CollaborationCrop,
  InsightsCrop,
} from '@/components/product/FeatureCrops';

const crops: Record<FeatureKey, ComponentType> = {
  automation: AutomationCrop,
  projects: BoardCrop,
  collaboration: CollaborationCrop,
  insights: InsightsCrop,
};
const icons: Record<string, LucideIcon> = {
  zap: Zap,
  board: LayoutGrid,
  chat: MessageSquare,
  chart: BarChart3,
};

export function CoreFeatures() {
  const [active, setActive] = useState<FeatureKey>('automation');
  const selected = features.find((feature) => feature.key === active)!;
  const Crop = crops[active];

  return (
    <Section reveal tone="surface" spacing="md" id="features">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="What it does"
          title={
            <>
              One workspace. <span className="gradient-text">Four things it does well.</span>
            </>
          }
          description="Not a suite of ten half-finished tools. Four capabilities that share the same projects, tasks and context."
        />
        <ButtonLink to={paths.features} variant="secondary" size="sm" className="shrink-0">
          Explore all features <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
          role="group"
          aria-label="Feature previews"
        >
          {features.map((feature, index) => {
            const Icon = icons[feature.icon];
            const isActive = active === feature.key;
            return (
              <ScrollReveal key={feature.key} delay={index * 100}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(feature.key)}
                  onMouseEnter={() => setActive(feature.key)}
                  className={cn(
                    'group flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-violet-500/40 hover:shadow-e2 focus-visible:outline-offset-2',
                    isActive ? 'border-brand-200 bg-brand-50/70 shadow-e1' : 'border-line bg-white',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-10 shrink-0 place-items-center rounded-lg border',
                      isActive
                        ? 'border-brand-200 bg-white text-brand-600'
                        : 'border-line bg-mist-50 text-fg-muted',
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-display text-body font-semibold text-fg">
                        {feature.title}
                      </span>
                      <span className="text-xs text-fg-subtle">0{index + 1}</span>
                    </span>
                    <span className="mt-1.5 block text-body-sm text-fg-muted">{feature.body}</span>
                  </span>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
        <div className="relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-brand-100 bg-[radial-gradient(ellipse_at_top_right,#e9e4ff,transparent_60%),linear-gradient(145deg,#f9f8ff,#f2f3f8)] p-5 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold tracking-[0.12em] text-brand-600 uppercase">
              A closer look
            </span>
            <span className="rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs text-brand-700">
              Interactive preview
            </span>
          </div>
          <div key={active} className="preview-enter my-8 w-full">
            <div className="mb-5">
              <h3 className="text-title-3">{selected.title}</h3>
              <p className="mt-1 text-body-sm text-fg-muted">{selected.body}</p>
            </div>
            <Crop />
          </div>
          <p className="text-caption text-fg-subtle">
            Illustrative interface — sample data, no live integrations.
          </p>
        </div>
      </div>
    </Section>
  );
}
