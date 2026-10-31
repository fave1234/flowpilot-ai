import { cn } from '@/lib/cn';

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
  badge?: string;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group, e.g. "Billing period". */
  label: string;
  className?: string;
};

/**
 * Two-or-more option switch with one sliding surface.
 *
 * The indicator is transform-only (no layout animation), so the pill glides
 * even on a low-end device. Options are real buttons with `aria-pressed`, so
 * the state is announced without depending on the visual pill.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedControlProps<T>) {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'relative inline-grid rounded-full border border-line bg-mist-100 p-1 shadow-[inset_0_1px_2px_rgb(16_19_34/0.05)]',
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 left-1 rounded-full bg-surface shadow-e1 ring-1 ring-line/70 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quint)]"
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-full px-2.5 text-caption font-medium whitespace-nowrap transition-colors duration-[var(--duration-fast)] sm:px-4',
              isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
            )}
          >
            {option.label}
            {option.badge && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[0.6875rem] leading-4 font-semibold transition-colors duration-[var(--duration-fast)]',
                  isActive ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-800',
                )}
              >
                {option.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
