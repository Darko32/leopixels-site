import type { DemoConfig, Trade } from './_schema';
import { redlinePlumbing } from './redline-plumbing/config';

/**
 * The demo registry. Adding a demo is one import plus one array entry — the
 * homepage grid, /demos, the case-study routes, the sitemap and the static
 * build pipeline all read from here.
 */
export const demos: DemoConfig[] = [redlinePlumbing];

export function getDemo(slug: string): DemoConfig | undefined {
  return demos.find((demo) => demo.slug === slug);
}

export function getFeaturedDemos(): DemoConfig[] {
  return demos.filter((demo) => demo.meta.featured);
}

/** Trades that actually have a demo, in registry order — drives the filter UI. */
export function getRepresentedTrades(): Trade[] {
  return [...new Set(demos.map((demo) => demo.meta.trade))];
}

export * from './_schema';
