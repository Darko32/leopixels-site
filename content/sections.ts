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

export const faqKeys = [
  'wordOfMouth',
  'noWebsite',
  'facebook',
  'isAi',
  'forever',
  'cancel',
  'existing',
  'timeline',
] as const;

export type FaqKey = (typeof faqKeys)[number];
