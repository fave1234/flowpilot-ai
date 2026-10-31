import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base = cn(
  'group/btn inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md',
  'font-medium transition-[background-color,border-color,color,box-shadow,transform]',
  'duration-[var(--duration-base)] ease-[var(--ease-out-quint)]',
  'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand-600',
  'disabled:pointer-events-none disabled:opacity-50',
  '[&_svg]:size-4 [&_svg]:shrink-0',
);

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-white shadow-e1 hover:bg-brand-700 hover:shadow-e2 active:bg-brand-800',
  secondary:
    'border border-line bg-surface text-fg shadow-e1 hover:border-line-strong hover:bg-mist-50',
  ghost: 'text-fg-muted hover:bg-mist-200/70 hover:text-fg',
  dark: 'bg-ink-900 text-white shadow-e1 hover:bg-ink-800 hover:shadow-e2 active:bg-ink-950',
  inverse:
    'border border-white/20 bg-white/[0.06] text-white hover:border-white/35 hover:bg-white/[0.12] focus-visible:outline-halo-300',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-caption',
  md: 'h-11 px-5 text-body-sm',
  lg: 'h-12 px-6 text-body',
};

type StyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
};

type StyleProps = StyleOptions & { children: ReactNode };

/** Shared button treatment for anchors, router links and buttons. */
export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
  fullWidth,
}: StyleOptions = {}) {
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);
}

type ButtonProps = StyleProps & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = StyleProps & {
  to: string;
  onClick?: () => void;
  'aria-label'?: string;
  'aria-current'?: 'page' | undefined;
};

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  to,
  ...props
}: ButtonLinkProps) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(to);

  if (isExternal) {
    return (
      <a
        href={to}
        className={buttonStyles({ variant, size, fullWidth, className })}
        {...(to.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={buttonStyles({ variant, size, fullWidth, className })} {...props}>
      {children}
    </Link>
  );
}
