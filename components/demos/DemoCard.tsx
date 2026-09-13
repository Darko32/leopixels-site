import { getTranslations } from 'next-intl/server';
import { localized, type DemoConfig } from '@/demos';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Card';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { ArrowRightIcon } from '@/components/ui/icons';
import { DemoScreenshot } from './DemoScreenshot';

/**
 * `feature` is used when the grid holds a single demo: a full-width two-column
 * card that reads as a deliberate showcase rather than a three-column grid with
 * two holes in it.
 *
 * The screenshot is the argument, so it gets the room. Underneath it: one meta
 * line (trade and town), the business, one line of tagline, the action. The
 * honesty label sits on the screenshot itself, in the same corner of every
 * card, so it never shares — or wraps — the meta line.
 */
export async function DemoCard({
  demo,
  locale,
  layout = 'grid',
  priority = false,
  headingAs = 'h3',
}: {
  demo: DemoConfig;
  locale: Locale;
  layout?: 'grid' | 'feature';
  priority?: boolean;
  /** h2 where the grid sits directly under a page's h1 (/demos); h3 under a section heading. */
  headingAs?: 'h2' | 'h3';
}) {
  const t = await getTranslations('cta');
  const tTrades = await getTranslations('trades');
  const tCase = await getTranslations('caseStudy');

  const isFeature = layout === 'feature';
  const Heading = headingAs;

  return (
    <Link
      href={`/demos/${demo.slug}`}
      className={cn(
        // h-full + min-w-0: the card is a grid item in a row of siblings whose
        // content length varies (a tagline can run 2–3x longer than another's —
        // see redline-plumbing vs bighorn-roofing). The grid stretches this
        // item's box to the row's tallest sibling automatically; h-full is what
        // makes the visible card actually fill that box instead of only being
        // as tall as its own content. min-w-0 is the matching width-side fix —
        // without it a child's unshrinkable content (see BrowserFrame) can force
        // this card, and the whole grid track, wider than its column.
        'group flex h-full min-w-0 flex-col overflow-hidden rounded-panel border border-line bg-canvas',
        'transition-[transform,box-shadow,border-color] duration-200',
        'hover:-translate-y-1 hover:border-line hover:shadow-[0_1px_3px_hsl(215_25%_12%/.08),0_24px_56px_hsl(215_25%_12%/.14)]',
        isFeature && 'md:grid md:grid-cols-2 md:items-center md:gap-0'
      )}
    >
      <div className={cn('relative overflow-hidden bg-canvas-alt p-3 sm:p-4', isFeature && 'md:p-6')}>
        <BrowserFrame url={`leopixels.com/preview/${demo.slug}`}>
          <div className="overflow-hidden">
            <DemoScreenshot
              demo={demo}
              alt={localized(demo.meta.screenshots.alt, locale)}
              priority={priority}
              sizes={isFeature ? '(max-width: 768px) 100vw, 640px' : '(max-width: 768px) 100vw, 420px'}
              className="transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </BrowserFrame>

        {/* The honesty label. Never omitted on a fictional business. */}
        {demo.meta.isFictional ? (
          <Badge
            tone="sample"
            className={cn(
              'absolute bottom-6 left-6 shadow-[0_4px_14px_hsl(220_40%_2%/.35)] sm:bottom-7 sm:left-7',
              isFeature && 'md:bottom-9 md:left-9'
            )}
          >
            {tCase('sampleBadge')}
          </Badge>
        ) : null}
      </div>

      <div className={cn('flex flex-1 flex-col gap-2.5 p-5 sm:p-6', isFeature && 'md:p-10')}>
        <p className="text-eyebrow uppercase text-accent-deep">
          {tTrades(demo.meta.trade)} · {demo.meta.city}, {demo.meta.state}
        </p>

        <Heading className={cn('text-h3 line-clamp-2 text-text', isFeature && 'md:text-h2')}>
          {demo.meta.business}
        </Heading>

        {/* Clamped so a longer case-study tagline can't inflate every card in
            its row — the row height already stretches to match it via h-full,
            but the clamp keeps that stretch bounded and the top block's
            rhythm consistent regardless of how long any one tagline runs. */}
        <p className={cn('text-small line-clamp-2', isFeature && 'md:text-lead md:max-w-[42ch]')}>
          {localized(demo.meta.tagline, locale)}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-small font-bold text-accent-deep">
          {t('viewCaseStudy')}
          <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
