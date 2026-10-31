import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type TextLinkProps = {
  to: string;
  children: ReactNode;
  tone?: 'default' | 'inverse';
  withArrow?: boolean;
  className?: string;
};

export function TextLink({
  to,
  children,
  tone = 'default',
  withArrow = true,
  className,
}: TextLinkProps) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(to);
  const classes = cn(
    'group/link inline-flex items-center gap-1.5 text-body-sm font-medium transition-colors duration-[var(--duration-fast)]',
    tone === 'default'
      ? 'text-brand-700 hover:text-brand-800'
      : 'text-halo-300 hover:text-halo-200',
    className,
  );

  const content = (
    <>
      <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover/link:decoration-current">
        {children}
      </span>
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quint)] group-hover/link:translate-x-0.5"
        />
      )}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={to}
        className={classes}
        {...(to.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}
