import { ArrowRight, BarChart3, LayoutGrid, MessageSquare, Zap } from 'lucide-react';
import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import { features } from '@/content/home';
import { paths } from '@/config/paths';
import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  AutomationCrop,
  BoardCrop,
  CollaborationCrop,
  InsightsCrop,
} from '@/components/product/FeatureCrops';

const crops: Record<string, ComponentType> = {
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
  return (
    <Section tone="surface" spacing="md" id="features">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="What it does"
          title="One workspace. Four things it does well."
          description="Not a suite of ten half-finished tools. Four capabilities that share the same projects, tasks and context."
        />
        <ButtonLink to={paths.features} variant="secondary" size="sm" className="shrink-0">
          Explore all features
          <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-7">
        {features.map((feature) => {
          const Crop = crops[feature.key];
          const Icon = icons[feature.icon];

          return (
            <Card key={feature.key} padding="none" className="flex flex-col overflow-hidden">
              <div className="border-b border-line bg-mist-100/70 p-4 sm:p-5">
                <Crop />
                <p className="mt-3 text-caption text-fg-subtle">
                  Illustrative interface — sample data, no live integrations.
                </p>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-canvas text-brand-600">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <h3 className="text-title-3">{feature.title}</h3>
                </div>
                <p className="mt-3 text-body-sm text-fg-muted">{feature.body}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
