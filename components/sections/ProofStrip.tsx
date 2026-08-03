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
 * Four verifiable claims. No logo wall, no testimonial carousel, no "sites
 * launched" counter — there are no clients yet, and inventing social proof on
 * a page whose whole argument is honesty would be the worst possible trade.
 */
export async function ProofStrip() {
  const t = await getTranslations('home.proof');

  return (
    <section className="border-b border-line bg-canvas py-14">
      <Container size="wide">
        <Reveal staggerChildren>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {proofKeys.map((key, index) => {
              const Icon = icons[key];
              return (
                <li
                  key={key}
                  className="reveal flex flex-col gap-2"
                  style={{ '--i': index } as CSSProperties}
                >
                  <Icon className="text-accent-deep" />
                  <p className="text-h3 text-text">{t(`${key}.label`)}</p>
                  <p className="text-[0.9375rem]">{t(`${key}.detail`)}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
