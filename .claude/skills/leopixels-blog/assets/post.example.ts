/**
 * WORKED EXAMPLE — not a real post. Not registered, not routed, not published.
 *
 * It is schema-valid and was compiled against content/blog/_schema.ts. It is
 * NOT covered by `npm run typecheck`, because TypeScript's `include` globs skip
 * dot-directories, so nothing under .claude/ enters the default compile graph.
 * That is deliberate: a documentation asset should not be able to break a
 * production build. It also means this file can drift silently if the schema
 * changes, so re-verify it whenever content/blog/_schema.ts is edited:
 *
 *     printf '{"extends":"./tsconfig.json","include":[".claude/skills/leopixels-blog/assets/post.example.ts","next-env.d.ts"]}' > tsconfig.example.json
 *     npx tsc --noEmit -p tsconfig.example.json; rm tsconfig.example.json
 *
 * The real schema in content/blog/_schema.ts is always the authority. If the
 * two disagree, this file is the one that is wrong.
 *
 * ONE DIFFERENCE from a real post: the import below uses the `@/` alias because
 * this file lives outside content/blog/. A real post at
 * content/blog/<slug>/post.ts imports from '../_schema' instead. Everything
 * after the import is exactly what a real post looks like.
 *
 * The prose here is illustrative and deliberately short. A real post runs to
 * the word count its `format` calls for — see reference/TOPICS.md.
 */

import { defineBlogPost } from '@/content/blog/_schema';

export const examplePost = defineBlogPost({
  slug: 'example-post',
  publishedAt: '2026-08-17',
  format: 'how-to',
  tags: ['local search', 'google business profile'],

  content: {
    /* ─────────────────────────────  English  ───────────────────────────── */
    en: {
      title: 'How to Get Your Plumbing Business Into the Google Map Pack',
      description:
        'What the map pack ranks on, why a service-area business gets filtered out, and the four things worth fixing first on a one-van plumbing shop.',

      // Two paragraphs. The first answers the headline on its own, because it
      // is the passage an AI answer engine quotes with nothing around it.
      intro: [
        [
          'The map pack is the block of three businesses above the ordinary search results, and Google picks those three on relevance, distance and prominence. Distance you cannot change. The other two you can. For a one-van plumbing shop, the work is a complete Google Business Profile, a website that names the same services, and enough real reviews that the profile looks alive.',
        ],
        [
          'Most shops lose the map pack on details rather than effort. A profile with the wrong category, a phone number that differs by one digit from the one on the website, or no service area set at all will keep a business out of the three slots while the owner wonders what the competition is paying for. None of the fixes below cost money.',
        ],
      ],

      body: [
        // The at-a-glance block. Short key-value facts, no links, scanned
        // rather than read. Skip it when the topic has nothing that tabulates.
        {
          kind: 'keyFacts',
          items: [
            'Map pack slots: 3',
            'Ranking factors: relevance, distance, prominence',
            'Cost to fix a profile: $0',
          ],
        },

        { kind: 'heading', level: 2, text: 'What the Map Pack Actually Ranks On' },
        {
          kind: 'paragraph',
          text: [
            'Relevance is how well the profile matches what was typed. Distance is measured from the searcher, or from the place named in the search. Prominence is how well known the business is, which Google reads from reviews, links and mentions across the web. ',
            'The three are weighed together, so a closer business with a thin profile loses to one a mile further out with fifty reviews and a matching website.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'A service-area business, which is what most plumbers are, has one extra trap. If the profile hides the address without setting a service area, the listing can fail to appear for any of the towns it covers.',
          ],
        },

        { kind: 'heading', level: 3, text: 'Categories Do More Than They Look Like They Do' },
        {
          kind: 'paragraph',
          text: [
            'The primary category carries more weight than any other single field. "Plumber" and "Drainage service" surface for different searches, and picking the wrong primary quietly caps the profile.',
          ],
        },

        { kind: 'heading', level: 2, text: 'The Four Fixes Worth Doing First' },
        {
          kind: 'paragraph',
          text: [
            'In order of what moves the needle for a shop starting from nothing. None of them need a developer.',
          ],
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            ['Set the primary category to the service that pays the bills, then add secondaries.'],
            ['Set the service area to the towns actually covered, not a 90-mile radius.'],
            [
              'Match the business name, address and phone number exactly across the profile and ',
              {
                text: 'your own website',
                href: '/demos',
                title: 'Sample trades websites showing how contact details are presented',
              },
              '.',
            ],
            ['Ask the last twenty customers for a review, by text, the day the job finishes.'],
          ],
        },

        { kind: 'heading', level: 2, text: 'Why the Website Still Decides It' },
        {
          kind: 'paragraph',
          text: [
            'Google reads the site the profile points at, and a site that names the same services in the same towns confirms what the profile claims. A site that loads slowly, or hides the phone number three scrolls down, wastes the click the map pack earned. ',
            'An ',
            {
              text: 'emergency plumber page',
              href: '/demos/redline-plumbing',
              title: 'Sample build for an emergency plumbing business in Columbus, Ohio',
            },
            ' puts the number above everything else for exactly that reason.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Speed is the part owners underestimate. Google publishes its page-experience thresholds in ',
            {
              text: 'the Core Web Vitals documentation',
              href: 'https://web.dev/articles/vitals',
              title: 'web.dev reference for the Core Web Vitals performance metrics',
            },
            ', and a page that misses them on a phone on mobile data is being judged on the worst connection its customers have.',
          ],
        },

        // The FAQ block feeds FAQPage JSON-LD automatically. Write it last,
        // answering only what the body did not already cover.
        {
          kind: 'faq',
          heading: 'Questions Plumbers Ask About the Map Pack',
          intro: [
            'The three slots refresh constantly, and a profile that has just been corrected can take a few weeks to settle.',
          ],
          items: [
            {
              question: 'How long does it take to appear after fixing a profile?',
              answer: [
                'Category and service-area edits are usually reflected within a few days, but ranking movement takes longer because prominence is built from reviews and mentions that accumulate. Give a corrected profile a month before judging it, and keep asking for reviews throughout.',
              ],
            },
            {
              question: 'Does a service-area business need a physical address?',
              answer: [
                'A verifiable address is needed to register, but it can be hidden once the service area is set. Hiding the address without setting a service area is the combination that removes a listing from results, which is why the two are done together.',
              ],
            },
            {
              question: 'Do paid ads improve map pack ranking?',
              answer: [
                'No. Ads buy placement above the results and stop the moment the budget does. The three organic slots are unaffected by ad spend, which is why a corrected profile keeps earning after the advertising stops.',
              ],
            },
          ],
        },

        // Conclusion: advances, never recaps. No maxim, no summary.
        {
          kind: 'paragraph',
          text: [
            'Fix the profile first, because it costs nothing and it is where the three slots are decided. Then look at what happens after the tap: the page the profile points at is the part the map pack cannot fix.',
          ],
        },
      ],
    },

    /* ────────────────────────────  Macedonian  ─────────────────────────── */
    /* Same block sequence, same facts, same links. Natural Macedonian rather
       than a word-for-word rendering of the English. */
    mk: {
      title: 'Како да го внесете водоводниот бизнис во Google Map Pack',
      description:
        'На што се рангира Map Pack, зошто бизнис со подрачје на работа испаѓа од резултатите и кои четири работи вредат да се средат први.',

      intro: [
        [
          'Map Pack е блокот со три бизниси над обичните резултати, а Google ги избира тие три според релевантност, оддалеченост и препознатливост. Оддалеченоста не можете да ја смените. Другите две можете. За мал водоводен бизнис работата е целосен Google Business Profile, сајт што ги именува истите услуги и доволно вистински оценки за профилот да изгледа жив.',
        ],
        [
          'Повеќето фирми го губат Map Pack на ситници, не на труд. Погрешна категорија, телефонски број што се разликува за една цифра од оној на сајтот, или воопшто неподесено подрачје на работа, ќе го држат бизнисот надвор од трите места додека сопственикот се прашува што плаќа конкуренцијата. Ниту една од поправките подолу не чини пари.',
        ],
      ],

      body: [
        {
          kind: 'keyFacts',
          items: [
            'Места во Map Pack: 3',
            'Фактори: релевантност, оддалеченост, препознатливост',
            'Цена за средување профил: $0',
          ],
        },

        { kind: 'heading', level: 2, text: 'На Што Всушност Се Рангира Map Pack' },
        {
          kind: 'paragraph',
          text: [
            'Релевантноста е колку профилот одговара на напишаното. Оддалеченоста се мери од оној што пребарува или од местото наведено во пребарувањето. Препознатливоста е колку бизнисот е познат, што Google го чита од оценки, врски и спомнувања низ интернет. ',
            'Трите се мерат заедно, па поблиска фирма со слаб профил губи од онаа што е километар подалеку, но има педесет оценки и сајт што се совпаѓа.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Бизнисите што работат на терен, а тоа се повеќето водоводџии, имаат уште една стапица. Ако профилот ја крие адресата без да подеси подрачје на работа, огласот може да не се појави за ниту еден од градовите што ги покрива.',
          ],
        },

        { kind: 'heading', level: 3, text: 'Категориите Значат Повеќе Отколку Што Изгледаат' },
        {
          kind: 'paragraph',
          text: [
            'Примарната категорија носи поголема тежина од кое било друго поле. "Plumber" и "Drainage service" се појавуваат за различни пребарувања, а погрешниот избор тивко го ограничува профилот.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Четирите Поправки Што Вредат Први' },
        {
          kind: 'paragraph',
          text: [
            'По редослед на тоа што носи најмногу за фирма што почнува од нула. Ниту една не бара програмер.',
          ],
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            ['Ставете ја примарната категорија на услугата што носи заработка, па додајте споредни.'],
            ['Подесете го подрачјето на работа на градовите што навистина ги покривате.'],
            [
              'Нека името, адресата и телефонот бидат идентични на профилот и на ',
              {
                text: 'вашиот сајт',
                href: '/demos',
                title: 'Демо сајтови што покажуваат како се прикажуваат контакт податоците',
              },
              '.',
            ],
            ['Побарајте оценка од последните дваесет муштерии, со порака, на денот кога завршува работата.'],
          ],
        },

        { kind: 'heading', level: 2, text: 'Зошто Сајтот Сепак Одлучува' },
        {
          kind: 'paragraph',
          text: [
            'Google го чита сајтот на кој покажува профилот, а сајт што ги именува истите услуги во истите градови го потврдува тоа што профилот го тврди. Сајт што се вчитува бавно или го крие телефонот три екрани подолу го троши кликот што Map Pack го заработил. ',
            'Една ',
            {
              text: 'страница за итен водоводџија',
              href: '/demos/redline-plumbing',
              title: 'Демо изработка за водоводен бизнис за итни случаи во Колумбус, Охајо',
            },
            ' го става бројот над сè друго токму поради тоа.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Брзината е делот што сопствениците го потценуваат. Google ги објавува своите прагови за корисничко искуство во ',
            {
              text: 'документацијата за Core Web Vitals',
              href: 'https://web.dev/articles/vitals',
              title: 'web.dev документација за мерките Core Web Vitals',
            },
            ', а страница што не ги исполнува на телефон со мобилен интернет се оценува според најлошата врска што ја имаат нејзините муштерии.',
          ],
        },

        {
          kind: 'faq',
          heading: 'Прашања Што Ги Поставуваат Водоводџиите',
          intro: [
            'Трите места се освежуваат постојано, а профил што штотуку е поправен може да му треба некоја недела да се смири.',
          ],
          items: [
            {
              question: 'Колку време треба за да се појави профилот по поправката?',
              answer: [
                'Промените на категорија и подрачје на работа обично се гледаат за неколку дена, но движењето во рангирањето трае подолго затоа што препознатливоста се гради од оценки и спомнувања што се собираат. Дајте му месец дена на поправениот профил пред да судите, и барајте оценки цело време.',
              ],
            },
            {
              question: 'Дали е потребна физичка адреса?',
              answer: [
                'Потребна е адреса што може да се потврди за регистрација, но може да се сокрие штом е подесено подрачјето на работа. Криењето адреса без подесено подрачје е комбинацијата што го отстранува огласот од резултатите, па затоа двете се прават заедно.',
              ],
            },
            {
              question: 'Дали платените реклами го подобруваат рангирањето?',
              answer: [
                'Не. Рекламите купуваат место над резултатите и запираат штом запре буџетот. Трите органски места не зависат од потрошено за реклами, па затоа поправениот профил продолжува да носи и откако рекламирањето ќе престане.',
              ],
            },
          ],
        },

        {
          kind: 'paragraph',
          text: [
            'Поправете го профилот прво, бидејќи не чини ништо и таму се одлучуваат трите места. Потоа погледнете што се случува по допирот: страницата на која покажува профилот е делот што Map Pack не може да го поправи.',
          ],
        },
      ],
    },
  },
});
