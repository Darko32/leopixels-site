import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { site } from '@/content/site';
import { faqKeys } from '@/content/sections';
import { faqSchema } from '@/lib/schema';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/Typography';
import { JsonLd } from '@/components/ui/JsonLd';
import { MailIcon } from '@/components/ui/icons';
import type { SectionVariant } from './variant';

/** How many of the questions the homepage teaser shows before linking out. */
const TEASER_COUNT = 6;

/**
 * Native <details>/<summary>: zero JavaScript, keyboard-accessible for free,
 * and findable by in-page search. The answers handle the things a trades owner
 * is actually thinking, before they have to ask.
 *
 * From `lg` the heading holds a column of its own and stays in view while the
 * questions scroll past it, with a direct line to a person underneath — the
 * list gets the width it needs instead of running questions across 1140px.
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
          shows a few of the same answers, and two pages claiming the same FAQ
          is the way to have neither of them trusted. */}
      {isTeaser ? null : (
        <JsonLd
          data={faqSchema(
            faqKeys.map((key) => ({ question: t(`items.${key}.q`), answer: t(`items.${key}.a`) }))
          )}
        />
      )}
      <Container className="grid gap-block lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)] lg:gap-16">
        <Reveal staggerChildren className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            as={isTeaser ? 'h2' : 'h1'}
            eyebrow={t('eyebrow')}
            title={t('title')}
            lead={t('lead')}
          />

          <p
            className="reveal flex flex-wrap items-center gap-x-2 gap-y-1 text-small"
            style={{ '--i': 3 } as CSSProperties}
          >
            {t('more')}
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1.5 font-semibold text-text underline decoration-line decoration-2 underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-accent-deep"
            >
              <MailIcon className="text-accent-deep" />
              {site.email}
            </a>
          </p>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal staggerChildren className="flex flex-col">
            {keys.map((key, index) => (
              <details
                key={key}
                className="reveal group border-b border-line first:border-t"
                style={{ '--i': index } as CSSProperties}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-bold leading-snug text-balance text-text transition-colors marker:hidden hover:text-accent-deep sm:py-6 sm:text-h3 [&::-webkit-details-marker]:hidden">
                  {t(`items.${key}.q`)}
                  <span
                    aria-hidden="true"
                    className="relative mt-1 size-4 shrink-0 sm:mt-1.5 before:absolute before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-accent-deep after:absolute after:left-1/2 after:h-4 after:w-0.5 after:-translate-x-1/2 after:bg-accent-deep after:transition-transform after:duration-200 group-open:after:scale-y-0"
                  />
                </summary>
                <p className="max-w-[64ch] pb-6 pr-10 text-small">{t(`items.${key}.a`)}</p>
              </details>
            ))}
          </Reveal>

          {isTeaser ? (
            <Reveal className="flex justify-center lg:justify-start">
              <Button href="/faq" variant="ghost">
                {tCta('allQuestions')}
              </Button>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
