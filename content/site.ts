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
   * In-page anchors, in header-nav order. Labels come from messages nav.*.
   *
   * Render this through `navItems()` in lib/nav.ts rather than mapping it
   * directly: `blog` is gated on a post existing, because /blog 404s while the
   * registry is empty and a nav link to a 404 is worse than no link.
   */
  nav: [
    { key: 'demos', href: '/demos' },
    { key: 'howItWorks', href: '/#how-it-works' },
    { key: 'pricing', href: '/#pricing' },
    { key: 'faq', href: '/#faq' },
    { key: 'blog', href: '/blog' },
  ],
} as const;

/** The offer. One place, both locales, formatted through Intl. */
export const pricing = {
  buildFee: 500,
  monthlyFee: 149,
  currency: 'USD',
  demoTurnaroundHours: 48,
} as const;
