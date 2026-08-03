import { getTranslations } from 'next-intl/server';
import { site } from '@/content/site';
import { Link } from '@/i18n/navigation';

/**
 * Mirrors the trades template's .mobile-bar: a CTA is reachable from every
 * scroll position on a phone. Zero JavaScript — it is two links and a media
 * query. The matching body padding lives in app/[locale]/layout.tsx.
 */
export async function StickyMobileCta() {
  const t = await getTranslations('cta');

  return (
    <div className="fixed inset-x-0 bottom-0 z-120 grid grid-cols-2 shadow-[0_-2px_16px_hsl(215_30%_10%/.18)] sm:hidden">
      <Link
        href="/#get-a-demo"
        className="flex min-h-[60px] items-center justify-center bg-accent px-3 text-center font-bold text-ink"
      >
        {t('freeDemoShort')}
      </Link>
      <a
        href={`mailto:${site.email}`}
        className="flex min-h-[60px] items-center justify-center bg-ink px-3 text-center font-bold text-canvas"
      >
        {t('emailUs')}
      </a>
    </div>
  );
}
