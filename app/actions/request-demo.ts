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

  const accessKey = process.env.WEB3FORMS_KEY;

  if (!accessKey) {
    // No provider configured yet. Log it rather than silently dropping the
    // lead — a form that quietly loses enquiries is worse than no form.
    console.error('[demo-request] WEB3FORMS_KEY is not set. Lead not delivered:', values);
    return { status: 'error', message: t('generic'), values };
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Free demo request — ${values.business} (${values.city})`,
        from_name: 'LeoPixels site',
        to: process.env.LEAD_NOTIFY_EMAIL ?? site.email,
        business: values.business,
        trade: values.trade,
        city: values.city,
        contact: values.contact,
        reply_language: values.locale,
      }),
    });

    if (!response.ok) throw new Error(`Web3Forms responded ${response.status}`);
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
