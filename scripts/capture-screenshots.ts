import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';
import { mkdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { demos } from '../demos';
import { ROOT, renderDemo } from './render-demo';

/**
 * Captures a real screenshot of every demo's homepage and writes it to
 * public/demos/<slug>/{desktop,mobile}.webp — the exact path each demo's
 * config.ts already points `meta.screenshots` at (see demos/_schema.ts).
 *
 * DemoScreenshot (components/demos/DemoScreenshot.tsx) renders a designed
 * placeholder until that file exists, then upgrades to the real image
 * automatically — nothing there needs to change.
 *
 * This re-renders the same static sites scripts/build-demos.ts produces (so
 * the screenshot is always of the actual /preview/<slug> markup, not a
 * duplicate of it) and screenshots them with the machine's installed Chrome,
 * which is why this is a separate, explicit command rather than part of
 * `prebuild`: a production build host has no browser to launch. Run it
 * locally after any change to a demo's config or template —
 *
 *   npm run demo:screenshots
 *
 * — and commit the resulting webp files, the same way a real PageSpeed run
 * is required before `metrics.pagespeed`/`lcp` can be filled in.
 */

const PUBLIC_DIR = join(ROOT, 'public');
const SCREENSHOT_ROOT = join(PUBLIC_DIR, 'demos');

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Chosen so the raw viewport screenshot already matches the aspect ratio
// DemoScreenshot renders (aspect-[16/10] desktop, aspect-[9/16] mobile) —
// no downstream cropping or resizing needed to line the two up.
const TARGETS = [
  { variant: 'desktop', width: 1440, height: 900, quality: 72 },
  { variant: 'mobile', width: 390, height: 693, quality: 78 },
] as const;

async function serveStatic(): Promise<{ close: () => Promise<void>; origin: string }> {
  const server = createServer((req, res) => {
    void handleRequest(req, res);
  });

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  const { port } = server.address() as AddressInfo;
  return {
    origin: `http://127.0.0.1:${port}`,
    close: () => new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve()))),
  };
}

async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const filePath = join(PUBLIC_DIR, decodeURIComponent(url.pathname));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403).end();
    return;
  }

  try {
    const data = await readFile(filePath);
    const type = MIME[extname(filePath)] ?? 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type }).end(data);
  } catch {
    res.writeHead(404).end('Not found');
  }
}

async function main() {
  // Fresh preview HTML for every demo, exactly as scripts/build-demos.ts
  // produces for the live /preview route — screenshotting anything else
  // would risk drifting from what visitors actually see.
  const previewRoot = join(PUBLIC_DIR, 'preview');
  for (const demo of demos) {
    renderDemo(demo, join(previewRoot, demo.slug), { mode: 'demo' });
  }

  const { origin, close } = await serveStatic();
  const browser = await chromium.launch({ channel: 'chrome' });

  try {
    for (const demo of demos) {
      const outDir = join(SCREENSHOT_ROOT, demo.slug);
      await mkdir(outDir, { recursive: true });

      const page = await browser.newPage();
      try {
        for (const target of TARGETS) {
          await page.setViewportSize({ width: target.width, height: target.height });
          await page.goto(`${origin}/preview/${demo.slug}/index.html`, { waitUntil: 'networkidle' });

          const png = await page.screenshot({ type: 'png' });
          await sharp(png)
            .webp({ quality: target.quality })
            .toFile(join(outDir, `${target.variant}.webp`));

          console.log(`  ✓ ${demo.slug}/${target.variant}.webp`);
        }
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    await close();
  }

  console.log(`Captured screenshots for ${demos.length} demo${demos.length === 1 ? '' : 's'}.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
