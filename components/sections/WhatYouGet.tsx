import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { includedKeys } from '@/content/sections';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Typography';

/**
 * Single-use glyphs, so they live at their call site rather than in ui/icons.
 * Material icon geometry on the same 24px grid as the rest of the set.
 */
const ICON_PATHS: Record<(typeof includedKeys)[number], string> = {
  call: 'M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99Z',
  emergency:
    'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2ZM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67Z',
  services:
    'M22.7 19 13.6 9.9c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4Z',
  area: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z',
  form: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6Zm2 16H8v-2h8v2Zm0-4H8v-2h8v2Zm-3-5V3.5L18.5 9H13Z',
  seo: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z',
};

/**
 * The one-page anatomy, sold as benefits. Six cards, one shape, nothing else.
 *
 * Each card leads with a glyph in the same accent tile the proof strip uses, so
 * the six read as a set at a glance. On a phone the glyph sits beside the title
 * rather than above it, which keeps six cards from becoming six screens.
 */
export async function WhatYouGet() {
  const t = await getTranslations('home.included');

  return (
    <Section tone="alt">
      <Container size="wide" className="flex flex-col gap-block">
        <Reveal staggerChildren>
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            lead={t('lead')}
            measure="wide"
          />
        </Reveal>

        <Reveal staggerChildren className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {includedKeys.map((key, index) => (
            <Card
              key={key}
              interactive
              className="reveal grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-1.5 p-5 sm:flex sm:flex-col sm:gap-3 sm:p-7"
              // Cascading the stagger across a grid costs no extra JavaScript.
              style={{ '--i': index } as CSSProperties}
            >
              <span className="row-span-2 flex size-10 items-center justify-center rounded-card bg-accent-wash text-accent-deep">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={ICON_PATHS[key]} />
                </svg>
              </span>
              <h3 className="pt-2 text-h3 text-text sm:pt-1">{t(`items.${key}.title`)}</h3>
              <p className="text-small">{t(`items.${key}.body`)}</p>
            </Card>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
