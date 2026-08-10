/**
 * /sitemap-pages.xml
 *
 * Every indexable marketing page, in both locales, with a complete hreflang
 * cluster on each entry. 14 URLs today.
 *
 * Do not submit this file to Search Console directly — submit /sitemap.xml and
 * let the index carry it.
 */

import { NextResponse } from 'next/server';
import { PAGES, entryLocales, renderUrl, renderUrlset, XML_HEADERS } from '@/lib/seo/site';

export const dynamic = 'force-static';

export function GET() {
  const blocks: string[] = [];

  for (const page of PAGES) {
    // Home and the demos hub genuinely move. Everything else is stable —
    // claiming otherwise trains crawlers to discount the whole file.
    const changefreq = page.path === '/' || page.path === '/demos' ? 'weekly' : 'monthly';

    for (const locale of entryLocales(page)) {
      blocks.push(renderUrl(page, locale, changefreq));
    }
  }

  return new NextResponse(renderUrlset(blocks), { headers: XML_HEADERS });
}
