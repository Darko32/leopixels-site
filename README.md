# leopixels-site

The Leo Pixels company website, plus the pipeline that builds client demo sites.

- **Live:** https://leopixels.com
- **Vercel project:** `leopixels-site` (team `leo-pixels`)
- **Production branch:** `main` — every push here deploys to leopixels.com automatically
- **Stack:** Next.js (App Router) · TypeScript · Tailwind v4 · next-intl (EN + MK)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Structure

```
app/[locale]/        the marketing site — EN at /, MK at /mk
demos/               one typed config per demo + the trades template
  _template/         index.template.html — edit this to change ALL demo sites
  <slug>/config.ts   a demo: case-study copy + site tokens, one file
scripts/             render / build / export the demo sites
messages/            en.json · mk.json — every string a visitor reads
i18n/  lib/  content/  components/
public/preview/      GENERATED demo sites, gitignored
```

## Demo sites

A demo is one config file. The same artifact is built two ways:

```bash
npm run build:demos                      # → public/preview/<slug>/  (runs automatically on build)
npm run demo:export <slug> -- --domain client.com --form-endpoint <url>
                                         # → dist/clients/<slug>/    (the client's standalone site)
```

Demos are served at `leopixels.com/preview/<slug>`. They are blocked from search
three ways — a `noindex` meta tag, `robots.ts`, and an `X-Robots-Tag` header in
`vercel.json` — because a demo must never outrank the real business it was
built for.

**On purchase**, `demo:export` produces a folder that *is* the client's website:
indexable, watermark-free, every path rooted at their own domain, with its own
`robots.txt`, `sitemap.xml`, `vercel.json` and a handover README. Push it to a
private repo, connect a Vercel project, point their DNS. The same command is the
exit procedure — zip the folder and email it.

**The build fails loudly if any `{{TOKEN}}` is unfilled.** That is deliberate: an
unfilled token reaching a prospect is the exact failure this guards against.

## Commands

```bash
npm run dev          npm run build        npm start
npm run lint         npm run typecheck
npm run build:demos  npm run demo:export
```

## Deploying

Don't deploy by hand. Push to `main`:

```bash
git add .
git commit -m "describe the change"
git push
```

Vercel builds and publishes within ~60 seconds. Any other branch produces a
preview deployment on its own URL and does **not** touch leopixels.com.

The Vercel project **must** use the Next.js framework preset with no Output
Directory override. `vercel.json` pins `"framework": "nextjs"` for exactly that
reason: this project was a hand-written `index.html` before it was a Next app,
and under the old "Other" preset Vercel publishes `public/` as a plain static
folder — which builds green and then 404s every route except `/preview/*`.

## ⛔ Before the real site launches

- [x] Set `indexable: true` in [content/site.ts](content/site.ts) — this one flag
      controls both the `noindex` meta tag and `robots.txt`. While it is `false`,
      Google cannot index anything.
- [ ] Set `RESEND_API_KEY` and `LEAD_NOTIFY_EMAIL` in Vercel, then **submit a real
      test enquiry and confirm it arrives**. Until the key is set the form logs
      an error and shows the visitor a fallback message rather than silently
      dropping the lead.
- [ ] Verify `leopixels.com` in Resend (DNS records) and set `LEAD_FROM_EMAIL` to
      a branded sender. Until then the form falls back to Resend's sandbox
      sender, which **only delivers to the Resend account owner's own address** —
      so a test that "works" for you will not reach any other inbox.
- [ ] Confirm the contact email in [content/site.ts](content/site.ts)
- [ ] Capture demo screenshots into `public/demos/<slug>/{desktop,mobile}.webp`
      (a designed placeholder renders until they exist)
- [ ] Run PageSpeed on the deployed preview URL and fill the measured
      `pagespeed` / `lcp` values in the demo config
- [ ] Submit to Google Search Console and Bing Webmaster Tools — **`sitemap.xml`
      only**, never the children. It is a sitemap index and it carries
      `sitemap-pages.xml` itself; submitting both counts every URL twice in the
      coverage report.
- [ ] Confirm `https://leopixels.com/preview/redline-plumbing` still responds
      with `X-Robots-Tag: noindex, nofollow` (it comes from `vercel.json`, so it
      only exists on a real deployment). Those demo sites are excluded by that
      header, deliberately, instead of by `robots.txt` — see the note at the top
      of [app/robots.txt/route.ts](app/robots.txt/route.ts).

## Rollback

Vercel dashboard → project → Deployments → find a previous good one →
**Instant Rollback**. Serves the old build immediately. Note that this makes the
live site differ from `main`, so follow up with a `git revert` to bring the repo
back in line.
