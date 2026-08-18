# ARCHITECTURE: the repo contract

Read before writing any code. Everything here is verifiable in the repository — if a statement below disagrees with the source, the source wins and this file needs fixing.

## The stack

Next.js 16 App Router, React 19, TypeScript 5.9 (`strict`, `noUncheckedIndexedAccess`), Tailwind v4, next-intl 4, npm. **No MDX, no markdown parser, no CMS, no test runner.** Do not add one.

## Where a post lives

A post is **two files touched**, and nothing else:

```
content/blog/<slug>/post.ts     ← new: the post itself
content/blog/index.ts           ← edited: one import + one array entry
```

That is the entire registration. Do **not** also edit:

| File | Why not |
|---|---|
| `lib/seo/site.ts` | `BLOG_POSTS` derives from the registry. Editing it by hand creates the drift the file exists to prevent. |
| `app/[locale]/blog/**` | The routes read the registry. A post never needs a route change. |
| `components/blog/**` | The renderer handles every block kind. A post that needs a new component is a post using the wrong blocks. |
| `messages/*.json` | Post text lives in the post config. Only the blog's own chrome is in messages. |
| `content/site.ts` | The `Blog` nav link is already wired and gated on a post existing. |

## The schema

From `content/blog/_schema.ts`. Import from `../_schema` inside a post file.

```ts
defineBlogPost({
  slug: string,              // matches the folder name, lowercase-hyphenated, never changes after publish
  publishedAt: string,       // 'YYYY-MM-DD'
  updatedAt?: string,        // 'YYYY-MM-DD' — only when the CONTENT changes later
  format: 'how-to' | 'listicle' | 'guide' | 'news' | 'comparison',
  tags?: readonly string[],  // free-text labels. NOT a taxonomy — the site has none. Do not invent one.
  draft?: boolean,           // true = renders in `next dev` only, never in the sitemap
  content: {
    en: BlogPostContent,     // REQUIRED — it is the fallback every other locale resolves to
    mk?: BlogPostContent,    // expected in the normal workflow
  },
})
```

`BlogPostContent` is one language's complete document:

```ts
{
  title: string,             // the H1, the card title, the JSON-LD headline. ~70 chars.
  description: string,       // the standfirst, the card excerpt, AND the meta description. ~150-160 chars.
  metaTitle?: string,        // only when the SEO title should carry modifiers the H1 has no room for
  intro: readonly RichText[],// the opening paragraphs, before any heading
  body: readonly BlogBlock[],
}
```

**There is no `locales` field.** Coverage is derived from which `content` keys exist, by `postLocales()`. Never add one; never try to declare a translation that is not written.

## Body blocks

The complete set. There are no others, and adding one means editing the renderer — which is out of scope.

```ts
{ kind: 'paragraph', text: RichText }
{ kind: 'heading', level: 2 | 3, text: string }        // H1 is the title; never emit one
{ kind: 'list', ordered?: boolean, items: readonly RichText[] }
{ kind: 'keyFacts', items: readonly string[] }          // the at-a-glance block; plain strings, no links
{ kind: 'faq', heading: string, intro: RichText, items: readonly { question: string; answer: RichText }[] }
```

Notes that matter:

- **`keyFacts` goes directly after `intro`, before the first heading.** Short key-value facts, each under ~10 words. Skip the block when the topic has no facts that tabulate.
- **`faq` feeds the page's FAQPage JSON-LD automatically** via `contentFaq()`. The rendered questions and the structured data cannot disagree, so write answers that read well as plain text — a link inside an answer is flattened to its anchor text in the schema.
- **One `faq` block per post**, placed before the conclusion. `contentFaq()` takes the first.

## RichText

Prose is an array. Plain strings are text; objects are links and emphasis.

```ts
type RichText = readonly (string | InlineLink | InlineStrong)[];

// a link
{ text: 'the demo builds', href: '/demos', title: 'Demo websites built for trades businesses' }

// emphasis
{ text: 'you own the domain', strong: true }
```

- `href` starting with `/` renders through the locale-aware `Link`, so `/demos` becomes `/mk/demos` automatically. **Never write `/mk/...` by hand.**
- Any other `href` is external and gets `rel="noopener" target="_blank"` automatically. Never add those attributes yourself.
- `title` is required on every link. It describes the destination in ~50-80 chars and is never a repeat of `text`.
- Whitespace is yours to manage: `['Text ', {…}, ' more text.']` — the renderer concatenates without adding spaces.

## Worked example

`assets/post.example.ts` is a complete, schema-valid post using every block kind. Copy its shape.

## Validation

Run all three from the repo root, in this order. All three must pass.

```bash
npm run lint
```

```bash
npm run typecheck
```

```bash
npm run build
```

`typecheck` is the real schema validator — a malformed post cannot compile. `build` proves the routes generate.

Then confirm from the build output:

- The route table lists `/en/blog/<slug>` **and** `/mk/blog/<slug>`.
- A draft post appears in neither.
- `.next/server/app/sitemap-blog.xml.body` lists the English URL, and the Macedonian one only if `content.mk` exists.

`assets/CHECKLIST.md` has the full gate, including the canonical and hreflang checks.

## Repo hygiene

- **Work on a branch.** `git switch -c blog/<slug>`. Every push to `main` deploys to leopixels.com.
- **Never commit or push.** Hand the change back for review.
- `tsconfig.tsbuildinfo` changes when you run typecheck. Restore it — `git checkout -- tsconfig.tsbuildinfo` — so the diff is only your real work.
- Report the change set with `git status --short` and `git diff --stat`.
