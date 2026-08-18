import { getTranslations } from 'next-intl/server';
import { hasTranslation, postContent, readingMinutes, type BlogPost } from '@/content/blog';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Card';
import { ArrowRightIcon } from '@/components/ui/icons';
import { formatPostDate } from './date';

/**
 * No screenshot, no thumbnail. next.config.ts declares no `images.remotePatterns`
 * and the repo ships two local images in total — the site is near-imageless by
 * design, so the card is set in type rather than around a picture that would
 * have to be invented for every post.
 *
 * A post still awaiting its translation shows its English title here, with the
 * same badge the post page carries, so the language is stated before the click
 * rather than after it.
 */
export async function BlogCard({
  post,
  locale,
  layout = 'grid',
}: {
  post: BlogPost;
  locale: Locale;
  layout?: 'grid' | 'feature';
}) {
  const t = await getTranslations('blog');
  const tCta = await getTranslations('cta');

  const isFeature = layout === 'feature';
  const content = postContent(post, locale);
  const translated = hasTranslation(post, locale);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        // h-full + min-w-0 for the same reason DemoCard carries them: the card
        // is a grid item whose siblings' excerpt lengths vary, and the row
        // stretches to the tallest one.
        'group flex h-full min-w-0 flex-col gap-4 rounded-panel border border-line bg-canvas p-7',
        'transition-[transform,box-shadow] duration-200',
        'hover:-translate-y-0.5 hover:shadow-[0_1px_3px_hsl(215_25%_12%/.08),0_20px_48px_hsl(215_25%_12%/.12)]',
        isFeature && 'md:p-10'
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">{t(`formats.${post.format}`)}</Badge>
        {translated ? null : <Badge tone="neutral">{t('inEnglish')}</Badge>}
        {post.draft ? <Badge tone="sample">{t('draftBadge')}</Badge> : null}
      </div>

      <h2 className={cn('text-h3 text-text', isFeature && 'md:text-h2')}>{content.title}</h2>

      <p className={cn('line-clamp-3 text-body', isFeature && 'md:max-w-[52ch] md:text-lead')}>
        {content.description}
      </p>

      <p className="text-[0.875rem]">
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, locale)}</time>
        {' · '}
        {t('readingTime', { minutes: readingMinutes(content) })}
      </p>

      <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[0.9375rem] font-bold text-accent-deep">
        {tCta('readPost')}
        <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
