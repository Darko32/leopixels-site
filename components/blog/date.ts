import type { Locale } from '@/i18n/routing';

/**
 * `2026-08-20T09:00:00Z` → `August 20, 2026` / `20 август 2026`.
 *
 * The timeZone is pinned to UTC on purpose, and stays pinned now that the
 * stored value carries a clock time. A post published at 23:30 UTC would
 * otherwise render as the previous day for every reader in the US, which is
 * most of them, and the visible date would then disagree with the sitemap's
 * lastmod and the JSON-LD datePublished. One timezone, one date, everywhere.
 *
 * The clock time itself is deliberately not displayed. It exists to schedule
 * the post, not to tell a reader which hour it appeared.
 */
export function formatPostDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
