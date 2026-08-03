import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { includedKeys } from '@/content/sections';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Typography';

/** The one-page anatomy from 03_BUILD_SYSTEM.md §3, sold as benefits. */
export async function WhatYouGet() {
  const t = await getTranslations('home.included');

  return (
    <Section tone="alt">
      <Container size="wide" className="flex flex-col gap-12">
        <Reveal staggerChildren>
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
        </Reveal>

        <Reveal staggerChildren className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {includedKeys.map((key, index) => (
            <Card
              key={key}
              interactive
              className="reveal flex flex-col gap-2"
              // Cascading the stagger across a grid costs no extra JavaScript.
              style={{ '--i': index } as CSSProperties}
            >
              <h3 className="text-h3 text-text">{t(`items.${key}.title`)}</h3>
              <p className="text-[0.9375rem]">{t(`items.${key}.body`)}</p>
            </Card>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
