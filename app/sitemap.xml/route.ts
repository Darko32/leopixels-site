/**
 * /sitemap.xml — the sitemap INDEX.
 *
 * This is the only sitemap URL that goes into Google Search Console and Bing
 * Webmaster Tools; they follow the children from here. Submitting the children
 * as well counts every URL twice in the coverage report.
 *
 * sitemap-blog.xml is listed ONLY once BLOG_POSTS has entries. An index that
 * points at an empty child earns a "Sitemap is empty" warning in Search Console
 * for as long as the blog stays empty.
 */

import { NextResponse } from 'next/server';
import { site } from '@/content/site';
import { BLOG_POSTS, HAS_BLOG, PAGES, newestLastmod, XML_HEADERS } from '@/lib/seo/site';

export const dynamic = 'force-static';

export function GET() {
  const children = [{ loc: `${site.url}/sitemap-pages.xml`, lastmod: newestLastmod(PAGES) }];

  if (HAS_BLOG) {
    children.push({ loc: `${site.url}/sitemap-blog.xml`, lastmod: newestLastmod(BLOG_POSTS) });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${children
  .map(
    (child) => `  <sitemap>
    <loc>${child.loc}</loc>
    <lastmod>${child.lastmod}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>
`;

  return new NextResponse(body, { headers: XML_HEADERS });
}
