import { useLayoutEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds, useful for a small stagger within a group. */
  delay?: number;
  as?: 'div' | 'li' | 'article';
};

/** Progressive enhancement: content stays visible without JS, motion, or IntersectionObserver. */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (
      !element ||
      !('IntersectionObserver' in window) ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
      element.contains(document.activeElement)
    ) {
      return;
    }

    element.dataset.reveal = 'pending';
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.reveal = 'visible';
          observer.unobserve(element);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -5% 0px' },
    );
    observer.observe(element);

    // Keyboard navigation must never land on an invisible control.
    const revealOnFocus = () => {
      element.dataset.reveal = 'visible';
      observer.unobserve(element);
    };
    element.addEventListener('focusin', revealOnFocus);
    return () => {
      observer.disconnect();
      element.removeEventListener('focusin', revealOnFocus);
      delete element.dataset.reveal;
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement & HTMLElement>}
      className={cn('scroll-reveal', className)}
      style={{ '--reveal-delay': `${Math.max(0, delay)}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
