import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardVariant = 'default' | 'muted' | 'ink' | 'brand-soft' | 'plain';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const variants: Record<CardVariant, string> = {
  default: 'border border-line bg-surface shadow-e1',
  muted: 'border border-line bg-surface-muted',
  ink: 'border border-white/10 bg-ink-900 text-fg-inverse shadow-e2',
  'brand-soft': 'border border-brand-100 bg-brand-50/70',
  plain: 'border border-transparent bg-transparent',
};

const paddings: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-7 sm:p-8',
};

type CardProps = {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  className?: string;
};

/**
 * Base surface. `interactive` adds a restrained hover lift — only use it when
 * the whole card is a link.
 */
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg',
        variants[variant],
        paddings[padding],
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-e2',
        className,
      )}
    >
      {children}
    </div>
  );
}
