import { defineBlogPost } from '../_schema';

/**
 * TEST FIXTURE for the auto-merge pipeline. NOT a real post.
 *
 * It exists to prove that a pull request failing `blog:lint` is NOT merged.
 * The title below contains an em-dash (U+2014), which VOICE.md bans and
 * blog-lint rejects, so `Validate blog` must fail and auto-merge must withhold.
 *
 * Two independent safety nets, in case the gate is broken and this does merge:
 *   draft: true          keeps it out of the sitemap and out of production
 *   publishedAt in 2099  keeps the publish gate closed regardless
 *
 * Delete this directory and its registry entry once the test is done.
 */
export const zzTestFail = defineBlogPost({
  slug: 'zz-test-fail',
  publishedAt: '2099-01-01T09:00:00Z',
  draft: true,
  format: 'guide',

  content: {
    en: {
      title: 'Auto-merge gate test — this post must never merge',
      description:
        'A deliberately invalid fixture used to prove that a pull request failing blog:lint is not merged into main by the automation.',
      intro: [
        ['First intro paragraph. This fixture exists only to fail validation.'],
        ['Second intro paragraph. Nothing here is intended for publication.'],
      ],
      body: [
        { kind: 'heading', level: 2, text: 'The First Section' },
        { kind: 'paragraph', text: ['Body text for the first section.'] },
        { kind: 'heading', level: 2, text: 'The Second Section' },
        { kind: 'paragraph', text: ['Body text for the second section.'] },
        { kind: 'heading', level: 2, text: 'The Third Section' },
        { kind: 'paragraph', text: ['Body text for the third section.'] },
        { kind: 'heading', level: 2, text: 'The Fourth Section' },
        { kind: 'paragraph', text: ['Body text for the fourth section.'] },
      ],
    },

    mk: {
      title: 'Тест за портата на спојување',
      description:
        'Намерно неисправен тест запис што служи да потврди дека барање што паѓа на blog:lint нема да биде споено во main.',
      intro: [
        ['Прв вовед. Овој запис постои само за да падне на проверката.'],
        ['Втор вовед. Ништо тука не е наменето за објавување.'],
      ],
      body: [
        { kind: 'heading', level: 2, text: 'Прв дел' },
        { kind: 'paragraph', text: ['Текст за првиот дел.'] },
        { kind: 'heading', level: 2, text: 'Втор дел' },
        { kind: 'paragraph', text: ['Текст за вториот дел.'] },
        { kind: 'heading', level: 2, text: 'Трет дел' },
        { kind: 'paragraph', text: ['Текст за третиот дел.'] },
        { kind: 'heading', level: 2, text: 'Четврти дел' },
        { kind: 'paragraph', text: ['Текст за четвртиот дел.'] },
      ],
    },
  },
});
