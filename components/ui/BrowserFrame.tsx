import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * The signature visual device of the site: a demo screenshot presented as a
 * browser window. Used in the hero, on demo cards and on case studies, so the
 * same object recurs at three scales and ties the page together.
 *
 * Chrome is decorative — aria-hidden, and the URL is rendered as plain text
 * rather than a link so a screen reader is not offered a fake address bar.
 */
export function BrowserFrame({
  children,
  url,
  className,
  tone = 'light',
}: {
  children: ReactNode;
  /** Shown in the address bar. Cosmetic. */
  url?: string;
  className?: string;
  tone?: 'light' | 'ink';
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-panel',
        tone === 'light'
          ? 'bg-canvas shadow-[0_1px_3px_hsl(215_25%_12%/.08),0_24px_60px_hsl(215_25%_12%/.14)] ring-1 ring-line'
          : 'bg-ink-soft shadow-[0_30px_80px_hsl(220_40%_2%/.5)] ring-1 ring-line-invert',
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'flex items-center gap-2 border-b px-4 py-3',
          tone === 'light' ? 'border-line bg-canvas-alt' : 'border-line-invert bg-ink'
        )}
      >
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[hsl(4_70%_66%)]" />
          <span className="size-2.5 rounded-full bg-[hsl(40_84%_62%)]" />
          <span className="size-2.5 rounded-full bg-[hsl(140_46%_58%)]" />
        </span>
        {url ? (
          <span
            className={cn(
              // min-w-0 overrides the flex item's default min-width:auto (its
              // content's own intrinsic width) — without it, `truncate`'s
              // white-space:nowrap gives this span an unshrinkable min-content
              // size equal to the full URL, which forces every ancestor up to
              // the grid track to grow with it instead of ever truncating.
              'ml-2 min-w-0 flex-1 truncate rounded-full px-3 py-1 text-xs',
              tone === 'light' ? 'bg-canvas text-body/70' : 'bg-ink-soft text-body-invert/70'
            )}
          >
            {url}
          </span>
        ) : null}
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
