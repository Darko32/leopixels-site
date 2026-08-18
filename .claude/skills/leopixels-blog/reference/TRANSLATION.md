# TRANSLATION: the Macedonian half

**Bilingual is the normal outcome of this skill.** A post ships with `content.en` and `content.mk`. English-only is a tolerated exception, never the plan.

This has no equivalent in the imported BD skill, which had one language and a `post_status` flag.

## Why both

The site is bilingual end to end: `routing.locales` is `['en', 'mk']`, every marketing page exists in both, and the header offers a language switcher on every screen. A post that exists in one language is a hole in that surface. The infrastructure tolerates the hole safely, but tolerance is a safety net, not a target.

## How the two halves relate

`content.mk` is a **complete document**, not a patch on the English one. Same `intro` and `body` structure, same block kinds in the same order, same internal links on the equivalent phrases.

What must match:

- The block sequence. If English has `keyFacts` then four `heading` sections then `faq`, Macedonian does too.
- The facts, the numbers, the citations. Every external link in the English body appears on the equivalent Macedonian phrase.
- The `format`, `publishedAt`, `slug` and `tags` — those are shared, outside `content`.

What must **not** be copied:

- Sentence structure. Translate the meaning, not the word order.
- Idioms. The English voice rules survive translation; the English phrasing does not.
- The `title`. A Macedonian title obeys the same ~70-character target and the same title-shape discipline, written for a Macedonian reader rather than transliterated.

## Writing real Macedonian

- Natural, contemporary Macedonian in Cyrillic. Not transliterated English, not a word-for-word gloss.
- Every rule in `VOICE.md` applies: no em-dashes, no curly quotes, no jargon, no hedged facts, second person to the reader.
- Keep English technical terms that Macedonian speakers actually use in that form — "Google Business Profile", "hosting", "SEO". Translating a term nobody translates makes the post harder to read, not more local.
- Prices stay in USD, matching `content/site.ts` and `lib/seo/index.ts`, which notes both locales quote the same USD offer.
- The US-market framing is deliberate and stays. The Macedonian version is the same article for the same business, readable by a Macedonian speaker.

## When you genuinely cannot translate

Omit the `mk` key entirely.

```ts
content: {
  en: { /* the full document */ },
  // no mk key
}
```

**Never** do any of these instead:

- Write a machine-flavoured Macedonian version to fill the slot. A bad translation is worse than an honest absence — the site's own `caseStudy.englishNote` exists because LeoPixels would rather say "this is in English" than fake it.
- Copy the English text into `content.mk`. That advertises a translation that does not exist, and the derived hreflang would then claim a Macedonian page whose content is English.
- Add a `locales` field. There isn't one. Coverage is derived from which keys exist.

Then **say so explicitly** in your final report, so the user can commission the translation.

## What the infrastructure does with an English-only post

Verified behaviour, not a promise — do not re-engineer any of it:

| | With `content.mk` | Without it |
|---|---|---|
| `/blog/<slug>` | English page, canonical to itself | English page, canonical to itself |
| `/mk/blog/<slug>` | Macedonian page, canonical to itself | **200**, English text, canonical to the English URL |
| hreflang | `en`, `mk`, `x-default` | `en`, `x-default` only |
| Header switcher | Maps EN ↔ MK | Both links resolve, neither 404s |
| Visible on the MK page | Nothing extra | "In English" badge, translation note, `lang="en"` on the article |
| `sitemap-blog.xml` | Both URLs | English URL only |

The fallback is why you must never hand-write a `/mk/...` path anywhere. Internal links use bare paths like `/demos`, and the locale-aware `Link` resolves them per locale.

## Adding a translation later

To translate an existing English-only post, add the `mk` key to its `content` object and set `updatedAt` to the date the translation lands. Everything else — hreflang, sitemap, the badge, the switcher — follows automatically from the key existing. No other file changes.
