import { getTranslations } from 'next-intl/server';
import { site } from '@/content/site';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { MailIcon } from '@/components/ui/icons';
import { LocaleSwitcher } from './LocaleSwitcher';
import { Wordmark } from './Wordmark';

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');

  return (
    <footer className="border-t border-line-invert bg-ink text-body-invert">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Wordmark tone="ink" />
            <p className="max-w-[38ch] text-[0.9375rem]">{t('blurb')}</p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex w-fit items-center gap-2 text-[0.9375rem] font-semibold text-canvas hover:underline"
            >
              <MailIcon />
              {site.email}
            </a>
          </div>

          <nav aria-label={t('navHeading')} className="flex flex-col gap-3">
            <h2 className="text-eyebrow uppercase text-canvas">{t('navHeading')}</h2>
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-[0.9375rem] hover:text-canvas">
                {tNav(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h2 className="text-eyebrow uppercase text-canvas">{t('legalHeading')}</h2>
            <Link href="/privacy" className="text-[0.9375rem] hover:text-canvas">
              {t('privacy')}
            </Link>
            <div className="pt-2">
              <LocaleSwitcher
                active={locale}
                label={t('languageLabel')}
                className="[&_a]:text-body-invert [&_a[aria-current]]:bg-[hsl(0_0%_100%/.12)] [&_a[aria-current]]:text-canvas"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line-invert py-7 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          {/* Not a boast — the site is built on the same stack it sells, and
              that is the most checkable claim on the page. */}
          <p>{t('colophon')}</p>
        </div>
      </Container>
    </footer>
  );
}
