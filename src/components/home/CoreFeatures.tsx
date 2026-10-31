import { useState } from 'react';
import { ArrowRight, BarChart3, CheckCircle2, LayoutGrid, MessageSquare, Zap } from 'lucide-react';
import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import { features } from '@/content/home';
import { paths } from '@/config/paths';
import { cn } from '@/lib/cn';
import { useTabKeyboardNav } from '@/lib/useTabKeyboardNav';
import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  AutomationCrop,
  BoardCrop,
  CollaborationCrop,
  InsightsCrop,
} from '@/components/product/FeatureCrops';

const crops: Record<string, ComponentType<{ className?: string }>> = {
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

/**
 * Four capabilities, one preview.
 *
 * The tab cards are the selector; pointer hover, click, focus and arrow keys
 * all change `selected`, so the preview is always the thing the reader is
 * pointing at. The panel re-mounts on change, which replays the short entrance
 * animation (and collapses to no motion under prefers-reduced-motion).
 */
export function CoreFeatures() {
  const [selected, setSelected] = useState(0);
  const { setTabRef, onKeyDown } = useTabKeyboardNav(features.length, selected, setSelected);

  const active = features[selected];
  const ActiveCrop = crops[active.key];

  return (
    <Section tone="surface" spacing="md" id="features">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="What it does"
          title={
            <>
              One workspace. <span className="text-gradient-brand">Four things it does well.</span>
            </>
          }
          description="Not a suite of ten half-finished tools. Four capabilities that share the same projects, tasks and context."
        />
        <ButtonLink to={paths.features} variant="secondary" size="sm" className="shrink-0">
          Explore all features
          <ArrowRight
            aria-hidden="true"
            className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quint)] group-hover/btn:translate-x-0.5"
          />
        </ButtonLink>
      </div>

      {/* Selector ---------------------------------------------------------- */}
      <div
        role="tablist"
        aria-label="Core features"
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature, index) => {
          const Icon = icons[feature.icon];
          const isActive = index === selected;

          return (
            <button
              key={feature.key}
              ref={setTabRef(index)}
              type="button"
              role="tab"
              id={`feature-tab-${feature.key}`}
              aria-selected={isActive}
              aria-controls="feature-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setSelected(index)}
              onMouseEnter={() => setSelected(index)}
              onFocus={() => setSelected(index)}
              onKeyDown={onKeyDown}
              className={cn(
                'group flex h-full cursor-pointer flex-col gap-3 rounded-xl border p-4 text-left',
                'transition-[transform,border-color,box-shadow,background-color] duration-[var(--duration-base)] ease-[var(--ease-out-quint)]',
                'focus-visible:outline-offset-2 hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-e2',
                isActive
                  ? 'border-brand-500/40 bg-gradient-to-b from-brand-50/80 to-surface shadow-e2'
                  : 'border-line bg-surface shadow-e1',
              )}
            >
              <span className="flex items-center justify-between">
                <span
                  className={cn(
                    'grid size-8 place-items-center rounded-md border transition-colors duration-[var(--duration-base)]',
                    isActive
                      ? 'border-brand-200 bg-brand-100/80 text-brand-700'
                      : 'border-line bg-canvas text-fg-muted group-hover:text-brand-700',
                  )}
                >
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="font-display text-caption font-semibold text-fg-subtle tabular-nums">
                  0{index + 1}
                </span>
              </span>

              <span className="block">
                <span className="block font-display text-body font-semibold text-fg">
                  {feature.title}
                </span>
                <span className="mt-1.5 line-clamp-2 text-caption text-fg-muted">
                  {feature.body}
                </span>
              </span>

              <span
                className={cn(
                  'mt-auto inline-flex items-center gap-1 pt-2 text-caption font-medium transition-opacity duration-[var(--duration-base)]',
                  isActive
                    ? 'text-brand-700 opacity-100'
                    : 'text-fg-subtle opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
                )}
              >
                Preview
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5"
                />
              </span>
            </button>
          );
        })}
      </div>

      {/* Preview ---------------------------------------------------------- */}
      <div
        id="feature-panel"
        role="tabpanel"
        aria-labelledby={`feature-tab-${active.key}`}
        className="mt-5 overflow-hidden rounded-2xl border border-line bg-canvas shadow-e2"
      >
        <div
          key={active.key}
          className="animate-view-in grid gap-0 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
        >
          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <p className="flex items-center gap-2.5 text-caption font-medium text-fg-subtle">
              <span className="font-display font-semibold text-brand-700 tabular-nums">
                0{selected + 1}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-brand-300" />
              {active.eyebrow}
            </p>

            <h3 className="mt-4 text-title-2">{active.title}</h3>
            <p className="mt-3 max-w-md text-body-sm text-fg-muted">{active.body}</p>

            <ul className="mt-6 flex flex-col gap-3">
              {active.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-body-sm text-fg-muted">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-brand-600"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-6 lg:mt-8">
              <ButtonLink to={paths.features} variant="secondary" size="sm">
                See it in the product
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quint)] group-hover/btn:translate-x-0.5"
                />
              </ButtonLink>
              <span className="text-caption text-fg-subtle">Included in every plan</span>
            </div>
          </div>

          <div className="relative border-t border-line bg-mist-100/60 p-4 sm:p-6 lg:border-t-0 lg:border-l lg:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_65%_at_70%_0%,var(--color-brand-100),transparent_72%)] opacity-80"
            />
            <div
              aria-hidden="true"
              className="bg-dot-field pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(60%_60%_at_50%_45%,black,transparent)]"
            />

            <div className="relative flex h-full flex-col justify-center">
              <ActiveCrop className="min-h-[264px] shadow-e2" />
              <p className="mt-3 text-caption text-fg-subtle">
                Illustrative interface — sample data, no live integrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
