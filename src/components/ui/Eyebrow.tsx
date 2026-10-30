import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type EyebrowTone = 'default' | 'inverse';

const tones: Record<EyebrowTone, string> = {
  default: 'text-brand-700',
  inverse: 'text-halo-300',
};

type EyebrowProps = {
  children: ReactNode;
  tone?: EyebrowTone;
  rule?: boolean;
  className?: string;
};

/** Small uppercase label that introduces a heading. */
export function Eyebrow({ children, tone = 'default', rule = true, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'flex items-center gap-2.5 text-overline font-semibold uppercase',
        tones[tone],
        className,
      )}
    >
      {rule && <span aria-hidden="true" className="h-px w-6 bg-current opacity-50" />}
      {children}
    </span>
  );
}
