# leopixels-site

The Leo Pixels company website. Currently a placeholder.

- **Live:** https://leopixels.com
- **Vercel project:** `leopixels-site` (team `leo-pixels`)
- **Production branch:** `main` — every push here deploys to leopixels.com automatically

## Structure

```
index.html     the entire site (inline CSS, no dependencies)
vercel.json    security headers
robots.txt     currently blocking all crawlers (placeholder)
```

## Deploying

Don't deploy by hand. Push to `main`:

```bash
git add .
git commit -m "describe the change"
git push
```

Vercel builds and publishes within ~30 seconds. Any other branch produces a
preview deployment on its own URL and does **not** touch leopixels.com.

## ⛔ Before the real site launches

- [ ] Remove `<meta name="robots" content="noindex, nofollow">` from `index.html`
- [ ] Change `robots.txt` from `Disallow: /` to `Allow: /`

Both are set deliberately so Google never indexes "Hello world" under the Leo
Pixels brand. Forgetting to remove them means the real site never ranks.

## Rollback

Vercel dashboard → project → Deployments → find a previous good one →
**Instant Rollback**. Serves the old build immediately. Note that this makes the
live site differ from `main`, so follow up with a `git revert` to bring the repo
back in line.
