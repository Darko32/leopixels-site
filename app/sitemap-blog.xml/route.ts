/**
 * /sitemap-blog.xml
 *
 * Empty today, and that is fine — it returns a valid empty <urlset> with a 200,
 * and the sitemap index does not reference it until BLOG_POSTS has entries.
 *
 * To turn the blog on: add entries to BLOG_POSTS in lib/seo/site.ts. The index
 * picks the file up automatically. No other change needed.
 */

import { NextResponse } from 'next/server';
import { BLOG_POSTS, entryLocales, renderUrl, renderUrlset, XML_HEADERS } from '@/lib/seo/site';

export const dynamic = 'force-static';

export function GET() {
  const blocks: string[] = [];

  for (const post of BLOG_POSTS) {
    for (const locale of entryLocales(post)) {
      // Posts are dated content: once published they rarely change.
      blocks.push(renderUrl(post, locale, 'monthly'));
    }
  }

  return new NextResponse(renderUrlset(blocks), { headers: XML_HEADERS });
}
