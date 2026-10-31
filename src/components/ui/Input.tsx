import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

const controlStyles = cn(
  'w-full rounded-md border bg-surface text-body-sm text-fg shadow-e1',
  'transition-[border-color,box-shadow] duration-[var(--duration-fast)]',
  'placeholder:text-fg-subtle',
  'focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-[3px] focus-visible:ring-brand-500/25',
  'disabled:cursor-not-allowed disabled:bg-mist-100 disabled:text-fg-subtle',
);

type InputProps = ComponentPropsWithoutRef<'input'> & { invalid?: boolean };

export function Input({ className, invalid, ...props }: InputProps) {
  return (
    <input
      className={cn(
        controlStyles,
        'h-11 px-3.5',
        invalid
          ? 'border-danger-200 focus-visible:border-danger-600 focus-visible:ring-danger-600/20'
          : 'border-line hover:border-line-strong',
        className,
      )}
      {...props}
    />
  );
}
