import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/cn';

/** Caption that keeps every mockup honest about what it is. */
export function IllustrativeCaption({
  tone = 'light',
  className,
  children,
}: {
  tone?: 'light' | 'dark';
  className?: string;
  /** Optional clause appended to the standard disclosure. */
  children?: ReactNode;
}) {
  return (
    <figcaption
      className={cn(
        'flex items-start gap-2 text-caption',
        tone === 'dark' ? 'text-mist-400' : 'text-fg-subtle',
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
      <span>
        Illustrative interface. FlowPilot AI is a fictional product — no live data, integrations or
        AI is connected.{children ? ` ${children}` : null}
      </span>
    </figcaption>
  );
}

/** Window traffic dots — used on every product frame. */
export function WindowDots({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className={cn('size-2 rounded-full', tone === 'dark' ? 'bg-white/25' : 'bg-mist-400')}
        />
      ))}
    </div>
  );
}

export function MiniAvatar({
  initials,
  className,
  tone = 'mist',
}: {
  initials: string;
  className?: string;
  tone?: 'mist' | 'ink' | 'brand' | 'halo';
}) {
  const tones = {
    mist: 'bg-mist-200 text-ink-700',
    ink: 'bg-ink-800 text-white',
    brand: 'bg-brand-600 text-white',
    halo: 'bg-halo-200 text-ink-700',
  } as const;

  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {initials}
    </span>
  );
}

/** Presentational toggle. Never focusable — these frames are illustrations. */
export function MockSwitch({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative block h-3.5 w-6 shrink-0 rounded-full',
        on ? 'bg-brand-600' : 'bg-mist-300',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 size-2.5 rounded-full bg-white shadow-sm',
          on ? 'right-0.5' : 'left-0.5',
        )}
      />
    </span>
  );
}

export function FrameSurface({
  children,
  className,
  tone = 'light',
  interactive = false,
  glass = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
  /** The hero dashboard owns a tablist, so it must stay operable by keyboard. */
  interactive?: boolean;
  /** Frosted chrome — only meaningful on the dark frame over the ambient glow. */
  glass?: boolean;
}) {
  return (
    <div
      aria-hidden={interactive ? undefined : true}
      className={cn(
        'overflow-hidden rounded-2xl border select-none',
        !interactive && 'pointer-events-none',
        tone === 'dark'
          ? cn(
              'border-white/10 shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_40px_90px_-40px_rgb(0_0_0/0.6)]',
              glass ? 'bg-white/[0.045] backdrop-blur-2xl' : 'bg-surface',
            )
          : 'border-line bg-surface shadow-frame',
        className,
      )}
    >
      {children}
    </div>
  );
}
