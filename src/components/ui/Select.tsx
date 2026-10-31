import type { ComponentPropsWithoutRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

type SelectProps = ComponentPropsWithoutRef<'select'> & { invalid?: boolean };

export function Select({ className, invalid, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          'h-11 w-full appearance-none rounded-md border bg-surface pr-10 pl-3.5 text-body-sm text-fg shadow-e1',
          'transition-[border-color,box-shadow] duration-[var(--duration-fast)]',
          'focus-visible:border-brand-400 focus-visible:ring-[3px] focus-visible:ring-brand-500/25 focus-visible:outline-none',
          invalid
            ? 'border-danger-200 focus-visible:border-danger-600 focus-visible:ring-danger-600/20'
            : 'border-line hover:border-line-strong',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-fg-subtle"
      />
    </div>
  );
}
