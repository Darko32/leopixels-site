'use client';

import { useActionState, useId } from 'react';
import { requestDemo, type DemoRequestState } from '@/app/actions/request-demo';
import type { Trade } from '@/demos/_schema';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { ButtonSubmit } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/icons';

export interface FormCopy {
  business: { label: string; placeholder: string };
  trade: { label: string; placeholder: string };
  city: { label: string; placeholder: string };
  contact: { label: string; placeholder: string };
  submit: string;
  submitting: string;
  privacyNote: string;
}

const initialState: DemoRequestState = { status: 'idle' };

/**
 * Four fields. Every field past four costs conversions, and that rule applies
 * to our own form too.
 *
 * Controls are 16px on every screen size, not just from `sm` up: anything
 * smaller makes iOS Safari zoom the page on focus, which on a phone reads as
 * the layout breaking the moment someone taps into the form.
 *
 * Copy arrives as props rather than through useTranslations, so no
 * NextIntlClientProvider is needed and the message bundle stays server-side.
 */
export function DemoRequestForm({
  copy,
  trades,
  locale,
}: {
  copy: FormCopy;
  /** value + translated label, in display order. */
  trades: { value: Trade; label: string }[];
  locale: Locale;
}) {
  const [state, formAction, pending] = useActionState(requestDemo, initialState);
  const id = useId();

  const fieldId = (name: string) => `${id}-${name}`;
  const errorId = (name: string) => `${id}-${name}-error`;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot — off-screen, never announced, never tabbable. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor={fieldId('company')}>Company</label>
        <input id={fieldId('company')} type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message ? (
        <p
          role="alert"
          className="rounded-card bg-[hsl(8_80%_95%)] px-4 py-3 text-small font-semibold text-[hsl(8_72%_36%)]"
        >
          {state.message}
        </p>
      ) : null}

      <Field
        id={fieldId('business')}
        errorId={errorId('business')}
        name="business"
        label={copy.business.label}
        placeholder={copy.business.placeholder}
        autoComplete="organization"
        defaultValue={state.values?.business}
        error={state.errors?.business}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId('trade')} className={LABEL}>
          {copy.trade.label}
        </label>
        <select
          id={fieldId('trade')}
          name="trade"
          required
          defaultValue={state.values?.trade ?? ''}
          aria-invalid={state.errors?.trade ? true : undefined}
          aria-describedby={state.errors?.trade ? errorId('trade') : undefined}
          className={cn(CONTROL, state.errors?.trade ? INVALID : 'border-line')}
        >
          <option value="" disabled>
            {copy.trade.placeholder}
          </option>
          {trades.map((trade) => (
            <option key={trade.value} value={trade.value}>
              {trade.label}
            </option>
          ))}
        </select>
        {state.errors?.trade ? (
          <FieldError id={errorId('trade')}>{state.errors.trade}</FieldError>
        ) : null}
      </div>

      <Field
        id={fieldId('city')}
        errorId={errorId('city')}
        name="city"
        label={copy.city.label}
        placeholder={copy.city.placeholder}
        autoComplete="address-level2"
        defaultValue={state.values?.city}
        error={state.errors?.city}
      />

      <Field
        id={fieldId('contact')}
        errorId={errorId('contact')}
        name="contact"
        label={copy.contact.label}
        placeholder={copy.contact.placeholder}
        autoComplete="email"
        defaultValue={state.values?.contact}
        error={state.errors?.contact}
      />

      <ButtonSubmit
        type="submit"
        size="lg"
        disabled={pending}
        className="mt-2 w-full disabled:pointer-events-none disabled:opacity-70"
      >
        {pending ? (
          copy.submitting
        ) : (
          <>
            {copy.submit}
            <ArrowRightIcon />
          </>
        )}
      </ButtonSubmit>

      <p className="text-caption text-body">{copy.privacyNote}</p>
    </form>
  );
}

const LABEL = 'text-small font-bold text-text';

const CONTROL = cn(
  'min-h-[52px] rounded-card border bg-canvas px-4 text-base text-text placeholder:text-body/55',
  'transition-colors focus:border-accent-deep focus:outline-none'
);

const INVALID = 'border-[hsl(8_72%_52%)]';

function Field({
  id,
  errorId,
  name,
  label,
  placeholder,
  autoComplete,
  defaultValue,
  error,
}: {
  id: string;
  errorId: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(CONTROL, error ? INVALID : 'border-line')}
      />
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="text-[0.8125rem] font-semibold text-[hsl(8_72%_44%)]">
      {children}
    </p>
  );
}
