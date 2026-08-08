import { getTranslations } from 'next-intl/server';
import { TRADES } from '@/demos/_schema';
import type { Locale } from '@/i18n/routing';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { DisplayHeading, Eyebrow, Lead } from '@/components/ui/Typography';
import { DemoRequestForm } from '@/components/forms/DemoRequestForm';

/**
 * Dark band #3, and the end of the page. The form is here rather than behind a
 * link — the visitor has just read the guarantee and the FAQ, and sending them
 * to another page to convert would waste that.
 */
export async function FinalCta({ locale }: { locale: Locale }) {
  const t = await getTranslations('home.finalCta');
  const tForm = await getTranslations('form');
  const tTrades = await getTranslations('trades');

  return (
    <Section id="get-a-demo" tone="ink">
      <Container className="grid gap-14 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-start lg:gap-20">
        <Reveal staggerChildren className="flex flex-col gap-6">
          <Eyebrow delay={0} tone="ink">
            {t('eyebrow')}
          </Eyebrow>

          <DisplayHeading delay={1} className="text-canvas">
            {t('title')}
          </DisplayHeading>

          <Lead delay={2} className="text-body-invert">
            {t('lead')}
          </Lead>

          <p
            className="reveal font-semibold text-accent"
            style={{ '--i': 3 } as React.CSSProperties}
          >
            {t('reassurance')}
          </p>
        </Reveal>

        <Reveal className="rounded-panel bg-canvas px-4 py-5 shadow-[0_24px_60px_hsl(220_40%_2%/.4)] sm:p-7 md:p-9">
          <DemoRequestForm
            locale={locale}
            trades={TRADES.map((trade) => ({ value: trade, label: tTrades(trade) }))}
            copy={{
              business: { label: tForm('business.label'), placeholder: tForm('business.placeholder') },
              trade: { label: tForm('trade.label'), placeholder: tForm('trade.placeholder') },
              city: { label: tForm('city.label'), placeholder: tForm('city.placeholder') },
              contact: { label: tForm('contact.label'), placeholder: tForm('contact.placeholder') },
              submit: tForm('submit'),
              submitting: tForm('submitting'),
              privacyNote: tForm('privacyNote'),
            }}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
