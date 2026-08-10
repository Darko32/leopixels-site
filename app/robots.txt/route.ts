/**
 * /robots.txt
 *
 * A route handler rather than Next's `MetadataRoute.Robots` export, because the
 * metadata API cannot emit comments — and a robots.txt with no comments is a
 * file nobody dares touch in six months because nobody remembers what the rules
 * were for. The comments are the point.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * TWO DECISIONS THAT LOOK LIKE OVERSIGHTS AND ARE NOT
 * ───────────────────────────────────────────────────────────────────────────
 *
 * 1. `/preview/*` IS NOT BLOCKED HERE, and the previous `Disallow: /preview/`
 *    was removed deliberately. Those demo sites already return
 *    `X-Robots-Tag: noindex, nofollow` (vercel.json) plus a noindex meta tag in
 *    the generated HTML, which is the stronger control. Disallowing them makes
 *    it WEAKER, not stronger: a disallowed URL is never fetched, so the crawler
 *    never sees the noindex, and a /preview/ URL linked from anywhere can still
 *    be indexed as a bare URL with no snippet. Block-or-noindex is an
 *    either/or. Pick noindex. It is already deployed and already correct.
 *
 * 2. `/_next/` IS NOT BLOCKED. Googlebot renders the page before it judges it,
 *    and rendering needs the CSS and JS chunks. Blocking `/_next/` is the most
 *    common self-inflicted wound on a Next.js site.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * THE GOTCHA THAT BITES EVERYONE
 * ───────────────────────────────────────────────────────────────────────────
 * A crawler obeys EXACTLY ONE group: the most specific one matching its
 * user-agent. It does not merge that group with `User-agent: *`. So a file that
 * says
 *
 *     User-agent: *
 *     Disallow: /private/
 *
 *     User-agent: GPTBot
 *     Allow: /
 *
 * has just granted GPTBot access to /private/ — the exact opposite of the
 * intent. That is why DISALLOW below is rendered into every group rather than
 * only into `*`. Add a path to that array and it applies everywhere. Do not
 * hand-edit individual groups.
 */

import { NextResponse } from 'next/server';
import { site } from '@/content/site';
import { TEXT_HEADERS } from '@/lib/seo/site';

export const dynamic = 'force-static';

/**
 * Paths blocked from ALL crawlers. Empty on purpose — see note 1 above.
 * Anything added here is rendered into every group automatically.
 * Reach for `noindex` first; only use this for paths that must never be
 * FETCHED (private endpoints, staging, infinite faceted URLs).
 */
const DISALLOW: string[] = [];

/** Conventional search crawlers. */
const SEARCH_BOTS = [
  'Googlebot',
  'Googlebot-Image',
  'Googlebot-News',
  'Bingbot',
  'Slurp',
  'DuckDuckBot',
  'Applebot',
  'Yandex',
  'Naver',
  'SeznamBot',
];

/**
 * AI answer engines and training crawlers. Allowed on purpose.
 *
 * The buyer for a $500 trades website increasingly asks ChatGPT, Claude or
 * Perplexity "who builds cheap websites for plumbers" instead of typing it into
 * Google. Blocking these removes LeoPixels from those answers and returns
 * nothing in exchange — there is no paid tier being protected and no
 * proprietary content to defend. Every page here is a sales page. Being quoted
 * is the entire objective.
 *
 * If that calculus ever changes, move a name into a DISALLOW-only group. Do not
 * silently delete it — a removed name falls back to `*` and stays allowed,
 * which is not what "I removed it" feels like it should mean.
 */
const AI_BOTS = [
  // OpenAI
  'GPTBot', // training
  'OAI-SearchBot', // ChatGPT search index
  'ChatGPT-User', // live fetch when a user asks about you
  // Anthropic — current agents. `Claude-Web` is a retired name still
  // copy-pasted around the web; harmless, but these are the live ones.
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google / Apple AI surfaces. Separate opt-ins from plain search:
  // Google-Extended controls Gemini and AI Overviews grounding, Applebot-Extended
  // controls Apple Intelligence. Blocking them does NOT affect ordinary ranking.
  'Google-Extended',
  'Applebot-Extended',
  // Meta
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  // Others worth being visible in
  'Amazonbot',
  'Bytespider',
  'cohere-ai',
  'YouBot',
  'Diffbot',
  'CCBot',
  'Timpibot',
  'Webzio-Extended',
  'omgili',
  'omgilibot',
  'ImagesiftBot',
];

/**
 * Link-preview fetchers. Not indexers — these render the card when someone
 * pastes a link into a DM, a group chat or a LinkedIn post. Blocking one turns
 * every shared link into a grey box, which quietly kills click-through on
 * exactly the channel cold outreach runs through.
 */
const PREVIEW_BOTS = [
  'facebookexternalhit',
  'LinkedInBot',
  'Twitterbot',
  'Slackbot',
  'Slackbot-LinkExpanding',
  'Discordbot',
  'WhatsApp',
  'TelegramBot',
  'Pinterestbot',
  'redditbot',
];

/** One group, with the shared Disallow rules baked in. See the gotcha above. */
function group(agents: string[]): string {
  const rules = ['Allow: /', ...DISALLOW.map((path) => `Disallow: ${path}`)].join('\n');
  return `${agents.map((agent) => `User-agent: ${agent}`).join('\n')}\n${rules}`;
}

export function GET() {
  // Pre-launch kill switch — see site.indexable in content/site.ts. One group,
  // no sitemap line, nothing to misread.
  if (!site.indexable) {
    return new NextResponse('User-agent: *\nDisallow: /\n', { headers: TEXT_HEADERS });
  }

  const body = `# robots.txt for ${site.domain}
# ${site.name} — one-page websites for plumbers, HVAC, electricians and roofers.
#
# Everything on this domain is a sales page. There is nothing to hide from a
# crawler, so the default is open and the exceptions are documented in
# app/robots.txt/route.ts.
#
# /preview/* is intentionally NOT disallowed here. Those demo sites carry
# noindex response headers, which is the stronger control — blocking them in
# this file would stop crawlers ever reading that header. Do not "fix" it.

# ===========================================================================
# Default — every crawler not named below
# ===========================================================================
${group(['*'])}

# ===========================================================================
# Search engines
# ===========================================================================
${group(SEARCH_BOTS)}

# ===========================================================================
# AI answer engines (GEO / AEO)
# Allowed deliberately: being quoted in ChatGPT, Claude, Perplexity and AI
# Overviews is a primary acquisition channel for this business, not a leak.
# ===========================================================================
${group(AI_BOTS)}

# ===========================================================================
# Link-preview fetchers
# These build the card when a link is pasted into chat, email or social.
# ===========================================================================
${group(PREVIEW_BOTS)}

# ===========================================================================
# Sitemaps
# Submit ONLY the index below to Search Console and Bing Webmaster Tools.
# It carries sitemap-pages.xml, and sitemap-blog.xml once the blog exists.
# ===========================================================================
Sitemap: ${site.url}/sitemap.xml

# Structured plain-text summary of this business for LLMs — see llmstxt.org
# Not a crawler directive; listed here because it is where people look.
# ${site.url}/llms.txt
# ${site.url}/llms-full.txt
`;

  return new NextResponse(body, { headers: TEXT_HEADERS });
}
