import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { demos, getRepresentedTrades } from '@/demos';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { itemListSchema } from '@/lib/schema';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/Typography';
import { JsonLd } from '@/components/ui/JsonLd';
import { DemoCard } from '@/components/demos/DemoCard';
import { DemoGrid } from '@/components/demos/DemoGrid';
import { TradeFilter } from '@/components/demos/TradeFilter';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata({ locale, path: '/demos', namespace: 'demosPage.meta' });
}

export default async function DemosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations('demosPage');
  const tTrades = await getTranslations('trades');

  const trades = getRepresentedTrades();
  // A filter with one option is furniture, not a control.
  const showFilter = trades.length > 1;

  return (
    <>
      <JsonLd
        data={itemListSchema(
          locale,
          demos.map((demo) => ({ name: demo.meta.business, path: `/demos/${demo.slug}` }))
        )}
      />

      <Section tone="alt">
        <Container size="wide" className="flex flex-col gap-12">
          <Reveal staggerChildren>
            <SectionHeading as="h1" eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
          </Reveal>

          {showFilter ? (
            <TradeFilter
              label={t('filterLabel')}
              allLabel={tTrades('all')}
              options={trades.map((trade) => ({ value: trade, label: tTrades(trade) }))}
              demos={demos.map((demo) => ({
                id: demo.slug,
                trade: demo.meta.trade,
                card: <DemoCard demo={demo} locale={locale} />,
              }))}
            />
          ) : (
            <DemoGrid demos={demos} locale={locale} priorityFirst />
          )}
        </Container>
      </Section>
    </>
  );
}
