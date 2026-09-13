import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { proofKeys } from '@/content/sections';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { BoltIcon, GaugeIcon, KeyIcon, ShieldIcon } from '@/components/ui/icons';

const icons = {
  demo: BoltIcon,
  weight: GaugeIcon,
  ownership: KeyIcon,
  cancel: ShieldIcon,
} as const;

/**
 * Four verifiable claims, directly under the hero. No logo wall, no testimonial
 * carousel, no "sites launched" counter — there are no clients yet, and
 * inventing social proof on a page whose whole argument is honesty would be the
 * worst possible trade.
 *
 * On a phone each claim is a row — icon beside the text rather than stacked
 * above it — so the four read as one compact list instead of four screens of
 * scrolling. From `sm` they become columns.
 */
export async function ProofStrip() {
  const t = await getTranslations('home.proof');

  return (
    <section className="border-b border-line bg-canvas py-section-tight">
      <Container size="wide">
        <Reveal staggerChildren>
          <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2 sm:gap-y-9 lg:grid-cols-4">
            {proofKeys.map((key, index) => {
              const Icon = icons[key];
              return (
                <li
                  key={key}
                  className="reveal grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-1 sm:flex sm:flex-col sm:gap-2.5 lg:border-l lg:border-line lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
                  style={{ '--i': index } as CSSProperties}
                >
                  <span className="row-span-2 flex size-10 items-center justify-center rounded-card bg-accent-wash text-accent-deep">
                    <Icon />
                  </span>
                  <p className="text-h3 text-text">{t(`${key}.label`)}</p>
                  <p className="max-w-[34ch] text-small">{t(`${key}.detail`)}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
