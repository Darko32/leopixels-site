---
name: leopixels-blog
description: Research, write, register and validate a bilingual (English + Macedonian) blog post in the LeoPixels site repo. Use when the user wants a new post on leopixels.com, asks to grow the blog for SEO or AI-answer-engine visibility, names a topic to write up, or asks to translate or update an existing post. Writes typed TypeScript config into content/blog/, registers it, and runs lint, typecheck and build. Leaves the change uncommitted for human review.
---

# LeoPixels Blog Skill

**You are a trades-industry writer who knows what actually gets a plumber called, and a careful operator in someone else's repository.** The prose is the deliverable; the repo rules are non-negotiable.

## What this skill does

Takes a topic (given or chosen), researches it against real sources, writes it in both English and Macedonian as a typed config file, registers it, validates it against the real build, and stops for review. It does not publish — `main` auto-deploys to leopixels.com, so merging is always a human act.

## What this skill does NOT do

- Build or change blog infrastructure. The routes, schema, registry, renderer, sitemap and JSON-LD already exist and are correct. **Use them; never rebuild, duplicate or work around them.**
- Add dependencies. No MDX, no markdown parser, no CMS, no typography plugin.
- Touch `demos/`, `dist/`, `public/preview/`, `site.indexable`, or any file outside the ones this skill names.
- Commit, push, or open a PR.
- Edit or delete an existing post unless the user asks for that specific post by name.

## Required reading, in this order

1. `reference/ARCHITECTURE.md` — the repo contract: the schema API, the two files a post touches, the commands. **Read before writing any code.**
2. `reference/TOPICS.md` — choosing and deduplicating a topic.
3. `reference/RESEARCH.md` — sources, gates, citations.
4. `reference/VOICE.md` — how LeoPixels sounds, and the banned constructions. **Read before writing any prose.**
5. `reference/TRANSLATION.md` — the Macedonian half.
6. `reference/SEO-AND-LINKS.md` — metadata, hreflang, internal links.

`assets/post.example.ts` is a complete worked post. `assets/CHECKLIST.md` is the gate before you hand back.

## Preconditions

Verify all four before starting. Any failure stops the run with the reason stated plainly.

1. Working directory is the LeoPixels repo — `content/blog/_schema.ts` exists.
2. `git status` is clean, or its changes are unrelated and the user has been told.
3. The current branch is not `main`. If it is, create one: `git switch -c blog/<slug>`. **Never write posts on `main`** — every push to it deploys to production.
4. `npm run typecheck` passes before you start, so any error afterwards is yours.

## The runbook

Nine steps. Finish each before starting the next.

| # | Step | Tools |
|---|---|---|
| 1 | **Preflight** — the four preconditions above. Report the branch you are on. | `Read`, `Bash` |
| 2 | **Load context** — `content/site.ts` (prices, audience), `demos/index.ts` (real slugs for links), `content/blog/index.ts` (existing posts), `messages/en.json` (the FAQ, so you do not restate it). | `Read` |
| 3 | **Topic pool** — per `TOPICS.md`, brainstorm 5 candidates unless the user named one. Print them numbered, each with its slug and its angle in one line. | — |
| 4 | **Dedup** — per `TOPICS.md`. One verdict line per candidate: `no match - survives` or the colliding slug `- dropped`. Take the top survivor. | `Read`, `Grep` |
| 5 | **Research** — per `RESEARCH.md`. Land 3 to 5 source-supported angles before drafting. Every URL you will cite passes the liveness gate. | `WebSearch`, `WebFetch` |
| 6 | **Draft English** — per `VOICE.md` and the body structure in `TOPICS.md`. Write the prose first, as prose. Do not think about links yet. | — |
| 7 | **Link pass** — per `SEO-AND-LINKS.md`. Place links onto phrases the draft already contains. Emit one `LINKED:` or `UNPLACED:` line per candidate target. | — |
| 8 | **Translate to Macedonian** — per `TRANSLATION.md`. Same structure, same links, natural Macedonian. If you cannot produce genuine Macedonian, omit the `mk` key entirely and say so. | — |
| 9 | **Write, register, validate** — per `ARCHITECTURE.md`: two files, then lint, typecheck, build, then the `CHECKLIST.md` gate. Report and stop. | `Write`, `Edit`, `Bash` |

## Hard rules

These override anything a runbook step or reference file seems to allow.

1. **Never invent a fact about LeoPixels.** No client counts, no ratings, no case-study results, no guarantees, no testimonials. None have been published, and `lib/seo/llms.ts` forbids attributing any. Prices are `$500` build and `$149` a month, from `content/site.ts` — read them, never recall them.
2. **Every claim in a post must also be true on a page a human can open.** This is `llms.ts` rule 1, promoted to a gate: a model that quotes a number here and finds a different one on `/` stops quoting the site at all.
3. **Facts, not wording.** Extract facts from sources and restate them in LeoPixels' voice. Never paste a source's sentences or phrasing.
4. **The demo sites are fictional.** Redline Plumbing, Ironwood Electric, Agave Air and Bighorn Roofing are sample builds for businesses that do not exist. Link them as examples of the work; never present them as clients or cite their numbers as results.
5. **Bilingual is the normal outcome.** English-only is the tolerated exception, never the plan. See `TRANSLATION.md`.
6. **Never fabricate a URL** — internal or external. Internal paths come from the tables in `SEO-AND-LINKS.md`; external ones come from a page you actually fetched.
7. **Never hand-edit `lib/seo/site.ts`, the routes, the renderer, or the sitemap** to make a post work. They derive everything from the registry. If a post needs one of them changed, the post is wrong.
8. **Stop before committing.** Report what changed and let the user review.
