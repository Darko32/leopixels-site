import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Screenshots are dropped into public/demos/<slug>/ by hand once a demo is
 * deployed. Until they exist, the UI renders a designed placeholder rather
 * than a broken image — and upgrades itself the moment a file appears.
 *
 * Server-side only: this runs during static generation, never in the browser.
 */
export function hasScreenshot(publicPath: string): boolean {
  return existsSync(join(process.cwd(), 'public', publicPath.replace(/^\//, '')));
}
