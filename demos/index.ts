import type { DemoConfig, Trade } from './_schema';
import { agaveAir } from './agave-air/config';
import { bighornRoofing } from './bighorn-roofing/config';
import { ironwoodElectric } from './ironwood-electric/config';
import { redlinePlumbing } from './redline-plumbing/config';

/**
 * The demo registry. Adding a demo is one import plus one array entry — the
 * homepage grid, /demos, the case-study routes, the sitemap and the static
 * build pipeline all read from here.
 */
export const demos: DemoConfig[] = [redlinePlumbing, ironwoodElectric, agaveAir, bighornRoofing];

export function getDemo(slug: string): DemoConfig | undefined {
  return demos.find((demo) => demo.slug === slug);
}

/** The homepage grid is a curated showcase, not the full catalogue — capped
 *  regardless of how many configs carry `featured: true` so a future demo
 *  marked featured can't silently grow the homepage row past 3 cards. */
const MAX_FEATURED_DEMOS = 3;

export function getFeaturedDemos(): DemoConfig[] {
  return demos.filter((demo) => demo.meta.featured).slice(0, MAX_FEATURED_DEMOS);
}

/** Trades that actually have a demo, in registry order — drives the filter UI. */
export function getRepresentedTrades(): Trade[] {
  return [...new Set(demos.map((demo) => demo.meta.trade))];
}

export * from './_schema';
