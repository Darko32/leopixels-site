import { getFormatter, getTranslations } from 'next-intl/server';
import { pricing } from '@/content/site';
import { pricingIncludeKeys } from '@/content/sections';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Typography';

/**
 * One offer, stated plainly. Growth and Authority plans and the add-on menu
 * are deliberately absent: 05_CONVERSION_AND_PAYMENT.md §3 — "never present
 * three options; for a $500 decision, choice is friction".
 */
export async function PricingSection() {
  const t = await getTranslations('home.pricing');
  const tCta = await getTranslations('cta');
  const format = await getFormatter();

  const money = (amount: number) =>
    format.number(amount, { style: 'currency', currency: pricing.currency, maximumFractionDigits: 0 });

  return (
    <Section id="pricing" tone="alt">
      <Container className="flex flex-col gap-12">
        <Reveal staggerChildren>
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
        </Reveal>

        <Reveal staggerChildren className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="reveal flex flex-col gap-8 rounded-panel border border-line bg-canvas p-8 sm:p-10">
            <div className="flex flex-wrap gap-x-10 gap-y-6">
              <p className="flex flex-col">
                <span className="text-[clamp(2.25rem,5vw,3.25rem)] font-extrabold leading-none tracking-[-0.03em] text-text">
                  {money(pricing.buildFee)}
                </span>
                <span className="pt-1.5 text-[0.9375rem]">{t('buildLabel')}</span>
              </p>
              <p className="flex flex-col">
                <span className="text-[clamp(2.25rem,5vw,3.25rem)] font-extrabold leading-none tracking-[-0.03em] text-text">
                  {money(pricing.monthlyFee)}
                </span>
                <span className="pt-1.5 text-[0.9375rem]">{t('monthlyLabel')}</span>
              </p>
            </div>

            <Button href="/#get-a-demo" size="lg" className="w-full">
              {tCta('freeDemo')}
            </Button>

            <p className="text-[0.875rem]">{t('note')}</p>
          </div>

          <div className="reveal flex flex-col gap-5" style={{ '--i': 1 } as React.CSSProperties}>
            <h3 className="text-h3 text-text">{t('includesHeading')}</h3>
            <CheckList items={pricingIncludeKeys.map((key) => t(`includes.${key}`))} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
