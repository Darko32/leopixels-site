/**
 * Decide whether an automated blog run may start, and leave the repository in
 * the state it needs to start from.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * WHY THIS EXISTS
 * ───────────────────────────────────────────────────────────────────────────
 * The preconditions for an automated run were prose in the skill file, checked
 * by the agent with ad-hoc git commands. Prose cannot distinguish a branch that
 * is genuinely in flight from the leftovers of a run that already succeeded,
 * and the leftovers are guaranteed: after a post merges, the local clone still
 * holds its `blog/auto/*` branch and still has it checked out.
 *
 * Read literally — "stop if an unmerged blog/auto/* branch exists" — that
 * residue stops every future run, permanently, one run after the pipeline
 * first works. Which is exactly what a cap on in-flight posts must never do.
 *
 *   npm run blog:preflight                  check, tidy, and switch to main
 *   npm run blog:preflight -- --no-switch   check and tidy, stay where you are
 *   npm run blog:preflight -- --dry-run     report only, change nothing
 *
 * Exit code 0 means proceed. Exit code 1 means stop, and the last line says
 * why. Both are ordinary outcomes; only one of them is a problem.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * HOW "IN FLIGHT" IS DECIDED, AND WHY NOT BY ANCESTRY
 * ───────────────────────────────────────────────────────────────────────────
 * The obvious test — is the branch tip contained in origin/main — is wrong
 * here. auto-merge-blog.yml squash merges, so a merged post's commits never
 * become ancestors of main and every merged branch would read as unmerged
 * forever.
 *
 * What that workflow does do, immediately after merging, is delete the remote
 * branch. So the remote side of origin is the honest register:
 *
 *   a surviving origin/blog/auto/* ref  →  in flight (open, or pushed with no
 *                                          pull request yet, which blog:pr can
 *                                          finish)
 *   no such ref, local branch remains   →  finished work, reaped
 *
 * A local branch that was never pushed is neither: it blocks nothing on GitHub,
 * so it is not counted, and it holds commits that exist nowhere else, so it is
 * never deleted. It is reported and left alone.
 */

import { execFileSync } from 'node:child_process';

import { blogSchedule } from '../content/blog/schedule';

const argv = process.argv.slice(2);
const DRY_RUN = argv.includes('--dry-run');
const NO_SWITCH = argv.includes('--no-switch') || DRY_RUN;

const AUTOMATED_PREFIX = 'blog/auto/';
const BASE = 'main';

function stop(reason: string): never {
  console.log('');
  console.log(`blog-preflight: STOP — ${reason}`);
  process.exit(1);
}

/* ──────────────────────────────────  git  ──────────────────────────────── */

function git(...args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function refExists(ref: string): boolean {
  try {
    execFileSync('git', ['rev-parse', '--verify', '--quiet', ref], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/** True when `ref` is already contained in `container`. */
function isAncestor(ref: string, container: string): boolean {
  try {
    execFileSync('git', ['merge-base', '--is-ancestor', ref, container], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

interface LocalBranch {
  name: string;
  /** The upstream ref it was pushed to, or '' if it was never pushed. */
  upstream: string;
}

function localAutomatedBranches(): LocalBranch[] {
  const output = git(
    'for-each-ref',
    '--format',
    '%(refname:lstrip=2)\t%(upstream)',
    `refs/heads/${AUTOMATED_PREFIX}*`
  );
  if (!output) return [];

  return output.split('\n').map((line) => {
    const [name = '', upstream = ''] = line.split('\t');
    return { name, upstream };
  });
}

function remoteAutomatedBranches(): string[] {
  const output = git(
    'for-each-ref',
    '--format',
    '%(refname:lstrip=3)',
    `refs/remotes/origin/${AUTOMATED_PREFIX}*`
  );
  return output ? output.split('\n').filter(Boolean) : [];
}

/* ─────────────────────────────────  main  ──────────────────────────────── */

function main(): void {
  console.log('blog-preflight');

  /* ── 1. the kill switch ── */
  console.log(`  automation enabled : ${blogSchedule.enabled}`);
  if (!blogSchedule.enabled) {
    stop('blogSchedule.enabled is false in content/blog/schedule.ts.');
  }

  /* ── 2. a clean tree ── */
  // Untracked files are ignored on purpose: a half-written draft sitting in the
  // working directory is not a reason to refuse to write a different post.
  const dirty = git('status', '--porcelain', '--untracked-files=no');
  if (dirty) {
    console.log('  working tree       : dirty');
    console.log(dirty.replace(/^/gm, '    '));
    stop('there are uncommitted changes to tracked files. Deal with them first.');
  }
  console.log('  working tree       : clean');

  /* ── 3. current knowledge of the remote ── */
  // --prune is load-bearing rather than tidiness: a deleted remote branch is
  // the signal that a post merged, and without it every stale tracking ref
  // still reads as a post in flight.
  if (!DRY_RUN) git('fetch', 'origin', '--prune');
  console.log(`  origin/${BASE}        : ${git('rev-parse', '--short', `origin/${BASE}`)}`);

  /* ── 4. reap finished branches ── */
  const current = git('rev-parse', '--abbrev-ref', 'HEAD');
  const unpushed: string[] = [];

  for (const branch of localAutomatedBranches()) {
    const merged = isAncestor(branch.name, `origin/${BASE}`);
    const remoteGone = branch.upstream !== '' && !refExists(branch.upstream);

    if (!merged && !remoteGone) {
      if (branch.upstream === '') unpushed.push(branch.name);
      continue;
    }

    if (DRY_RUN) {
      console.log(`  finished, would reap: ${branch.name}`);
      continue;
    }
    if (branch.name === current && NO_SWITCH) {
      console.log(`  finished, kept     : ${branch.name} (checked out, --no-switch)`);
      continue;
    }
    // Deleting the checked-out branch is not allowed, so step off it first.
    if (branch.name === current) git('switch', BASE);
    // -D rather than -d: the commits are on main under a different hash after a
    // squash merge, so -d refuses them. The condition above is the safety check
    // -d would otherwise be providing.
    git('branch', '-D', branch.name);
    console.log(`  reaped             : ${branch.name}`);
  }

  for (const branch of unpushed) {
    console.log(`  local only, kept   : ${branch} (never pushed, blocks nothing)`);
  }

  /* ── 5. start from main ── */
  if (!NO_SWITCH) {
    if (git('rev-parse', '--abbrev-ref', 'HEAD') !== BASE) git('switch', BASE);
    // Fast-forward only. A main that has diverged locally is a repository
    // problem, and silently merging or resetting it would hide that.
    git('merge', '--ff-only', `origin/${BASE}`);
    console.log(`  on branch          : ${BASE} at ${git('rev-parse', '--short', 'HEAD')}`);
  } else {
    console.log(`  on branch          : ${git('rev-parse', '--abbrev-ref', 'HEAD')} (not switched)`);
  }

  /* ── 6. what is actually in flight ── */
  const inFlight = remoteAutomatedBranches().filter(
    (branch) => !isAncestor(`origin/${branch}`, `origin/${BASE}`)
  );

  const cap = blogSchedule.maxOpenAutomatedPosts;
  console.log(`  posts in flight    : ${inFlight.length} of ${cap} allowed`);
  for (const branch of inFlight) console.log(`    ${branch}`);

  if (inFlight.length >= cap) {
    stop(
      `${inFlight.length} automated post(s) unmerged on origin and the cap is ${cap}. ` +
        'Land or close them before writing another. If one was pushed but never opened ' +
        'as a pull request, `npm run blog:pr` on that branch finishes it.'
    );
  }

  console.log('');
  console.log('blog-preflight: PROCEED');
}

try {
  main();
} catch (error) {
  console.error('blog-preflight crashed:', error);
  process.exit(1);
}
