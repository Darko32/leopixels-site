# CHECKLIST: the gate before handing back

Work through every line. A post that fails one is not finished. Report the result of each section.

## 1. Files

- [ ] `content/blog/<slug>/post.ts` exists, and `<slug>` matches the folder name exactly.
- [ ] `content/blog/index.ts` has one new import and one new array entry.
- [ ] **No other file changed.** Confirm with `git status --short`. If anything else appears, revert it.
- [ ] `git checkout -- tsconfig.tsbuildinfo` if typecheck modified it.

## 2. Schema

- [ ] `slug` is lowercase, hyphenated, no leading or trailing hyphen.
- [ ] `publishedAt` is a UTC ISO instant shaped exactly like `2026-08-20T09:00:00Z`, not a date and not a placeholder.
- [ ] Automation mode only: `publishedAt` came from `nextPublishSlot()`, not from your own arithmetic.
- [ ] `updatedAt` is absent on a new post.
- [ ] `format` is one of the five allowed values, and matches what the post actually is.
- [ ] `content.en` is present and complete.
- [ ] `content.mk` is present, **or** its absence is deliberate and reported.
- [ ] **No `locales` field anywhere.** It does not exist in the schema.
- [ ] No `image`, `post_image`, `post_status`, `user_id`, `category` or any other field the schema does not define.

## 3. Structure, per language

- [ ] `intro` is 2 paragraphs, 6-8 sentences, split unevenly.
- [ ] The first intro paragraph answers the headline standing alone.
- [ ] 4 or more `heading` level-2 blocks.
- [ ] Question-shaped headings are at or under half.
- [ ] Every **English** heading is Title Case.
- [ ] Every **Macedonian** heading is sentence case, not Title Case.
- [ ] No `heading` with `level: 1`.
- [ ] At most one `faq` block, placed before the conclusion.
- [ ] `faq` has 3-4 questions, each answering something the body did not.
- [ ] The conclusion advances. It does not recap.
- [ ] Paragraphs are 40-80 words, none over 150.
- [ ] Both languages have the same block sequence.

## 4. Voice

- [ ] Ran the full `VOICE.md` self-check, both languages.
- [ ] No em-dash or en-dash anywhere in post content.
- [ ] No curly quotes, no `…`, no non-breaking space.
- [ ] No client counts, ratings, testimonials, guarantees or case-study results.
- [ ] Every claim about LeoPixels is true on a page a human can open.
- [ ] Prices read from `content/site.ts`, not from memory.
- [ ] The prose does not pitch. The CTA is the route's job.
- [ ] Scored 40/50 or better on the five dimensions.

## 5. Links

- [ ] Every internal `href` is on the table in `SEO-AND-LINKS.md`.
- [ ] Every `/demos/<slug>` was read from `demos/index.ts`, not recalled.
- [ ] No `/mk/...` written by hand anywhere.
- [ ] No absolute `https://leopixels.com/...` internal links.
- [ ] Every link has a `title` that describes the destination and is not the anchor repeated.
- [ ] Every anchor is 2-5 words the draft already contained.
- [ ] No anchor opens a sentence.
- [ ] No href appears twice; no anchor phrase appears twice.
- [ ] Delete-and-reread passed on every link.
- [ ] Every external URL passed the liveness gate.
- [ ] No external link carries hand-written `rel` or `target`.
- [ ] Both languages carry the same links on equivalent phrases.

## 6. Build

Run all four. Paste the real result; never report a check you did not run.

```bash
npm run blog:lint -- --external --strict
```

```bash
npm run lint
```

```bash
npm run typecheck
```

```bash
npm run build
```

- [ ] All four pass. `blog:lint` is the same command CI runs, so a failure here is a failure there.

## 7. Routes and SEO, from the build output

- [ ] The route table lists `/en/blog/<slug>`.
- [ ] The route table lists `/mk/blog/<slug>`.
- [ ] A draft post appears in neither.

Then inspect the generated files:

```bash
grep -o '<link rel="canonical"[^>]*>' ".next/server/app/en/blog/<slug>.html"
```

```bash
grep -o '<link rel="alternate" hrefLang="[a-z-]*"' ".next/server/app/mk/blog/<slug>.html"
```

- [ ] Bilingual post: each locale's canonical points at itself; both carry `en`, `mk` and `x-default` alternates.
- [ ] English-only post: `/mk/blog/<slug>` returns 200, its canonical points at the **English** URL, and it carries **no `mk` alternate**.
- [ ] English-only post: the Macedonian page shows the "In English" badge and the translation note.

```bash
grep -c "<loc>" .next/server/app/sitemap-blog.xml.body
```

- [ ] Sitemap lists the English URL.
- [ ] Sitemap lists the Macedonian URL only if `content.mk` exists.
- [ ] Sitemap lists no draft.
- [ ] `sitemap.xml` now includes the `sitemap-blog.xml` child.

## 8. Navigation

- [ ] The header and footer show the `Blog` link, in both locales, now that a post exists.
- [ ] Every link in the post resolves. No 404 in either locale.

## 9. Hand back

- [ ] Report the branch name.
- [ ] Report `git status --short` and `git diff --stat`.
- [ ] Report the word count per language and the reading estimate.
- [ ] Report every source cited, with its URL and its liveness verdict.
- [ ] State plainly if `content.mk` was omitted, and why.
- [ ] Interactive mode: **nothing committed, nothing pushed.** Stop and wait.
- [ ] Automation mode: commit, then `npm run blog:pr`, then report the pull request URL. The run is not finished until that URL exists. Still never merge.
