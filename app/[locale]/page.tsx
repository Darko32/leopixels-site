import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { ProofStrip } from '@/components/sections/ProofStrip';
import { DemoShowcase } from '@/components/sections/DemoShowcase';
import { RoiMath } from '@/components/sections/RoiMath';
import { WhatYouGet } from '@/components/sections/WhatYouGet';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { PricingSection } from '@/components/sections/Pricing';
import { Guarantee } from '@/components/sections/Guarantee';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCta } from '@/components/sections/FinalCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata({ locale, path: '/', namespace: 'home.meta', absoluteTitle: true });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ProofStrip />
      <DemoShowcase locale={locale} />
      <RoiMath />
      <WhatYouGet />
      {/* The process, the price and the questions each own a route of their
          own. What stays here is the short version that links through — the
          page still answers "what does it cost" without a click. */}
      <HowItWorks variant="teaser" />
      <PricingSection variant="teaser" />
      <Guarantee />
      <FaqSection variant="teaser" />
      <FinalCta locale={locale} />
    </>
  );
}
