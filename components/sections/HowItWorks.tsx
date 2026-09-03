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
 * The four steps. Full on /how-it-works; on the homepage the step titles alone
 * carry the shape of the process and the bodies are one click away.
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
      <Container size="wide" className="flex flex-col gap-12">
        <Reveal staggerChildren>
          <SectionHeading as={isTeaser ? 'h2' : 'h1'} eyebrow={t('eyebrow')} title={t('title')} />
        </Reveal>

        <Reveal staggerChildren>
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stepKeys.map((key, index) => (
              <li
                key={key}
                className="reveal flex flex-col gap-3 border-t-2 border-line pt-5"
                style={{ '--i': index } as CSSProperties}
              >
                <span className="text-eyebrow uppercase text-accent-deep">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <StepTag className="text-h3 text-text">{t(`steps.${key}.title`)}</StepTag>
                {isTeaser ? null : <p className="text-[0.9375rem]">{t(`steps.${key}.body`)}</p>}
              </li>
            ))}
          </ol>
        </Reveal>

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
