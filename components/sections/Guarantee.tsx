import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { DisplayHeading, Eyebrow } from '@/components/ui/Typography';
import { KeyIcon, ShieldIcon } from '@/components/ui/icons';

/** Single-use here, so it lives at its call site rather than in ui/icons. */
function FilesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13Z" />
    </svg>
  );
}

const points = [
  { key: 'domain', Icon: KeyIcon },
  { key: 'files', Icon: FilesIcon },
  { key: 'cancel', Icon: ShieldIcon },
] as const;

/**
 * Dark band #2. The anti-lock-in guarantee, given visual weight matching its
 * rhetorical weight — it is the objection-killer and the one promise
 * competitors in this niche will not match, because lock-in is their business
 * model.
 *
 * The headline makes the promise and one short sentence frames it; the three
 * points beside it are the specifics, set as one panel with rules between them
 * rather than three separate boxes, so the band reads as a single statement
 * instead of a grid of features.
 */
export async function Guarantee() {
  const t = await getTranslations('home.guarantee');

  return (
    <Section tone="ink">
      <Container className="grid gap-block lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
        <Reveal staggerChildren className="flex flex-col gap-5">
          <Eyebrow delay={0} tone="ink">
            {t('eyebrow')}
          </Eyebrow>

          <DisplayHeading delay={1} className="max-w-[15ch] text-canvas">
            {t('title')}
          </DisplayHeading>

          <p
            className="reveal max-w-[46ch] text-lead text-body-invert"
            style={{ '--i': 2 } as CSSProperties}
          >
            {t('body')}
          </p>

          <p
            className="reveal max-w-[46ch] font-semibold text-accent"
            style={{ '--i': 3 } as CSSProperties}
          >
            {t('closing')}
          </p>
        </Reveal>

        <Reveal
          as="ul"
          staggerChildren
          className="flex flex-col divide-y divide-line-invert rounded-panel border border-line-invert bg-ink-soft px-5 sm:px-7"
        >
          {points.map(({ key, Icon }, index) => (
            <li
              key={key}
              className="reveal flex gap-4 py-5 sm:py-6"
              style={{ '--i': index } as CSSProperties}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-card bg-[hsl(38_92%_50%/.12)] text-accent">
                <Icon />
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-canvas">{t(`points.${key}.title`)}</p>
                <p className="text-small text-body-invert">{t(`points.${key}.body`)}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
