import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'mk'],
  defaultLocale: 'en',

  // English is unprefixed at `/`, Macedonian lives under `/mk`. Keeps the
  // canonical English URLs — the ones a cold-email prospect lands on — at the
  // root, with no redirect hop.
  localePrefix: 'as-needed',

  // Never auto-redirect on Accept-Language. Google advises against forced
  // language redirects, and a US trades owner must always land on English.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
