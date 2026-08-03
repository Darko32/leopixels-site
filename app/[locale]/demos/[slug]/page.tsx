import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { demos, getDemo, localized } from '@/demos';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { absoluteUrl, languageAlternates, ogLocale } from '@/lib/seo';
import { breadcrumbSchema, creativeWorkSchema } from '@/lib/schema';
import { site } from '@/content/site';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Card';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { Button, ExternalButton } from '@/components/ui/Button';
import { DisplayHeading, Eyebrow } from '@/components/ui/Typography';
import { CheckIcon } from '@/components/ui/icons';
import { JsonLd } from '@/components/ui/JsonLd';
import { DemoScreenshot } from '@/components/demos/DemoScreenshot';
import { DemoMetrics } from '@/components/demos/DemoMetrics';
import { DemoGrid } from '@/components/demos/DemoGrid';

/** locale × slug — one static page per demo per language. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => demos.map((demo) => ({ locale, slug: demo.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const demo = getDemo(slug);
  if (!demo) notFound();

  const path = `/demos/${slug}`;
  const title = `${demo.meta.business} — ${demo.meta.city}, ${demo.meta.state}`;
  const description = localized(demo.meta.tagline, locale);
  const url = absoluteUrl(locale, path);

  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: 'article',
      siteName: site.name,
      title,
      description,
      url,
      locale: ogLocale(locale),
      alternateLocale: routing.locales.filter((other) => other !== locale).map(ogLocale),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const demo = getDemo(slug);
  if (!demo) notFound();

  const t = await getTranslations('caseStudy');
  const tCta = await getTranslations('cta');
  const tTrades = await getTranslations('trades');
  const tA11y = await getTranslations('a11y');
  const tDemos = await getTranslations('demosPage');

  const related = demos.filter((other) => other.slug !== demo.slug);
  const screenshotAlt = localized(demo.meta.screenshots.alt, locale);
  const previewUrl = `/preview/${demo.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: tDemos('eyebrow'), path: '/demos' },
            { name: demo.meta.business, path: `/demos/${demo.slug}` },
          ]),
          creativeWorkSchema(locale, {
            slug: demo.slug,
            name: demo.meta.business,
            description: localized(demo.meta.tagline, locale),
          }),
        ]}
      />

      {/* --- header + hero screenshot --- */}
      <section className="bg-ink pb-[clamp(56px,8vw,90px)] pt-10 text-body-invert">
        <Container size="wide" className="flex flex-col gap-10">
          <nav aria-label={tA11y('breadcrumb')}>
            <Link
              href="/demos"
              className="text-[0.875rem] font-semibold text-body-invert hover:text-canvas"
            >
              ← {tCta('backToDemos')}
            </Link>
          </nav>

          <Reveal staggerChildren className="flex flex-col gap-5">
            <div className="reveal flex flex-wrap items-center gap-2">
              <Badge tone="accent">{tTrades(demo.meta.trade)}</Badge>
              <Badge tone="invert">
                {demo.meta.city}, {demo.meta.state}
              </Badge>
              {demo.meta.isFictional ? <Badge tone="sample">{t('sampleBadge')}</Badge> : null}
            </div>

            <DisplayHeading as="h1" delay={1} className="text-canvas">
              {demo.meta.business}
            </DisplayHeading>

            <p
              className="reveal max-w-[52ch] text-lead text-body-invert"
              style={{ '--i': 2 } as React.CSSProperties}
            >
              {localized(demo.meta.tagline, locale)}
            </p>

            <div className="reveal pt-2" style={{ '--i': 3 } as React.CSSProperties}>
              <ExternalButton href={previewUrl} size="lg">
                {tCta('openLiveDemo')}
              </ExternalButton>
            </div>
          </Reveal>

          <Reveal>
            <BrowserFrame tone="ink" url={`leopixels.com${previewUrl}`}>
              <DemoScreenshot
                demo={demo}
                alt={screenshotAlt}
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            </BrowserFrame>
          </Reveal>

          {/* The honesty note, in full sentences rather than only a badge. */}
          {demo.meta.isFictional ? (
            <p className="max-w-[70ch] text-[0.875rem] text-body-invert/80">
              {t('sampleExplainer', { business: demo.meta.business })}
            </p>
          ) : null}
        </Container>
      </section>

      {/* --- the brief --- */}
      <Section>
        <Container className="flex flex-col gap-14">
          <Reveal staggerChildren className="flex flex-col gap-5">
            <Eyebrow delay={0}>{t('briefHeading')}</Eyebrow>
            <div
              className="reveal flex max-w-[68ch] flex-col gap-5 text-[1.0625rem]"
              style={{ '--i': 1 } as React.CSSProperties}
            >
              {localized(demo.meta.brief, locale)
                .split('\n\n')
                .map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
            </div>
          </Reveal>

          <Reveal className="flex flex-col gap-6">
            <h2 className="text-h3 text-text">{t('highlightsHeading')}</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {demo.meta.highlights.map((highlight, index) => (
                <li key={index} className="flex gap-3">
                  <CheckIcon className="mt-1 shrink-0 text-positive" />
                  <span>{localized(highlight, locale)}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <DemoMetrics demo={demo} />
          </Reveal>
        </Container>
      </Section>

      {/* --- desktop + mobile --- */}
      <Section tone="alt">
        <Container size="wide" className="flex flex-col gap-10">
          <Reveal>
            <h2 className="text-h2 text-text">{t('screenshotsHeading')}</h2>
          </Reveal>

          <Reveal staggerChildren className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div className="reveal">
              <BrowserFrame url={`leopixels.com${previewUrl}`}>
                <DemoScreenshot
                  demo={demo}
                  alt={t('desktopAlt', { business: demo.meta.business })}
                  sizes="(max-width: 1024px) 100vw, 780px"
                />
              </BrowserFrame>
            </div>

            <div
              className="reveal mx-auto w-full max-w-[300px] overflow-hidden rounded-panel ring-1 ring-line"
              style={{ '--i': 1 } as React.CSSProperties}
            >
              <DemoScreenshot
                demo={demo}
                variant="mobile"
                alt={t('mobileAlt', { business: demo.meta.business })}
                sizes="300px"
              />
            </div>
          </Reveal>

          {locale !== demo.meta.siteLocale ? (
            <p className="text-[0.875rem]">{t('englishNote')}</p>
          ) : null}
        </Container>
      </Section>

      {/* --- convert --- */}
      <Section tone="ink">
        <Container className="flex flex-col gap-7">
          <Reveal staggerChildren className="flex flex-col gap-6">
            <DisplayHeading delay={0} className="max-w-[18ch] text-canvas">
              {t('ctaTitle')}
            </DisplayHeading>
            <p
              className="reveal max-w-[52ch] text-lead text-body-invert"
              style={{ '--i': 1 } as React.CSSProperties}
            >
              {t('ctaLead')}
            </p>
            <div
              className="reveal flex flex-wrap gap-3"
              style={{ '--i': 2 } as React.CSSProperties}
            >
              <Button href="/#get-a-demo" size="lg">
                {tCta('freeDemo')}
              </Button>
              <ExternalButton href={previewUrl} variant="inverse" size="lg">
                {tCta('openLiveDemo')}
              </ExternalButton>
            </div>
          </Reveal>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="alt">
          <Container size="wide" className="flex flex-col gap-10">
            <Reveal>
              <h2 className="text-h2 text-text">{t('moreHeading')}</h2>
            </Reveal>
            <DemoGrid demos={related} locale={locale} />
          </Container>
        </Section>
      ) : null}
    </>
  );
}
