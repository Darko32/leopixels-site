import type { MetadataRoute } from 'next';
import { demos } from '@/demos';
import { routing } from '@/i18n/routing';
import { absoluteUrl, languageAlternates } from '@/lib/seo';

export const dynamic = 'force-static';

/**
 * Both locales of every indexable route, each carrying its hreflang set.
 *
 * /preview/* is deliberately absent — those are noindex demo sites, not pages
 * we want in the index. /thanks is absent too: it is noindex by design.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/demos', priority: 0.9, changeFrequency: 'weekly' },
    ...demos.map((demo) => ({
      path: `/demos/${demo.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
    { path: '/privacy', priority: 0.2, changeFrequency: 'monthly' },
  ];

  return paths.flatMap((entry) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, entry.path),
      lastModified: new Date(),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages: languageAlternates(entry.path) },
    }))
  );
}
