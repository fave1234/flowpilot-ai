import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

type TextareaProps = ComponentPropsWithoutRef<'textarea'> & { invalid?: boolean };

export function Textarea({ className, invalid, rows = 5, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(
        'w-full resize-y rounded-md border bg-surface px-3.5 py-3 text-body-sm text-fg shadow-e1',
        'transition-[border-color,box-shadow] duration-[var(--duration-fast)]',
        'placeholder:text-fg-subtle',
        'focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-[3px] focus-visible:ring-brand-500/25',
        invalid
          ? 'border-danger-200 focus-visible:border-danger-600 focus-visible:ring-danger-600/20'
          : 'border-line hover:border-line-strong',
        className,
      )}
      {...props}
    />
  );
}
