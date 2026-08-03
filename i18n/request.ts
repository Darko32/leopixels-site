import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    // Both locales quote the same USD offer — only the language changes.
    formats: {
      number: {
        usd: { style: 'currency', currency: 'USD', maximumFractionDigits: 0 },
      },
    },
  };
});
