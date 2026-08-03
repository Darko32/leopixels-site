import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware replacements for next/link and next/navigation. Using these
// instead of the Next primitives is what keeps `/mk` prefixes correct without
// every call site having to know about locales.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
