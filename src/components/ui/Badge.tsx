import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type BadgeVariant = 'neutral' | 'brand' | 'outline' | 'inverse' | 'muted';
type BadgeSize = 'sm' | 'md';

const variants: Record<BadgeVariant, string> = {
  neutral: 'border border-line bg-surface text-fg-muted',
  muted: 'border border-transparent bg-mist-200 text-ink-600',
  brand: 'border border-brand-100 bg-brand-50 text-brand-800',
  outline: 'border border-line-strong bg-transparent text-fg-muted',
  inverse: 'border border-white/15 bg-white/[0.07] text-mist-200',
};

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[0.6875rem] leading-4 tracking-[0.01em]',
  md: 'px-2.5 py-1 text-caption',
};

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
};

/** Metadata pill. Not for actions — use Button for anything clickable. */
export function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn(
            'size-1.5 rounded-full',
            variant === 'inverse' ? 'bg-halo-400' : 'bg-brand-500',
          )}
        />
      )}
      {children}
    </span>
  );
}
