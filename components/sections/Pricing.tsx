import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { pricing } from '@/content/site';
import { formatMoney } from '@/lib/money';
import { pricingIncludeKeys, pricingTeaserIncludeKeys } from '@/content/sections';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Typography';
import { ArrowRightIcon, CheckIcon } from '@/components/ui/icons';
import type { SectionVariant } from './variant';

/**
 * One offer, stated plainly. Growth and Authority plans and the add-on menu are
 * deliberately absent — never present three options; for a $500 decision,
 * choice is friction.
 *
 * The two numbers are the thing a visitor scrolls for, so they are the largest
 * type in the section and sit side by side with a rule between them — on a
 * phone too, where stacking them would split the offer across a scroll. One is
 * paid once, one is paid monthly, and nothing else in the card competes.
 *
 * The homepage card names three things the monthly fee covers, so the second
 * number is never just a number; the full list stays on /pricing.
 */
export async function PricingSection({ variant = 'page' }: { variant?: SectionVariant }) {
  const t = await getTranslations('home.pricing');
  const tCta = await getTranslations('cta');

  const isTeaser = variant === 'teaser';

  return (
    // See the note in HowItWorks: the id serves old inbound links, not the nav.
    <Section id={isTeaser ? 'pricing' : undefined} tone="alt">
      <Container className="flex flex-col gap-block">
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
          className={cn('grid gap-6', !isTeaser && 'md:grid-cols-2 md:items-stretch md:gap-8')}
        >
          <div
            className={cn(
              'reveal grid gap-7 rounded-panel border border-line bg-canvas p-5 shadow-[0_1px_3px_hsl(215_25%_12%/.05),0_18px_44px_hsl(215_25%_12%/.07)] sm:p-9',
              // On the homepage the card owns the full column, so the offer
              // takes the left of it and the action the right. Beside the
              // includes list on /pricing there is no room for that, and the
              // same card stacks instead — as it does below `lg`, where a
              // fixed action column would leave the two prices no room.
              isTeaser && 'lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-10'
            )}
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2">
                <Price
                  amount={formatMoney(pricing.buildFee)}
                  label={t('buildLabel')}
                  className="pr-4 sm:pr-8"
                />
                <Price
                  amount={formatMoney(pricing.monthlyFee)}
                  suffix={t('monthlySuffix')}
                  label={t('monthlyLabel')}
                  className="border-l border-line pl-4 sm:pl-8"
                />
              </div>

              {isTeaser ? (
                <ul className="flex flex-wrap gap-x-6 gap-y-2.5 border-t border-line pt-5">
                  {pricingTeaserIncludeKeys.map((key) => (
                    <li key={key} className="flex items-center gap-2 text-small font-semibold text-text">
                      <CheckIcon className="shrink-0 text-positive" width={18} height={18} />
                      {t(`includesShort.${key}`)}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div
              className={cn(
                'flex flex-col gap-3.5',
                isTeaser && 'lg:border-l lg:border-line lg:py-2 lg:pl-10'
              )}
            >
              <Button href="/#get-a-demo" size="lg" className="group w-full">
                {tCta('freeDemo')}
                <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <p className="text-caption text-body">{t('note')}</p>
            </div>
          </div>

          {isTeaser ? null : (
            <div
              className="reveal flex flex-col gap-5 rounded-panel border border-line bg-canvas p-6 sm:p-9"
              style={{ '--i': 1 } as CSSProperties}
            >
              <h2 className="text-h3 text-text">{t('includesHeading')}</h2>
              <CheckList
                className="text-small"
                items={pricingIncludeKeys.map((key) => t(`includes.${key}`))}
              />
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

function Price({
  amount,
  suffix,
  label,
  className,
}: {
  amount: string;
  /** Billing period, set small beside the figure ("/month"). */
  suffix?: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={cn('flex flex-col gap-2', className)}>
      <span className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
        <span className="text-[clamp(2.25rem,1.7rem+2.4vw,3.5rem)] font-extrabold leading-none tracking-[-0.035em] tabular-nums text-text">
          {amount}
        </span>
        {suffix ? <span className="text-small font-bold text-body">{suffix}</span> : null}
      </span>
      <span className="text-small text-body">{label}</span>
    </p>
  );
}
