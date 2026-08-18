/**
 * A blog post is one typed config file.
 *
 * Same contract as demos/_schema.ts: config in, `tsc --noEmit` as the
 * validator, one import plus one array entry to register it. The routes, the
 * listing, the sitemap, the hreflang cluster and the JSON-LD all read from the
 * registry rather than being told separately.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * WHY TRANSLATIONS ARE WHOLE DOCUMENTS, NOT PER-FIELD PAIRS
 * ───────────────────────────────────────────────────────────────────────────
 * demos/_schema.ts localises field by field: `Localized = {en, mk?}` on each
 * string. That reads well for a handful of short fields. An article is a
 * hundred of them, and pairing every paragraph with its translation inline
 * makes both languages unreadable in the editor and unreviewable in a diff.
 *
 * So a post holds one complete document per language, keyed by locale:
 *
 *     content: { en: {...}, mk: {...} }
 *
 * Three things follow from that shape, and all three are load-bearing:
 *
 *  1. BOTH LANGUAGES ARE THE DEFAULT. Writing a post means filling in `en` and
 *     `mk`. Nothing is optional-by-convention.
 *  2. COVERAGE IS DERIVED, NEVER DECLARED. `postLocales()` reads which keys are
 *     actually present, so a post cannot advertise a translation it does not
 *     have. There is no `locales: [...]` field to fall out of sync with the
 *     prose, because a hand-kept list of that kind is only ever right on the
 *     day it is written.
 *  3. ANOTHER LANGUAGE IS ONE KEY. `Locale` comes from i18n/routing, so adding
 *     a third locale there makes `content.de` legal here with no change to this
 *     file, the routes, or the sitemap.
 *
 * English is required because it is the fallback every other locale resolves
 * to — see `postContent()`.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * WHY BODY BLOCKS AND NOT MARKDOWN OR HTML
 * ───────────────────────────────────────────────────────────────────────────
 * A raw HTML string would need dangerouslySetInnerHTML, which throws away the
 * two things this app depends on: locale-aware <Link> (so a `/demos/x` link
 * keeps its `/mk` prefix) and the compiler catching a malformed post before it
 * ships. Markdown would need a parser dependency and a typography plugin.
 * Blocks cost neither.
 */

import { routing, type Locale } from '@/i18n/routing';

/* ─────────────────────────────  inline text  ───────────────────────────── */

/**
 * A link inside a sentence. `href` starting with `/` is internal and renders
 * through the locale-aware Link; anything else is external and gets
 * `rel="noopener" target="_blank"`.
 */
export interface InlineLink {
  /** The phrase the sentence already contains. Keep it to 2-5 words. */
  text: string;
  href: string;
  /** Describes the destination, never a repeat of `text`. Read by screen readers. */
  title: string;
}

export interface InlineStrong {
  text: string;
  strong: true;
}

/** A run of prose: plain strings, with links and emphasis as objects between them. */
export type InlineNode = string | InlineLink | InlineStrong;
export type RichText = readonly InlineNode[];

export function isInlineLink(node: InlineNode): node is InlineLink {
  return typeof node !== 'string' && 'href' in node;
}

/** Flattens rich text to plain text — used for JSON-LD answers and word counts. */
export function richToPlainText(value: RichText): string {
  return value.map((node) => (typeof node === 'string' ? node : node.text)).join('');
}

/* ───────────────────────────────  blocks  ──────────────────────────────── */

export interface FaqItem {
  question: string;
  answer: RichText;
}

export type BlogBlock =
  | { kind: 'paragraph'; text: RichText }
  /** H2 and H3 only — H1 is the post title, rendered by the route. */
  | { kind: 'heading'; level: 2 | 3; text: string }
  | { kind: 'list'; ordered?: boolean; items: readonly RichText[] }
  /**
   * The at-a-glance block: short key-value facts sitting between the intro and
   * the first heading. Styled apart from an ordinary list because it is scanned
   * rather than read.
   */
  | { kind: 'keyFacts'; items: readonly string[] }
  /**
   * Questions and answers. Also the source for the page's FAQPage JSON-LD, so
   * the rendered questions and the structured data cannot disagree — the rule
   * content/sections.ts follows for the homepage FAQ.
   */
  | { kind: 'faq'; heading: string; intro: RichText; items: readonly FaqItem[] };

export type FaqBlock = Extract<BlogBlock, { kind: 'faq' }>;

/* ──────────────────────────────  the post  ─────────────────────────────── */

/**
 * Shapes a post can take. Not decoration — it is the honest label for how long
 * the piece should run and how it should be structured.
 */
export const POST_FORMATS = ['how-to', 'listicle', 'guide', 'news', 'comparison'] as const;
export type PostFormat = (typeof POST_FORMATS)[number];

/** One language's complete version of a post. */
export interface BlogPostContent {
  /** The H1, the card title, and the JSON-LD headline. */
  title: string;
  /**
   * The standfirst under the H1, the card excerpt, and the meta description.
   * One job, one string — three copies is how they drift apart.
   */
  description: string;
  /**
   * SEO <title> when it should carry long-tail modifiers the H1 has no room
   * for. Omitted means the H1 is the title tag.
   */
  metaTitle?: string;
  /**
   * The opening paragraphs, before any heading. Separate from `body` so a post
   * cannot ship opening on a heading.
   */
  intro: readonly RichText[];
  body: readonly BlogBlock[];
}

/**
 * Every language the post is written in. English is required — it is what a
 * locale with no translation of its own falls back to.
 */
export type BlogTranslations = { en: BlogPostContent } & Partial<
  Record<Locale, BlogPostContent>
>;

export interface BlogPost {
  /** URL segment. `/blog/<slug>`. Lowercase, hyphenated, never changed after publish. */
  slug: string;
  /** ISO date (YYYY-MM-DD). Drives the sitemap lastmod and the JSON-LD. */
  publishedAt: string;
  /** ISO date (YYYY-MM-DD). Set only when the post's CONTENT actually changed. */
  updatedAt?: string;
  format: PostFormat;
  /** Free-text topic labels. No site taxonomy exists — these are not a category system. */
  tags?: readonly string[];
  /** Drafts never reach the sitemap and never render outside `next dev`. */
  draft?: boolean;
  /** One complete document per language. Fill in every locale the site serves. */
  content: BlogTranslations;
}

/** Identity helper — gives editor completion and catches typos in post files. */
export function defineBlogPost(post: BlogPost): BlogPost {
  return post;
}

/* ────────────────────────  locale resolution  ──────────────────────────── */

/**
 * The locales this post is genuinely written in, in the site's locale order.
 *
 * Read from the content rather than declared beside it. This is the single
 * answer the hreflang cluster, the sitemap and the fallback notice all use, so
 * none of them can claim a translation that is not there.
 */
export function postLocales(post: BlogPost): readonly Locale[] {
  return routing.locales.filter((locale) => post.content[locale] !== undefined);
}

/** Whether the post has its own translation in this locale, rather than a fallback. */
export function hasTranslation(post: BlogPost, locale: Locale): boolean {
  return post.content[locale] !== undefined;
}

/**
 * The document to render: this locale's own translation, or the English one.
 *
 * The fallback is what keeps every locale's URL a real page. A Macedonian URL
 * for a post that has not been translated yet serves the English text and
 * canonicalises to the English URL — see the route — rather than 404ing under a
 * link the header offers.
 */
export function postContent(post: BlogPost, locale: Locale): BlogPostContent {
  return post.content[locale] ?? post.content[FALLBACK_LOCALE];
}

/** The language actually rendered — the requested locale, or the fallback. */
export function contentLocale(post: BlogPost, locale: Locale): Locale {
  return hasTranslation(post, locale) ? locale : FALLBACK_LOCALE;
}

/**
 * English, structurally: `BlogTranslations` requires the `en` key, which is
 * what makes the fallback total — every locale resolves to a real document.
 * Named rather than inlined so the one assumption has one place to be read.
 */
const FALLBACK_LOCALE = 'en' satisfies Locale;

/* ────────────────────────────  derived facts  ──────────────────────────── */

/** The date a post claims as its last meaningful change. */
export function postLastmod(post: BlogPost): string {
  return post.updatedAt ?? post.publishedAt;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function blockWords(block: BlogBlock): number {
  switch (block.kind) {
    case 'paragraph':
      return countWords(richToPlainText(block.text));
    case 'heading':
      return countWords(block.text);
    case 'list':
      return block.items.reduce((total, item) => total + countWords(richToPlainText(item)), 0);
    case 'keyFacts':
      return block.items.reduce((total, item) => total + countWords(item), 0);
    case 'faq':
      return block.items.reduce(
        (total, item) => total + countWords(item.question) + countWords(richToPlainText(item.answer)),
        countWords(richToPlainText(block.intro))
      );
  }
}

/** Total words in one language's version of a post. */
export function contentWordCount(content: BlogPostContent): number {
  const introWords = content.intro.reduce(
    (total, paragraph) => total + countWords(richToPlainText(paragraph)),
    0
  );
  return content.body.reduce((total, block) => total + blockWords(block), introWords);
}

/**
 * Reading minutes at 200 wpm — the conventional figure for online prose, and
 * derived rather than hand-set so it cannot contradict the text it labels.
 */
export function readingMinutes(content: BlogPostContent): number {
  return Math.max(1, Math.round(contentWordCount(content) / 200));
}

/** The post's FAQ block, when it has one. Feeds the FAQPage JSON-LD. */
export function contentFaq(content: BlogPostContent): FaqBlock | undefined {
  return content.body.find((block): block is FaqBlock => block.kind === 'faq');
}
