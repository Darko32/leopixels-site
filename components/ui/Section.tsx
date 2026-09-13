import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * The page's rhythm. `ink` is a full-bleed dark band — used exactly three times
 * (hero, guarantee, final CTA) so each one lands rather than reading as stripes.
 *
 * Every section shares one band height, `--space-section`, so the whole page
 * reads as a single designed column. `size="tight"` is for the short connective
 * bands (the proof strip) that would look adrift at full height.
 */
export function Section({
  children,
  id,
  tone = 'light',
  size = 'default',
  className,
}: {
  children: ReactNode;
  id?: string;
  tone?: 'light' | 'alt' | 'ink';
  size?: 'default' | 'tight';
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        size === 'default' ? 'py-section' : 'py-section-tight',
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
