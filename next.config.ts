import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Demo sites are generated into public/preview/<slug>/index.html by scripts/build-demos.ts.
  // Next does not resolve directory indexes inside public/, so map the clean URL onto the file.
  // beforeFiles runs ahead of the filesystem check, which covers both with and without a
  // trailing slash without making the whole site trailingSlash: true.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/preview/:slug', destination: '/preview/:slug/index.html' },
        { source: '/preview/:slug/', destination: '/preview/:slug/index.html' },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default withNextIntl(nextConfig);
