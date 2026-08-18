import type { Locale } from '@/i18n/routing';

/**
 * `2026-09-01` → `September 1, 2026` / `1 септември 2026`.
 *
 * The timeZone is pinned to UTC on purpose. `new Date('2026-09-01')` parses as
 * UTC midnight, so formatting it in a negative-offset zone renders the previous
 * day — a post dated the 1st would print as August 31 for every reader in the
 * US, which is most of them.
 */
export function formatPostDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}
