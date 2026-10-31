import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  label: ReactNode;
  className?: string;
};

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn('flex cursor-pointer items-start gap-3 text-body-sm text-fg-muted', className)}
    >
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 size-4 shrink-0 cursor-pointer rounded-[5px] border-line accent-[var(--color-brand-600)]"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
