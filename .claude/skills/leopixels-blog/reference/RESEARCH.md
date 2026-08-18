# RESEARCH: sources, gates and citations

The post is the definitive page on its subject. Sources exist to support its claims; the post never reviews, summarises or points at another page as its subject.

## Budget

Roughly 3-5 searches and 3-5 fetches per post. Read every result before firing a new query — the useful source is routinely at position 5-8, not 1.

Stop when you have **3 to 5 source-supported angles**. More research past that is procrastination.

## Where to look

- Government and public-data sources — Census, BLS, state licensing boards, municipal permit data
- Industry trade publications and contractor associations
- Search-engine documentation, published directly by the platform: Google Search Central, Google Business Profile help, Bing Webmaster docs
- Web-performance and UX research from named institutions — Core Web Vitals docs, Nielsen Norman Group, HTTP Archive
- Established practitioner publications with a named editorial operation
- Real contractor forums and communities, for what owners actually complain about — as colour and problem-framing, never as a cited fact

## Gates

Every extracted fact clears all five. The BD skill's date-sanity gate does **not** apply here — blog sources are evergreen and may be any age, though prefer recent data for anything about search behaviour or platform features.

| Gate | Rule |
|---|---|
| SPA / empty | Under ~500 characters of real text, or a script shell → skip the page. |
| Required fields | The specific number, date or claim you came for is actually on the page. Missing → skip. No synthesis. |
| Confidence | Self-rate 1-10 on how unambiguous and source-grounded the fact is. Below 8, drop it. |
| Source credibility | Government, university, association, platform documentation, or an established trade publication = high, one source is enough. A random blog, an SEO content farm, or an agency's lead-gen page = low, needs a second independent source or it does not ship. Same-owner outlets count as one source. |
| URL liveness | Every URL the post will link to is verified before it ships. See below. |

### URL liveness gate

Verify the **exact URL** you will link. A verified domain does not clear its other paths.

- **200 with real body content** → use it. A 200 whose body says "page not found" is a soft 404; treat it as dead.
- **404 or DNS failure** → drop the link. If it was the only support for a claim, drop the claim too.
- **403, 401, 429, timeout, WAF block** → **unknown, not verified.** A CDN blocking the bot is not proof the page is live. Confirm the exact URL string appears in one search result; still unconfirmed → drop it. Never ship on "it is probably fine".

Any URL that came from an aggregator or a secondary listing is verified independently. Never trust a third party's link as-is.

## Citations

- **2 citations per ~500 words, 4 maximum per post.** Fewer only when credible sources are genuinely exhausted.
- Cite **static destinations only**: a specific article, a documentation page, an organisation's own page. Never a search-results URL, never a tag or archive index, never anything behind a login.
- A citation **wraps a 2-to-5 word phrase the finished draft already contains**, in a sentence about the subject. Never a whole clause, never a sentence written to carry the citation, never the post's first sentence.
- The same source may be cited twice only if each citation supports a different fact.
- Never write a "Sources" footer. Never write "According to X" — see the formulaic-attribution ban in `VOICE.md`.

A named authority may hold a speech verb only when the sentence states its full finding:

> Google's documentation puts the map-pack ranking factors at relevance, distance and prominence.

Not:

> According to a recent article, local SEO is important.

## What never becomes a citation

- Anything supporting a claim about LeoPixels itself. Prices and turnaround come from `content/site.ts` and are true on the site's own pages; they are never externally cited.
- Statistics about conversion rates, lead costs or ROI attributed to LeoPixels' own work. None have been measured or published. General industry figures from a credible source are fine, clearly framed as industry figures and never as this company's results.
