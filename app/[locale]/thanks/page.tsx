import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/Card';
import { DisplayHeading, Eyebrow, Lead } from '@/components/ui/Typography';

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

  const metadata = await buildMetadata({ locale, path: '/thanks', namespace: 'thanks.meta' });
  // A confirmation page has nothing to offer search.
  return { ...metadata, robots: { index: false, follow: true } };
}

export default async function ThanksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations('thanks');
  const tCta = await getTranslations('cta');

  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <Reveal staggerChildren className="flex flex-col gap-6">
          <Eyebrow delay={0}>{t('eyebrow')}</Eyebrow>
          <DisplayHeading as="h1" delay={1}>
            {t('title')}
          </DisplayHeading>
          <Lead delay={2}>{t('lead')}</Lead>
        </Reveal>

        <Reveal className="flex flex-col gap-5 rounded-panel bg-canvas-alt p-8">
          <h2 className="text-h3 text-text">{t('nextHeading')}</h2>
          <CheckList
            items={[t('steps.one'), t('steps.two'), t('steps.three')]}
          />
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          <p>{t('browse')}</p>
          <Button href="/demos" variant="ghost" className="w-fit">
            {tCta('allDemos')}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
