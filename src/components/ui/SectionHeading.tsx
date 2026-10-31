import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'start' | 'center';
  tone?: 'default' | 'inverse';
  as?: 'h1' | 'h2' | 'h3';
  size?: 'default' | 'lg';
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  tone = 'default',
  as: Heading = 'h2',
  size = 'default',
  className,
  id,
}: SectionHeadingProps) {
  const isInverse = tone === 'inverse';

  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto flex flex-col items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow tone={isInverse ? 'inverse' : 'default'} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <Heading
        id={id}
        className={cn(
          size === 'lg' ? 'text-display-2' : 'text-title-1',
          isInverse ? 'text-fg-inverse' : 'text-fg',
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            'mt-4 text-lead',
            isInverse ? 'text-mist-400' : 'text-fg-muted',
            align === 'center' && 'max-w-xl',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
