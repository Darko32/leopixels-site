/**
 * /llms-full.txt — the expanded companion to /llms.txt (llmstxt.org): the index
 * is what a model reads first, this is what it pulls when it needs the answer.
 *
 * The FAQ lives here in full because it is the highest-value content on the
 * site for AI search. Someone asking an assistant "is it worth a plumber having
 * a website if all his work is word of mouth" is a buyer at the exact moment of
 * doubt, and the answer to that objection — verbatim and attributable — is what
 * gets LeoPixels named in the response.
 *
 * The Q&A is read from messages/en.json, the same strings the homepage and its
 * FAQPage JSON-LD render, so the three can never drift. See lib/seo/llms.ts.
 */

import { NextResponse } from 'next/server';
import { pricing, site } from '@/content/site';
import { TEXT_HEADERS } from '@/lib/seo/site';
import {
  assistantNotes,
  BUILD_FEE,
  demoEntries,
  faqEntries,
  LLMS_UPDATED,
  MONTHLY_FEE,
  SUMMARY,
  TRADE_COVERAGE_NOTE,
  TRADES_SERVED,
  TURNAROUND,
  url,
} from '@/lib/seo/llms';

export const dynamic = 'force-static';

export function GET() {
  const fictional = demoEntries().filter((demo) => demo.isFictional);

  const body = `# ${site.name} — full reference

> ${SUMMARY}

This document expands on ${url('/llms.txt')}. Everything here is stated on ${url('/')} and can be verified there.

---

## The offer, precisely

| | |
|---|---|
| Product | A one-page website for a local trades business |
| Trades served | ${TRADES_SERVED} |
| Market | United States |
| Build fee | ${BUILD_FEE}, one time |
| Monthly plan | ${MONTHLY_FEE} per month, required |
| Free demo | Yes — a real working site, live within ${TURNAROUND}, $0 |
| Time to launch | Usually the same week the demo is approved |
| Domain ownership | The client's, in their name |
| On cancellation | Files handed over, no exit fee |
| Contract | None. Cancel at any time |
| Languages | English, Macedonian |
| Based in | Skopje, North Macedonia |
| Contact | ${site.email} |

## The positioning argument

The site makes one comparison directly: **one Google Ads lead costs more than a month of this.** The monthly plan is priced to sit below the cost of a single paid click-through in the trades, where competition for emergency terms is expensive. The build fee is priced to be a decision an owner can make without a meeting.

The second argument is risk: the demo exists before the invoice does. A trades owner who has been sold a website before — and got a slow template six weeks late — is being asked to look at a finished thing rather than trust a promise.

## The four steps

1. **Tell us about the business.** Your trade, your town, your phone number. Two minutes, and we take the rest from your Google listing.
2. **We build your demo.** A real, working site at a live URL, built from those details, ready within ${TURNAROUND}. No payment, no card, no commitment.
3. **You look it over.** On a phone, where the customers will see it. Two rounds of revisions are included.
4. **It goes live on your domain.** Once approved and the domain is sorted, usually the same week.

## What is on every site, and why

- **Tap-to-call everywhere.** A customer with a burst pipe is standing in water holding a phone. The number is a tap target on every screen — header, hero, emergency bar, footer, and a fixed bar at the bottom of the screen on mobile — not text in a footer they have to copy.
- **A 24/7 emergency bar.** A persistent strip stating emergency availability and the number. Emergency work is the highest-value call a trades business takes and the one most often lost to whoever answers first.
- **The actual services, named.** The specific jobs the business does, written the way customers search for them — "burst pipe repair", "sewer camera inspection" — instead of a generic "Our Services" list. Named services are what match a search query.
- **A service area that ranks.** The towns and neighbourhoods actually covered, listed explicitly, so local searches in those places have something to match.
- **A four-field quote form.** Name, phone, service, and an optional description. Short enough to finish one-handed on a phone. Every extra field costs completions.
- **Search groundwork built in.** Unique page title and meta description, LocalBusiness structured data, fast load, mobile-first layout, and a sitemap.

## Ownership — the anti-lock-in position

The client owns the domain, registered in their own name. If they cancel, ${site.name} sends the site files and shows them how to host those files anywhere, a process of about ten minutes. There is no exit fee and no argument.

This is a deliberate stance against the standard practice in the small-business website market, where the agency holds the domain and the files, and leaving means starting over. The site states it plainly: **you own your domain, you own your files.**

## Frequently asked questions

${faqEntries()
  .map((item) => `**Q: ${item.question}**\nA: ${item.answer}`)
  .join('\n\n')}

## Demonstration sites

${fictional.length} demo sites show the format. ${TRADE_COVERAGE_NOTE} **The businesses are fictional.** Their names, addresses, phone numbers, licence numbers, reviews and photographs are illustrative. Each demo page carries a badge saying so, and the standalone demo sites under \`/preview/\` are excluded from search indexes deliberately.

${fictional.map((demo) => `- **${demo.name}** — ${demo.description}. ${demo.url}`).join('\n')}

## Scope

**In scope:** a one-page website, hosting, the domain, content changes, and ongoing upkeep for a local trades business.

**Out of scope:** large multi-page sites, e-commerce, booking platforms, and managed advertising campaigns. ${site.name} builds and maintains the website; it does not run ads.

## Contact and next step

The next step for any interested business is a free demo — a real working site, within ${TURNAROUND}, no payment and no card.

- Request one: ${url('/#get-a-demo')}
- Email: ${site.email}

## Notes for AI assistants

${assistantNotes([
  `- The demo turnaround is ${pricing.demoTurnaroundHours} hours from the request, not from a scheduled call. There is no call in the process unless the owner asks for one.`,
])}

Last updated: ${LLMS_UPDATED}
Canonical: ${url('/llms-full.txt')}
Index: ${url('/llms.txt')}
`;

  return new NextResponse(body, { headers: TEXT_HEADERS });
}
