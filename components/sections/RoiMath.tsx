import type { CSSProperties } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { adsLeadCost, pricingFor } from '@/content/site';
import { formatMoney } from '@/lib/money';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Lead, SectionHeading } from '@/components/ui/Typography';

/**
 * The argument that actually closes a trades owner: it is arithmetic, not
 * persuasion, so it is drawn rather than described.
 *
 * Two figures side by side — what one lead costs, what a month of this costs —
 * over one shared scale running from $0 to the top of the Google Ads range,
 * with the monthly fee marked on it. That marker landing *inside* the price of
 * a single lead is the whole point, and it reads before a word of copy does.
 *
 * On a phone the chart comes straight after the headline and the paragraphs
 * follow it; from `lg` the copy holds the left column and the chart the right.
 * The DOM order is the phone order, so a screen reader also meets the claim,
 * then the evidence, then the explanation.
 *
 * Every number is read from content/site.ts, and the source line stays under
 * the chart. Quoting a benchmark and naming where it came from is more
 * persuasive to this buyer than an unattributed number.
 */
export async function RoiMath() {
  const t = await getTranslations('home.roi');
  const fees = pricingFor(await getLocale());

  const scale = adsLeadCost.max;
  const at = (amount: number) => `${(amount / scale) * 100}%`;

  return (
    <Section>
      <Container className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-rows-[auto_1fr] lg:gap-y-6">
        <Reveal staggerChildren className="lg:col-start-1 lg:row-start-1">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} measure="wide" />
        </Reveal>

        <Reveal className="flex flex-col gap-6 rounded-panel border border-line bg-canvas-alt p-4 sm:gap-7 sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="grid gap-3 sm:grid-cols-2">
            <Figure
              tone="ads"
              label={t('compare.ads.label')}
              value={`${formatMoney(adsLeadCost.min)}–${formatMoney(adsLeadCost.max)}`}
              unit={t('compare.ads.unit')}
              caption={t('compare.ads.caption')}
            />
            <Figure
              tone="leo"
              label={t('compare.leo.label')}
              value={formatMoney(fees.monthlyFee)}
              unit={t('compare.leo.unit')}
              caption={t('compare.leo.caption')}
            />
          </div>

          {/* The shared scale. Decorative: both figures above already state
              every number it draws. */}
          <div aria-hidden="true" className="flex flex-col gap-2.5 px-1">
            <div className="relative h-3 rounded-full bg-line">
              <span
                className="absolute inset-y-0 right-0 rounded-full bg-ink"
                style={{ left: at(adsLeadCost.min) }}
              />
              <span
                className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-canvas-alt bg-accent shadow-[0_2px_8px_hsl(38_92%_30%/.4)]"
                style={{ left: at(fees.monthlyFee) }}
              />
            </div>
            <div className="relative h-5 text-caption font-semibold tabular-nums">
              <span className="absolute left-0 text-body">{formatMoney(0)}</span>
              <ScaleLabel left={at(adsLeadCost.min)} className="text-text">
                {formatMoney(adsLeadCost.min)}
              </ScaleLabel>
              <ScaleLabel left={at(fees.monthlyFee)} className="text-accent-deep">
                {formatMoney(fees.monthlyFee)}
              </ScaleLabel>
              <span className="absolute right-0 text-text">{formatMoney(adsLeadCost.max)}</span>
            </div>
          </div>

          <p className="border-t border-line pt-4 text-caption text-body">{t('source')}</p>
        </Reveal>

        <Reveal staggerChildren className="flex flex-col gap-6 lg:col-start-1 lg:row-start-2">
          <Lead delay={0}>{t('lead')}</Lead>

          <p
            className="reveal max-w-[46ch] border-l-2 border-accent pl-5 text-lead text-text"
            style={{ '--i': 1 } as CSSProperties}
          >
            {t('point')}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * One cost, stated large. The Google Ads figure is set on ink so the two read
 * as opposites at a glance; the monthly fee is the light card ringed in the
 * accent, the one the eye is meant to settle on.
 */
function Figure({
  tone,
  label,
  value,
  unit,
  caption,
}: {
  tone: 'ads' | 'leo';
  label: string;
  value: string;
  unit: string;
  caption: string;
}) {
  const isLeo = tone === 'leo';

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-card p-5',
        isLeo ? 'bg-canvas ring-2 ring-accent' : 'bg-ink'
      )}
    >
      <p className={cn('text-caption font-semibold', isLeo ? 'text-body' : 'text-body-invert')}>
        {label}
      </p>
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span
          className={cn(
            'text-[clamp(1.625rem,1.3rem+1vw,2rem)] font-extrabold leading-none tracking-[-0.03em] tabular-nums',
            isLeo ? 'text-text' : 'text-canvas'
          )}
        >
          {value}
        </span>
        <span className={cn('text-caption font-bold', isLeo ? 'text-accent-deep' : 'text-accent')}>
          {unit}
        </span>
      </p>
      <p className={cn('text-caption', isLeo ? 'text-body' : 'text-body-invert')}>{caption}</p>
    </div>
  );
}

function ScaleLabel({
  left,
  className,
  children,
}: {
  left: string;
  className: string;
  children: string;
}) {
  return (
    <span className={cn('absolute -translate-x-1/2', className)} style={{ left }}>
      {children}
    </span>
  );
}
