/**
 * Editorial policy for the blog, as typed config.
 *
 * This file is the single source of truth for WHEN posts publish and WHAT the
 * automation is allowed to produce. The cron expressions in .github/workflows
 * are deliberately dumb heartbeats: they decide how often a question is asked,
 * never what the answer is. Change your publishing cadence here, not there.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * EVERYTHING IS UTC
 * ───────────────────────────────────────────────────────────────────────────
 * `publishedAt` is stored as a UTC instant, `formatPostDate` renders in UTC,
 * and the sitemap's lastmod takes the UTC calendar day. Introducing a second
 * timezone here would let the scheduled hour, the displayed date and the
 * sitemap disagree about which day a post belongs to. If this ever needs to
 * mean "09:00 in New York", convert at the point of scheduling and keep the
 * stored value UTC.
 */

import type { Locale } from '@/i18n/routing';

export const WEEKDAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export interface BlogSchedule {
  /**
   * THE KILL SWITCH.
   *
   * While false: the generation workflow refuses to run, the publish sweep
   * triggers no deployment, and `npm run blog:status` says so. Nothing is
   * deleted and no post already published disappears; automation simply stops
   * acting. Flip it back when you want it running again.
   */
  enabled: boolean;
  /** UTC days a post may go live on. */
  publishDays: readonly Weekday[];
  /** UTC hour of the publish slot, 0-23. */
  publishHourUtc: number;
  /** UTC minute of the publish slot, 0-59. */
  publishMinuteUtc: number;
  /**
   * Hours between a post being generated and going live.
   *
   * The window where a post is committed, reviewable and invisible. It is what
   * makes unattended publishing recoverable: the post sits in the repository
   * for this long before anyone outside can read it.
   */
  leadTimeHours: number;
  /** Locales every automated post must ship with. */
  locales: readonly Locale[];
  /** Posts one generation run may create. A cap, not a target. */
  postsPerRun: number;
  /**
   * How many automated posts may be open (branch or PR) at once. One means a
   * run stops rather than piling a second post on top of an unmerged first,
   * which is what stops a backlog forming while CI is red.
   */
  maxOpenAutomatedPosts: number;
  /** Sub-themes the automation rotates through. Mirrors reference/TOPICS.md. */
  themes: readonly string[];
}

export const blogSchedule: BlogSchedule = {
  enabled: true,

  publishDays: ['tuesday', 'thursday'],
  publishHourUtc: 9,
  publishMinuteUtc: 0,

  leadTimeHours: 48,

  locales: ['en', 'mk'],

  postsPerRun: 1,
  maxOpenAutomatedPosts: 1,

  themes: [
    'getting found',
    'the phone call',
    'websites as a trades tool',
    'running the business',
    'the money side',
  ],
};

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/** How far ahead `nextPublishSlot` will look before giving up. */
const SEARCH_HORIZON_DAYS = 120;

function weekdayOf(date: Date): Weekday {
  // getUTCDay() is 0-6 from Sunday, matching WEEKDAYS' order.
  const index = date.getUTCDay();
  const day = WEEKDAYS[index];
  if (!day) throw new Error(`blog schedule: impossible UTC weekday index ${index}`);
  return day;
}

/** The configured slot on the UTC calendar day `date` falls in. */
function slotOn(date: Date, schedule: BlogSchedule): Date {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      schedule.publishHourUtc,
      schedule.publishMinuteUtc,
      0,
      0
    )
  );
}

/**
 * The next free publish slot at least `leadTimeHours` from `from`.
 *
 * `taken` is the set of `publishedAt` values already in use, so two posts
 * cannot be scheduled onto the same instant. Pass every post's instant,
 * published and scheduled alike.
 *
 * Throws rather than returning null: a generation run with nowhere to put its
 * post has misconfigured `publishDays`, and failing loudly beats silently
 * publishing at the wrong time.
 */
export function nextPublishSlot(
  from: Date,
  taken: readonly string[] = [],
  schedule: BlogSchedule = blogSchedule
): Date {
  if (schedule.publishDays.length === 0) {
    throw new Error('blog schedule: publishDays is empty, so no post can ever be scheduled.');
  }

  const earliest = from.getTime() + schedule.leadTimeHours * HOUR_MS;
  const takenMs = new Set(taken.map((value) => Date.parse(value)));

  for (let offset = 0; offset <= SEARCH_HORIZON_DAYS; offset += 1) {
    const day = new Date(from.getTime() + offset * DAY_MS);
    if (!schedule.publishDays.includes(weekdayOf(day))) continue;

    const slot = slotOn(day, schedule);
    if (slot.getTime() < earliest) continue;
    if (takenMs.has(slot.getTime())) continue;

    return slot;
  }

  throw new Error(
    `blog schedule: no free slot within ${SEARCH_HORIZON_DAYS} days of ${from.toISOString()}. ` +
      `Check publishDays and how many posts are already scheduled.`
  );
}

/** The slot as the string a post config stores, e.g. `2026-08-20T09:00:00Z`. */
export function formatSlot(slot: Date): string {
  return `${slot.toISOString().slice(0, 19)}Z`;
}

/** Whether automation may act at all. Read this before generating or deploying. */
export function automationEnabled(schedule: BlogSchedule = blogSchedule): boolean {
  return schedule.enabled;
}
