import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { paths } from '@/config/paths';

type LogoProps = {
  tone?: 'default' | 'inverse';
  className?: string;
  /** Hide the wordmark for compact placements. */
  markOnly?: boolean;
};

/**
 * Wordmark + glyph. The glyph doubles as the favicon mark: a flight-path
 * chevron with a violet crossbar and a "sky" beacon.
 */
export function Logo({ tone = 'default', className, markOnly = false }: LogoProps) {
  const isInverse = tone === 'inverse';

  return (
    <Link
      to={paths.home}
      aria-label="FlowPilot AI — home"
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-sm text-fg',
        isInverse && 'text-white',
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-7" fill="none" aria-hidden="true">
        <path
          d="M6.4 24.2 16 6.4l9.6 17.8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 17.9h9"
          stroke="var(--color-brand-500)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="27.4" cy="6.6" r="2.1" fill="var(--color-halo-400)" />
      </svg>
      {!markOnly && (
        <span className="font-display text-[1.0625rem] leading-none font-extrabold tracking-[-0.03em]">
          FlowPilot
          <span
            className={cn('ml-1 font-semibold', isInverse ? 'text-halo-300' : 'text-brand-700')}
          >
            AI
          </span>
        </span>
      )}
    </Link>
  );
}
