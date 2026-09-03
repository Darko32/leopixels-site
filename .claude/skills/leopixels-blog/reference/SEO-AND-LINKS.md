# SEO AND LINKS

The imported BD skill carried six URL patterns built on a member directory, post-type taxonomies and `?category[]=` filter params. **None of that exists here.** LeoPixels has a small, statically known set of link targets, listed below.

## Internal link targets

Every internal target, complete. Anything not on this list does not exist — never invent a path.

| Target | Path | Notes |
|---|---|---|
| Home | `/` | |
| How it works | `/how-it-works` | a page of its own |
| Pricing | `/pricing` | a page of its own |
| FAQ | `/faq` | a page of its own |
| Demo showcase | `/#demos` | in-page anchor, verified id |
| Demo request form | `/#get-a-demo` | the CTA anchor. The route already renders a CTA; do not link this from prose. |
| Demos hub | `/demos` | |
| A case study | `/demos/<slug>` | **Read the slugs from `demos/index.ts`.** Four today: `redline-plumbing`, `ironwood-electric`, `agave-air`, `bighorn-roofing`. Never hardcode from memory. |
| Another post | `/blog/<slug>` | Published, non-draft only. Read from `content/blog/index.ts`. |
| Privacy | `/privacy` | Rarely relevant in a post. |

Rules:

- **Always a bare path.** Never `/mk/...`, never an absolute `https://leopixels.com/...`. The renderer resolves the locale.
- **Never link a draft post.** It 404s in production.
- **The demos are fictional sample builds.** Link them as examples of the work. Never as clients, never as proof of a result.

## The link pass

Write the prose first. Then, as a separate step, place links onto phrases the draft already contains.

1. List your candidate targets from the table above — the ones this post's subject genuinely touches.
2. Take each in turn and scan the finished draft for a phrase that matches it **by meaning**. Shared words are not required: "a working example of a plumber's site" matches `/demos/redline-plumbing`.
3. On a match, wrap that phrase. On no match, leave it unplaced.
4. Emit one line per candidate:

```
LINKED: /demos — "a working demo of the site"
LINKED: /demos/redline-plumbing — "an emergency plumber's page"
UNPLACED: /pricing — no phrase in the draft names what it costs
```

### The laws of the link pass

- **The pass adds links. It does not add, reshape or reorder a single sentence.** A sentence written or bent to host a link is a failure; wrapping a phrase a sentence already owns never is.
- **Anchor text is 2 to 5 words** the draft already wrote. Never the destination's title, never "here", never "this page", never "our demos".
- **Delete-and-reread test.** Remove the `<a>` and the sentence must still state a real fact and read naturally. No dangling stubs.
- **No href twice. No anchor phrase twice.**
- **Never open a sentence with an anchor.** Every link sits mid-sentence.
- **The anchor never names the site's furniture.** Not "our blog", not "the demos page", not "the case study section".
- Aim for roughly 3 to 6 internal links in a 1500-word post, distributed rather than clustered.
- Every link needs a `title` describing the destination in ~50-80 characters, never a repeat of the anchor.

External links follow `RESEARCH.md`. The renderer adds `rel="noopener" target="_blank"` — never write those yourself.

## Metadata

Three fields carry the SEO, all inside `content.<locale>`:

| Field | Rule |
|---|---|
| `title` | The H1 and the card title. ~70 characters, where Google truncates. A single statement — no `X: Y`, no `X (Y)`. No clickbait that overpromises. |
| `metaTitle` | Optional. Use only when the SEO title should carry long-tail modifiers the H1 has no room for: audience qualifier, scenario, related terms. Omit it and the H1 becomes the title tag. |
| `description` | ~150-160 characters. One sentence naming the decision the post settles. Not a restatement of the title. This string does triple duty — standfirst, card excerpt, meta description — so it must read well on the page, not only in a SERP. |

The `| LeoPixels` suffix is appended by the root layout. Do not write it into the title.

## What you must not touch

All of this is derived and already verified. A post never needs it changed.

| Concern | Where it happens | What it does |
|---|---|---|
| Canonical | `app/[locale]/blog/[slug]/page.tsx` | Self-referencing for a real translation. On an English fallback under `/mk`, points at the English URL. |
| hreflang | `languageAlternates(path, postLocales(post))` | Built from the `content` keys that exist. A post with no `mk` advertises no `mk` alternate. |
| Sitemap | `BLOG_POSTS` in `lib/seo/site.ts` | Derived from the registry. Lists real translations only; drafts never appear. |
| Article JSON-LD | `articleSchema()` in `lib/schema.ts` | BlogPosting, author and publisher both the organization. |
| FAQ JSON-LD | `contentFaq()` → `faqSchema()` | Built from the rendered `faq` block. |
| Breadcrumbs | `breadcrumbSchema()` | Blog → this post. |

**If a post seems to need one of these edited, the post is wrong.** Fix the post.

## Writing for AI answer engines

`app/robots.txt/route.ts` deliberately allows GPTBot, ClaudeBot, PerplexityBot and the rest: being quoted is a primary acquisition channel, not a leak. Posts are written to be quotable.

- **The first paragraph answers the headline standalone.** Assume it will be extracted with nothing around it, and that no other paragraph travels with it.
- **Question-shaped H2s** map to the questions people actually type. Keep them at or under half the headings.
- **Answer-first paragraphs.** The first 40-60 words under a heading answer it. Elaboration comes after.
- **Literal numbers, never adjectives.** "$500" gets quoted; "affordable" gets dropped.
- **The `faq` block is the highest citation density per word in the post.** Write it last, when you know which questions the body left unanswered.
- **Every claim must be true on a page a human can open.** A model that quotes a figure from a post and finds a different one on `/` stops quoting the domain.

## No images

`next.config.ts` declares no `images.remotePatterns`, so `next/image` rejects remote URLs, and the repo ships two local images in total. The site is near-imageless by design.

**The BD skill's entire Pexels pipeline is removed** — the ten-axis search table, orientation filtering, image dedup, the `post_image` field. There is no image field in the blog schema. Posts carry no artwork, the cards are set in type, and `articleSchema()` deliberately omits `image` rather than pointing it at something invented.
