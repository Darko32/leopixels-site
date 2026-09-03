import { getFormatter, getTranslations } from 'next-intl/server';
import { pricing } from '@/content/site';
import { pricingIncludeKeys } from '@/content/sections';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Typography';
import type { SectionVariant } from './variant';

/**
 * One offer, stated plainly. Growth and Authority plans and the add-on menu
 * are deliberately absent: 05_CONVERSION_AND_PAYMENT.md §3 — "never present
 * three options; for a $500 decision, choice is friction".
 *
 * The homepage teaser keeps the two numbers and the demo CTA — the price is the
 * thing a visitor scrolls for — and hands the "what the plan covers" list to
 * /pricing.
 */
export async function PricingSection({ variant = 'page' }: { variant?: SectionVariant }) {
  const t = await getTranslations('home.pricing');
  const tCta = await getTranslations('cta');
  const format = await getFormatter();

  const isTeaser = variant === 'teaser';

  const money = (amount: number) =>
    format.number(amount, { style: 'currency', currency: pricing.currency, maximumFractionDigits: 0 });

  return (
    // See the note in HowItWorks: the id serves old inbound links, not the nav.
    <Section id={isTeaser ? 'pricing' : undefined} tone="alt">
      <Container className="flex flex-col gap-12">
        <Reveal staggerChildren>
          <SectionHeading
            as={isTeaser ? 'h2' : 'h1'}
            eyebrow={t('eyebrow')}
            title={t('title')}
            lead={t('lead')}
          />
        </Reveal>

        <Reveal
          staggerChildren
          className={cn('grid gap-10', !isTeaser && 'md:grid-cols-2 md:items-start')}
        >
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

          {isTeaser ? null : (
            <div className="reveal flex flex-col gap-5" style={{ '--i': 1 } as React.CSSProperties}>
              <h2 className="text-h3 text-text">{t('includesHeading')}</h2>
              <CheckList items={pricingIncludeKeys.map((key) => t(`includes.${key}`))} />
            </div>
          )}
        </Reveal>

        {isTeaser ? (
          <Reveal className="flex justify-center">
            <Button href="/pricing" variant="ghost">
              {tCta('seePricing')}
            </Button>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
