import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { stepKeys } from '@/content/sections';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/Typography';

export async function HowItWorks() {
  const t = await getTranslations('home.how');

  return (
    <Section id="how-it-works">
      <Container size="wide" className="flex flex-col gap-12">
        <Reveal staggerChildren>
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
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
                <h3 className="text-h3 text-text">{t(`steps.${key}.title`)}</h3>
                <p className="text-[0.9375rem]">{t(`steps.${key}.body`)}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
