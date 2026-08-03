import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next 16 renamed the `middleware` file convention to `proxy`. The export shape
// is unchanged, so next-intl's createMiddleware still slots straight in.
export default createMiddleware(routing);

export const config = {
  // Excludes, in order: API routes, Next internals, the generated demo sites
  // under /preview, and anything with a file extension.
  //
  // /preview MUST stay excluded. Those are static files in public/ that are
  // byte-identical to what a client receives on purchase — if the locale
  // proxy rewrites them into a /mk segment, the demos break.
  matcher: '/((?!api|_next|_vercel|preview|.*\\..*).*)',
};
