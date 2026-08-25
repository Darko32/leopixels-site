import { defineBlogPost } from '../_schema';

export const phoneNumberPlacementTradesWebsite = defineBlogPost({
  slug: 'phone-number-placement-trades-website',
  publishedAt: '2026-09-01T09:00:00Z',
  format: 'how-to',
  tags: ['phone number', 'mobile ux', 'click to call'],

  content: {
    /* ─────────────────────────────  English  ───────────────────────────── */
    en: {
      title: 'Where the Phone Number Belongs on a One-Page Trades Website',
      description:
        'Where a one-page trades site should put its phone number, how large the tap target needs to be, and why a slow page or a bad link buries it entirely.',

      intro: [
        [
          'The phone number belongs wherever a thumb already rests without the hand moving, which on most phones is the header and a bar that stays fixed as the page scrolls. It also has to be built as a real tel: link, not a picture of the digits, or tapping it does nothing. Get both right and someone standing in a flooded basement calls in one tap. Get either wrong and the number is decoration.',
        ],
        [
          'A one-page trades site gets one real chance to turn a visitor into a call. The distance between a number a thumb can reach without moving and one buried three sections down in small type decides whether that chance lands. Most owners find out which side they are on the day a competitor\'s number wins instead.',
        ],
      ],

      body: [
        {
          kind: 'keyFacts',
          items: [
            'Minimum tap target: 1cm by 1cm (about 44px)',
            'One-handed thumb reach: roughly the bottom third of the screen',
            'Bounce risk, 1 second load vs 10 seconds: up 123%',
            'Search users likely to use a call button: 69%',
          ],
        },

        { kind: 'heading', level: 2, text: 'Why the Number Has to Be a Real Link, Not an Image' },
        {
          kind: 'paragraph',
          text: [
            'A phone number only becomes callable in one tap when it carries a tel: link, the address format browsers use to hand a number to the dialer. Digits shown as plain text or built into an image do nothing when tapped. The visitor has to copy the number, switch apps, and dial by hand, and most will not bother.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Mozilla\'s reference for the HTML anchor element documents ',
            {
              text: 'tel: links',
              href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a',
              title: 'MDN reference for the HTML anchor element and the tel: URL scheme',
            },
            ' as one of the address schemes a link can carry beyond ordinary web pages, and notes that behavior varies by device. A phone autodials the number, a laptop may offer Skype or FaceTime, and some systems save it straight to contacts. None of that happens unless the markup is there to begin with.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'An electrician\'s site that shows the number as a logo graphic across the top looks identical to one built on a real link, until someone actually taps it. The difference costs a job exactly when the customer standing next to a dead breaker box has both hands free and one thing to do.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Where the Thumb Reaches on a Phone Screen' },
        {
          kind: 'paragraph',
          text: [
            'On a phone held in one hand, the thumb comfortably covers roughly the bottom third of the screen without the hand shifting grip. Nielsen Norman Group labels that region ',
            {
              text: 'the natural zone',
              href: 'https://www.nngroup.com/articles/touch-target-size/',
              title: 'Nielsen Norman Group research on touch target size and one-handed thumb reach',
            },
            ', and taps inside it land with far higher accuracy than a stretch toward the top of the screen.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'A number pinned only inside a header that scrolls out of view after the first screen asks for a stretch, not a reach. A bar fixed to the top or bottom of the screen keeps the number inside the zone the thumb already favors, all the way down a long page. One ',
            {
              text: 'sample emergency plumbing page',
              href: '/demos/redline-plumbing',
              title: 'Sample emergency plumbing website with a fixed header phone number',
            },
            ' keeps its number fixed through every scroll position for exactly that reason.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'A roofer\'s page built around large storm-damage photos is the clearest example. Scroll past two or three of those images and a number pinned only in the header is gone, right at the point a homeowner has decided the damage is bad enough to call.',
          ],
        },

        { kind: 'heading', level: 2, text: 'How Big the Tap Target Needs to Be' },
        {
          kind: 'paragraph',
          text: [
            'A tap target for a phone number needs to measure at least 1cm by 1cm, a figure Nielsen Norman Group traces to MIT Touch Lab research on how large a fingertip\'s real contact area is. The average thumb\'s impact area runs closer to 2.5cm, about an inch, so a number set in small type with no padding around it fails the test even while it is technically a link.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'The fix is padding, not a bigger font. Wrap the whole number, plus a comfortable margin around it, inside the tappable area instead of relying on ten characters of text to catch a thumb moving fast.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Two numbers set at the same font size can still fail differently. One wrapped tightly around ten digits with no room to spare passes a glance and fails a thumb. The other, padded generously on every side, catches a tap that lands slightly off center, which is most of them.',
          ],
        },

        {
          kind: 'heading',
          level: 2,
          text: 'Should the Number Live in the Header or Follow Down the Page?',
        },
        {
          kind: 'paragraph',
          text: [
            'Both, on a one-page trades site. The header carries the number for a visitor who never scrolls, and a sticky bar or a fixed button carries it for the one who reads the whole page before deciding. Losing the number between those two states after the first section is the most common placement mistake.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'For an HVAC company running a no-cooling call in July, that gap between header and sticky bar is where the visitor gives up and searches for the next name instead of scrolling back to find yours.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'A service list, a set of before-and-after photos, or a pricing block are exactly the sections a customer scrolls through before calling, and each one is a place the header\'s number has already scrolled out of view. Across the ',
            {
              text: 'trades demo builds',
              href: '/demos',
              title: 'Sample one-page websites built for plumbing, HVAC, electrical and roofing businesses',
            },
            ', a few different approaches keep a number fixed without crowding the rest of the page.',
          ],
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            ['Open the site on a phone, on mobile data, not office WiFi.'],
            ['Scroll to the section furthest from the top of the page.'],
            ['Check whether the number is still visible without scrolling back up.'],
            ['Tap it and confirm the dialer opens with the number already filled in.'],
          ],
        },

        {
          kind: 'heading',
          level: 2,
          text: 'Why a Slow Page Buries the Number No Matter Where It Sits',
        },
        {
          kind: 'paragraph',
          text: [
            'None of the placement work matters if the page has not finished loading. Google\'s own ',
            {
              text: 'mobile speed research',
              href: 'https://business.google.com/ca-en/think/marketing-strategies/mobile-page-speed-new-industry-benchmarks/',
              title: 'Google research on mobile page load time and visitor bounce rates',
            },
            ' puts a visitor\'s odds of bouncing before the page settles 123 percent higher once load time stretches from one second to ten.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'A tel: link the thumb can reach means nothing to someone who already left three seconds earlier. Heavy photo galleries, an embedded video, or a stack of third-party scripts are the usual reasons a one-page trades site loads slowly enough to lose the visitor before the number ever appears on screen.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'A one-page site built around a hero video and four large uncompressed photos will often clear that threshold before a single word of copy loads, on a job site with two bars of signal rather than a fast office connection.',
          ],
        },

        {
          kind: 'heading',
          level: 2,
          text: 'Why Do Trades Customers Call Instead of Filling Out a Form?',
        },
        {
          kind: 'paragraph',
          text: [
            'Calling answers a job faster than typing one out, and most people choose the faster option once it is offered outright. Industry research from ',
            {
              text: 'BIA Advisory Services',
              href: 'https://www.bia.com/blog/biakelsey-bytes-phone-calls-the-base-ingredient-for-local-commerce/',
              title: 'BIA Advisory Services on phone calls as a lead source for local businesses',
            },
            ' finds that 69 percent of search users say they are likely to use a call button to reach a local business straight from search results.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'A form still earns its place for a job that is not urgent, a set of photos, or a question that needs a written answer. For anything time-sensitive, a burst pipe, a tripped breaker, a furnace that quit overnight, the form is the slower path, and the page should not make the faster one harder to find.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'An auto repair shop describing a diagnostic problem benefits from this the most. Explaining a noise or a warning light in a form takes paragraphs. Saying it out loud on a call takes one sentence, and the shop can start booking the appointment before the sentence finishes.',
          ],
        },

        {
          kind: 'faq',
          heading: 'Questions Trades Owners Ask About the Call Button',
          intro: [
            'Each answer below assumes the number itself is accurate and the page has already finished loading. What is left is how the button behaves once someone is looking at it.',
          ],
          items: [
            {
              question: 'Does the phone number need to match the one on the Google Business Profile?',
              answer: [
                'Yes, digit for digit. A visitor comparing the two is checking that the business is real before dialing, and a mismatch reads as a red flag rather than a typo. A website and ',
                {
                  text: 'a Google Business Profile',
                  href: '/blog/website-vs-google-business-profile',
                  title: 'LeoPixels post comparing what a Google Business Profile and a website each cover',
                },
                ' cover different ground, but the phone number is one detail both still need to agree on.',
              ],
            },
            {
              question: 'Does the phone number also need to be in the footer?',
              answer: [
                'A footer copy does not replace the header or sticky version. It rarely sits in the thumb\'s natural zone during an active reading session, so treat it as a courtesy for someone who has scrolled all the way down looking for hours or an address, not as the main path to calling.',
              ],
            },
            {
              question: 'Does a click-to-call button slow a page down?',
              answer: [
                'A tel: link costs almost nothing to render, since it is plain text wrapped in a link. What slows a page is everything usually built around the button: a floating widget script, a chat pop-up, or a call-tracking snippet loaded from a third party. Keep the link itself simple and that risk disappears.',
              ],
            },
            {
              question: 'What if the business also wants a contact form?',
              answer: [
                'Keep both, but do not let the form compete with the number for the same space. A form answers something that is not urgent, a quote for next month or a photo of a job. The number stays visible the whole time the form sits further down the page.',
              ],
            },
          ],
        },

        {
          kind: 'paragraph',
          text: [
            'A number that fails the reach test does not need a redesign, only a sticky bar or a fixed header that carries it through every scroll position. That single change turns a page a customer would have abandoned mid-scroll into one that stays a tap away the whole time they are reading it.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'The same check is worth repeating after every new photo gallery, every added service section, and every redesign, because each one is a fresh chance for the number to end up a scroll away from where a thumb already sits.',
          ],
        },
      ],
    },

    /* ────────────────────────────  Macedonian  ─────────────────────────── */
    mk: {
      title: 'Каде припаѓа телефонскиот број на едностран занаетчиски сајт',
      description:
        'Каде треба да стои телефонскиот број на едностран занаетчиски сајт, колку голема треба да биде допирната зона, и зошто бавна страница или лоша врска го крие целосно.',

      intro: [
        [
          'Телефонскиот број припаѓа таму каде палецот веќе стои без раката да се поместува, а тоа на повеќето телефони е заглавието и лента што останува фиксна додека страницата се скролува. Мора и да биде вградена како вистинска tel: врска, а не слика на цифрите, инаку допирот не прави ништо. Направете го тоа исправно и некој што стои во поплавен подрум се јавува со еден допир. Направете грешка на кое било од двете и бројот е само украс.',
        ],
        [
          'Едностран занаетчиски сајт добива само една вистинска шанса да претвори посетител во повик. Растојанието меѓу број до кој палецот стигнува без да се движи и еден закопан три секции подолу во ситен фонт одлучува дали таа шанса ќе успее. Повеќето сопственици дознаваат на која страна се на денот кога бројот на конкурентот победува наместо нивниот.',
        ],
      ],

      body: [
        {
          kind: 'keyFacts',
          items: [
            'Минимална допирна зона: 1cm по 1cm (околу 44px)',
            'Дофат на палецот со една рака: долната третина од екранот',
            'Ризик од напуштање, 1 секунда наспроти 10 секунди вчитување: до 123%',
            'Корисници кои веројатно ќе користат копче за повик: 69%',
          ],
        },

        { kind: 'heading', level: 2, text: 'Зошто бројот мора да биде вистинска врска, а не слика' },
        {
          kind: 'paragraph',
          text: [
            'Телефонскиот број станува повикувачки со еден допир само кога носи tel: врска, форматот на адреса што прелистувачите го користат за да го предадат бројот на бирачот. Цифри прикажани како обичен текст или вградени во слика не прават ништо кога се допираат. Посетителот мора да го копира бројот, да смени апликација и да бира рачно, а повеќето нема да си дадат труд.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Референцата на Mozilla за HTML елементот за врска ги документира ',
            {
              text: 'tel: врските',
              href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a',
              title: 'MDN референца за HTML елементот за врска и tel: адресната шема',
            },
            ' како една од адресните шеми што врската може да ги носи надвор од обичните веб страници, и наведува дека однесувањето варира по уред. Телефон сам го бира бројот, лаптоп може да понуди Skype или FaceTime, а некои системи го зачувуваат директно во контакти. Ништо од тоа не се случува ако ознаката не е поставена од почеток.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Сајт на електричар што го прикажува бројот како графика на логото на врвот изгледа идентично со оној изграден на вистинска врска, сè додека некој навистина не допре. Разликата чини работа токму кога муштеријата што стои крај изгорена осигурувачка табла има слободни раце и една работа да ја заврши.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Каде стигнува палецот на екранот на телефон' },
        {
          kind: 'paragraph',
          text: [
            'На телефон држан со една рака, палецот удобно ја покрива долната третина од екранот без раката да го менува зафатот. Nielsen Norman Group тоа подрачје го нарекува ',
            {
              text: 'природна зона',
              href: 'https://www.nngroup.com/articles/touch-target-size/',
              title: 'Истражување на Nielsen Norman Group за големината на допирните зони и дофатот на палецот',
            },
            ', а допирите внатре во неа паѓаат со многу поголема точност отколку истегнување кон врвот на екранот.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Број закачен само во заглавие што исчезнува по првиот екран бара истегнување, не дофат. Лента фиксирана на врвот или дното на екранот го држи бројот внатре во зоната што палецот веќе ја претпочита, до крајот на долга страница. Една ',
            {
              text: 'демо страница за итен водоводџија',
              href: '/demos/redline-plumbing',
              title: 'Демо изработка за итен водоводен бизнис со фиксиран телефонски број во заглавието',
            },
            ' го држи својот број фиксен низ секоја позиција на скролување токму поради тоа.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Страница на кровопокривач изградена околу големи фотографии од штети од невреме е најјасниот пример. Помината две или три од тие фотографии и број закачен само во заглавието го нема, токму во моментот кога сопственикот на куќата одлучил дека штетата е доволно голема за да се јави.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Колку голема треба да биде допирната зона' },
        {
          kind: 'paragraph',
          text: [
            'Допирната зона за телефонски број треба да мери најмалку 1cm по 1cm, бројка што Nielsen Norman Group ја врзува со истражувањето на MIT Touch Lab за тоа колку голема е вистинската контактна површина на прст. Просечната контактна површина на палецот е поблиску до 2.5cm, околу еден инч, па број поставен во ситен фонт без простор околу себе паѓа на тестот дури и кога технички е врска.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Поправката е простор околу бројот, не поголем фонт. Опфатете го целиот број, плус удобна маргина околу него, внатре во допирната површина наместо да се потпирате на десетина знаци текст да фатат брз палец.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Два броја поставени во иста големина на фонт сепак можат да паднат на различен начин. Еден стегнат тесно околу десет цифри без простор поминува на поглед, а паѓа на допир. Другиот, со поголема маргина на секоја страна, го фаќа допирот што паѓа малку настрана, а тоа е случајот со повеќето допири.',
          ],
        },

        {
          kind: 'heading',
          level: 2,
          text: 'Дали бројот треба да стои во заглавието или да го следи скролувањето?',
        },
        {
          kind: 'paragraph',
          text: [
            'И двете, на едностран занаетчиски сајт. Заглавието го носи бројот за посетител што никогаш не скролува, а лепливата лента или фиксното копче го носи за оној што ја чита целата страница пред да одлучи. Губењето на бројот меѓу тие две состојби по првата секција е најчестата грешка во поставувањето.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'За климатизерска фирма што прима повик за расипан клима уред во јули, токму тој јаз меѓу заглавието и лепливата лента е местото каде посетителот се откажува и бара следно име наместо да скрола назад до вашето.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Список на услуги, серија фотографии пред и по или блок со цени се токму секциите низ кои муштеријата скрола пред да се јави, а секоја од нив е место каде бројот од заглавието веќе излегол од видното поле. Низ ',
            {
              text: 'демо изработките за занаетите',
              href: '/demos',
              title: 'Демо едностранични сајтови за водовод, климатизација, електрика и кровопокривање',
            },
            ', неколку различни пристапи го држат бројот фиксен без да го натрупаат остатокот на страницата.',
          ],
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            ['Отворете го сајтот на телефон, на мобилен интернет, не на WiFi во канцеларија.'],
            ['Скролувајте до секцијата најоддалечена од врвот на страницата.'],
            ['Проверете дали бројот е сè уште видлив без да скролувате назад.'],
            ['Допрете го и потврдете дека бирачот се отвора со бројот веќе внесен.'],
          ],
        },

        {
          kind: 'heading',
          level: 2,
          text: 'Зошто бавна страница го крие бројот без разлика каде стои',
        },
        {
          kind: 'paragraph',
          text: [
            'Ништо од работата околу поставувањето не е важно ако страницата не завршила со вчитување. Google-овото ',
            {
              text: 'истражување за брзина',
              href: 'https://business.google.com/ca-en/think/marketing-strategies/mobile-page-speed-new-industry-benchmarks/',
              title: 'Истражување на Google за времето на вчитување на мобилни страници и стапката на напуштање',
            },
            ' на мобилни страници покажува дека веројатноста посетителот да ја напушти страницата пред да се стабилизира е 123 отсто повисока кога времето на вчитување се протега од една до десет секунди.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Tel: врска до која палецот може да стигне не значи ништо за некој што веќе заминал три секунди порано. Тешки галерии со фотографии, вграден видео запис или куп скрипти од трети страни се вообичаените причини зошто едностран занаетчиски сајт се вчитува доволно бавно за да го изгуби посетителот пред бројот воопшто да се појави на екранот.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Едностран сајт изграден околу видео на насловната секција и четири големи некомпресирани фотографии често го надминува тој праг пред да се вчита ниту еден збор текст, на градилиште со два бара сигнал наместо брза врска во канцеларија.',
          ],
        },

        {
          kind: 'heading',
          level: 2,
          text: 'Зошто занаетчиските муштерии повикуваат наместо да пополнат формулар?',
        },
        {
          kind: 'paragraph',
          text: [
            'Повикот одговара на работа побрзо отколку да се пишува иста работа, и повеќето луѓе ја бираат побрзата опција штом им е понудена директно. Индустриско истражување на ',
            {
              text: 'BIA Advisory Services',
              href: 'https://www.bia.com/blog/biakelsey-bytes-phone-calls-the-base-ingredient-for-local-commerce/',
              title: 'BIA Advisory Services за телефонските повици како извор на муштерии за локални бизниси',
            },
            ' покажува дека 69 отсто од корисниците на пребарување велат дека веројатно ќе користат копче за повик за да контактираат локален бизнис директно од резултатите на пребарувањето.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Формулар сепак го заслужува своето место за работа што не е итна, серија фотографии или прашање што бара писмен одговор. За сè што е временски чувствително, пукната цевка, исфрлен осигурувач, печка што престанала да работи преку ноќ, формуларот е побавниот пат, а страницата не треба да го отежнува побрзиот.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Работилница за автомеханика што опишува дијагностички проблем најмногу добива од ова. Објаснување на звук или сигнална ламба во формулар зафаќа пасуси. Кажување на глас во повик зафаќа една реченица, а работилницата може да почне да го закажува терминот пред реченицата да заврши.',
          ],
        },

        {
          kind: 'faq',
          heading: 'Прашања што сопствениците ги поставуваат за копчето за повик',
          intro: [
            'Секој одговор подолу претпоставува дека бројот е точен и страницата веќе завршила со вчитување. Останува само како се однесува копчето откако некој веќе го гледа.',
          ],
          items: [
            {
              question: 'Дали телефонскиот број мора да се совпаѓа со оној на Google Business Profile?',
              answer: [
                'Да, цифра по цифра. Посетител што ги споредува двата проверува дали бизнисот е вистински пред да се јави, а несовпаѓањето изгледа како предупредување, не како печатна грешка. Сајт и ',
                {
                  text: 'Google Business Profile',
                  href: '/blog/website-vs-google-business-profile',
                  title: 'Текст на LeoPixels што споредува што покрива Google Business Profile, а што сајт',
                },
                ' покриваат различен терен, но телефонскиот број е детаљ за кој сепак мора да се согласуваат.',
              ],
            },
            {
              question: 'Дали телефонскиот број треба да стои и во подножјето?',
              answer: [
                'Копија во подножјето не ги заменува заглавието или лепливата верзија. Ретко седи во природната зона на палецот додека некој активно чита, па третирајте ја како љубезност за оној што скролувал сè до дното барајќи работно време или адреса, не како главен пат до повик.',
              ],
            },
            {
              question: 'Дали копче за повик ја успорува страницата?',
              answer: [
                'Tel: врска чини речиси ништо за прикажување, бидејќи е обичен текст завиткан во врска. Она што ја успорува страницата е сè што обично се гради околу копчето: скрипта за лебдечки виџет, скокачки прозорец за разговор или код за следење повици вчитан од трета страна. Одржете ја самата врска едноставна и тој ризик исчезнува.',
              ],
            },
            {
              question: 'Што ако бизнисот сака и формулар за контакт?',
              answer: [
                'Задржете ги двата, но не дозволувајте формуларот да се натпреварува со бројот за истиот простор. Формуларот одговара на нешто што не е итно, понуда за следниот месец или фотографија од работа. Бројот останува видлив цело време додека формуларот стои подолу на страницата.',
              ],
            },
          ],
        },

        {
          kind: 'paragraph',
          text: [
            'Број што паѓа на тестот на дофат не бара редизајн, туку само леплива лента или фиксно заглавие што го носи низ секоја позиција на скролување. Таа единствена промена претвора страница што муштеријата ќе ја напуштела среде скролување во страница што останува на еден допир далеку цело време додека таа ја чита.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Истата проверка вреди да се повторува по секоја нова галерија со фотографии, секоја додадена секција за услуги и секој редизајн, бидејќи секој од нив е нова прилика бројот да заврши скрол далеку од местото каде палецот веќе стои.',
          ],
        },
      ],
    },
  },
});
