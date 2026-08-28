/**
 * Push an automated blog branch and open its pull request.
 *
 * This is the step that turns a written post into something the merge pipeline
 * can see, and it was the only step in the chain performed by hand-typed
 * commands rather than by a script. That made it the weak link: the generating
 * agent runs on whatever machine the schedule fires on, and if `gh` is not
 * installed there — as it is not on the machine this repository is developed on
 * — the run pushes a perfectly good branch and then stops, with no pull
 * request, no validation, no merge, and nothing obviously broken to notice.
 *
 * So the pull request is created here, over the REST API, with no dependency on
 * the GitHub CLI being present.
 *
 *   npm run blog:pr                 push the branch and open its pull request
 *   npm run blog:pr -- --dry-run    resolve credentials and report, change nothing
 *   npm run blog:pr -- --base dev   target a base branch other than main
 *
 * ───────────────────────────────────────────────────────────────────────────
 * IT IS IDEMPOTENT, AND THAT IS THE POINT
 * ───────────────────────────────────────────────────────────────────────────
 * An automated run that fails halfway is normal. Re-running this after a push
 * that already happened, or after a pull request that already exists, prints
 * the existing pull request and exits 0. A retry therefore costs nothing and
 * can never produce a second pull request for one branch.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * WHY A USER TOKEN RATHER THAN A WORKFLOW
 * ───────────────────────────────────────────────────────────────────────────
 * A workflow could open the pull request on push. It would be a trap: GitHub
 * deliberately does not trigger workflows for events created with the built-in
 * GITHUB_TOKEN, so the pull request would open and `Validate blog` would never
 * run on it, which means auto-merge-blog.yml would never fire and the post
 * would sit there forever. Opening it with a real user credential keeps the
 * ordinary `pull_request` trigger, and the existing gate, intact.
 */

import { execFileSync } from 'node:child_process';

import { blogPosts, postLocales } from '../content/blog';

const argv = process.argv.slice(2);

function flagValue(name: string): string | undefined {
  const index = argv.indexOf(name);
  if (index === -1) return undefined;
  return argv[index + 1];
}

const DRY_RUN = argv.includes('--dry-run');
const BASE = flagValue('--base') ?? 'main';
const AUTOMATED_PREFIX = 'blog/auto/';

function fail(message: string): never {
  console.error(`blog-pr: ${message}`);
  process.exit(1);
}

/* ──────────────────────────────────  git  ──────────────────────────────── */

function git(...args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

/**
 * The commit a ref points at, or null when there is no such ref.
 *
 * `--verify --quiet` plus a discarded stderr matters: "the branch has never
 * been pushed" is an expected answer here, and letting rev-parse print its
 * fatal-looking complaint about it makes a normal first run read as broken.
 */
function revParseOrNull(ref: string): string | null {
  try {
    return execFileSync('git', ['rev-parse', '--verify', '--quiet', ref], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
}

interface Repo {
  owner: string;
  name: string;
}

/** Accepts both remote URL forms git writes: https://… and git@github.com:…. */
function parseRemote(url: string): Repo {
  const match = url.match(/github\.com[/:]([^/]+)\/(.+?)(?:\.git)?$/);
  const owner = match?.[1];
  const name = match?.[2];
  if (!owner || !name) {
    fail(`could not read an owner/repo out of the origin remote "${url}".`);
  }
  return { owner, name };
}

/* ─────────────────────────────  credentials  ───────────────────────────── */

interface Credential {
  token: string;
  source: string;
}

/**
 * A token, from the first source that has one.
 *
 * The order runs from most explicit to most ambient. CI sets GH_TOKEN, a
 * developer may have the CLI, and the scheduled runner has neither — but it
 * does have the credential helper git already uses to push, which is why that
 * is the last resort rather than no resort.
 */
function resolveCredential(): Credential {
  for (const name of ['GH_TOKEN', 'GITHUB_TOKEN'] as const) {
    const value = process.env[name];
    if (value) return { token: value, source: `$${name}` };
  }

  try {
    const token = execFileSync('gh', ['auth', 'token'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (token) return { token, source: 'gh auth token' };
  } catch {
    // No CLI, or it is not logged in. Both are ordinary here.
  }

  try {
    const filled = execFileSync('git', ['credential', 'fill'], {
      input: 'protocol=https\nhost=github.com\n\n',
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    for (const line of filled.split('\n')) {
      if (line.startsWith('password=')) {
        const token = line.slice('password='.length).trim();
        if (token) return { token, source: 'git credential helper' };
      }
    }
  } catch {
    // The helper declined, or there is nothing stored for github.com.
  }

  fail(
    'no GitHub credential available.\n' +
      '  Tried $GH_TOKEN, $GITHUB_TOKEN, `gh auth token`, and the git credential helper.\n' +
      '  Set GH_TOKEN to a token with `repo` scope, or run a `git push` once so the\n' +
      '  credential helper stores one.'
  );
}

/* ───────────────────────────────  the API  ─────────────────────────────── */

const API = 'https://api.github.com';

async function api<T>(
  credential: Credential,
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${credential.token}`,
      'content-type': 'application/json',
      'user-agent': 'leopixels-blog-pr',
      'x-github-api-version': '2022-11-28',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    fail(
      `GitHub returned HTTP ${response.status} for ${method} ${path}.\n` +
        `  Credential source: ${credential.source}\n` +
        `  ${detail.slice(0, 500)}`
    );
  }

  return (await response.json()) as T;
}

interface PullRequest {
  number: number;
  html_url: string;
}

/* ────────────────────────────  the description  ────────────────────────── */

/**
 * The body, built from the post the branch is named after.
 *
 * A reviewer opening this should see what is being published and when without
 * reading a 500-line config diff, and should be told what happens next, because
 * for an automated post the answer is "it merges itself".
 */
function buildBody(branch: string): string {
  const slug = branch.slice(AUTOMATED_PREFIX.length);
  const post = blogPosts.find((candidate) => candidate.slug === slug);

  const lines = ['Automated post, generated by the `leopixels-blog` skill.', ''];

  if (post) {
    lines.push(
      `- **Slug** \`${post.slug}\``,
      `- **Publishes** ${post.publishedAt}`,
      `- **Locales** ${postLocales(post).join(', ')}`,
      ''
    );
  }

  lines.push(
    'Validated locally before pushing: `blog:lint --external --strict`, `lint`,',
    '`typecheck` and `build`. `Validate blog` re-runs all of it on a clean checkout,',
    'and `Auto-merge blog posts` merges this once that passes and every changed file',
    'is under `content/blog/`.',
    '',
    'Opened by `npm run blog:pr`.'
  );

  return lines.join('\n');
}

/* ─────────────────────────────────  main  ──────────────────────────────── */

async function main(): Promise<void> {
  const branch = git('rev-parse', '--abbrev-ref', 'HEAD');

  if (branch === 'HEAD') fail('HEAD is detached. Check out the post branch first.');
  if (branch === BASE) fail(`refusing to open a pull request from ${BASE} onto itself.`);
  if (!branch.startsWith(AUTOMATED_PREFIX)) {
    fail(
      `branch "${branch}" is not an automated post branch.\n` +
        `  Automated posts must be on ${AUTOMATED_PREFIX}<slug>: auto-merge-blog.yml keys on\n` +
        '  that prefix, and a differently named branch is never merged.'
    );
  }

  // A pull request describes commits, not a working tree. Opening one while
  // part of the post is still unstaged publishes a half-post.
  const dirty = git('status', '--porcelain', '--untracked-files=no');
  if (dirty) {
    fail(`uncommitted changes to tracked files. Commit them first:\n${dirty}`);
  }

  const repo = parseRemote(git('remote', 'get-url', 'origin'));
  const head = git('rev-parse', 'HEAD');
  const subject = git('log', '-1', '--pretty=%s');

  console.log(`blog-pr: ${repo.owner}/${repo.name}`);
  console.log(`  branch : ${branch}`);
  console.log(`  head   : ${head}`);
  console.log(`  base   : ${BASE}`);

  const credential = resolveCredential();
  console.log(`  auth   : ${credential.source}`);

  /* ── push ── */
  const remoteHead = revParseOrNull(`refs/remotes/origin/${branch}`);

  if (remoteHead === head) {
    console.log('  push   : already up to date');
  } else if (DRY_RUN) {
    console.log(`  push   : would push (remote is ${remoteHead ?? 'absent'})`);
  } else {
    console.log(`  push   : pushing (remote is ${remoteHead ?? 'absent'})`);
    git('push', '--set-upstream', 'origin', `${branch}:${branch}`);
  }

  /* ── an existing pull request wins ── */
  const open = await api<PullRequest[]>(
    credential,
    'GET',
    `/repos/${repo.owner}/${repo.name}/pulls?state=open&head=${repo.owner}:${encodeURIComponent(branch)}`
  );

  const existing = open[0];
  if (existing) {
    console.log('');
    console.log(`blog-pr: pull request already open: ${existing.html_url}`);
    return;
  }

  /* ── create ── */
  const payload = {
    title: subject,
    body: buildBody(branch),
    head: branch,
    base: BASE,
    maintainer_can_modify: true,
  };

  if (DRY_RUN) {
    console.log('');
    console.log('blog-pr: dry run, nothing created. Would open:');
    console.log(`  title: ${payload.title}`);
    console.log(payload.body.replace(/^/gm, '  '));
    return;
  }

  const created = await api<PullRequest>(
    credential,
    'POST',
    `/repos/${repo.owner}/${repo.name}/pulls`,
    payload
  );

  console.log('');
  console.log(`blog-pr: opened #${created.number} — ${created.html_url}`);
  console.log('blog-pr: not merging. Validate blog runs, then auto-merge decides.');
}

main().catch((error) => {
  console.error('blog-pr crashed:', error);
  process.exit(1);
});
