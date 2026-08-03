import { getTranslations } from 'next-intl/server';
import { getFeaturedDemos } from '@/demos';
import type { Locale } from '@/i18n/routing';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/Typography';
import { DemoGrid } from '@/components/demos/DemoGrid';

/** The centrepiece — placed above pricing, so the work is seen before the price. */
export async function DemoShowcase({ locale }: { locale: Locale }) {
  const t = await getTranslations('home.demos');
  const tCta = await getTranslations('cta');

  const demos = getFeaturedDemos();

  return (
    <Section id="demos" tone="alt">
      <Container size="wide" className="flex flex-col gap-12">
        <Reveal staggerChildren>
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
        </Reveal>

        {demos.length > 0 ? (
          <>
            <DemoGrid demos={demos} locale={locale} />
            <Reveal className="flex justify-center">
              <Button href="/demos" variant="ghost">
                {tCta('allDemos')}
              </Button>
            </Reveal>
          </>
        ) : (
          <Reveal>
            <p className="text-lead">{t('empty')}</p>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
