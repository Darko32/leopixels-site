import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { demos } from '../demos';
import { ROOT, renderDemo } from './render-demo';

/**
 * Renders every demo into public/preview/<slug>/ so it is served at
 * leopixels.com/preview/<slug>.
 *
 * Runs as the npm `prebuild` script, so `next build` always sees fresh output
 * and demos/<slug>/config.ts stays the only source of truth. The output is
 * gitignored — there is no committed artifact to drift.
 */
const previewRoot = join(ROOT, 'public', 'preview');

rmSync(previewRoot, { recursive: true, force: true });

for (const demo of demos) {
  renderDemo(demo, join(previewRoot, demo.slug), { mode: 'demo' });
  console.log(`  ✓ /preview/${demo.slug}  (${demo.tokens.BUSINESS_NAME})`);
}

console.log(`Built ${demos.length} demo site${demos.length === 1 ? '' : 's'}.`);
