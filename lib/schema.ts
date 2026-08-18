import { pricing, site } from '@/content/site';
import { routing, type Locale } from '@/i18n/routing';
import { absoluteUrl } from './seo';

type Json = Record<string, unknown>;

/**
 * Structured data builders.
 *
 * Deliberately absent:
 *  - LocalBusiness with a US address. LeoPixels operates from North Macedonia
 *    and sells into US metros; a fabricated local address is exactly the
 *    invented-fact class 03_BUILD_SYSTEM.md §6 forbids, and Google penalises it.
 *    Organization + areaServed is the honest and correct type.
 *  - AggregateRating. There are no reviews yet. The client template omits it for
 *    the same reason: a hand-typed rating is a penalty risk, not a shortcut.
 */

export function organizationSchema(locale: Locale, description: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: absoluteUrl(locale, '/'),
    description,
    email: site.email,
    areaServed: { '@type': 'Country', name: site.areaServed },
    knowsLanguage: [...routing.locales],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      availableLanguage: ['English', 'Macedonian'],
    },
  };
}

export function websiteSchema(locale: Locale, name: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name,
    url: absoluteUrl(locale, '/'),
    inLanguage: locale,
    publisher: { '@id': `${site.url}/#organization` },
  };
}

/** Public pricing is a genuine rich-result advantage in a niche that hides it. */
export function serviceSchema(locale: Locale, name: string, description: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: 'Website design',
    provider: { '@id': `${site.url}/#organization` },
    areaServed: { '@type': 'Country', name: site.areaServed },
    offers: [
      {
        '@type': 'Offer',
        name: 'Website build',
        price: String(pricing.buildFee),
        priceCurrency: pricing.currency,
      },
      {
        '@type': 'Offer',
        name: 'Monthly plan',
        priceCurrency: pricing.currency,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: String(pricing.monthlyFee),
          priceCurrency: pricing.currency,
          billingIncrement: 1,
          unitCode: 'MON',
        },
      },
    ],
  };
}

export function faqSchema(items: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(
  locale: Locale,
  crumbs: { name: string; path: string }[]
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(locale, crumb.path),
    })),
  };
}

export function creativeWorkSchema(
  locale: Locale,
  demo: { slug: string; name: string; description: string }
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: demo.name,
    description: demo.description,
    url: absoluteUrl(locale, `/demos/${demo.slug}`),
    creator: { '@id': `${site.url}/#organization` },
    inLanguage: locale,
  };
}

/**
 * A blog post.
 *
 * `image` is deliberately absent. Google lists it as recommended for
 * BlogPosting, but the repo ships no per-post artwork and declares no
 * `images.remotePatterns` — pointing the field at a generic OG card would claim
 * an illustration of the article that does not exist. Same rule as the missing
 * AggregateRating above: a field left out is always correct, a field filled in
 * with something untrue never is.
 *
 * Author and publisher are both the organization. LeoPixels publishes no
 * bylines, and inventing a Person to fill the slot is the same fabrication.
 */
export function articleSchema(
  locale: Locale,
  post: {
    slug: string;
    headline: string;
    description: string;
    datePublished: string;
    dateModified?: string;
  }
): Json {
  const url = absoluteUrl(locale, `/blog/${post.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.headline,
    description: post.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    inLanguage: locale,
    author: { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
    isPartOf: { '@id': `${site.url}/#website` },
  };
}

export function itemListSchema(
  locale: Locale,
  items: { name: string; path: string }[]
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(locale, item.path),
    })),
  };
}
