import { defineBlogPost } from '../_schema';

export const speedToQuoteTradesBusiness = defineBlogPost({
  slug: 'speed-to-quote-trades-business',
  publishedAt: '2026-09-22T09:00:00Z',
  format: 'how-to',
  tags: ['speed to lead', 'quoting', 'local services ads'],

  content: {
    /* ─────────────────────────────  English  ───────────────────────────── */
    en: {
      title: 'How Fast You Need to Quote a Job Before the Customer Moves On',
      description:
        'The research behind how fast a job quote needs to go out, why a one-van shop feels the gap first, and how a text or a form keeps a lead from going cold.',

      intro: [
        [
          'A job request goes cold within hours, not days. National research tracking more than a million sales leads found that a business reaching a new customer within an hour was nearly seven times more likely to hold a real conversation with them than one that waited even an hour longer, and more than sixty times as likely as one that waited a full day. A trades job works the same way: the caller with a dead water heater is usually calling two or three other numbers that same afternoon, and whoever quotes first sets the price the rest get judged against.',
        ],
        [
          'Most one-van shops lose these jobs on habit, not skill. The owner is under a sink or up a ladder when the call comes in, the voicemail box fills, and the callback happens that evening once the customer has already booked someone else. The fix is a habit rather than a hire: texting back within minutes, or a quote form that keeps a job moving without anyone picking up a phone.',
        ],
      ],

      body: [
        {
          kind: 'keyFacts',
          items: [
            'Reply within an hour: about 7x more likely to qualify',
            'Wait a full day: over 60x less likely to connect',
            'Local Services Ads response-time estimate: minutes to a day',
            'Self-employment rate in construction and extraction trades: 14.8%',
          ],
        },

        { kind: 'heading', level: 2, text: 'What Counts as a Fast Quote' },
        {
          kind: 'paragraph',
          text: [
            "A fast quote reaches the customer before attention moves to the next name on the list. In practice that means minutes, not hours. Google's own Local Services Ads make the expectation visible: once a business has taken two or more message leads in 90 days, its ad displays ",
            {
              text: 'an estimated response time',
              href: 'https://support.google.com/localservices/answer/6224859?hl=en',
              title: "Google's Local Services Ads help page on response time and ranking",
            },
            ' somewhere between a few minutes and one day.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'For most home trades that plays out inside a single afternoon. A homeowner with no hot water calls three or four listings from one search, in the order they load, and the first one to say something concrete, a price range, a time window, a plan, is usually the one that gets the job. Silence for even twenty minutes reads as a shop that is not paying attention.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            "That number follows the business rather than staying private. A slow average pulls down how the ad performs in the auction, and a fast one becomes a visible reason a customer picks one plumber's listing over the next one down.",
          ],
        },

        { kind: 'heading', level: 2, text: 'Why Waiting Costs More Than It Feels Like' },
        {
          kind: 'paragraph',
          text: [
            'An hour of delay is not a small gap. Researchers sent an identical test lead to ',
            {
              text: '2,241 U.S. companies',
              href: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads',
              title: 'Harvard Business Review study auditing company response times to leads',
            },
            ' and tracked what happened next: 37 percent replied within an hour, 23 percent never replied at all, and the businesses that eventually answered took 42 hours to do it.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Whoever answers first usually wins the job in a market where two or three shops are bidding on the same repair, regardless of who would have done the better work. A one-van shop competing against that average is not competing with every plumber in the phone book at once. It only has to answer before the slower half of the market gets around to it.',
          ],
        },

        {
          kind: 'heading',
          level: 2,
          text: 'Is a One-Van Shop More Exposed to This Than a Bigger Company?',
        },
        {
          kind: 'paragraph',
          text: [
            'Yes, because the person answering the phone is usually also the person doing the job. Construction and extraction occupations post the highest rate of self-employment ',
            {
              text: 'the Bureau of Labor Statistics',
              href: 'https://www.bls.gov/spotlight/2016/self-employment-in-the-united-states/home.htm',
              title: 'BLS spotlight on self-employment rates across U.S. occupations',
            },
            ' tracks across any occupation group, at 14.8 percent, and most of those self-employed workers carry no paid employees at all.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'That gap is structural, not a discipline problem. One person cannot be on a call and up on a roof in the same minute, and the fix has to work around that fact instead of pretending it away.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'It also means the fix cannot depend on hiring anyone. A dispatcher is a real cost for a shop already running on one truck and one set of hands, so the answer has to be something the owner can do from wherever the job already has them, not a new position on the payroll.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Building a Quote Habit That Survives a Job Site' },
        {
          kind: 'paragraph',
          text: [
            'A quote habit that survives a job site has two working parts: a way to capture the request the moment it lands, and a way to answer it before the caller gives up and calls someone else. Most one-van shops already carry a phone in a pocket. What they are usually missing is a second channel that keeps working while that phone is covered in grease or thirty feet up a ladder.',
          ],
        },
        {
          kind: 'list',
          items: [
            ['Turn on text notifications for missed calls, so a reply can go out from the truck.'],
            ['Answer with a price range on the spot when the job is simple enough to quote by ear.'],
            ['Put a quote request form where a customer can use it without dialing anyone at all.'],
          ],
        },
        {
          kind: 'paragraph',
          text: [
            "A quote request form does the version of this a phone call cannot: it keeps working after hours, and it lets a customer describe a problem in their own words instead of explaining it over a bad signal. On a roofer's sample site, ",
            {
              text: 'a customer intake form',
              href: '/demos/bighorn-roofing',
              title: 'Sample LeoPixels demo build for a Denver roofing business',
            },
            ' built for hail damage collects the details of a job before anyone has to pick up a phone.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Where the Website Carries the Rest of the Job' },
        {
          kind: 'paragraph',
          text: [
            'The website is the one channel that answers a job request the same way at 2am as it does at noon. A quote form on the site takes the same job description a phone call would, then leaves the owner a message to answer on their own time instead of a phone ringing mid-job.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'A flat $149 a month for hosting and upkeep is a small bet against the cost of one missed lead in a market where the first reply usually wins. Getting that page live does not have to be slow. A flat-rate build produces a working demo within 48 hours regardless of the trade, and ',
            {
              text: "the build's own timeline",
              href: '/how-it-works',
              title: 'LeoPixels page explaining the build and demo timeline',
            },
            ' lays out what happens between that first request and a form going live, so the habit can start before the next missed call rather than months after it.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Once a business is also running paid leads, comparing ',
            {
              text: 'what those ads cost',
              href: '/blog/local-services-ads-cost-vs-website',
              title: 'LeoPixels post comparing Local Services Ads cost to a website',
            },
            ' against a flat monthly fee is a separate question from how fast either one gets answered. A page waiting at the end of a Local Services Ad still needs the same quote habit, since a missed message costs exactly as much whether the lead was free or paid for.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'The same logic applies to the phone number sitting next to that form: a fast quote habit built on top of a number a thumb cannot find is effort wasted, and that comes down to ',
            {
              text: 'how a number is placed',
              href: '/blog/phone-number-placement-trades-website',
              title: 'LeoPixels post on placing a tappable phone number on a trades site',
            },
            ' on the page.',
          ],
        },

        {
          kind: 'faq',
          heading: 'Questions About Quoting Speed on the Job',
          intro: [
            'Every answer here assumes the job itself is simple enough to price without a site visit. What changes is only how fast that price reaches the customer.',
          ],
          items: [
            {
              question: 'Does a text back count as answering the lead, or does it need to be a full quote?',
              answer: [
                'A text back counts as an answer, and it often works better than a full quote sent blind. Confirming that the message arrived and naming a callback window keeps the customer from calling the next number while the owner finishes the job in front of them.',
              ],
            },
            {
              question: 'What if the job is too big to quote without seeing it first?',
              answer: [
                'Say so right away instead of staying quiet until an inspection can be scheduled. A same-day or next-day inspection time, given within minutes of the request, does the same job a fast quote does: it tells the customer someone is already handling this.',
              ],
            },
            {
              question: 'Does answering fast still matter if the shop is booked for two weeks?',
              answer: [
                'Yes, because the answer itself is the value, not only a slot on the calendar. A customer told honestly that the next opening is two weeks out, within minutes of asking, usually waits. One who hears nothing for a day books somebody else instead.',
              ],
            },
            {
              question: 'Should a price be quoted over the phone or only after seeing the job in person?',
              answer: [
                'A price range over the phone works for jobs with a known scope, a water heater swap or a breaker replacement. Anything that depends on what is behind a wall needs a look first, and the honest answer is an inspection time, not a guessed number.',
              ],
            },
          ],
        },

        {
          kind: 'paragraph',
          text: [
            'The fastest fix costs nothing to try this week: turn on notifications for missed calls and text back within the hour, every time, for seven days. Whatever that does to how many of those callers book the job is the number worth watching, more than any national average.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'From there the harder question is which channel should carry the load permanently, a person checking a phone constantly or a page built to take the request the moment it arrives. A site that captures a job in the middle of the night, with nobody awake to answer it, is the one still worth having when the phone eventually goes to voicemail anyway.',
          ],
        },
      ],
    },

    /* ────────────────────────────  Macedonian  ─────────────────────────── */
    mk: {
      title: 'Колку брзо треба да понудите цена пред муштеријата да оди кај друг',
      description:
        'Истражувањето зад тоа колку брзо треба да излезе понудата за работа, зошто фирма со едно возило прва го чувствува тоа, и како порака или формулар го задржуваат барањето активно.',

      intro: [
        [
          'Барањето за работа изладнува за часови, не за денови. Национално истражување на повеќе од милион продажни контакти покажа дека бизнис што ќе стапи во контакт со нов клиент во рок од еден час е речиси седум пати поверојатно да оствари вистински разговор со него отколку бизнис што чекал уште еден час, и над шеесет пати поверојатно отколку оној што чекал цел ден. Занаетчиската работа функционира исто: муштеријата со расипан бојлер обично се јавува на уште два-три броја истото попладне, а оној што прв понуди цена ја поставува цената со која се мерат сите останати понуди.',
        ],
        [
          'Повеќето фирми со едно возило ги губат овие работи на навика, не на вештина. Сопственикот е под мијалник или горе на скала кога ќе дојде повикот, говорната пошта се преполнува, а повратниот повик се случува навечер откако муштеријата веќе ангажирала некој друг. Решението е навика, не вработување: одговор со порака за неколку минути, или формулар за понуда што ја движи работата напред без некој да мора да го крене телефонот.',
        ],
      ],

      body: [
        {
          kind: 'keyFacts',
          items: [
            'Одговор за еден час: околу 7 пати поголема шанса за клиент',
            'Чекање цел ден: над 60 пати помала шанса за врска',
            'Проценето време на одговор кај Local Services Ads: минути до еден ден',
            'Стапка на самовработени во градежништвото: 14.8%',
          ],
        },

        { kind: 'heading', level: 2, text: 'Што значи доволно брз одговор' },
        {
          kind: 'paragraph',
          text: [
            'Брз одговор ја стигнува муштеријата пред нејзиното внимание да премине на следното име од списокот. Во пракса тоа значи минути, не часови. Сопствената служба Local Services Ads на Google ова очекување го прави видливо: штом бизнисот прими два или повеќе контакти преку порака во последните 90 дена, огласот прикажува ',
            {
              text: 'проценето време на одговор',
              href: 'https://support.google.com/localservices/answer/6224859?hl=en',
              title: 'Страница на Google Local Services Ads за времето на одговор и рангирањето',
            },
            ' некаде помеѓу неколку минути и еден ден.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Кај повеќето домашни занаети тоа се случува во текот на едно попладне. Домаќин без топла вода се јавува на три-четири огласи од едно пребарување, по редот на прикажување, а првиот што каже нешто конкретно, ценовен опсег, временски рок, план, обично ја добива работата. Молчење дури и дваесет минути изгледа како фирма што не внимава.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Тој број го следи бизнисот, не останува приватен. Бавен просек го намалува пласманот на огласот во аукцијата, а брз просек станува видлива причина муштеријата да избере еден водоводџија наместо следниот на листата.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Зошто чекањето чини повеќе отколку што изгледа' },
        {
          kind: 'paragraph',
          text: [
            'Еден час доцнење не е мала работа. Истражувачите испратиле идентичен тест-контакт до ',
            {
              text: '2 241 американски компании',
              href: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads',
              title: 'Истражување на Harvard Business Review за времето на одговор на компаниите',
            },
            ' и следеле што се случило понатаму: 37 отсто одговориле во рок од еден час, 23 отсто воопшто не одговориле, а фирмите што на крајот одговориле им требале 42 часа во просек.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Оној што прв одговара обично ја добива работата на пазар каде се натпреваруваат два или три занаетчии за иста поправка, без разлика кој би ја завршил подобро. Фирма со едно возило не се натпреварува со секој водоводџија во градот истовремено. Доволно е да одговори пред половината фирми што сепак се јавуваат подоцна.',
          ],
        },

        {
          kind: 'heading',
          level: 2,
          text: 'Дали фирма со едно возило е поизложена на ова од поголема компанија?',
        },
        {
          kind: 'paragraph',
          text: [
            'Да, бидејќи лицето што го крева телефонот обично е и лицето што ја работи работата. Градежништвото и занаетите на отворено имаат највисока стапка на самовработување што ја следи ',
            {
              text: 'Bureau of Labor Statistics',
              href: 'https://www.bls.gov/spotlight/2016/self-employment-in-the-united-states/home.htm',
              title: 'Извештај на BLS за стапките на самовработување по занимања во САД',
            },
            ' низ сите занимања, 14.8 отсто, а повеќето од тие самовработени немаат платени вработени воопшто.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Таа разлика е структурна, не е прашање на дисциплина. Едно лице не може истовремено да зборува на телефон и да биде горе на кров, а решението мора да работи со таа реалност наместо да ја игнорира.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Тоа значи и дека решението не смее да зависи од вработување некого. Диспечер е реален трошок за фирма што веќе работи со едно возило и еден пар раце, па одговорот мора да биде нешто што сопственикот може да го направи од каде и да се наоѓа, а не нова позиција на платниот список.',
          ],
        },

        {
          kind: 'heading',
          level: 2,
          text: 'Како изгледа навика за брза понуда што опстојува на градилиште',
        },
        {
          kind: 'paragraph',
          text: [
            'Навика за брза понуда што опстојува на градилиште има два дела: начин да се фати барањето веднаш штом пристигне, и начин да се одговори пред муштеријата да се откаже и да се јави на друг. Повеќето фирми со едно возило веќе носат телефон во џеб. Она што најчесто им недостасува е втор канал што продолжува да работи додека тој телефон е валкан од маст или триесет метри горе на скала.',
          ],
        },
        {
          kind: 'list',
          items: [
            ['Вклучете известувања за пропуштени повици, за да можете да одговорите од камионот.'],
            ['Одговорете со ценовен опсег веднаш кога работата е доволно едноставна за проценка по слух.'],
            ['Поставете формулар за барање понуда каде муштеријата може да го користи без да се јавува воопшто.'],
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Формулар за барање понуда прави нешто што телефонскиот повик не може: продолжува да работи и надвор од работно време, и ѝ дозволува на муштеријата да го опише проблемот со свои зборови наместо преку слаб сигнал. На демо-страница за кровопокривач, ',
            {
              text: 'формулар за прием на барања',
              href: '/demos/bighorn-roofing',
              title: 'Демо изработка на LeoPixels за кровопокривачки бизнис во Денвер',
            },
            ' изграден за штети од град ги собира деталите на работата пред некој воопшто да мора да крене телефон.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Каде сајтот ја презема остатокот од работата' },
        {
          kind: 'paragraph',
          text: [
            'Сајтот е единствениот канал што одговара на барање за работа исто и во два по полноќ и на пладне. Формулар на сајтот ги собира истите детали за работата што би ги собрал телефонски повик, а потоа му остава на сопственикот порака да одговори кога ќе стигне, наместо телефон што ѕвони среде работа.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Фиксни 149 долари месечно за хостинг и одржување се мал облог наспроти цената на еден пропуштен контакт на пазар каде првиот одговор обично победува. Пуштањето на таа страница не мора да биде бавно. Изработка со фиксна цена дава работно демо во рок од 48 часа без разлика на занаетот, а ',
            {
              text: 'самата временска рамка на изработка',
              href: '/how-it-works',
              title: 'Страница на LeoPixels што го објаснува процесот на изработка и демото',
            },
            ' покажува што се случува меѓу првото барање и објавувањето на формуларот, така што навиката може да почне пред следниот пропуштен повик, а не месеци подоцна.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Штом бизнисот работи и платени контакти, споредбата на ',
            {
              text: 'колку чинат тие реклами',
              href: '/blog/local-services-ads-cost-vs-website',
              title: 'Текст на LeoPixels што ја споредува цената на Local Services Ads со сајт',
            },
            ' со фиксна месечна такса е одделно прашање од тоа колку брзо се одговара на секој. Страница на крајот на Local Services Ads сепак бара иста навика за брз одговор, бидејќи пропуштена порака чини исто без разлика дали контактот бил бесплатен или платен.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Истата логика важи и за телефонскиот број покрај тој формулар: навика за брз одговор изградена над број што палецот не може да го најде е потрошен труд, а тоа зависи од ',
            {
              text: 'каде е поставен бројот',
              href: '/blog/phone-number-placement-trades-website',
              title: 'Текст на LeoPixels за поставувањето на телефонскиот број на занаетчиски сајт',
            },
            ' на страницата.',
          ],
        },

        {
          kind: 'faq',
          heading: 'Прашања за брзината на понудите на теренот',
          intro: [
            'Секој одговор подолу претпоставува дека работата сама по себе е доволно едноставна за да се цени без посета на теренот. Она што се менува е само колку брзо таа цена стигнува до муштеријата.',
          ],
          items: [
            {
              question: 'Дали одговор со порака се смета за одговор на барањето, или мора да биде целосна понуда?',
              answer: [
                'Одговор со порака се смета за контакт, и често дејствува подобро од целосна понуда испратена наслепо. Потврдата дека пораката пристигнала и наведувањето рок за повратен повик ја спречува муштеријата да се јави на следниот број додека сопственикот ја завршува работата пред себе.',
              ],
            },
            {
              question: 'Што ако работата е преголема за да се процени без да се види прво?',
              answer: [
                'Кажете го тоа веднаш наместо да молчите додека не се закаже преглед. Термин за преглед истиот или следниот ден, даден за неколку минути од барањето, ја врши истата работа како брза понуда: ѝ кажува на муштеријата дека некој веќе се занимава со тоа.',
              ],
            },
            {
              question: 'Дали брзиот одговор сепак е важен ако фирмата е зафатена две недели однапред?',
              answer: [
                'Да, бидејќи самиот одговор е вредноста, не само термин во распоредот. Муштерија искрено известена дека следниот термин е за две недели, во рок од неколку минути откако прашала, обично чека. Онаа што не слушнала ништо цел ден се јавува на некој друг.',
              ],
            },
            {
              question: 'Дали цената треба да се даде преку телефон или дури откако работата ќе се види лично?',
              answer: [
                'Ценовен опсег преку телефон работи за работи со познат обем, замена на бојлер или на автоматски осигурувач. Сè што зависи од она што е зад ѕидот бара преглед прво, а искрениот одговор е термин за преглед, не погодена бројка.',
              ],
            },
          ],
        },

        {
          kind: 'paragraph',
          text: [
            'Најбрзото решение не чини ништо да се проба оваа недела: вклучете известувања за пропуштени повици и одговарајте со порака во рок од еден час, секој пат, седум дена. Она што тоа ќе го направи со бројот на клиенти што навистина ја резервираат работата е бројката вредна следење, повеќе од секој национален просек.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Оттука потешкото прашање е кој канал треба трајно да го носи товарот: лице што постојано го проверува телефонот, или страница изградена да го прими барањето во моментот кога ќе пристигне. Сајт што фаќа работа среде ноќ, кога никој не е буден да одговори, е оној што сепак вреди да се има кога телефонот на крајот ќе оди на говорна пошта.',
          ],
        },
      ],
    },
  },
});
