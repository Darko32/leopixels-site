import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // Pre-launch: block everything. See site.indexable in content/site.ts.
  if (!site.indexable) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The generated demo sites. They are near-duplicate trades pages, and a
      // demo must never outrank the real business it was built for. Also
      // enforced by a noindex meta tag in the demo HTML and an X-Robots-Tag
      // header in vercel.json, because files in public/ bypass Next metadata.
      disallow: ['/preview/'],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
