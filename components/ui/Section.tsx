import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * The page's rhythm. `ink` is a full-bleed dark band — used exactly three times
 * (hero, guarantee, final CTA) so each one lands rather than reading as stripes.
 *
 * Padding is clamp(80px, 12vw, 160px), roughly double the client template's.
 * Whitespace is the cheapest premium signal there is: it costs nothing at all
 * on the performance budget.
 */
export function Section({
  children,
  id,
  tone = 'light',
  className,
}: {
  children: ReactNode;
  id?: string;
  tone?: 'light' | 'alt' | 'ink';
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'py-[clamp(80px,12vw,160px)]',
        tone === 'light' && 'bg-canvas',
        tone === 'alt' && 'bg-canvas-alt',
        tone === 'ink' && 'bg-ink text-body-invert',
        className
      )}
    >
      {children}
    </section>
  );
}
