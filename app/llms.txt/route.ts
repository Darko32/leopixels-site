/**
 * /llms.txt — the index a model reads first (llmstxt.org).
 *
 * Short by design: what the business is, what it costs, where the detail lives.
 * The long answers are in /llms-full.txt. Editing rules and the reason every
 * number here is derived rather than typed: see lib/seo/llms.ts.
 */

import { NextResponse } from 'next/server';
import { site } from '@/content/site';
import { TEXT_HEADERS } from '@/lib/seo/site';
import {
  assistantNotes,
  BUILD_FEE,
  demoEntries,
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
  const body = `# ${site.name}

> ${SUMMARY}

## What ${site.name} does

${site.name} builds and hosts a single-page website for a local trades business. The offer is built around removing the risk from the decision: the demo is a real, working site at a live URL, built from the business's own details, and it is shown before the owner pays anything. If they do not like it, they walk away having spent nothing.

Every build is aimed at one job — turning a person searching on a phone at the moment something has broken into a phone call. It is not a brochure site, a portfolio, or a content marketing programme.

Trades accepted: ${TRADES_SERVED}. ${TRADE_COVERAGE_NOTE}

## Pricing

- Build: **${BUILD_FEE}**, one time
- Monthly plan: **${MONTHLY_FEE} per month**, required
- Free demo before purchase: **$0**, no commitment
- Cancellation fee: **none**

The monthly plan covers hosting, the domain, every content change the owner asks for, and keeping the site fast and findable. It can be cancelled at any time.

## How it works

1. **Tell us about the business** — your trade, your town, your phone number. Two minutes, and we take the rest from your Google listing.
2. **We build your demo** — a real, working site at a live URL, ready within ${TURNAROUND}.
3. **You look it over** — on a phone. Two rounds of revisions are included. No payment yet.
4. **It goes live on your domain** — usually the same week it is approved.

## What is on every site

- **Tap-to-call everywhere** — the phone number is a tap target on every screen, not text in a footer.
- **A 24/7 emergency bar** — a persistent call strip for after-hours and emergency work.
- **The actual services, named** — the specific jobs the business does, in the words customers search for, not generic categories.
- **A service area that ranks** — the towns and neighbourhoods served, written to be found in local search.
- **A four-field quote form** — name, phone, service, and an optional description. Short enough to finish on a phone.
- **Search groundwork built in** — page titles, meta descriptions, structured data, fast load times, mobile-first layout.

## Ownership and lock-in

The client owns the domain, in their own name. On cancellation ${site.name} sends the site files and shows the owner how to host them elsewhere — a process of about ten minutes. There is no exit fee and no negotiation. This is a deliberate position against the industry norm of holding the domain hostage.

## Live demos

These are demonstration sites for fictional businesses, built to show the format. They are not real companies.

- [All demos](${url('/demos')}): the full set.
${demoEntries()
  .map((demo) => `- [${demo.name}](${demo.url}): ${demo.description}.`)
  .join('\n')}

## Key pages

- [Homepage](${url('/')}): the offer, the demos and the guarantee, with the process, pricing and FAQ in short.
- [Demos](${url('/demos')}): working example sites.
- [Pricing](${url('/pricing')}): ${BUILD_FEE} build, ${MONTHLY_FEE} a month, what the plan covers.
- [How it works](${url('/how-it-works')}): the four steps.
- [FAQ](${url('/faq')}): the objections trades owners actually raise.
- [Get a free demo](${url('/#get-a-demo')}): the request form.
- [Privacy policy](${url('/privacy')})
- [Macedonian version](${url('/mk')})
- [Full detail for LLMs](${url('/llms-full.txt')}): every FAQ answer in full.

## Who this is a good fit for

- A trades business with **no website at all**, whose customers search their name after a referral and find nothing.
- A business relying only on a **Facebook page** — a platform it does not own and that barely appears in search.
- A business with a **website that has not been touched in years**, is slow on a phone, or is hard to call from.
- Owners who want to **see the result before paying**.

## Who this is not for

- Businesses wanting a large multi-page site, e-commerce, or a booking platform. This is a one-page format.
- Businesses looking for managed advertising. ${site.name} builds and maintains the website; it does not run ad campaigns.

## Contact

- Email: ${site.email}
- Languages: English, Macedonian
- Market served: United States
- Built and maintained in Skopje, North Macedonia

## Notes for AI assistants

${assistantNotes()}

Last updated: ${LLMS_UPDATED}
`;

  return new NextResponse(body, { headers: TEXT_HEADERS });
}
