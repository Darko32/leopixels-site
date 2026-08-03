import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { DisplayHeading, Eyebrow } from '@/components/ui/Typography';

/**
 * Dark band #2. The anti-lock-in guarantee from 01_BUSINESS_MODEL.md §3, given
 * visual weight matching its rhetorical weight — it is the objection-killer and
 * the one promise competitors in this niche will not match, because lock-in is
 * their business model.
 *
 * Deliberately sparse: no card, no icons, nothing to look at but the sentence.
 */
export async function Guarantee() {
  const t = await getTranslations('home.guarantee');

  return (
    <Section tone="ink">
      <Container className="flex flex-col gap-8">
        <Reveal staggerChildren className="flex flex-col gap-7">
          <Eyebrow delay={0} tone="ink">
            {t('eyebrow')}
          </Eyebrow>

          <DisplayHeading delay={1} className="max-w-[16ch] text-canvas">
            {t('title')}
          </DisplayHeading>

          <p
            className="reveal max-w-[58ch] text-lead text-body-invert"
            style={{ '--i': 2 } as React.CSSProperties}
          >
            {t('body')}
          </p>

          <p
            className="reveal max-w-[58ch] font-semibold text-accent"
            style={{ '--i': 3 } as React.CSSProperties}
          >
            {t('closing')}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
