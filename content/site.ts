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
   * under the brand. Flip to true only after the QA gate passes, then submit
   * the site to Google Search Console.
   *
   * The old placeholder site had the same guard as a hand-written meta tag; the
   * README warned that forgetting to remove it means the real site never ranks.
   * This is that guard, in one place instead of two files.
   */
  indexable: false,

  // TODO(open item): confirm the real inbox before launch. Used in the footer,
  // the Organization schema and lead notifications.
  email: 'hello@leopixels.com',

  /** Where LeoPixels sells. Feeds Organization.areaServed — no fabricated local address. */
  areaServed: 'US',

  /** In-page anchors, in header-nav order. Labels come from messages nav.*. */
  nav: [
    { key: 'demos', href: '/demos' },
    { key: 'howItWorks', href: '/#how-it-works' },
    { key: 'pricing', href: '/#pricing' },
    { key: 'faq', href: '/#faq' },
  ],
} as const;

/** The offer. One place, both locales, formatted through Intl. */
export const pricing = {
  buildFee: 500,
  monthlyFee: 149,
  currency: 'USD',
  demoTurnaroundHours: 48,
} as const;
