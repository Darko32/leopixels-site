import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/Typography';

/**
 * The argument that actually closes a trades owner, per
 * 05_CONVERSION_AND_PAYMENT.md §3 — it is arithmetic, not persuasion.
 *
 * The source line stays: quoting a benchmark and naming where it came from is
 * more persuasive to this buyer than an unattributed number, and it keeps the
 * page honest.
 */
export async function RoiMath() {
  const t = await getTranslations('home.roi');

  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <Reveal staggerChildren>
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
        </Reveal>

        <Reveal className="flex flex-col gap-6">
          <p className="max-w-[52ch] border-l-4 border-accent pl-6 text-lead text-text">
            {t('point')}
          </p>
          <p className="text-[0.8125rem] text-body/80">{t('source')}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
