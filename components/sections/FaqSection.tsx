import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { faqKeys } from '@/content/sections';
import { faqSchema } from '@/lib/schema';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/Typography';
import { JsonLd } from '@/components/ui/JsonLd';
import type { SectionVariant } from './variant';

/** How many of the questions the homepage teaser shows before linking out. */
const TEASER_COUNT = 3;

/**
 * Native <details>/<summary>: zero JavaScript, keyboard-accessible for free,
 * and findable by in-page search. The answers are lifted from the objection
 * table in 05_CONVERSION_AND_PAYMENT.md §4 — these are the things a trades
 * owner is actually thinking, handled before they have to ask.
 */
export async function FaqSection({ variant = 'page' }: { variant?: SectionVariant }) {
  const t = await getTranslations('home.faq');
  const tCta = await getTranslations('cta');

  const isTeaser = variant === 'teaser';
  const keys = isTeaser ? faqKeys.slice(0, TEASER_COUNT) : faqKeys;

  return (
    // See the note in HowItWorks: the id serves old inbound links, not the nav.
    <Section id={isTeaser ? 'faq' : undefined}>
      {/* The FAQPage entity belongs to /faq and appears there only. The teaser
          shows three of the same answers, and two pages claiming the same FAQ
          is the way to have neither of them trusted. */}
      {isTeaser ? null : (
        <JsonLd
          data={faqSchema(
            faqKeys.map((key) => ({ question: t(`items.${key}.q`), answer: t(`items.${key}.a`) }))
          )}
        />
      )}
      <Container className="flex flex-col gap-12">
        <Reveal staggerChildren>
          <SectionHeading as={isTeaser ? 'h2' : 'h1'} eyebrow={t('eyebrow')} title={t('title')} />
        </Reveal>

        <Reveal staggerChildren className="flex flex-col">
          {keys.map((key, index) => (
            <details
              key={key}
              className="reveal group border-b border-line first:border-t"
              style={{ '--i': index } as CSSProperties}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-h3 text-text marker:hidden [&::-webkit-details-marker]:hidden">
                {t(`items.${key}.q`)}
                <span
                  aria-hidden="true"
                  className="relative mt-2 size-4 shrink-0 before:absolute before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-accent-deep after:absolute after:left-1/2 after:h-4 after:w-0.5 after:-translate-x-1/2 after:bg-accent-deep after:transition-transform after:duration-200 group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-[68ch] pb-6 text-[1rem]">{t(`items.${key}.a`)}</p>
            </details>
          ))}
        </Reveal>

        {isTeaser ? (
          <Reveal className="flex justify-center">
            <Button href="/faq" variant="ghost">
              {tCta('allQuestions')}
            </Button>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
