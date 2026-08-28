import { defineBlogPost } from '../_schema';

export const photoWeightTradesWebsite = defineBlogPost({
  slug: 'photo-weight-trades-website',
  publishedAt: '2026-09-03T09:00:00Z',
  format: 'how-to',
  tags: ['page speed', 'photos', 'core web vitals'],

  content: {
    /* ─────────────────────────────  English  ───────────────────────────── */
    en: {
      title: 'How Many Photos Slow Down a Trades Website on a Job Site',
      description:
        "Photos are the heaviest thing on a trades website's homepage. What they cost in kilobytes, why a weak signal pays for it first, and how many is too many.",

      intro: [
        [
          "A one-page trades website has no fixed limit on photos, but the median mobile page already spends 911 KB on images alone, out of 2,164 KB total. Google's own performance guidance treats the single largest photo on a page, not the total count, as the one that decides how fast a page feels. The real question is never how many photos a gallery holds. It is how heavy the biggest one is, and how much sits behind it waiting to load next.",
        ],
        [
          'A homeowner standing next to a leaking water heater is not opening a trades website twice. One slow load on two bars of signal is the whole chance, and a gallery of ten photos uploaded straight from a camera roll can burn through it before the phone number ever renders. The fix has nothing to do with cutting photos a business needs to show. It is about what those photos cost in bytes, and which one has to load first.',
        ],
      ],

      body: [
        {
          kind: 'keyFacts',
          items: [
            'Median mobile page weight: 2,164 KB',
            "Images' share of that: 911 KB, about 42%",
            "Google's LCP target: 2.5 seconds for most visits",
            'Bighorn Roofing demo, gallery-led: 78 KB total',
          ],
        },

        { kind: 'heading', level: 2, text: 'What a Photo Costs a Page' },
        {
          kind: 'paragraph',
          text: [
            'The median mobile web page weighs 2,164 KB before a visitor sees anything, and images account for 911 KB of that, close to 42 percent, per ',
            {
              text: "HTTP Archive's 2025 Web Almanac",
              href: 'https://almanac.httparchive.org/en/2025/page-weight',
              title: "HTTP Archive's 2025 Web Almanac chapter on page weight and image bytes",
            },
            '. That figure covers the whole web, not trades sites specifically, and a one-page site built around before-and-after photos or a storm-damage gallery tends to run heavier than the median rather than lighter.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            "Every one of those kilobytes has to cross the same connection the phone number does. A camera phone's default photo commonly runs several megabytes at full resolution, and uploading four or five of them straight into a gallery can outweigh the rest of the page combined. Those figures measure compressed delivery size, not the uncompressed original sitting in a phone's camera roll before it gets squeezed down for upload.",
          ],
        },

        { kind: 'heading', level: 2, text: "Why the Biggest Photo Decides the Whole Page's Speed" },
        {
          kind: 'paragraph',
          text: [
            'Google measures a page\'s loading experience with Largest Contentful Paint, the point where the largest image or block of text inside the viewport finishes rendering. Its own ',
            {
              text: 'performance guidance',
              href: 'https://web.dev/articles/optimize-lcp',
              title: "web.dev's guidance on optimizing Largest Contentful Paint",
            },
            ' sets the target at 2.5 seconds or less for most visits. For a one-page trades site, that largest element is almost always a photo: the hero shot behind the headline, or the first tile in a before-and-after set.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Compress every other image on the page and leave that one alone, and the page still measures as slow, because Largest Contentful Paint is timed against the biggest element, not the average one. For that one image, the same guidance recommends against lazy loading and against pulling it in later with a script, so the browser can start fetching it as soon as the page begins loading.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Is There a Photo Limit?' },
        {
          kind: 'paragraph',
          text: [
            'There is no fixed number. A page with fifteen compressed, correctly sized photos can load faster than one with four uploaded straight from a camera roll. What decides the speed is the total weight in the section a visitor sees first, not the count of images sitting in a folder.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'One ',
            {
              text: "roofing demo's gallery",
              href: '/demos/bighorn-roofing',
              title: 'Sample roofing website built around a gallery-led hero for storm-damage proof',
            },
            ' stays large on purpose, because in that trade the photographs are the argument, and the whole build still measures 78 KB in total. What changes is that the hero loads first and the rest of the gallery loads only as a visitor scrolls to it, so the photo count never competes with the page\'s speed.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Where the Extra Weight Hides' },
        {
          kind: 'paragraph',
          text: [
            "The heaviest photo on most trades pages is rarely the one anyone notices. It is the hero image saved once at full camera resolution and never resized for the screen it fills, or a background slider that loads every slide's image on the first visit instead of only the one showing.",
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'A gallery plugin often ships its own script and stylesheet alongside the photos, adding weight that has nothing to do with the images themselves. None of that shows up by looking at the page. It shows up in a page-weight report, and that report is the only way to know for certain where the kilobytes went.',
          ],
        },

        { kind: 'heading', level: 2, text: 'What to Cut Before the Gallery Goes Up' },
        {
          kind: 'paragraph',
          text: [
            'The steps below move the most weight for the least effort, in the order a one-page trades site should take them. The ',
            {
              text: 'sample trades builds',
              href: '/demos',
              title: 'LeoPixels working demo websites for plumbing, HVAC, electrical and roofing businesses',
            },
            " each handle photos differently by trade, since a roofer's photos and a plumber's photos do different jobs.",
          ],
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            ['Resize every photo to the width it will display at before uploading it, not after.'],
            ['Keep the hero the lightest photo on the page, since it is also the one timing Largest Contentful Paint.'],
            ["Load a gallery's later photos only as a visitor scrolls to them, never all at once on page load."],
            ['Run the finished page through a page-weight report and fix whichever single image is heaviest first.'],
          ],
        },

        {
          kind: 'faq',
          heading: 'Questions Trades Owners Ask About Photos and Page Speed',
          intro: [
            "Each answer below assumes the hero image has already been identified as the page's single heaviest element.",
          ],
          items: [
            {
              question: 'Do before-and-after photos need to be full resolution?',
              answer: [
                'No. A photo only needs to be as wide as the space it fills on screen. For most trades galleries that is under 1,000 pixels on a phone. Resizing before upload cuts the file size without any visible loss, since nobody zooms into a before-and-after shot.',
              ],
            },
            {
              question: 'Does a photo slider or carousel add more weight than a static gallery?',
              answer: [
                "Usually, yes. Many sliders load every slide's image on the first visit rather than only the one showing. A five-slide hero built that way carries five times the weight of the one currently on screen. A static gallery that loads photos as a visitor scrolls avoids that entirely.",
              ],
            },
            {
              question: 'Should a trades site skip photos to stay fast?',
              answer: [
                'No. Photos are what sell a roof replacement or a finished bathroom, and cutting them trades one problem for another. The fix is controlling what each photo weighs, not how many of them the page shows.',
              ],
            },
            {
              question: 'Does a heavy photo gallery affect search rankings as well as visitor patience?',
              answer: [
                'Largest Contentful Paint is one of the Core Web Vitals Google documents as part of page experience, so a heavy gallery is a speed problem before it becomes a ranking one. Fixing the weight fixes both at once.',
              ],
            },
          ],
        },

        {
          kind: 'paragraph',
          text: [
            'A page-weight report takes under a minute to run against a live page, and it names the single heaviest image instead of leaving an owner guessing which of ten photos to fix first. Running one after every new gallery catches the problem before a customer does. Getting ',
            {
              text: 'phone number placement',
              href: '/blog/phone-number-placement-trades-website',
              title: 'LeoPixels post on phone number placement and tap targets for trades websites',
            },
            " right still means nothing if the images loading above it eat the visitor's patience first.",
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'The next photo a trades business adds to its site is worth resizing before it gets uploaded, not after a customer standing on two bars of signal has already given up waiting for it.',
          ],
        },
      ],
    },

    /* ────────────────────────────  Macedonian  ─────────────────────────── */
    mk: {
      title: 'Колку фотографии успоруваат занаетчиски сајт на терен',
      description:
        'Фотографиите се најтешкото нешто на почетната страница на занаетчиски сајт. Колку чинат во килобајти, зошто слаб сигнал прв го плаќа тоа, и колку е премногу.',

      intro: [
        [
          'Едностран занаетчиски сајт нема фиксна граница за фотографии, но просечната мобилна страница веќе троши 911 KB само на слики, од вкупно 2 164 KB. Упатствата на Google за брзина третираат само една најголема фотографија на страницата, не вкупниот број, како онаа што одлучува колку брзо страницата се чувствува. Вистинското прашање никогаш не е колку фотографии содржи галеријата. Тоа е колку тешка е најголемата, и колку уште стои зад неа чекајќи да се вчита.',
        ],
        [
          'Домаќин што стои крај расипан бојлер не ја отвора занаетчиската страница двапати. Едно бавно вчитување на два бара сигнал е целата шанса, а галерија од десет фотографии прикачени директно од телефонот може да ја потроши пред телефонскиот број воопшто да се прикаже. Поправката нема врска со бришење фотографии што бизнисот треба да ги покаже. Работата е во тоа колку тие фотографии чинат во бајти, и која од нив мора прва да се вчита.',
        ],
      ],

      body: [
        {
          kind: 'keyFacts',
          items: [
            'Просечна тежина на мобилна страница: 2 164 KB',
            'Удел на сликите: 911 KB, околу 42%',
            'Целта на Google за LCP: 2.5 секунди за повеќето посети',
            'Демото Bighorn Roofing, водено од галерија: 78 KB вкупно',
          ],
        },

        { kind: 'heading', level: 2, text: 'Колку чини една фотографија за страницата' },
        {
          kind: 'paragraph',
          text: [
            'Просечната мобилна веб страница тежи 2 164 KB пред посетителот воопшто да види нешто, а сликите носат 911 KB од тоа, околу 42 отсто, според извештајот ',
            {
              text: 'Web Almanac на HTTP Archive',
              href: 'https://almanac.httparchive.org/en/2025/page-weight',
              title: 'Поглавјето на HTTP Archive за тежината на страниците и бајтите на сликите за 2025',
            },
            ' за 2025 година. Бројката важи за целиот интернет, не специфично за занаетчиски сајтови, а едностран сајт изграден околу фотографии пред и по или галерија со штети од невреме обично тежи повеќе од просекот, а не помалку.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Секој од тие килобајти минува низ истата врска низ која минува и телефонскиот број. Стандардна фотографија од телефон обично тежи неколку мегабајти во целосна резолуција, а прикачувањето на четири или пет вакви фотографии директно во галерија може да ја надмине тежината на остатокот од страницата заедно. Таа бројка ја мери компресираната големина при пренос, не оригиналот некомпресиран во галеријата на телефонот пред да се стисне за прикачување.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Зошто најголемата фотографија ја одлучува брзината на целата страница' },
        {
          kind: 'paragraph',
          text: [
            'Google го мери искуството на вчитување на страница со Largest Contentful Paint, моментот кога најголемата слика или блок текст во видливото поле завршува со прикажување. Неговите сопствени ',
            {
              text: 'упатства за брзина',
              href: 'https://web.dev/articles/optimize-lcp',
              title: 'Упатствата на web.dev за оптимизирање на Largest Contentful Paint',
            },
            ' ја поставуваат целта на 2.5 секунди или помалку за повеќето посети. За едностран занаетчиски сајт, тој најголем елемент речиси секогаш е фотографија: главната слика зад насловот, или првата плочка во сетот пред и по.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Компресирајте ги сите други слики на страницата и оставете ја таа единствена нетакната, а страницата сепак се мери како бавна, бидејќи Largest Contentful Paint се мери според најголемиот елемент, не просечниот. За таа единствена слика, истите упатства препорачуваат да не се одложува вчитувањето и да не се повлекува подоцна преку скрипта, за да прелистувачот може да почне да ја презема веднаш штом страницата почне да се вчитува.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Дали воопшто постои граница на фотографии?' },
        {
          kind: 'paragraph',
          text: [
            'Нема фиксен број. Страница со петнаесет компресирани, правилно димензионирани фотографии може да се вчита побрзо од онаа со четири прикачени директно од телефонот. Она што ја одлучува брзината е вкупната тежина во делот што посетителот прво го гледа, не бројот на слики во папката.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Едно ',
            {
              text: 'демо за кровопокривач',
              href: '/demos/bighorn-roofing',
              title: 'Демо сајт за кровопокривање изграден околу вовед воден од галерија со доказ од невреме',
            },
            ' намерно ја задржува галеријата голема, бидејќи во тој занает фотографиите се аргументот, а целата изработка сепак мери 78 KB вкупно. Она што се менува е дека главната слика се вчитува прва, а остатокот од галеријата се вчитува само кога посетителот ќе скрола до неа, па бројот на фотографии никогаш не се натпреварува со брзината на страницата.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Каде всушност се крие вишокот тежина' },
        {
          kind: 'paragraph',
          text: [
            'Најтешката фотографија на повеќето занаетчиски страници ретко е онаа што некој ја забележува. Тоа е главната слика зачувана еднаш во целосна резолуција на камерата и никогаш не преправена за екранот што го исполнува, или лизгач во позадина што ги вчитува сликите на сите слајдови при првата посета наместо само онаа што се гледа.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Додаток за галерија често носи своја скрипта и стилски лист покрај фотографиите, додавајќи тежина што нема врска со самите слики. Ништо од тоа не се гледа со поглед на страницата. Се гледа во извештај за тежината на страницата, а тој извештај е единствениот сигурен начин да се знае каде отишле килобајтите.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Што да се исчисти пред галеријата да се постави' },
        {
          kind: 'paragraph',
          text: [
            'Чекорите подолу ја поместуваат најголемата тежина за најмалку труд, по редот по кој едностран занаетчиски сајт треба да ги преземе. Секој од ',
            {
              text: 'демо изработките',
              href: '/demos',
              title: 'Работни демо сајтови на LeoPixels за водовод, климатизација, електрика и кровопокривање',
            },
            ' различно ги решава фотографиите по занает, бидејќи фотографиите на покривач и фотографиите на водоводџија вршат различна работа.',
          ],
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            ['Преправете ја секоја фотографија на ширината на која ќе се прикажува пред прикачување, не потоа.'],
            ['Оставете ја главната слика да биде најлесната фотографија на страницата, бидејќи таа е и онаа што се мери за Largest Contentful Paint.'],
            ['Вчитувајте ги подоцнежните фотографии од галеријата само кога посетителот ќе скрола до нив, никогаш сите одеднаш при вчитување.'],
            ['Пуштете ја готовата страница низ извештај за тежина и поправете ја првo сликата што е најтешка.'],
          ],
        },

        {
          kind: 'faq',
          heading: 'Прашања што сопствениците ги поставуваат за фотографиите и брзината',
          intro: [
            'Секој одговор подолу претпоставува дека главната слика веќе е препознаена како единствениот најтежок елемент на страницата.',
          ],
          items: [
            {
              question: 'Дали фотографиите пред и по мора да бидат во целосна резолуција?',
              answer: [
                'Не. Фотографијата треба да биде онолку широка колку просторот што го исполнува на екранот. За повеќето занаетчиски галерии тоа е под 1 000 пиксели на телефон. Преправањето пред прикачување ја намалува големината на датотеката без видлив губиток, бидејќи никој не зумира во слика пред и по.',
              ],
            },
            {
              question: 'Дали лизгач или карусел додава повеќе тежина од статична галерија?',
              answer: [
                'Обично да. Многу лизгачи ги вчитуваат сликите на сите слајдови при првата посета наместо само онаа што се гледа. Главна секција со пет слајдови изградена така носи петпати повеќе тежина од онаа што моментно се гледа. Статична галерија што ги вчитува фотографиите додека посетителот скрола го избегнува тоа целосно.',
              ],
            },
            {
              question: 'Дали занаетчиски сајт треба да ги избегне фотографиите за да остане брз?',
              answer: [
                'Не. Фотографиите се она што продава замена на покрив или завршено бањско. Отстранувањето им замени еден проблем со друг. Поправката е во контролата на тежината на секоја фотографија, не во бројот на фотографии на страницата.',
              ],
            },
            {
              question: 'Дали тешка галерија влијае и на рангирањето во пребарувањата, не само на трпението на посетителот?',
              answer: [
                'Largest Contentful Paint е еден од Core Web Vitals што Google ги документира како дел од искуството на страницата, па тешка галерија прво е проблем со брзина, а потоа станува проблем со рангирање. Поправката на тежината ги решава двете одеднаш.',
              ],
            },
          ],
        },

        {
          kind: 'paragraph',
          text: [
            'Извештај за тежина на страница трае под една минута против жива страница, и го именува единствениот најтежок елемент наместо сопственикот да погодува која од десет фотографии да ја поправи прва. Пуштањето на извештај по секоја нова галерија го фаќа проблемот пред тоа да го стори муштеријата. Точното ',
            {
              text: 'поставување на телефонскиот број',
              href: '/blog/phone-number-placement-trades-website',
              title: 'Текст на LeoPixels за поставувањето на телефонскиот број и допирните зони на занаетчиски сајтови',
            },
            ' сепак не значи ништо ако сликите што се вчитуваат над него го трошат трпението на посетителот прво.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Следната фотографија што занаетчиски бизнис ја додава на сајтот вреди да се преправи пред да се прикачи, не откако муштерија на два бара сигнал веќе се откажала чекајќи ја.',
          ],
        },
      ],
    },
  },
});
