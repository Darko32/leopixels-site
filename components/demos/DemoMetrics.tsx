import { getTranslations } from 'next-intl/server';
import type { DemoConfig } from '@/demos';

const ORDER = ['pagespeed', 'lcp', 'weight', 'buildTime'] as const;

/**
 * Renders only metrics that are actually present. Every value here is measured
 * — `pagespeed` and `lcp` stay absent until a real PageSpeed run has happened
 * against the deployed URL. Showing three honest numbers beats four where one
 * is a guess, and the section hides itself entirely rather than invent any.
 */
export async function DemoMetrics({ demo }: { demo: DemoConfig }) {
  const t = await getTranslations('caseStudy');

  const entries = ORDER.map((key) => ({ key, value: demo.meta.metrics[key] })).filter(
    (entry): entry is { key: (typeof ORDER)[number]; value: string | number } =>
      entry.value !== undefined
  );

  if (entries.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-h3 text-text">{t('metricsHeading')}</h2>
      <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {entries.map((entry) => (
          <div key={entry.key} className="flex flex-col gap-1 border-t-2 border-line pt-4">
            <dt className="text-[0.8125rem] font-semibold">{t(`metrics.${entry.key}`)}</dt>
            <dd className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-tight tracking-[-0.02em] text-text">
              {entry.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
