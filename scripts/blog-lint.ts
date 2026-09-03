/**
 * Deterministic content checks for blog posts.
 *
 * This is the machine half of .claude/skills/leopixels-blog/assets/CHECKLIST.md:
 * every item on that list a computer can decide without judgement. It exists so
 * an automated post can be gated by something other than a person reading it.
 *
 * What it deliberately does NOT check: whether the prose is any good, whether a
 * cited source actually supports the sentence it is attached to, whether the
 * Macedonian reads naturally. Those need a reader. Pretending a regex settles
 * them would be worse than admitting it does not.
 *
 *   npm run blog:lint                  structure, links, characters, claims
 *   npm run blog:lint -- --external    additionally fetches every external URL
 *   npm run blog:lint -- --strict      promotes warnings to errors
 *
 * External fetches are opt-in because they are slow and depend on the network:
 * a developer running this fifty times an hour should not be rate-limited by a
 * third party, and an ordinary edit should not fail because someone else's CDN
 * had a bad minute. CI runs them; a bare `npm run blog:lint` does not.
 */

import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { blogPosts, isInlineLink, postContent, postLocales } from '../content/blog';
import type { BlogBlock, BlogPost, BlogPostContent, RichText } from '../content/blog';
import { blogSchedule } from '../content/blog/schedule';
import { plannedTopics } from '../content/blog/planned';
import { demos } from '../demos';
import { site } from '../content/site';
import { routing, type Locale } from '../i18n/routing';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');

const argv = process.argv.slice(2);
const CHECK_EXTERNAL = argv.includes('--external');
const STRICT = argv.includes('--strict');

/* ─────────────────────────────  reporting  ─────────────────────────────── */

interface Finding {
  post: string;
  locale?: Locale;
  rule: string;
  message: string;
  severity: 'error' | 'warning';
}

const findings: Finding[] = [];

function fail(post: string, rule: string, message: string, locale?: Locale): void {
  findings.push({ post, rule, message, severity: 'error', locale });
}

function warn(post: string, rule: string, message: string, locale?: Locale): void {
  findings.push({ post, rule, message, severity: STRICT ? 'error' : 'warning', locale });
}

/* ─────────────────────────  known internal URLs  ───────────────────────── */

/**
 * Every internal path a post may link to, built from the same registries the
 * routes are built from. A link to anything outside this set would 404, so the
 * check is exact rather than a heuristic.
 */
function knownInternalPaths(): Set<string> {
  const paths = new Set<string>([
    '/',
    '/demos',
    '/how-it-works',
    '/pricing',
    '/faq',
    '/blog',
    '/privacy',
  ]);

  // Homepage anchors, rendered by components/sections/*.
  //
  // The process, pricing and FAQ anchors are deliberately absent: those are
  // routes now. The homepage still carries the ids so old inbound links keep
  // working, but a post written today must link the page, not the fragment.
  for (const id of ['demos', 'get-a-demo']) {
    paths.add(`/#${id}`);
  }

  for (const demo of demos) paths.add(`/demos/${demo.slug}`);
  for (const post of blogPosts) paths.add(`/blog/${post.slug}`);

  return paths;
}

/* ──────────────────────────  text extraction  ──────────────────────────── */

function richStrings(rich: RichText): string[] {
  return rich.map((node) => (typeof node === 'string' ? node : node.text));
}

function blockStrings(block: BlogBlock): string[] {
  switch (block.kind) {
    case 'paragraph':
      return richStrings(block.text);
    case 'heading':
      return [block.text];
    case 'list':
      return block.items.flatMap(richStrings);
    case 'keyFacts':
      return [...block.items];
    case 'faq':
      return [
        block.heading,
        ...richStrings(block.intro),
        ...block.items.flatMap((item) => [item.question, ...richStrings(item.answer)]),
      ];
  }
}

/** Every human-visible string in one locale's document. */
function contentStrings(content: BlogPostContent): string[] {
  return [
    content.title,
    content.description,
    ...(content.metaTitle ? [content.metaTitle] : []),
    ...content.intro.flatMap(richStrings),
    ...content.body.flatMap(blockStrings),
  ];
}

interface LinkRef {
  href: string;
  text: string;
  title: string;
  /** The run it sits in, so sentence-initial position can be judged. */
  run: RichText;
  index: number;
}

function richLinks(rich: RichText): LinkRef[] {
  const out: LinkRef[] = [];
  rich.forEach((node, index) => {
    if (typeof node !== 'string' && isInlineLink(node)) {
      out.push({ href: node.href, text: node.text, title: node.title, run: rich, index });
    }
  });
  return out;
}

function blockLinks(block: BlogBlock): LinkRef[] {
  switch (block.kind) {
    case 'paragraph':
      return richLinks(block.text);
    case 'list':
      return block.items.flatMap(richLinks);
    case 'faq':
      return [...richLinks(block.intro), ...block.items.flatMap((item) => richLinks(item.answer))];
    case 'heading':
    case 'keyFacts':
      return [];
  }
}

function contentLinks(content: BlogPostContent): LinkRef[] {
  return [...content.intro.flatMap(richLinks), ...content.body.flatMap(blockLinks)];
}

/* ────────────────────────────────  rules  ──────────────────────────────── */

const BANNED_CHARS: ReadonlyArray<readonly [RegExp, string]> = [
  [/—/, 'em-dash (U+2014)'],
  [/–/, 'en-dash (U+2013)'],
  [/[‘’]/, 'curly single quote'],
  [/[“”]/, 'curly double quote'],
  [/…/, 'ellipsis character (U+2026)'],
  [/ /, 'non-breaking space'],
];

/**
 * Claims LeoPixels has never published. Every one is banned by lib/seo/llms.ts
 * rule 3, and an automated writer is the thing most likely to produce one,
 * because they are such natural marketing sentences to reach for.
 */
const BANNED_CLAIMS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\b\d[\d,]*\s*\+?\s*(happy\s+)?(clients?|customers?)\b/i, 'a client or customer count'],
  [/\b(hundreds|thousands|dozens)\s+of\s+(clients?|customers?|businesses)\b/i, 'a vague client count'],
  [/\b\d(\.\d)?\s*(\/\s*5\b|out of 5\b|stars?\b)/i, 'a star rating'],
  [/\b(money[\s-]back|satisfaction)\s+guarantee/i, 'a guarantee'],
  [/\bwe\s+guarantee\b/i, 'a guarantee'],
  [/\b(increased|boosted|grew|doubled|tripled)\s+(their|his|her|its)\s+\w+\s+by\s+\d/i, 'a case-study result'],
  [/\b(award[\s-]winning|voted\s+best|number\s+one\s+in)\b/i, 'an award claim'],
];

/** Title Case is an English convention. Macedonian uses sentence case. */
const TITLE_CASE_LOCALES: ReadonlySet<string> = new Set(['en']);

const SMALL_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'nor', 'for', 'yet', 'so',
  'at', 'by', 'in', 'of', 'on', 'to', 'up', 'as', 'if', 'per', 'via',
  'from', 'into', 'over', 'with', 'that', 'than', 'when', 'is',
]);

function looksTitleCase(heading: string): boolean {
  const words = heading.split(/\s+/).filter(Boolean);
  return words.every((word, index) => {
    const bare = word.replace(/[^A-Za-z0-9'-]/g, '');
    if (!bare) return true;
    if (/^[A-Z0-9]/.test(bare)) return true;
    // A lowercase small word is fine anywhere but the first position.
    return index > 0 && SMALL_WORDS.has(bare.toLowerCase());
  });
}

/**
 * A heading is question-shaped when it ends in a question mark, or when an
 * auxiliary verb is fronted, with or without a wh-word ahead of it: "Does a
 * Profile Rank", "How Does Prominence Work", "Should You Pay for Ads".
 *
 * Matching on the wh-word alone would be wrong, and wrongly strict: "What a
 * Profile Already Does Well" and "When a Profile Is Enough" are ordinary
 * statements. The auxiliary is what makes it a question, so that is what is
 * tested for.
 */
const AUXILIARIES = 'do|does|did|is|are|was|were|can|could|should|would|will|have|has|am';
const WH_WORDS = 'what|how|why|when|where|which|who|whom|whose';
const FRONTED_AUXILIARY = new RegExp(`^\\s*(?:(?:${WH_WORDS})\\s+)?(?:${AUXILIARIES})\\b`, 'i');

function isQuestionShaped(heading: string): boolean {
  const text = heading.trim();
  return text.endsWith('?') || FRONTED_AUXILIARY.test(text);
}

function wordCount(phrase: string): number {
  return phrase.trim().split(/\s+/).filter(Boolean).length;
}

/* ──────────────────────────────  the checks  ───────────────────────────── */

function checkRegistryAndSlugs(): void {
  const blogDir = join(ROOT, 'content', 'blog');
  const dirs = readdirSync(blogDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const registered = new Set(blogPosts.map((post) => post.slug));

  for (const dir of dirs) {
    if (!existsSync(join(blogDir, dir, 'post.ts'))) continue;
    if (!registered.has(dir)) {
      fail(dir, 'registry', `content/blog/${dir}/post.ts exists but is not in the registry.`);
    }
  }

  const seen = new Map<string, number>();
  for (const post of blogPosts) {
    seen.set(post.slug, (seen.get(post.slug) ?? 0) + 1);

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(post.slug)) {
      fail(post.slug, 'slug', 'Slug must be lowercase words separated by single hyphens.');
    }
    if (!dirs.includes(post.slug)) {
      fail(post.slug, 'slug', `No directory content/blog/${post.slug}/ matches this slug.`);
    }
  }

  for (const [slug, count] of seen) {
    if (count > 1) fail(slug, 'slug', `Registered ${count} times. Slugs must be unique.`);
  }

  // The ledger should know every written post, or a later run may re-pick a
  // topic that is already covered.
  const ledger = new Set(plannedTopics.map((topic) => topic.slug));
  for (const post of blogPosts) {
    if (!ledger.has(post.slug)) {
      warn(
        post.slug,
        'ledger',
        'Absent from content/blog/planned.ts, so a later automated run could re-pick this topic.'
      );
    }
  }
}

function checkDates(post: BlogPost): void {
  for (const field of ['publishedAt', 'updatedAt'] as const) {
    const value = post[field];
    if (value === undefined) continue;

    if (Number.isNaN(Date.parse(value))) {
      fail(post.slug, 'date', `${field} "${value}" is not a parseable instant.`);
      continue;
    }
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) {
      fail(
        post.slug,
        'date',
        `${field} "${value}" must be a UTC instant shaped exactly like 2026-08-20T09:00:00Z.`
      );
    }
  }

  if (post.updatedAt && Date.parse(post.updatedAt) < Date.parse(post.publishedAt)) {
    fail(post.slug, 'date', 'updatedAt is earlier than publishedAt.');
  }
}

function checkLocales(post: BlogPost): void {
  const have = postLocales(post);

  for (const locale of blogSchedule.locales) {
    if (!have.includes(locale)) {
      warn(
        post.slug,
        'locale',
        `Missing "${locale}", which blogSchedule.locales expects. The site handles the gap safely ` +
          `(English fallback, no ${locale} hreflang), but bilingual is the intended outcome.`
      );
    }
  }

  for (const locale of have) {
    if (!routing.locales.includes(locale)) {
      fail(post.slug, 'locale', `Has content for "${locale}", which is not a site locale.`);
    }
  }
}

function checkCharacters(post: BlogPost, locale: Locale, content: BlogPostContent): void {
  for (const text of contentStrings(content)) {
    for (const [pattern, label] of BANNED_CHARS) {
      if (pattern.test(text)) {
        fail(post.slug, 'characters', `Contains ${label}: "${text.slice(0, 60)}"`, locale);
      }
    }
  }
}

function checkClaims(post: BlogPost, locale: Locale, content: BlogPostContent): void {
  for (const text of contentStrings(content)) {
    for (const [pattern, label] of BANNED_CLAIMS) {
      const match = text.match(pattern);
      if (match) {
        fail(
          post.slug,
          'claims',
          `Reads as ${label} ("${match[0]}"), which LeoPixels has never published. See lib/seo/llms.ts rule 3.`,
          locale
        );
      }
    }
  }
}

function checkStructure(post: BlogPost, locale: Locale, content: BlogPostContent): void {
  if (content.intro.length !== 2) {
    fail(post.slug, 'structure', `intro has ${content.intro.length} paragraphs, expected 2.`, locale);
  }

  const headings = content.body.filter(
    (block): block is Extract<BlogBlock, { kind: 'heading' }> => block.kind === 'heading'
  );
  const h2s = headings.filter((heading) => heading.level === 2);

  if (h2s.length < 4) {
    fail(post.slug, 'structure', `${h2s.length} H2 sections, expected at least 4.`, locale);
  }

  const questions = h2s.filter((heading) => isQuestionShaped(heading.text));
  if (h2s.length > 0 && questions.length * 2 > h2s.length) {
    fail(
      post.slug,
      'structure',
      `${questions.length} of ${h2s.length} H2s are question-shaped, over the half cap.`,
      locale
    );
  }

  if (TITLE_CASE_LOCALES.has(locale)) {
    for (const heading of headings) {
      if (!looksTitleCase(heading.text)) {
        fail(post.slug, 'structure', `Heading is not Title Case: "${heading.text}"`, locale);
      }
    }
  }

  const faqs = content.body.filter((block) => block.kind === 'faq');
  if (faqs.length > 1) {
    fail(post.slug, 'structure', `${faqs.length} faq blocks, expected at most 1.`, locale);
  }
  for (const faq of faqs) {
    if (faq.kind !== 'faq') continue;
    if (faq.items.length < 3 || faq.items.length > 4) {
      fail(post.slug, 'structure', `faq has ${faq.items.length} questions, expected 3 or 4.`, locale);
    }
  }

  if (content.description.length > 200) {
    warn(
      post.slug,
      'structure',
      `description is ${content.description.length} chars, target ~150-160.`,
      locale
    );
  }
  if (content.title.length > 80) {
    warn(post.slug, 'structure', `title is ${content.title.length} chars, target ~70.`, locale);
  }
}

function checkLinks(
  post: BlogPost,
  locale: Locale,
  content: BlogPostContent,
  internal: Set<string>,
  externalUrls: Set<string>
): void {
  const links = contentLinks(content);
  const hrefs = new Map<string, number>();
  const anchors = new Map<string, number>();

  for (const link of links) {
    hrefs.set(link.href, (hrefs.get(link.href) ?? 0) + 1);
    const anchorKey = link.text.trim().toLowerCase();
    anchors.set(anchorKey, (anchors.get(anchorKey) ?? 0) + 1);

    if (!link.title.trim()) {
      fail(post.slug, 'links', `Link to ${link.href} has an empty title.`, locale);
    }
    if (link.title.trim().toLowerCase() === anchorKey) {
      fail(post.slug, 'links', `Link title repeats the anchor text ("${link.text}").`, locale);
    }

    const words = wordCount(link.text);
    if (words < 2 || words > 5) {
      fail(post.slug, 'links', `Anchor "${link.text}" is ${words} words, expected 2 to 5.`, locale);
    }

    // An anchor opens a sentence when nothing precedes it in its run, or what
    // does ends a sentence.
    const before = link.run
      .slice(0, link.index)
      .map((node) => (typeof node === 'string' ? node : node.text))
      .join('');
    if (before.trim() === '' || /[.!?]\s+$/.test(before)) {
      fail(post.slug, 'links', `Anchor "${link.text}" opens a sentence.`, locale);
    }

    if (link.href.startsWith('/')) {
      if (link.href.startsWith('/mk/') || link.href.startsWith('/en/')) {
        fail(
          post.slug,
          'links',
          `Internal href "${link.href}" hard-codes a locale. Use the bare path; the renderer localises it.`,
          locale
        );
      } else if (!internal.has(link.href)) {
        fail(post.slug, 'links', `Internal href "${link.href}" matches no known route.`, locale);
      }
    } else if (link.href.startsWith(site.url)) {
      fail(
        post.slug,
        'links',
        `Internal link written as an absolute URL ("${link.href}"). Use the bare path.`,
        locale
      );
    } else if (!link.href.startsWith('https://')) {
      fail(post.slug, 'links', `External href "${link.href}" is not https.`, locale);
    } else {
      // A search ENDPOINT, not any path that contains the word. Google Search
      // Central lives under /search/docs/ and is documentation, not results.
      const isSearchResults =
        /[?&](q|query|search|term|s)=/.test(link.href) ||
        /\/search\/?(\?|$)/.test(link.href) ||
        /\/(tag|tags|archive|category)\/?(\?|$)/.test(link.href);
      if (isSearchResults) {
        fail(post.slug, 'links', `Cites a search-results or index URL: ${link.href}`, locale);
      }
      externalUrls.add(link.href);
    }
  }

  for (const [href, count] of hrefs) {
    if (count > 1) {
      fail(post.slug, 'links', `href ${href} used ${count} times in one locale.`, locale);
    }
  }
  for (const [anchor, count] of anchors) {
    if (count > 1) {
      fail(post.slug, 'links', `Anchor "${anchor}" used ${count} times in one locale.`, locale);
    }
  }
}

async function checkExternalLiveness(urls: Set<string>): Promise<void> {
  if (urls.size === 0) {
    console.log('\nNo external URLs to check.');
    return;
  }

  console.log(`\nChecking ${urls.size} external URL(s)...`);

  for (const url of urls) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      // GET, never HEAD. HEAD is widely unreliable: Google's own support pages
      // answer it 404 and the same URL 200 to a GET, which would have failed
      // this build over two perfectly live citations. The body is cancelled as
      // soon as the status is known, so nothing large is downloaded.
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'follow',
        headers: {
          // Identify the tool. The default Node agent is blocked outright by
          // enough CDNs to make the results meaningless.
          'user-agent': 'leopixels-blog-lint (+https://leopixels.com)',
          accept: 'text/html,application/xhtml+xml',
        },
      });
      await response.body?.cancel();

      if (response.status === 403 || response.status === 429) {
        // A CDN blocking a bot is not proof the page is dead. RESEARCH.md calls
        // this UNKNOWN, and unknown must not fail a build on its own.
        warn('(external)', 'liveness', `${url} returned HTTP ${response.status} (bot-blocked, not verified).`);
      } else if (response.status >= 400) {
        fail('(external)', 'liveness', `${url} returned HTTP ${response.status}.`);
      } else {
        console.log(`  ok  ${response.status}  ${url}`);
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      fail('(external)', 'liveness', `${url} could not be fetched: ${reason}`);
    } finally {
      clearTimeout(timer);
    }
  }
}

/* ────────────────────────────────  main  ───────────────────────────────── */

async function main(): Promise<void> {
  const internal = knownInternalPaths();
  const externalUrls = new Set<string>();

  checkRegistryAndSlugs();

  for (const post of blogPosts) {
    checkDates(post);
    checkLocales(post);

    for (const locale of postLocales(post)) {
      const content = postContent(post, locale);
      checkCharacters(post, locale, content);
      checkClaims(post, locale, content);
      checkStructure(post, locale, content);
      checkLinks(post, locale, content, internal, externalUrls);
    }
  }

  if (CHECK_EXTERNAL) await checkExternalLiveness(externalUrls);

  const errors = findings.filter((finding) => finding.severity === 'error');
  const warnings = findings.filter((finding) => finding.severity === 'warning');

  console.log('');
  if (findings.length === 0) {
    console.log(`blog-lint: ${blogPosts.length} post(s) checked, no findings.`);
  } else {
    for (const finding of findings) {
      const where = finding.locale ? `${finding.post} [${finding.locale}]` : finding.post;
      const tag = finding.severity === 'error' ? 'ERROR' : 'WARN ';
      console.log(`${tag} ${where} (${finding.rule}): ${finding.message}`);
    }
    console.log('');
    console.log(`blog-lint: ${errors.length} error(s), ${warnings.length} warning(s).`);
  }

  if (!CHECK_EXTERNAL) {
    console.log('blog-lint: external URLs not checked. Run with --external to verify them.');
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error('blog-lint crashed:', error);
  process.exit(1);
});
