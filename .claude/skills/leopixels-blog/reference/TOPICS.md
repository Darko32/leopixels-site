# TOPICS: choosing, deduplicating and structuring a post

## The audience

US owner-operators in plumbing, HVAC, electrical, roofing and auto repair — the five trades in `demos/_schema.ts`. One person who answers the phone, quotes the job and does the work. They are not marketers, they are not shopping for a CMS, and they will not read a 400-word preamble.

Write for the owner, not for their competitor's marketing agency.

## Choosing a topic

If the user named a topic, use it. Skip to `Dedup`.

Otherwise brainstorm **5 candidates**, each in a different sub-theme. If two share an anchor noun or a subject, regenerate with wider spread before picking.

Sub-themes that fit the site without becoming an ad for it:

- Getting found — local search, Google Business Profile, service-area pages, reviews
- The phone call — what makes someone tap the number, what makes them bounce
- Websites as a trades tool — speed, mobile, forms, what a site must do at 2am
- Running the business — quoting, scheduling, seasonal demand, hiring
- The money side — what leads cost, what advertising returns, what to stop paying for

### Go specific, not safe

The default move is the broadest possible framing, which competes against millions of pages and ranks for nothing. Go two or three layers deeper. The qualifiers **are** the specificity: audience segment + scenario + format.

**Specific is not jargon.** The qualifier must be something an owner can picture — "a plumber with no website", "after a hailstorm", "a one-van shop" — never insider terminology.

Vary the shape across your five candidates. Do not open all of them with "How".

| Shape | Too broad | Good |
|---|---|---|
| Imperative | Improve Your Website | Fix the Three Things That Make Customers Leave Your Site at 2am |
| How-to | Local SEO Tips | How to Get Your Plumbing Business Into the Google Map Pack |
| Question | Do I Need a Website? | Is a Facebook Page Enough for a One-Van Plumbing Business? |
| Listicle | Marketing Ideas | 5 Things a Roofer Should Put on the Homepage Before Storm Season |
| Declarative | Websites Are Important | A Slow Website Costs More Than the Ads Pointing at It |
| Noun-phrase | Cost of a Website | The Real Cost of a $99-a-Month Website Builder Over Three Years |
| Comparison | Website Options | A Website Builder vs a Built Site for a Two-Person HVAC Shop |
| Guide | Getting Started Online | A Beginner's Guide to Service-Area Pages for Electricians |

### The line you do not cross

A post is useful writing that happens to be published by a company that sells websites. It is not a sales page. The reader should be able to act on it without buying anything. The CTA section at the bottom of every post is already rendered by the route — **the prose itself never pitches.**

## Dedup

Before researching, check the candidate against what exists. This is a filesystem read, not a query.

1. Read `content/blog/index.ts` for the registered posts.
2. `Glob` `content/blog/*/post.ts` to catch anything unregistered.
3. For each existing post, compare on three keys:
   - **slug** — exact or near-identical
   - **title** — semantic match, not string match
   - **angle** — the thesis. Two posts can share keywords and be genuinely different; two posts with the same thesis are the same post.

Emit one verdict line per candidate before proceeding:

```
1. Google Map Pack for plumbers (google-map-pack-plumbers) - no match - survives
2. What a website costs (website-cost-trades) - collides with content/blog/real-cost-of-cheap-websites - dropped
```

On a collision, **drop the candidate.** Do not retitle it or find a "fresh angle" on the same thesis. Take the next survivor. If all five collide, generate a second pool that is distinctly different, and say so.

## Format and length

Pick one format per post; let the topic decide. `format` is a schema field, so the label you pick is visible on the card.

| `format` | Words (English) | Use when |
|---|---|---|
| `how-to` | 1500-2500 | Step-by-step instruction |
| `listicle` | 1200-2000 | "N things", a counted set |
| `guide` | 2500-4000 | Definitive long-form coverage |
| `news` | 600-1200 | An update or announcement |
| `comparison` | 1500-2500 | "X vs Y", or when to choose one |

Length follows the material. A post that runs short because the research is genuinely exhausted is fine; one that runs short because you skipped a supported angle is not. Padding to hit a number is worse than either.

## Body structure

1. **Direct-answer opening.** `intro` is 2 paragraphs, 6-8 sentences split unevenly. The first answers what the headline promises, in fresh words, within roughly its first 100 words. The second widens to context and consequences. No throat-clearing, no "in this article".
2. **`keyFacts` block** directly after the intro when the topic has facts that tabulate. Skip it when it does not.
3. **Four or more `heading` level-2 sections**, each a distinct dimension of the topic. Mix statement-shaped and question-shaped headings; **question-shaped stays at or under half.** Questions capture long-tail queries and AI-Overview citations; all-questions reads like an FAQ with extra steps.
4. **Answer-first paragraph per H2.** The first 40-60 words answer what the heading promises. Then expand.
5. **Paragraphs 40-80 words**, 150 hard maximum. Sentences ~15-20 words. Long blocks fail on mobile and fail extraction.
6. **Lists earn their place.** `ordered: true` for sequence, unordered for parallel items. One or two lists per post, maximum. Prose is primary.
7. **`faq` block before the conclusion.** Heading in the topic's own words, never "Frequently Asked Questions". A 2-3 sentence `intro` stating a fact the questions share, then 3-4 questions the body did not already answer, each answered in 40-60 words.
8. **Conclusion**, one or two paragraphs, as the last `paragraph` blocks. It advances — a next step, a fresh specific, the subject against its wider field. It never recaps the body and never ends on a tidy maxim.

Every English heading is in Title Case. **Macedonian headings are sentence case** — Title Case is an English typographic convention, and applying it to Macedonian produces text that reads as broken. `blog-lint` enforces Title Case for `en` only.
