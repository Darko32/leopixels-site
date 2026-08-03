import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'LeoPixels — websites for trades businesses';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Generated at build time, one per locale. Uses the palette rather than the
 * webfont — next/og would need the font file fetched and embedded, and a system
 * stack at this size is indistinguishable in a social preview.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'hsl(220, 24%, 9%)',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', width: 44, height: 44 }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: 'hsl(38,92%,50%)' }} />
            <div style={{ width: 20, height: 20, borderRadius: 5, background: 'hsl(38,92%,50%)', opacity: 0.45, marginLeft: 4 }} />
            <div style={{ width: 20, height: 20, borderRadius: 5, background: 'hsl(38,92%,50%)', opacity: 0.45, marginTop: 4 }} />
            <div style={{ width: 20, height: 20, borderRadius: 5, background: 'hsl(38,92%,50%)', marginTop: 4, marginLeft: 4 }} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            LeoPixels
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 68,
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: 900,
          }}
        >
          {t('title')}
        </div>

        <div style={{ display: 'flex', gap: 28, fontSize: 26, color: 'hsl(215,18%,76%)' }}>
          <span>{t('badges.one')}</span>
          <span style={{ color: 'hsl(38,92%,50%)' }}>·</span>
          <span>{t('badges.three')}</span>
        </div>
      </div>
    ),
    size
  );
}
