/**
 * The blog registry. Adding a post is one import plus one array entry — the
 * listing page, the post routes, the sitemap, the header nav gate and the
 * JSON-LD all read from here. Exactly the contract demos/index.ts uses, for the
 * same reason: one source of truth is what stops a published URL and the
 * sitemap entry describing it from disagreeing.
 *
 * A post is registered here from the moment it is written, which is not the
 * same as being public: `publishedAt` gates that separately, so this array
 * holds published, scheduled and draft posts alike. Every consumer reads the
 * set it needs. When none are published, /blog 404s and the nav link stays
 * hidden until one is.
 */

import type { BlogPost } from './_schema';
import { isPublished, postLastmod } from './_schema';
import { localServicesAdsCostVsWebsite } from './local-services-ads-cost-vs-website/post';
import { phoneNumberPlacementTradesWebsite } from './phone-number-placement-trades-website/post';
import { photoWeightTradesWebsite } from './photo-weight-trades-website/post';
import { websiteVsGoogleBusinessProfile } from './website-vs-google-business-profile/post';

/** Every post: published, scheduled and draft alike. */
export const blogPosts: BlogPost[] = [
  websiteVsGoogleBusinessProfile,
  phoneNumberPlacementTradesWebsite,
  photoWeightTradesWebsite,
  localServicesAdsCostVsWebsite,
];

/**
 * Drafts and not-yet-due posts render in `next dev` so either can be reviewed
 * as it looks, and nowhere else. Nothing here reaches the sitemap — that reads
 * `publishedPosts`.
 */
const includeUnpublished = process.env.NODE_ENV === 'development';

/**
 * The moment the gate is evaluated against.
 *
 * Captured once, at module load, which during `next build` is build time. That
 * is the only moment a statically generated site has: there is no server later
 * to re-ask the question, so a post goes live on the first build after its
 * `publishedAt`, and rebuild cadence is what sets publishing precision.
 */
const BUILD_TIME = new Date();

/**
 * Published posts only: not a draft, and `publishedAt` has passed. What the
 * routes, the sitemap and the nav gate are all built from.
 */
export const publishedPosts: BlogPost[] = blogPosts.filter((post) =>
  isPublished(post, BUILD_TIME)
);

/**
 * Written, not a draft, and waiting for its instant. These are committed to the
 * repository and invisible on the site: no route, no sitemap entry, no listing
 * card, 404 in every locale until the gate opens.
 */
export const scheduledPosts: BlogPost[] = blogPosts.filter(
  (post) => !post.draft && !isPublished(post, BUILD_TIME)
);

/**
 * What the routes render: published everywhere, plus drafts and scheduled posts
 * during development.
 */
export const visiblePosts: BlogPost[] = includeUnpublished ? blogPosts : publishedPosts;

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
