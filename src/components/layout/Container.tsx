import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ContainerSize = 'content' | 'wide' | 'prose';

const sizes: Record<ContainerSize, string> = {
  content: 'max-w-content',
  wide: 'max-w-wide',
  prose: 'max-w-prose',
};

type ContainerProps = {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
};

/** Horizontal rhythm for the whole site: max width + fluid gutters. */
export function Container({ children, size = 'content', className }: ContainerProps) {
  return <div className={cn('mx-auto w-full px-gutter', sizes[size], className)}>{children}</div>;
}
