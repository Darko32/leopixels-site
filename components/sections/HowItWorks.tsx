import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { stepKeys } from '@/content/sections';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/Typography';
import type { SectionVariant } from './variant';

/**
 * The four steps. Full on /how-it-works; the homepage teaser carries a one-line
 * version of each step — enough to see the shape of the process without reading
 * it twice — and links through for the detail.
 *
 * Each step is numbered in a filled counter joined to the next by a hairline,
 * so the list reads as one sequence rather than four detached blocks. The line
 * follows the layout: vertical down the single phone column, with the text
 * beside each counter; horizontal across the four-up row from `lg`. It is
 * decoration only — the order is already carried by the ordered list and the
 * printed numeral.
 */
export async function HowItWorks({ variant = 'page' }: { variant?: SectionVariant }) {
  const t = await getTranslations('home.how');
  const tCta = await getTranslations('cta');

  const isTeaser = variant === 'teaser';
  // One level below whatever the section heading is: h2 under the page's h1,
  // h3 under the homepage's h2.
  const StepTag = isTeaser ? 'h3' : 'h2';

  return (
    // The id stays on the teaser only. Nothing on the site links to it any
    // more, but /#how-it-works was public for months — inbound links from
    // elsewhere still land on the right part of the page.
    <Section id={isTeaser ? 'how-it-works' : undefined}>
      <Container size="wide" className="flex flex-col gap-block">
        <Reveal staggerChildren>
          <SectionHeading as={isTeaser ? 'h2' : 'h1'} eyebrow={t('eyebrow')} title={t('title')} />
        </Reveal>

        <Reveal staggerChildren>
          <ol className="grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">
            {stepKeys.map((key, index) => {
              const isLast = index === stepKeys.length - 1;

              return (
                <li
                  key={key}
                  className="reveal relative grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0 sm:flex sm:flex-col sm:gap-3 sm:pb-0"
                  style={{ '--i': index } as CSSProperties}
                >
                  {isLast ? null : (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-[21.5px] top-12 w-px bg-line sm:hidden"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute -right-8 left-12 top-[21.5px] hidden h-px bg-line lg:block"
                      />
                    </>
                  )}

                  <span className="relative z-10 row-span-2 flex size-11 items-center justify-center rounded-full bg-ink text-[0.8125rem] font-extrabold tracking-[0.02em] text-canvas">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <StepTag className="pt-2 text-h3 text-text sm:pt-0">
                    {t(`steps.${key}.title`)}
                  </StepTag>
                  <p className="pt-1 text-small sm:pt-0">
                    {isTeaser ? t(`steps.${key}.short`) : t(`steps.${key}.body`)}
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {isTeaser ? null : (
          <Reveal>
            <p className="max-w-[70ch] text-small">{t('domainNote')}</p>
          </Reveal>
        )}

        {isTeaser ? (
          <Reveal className="flex justify-center">
            <Button href="/how-it-works" variant="ghost">
              {tCta('seeProcess')}
            </Button>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
