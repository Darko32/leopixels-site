import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon } from './icons';

export function Card({
  children,
  className,
  style,
  tone = 'light',
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  /** Carries the `--i` stagger index when a card sits in a revealed grid. */
  style?: CSSProperties;
  tone?: 'light' | 'ink';
  interactive?: boolean;
}) {
  return (
    <div
      style={style}
      className={cn(
        'rounded-card border p-7 transition-[transform,box-shadow] duration-200',
        tone === 'light' ? 'border-line bg-canvas' : 'border-line-invert bg-ink-soft',
        interactive &&
          'hover:-translate-y-0.5 hover:shadow-[0_1px_3px_hsl(215_25%_12%/.08),0_12px_32px_hsl(215_25%_12%/.1)]',
        className
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: 'neutral' | 'accent' | 'sample' | 'invert';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold',
        tone === 'neutral' && 'bg-canvas-alt text-body ring-1 ring-line',
        tone === 'accent' && 'bg-accent-wash text-accent-deep ring-1 ring-accent/30',
        // The honesty badge. Every fictional demo carries one.
        tone === 'sample' && 'bg-ink text-canvas',
        tone === 'invert' && 'bg-[hsl(0_0%_100%/.12)] text-canvas ring-1 ring-line-invert',
        className
      )}
    >
      {children}
    </span>
  );
}

export function CheckList({
  items,
  tone = 'light',
  className,
}: {
  items: ReactNode[];
  tone?: 'light' | 'ink';
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-col gap-3', className)}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <CheckIcon
            className={cn(
              'mt-1 shrink-0',
              tone === 'light' ? 'text-positive' : 'text-accent'
            )}
          />
          <span className={cn(tone === 'ink' && 'text-body-invert')}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
