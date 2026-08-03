import { getTranslations } from 'next-intl/server';
import { getFeaturedDemos, localized } from '@/demos';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button, ExternalButton } from '@/components/ui/Button';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { DisplayHeading, Eyebrow, Lead } from '@/components/ui/Typography';
import { CheckIcon } from '@/components/ui/icons';
import { DemoScreenshot } from '@/components/demos/DemoScreenshot';

/**
 * Dark band #1 of three. The demo screenshot reads as a lit object against the
 * ink, which is the strongest opening the page can make: proof above the fold,
 * before a single claim has to be believed.
 */
export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations('home.hero');
  const tCta = await getTranslations('cta');

  const [lead] = getFeaturedDemos();

  return (
    <section className="bg-ink pb-[clamp(64px,9vw,110px)] pt-[clamp(56px,8vw,96px)] text-body-invert">
      <Container size="wide">
        <Reveal staggerChildren className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow delay={0} tone="ink">
              {t('eyebrow')}
            </Eyebrow>

            <DisplayHeading as="h1" delay={1} className="text-canvas">
              {t('title')}
            </DisplayHeading>

            <Lead delay={2} className="text-body-invert">
              {t('lead')}
            </Lead>

            <div className="reveal flex flex-wrap gap-3 pt-2" style={{ '--i': 3 } as React.CSSProperties}>
              <Button href="/#get-a-demo" size="lg">
                {tCta('freeDemo')}
              </Button>
              <Button href="/demos" variant="inverse" size="lg">
                {tCta('seeDemos')}
              </Button>
            </div>

            <ul
              className="reveal flex flex-col gap-2.5 pt-3 sm:flex-row sm:flex-wrap sm:gap-x-7"
              style={{ '--i': 4 } as React.CSSProperties}
            >
              {(['one', 'two', 'three'] as const).map((key) => (
                <li key={key} className="flex items-center gap-2 text-[0.9375rem] font-semibold">
                  <CheckIcon className="shrink-0 text-accent" width={17} height={17} />
                  {t(`badges.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {lead ? (
            <div className="reveal flex flex-col gap-4" style={{ '--i': 3 } as React.CSSProperties}>
              <BrowserFrame tone="ink" url={`leopixels.com/preview/${lead.slug}`}>
                <DemoScreenshot
                  demo={lead}
                  alt={localized(lead.meta.screenshots.alt, locale)}
                  priority
                  sizes="(max-width: 1024px) 100vw, 620px"
                />
              </BrowserFrame>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[0.8125rem] text-body-invert/80">{t('frameCaption')}</p>
                <ExternalButton
                  href={`/preview/${lead.slug}`}
                  variant="inverse"
                  className="min-h-[44px] px-4 text-[0.8125rem]"
                >
                  {tCta('openLiveDemo')}
                </ExternalButton>
              </div>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
