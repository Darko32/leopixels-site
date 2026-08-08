import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { BuildMode, DemoConfig } from '../demos/_schema';

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(HERE, '..');
const TEMPLATE_DIR = join(ROOT, 'demos', '_template');
const TEMPLATE_FILE = join(TEMPLATE_DIR, 'index.template.html');

/** leopixels.com origin, used for canonical/OG on demo builds. */
const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://leopixels.com';

const NOINDEX = '<meta name="robots" content="noindex, nofollow">';

const DEMO_BANNER = `<div style="background:#0d1117;color:#fff;padding:10px 16px;text-align:center;font:600 14px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;position:relative;z-index:150">
Design sample — this is a LeoPixels demo, not a real business. Details are illustrative.
</div>`;

/** Corner badge plus the return path back to the marketing site. */
const demoWatermark = (slug: string) =>
  `<a href="${SITE_ORIGIN}/demos/${slug}" style="position:fixed;right:14px;bottom:76px;z-index:140;background:#0d1117;color:#fff;padding:9px 17px;border-radius:100px;font:700 12px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;letter-spacing:.06em;box-shadow:0 4px 14px rgba(0,0,0,.28);text-decoration:none">DEMO · Built by LeoPixels</a>`;

export interface RenderOptions {
  mode: BuildMode;
  /** Production only — the client's real domain. Falls back to tokens.DOMAIN. */
  domain?: string;
  /** Production only — the live form endpoint. Falls back to tokens.FORM_ENDPOINT. */
  formEndpoint?: string;
}

/**
 * Fills the template and writes a complete, self-contained static site.
 *
 * The demo build and the client's shipped site are the same artifact with
 * different flags — which is what makes migration on purchase a copy rather
 * than a rewrite.
 */
export function renderDemo(demo: DemoConfig, outDir: string, options: RenderOptions): void {
  const { mode } = options;
  const isDemo = mode === 'demo';

  const domain = options.domain ?? demo.tokens.DOMAIN;
  const siteOrigin = isDemo ? SITE_ORIGIN : `https://${domain}`;
  const assetBase = isDemo ? `/preview/${demo.slug}/assets` : '/assets';
  // No trailing slash: Next runs trailingSlash:false, so /preview/<slug>/ 308s
  // to /preview/<slug>. The canonical must name the URL that actually serves.
  const canonicalPath = isDemo ? `/preview/${demo.slug}` : '/';

  const values: Record<string, string> = {
    ...demo.tokens,
    FORM_ENDPOINT: options.formEndpoint ?? demo.tokens.FORM_ENDPOINT,
    SITE_ORIGIN: siteOrigin,
    ASSET_BASE: assetBase,
    CANONICAL_PATH: canonicalPath,
    // A demo must never outrank the real business it was built for.
    ROBOTS_TAG: isDemo ? NOINDEX : '',
    DEMO_BANNER: isDemo ? DEMO_BANNER : '',
    DEMO_WATERMARK: isDemo ? demoWatermark(demo.slug) : '',
  };

  let html = readFileSync(TEMPLATE_FILE, 'utf8');
  for (const [key, value] of Object.entries(values)) {
    html = html.split(`{{${key}}}`).join(value);
  }

  // --- guard: no unfilled token may ever ship ---
  // Ported deliberately from build.py. A failed build is the guard working.
  const leftover = [...new Set([...html.matchAll(/\{\{([A-Z0-9_]+)\}\}/g)].map((m) => m[1]))].sort();
  if (leftover.length > 0) {
    throw new Error(
      `Demo build failed for "${demo.slug}" — unfilled tokens: ${leftover.join(', ')}`
    );
  }

  // Clean rebuild so a renamed asset can never linger.
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html, 'utf8');

  // Shared placeholder assets, then per-demo assets layered on top.
  cpSync(join(TEMPLATE_DIR, 'assets'), join(outDir, 'assets'), { recursive: true });
  const demoAssets = join(ROOT, 'demos', demo.slug, 'assets');
  if (existsSync(demoAssets)) {
    cpSync(demoAssets, join(outDir, 'assets'), { recursive: true });
  }

  if (isDemo) {
    // The /preview route is already blocked by app/robots.ts and an X-Robots-Tag
    // header; this file only matters if the folder is ever served standalone.
    writeFileSync(join(outDir, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');
    return;
  }

  // --- production extras: everything the client's own deployment needs ---
  writeFileSync(
    join(outDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: https://${domain}/sitemap.xml\n`,
    'utf8'
  );

  writeFileSync(
    join(outDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://${domain}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
    'utf8'
  );

  writeFileSync(
    join(outDir, 'vercel.json'),
    `${JSON.stringify(
      {
        $schema: 'https://openapi.vercel.sh/vercel.json',
        headers: [
          {
            source: '/(.*)',
            headers: [
              { key: 'X-Content-Type-Options', value: 'nosniff' },
              { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
              { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
              {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload',
              },
            ],
          },
          {
            source: '/assets/(.*)',
            headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
          },
        ],
      },
      null,
      2
    )}\n`,
    'utf8'
  );

  writeFileSync(join(outDir, 'README.md'), handoverReadme(demo, domain), 'utf8');
}

function handoverReadme(demo: DemoConfig, domain: string): string {
  return `# ${demo.tokens.BUSINESS_NAME}

Your website. Built by LeoPixels.

## What this is

Every file your site needs, in this one folder. It is plain HTML — no database,
no platform account, no software to keep updated.

\`\`\`
index.html    the entire site
assets/       images and the favicon
robots.txt    tells search engines to index the site
sitemap.xml   helps Google find the page
vercel.json   security headers
\`\`\`

## You own this

These files are yours, and **${domain} is registered in your name**. If you ever
want to move, you can host this folder almost anywhere in about ten minutes —
drag it into Cloudflare Pages, Netlify, or hand it to any developer.

## Making changes

Email LeoPixels and it is changed, usually within 24–48 hours. Text, photos,
hours and contact details are included in your monthly plan.

## Before this goes live

- [ ] Replace the form endpoint and send a real test enquiry to confirm it arrives
- [ ] Confirm the licence number in the footer is correct
- [ ] Check the name, address and phone match your Google Business Profile exactly
- [ ] Confirm the three reviews are your own customers' words, used with their
      permission. Never paste text out of your Google Business Profile — the
      review belongs to the person who wrote it.
`;
}
