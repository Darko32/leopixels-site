/**
 * What the blog currently holds, and what is about to change.
 *
 * Two jobs, one source of truth. For a person it prints published, scheduled
 * and draft posts with the next go-live time. For the publish sweep it answers
 * one question: has anything become due since the last check?
 *
 *   npm run blog:status                        human-readable summary
 *   npm run blog:status -- --json              the same as JSON
 *   npm run blog:status -- --due-within-minutes 70 --github-output
 *
 * The sweep uses the last form. It never re-implements the gate: `isPublished`
 * from content/blog/_schema.ts decides, exactly as the site does, so the sweep
 * and the build can never disagree about whether a post is live.
 */

import { appendFileSync } from 'node:fs';

import { blogPosts, isPublished, postLocales } from '../content/blog';
import type { BlogPost } from '../content/blog';
import { blogSchedule, nextPublishSlot, formatSlot } from '../content/blog/schedule';
import { plannedTopics, queuedTopics } from '../content/blog/planned';

// `npm run blog:status | head` closes stdout early, which otherwise crashes the
// process with an unhandled EPIPE. Piping a status report into head is a normal
// thing to do, so it should exit quietly rather than print a stack trace.
process.stdout.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EPIPE') process.exit(0);
  throw error;
});

const argv = process.argv.slice(2);

function flagValue(name: string): string | undefined {
  const index = argv.indexOf(name);
  if (index === -1) return undefined;
  return argv[index + 1];
}

const AS_JSON = argv.includes('--json');
const GITHUB_OUTPUT_MODE = argv.includes('--github-output');
const dueWithinRaw = flagValue('--due-within-minutes');

const NOW = new Date();

/* ────────────────────────────  classification  ─────────────────────────── */

const published: BlogPost[] = [];
const scheduled: BlogPost[] = [];
const drafts: BlogPost[] = [];

for (const post of blogPosts) {
  if (post.draft) drafts.push(post);
  else if (isPublished(post, NOW)) published.push(post);
  else scheduled.push(post);
}

const byInstant = (a: BlogPost, b: BlogPost) =>
  Date.parse(a.publishedAt) - Date.parse(b.publishedAt);

published.sort(byInstant).reverse();
scheduled.sort(byInstant);

/**
 * Posts whose instant fell inside the last `minutes`.
 *
 * A window rather than stored state: the sweep needs no memory of when it last
 * ran, which means a missed run, a re-run and a manual trigger all behave the
 * same. The window is set slightly wider than the cron interval so jitter
 * cannot drop a post through the gap; the cost of the overlap is at worst one
 * redundant deployment, which is harmless.
 */
function becameDueWithin(minutes: number): BlogPost[] {
  const cutoff = NOW.getTime() - minutes * 60 * 1000;
  return blogPosts.filter((post) => {
    if (post.draft) return false;
    const at = Date.parse(post.publishedAt);
    return at <= NOW.getTime() && at > cutoff;
  });
}

/* ──────────────────────────────  reporting  ────────────────────────────── */

function nextSlotSafely(): string | null {
  try {
    const taken = blogPosts.map((post) => post.publishedAt);
    return formatSlot(nextPublishSlot(NOW, taken));
  } catch {
    return null;
  }
}

function describe(post: BlogPost): Record<string, unknown> {
  return {
    slug: post.slug,
    title: post.content.en.title,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt ?? null,
    format: post.format,
    locales: postLocales(post),
    draft: post.draft === true,
  };
}

const dueWithinMinutes = dueWithinRaw ? Number.parseInt(dueWithinRaw, 10) : undefined;

if (dueWithinRaw !== undefined && (dueWithinMinutes === undefined || Number.isNaN(dueWithinMinutes))) {
  console.error(`blog-status: --due-within-minutes needs a number, got "${dueWithinRaw}".`);
  process.exit(2);
}

const newlyDue = dueWithinMinutes === undefined ? [] : becameDueWithin(dueWithinMinutes);

const report = {
  now: NOW.toISOString(),
  automationEnabled: blogSchedule.enabled,
  counts: {
    total: blogPosts.length,
    published: published.length,
    scheduled: scheduled.length,
    drafts: drafts.length,
    queuedTopics: queuedTopics().length,
    ledgerEntries: plannedTopics.length,
  },
  nextFreeSlot: nextSlotSafely(),
  nextGoLive: scheduled[0]?.publishedAt ?? null,
  published: published.map(describe),
  scheduled: scheduled.map(describe),
  drafts: drafts.map(describe),
  ...(dueWithinMinutes === undefined
    ? {}
    : { dueWithinMinutes, newlyDue: newlyDue.map(describe) }),
};

/* ─────────────────────────────  GitHub output  ─────────────────────────── */

if (GITHUB_OUTPUT_MODE) {
  // `due` is the only thing the sweep branches on. It is false whenever the
  // kill switch is off, so disabling automation stops deployments without
  // needing a second condition in the workflow.
  const due = blogSchedule.enabled && newlyDue.length > 0;

  const lines = [
    `due=${due}`,
    `due_count=${newlyDue.length}`,
    `automation_enabled=${blogSchedule.enabled}`,
    `published_count=${published.length}`,
    `scheduled_count=${scheduled.length}`,
    `next_go_live=${scheduled[0]?.publishedAt ?? ''}`,
    `due_slugs=${newlyDue.map((post) => post.slug).join(',')}`,
  ];

  const target = process.env.GITHUB_OUTPUT;
  if (target) {
    appendFileSync(target, `${lines.join('\n')}\n`);
  } else {
    // Local run: print what would have been written, so the flag is testable.
    console.log(lines.join('\n'));
  }
}

/* ────────────────────────────────  output  ─────────────────────────────── */

if (AS_JSON) {
  console.log(JSON.stringify(report, null, 2));
} else if (!GITHUB_OUTPUT_MODE) {
  const line = (label: string, value: string | number) =>
    console.log(`  ${label.padEnd(18)} ${value}`);

  console.log('');
  console.log(`Blog status at ${report.now}`);
  console.log('');
  line('automation', blogSchedule.enabled ? 'enabled' : 'DISABLED (kill switch)');
  line('published', published.length);
  line('scheduled', scheduled.length);
  line('drafts', drafts.length);
  line('queued topics', queuedTopics().length);
  line('next go-live', report.nextGoLive ?? 'nothing scheduled');
  line('next free slot', report.nextFreeSlot ?? 'none within horizon');

  const section = (title: string, posts: BlogPost[]) => {
    if (posts.length === 0) return;
    console.log('');
    console.log(`${title}:`);
    for (const post of posts) {
      const locales = postLocales(post).join('+');
      console.log(`  ${post.publishedAt}  ${post.slug}  [${locales}]`);
    }
  };

  section('Published', published);
  section('Scheduled', scheduled);
  section('Drafts', drafts);

  if (dueWithinMinutes !== undefined) {
    console.log('');
    console.log(
      newlyDue.length === 0
        ? `Nothing became due in the last ${dueWithinMinutes} minutes.`
        : `Became due in the last ${dueWithinMinutes} minutes: ${newlyDue.map((p) => p.slug).join(', ')}`
    );
  }

  console.log('');
}
