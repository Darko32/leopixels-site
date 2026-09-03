import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { site } from '@/content/site';
import { routing } from '@/i18n/routing';
import { navItems } from '@/lib/nav';
import { organizationSchema, serviceSchema, websiteSchema } from '@/lib/schema';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileCta } from '@/components/layout/StickyMobileCta';
import { JsonLd } from '@/components/ui/JsonLd';

// One variable grotesk, self-hosted at build time. next/font emits per-subset
// woff2 with unicode-range, so English visitors never download the Cyrillic file.
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });

  return {
    metadataBase: new URL(site.url),
    title: { default: t('title'), template: `%s | ${site.name}` },
    description: t('description'),
    // Inherited by every marketing route in both locales, so /mk indexes on the
    // same terms as /. Individual routes override it — /thanks opts itself out.
    // The kill switch is site.indexable in content/site.ts.
    robots: site.indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            // Full-size thumbnails in Search and Discover. Without it Google
            // shows a small thumbnail or none — the demo screenshots are the
            // whole pitch, so they need the large treatment.
            'max-image-preview': 'large',
            // Uncapped snippet length. The default cap truncates the offer
            // mid-sentence in the SERP — "$500 to build, $149 a…".
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : { index: false, follow: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required for every route to stay statically rendered.
  setRequestLocale(locale);

  const t = await getTranslations('nav');
  const tCta = await getTranslations('cta');
  const tA11y = await getTranslations('a11y');
  const tMeta = await getTranslations('home.meta');

  const nav = navItems().map((item) => ({ href: item.href, label: t(item.key) }));

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      {/* Bottom padding clears the sticky mobile CTA bar. */}
      <body className="pb-[60px] sm:pb-0">
        {/*
          Marks the document as scripted before first paint. Every scroll-reveal
          rule in globals.css is scoped to `.js`, so with JavaScript off nothing
          is ever hidden and the page simply reads as static content.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />

        <JsonLd
          data={[
            organizationSchema(locale, tMeta('description')),
            websiteSchema(locale, site.name),
            serviceSchema(locale, tMeta('title'), tMeta('description')),
          ]}
        />
        {/*
          next-intl's <Link> reads the locale from context, so client components
          that navigate need a provider. `messages={{}}` is deliberate and load-
          bearing: without it the provider inherits the whole server message
          bundle and ships it to the browser. Every client component here takes
          its text as props instead, so there is nothing to inherit.
        */}
        <NextIntlClientProvider locale={locale} messages={{}}>
          <a href="#main" className="skip">
            {tA11y('skipToContent')}
          </a>

          <Header
            nav={nav}
            locale={locale}
            ctaLabel={tCta('freeDemoShort')}
            menuLabel={tA11y('menu')}
            closeLabel={tA11y('closeMenu')}
            languageLabel={tA11y('language')}
            homeLabel={tA11y('home')}
          />

          <main id="main">{children}</main>

          <Footer locale={locale} />
          <StickyMobileCta />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
