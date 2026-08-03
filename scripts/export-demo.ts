import { join } from 'node:path';
import { demos, getDemo } from '../demos';
import { ROOT, renderDemo } from './render-demo';

/**
 * Exports one demo as a standalone client site, ready to hand over.
 *
 *   npm run demo:export redline-plumbing -- --domain redlineplumbing.com
 *
 * The output folder IS the client's website: indexable, watermark-free, with
 * every path rooted at their own domain. Push it to a private repo, connect a
 * Vercel project, point their DNS. This is also the exit procedure in
 * 03_BUILD_SYSTEM.md §8 — zip the folder and email it.
 */
const args = process.argv.slice(2);
const slug = args.find((arg) => !arg.startsWith('--'));

function flag(name: string): string | undefined {
  const inline = args.find((arg) => arg.startsWith(`--${name}=`));
  if (inline) return inline.slice(name.length + 3);
  const index = args.indexOf(`--${name}`);
  return index !== -1 ? args[index + 1] : undefined;
}

if (!slug) {
  console.error('usage: npm run demo:export <slug> -- --domain <domain> [--form-endpoint <url>]');
  console.error(`known slugs: ${demos.map((demo) => demo.slug).join(', ')}`);
  process.exit(1);
}

const demo = getDemo(slug);
if (!demo) {
  console.error(`Unknown demo "${slug}". Known slugs: ${demos.map((d) => d.slug).join(', ')}`);
  process.exit(1);
}

const domain = flag('domain');
const formEndpoint = flag('form-endpoint');
const outDir = join(ROOT, 'dist', 'clients', demo.slug);

renderDemo(demo, outDir, { mode: 'production', domain, formEndpoint });

console.log(`\n✓ Exported ${demo.tokens.BUSINESS_NAME}`);
console.log(`  → dist/clients/${demo.slug}/`);
console.log(`  domain: ${domain ?? demo.tokens.DOMAIN}${domain ? '' : '  (default — pass --domain)'}`);

if (!formEndpoint && demo.tokens.FORM_ENDPOINT.includes('REPLACE_ME')) {
  console.warn(
    '\n⚠ The quote form still points at a placeholder endpoint.\n' +
      '  Pass --form-endpoint <url> and submit a real test lead before handover.\n' +
      '  A site that silently drops leads is worse than no site.'
  );
}

if (demo.meta.isFictional) {
  console.warn(
    `\n⚠ "${demo.tokens.BUSINESS_NAME}" is flagged as a fictional sample business.\n` +
      '  Replace the business details with the real client data before shipping.'
  );
}
