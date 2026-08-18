/**
 * The blog registry. Adding a post is one import plus one array entry — the
 * listing page, the post routes, the sitemap, the header nav gate and the
 * JSON-LD all read from here. Exactly the contract demos/index.ts uses, for the
 * same reason: one source of truth is what stops a published URL and the
 * sitemap entry describing it from disagreeing.
 *
 * Empty today. Every consumer handles that: /blog 404s while nothing is
 * published, and the nav link stays hidden until it would resolve.
 */

import type { BlogPost } from './_schema';
import { postLastmod } from './_schema';

/** Every post, drafts included. */
export const blogPosts: BlogPost[] = [];

/**
 * Drafts render in `next dev` so a post can be reviewed as it looks, and
 * nowhere else. Nothing here reaches the sitemap — that reads `publishedPosts`.
 */
const includeDrafts = process.env.NODE_ENV === 'development';

/** Published posts only. What the sitemap and the nav gate are built from. */
export const publishedPosts: BlogPost[] = blogPosts.filter((post) => !post.draft);

/** What the routes render: published everywhere, plus drafts during development. */
export const visiblePosts: BlogPost[] = includeDrafts ? blogPosts : publishedPosts;

/** Newest first, by the date the post claims. */
function byDateDesc(a: BlogPost, b: BlogPost): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

/**
 * The listing, newest first.
 *
 * Every post appears in every locale. Posts are bilingual by default, and one
 * still awaiting its Macedonian translation renders from the English fallback
 * rather than vanishing from /mk/blog — a listing whose contents depend on the
 * language you are reading it in is a worse answer than a translation notice on
 * the post itself.
 */
export function listedPosts(): BlogPost[] {
  return [...visiblePosts].sort(byDateDesc);
}

/**
 * A post by slug, or undefined. Returns drafts in development only, so a draft
 * URL 404s in production exactly like a slug that does not exist.
 */
export function getBlogPost(slug: string): BlogPost | undefined {
  return visiblePosts.find((post) => post.slug === slug);
}

/** The newest lastmod across published posts, or undefined while there are none. */
export function newestPostLastmod(): string | undefined {
  let newest = '';
  for (const post of publishedPosts) {
    const lastmod = postLastmod(post);
    if (lastmod > newest) newest = lastmod;
  }
  return newest || undefined;
}

export * from './_schema';
