import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type Tone = 'canvas' | 'surface' | 'muted' | 'ink' | 'brand';
type Spacing = 'none' | 'sm' | 'md' | 'lg';

const tones: Record<Tone, string> = {
  canvas: 'bg-canvas text-fg',
  surface: 'bg-surface text-fg',
  muted: 'bg-surface-muted text-fg',
  ink: 'bg-ink-900 text-fg-inverse [&_h1]:text-fg-inverse [&_h2]:text-fg-inverse [&_h3]:text-fg-inverse',
  brand: 'bg-brand-700 text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white',
};

const spacings: Record<Spacing, string> = {
  none: '',
  sm: 'py-section-sm',
  md: 'py-section',
  lg: 'py-section-lg',
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  spacing?: Spacing;
  container?: 'content' | 'wide' | 'prose' | false;
  className?: string;
  reveal?: boolean;
  'aria-labelledby'?: string;
};

/**
 * Vertical band with a consistent tone and rhythm.
 * Pass `container={false}` when the child manages its own width (full-bleed frames).
 */
export function Section({
  children,
  id,
  tone = 'canvas',
  spacing = 'md',
  container = 'content',
  className,
  reveal = false,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative', tones[tone], spacings[spacing], className)}
      {...rest}
    >
      {container ? (
        <Container size={container}>
          {reveal ? <ScrollReveal>{children}</ScrollReveal> : children}
        </Container>
      ) : reveal ? (
        <ScrollReveal>{children}</ScrollReveal>
      ) : (
        children
      )}
    </section>
  );
}
