import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Container({
  children,
  size = 'default',
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  /** `wide` (1320px) is for the demo grid and full-bleed rows. */
  size?: 'default' | 'wide' | 'narrow';
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-5 sm:px-8',
        size === 'default' && 'max-w-wrap',
        size === 'wide' && 'max-w-wide',
        size === 'narrow' && 'max-w-[760px]',
        className
      )}
    >
      {children}
    </Tag>
  );
}
