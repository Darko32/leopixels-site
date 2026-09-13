/**
 * Section item keys. The text for each lives in messages/<locale>.json under
 * the matching path — these arrays only fix the order and the count.
 *
 * The FAQ list is also the source for FAQPage JSON-LD, so the rendered
 * questions and the structured data can never disagree.
 */

export const proofKeys = ['demo', 'weight', 'ownership', 'cancel'] as const;

export const includedKeys = ['call', 'emergency', 'services', 'area', 'form', 'seo'] as const;

export const stepKeys = ['one', 'two', 'three', 'four'] as const;

export const pricingIncludeKeys = ['one', 'two', 'three', 'four', 'five'] as const;

/** The plan items the homepage pricing card names; /pricing carries the full list. */
export const pricingTeaserIncludeKeys = ['one', 'two', 'three'] as const;

/**
 * Ordered by what a visitor asks once they have seen the demos and the price:
 * the practical questions first (the homepage teaser shows the first six), then
 * the objections and the fine print, which /faq carries in full.
 */
export const faqKeys = [
  'timeline',
  'provide',
  'maintain',
  'ownDomain',
  'existing',
  'wordOfMouth',
  'noWebsite',
  'facebook',
  'isAi',
  'forever',
  'cancel',
] as const;

export type FaqKey = (typeof faqKeys)[number];
