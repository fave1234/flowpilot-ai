import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type FieldControlProps = {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
};

type FieldProps = {
  label: string;
  children: (control: FieldControlProps) => ReactNode;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  className?: string;
};

/**
 * Label + control + help/error text with correctly wired `htmlFor` and
 * `aria-describedby`. Uses a render prop so no `cloneElement` is needed.
 *
 * <Field label="Work email" hint="Work address only.">
 *   {(control) => <Input type="email" {...control} />}
 * </Field>
 */
export function Field({ label, children, hint, error, optional, className }: FieldProps) {
  const id = `field-${useId()}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ');

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-body-sm font-medium text-fg">
          {label}
        </label>
        {optional && <span className="text-caption text-fg-subtle">Optional</span>}
      </div>

      {children({
        id,
        'aria-describedby': describedBy || undefined,
        'aria-invalid': error ? true : undefined,
      })}

      {error ? (
        <p id={errorId} className="text-caption text-danger-700">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-caption text-fg-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
