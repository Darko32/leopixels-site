/**
 * Non-linguistic site facts. Every string that a visitor reads lives in
 * messages/<locale>.json — this file holds only things that do not translate.
 */
export const site = {
  name: 'LeoPixels',
  domain: 'leopixels.com',
  url: 'https://leopixels.com',

  /**
   * ⛔ THE LAUNCH SWITCH.
   *
   * While false, every marketing route carries `noindex, nofollow` and
   * robots.txt disallows everything — so a half-built page can never be indexed
   * under the brand.
   *
   * OPEN as of launch. The QA gate has passed and the site is live, so this is
   * true and the pages are crawlable. It stays here rather than being deleted
   * because it is the only kill switch that closes the whole domain in one
   * commit. Do not flip it back to false casually: dropping out of the index is
   * fast, getting back in is not.
   *
   * `/preview/*` and `/thanks` are excluded independently of this flag and are
   * unaffected by it.
   */
  indexable: true,

  // TODO(open item): confirm the real inbox before launch. Used in the footer,
  // the Organization schema and lead notifications.
  email: 'darko@leopixels.com',

  /** Where LeoPixels sells. Feeds Organization.areaServed — no fabricated local address. */
  areaServed: 'US',

  /**
   * ISO date the privacy policy text last changed. Rendered on the page and
   * used as its sitemap `lastmod`, so the visible date and the crawler-facing
   * one can never disagree — that inconsistency is exactly what gets a
   * sitemap's dates discounted. Bump when the policy copy changes.
   */
  privacyUpdated: '2026-08-01',

  /**
   * Top-level routes, in header-nav order. Labels come from messages nav.*.
   *
   * Every entry is a real page. The process, the price and the FAQ used to be
   * homepage anchors (`/#pricing` and friends); they are routes now, so each
   * one is a URL that can be linked, shared and ranked on its own terms.
   *
   * Render this through `navItems()` in lib/nav.ts rather than mapping it
   * directly: `blog` is gated on a post existing, because /blog 404s while the
   * registry is empty and a nav link to a 404 is worse than no link.
   */
  nav: [
    { key: 'demos', href: '/demos' },
    { key: 'howItWorks', href: '/how-it-works' },
    { key: 'pricing', href: '/pricing' },
    { key: 'faq', href: '/faq' },
    { key: 'blog', href: '/blog' },
  ],
} as const;

/**
 * What a trades business pays for one lead through Google Ads. Not our number:
 * it is the WebFX 2026 home-services benchmark already quoted in the ROI copy,
 * lifted out of that sentence so the comparison chart and the sentence cannot
 * drift apart. The attribution is rendered under the chart.
 */
export const adsLeadCost = {
  min: 100,
  max: 250,
} as const;

/**
 * The offer. Priced per locale: the English and Macedonian sites sell into
 * different markets, so they carry different amounts in the same currency
 * rather than one amount converted into another.
 *
 * Read it through `pricingFor(locale)`. Nothing should reach into a locale's
 * figures directly, or the two pages drift the first time one of them changes.
 */
export const pricing = {
  currency: 'EUR',
  demoTurnaroundHours: 48,
  byLocale: {
    en: { buildFee: 450, monthlyFee: 99 },
    mk: { buildFee: 139, monthlyFee: 20 },
  },
} as const;

/** Anything but `mk` gets the English figures — the default locale is unprefixed. */
export function pricingFor(locale: string) {
  return locale === 'mk' ? pricing.byLocale.mk : pricing.byLocale.en;
}
