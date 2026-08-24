import { site } from '@/content/site';
import { HAS_BLOG } from '@/lib/seo/site';

export type NavItem = (typeof site.nav)[number];

/**
 * The navigation, minus routes with nothing behind them yet.
 *
 * `/blog` returns a 404 while no post is published — deliberately, since an
 * empty listing is a thin page. A header link pointing at that is worse than no
 * link, so the item appears with the first post and not before. Derived from
 * the same registry the route reads, so the two cannot disagree; there is no
 * flag to remember to flip on publish day.
 *
 * Both the header and the footer render from here. A gate applied in one place
 * and forgotten in the other is the failure this function exists to prevent.
 */
// TEST FIXTURE (scope guard, test 2 of 3). This comment is the entire change on
// blog/auto/test-scope. It is deliberately inert: it alters no behaviour, so
// every validation check passes, which is the point. The merge must still be
// withheld, because this file lives outside content/blog/ and only the scope
// guard can reject it. Revert this line once the test is done.
export function navItems(): NavItem[] {
  return site.nav.filter((item) => item.key !== 'blog' || HAS_BLOG);
}
