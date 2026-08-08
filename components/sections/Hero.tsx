import { getImageProps } from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { DisplayHeading, Eyebrow, Lead } from '@/components/ui/Typography';
import { CheckIcon } from '@/components/ui/icons';

/**
 * Below `sm` a dedicated portrait photo loads instead of the desktop landscape
 * one. This is art direction, not a resize — a phone-shaped crop of a wide
 * frame either loses the subject or has to be zoomed, so the two shots are
 * genuinely different images and `<picture>` picks between them.
 */
const MOBILE_MEDIA = '(max-width: 639px)';

/** Shared between both crops: both are the LCP element, both are full-bleed. */
const heroImage = { alt: '', fill: true, priority: true, sizes: '100vw' } as const;

/**
 * Dark band #1 of three. A full-bleed photo of the trade the sites are built
 * for, with the copy in the frame's negative space — proof of who this is for,
 * before a single claim has to be believed.
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
    <section className="relative isolate flex min-h-[clamp(440px,118vw,560px)] items-center overflow-hidden bg-ink py-[clamp(48px,10vw,72px)] text-body-invert sm:min-h-[clamp(560px,72vw,660px)] sm:py-[clamp(72px,15vw,104px)] lg:min-h-[clamp(630px,54.6vw,756px)] lg:py-[clamp(80px,9vw,104px)]">
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
          the full width there; from `sm` up it is anchored to the left so the
          professional and their toolbox on the right stay unobscured. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,hsl(220_24%_5%/.62)_0%,hsl(220_24%_5%/.42)_35%,hsl(220_24%_5%/.32)_62%,hsl(220_24%_5%/.48)_100%)] sm:bg-[linear-gradient(100deg,hsl(220_24%_5%/.94)_0%,hsl(220_24%_5%/.82)_40%,hsl(220_24%_5%/.35)_68%,hsl(220_24%_5%/0)_88%)] lg:bg-[linear-gradient(100deg,hsl(220_24%_5%/.93)_0%,hsl(220_24%_5%/.78)_30%,hsl(220_24%_5%/.22)_58%,hsl(220_24%_5%/0)_72%)]"
      />

      <Container size="wide" className="relative z-10">
        <Reveal staggerChildren className="flex max-w-[540px] flex-col gap-4 sm:gap-6 lg:max-w-[62%]">
          <Eyebrow delay={0} tone="ink" style={{ fontSize: '18px' }}>
            {t('eyebrow')}
          </Eyebrow>

          <DisplayHeading
            as="h1"
            delay={1}
            className="text-canvas"
            style={{ 
              fontSize: 'clamp(1.638rem, calc(3.99vw + 1.14px), 3.206rem)',
              lineHeight: '1.3'
             }}
          >
            {t('title')}
          </DisplayHeading>

          <Lead delay={2} className="text-body-invert">
            {t('lead')}
          </Lead>

          <div className="reveal flex flex-nowrap gap-2 pt-1 sm:gap-3 sm:pt-2" style={{ '--i': 3 } as React.CSSProperties}>
            <Button
              href="/#get-a-demo"
              size="lg"
              className="min-h-[44px] px-[10px] text-[14px] sm:min-h-[60px] sm:px-8 sm:text-base"
            >
              {tCta('freeDemo')}
            </Button>
            <Button
              href="/demos"
              variant="inverse"
              size="lg"
              className="min-h-[44px] px-[10px] text-[14px] sm:min-h-[60px] sm:px-8 sm:text-base"
            >
              {tCta('seeDemos')}
            </Button>
          </div>

          <ul
            className="reveal flex flex-col gap-2.5 pt-1.5 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:pt-3"
            style={{ '--i': 4 } as React.CSSProperties}
          >
            {(['one', 'two', 'three'] as const).map((key) => (
              <li key={key} className="flex items-center gap-2 text-[0.9375rem] font-semibold">
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
