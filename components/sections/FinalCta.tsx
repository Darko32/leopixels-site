import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { TRADES } from '@/demos/_schema';
import { site } from '@/content/site';
import type { Locale } from '@/i18n/routing';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { DisplayHeading, Eyebrow, Lead } from '@/components/ui/Typography';
import { CheckIcon, MailIcon } from '@/components/ui/icons';
import { DemoRequestForm } from '@/components/forms/DemoRequestForm';

const POINTS = ['one', 'two', 'three'] as const;

/**
 * Dark band #3, and the end of the page. The form is here rather than behind a
 * link — the visitor has just read the guarantee and the FAQ, and sending them
 * to another page to convert would waste that.
 *
 * The headline asks the question the whole page has been building to. The terms
 * of the free demo are three scannable points rather than a sentence, and the
 * form opens with its own title and a note on how short it is, so the panel
 * reads as the next step rather than a block of inputs.
 */
export async function FinalCta({ locale }: { locale: Locale }) {
  const t = await getTranslations('home.finalCta');
  const tForm = await getTranslations('form');
  const tTrades = await getTranslations('trades');

  return (
    <Section id="get-a-demo" tone="ink">
      <Container className="grid gap-10 lg:grid-cols-[1fr_minmax(0,500px)] lg:items-center lg:gap-20">
        <Reveal staggerChildren className="flex flex-col gap-5">
          <Eyebrow delay={0} tone="ink">
            {t('eyebrow')}
          </Eyebrow>

          <DisplayHeading delay={1} className="max-w-[16ch] text-canvas">
            {t('title')}
          </DisplayHeading>

          <Lead delay={2} className="max-w-[44ch] text-body-invert">
            {t('lead')}
          </Lead>

          <ul className="reveal flex flex-col gap-3 pt-1" style={{ '--i': 3 } as CSSProperties}>
            {POINTS.map((key) => (
              <li key={key} className="flex items-center gap-3 font-semibold text-canvas">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[hsl(38_92%_50%/.14)] text-accent">
                  <CheckIcon width={16} height={16} />
                </span>
                {t(`points.${key}`)}
              </li>
            ))}
          </ul>

          <div
            className="reveal flex flex-col gap-2 border-t border-line-invert pt-5"
            style={{ '--i': 4 } as CSSProperties}
          >
            <p className="text-small font-semibold text-accent">{t('reassurance')}</p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-body-invert">
              {t('orEmail')}
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1.5 font-semibold text-canvas hover:underline"
              >
                <MailIcon />
                {site.email}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal className="rounded-panel bg-canvas p-5 shadow-[0_24px_60px_hsl(220_40%_2%/.4)] sm:p-8">
          <div className="mb-6 flex flex-col gap-1 border-b border-line pb-5">
            <h3 className="text-h3 text-text">{t('formTitle')}</h3>
            <p className="text-caption text-body">{t('formNote')}</p>
          </div>

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
