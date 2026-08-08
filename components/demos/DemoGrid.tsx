import type { CSSProperties } from 'react';
import type { DemoConfig } from '@/demos';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';
import { DemoCard } from './DemoCard';

/**
 * The grid adapts its column count to how many demos exist. We launch with one,
 * and a lone card in a three-column grid reads as an unfinished site — so a
 * single demo gets the full-width feature treatment instead.
 */
export function DemoGrid({
  demos,
  locale,
  priorityFirst = false,
}: {
  demos: DemoConfig[];
  locale: Locale;
  priorityFirst?: boolean;
}) {
  if (demos.length === 0) return null;

  const single = demos.length === 1;

  return (
    <Reveal
      staggerChildren
      className={cn(
        // items-stretch is the CSS grid default and thus redundant, but named
        // explicitly here because equal card height depends on it: it's what
        // makes every item in a row match the tallest one before DemoCard's
        // own h-full fills that stretched box. See DemoCard.tsx.
        'grid items-stretch gap-6',
        single && 'grid-cols-1',
        demos.length === 2 && 'md:grid-cols-2',
        demos.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {demos.map((demo, index) => (
        <div
          key={demo.slug}
          className="reveal min-w-0"
          style={{ '--i': index } as CSSProperties}
        >
          <DemoCard
            demo={demo}
            locale={locale}
            layout={single ? 'feature' : 'grid'}
            priority={priorityFirst && index === 0}
          />
        </div>
      ))}
    </Reveal>
  );
}
