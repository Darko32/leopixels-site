import { defineBlogPost } from '../_schema';

export const localServicesAdsCostVsWebsite = defineBlogPost({
  slug: 'local-services-ads-cost-vs-website',
  publishedAt: '2026-09-08T09:00:00Z',
  format: 'comparison',
  tags: ['local services ads', 'advertising cost', 'lead generation'],

  content: {
    /* ─────────────────────────────  English  ───────────────────────────── */
    en: {
      title: 'What Local Services Ads Cost a Trades Business, Compared to a Website',
      description:
        "Local Services Ads bill per lead for as long as a campaign runs. A website is a flat cost instead, and Google's own rules explain what that means.",

      intro: [
        [
          'A Local Services Ad charges a fee every time a call, text or booking request comes through it, for as long as the campaign keeps running. A website works differently: a flat-rate build runs $500 once and $149 a month after that, covering hosting and changes whether the phone rings once or fifty times that week. Google sets the per-lead price by trade, location and how the customer made contact, and running an ad at all first means passing a screening process most trades businesses have never seen. The two are not substitutes for each other, since they carry opposite cost shapes.',
        ],
        [
          'An owner who has never run paid search often assumes a Local Services Ad works like a normal ad, paid for exposure and cancelled the same afternoon, but that is not how it works. The charge lands only once a real customer makes contact, the price moves with demand in that trade and area, and getting approved to run one can take weeks of paperwork nobody expected going in. None of that makes the ads a bad option. It makes the cost worth understanding before the first invoice arrives.',
        ],
      ],

      body: [
        {
          kind: 'keyFacts',
          items: [
            'LSA billing: per lead, not per click',
            'Screening to run one: 3 to 4 weeks',
            'A flat-rate website: $500 once, $149 a month after',
            'Ad trust badge: renamed Google Verified',
          ],
        },

        { kind: 'heading', level: 2, text: 'How a Local Services Ad Gets Priced' },
        {
          kind: 'paragraph',
          text: [
            'A business running Local Services Ads sets a weekly budget for how many leads it wants, plus ',
            {
              text: 'a maximum per-lead bid',
              href: 'https://support.google.com/localservices/answer/7195435?hl=en',
              title: "Google's Local Services Help page on how lead pricing and budgets work",
            },
            ' for what any single lead is worth, rather than bidding per click the way an ordinary Google ad works. Google decides which leads to deliver inside that ceiling, and the price of each one moves with the trade, the location and how competitive that market is that week.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            "None of that variability touches a website's price. A flat-rate build stays the same figure in a slow month and a busy one, because the ",
            {
              text: '$149 a month',
              href: '/#pricing',
              title: 'The LeoPixels homepage section listing the flat build fee and monthly cost',
            },
            ' after it pays for hosting and changes rather than for each visitor who happens to call.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Which Contacts Get Billed' },
        {
          kind: 'paragraph',
          text: [
            'A call, a text, a voicemail or a booking request through the ad each counts as contact, and Google reviews it before deciding whether to charge for it. A call that never connects, a wrong number or an obvious spam contact gets filtered out at that first pass, so the charge lands only on contact that looks like a real customer.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'A click on the ad that never turns into a call, a text or a booking costs nothing, which is the core difference from an ordinary pay-per-click campaign, charged the moment someone lands on the page rather than the moment they actually get in touch.',
          ],
        },

        { kind: 'heading', level: 2, text: 'What It Takes to Qualify to Run One' },
        {
          kind: 'paragraph',
          text: [
            "Getting a Local Services Ad live takes more than an account setup. A business needs a state or local license for the trade, general liability insurance that meets Google's stated minimum, and a public, verified Google Business Profile before the ad can run, with approval taking ",
            {
              text: '3 to 4 weeks',
              href: 'https://support.google.com/localservices/answer/12174778?hl=en',
              title: "Google's screening and verification requirements for Local Services Ads",
            },
            ' on average once the paperwork is filed.',
          ],
        },
        {
          kind: 'list',
          items: [
            ['A state or local business license for the trade'],
            ["General liability insurance meeting Google's stated minimum"],
            ['A public, verified Google Business Profile'],
            ['A background check for the business, and for urgent trades, for every field worker too'],
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'How deep that background check runs depends on the trade. A plumbing, HVAC or locksmith business falls into what Google treats as an urgent category and gets the fuller service-professional check, while some other categories, like food and beverage, can qualify on the verified profile alone. A trades business applying today should expect the fuller version.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'That approval timeline runs longer than it takes a flat-rate build to go from request to a working demo, which arrives within 48 hours regardless of the trade or the season. A business can be looking at a finished website before its Local Services application has even cleared review.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Does a Text Cost Less Than a Phone Call?' },
        {
          kind: 'paragraph',
          text: [
            'Usually, yes, but not by a fixed amount. A text or a voicemail typically prices lower than an answered phone call, and the gap moves with how likely that particular contact looks to turn into a booked job, based on the service requested and whether the customer has reached that business before.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            "That estimate is Google's, not the business's, and it shifts for the same trade and the same town depending on demand that week. A slow week for emergency plumbing calls can narrow the phone-call premium; a busy one can widen it. Neither price is something an owner sets or negotiates, which is the trade-off for not having to bid per click the way an ordinary search ad requires.",
          ],
        },

        { kind: 'heading', level: 2, text: 'What the Cost Curve Looks Like After a Year' },
        {
          kind: 'paragraph',
          text: [
            'A flat-rate website adds up to a known number: $500 to build it, then $149 a month, which comes to $2,288 across a full year regardless of how many people called. A Local Services Ad has no equivalent ceiling, because the bill is the sum of every lead Google delivered inside that week\'s budget, and it resets every week rather than settling into one number.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            "Neither number is wrong to pay. A business chasing volume in a competitive trade can spend past $2,288 in leads within a few months and still come out ahead if enough of them turn into jobs. An electrician's site built this way, like ",
            {
              text: 'the sample electrical build',
              href: '/demos/ironwood-electric',
              title: 'Sample LeoPixels demo build for an electrical contracting business',
            },
            ", costs the same figure in a slow month as during a run of storm-outage calls, while the ad's bill moves with both.",
          ],
        },
        {
          kind: 'paragraph',
          text: [
            "Stretched to three years, the flat-rate math reaches $5,864 and stops there, a single number set on day one. A business only comes out ahead of that number once its own math says the extra leads coming through the ad were worth more than what they cost, a calculation a flat monthly fee never asks an owner to run.",
          ],
        },

        { kind: 'heading', level: 2, text: 'Can a Business Turn It Off Completely?' },
        {
          kind: 'paragraph',
          text: [
            "Pausing stops the paid placement, but it does not necessarily remove the business's listing from Local Services entirely. Google's own scheduling documentation says ",
            {
              text: 'a free version',
              href: 'https://support.google.com/localservices/answer/9251526?hl=en',
              title: "Google's Local Services Ads scheduling documentation on paused and off-hours listings",
            },
            " can still display outside a business's scheduled hours or while a campaign is paused, without the badge or the placement the paid version carries.",
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'A website has no equivalent half-off state. It is either live, at the fixed monthly cost, or it is taken down, and there is no reduced, free version standing in its place once the bill stops, the way Google keeps a limited listing showing for a paused ad.',
          ],
        },

        {
          kind: 'faq',
          heading: 'Questions Trades Owners Ask About Local Services Ads Pricing',
          intro: [
            'Every answer below assumes the business has already passed screening and has an active campaign running, since pricing questions tend to start only once the first invoice arrives.',
          ],
          items: [
            {
              question: 'Does a missed call with a callback still count as a billable lead?',
              answer: [
                'Yes. A missed call that the business calls back is one of the contact types Google counts as a lead, alongside an answered call, a text, a voicemail and a booking request. Letting a call ring out does not avoid the charge if the callback goes through afterward.',
              ],
            },
            {
              question: 'Can a business get credit for a lead charged by mistake?',
              answer: [
                'Yes. Google keeps reassessing charged leads after the fact, and one later found to be low quality can be credited back automatically. A business can also flag a bad lead itself through a feedback survey rather than waiting for the automatic review to catch it, which matters most in the first few weeks of a new campaign, before an owner has a feel for what a real lead sounds like.',
              ],
            },
            {
              question: 'Is Google Guaranteed still the badge businesses see?',
              answer: [
                'No. Google folded Google Guaranteed, Google Screened and License Verified by Google into one ',
                {
                  text: 'Google Verified',
                  href: 'https://support.google.com/localservices/answer/16498018?hl=en',
                  title: 'Google support page on the Google Verified badge for Local Services Ads',
                },
                ' badge, and businesses that had already completed verification kept their status without doing anything new. The badge signals the same underlying screening, just under one name instead of three.',
              ],
            },
            {
              question: 'Does the $149 monthly fee change in a slow month?',
              answer: [
                'No. The fee is flat and covers hosting, the domain and changes to the site regardless of how many people visit or call that month, which is the opposite of a per-lead bill that only grows with contact. A quiet January and a busy June carry the same invoice.',
              ],
            },
          ],
        },

        {
          kind: 'paragraph',
          text: [
            'That question sits downstream of an earlier one: whether a website is ',
            {
              text: 'worth building at all',
              href: '/blog/website-vs-google-business-profile',
              title: 'LeoPixels post comparing a website to a Google Business Profile alone',
            },
            ' once a Google Business Profile already exists, since a Local Services Ad still needs a page to send its leads to. A business running ads without a site is paying per lead to reach a page that only Google hosts, which is the more expensive way to arrive at the same missing page.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Once a lead does come through, paid or not, ',
            {
              text: 'how that number gets answered',
              href: '/blog/phone-number-placement-trades-website',
              title: 'LeoPixels post on placing a tappable phone number on a trades website',
            },
            ' decides whether the charge was worth it. A missed call from a Local Services Ad costs the same as an answered one, so the page waiting on the other end is where that money either turns into a job or does not, whether it arrived through a paid lead or a plain search.',
          ],
        },
      ],
    },

    /* ────────────────────────────  Macedonian  ─────────────────────────── */
    mk: {
      title: 'Колку чини рекламата Local Services Ads, споредено со сајт',
      description:
        'Local Services Ads наплаќаат по контакт, додека рекламата работи. Сајтот е фиксен трошок наместо тоа, а правилата на Google го објаснуваат тоа.',

      intro: [
        [
          'Local Services Ads наплаќаат такса секој пат кога ќе пристигне повик, порака или барање за термин преку рекламата, се додека кампањата работи. Сајт работи поинаку: изработка со фиксна цена чини 500 долари еднаш и 149 долари месечно потоа, а тоа го покрива хостингот и промените без разлика дали телефонот ѕвони еднаш или педесет пати таа недела. Google ја одредува цената по контакт според занаетот, локацијата и начинот на јавување, а за да работи реклама воопшто, прво треба да се помине проверка низ која повеќето занаетчиски бизниси никогаш не поминале. Двете не се вистинска замена едно за друго, бидејќи носат спротивни модели на трошок.',
        ],
        [
          'Сопственик што никогаш не водел платено пребарување често мисли дека Local Services Ads работи како обична реклама, платена за прикажување и откажана истото попладне, но тоа не е така. Таксата паѓа само штом вистински клиент воспостави контакт, цената се менува со побарувачката во тој занает и подрачје, а одобрувањето да се работи реклама може да бара недели хартии што никој не ги очекувал. Ништо од тоа не ги прави рекламите лоша опција. Го прави трошокот вреден да се разбере пред да пристигне првата сметка.',
        ],
      ],

      body: [
        {
          kind: 'keyFacts',
          items: [
            'Наплата за LSA: по контакт, не по клик',
            'Проверка за да работи реклама: 3 до 4 недели',
            'Сајт со фиксна цена: 500 долари еднаш, 149 долари месечно потоа',
            'Знак на доверба: преименуван во Google Verified',
          ],
        },

        { kind: 'heading', level: 2, text: 'Како всушност се формира цената на Local Services Ads' },
        {
          kind: 'paragraph',
          text: [
            'Бизнис што работи со Local Services Ads поставува неделен буџет за тоа колку контакти сака, плус ',
            {
              text: 'максимална понуда по контакт',
              href: 'https://support.google.com/localservices/answer/7195435?hl=en',
              title: 'Страница на Google Local Services Help за буџетот и цената по контакт',
            },
            ' за тоа колку вреди еден единствен контакт, наместо да наддава по клик како обична Google реклама. Google одлучува кои контакти ќе ги достави внатре во таа граница, а цената на секој се менува со занаетот, локацијата и колку конкурентен е тој пазар таа недела.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Ниту едно од тоа колебање не го допира трошокот на сајтот. Изработка со фиксна цена останува иста бројка и во слаб и во зафатен месец, бидејќи ',
            {
              text: '149 долари месечно',
              href: '/#pricing',
              title: 'Делот на почетната страница на LeoPixels со фиксната изработка и месечната цена',
            },
            ' по неа плаќаат за хостинг и промени, не за секој посетител што случајно се јавува.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Кои контакти всушност се наплаќаат' },
        {
          kind: 'paragraph',
          text: [
            'Повик, порака, гласовна порака или барање за термин преку рекламата секој се смета за контакт, а Google го проверува пред да одлучи дали да наплати за него. Повик што не се поврзал, погрешен број или очигледен спам контакт се филтрираат уште на тоа прво поминување, па наплатата паѓа само на контакт што личи на вистински клиент.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Клик на рекламата што никогаш не прерасне во повик, порака или барање не чини ништо, а тоа е основната разлика од обична кампања со плаќање по клик, каде наплатата паѓа во моментот кога некој ќе слета на страницата, не во моментот кога навистина ќе стапи во контакт.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Што е потребно воопшто да се квалификувате' },
        {
          kind: 'paragraph',
          text: [
            'Да се пушти Local Services Ads во употреба бара повеќе од поставување сметка. Бизнисот треба државна или локална лиценца за занаетот, осигурување за општа одговорност што ги исполнува минимумите на Google, и јавен, потврден Google Business Profile пред рекламата да проработи, а одобрувањето трае ',
            {
              text: '3 до 4 недели',
              href: 'https://support.google.com/localservices/answer/12174778?hl=en',
              title: 'Барањата на Google за проверка и потврда за Local Services Ads',
            },
            ' во просек откако документите се поднесени.',
          ],
        },
        {
          kind: 'list',
          items: [
            ['Државна или локална деловна лиценца за занаетот'],
            ['Осигурување за општа одговорност што ги исполнува минимумите на Google'],
            ['Јавен, потврден Google Business Profile'],
            ['Проверка на минато за бизнисот, а за итните занаети, за секој вработен на терен'],
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Колку длабока е таа проверка на минато зависи од занаетот. Бизнис за водовод, климатизација или брави спаѓа во она што Google го третира како итна категорија и добива поцелосна проверка на секој вработен на терен, додека некои други категории, како храна и пијалаци, можат да се квалификуваат само со потврден профил. Занаетчиски бизнис што аплицира денес треба да ја очекува поцелосната верзија.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Тој рок за одобрување трае подолго од времето потребно на изработка со фиксна цена да стигне од барање до работно демо, кое пристигнува во рок од 48 часа без разлика на занаетот или сезоната. Бизнисот може веќе да гледа готов сајт пред неговата апликација за Local Services воопшто да помине проверка.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Дали пораката чини помалку од телефонски повик?' },
        {
          kind: 'paragraph',
          text: [
            'Обично да, но не за фиксен износ. Порака или гласовна порака вообичаено чини помалку од одговорен телефонски повик, а разликата се менува со тоа колку веројатно тој конкретен контакт изгледа дека ќе прерасне во закажана работа, врз основа на бараната услуга и дали клиентот веќе контактирал со тој бизнис порано.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Таа проценка е на Google, не на бизнисот, и се менува за истиот занает и истиот град во зависност од побарувачката таа недела. Слаба недела за итни водоводџиски повици може да ја стесни разликата за телефонски повик, а зафатена недела може да ја прошири. Ниту едната цена не ја поставува или преговара сопственикот, а тоа е компромисот за тоа што не мора да наддава по клик како обична реклама за пребарување.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Каква е сликата на трошокот по цела година' },
        {
          kind: 'paragraph',
          text: [
            'Сајт со фиксна цена собира до позната бројка: 500 долари за изработка, потоа 149 долари месечно, што изнесува 2 288 долари за цела година без разлика колку луѓе се јавиле. Local Services Ads нема таков таван, бидејќи сметката е збир на секој контакт што Google го доставил внатре во буџетот на таа недела, и се ресетира секоја недела наместо да се смири на една бројка.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Ниту една од двете бројки не е погрешна да се плати. Бизнис што брза за обем во конкурентен занает може да потроши повеќе од 2 288 долари за контакти за неколку месеци и сепак да излезе на добро ако доволно од нив прераснат во работа. Сајт на електричар изграден вака, како ',
            {
              text: 'примерокот за електричарска изработка',
              href: '/demos/ironwood-electric',
              title: 'Примерок сајт на LeoPixels за електричарски бизнис',
            },
            ', чини иста бројка во слаб месец и во серија повици за нестанато напојување, додека сметката за рекламата се менува со двете.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Растегната на три години, истата пресметка со фиксна цена стигнува до 5 864 долари и застанува таму, една бројка поставена уште првиот ден. Бизнисот доаѓа пред таа бројка дури откако сопствената сметка ќе покаже дека дополнителните контакти преку рекламата вредат повеќе од тоа што чинат, пресметка што фиксната месечна такса никогаш не бара сопственикот да ја прави.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Дали бизнисот може целосно да ја исклучи рекламата?' },
        {
          kind: 'paragraph',
          text: [
            'Паузирањето го запира платеното поставување, но не мора целосно да го отстрани бизнисот од Local Services. Документацијата на Google за распоред вели дека ',
            {
              text: 'бесплатна верзија на огласот',
              href: 'https://support.google.com/localservices/answer/9251526?hl=en',
              title: 'Документацијата на Google за распоред и паузирани огласи на Local Services Ads',
            },
            ' сепак може да се прикажува надвор од работното време на бизнисот или додека кампањата е паузирана, без знакот или поставувањето што ги носи платената верзија.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Сајтот нема таква половична состојба. Или е активен, по фиксната месечна цена, или е симнат, а нема намалена, бесплатна верзија што стои на негово место штом сметката престане, онака како што Google задржува ограничен оглас за паузирана реклама.',
          ],
        },

        {
          kind: 'faq',
          heading: 'Прашања што занаетчиите ги поставуваат за цената на Local Services Ads',
          intro: [
            'Секој одговор подолу претпоставува дека бизнисот веќе поминал проверка и има активна кампања, бидејќи прашањата за цената обично почнуваат дури штом пристигне првата сметка.',
          ],
          items: [
            {
              question: 'Дали пропуштен повик со повратно јавување сепак се смета за наплатлив контакт?',
              answer: [
                'Да. Пропуштен повик на кој бизнисот се јавува назад е еден од типовите контакт што Google ги смета за наплатливи, покрај одговорен повик, порака, гласовна порака и барање за термин. Тоа што повикот ѕвони без одговор не ја избегнува наплатата ако повратниот повик подоцна се случи.',
              ],
            },
            {
              question: 'Дали бизнисот може да добие поврат за контакт наплатен по грешка?',
              answer: [
                'Да. Google постојано повторно ги проценува наплатените контакти, а оној подоцна оценет како слаб квалитет може автоматски да се врати. Бизнисот може и сам да пријави лош контакт преку анкета за повратна информација, наместо да чека автоматската проверка да го фати, што значи најмногу во првите неколку недели од нова кампања, додека сопственикот сè уште не стекнал осет за тоа како звучи вистински контакт.',
              ],
            },
            {
              question: 'Дали Google Guaranteed сè уште е знакот што го гледаат бизнисите?',
              answer: [
                'Не. Google ги спои Google Guaranteed, Google Screened и License Verified by Google во еден знак ',
                {
                  text: 'Google Verified',
                  href: 'https://support.google.com/localservices/answer/16498018?hl=en',
                  title: 'Страница на Google за знакот Google Verified за Local Services Ads',
                },
                ', а бизнисите што веќе ја завршиле проверката го задржаа статусот без да прават нешто ново. Знакот означува иста проверка како и порано, само под едно име наместо три.',
              ],
            },
            {
              question: 'Дали месечната такса од 149 долари се менува во слаб месец?',
              answer: [
                'Не. Таксата е фиксна и ги покрива хостингот, доменот и промените на сајтот без разлика колку луѓе го посетуваат или се јавуваат тој месец, спротивно од сметка по контакт што расте само со бројот на контакти. Мирен јануари и зафатен јуни носат иста сметка.',
              ],
            },
          ],
        },

        {
          kind: 'paragraph',
          text: [
            'Тоа прашање доаѓа по едно поранешно: дали сајт ',
            {
              text: 'воопшто вреди да се изгради',
              href: '/blog/website-vs-google-business-profile',
              title: 'Текст на LeoPixels што споредува сајт со самостоен Google Business Profile',
            },
            ' штом веќе постои Google Business Profile, бидејќи Local Services Ads сепак треба страница каде ги праќа своите контакти. Бизнис што работи реклами без сајт плаќа по контакт за да стигне до страница што ја хостира само Google, а тоа е поскап начин да се стигне до истата недостасувачка страница.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Штом контактот стигне, платен или не, ',
            {
              text: 'како тој број добива одговор',
              href: '/blog/phone-number-placement-trades-website',
              title: 'Текст на LeoPixels за поставувањето на телефонскиот број на занаетчиски сајт',
            },
            ' одлучува дали наплатата вредела. Пропуштен повик од Local Services Ads чини исто како одговорен, па страницата на другиот крај е онаа каде тие пари или прераснуваат во работа, или не, без разлика дали контактот стигнал преку платен оглас или обично пребарување.',
          ],
        },
      ],
    },
  },
});
