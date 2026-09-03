/**
 * The crawl surface: which URLs belong in the sitemaps, when they last really
 * changed, and the XML helpers the three sitemap routes render with.
 *
 * Everything here derives from existing sources of truth — `demos` for the
 * slugs, `routing` for the locales, `site` for the origin, `absoluteUrl` /
 * `languageAlternates` for the URL shapes — so a sitemap URL and the canonical
 * tag on the page it points at cannot disagree. The only thing stated by hand
 * is `lastmod`.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * ON `lastmod` — READ THIS BEFORE YOU "SIMPLIFY" IT
 * ───────────────────────────────────────────────────────────────────────────
 * The previous app/sitemap.ts stamped `new Date()` on every URL at build time,
 * so all 14 claimed to change on every deploy, including deploys that touched
 * nothing. Google's documented position is that it ignores lastmod when a
 * site's values are demonstrably unreliable, and "all URLs changed at the same
 * millisecond, again" is the textbook unreliable signal.
 *
 * So lastmod is set by hand, per page, below. Bump a date when that page's
 * CONTENT meaningfully changes. Do not bump it for CSS tweaks, dependency
 * bumps or refactors — a lastmod that moves without the content moving is the
 * same lie in a slower form.
 */

import { demos } from '@/demos';
import { newestPostLastmod, postLastmod, postLocales, publishedPosts } from '@/content/blog';
import { site } from '@/content/site';
import { routing, type Locale } from '@/i18n/routing';
import { absoluteUrl, languageAlternates } from './index';

export type SitemapEntry = {
  /** Route path, un-prefixed and un-localised. `/` for the home page. */
  path: string;
  /** ISO date (YYYY-MM-DD) of the last meaningful CONTENT change. */
  lastmod: string;
  /** 0.0–1.0. Google ignores this; Bing and Yandex still read it. Cheap to keep. */
  priority: number;
  /** Locales this page actually exists in. Defaults to all of them. */
  locales?: readonly Locale[];
};

/** The date the current copy landed. Seeded from the launch build. */
const CONTENT_LAUNCHED = '2026-08-08';

/**
 * The day the process, pricing and FAQ moved off the homepage onto routes of
 * their own. Three genuinely new URLs, and a homepage that genuinely changed —
 * it carries the short version of each now — so all four move together.
 */
const PAGES_SPLIT = '2026-09-03';

/** Marketing pages. Everything a buyer or a crawler should land on. */
export const PAGES: SitemapEntry[] = [
  { path: '/', lastmod: PAGES_SPLIT, priority: 1.0 },
  { path: '/demos', lastmod: CONTENT_LAUNCHED, priority: 0.9 },
  { path: '/pricing', lastmod: PAGES_SPLIT, priority: 0.9 },
  { path: '/how-it-works', lastmod: PAGES_SPLIT, priority: 0.8 },
  { path: '/faq', lastmod: PAGES_SPLIT, priority: 0.8 },
  ...demos.map((demo) => ({
    path: `/demos/${demo.slug}`,
    lastmod: CONTENT_LAUNCHED,
    priority: 0.8,
  })),
  // Taken from the date the policy page prints itself, so the sitemap can never
  // claim a revision the visible page does not show.
  { path: '/privacy', lastmod: site.privacyUpdated, priority: 0.2 },
];

/**
 * DELIBERATELY ABSENT, and why:
 *
 *   /thanks       Post-conversion confirmation. Nothing to rank, and an indexed
 *                 thank-you page collects organic traffic that never converted,
 *                 quietly inflating the conversion rate. It carries
 *                 `robots: { index: false }` in its own metadata export rather
 *                 than a robots.txt block — see app/robots.txt/route.ts.
 *
 *   /preview/*    The four standalone demo sites. They carry Plumber /
 *                 LocalBusiness JSON-LD with invented addresses, phone numbers
 *                 and review text for businesses that do not exist. Indexing
 *                 them risks a structured-data spam action against the whole
 *                 domain. They already serve `X-Robots-Tag: noindex, nofollow`
 *                 from vercel.json — that is the correct control and it is
 *                 already working. KEEP IT THAT WAY.
 *
 *   /_next/*      Static chunks. Never list them, and never block them either:
 *                 Googlebot renders the page and needs the CSS and JS.
 */

/**
 * The blog surface: the listing plus every published post, derived from the
 * post registry the routes render from.
 *
 * Derived rather than hand-listed, for the reason stated at the top of this
 * file — a sitemap URL and the page it points at must not be able to disagree.
 * A hand-kept array would restate each post's path, locales and date a second
 * time, and the second copy is the one that goes stale. `lastmod` is still
 * stated by hand; it is stated once, in the post's own config, as
 * `updatedAt ?? publishedAt`.
 *
 * Drafts are excluded at the registry level and never appear here.
 */
export const BLOG_POSTS: SitemapEntry[] = buildBlogEntries();

function buildBlogEntries(): SitemapEntry[] {
  if (publishedPosts.length === 0) return [];

  // `locales` per post comes from postLocales(), which reads the translations
  // that exist rather than a list stated beside them. An untranslated post
  // therefore lists only its English URL here — the Macedonian URL resolves and
  // is reachable, but it renders the English text and canonicalises to the
  // English original, so listing it would be submitting a known duplicate.
  const posts: SitemapEntry[] = publishedPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: postLastmod(post),
    priority: 0.7,
    locales: postLocales(post),
  }));

  // The listing changes whenever a post lands, so it carries the newest post's
  // date. Its own copy is translated in messages/*.json, so it exists in every
  // locale and keeps the full hreflang cluster.
  return [
    { path: '/blog', lastmod: newestPostLastmod() ?? CONTENT_LAUNCHED, priority: 0.6 },
    ...posts,
  ];
}

export const HAS_BLOG = BLOG_POSTS.length > 0;

/** Newest lastmod in a set — the <lastmod> on a sitemap index entry. */
export function newestLastmod(entries: SitemapEntry[], fallback = CONTENT_LAUNCHED): string {
  let newest = '';
  for (const entry of entries) {
    if (entry.lastmod > newest) newest = entry.lastmod;
  }
  return newest || fallback;
}

/** XML-escape. Ampersands in URLs are the classic way to ship an invalid sitemap. */
export function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * One <url> block, with the full hreflang cluster.
 *
 * The alternates come from the same `languageAlternates()` the pages use for
 * their <link rel="alternate"> tags, so the sitemap and the markup state the
 * identical cluster — a mismatch between the two is ignored outright.
 */
export function renderUrl(entry: SitemapEntry, locale: Locale, changefreq: string): string {
  const alternates = Object.entries(languageAlternates(entry.path, entry.locales))
    .map(
      ([hreflang, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${xmlEscape(href)}" />`
    )
    .join('\n');

  return [
    '  <url>',
    `    <loc>${xmlEscape(absoluteUrl(locale, entry.path))}</loc>`,
    alternates,
    `    <lastmod>${entry.lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${entry.priority.toFixed(1)}</priority>`,
    '  </url>',
  ].join('\n');
}

/** Wrap <url> blocks in a urlset with the namespaces the hreflang markup needs. */
export function renderUrlset(blocks: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join('\n')}
</urlset>
`;
}

/** Locales an entry is published in. */
export function entryLocales(entry: SitemapEntry): readonly Locale[] {
  return entry.locales ?? routing.locales;
}

/**
 * Crawlers re-fetch these often. An hour of CDN cache with a day of
 * stale-while-revalidate keeps them cheap without going stale on a deploy.
 */
const CRAWLER_CACHE = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400';

export const XML_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': CRAWLER_CACHE,
} as const;

export const TEXT_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': CRAWLER_CACHE,
} as const;
