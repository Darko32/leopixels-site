import type { CSSProperties } from 'react';
import { getImageProps } from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { DisplayHeading, Lead } from '@/components/ui/Typography';
import { ArrowRightIcon, CheckIcon } from '@/components/ui/icons';

/**
 * Below `sm` a dedicated portrait photo loads instead of the desktop landscape
 * one. This is art direction, not a resize — a phone-shaped crop of a wide
 * frame either loses the subject or has to be zoomed, so the two shots are
 * genuinely different images and `<picture>` picks between them.
 */
const MOBILE_MEDIA = '(max-width: 639px)';

/** Shared between both crops: both are the LCP element, both are full-bleed. */
const heroImage = { alt: '', fill: true, priority: true, sizes: '100vw' } as const;

const BADGES = ['one', 'two', 'three'] as const;

/**
 * Dark band #1 of three. A full-bleed photo of the trade the sites are built
 * for, with the copy in the frame's negative space — proof of who this is for,
 * before a single claim has to be believed.
 *
 * The headline is the offer in two beats — see it, then pay only if you like
 * it — and the second beat carries the accent, so the promise is where the eye
 * lands.
 *
 * One button, one link. "See the demos" is the only filled control in the band
 * because looking is the whole proposition; the process is a quiet text link
 * beside it. The demo request is never more than a tap away regardless: it is
 * the header's button on desktop and the sticky bar on a phone.
 */
export async function Hero() {
  const t = await getTranslations('home.hero');
  const tCta = await getTranslations('cta');

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...heroImage, src: '/images/hero-background-mobile.webp' });

  const {
    props: { srcSet: desktopSrcSet, ...imgProps },
  } = getImageProps({ ...heroImage, src: '/images/hero-background.webp' });

  return (
    <section className="relative isolate flex min-h-[440px] items-center overflow-hidden bg-ink py-10 text-body-invert sm:min-h-[560px] sm:py-[clamp(72px,12vw,96px)] lg:min-h-[clamp(600px,46vw,680px)]">
      <picture>
        <source media={MOBILE_MEDIA} srcSet={mobileSrcSet} sizes="100vw" />
        {/* Desktop crop is also the <img> fallback, so it keeps its own srcSet. */}
        <img
          {...imgProps}
          srcSet={desktopSrcSet}
          alt=""
          className="object-cover object-right sm:object-[70%_center] lg:object-[100%_30%]"
        />
      </picture>

      {/* Readability wash. Mobile runs it top-to-bottom because the copy spans
          the full width there, kept light enough that the photo still reads; a
          soft shadow under the headline and lead carries the contrast instead.
          From `sm` up it is anchored to the left so the professional and their
          toolbox on the right stay unobscured. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,hsl(220_24%_5%/.7)_0%,hsl(220_24%_5%/.48)_38%,hsl(220_24%_5%/.32)_68%,hsl(220_24%_5%/.6)_100%)] sm:bg-[linear-gradient(100deg,hsl(220_24%_5%/.95)_0%,hsl(220_24%_5%/.86)_38%,hsl(220_24%_5%/.42)_66%,hsl(220_24%_5%/0)_88%)] lg:bg-[linear-gradient(100deg,hsl(220_24%_5%/.94)_0%,hsl(220_24%_5%/.82)_32%,hsl(220_24%_5%/.3)_58%,hsl(220_24%_5%/0)_74%)]"
      />

      <Container size="wide" className="relative z-10">
        <Reveal
          staggerChildren
          className="flex max-w-[640px] flex-col items-start gap-4 sm:gap-6 lg:max-w-[58%]"
        >
          <p
            className="reveal inline-flex w-fit items-center rounded-full border border-[hsl(0_0%_100%/.24)] bg-[hsl(0_0%_100%/.08)] px-3.5 py-1.5 text-eyebrow uppercase text-accent backdrop-blur-sm"
            style={{ '--i': 0 } as CSSProperties}
          >
            {t('eyebrow')}
          </p>

          <DisplayHeading
            as="h1"
            delay={1}
            className="text-canvas [text-shadow:0_2px_24px_hsl(220_24%_5%/.5)] sm:[text-shadow:none]"
          >
            {t('title')} <span className="block text-accent">{t('titleAccent')}</span>
          </DisplayHeading>

          <Lead
            delay={2}
            className="max-w-[48ch] text-canvas/90 [text-shadow:0_1px_14px_hsl(220_24%_5%/.75)] sm:text-body-invert sm:[text-shadow:none]"
          >
            {t('lead')}
          </Lead>

          <div
            className="reveal flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 sm:gap-x-7 sm:pt-2"
            style={{ '--i': 3 } as CSSProperties}
          >
            <Button href="/#demos" size="lg" className="group whitespace-nowrap px-5 sm:px-8">
              {tCta('seeDemos')}
              <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Link
              href="/how-it-works"
              className="inline-flex min-h-[48px] items-center whitespace-nowrap font-bold text-canvas underline decoration-[hsl(0_0%_100%/.35)] decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-accent"
            >
              {tCta('howItWorks')}
            </Link>
          </div>

          {/* From `sm` up only. On a phone the proof strip directly below opens
              with the same facts, and repeating them cost the hero its screen. */}
          <ul
            className="reveal hidden flex-wrap gap-x-7 gap-y-2 pt-2 sm:flex"
            style={{ '--i': 4 } as CSSProperties}
          >
            {BADGES.map((key) => (
              <li
                key={key}
                className="flex items-center gap-2 text-small font-semibold text-canvas/90"
              >
                <CheckIcon className="shrink-0 text-accent" width={17} height={17} />
                {t(`badges.${key}`)}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
