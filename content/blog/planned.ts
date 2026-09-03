/**
 * The planned-topic ledger.
 *
 * The registry in ./index.ts knows what was WRITTEN. It cannot know what is
 * queued, what is in flight, or what was considered and rejected. Without that
 * memory an automated run three weeks from now happily re-picks a topic an
 * earlier run already covered or already discarded, because from its point of
 * view the repository looks identical either way.
 *
 * So: every automated run reads this file before choosing, and appends to it
 * after. It is committed, which is what makes the memory survive a run that
 * ends and a machine that is thrown away.
 *
 * Dedup happens on three keys, because they fail differently:
 *   slug   - the URL. Two posts cannot share one.
 *   title  - what a reader sees. Near-identical titles look like a mistake.
 *   intent - the search intent, the thing the reader is actually trying to
 *            settle. Two posts can share no words and still compete for the
 *            same query, which is the failure that costs rankings rather than
 *            merely looking untidy.
 */

/**
 * queued    - chosen, not yet written.
 * written   - post file exists, scheduled or published. The registry is authoritative.
 * published - live. Kept so the topic is never re-picked.
 * rejected  - considered and ruled out. Kept so it is never re-considered.
 */
export type PlannedStatus = 'queued' | 'written' | 'published' | 'rejected';

export interface PlannedTopic {
  /** The slug the post has or would have. Lowercase, hyphenated. */
  slug: string;
  /** Working title. Need not match the final post title exactly. */
  title: string;
  /**
   * The search intent in a short phrase: what the reader is trying to decide.
   * Compared semantically when deduplicating, so write the intent, not keywords.
   */
  intent: string;
  /** One of `blogSchedule.themes`. */
  theme: string;
  status: PlannedStatus;
  /** The instant the post is scheduled for, once it has one. */
  publishAt?: string;
  /** Why it was rejected, or anything a later run should know. */
  note?: string;
}

/**
 * Seeded with what already exists. The first entry is the launch post, so no
 * later run picks its subject again.
 */
export const plannedTopics: PlannedTopic[] = [
  {
    slug: 'website-vs-google-business-profile',
    title: 'Do You Need a Website If You Already Have a Google Business Profile?',
    intent:
      'Decide whether to pay for a website when a Google Business Profile is already working',
    theme: 'getting found',
    status: 'published',
    publishAt: '2026-08-17T09:00:00Z',
  },
  {
    slug: 'phone-number-placement-trades-website',
    title: 'Where the Phone Number Belongs on a One-Page Trades Website',
    intent:
      'Decide where a phone number should sit on a mobile trades website and how it should be built so it is actually tappable',
    theme: 'the phone call',
    status: 'written',
    publishAt: '2026-09-01T09:00:00Z',
  },
  {
    slug: 'photo-weight-trades-website',
    title: 'How Many Photos Slow Down a Trades Website on a Job Site',
    intent:
      'Decide how many photos a one-page trades website can carry and how heavy they can be before a weak mobile signal fails to load the page',
    theme: 'websites as a trades tool',
    status: 'written',
    publishAt: '2026-09-03T09:00:00Z',
  },
  {
    slug: 'local-services-ads-cost-vs-website',
    title: 'What Local Services Ads Cost a Trades Business, Compared to a Website',
    intent:
      'Decide whether pay-per-lead Local Services Ads or an owned website is the better spend for a small trades business',
    theme: 'the money side',
    status: 'written',
    publishAt: '2026-09-08T09:00:00Z',
  },
];

/** Every slug the ledger has ever seen, in any status. */
export function ledgerSlugs(): string[] {
  return plannedTopics.map((topic) => topic.slug);
}

/** Topics still to be written. */
export function queuedTopics(): PlannedTopic[] {
  return plannedTopics.filter((topic) => topic.status === 'queued');
}

/**
 * Normalises a phrase for comparison: lowercase, punctuation stripped, and the
 * filler words that carry no topical meaning removed. "Do You Need a Website
 * If You Already Have a Google Business Profile?" and "Do I need a website
 * when I have a Google Business profile" reduce to the same token set.
 */
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'is', 'are', 'was', 'were', 'be',
  'do', 'does', 'did', 'to', 'of', 'in', 'on', 'for', 'with', 'when', 'while',
  'you', 'your', 'i', 'my', 'me', 'we', 'our', 'it', 'its', 'that', 'this',
  'already', 'have', 'has', 'need', 'needs', 'should', 'can', 'could', 'would',
  'what', 'why', 'how', 'which', 'who', 'whom', 'at', 'by', 'from', 'as',
]);

export function topicTokens(phrase: string): Set<string> {
  const words = phrase
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));
  return new Set(words);
}

/** Jaccard overlap of two phrases' meaningful words, 0 to 1. */
export function topicSimilarity(a: string, b: string): number {
  const left = topicTokens(a);
  const right = topicTokens(b);
  if (left.size === 0 || right.size === 0) return 0;

  let shared = 0;
  for (const token of left) {
    if (right.has(token)) shared += 1;
  }
  return shared / (left.size + right.size - shared);
}

/**
 * Overlap at or above this counts as the same topic. Tuned to catch a
 * rephrasing while letting two genuinely different posts in one theme through.
 */
export const SIMILARITY_THRESHOLD = 0.6;

export interface LedgerVerdict {
  taken: boolean;
  reason?: string;
}

/**
 * Whether a candidate collides with anything the ledger already holds.
 *
 * Checked before research, not after: a dedup hit should cost one file read,
 * never a wasted generation run.
 */
export function checkAgainstLedger(candidate: {
  slug: string;
  title: string;
  intent: string;
}): LedgerVerdict {
  for (const topic of plannedTopics) {
    if (topic.slug === candidate.slug) {
      return { taken: true, reason: `slug "${candidate.slug}" is already in the ledger (${topic.status})` };
    }

    const titleOverlap = topicSimilarity(topic.title, candidate.title);
    if (titleOverlap >= SIMILARITY_THRESHOLD) {
      return {
        taken: true,
        reason: `title overlaps "${topic.title}" (${topic.status}) at ${titleOverlap.toFixed(2)}`,
      };
    }

    const intentOverlap = topicSimilarity(topic.intent, candidate.intent);
    if (intentOverlap >= SIMILARITY_THRESHOLD) {
      return {
        taken: true,
        reason: `search intent overlaps "${topic.intent}" (${topic.status}) at ${intentOverlap.toFixed(2)}`,
      };
    }
  }

  return { taken: false };
}
