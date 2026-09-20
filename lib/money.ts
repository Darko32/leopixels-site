import { pricing } from '@/content/site';

/**
 * Prices, written the same way in both locales.
 *
 * The offer is priced in euros and every line of copy — English and Macedonian
 * alike — writes it "€450". Formatting through the active locale instead
 * renders "450 €" on /mk, so the same page would show two spellings of the
 * same number: the badge under the hero against the figure in the pricing
 * card. The amount is the fact here, not the locale's punctuation, so it is
 * formatted once, in the notation the copy already uses.
 */
const format = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: pricing.currency,
  maximumFractionDigits: 0,
});

export function formatMoney(amount: number): string {
  return format.format(amount);
}
