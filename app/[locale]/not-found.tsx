import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { DisplayHeading, Lead } from '@/components/ui/Typography';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <Section>
      <Container className="flex flex-col items-start gap-6">
        <DisplayHeading as="h1" className="text-h2">
          {t('title')}
        </DisplayHeading>
        <Lead>{t('lead')}</Lead>
        <Button href="/">{t('home')}</Button>
      </Container>
    </Section>
  );
}
