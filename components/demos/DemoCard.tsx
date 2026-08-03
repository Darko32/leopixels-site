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
 */
export async function DemoCard({
  demo,
  locale,
  layout = 'grid',
  priority = false,
}: {
  demo: DemoConfig;
  locale: Locale;
  layout?: 'grid' | 'feature';
  priority?: boolean;
}) {
  const t = await getTranslations('cta');
  const tTrades = await getTranslations('trades');
  const tCase = await getTranslations('caseStudy');

  const isFeature = layout === 'feature';

  return (
    <Link
      href={`/demos/${demo.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-panel border border-line bg-canvas',
        'transition-[transform,box-shadow] duration-200',
        'hover:-translate-y-0.5 hover:shadow-[0_1px_3px_hsl(215_25%_12%/.08),0_20px_48px_hsl(215_25%_12%/.12)]',
        isFeature && 'md:grid md:grid-cols-2 md:items-center md:gap-0'
      )}
    >
      <div className="overflow-hidden bg-canvas-alt p-4 sm:p-6">
        <BrowserFrame url={`leopixels.com/preview/${demo.slug}`}>
          <div className="overflow-hidden">
            <DemoScreenshot
              demo={demo}
              alt={localized(demo.meta.screenshots.alt, locale)}
              priority={priority}
              sizes={isFeature ? '(max-width: 768px) 100vw, 640px' : '(max-width: 768px) 100vw, 420px'}
              className="transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </div>
        </BrowserFrame>
      </div>

      <div className={cn('flex flex-1 flex-col gap-3 p-6', isFeature && 'md:p-10')}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{tTrades(demo.meta.trade)}</Badge>
          <Badge tone="neutral">
            {demo.meta.city}, {demo.meta.state}
          </Badge>
          {/* The honesty label. Never omitted on a fictional business. */}
          {demo.meta.isFictional ? <Badge tone="sample">{tCase('sampleBadge')}</Badge> : null}
        </div>

        <h3 className={cn('text-h3 text-text', isFeature && 'md:text-h2')}>
          {demo.meta.business}
        </h3>

        <p className={cn('text-body', isFeature && 'md:text-lead md:max-w-[42ch]')}>
          {localized(demo.meta.tagline, locale)}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[0.9375rem] font-bold text-accent-deep">
          {t('viewCaseStudy')}
          <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
