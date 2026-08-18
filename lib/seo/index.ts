import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { site } from '@/content/site';
import { routing, type Locale } from '@/i18n/routing';

/** `/demos/x` → `/demos/x` for en, `/mk/demos/x` for mk. */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return locale === routing.defaultLocale ? clean || '/' : `/${locale}${clean}`;
}

export function absoluteUrl(locale: Locale, path: string): string {
  return `${site.url}${localizedPath(locale, path)}`;
}

/**
 * Open Graph wants `language_TERRITORY`, not a bare language code. These are
 * the markets each locale is actually written for: the English copy quotes US
 * lead costs in dollars, and the Macedonian copy is for readers in MK.
 */
const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  mk: 'mk_MK',
};

export function ogLocale(locale: Locale): string {
  return OG_LOCALES[locale];
}

/**
 * hreflang for every route. Must be reciprocal — each language points at its
 * twin and back — or Google ignores the whole cluster. x-default goes to
 * English, the canonical language for the primary US audience.
 *
 * `locales` narrows the cluster to the languages a route actually exists in.
 * Every marketing page today exists in both, so the default covers them; the
 * parameter is what stops a future single-language route (an mk-only post, say)
 * from advertising a twin that 404s. Used by the sitemap routes.
 */
export function languageAlternates(
  path: string,
  locales: readonly Locale[] = routing.locales
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale] = absoluteUrl(locale, path);
  }
  const fallback = locales.includes(routing.defaultLocale) ? routing.defaultLocale : locales[0];
  if (fallback) {
    alternates['x-default'] = absoluteUrl(fallback, path);
  }
  return alternates;
}

/**
 * Per-route metadata with canonical, hreflang and OG wired consistently.
 * `namespace` must expose `title` and `description` keys.
 */
export async function buildMetadata({
  locale,
  path,
  namespace,
  values,
  absoluteTitle = false,
  locales,
}: {
  locale: Locale;
  path: string;
  namespace: string;
  values?: Record<string, string>;
  /** Skip the "| LeoPixels" suffix — used on the homepage, whose title is already long. */
  absoluteTitle?: boolean;
  /**
   * Narrows the hreflang cluster to the languages this route exists in. Same
   * parameter `languageAlternates` takes, surfaced here for routes whose
   * language coverage is data rather than a constant — /blog exists only in the
   * locales that have a published post.
   */
  locales?: readonly Locale[];
}): Promise<Metadata> {
  const t = await getTranslations(namespace);

  const title = t('title', values);
  const description = t.has('description') ? t('description', values) : undefined;
  const url = absoluteUrl(locale, path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path, locales),
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url,
      locale: ogLocale(locale),
      alternateLocale: routing.locales.filter((other) => other !== locale).map(ogLocale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
