'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const LABELS: Record<Locale, string> = {
  en: 'EN',
  mk: 'МК',
};

const TITLES: Record<Locale, string> = {
  en: 'English',
  mk: 'Македонски',
};

function isLocale(value: string | undefined): value is Locale {
  return routing.locales.includes(value as Locale);
}

/**
 * Real links, so the switcher works without JavaScript and is crawlable —
 * which is also what lets Google discover the hreflang pair.
 *
 * Paths are computed from the raw pathname rather than next-intl's hooks, so
 * this component needs no NextIntlClientProvider. That keeps the message
 * bundle out of the client entirely.
 */
export function LocaleSwitcher({
  active,
  label,
  className,
}: {
  active: Locale;
  /** Accessible name for the group, e.g. "Language". */
  label: string;
  className?: string;
}) {
  const pathname = usePathname();

  const segments = pathname.split('/');
  const stripped = isLocale(segments[1]) ? `/${segments.slice(2).join('/')}` : pathname;
  const bare = stripped === '/' ? '' : stripped.replace(/\/$/, '');

  return (
    <nav aria-label={label} className={cn('flex items-center gap-0.5', className)}>
      {routing.locales.map((locale) => {
        const href = locale === routing.defaultLocale ? bare || '/' : `/${locale}${bare}`;
        const isActive = locale === active;

        return (
          <Link
            key={locale}
            href={href}
            hrefLang={locale}
            lang={locale}
            title={TITLES[locale]}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-bold transition-colors',
              isActive
                ? 'bg-canvas-alt text-text'
                : 'text-body hover:bg-canvas-alt hover:text-text'
            )}
          >
            {LABELS[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
