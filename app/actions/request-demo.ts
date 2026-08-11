'use server';

import { getTranslations } from 'next-intl/server';
import { site } from '@/content/site';
import { TRADES } from '@/demos/_schema';
import { redirect } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

export interface DemoRequestState {
  status: 'idle' | 'error';
  errors?: Partial<Record<'business' | 'trade' | 'city' | 'contact', string>>;
  message?: string;
  /** Echoed back so a failed submit does not wipe what they typed. */
  values?: Record<string, string>;
}

/**
 * Forwards a demo request to the LeoPixels inbox.
 *
 * Runs server-side so the provider key never reaches the browser. Validation
 * messages come from the active locale, and the notification records which
 * language the enquiry came in on so the reply goes back in the right one.
 */
export async function requestDemo(
  _previous: DemoRequestState,
  formData: FormData
): Promise<DemoRequestState> {
  const t = await getTranslations('form.errors');

  // Honeypot. Bots fill every field they find; people never see this one.
  if (String(formData.get('company') ?? '').length > 0) {
    return { status: 'idle' };
  }

  const values = {
    business: String(formData.get('business') ?? '').trim(),
    trade: String(formData.get('trade') ?? '').trim(),
    city: String(formData.get('city') ?? '').trim(),
    contact: String(formData.get('contact') ?? '').trim(),
    locale: String(formData.get('locale') ?? 'en'),
  };

  const errors: DemoRequestState['errors'] = {};
  if (!values.business) errors.business = t('business');
  if (!TRADES.includes(values.trade as (typeof TRADES)[number])) errors.trade = t('trade');
  if (!values.city) errors.city = t('city');
  // Deliberately loose: a phone number and an email are both fine, and a strict
  // pattern here would reject more real enquiries than it would spam.
  if (values.contact.length < 5) errors.contact = t('contact');

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // No provider configured yet. Log it rather than silently dropping the
    // lead — a form that quietly loses enquiries is worse than no form.
    console.error('[demo-request] RESEND_API_KEY is not set. Lead not delivered:', values);
    return { status: 'error', message: t('generic'), values };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // The sandbox sender works before leopixels.com is verified in Resend,
        // but only delivers to the account owner. Set LEAD_FROM_EMAIL once the
        // domain is verified.
        from: process.env.LEAD_FROM_EMAIL ?? 'LeoPixels site <onboarding@resend.dev>',
        to: process.env.LEAD_NOTIFY_EMAIL ?? site.email,
        subject: `Free demo request — ${values.business} (${values.city})`,
        // Only when they left an email. `contact` takes a phone number just as
        // happily, and Resend rejects the whole send on a malformed reply_to.
        ...(values.contact.includes('@') ? { reply_to: values.contact } : {}),
        text: [
          `Business: ${values.business}`,
          `Trade: ${values.trade}`,
          `City: ${values.city}`,
          `Contact: ${values.contact}`,
          `Reply in: ${values.locale}`,
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      // Carry the body, not just the status. A bare status code is what made
      // the previous provider's refusal take a documentation dig to diagnose.
      throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
    }
  } catch (error) {
    console.error('[demo-request] delivery failed:', error, values);
    return { status: 'error', message: t('generic'), values };
  }

  const locale = (routing.locales as readonly string[]).includes(values.locale)
    ? (values.locale as Locale)
    : routing.defaultLocale;

  // Throws a redirect signal. next-intl types this as void rather than never,
  // so the return below is unreachable but keeps the signature honest.
  redirect({ href: '/thanks', locale });
  return { status: 'idle' };
}
