import { defineBlogPost } from '../_schema';

/**
 * TEST FIXTURE for the auto-merge pipeline. NOT a real post.
 *
 * Test 3 of 3, the positive path: this one is SUPPOSED to merge. It exists to
 * prove the automation can complete a merge on its own, so unlike the other two
 * fixtures it must pass every check.
 *
 * It therefore reaches main, and two independent flags keep it invisible in
 * production while it is there:
 *   draft: true          excluded from publishedPosts, so no route and no
 *                        sitemap entry, in every locale
 *   publishedAt in 2099  the publish gate stays shut even if draft were flipped
 *
 * No links, no faq block: the minimum that satisfies blog-lint, so the test
 * measures the merge path rather than the content rules already proven
 * elsewhere. Delete this directory, its registry entry and its ledger entry
 * during housekeeping once the suite is documented.
 */
export const zzTestMerge = defineBlogPost({
  slug: 'zz-test-merge',
  publishedAt: '2099-06-01T09:00:00Z',
  draft: true,
  format: 'guide',

  content: {
    en: {
      title: 'Auto-merge pipeline test fixture',
      description:
        'A harmless draft fixture used to prove that the automation can squash merge a validated blog-only pull request without a human in the path.',
      intro: [
        [
          'This post exists to exercise the merge path end to end. It is a draft dated far in the future, so it stays invisible on the site while it sits in the repository.',
        ],
        [
          'Everything about it is deliberately ordinary. It passes validation, touches nothing outside the blog content directory, and carries no links or citations.',
        ],
      ],
      body: [
        { kind: 'heading', level: 2, text: 'What This Fixture Proves' },
        {
          kind: 'paragraph',
          text: [
            'A pull request that passes validation and stays within the blog content directory should merge on its own. This fixture is the smallest change that satisfies both conditions.',
          ],
        },
        { kind: 'heading', level: 2, text: 'Why It Stays Invisible' },
        {
          kind: 'paragraph',
          text: [
            'The draft flag keeps it out of the published set, so no route is generated and no sitemap entry appears. The publish instant sits in 2099 as a second, independent guard.',
          ],
        },
        { kind: 'heading', level: 2, text: 'Why It Carries No Links' },
        {
          kind: 'paragraph',
          text: [
            'Link rules are already covered by the real post and by the earlier fixtures. Leaving them out here keeps the test focused on the merge itself.',
          ],
        },
        { kind: 'heading', level: 2, text: 'Removing It Afterwards' },
        {
          kind: 'paragraph',
          text: [
            'Deleting the directory, the registry line and the ledger entry returns the repository to its previous state. Nothing else references this fixture.',
          ],
        },
      ],
    },

    mk: {
      title: 'Тест запис за автоматско спојување',
      description:
        'Безопасен нацрт запис што служи да потврди дека автоматизацијата може сама да спои проверено барање што менува само содржина на блогот.',
      intro: [
        [
          'Овој запис постои за да го провери целиот пат на спојување. Нацрт е и носи датум длабоко во иднината, па останува невидлив на сајтот додека стои во складиштето.',
        ],
        [
          'Сè кај него е намерно обично. Ја поминува проверката, не допира ништо надвор од папката со содржина на блогот и нема ниту врски ниту извори.',
        ],
      ],
      body: [
        { kind: 'heading', level: 2, text: 'Што докажува овој запис' },
        {
          kind: 'paragraph',
          text: [
            'Барање што ја поминува проверката и останува во папката со содржина на блогот треба само да се спои. Овој запис е најмалата можна промена што ги исполнува двата услова.',
          ],
        },
        { kind: 'heading', level: 2, text: 'Зошто останува невидлив' },
        {
          kind: 'paragraph',
          text: [
            'Ознаката за нацрт го држи надвор од објавените записи, па не се создава ниту страница ниту запис во мапата на сајтот. Датумот во 2099 е втора, независна брана.',
          ],
        },
        { kind: 'heading', level: 2, text: 'Зошто нема врски' },
        {
          kind: 'paragraph',
          text: [
            'Правилата за врски веќе се проверени со вистинскиот запис и со претходните тестови. Нивното изоставување тука го држи тестот насочен кон самото спојување.',
          ],
        },
        { kind: 'heading', level: 2, text: 'Отстранување подоцна' },
        {
          kind: 'paragraph',
          text: [
            'Бришењето на папката, редот во регистарот и записот во дневникот го враќа складиштето во претходната состојба. Ништо друго не се повикува на овој запис.',
          ],
        },
      ],
    },
  },
});
