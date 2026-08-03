import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { site } from '@/content/site';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { DisplayHeading } from '@/components/ui/Typography';

const SECTIONS = ['collect', 'use', 'keep', 'analytics', 'contact'] as const;

/** Bumped when the policy text changes, not on every deploy. */
const LAST_UPDATED = new Date('2026-08-01T00:00:00Z');

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
  return buildMetadata({ locale, path: '/privacy', namespace: 'privacy.meta' });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations('privacy');
  const format = await getFormatter();

  return (
    <Section>
      <Container size="narrow" className="flex flex-col gap-10">
        <Reveal staggerChildren className="flex flex-col gap-4">
          <DisplayHeading as="h1" delay={0} className="text-h2">
            {t('title')}
          </DisplayHeading>
          <p className="reveal text-[0.9375rem]" style={{ '--i': 1 } as React.CSSProperties}>
            {t('updated', { date: format.dateTime(LAST_UPDATED, { dateStyle: 'long' }) })}
          </p>
        </Reveal>

        <Reveal staggerChildren className="flex flex-col gap-8">
          {SECTIONS.map((key, index) => (
            <section
              key={key}
              className="reveal flex flex-col gap-2"
              style={{ '--i': index } as React.CSSProperties}
            >
              <h2 className="text-h3 text-text">{t(`sections.${key}.title`)}</h2>
              <p>{t(`sections.${key}.body`, { email: site.email })}</p>
            </section>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
