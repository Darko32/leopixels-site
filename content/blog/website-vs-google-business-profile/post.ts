import { defineBlogPost } from '../_schema';

export const websiteVsGoogleBusinessProfile = defineBlogPost({
  slug: 'website-vs-google-business-profile',
  publishedAt: '2026-08-17T09:00:00Z',
  format: 'comparison',
  tags: ['google business profile', 'local search', 'trades websites'],

  content: {
    /* ─────────────────────────────  English  ───────────────────────────── */
    en: {
      title: 'Do You Need a Website If You Already Have a Google Business Profile?',
      metaTitle:
        'Do You Need a Website With a Google Business Profile? A Guide for Trades Owners',
      description:
        'A complete profile gets you into the map results. Here is where it runs out of room, what Google says your ranking depends on, and when a site is worth paying for.',

      intro: [
        [
          'A complete Google Business Profile gets you into the map results, and for plenty of trades businesses that is enough to keep the phone ringing. If you work a tight service area, hold steady reviews and only need local jobs, a profile on its own can carry you. It stops being enough at three points: when you want to be found for the specific work you do rather than your category, when your coverage is wider than a profile can describe, and when someone is checking that you are real before they dial. Google ties part of your profile\'s visibility to signals that sit outside the profile. A site is where those signals, and those details, have somewhere to live.',
        ],
        [
          'The two do different jobs, and the split is easy to get wrong in both directions. A profile is a listing Google owns, formats and can change without asking you. Paying for a site you did not need wastes money, and skipping one you did costs jobs you never hear about.',
        ],
      ],

      body: [
        {
          kind: 'keyFacts',
          items: [
            'Local ranking factors: relevance, distance, prominence',
            'Maximum service areas on one profile: 20',
            'Service area boundary: about 2 hours of driving time',
            'Paid local ranking: not available',
          ],
        },

        { kind: 'heading', level: 2, text: 'What a Google Business Profile Already Does Well' },
        {
          kind: 'paragraph',
          text: [
            'A verified profile puts you in the map results, shows your hours, your phone number and the area you cover, and collects the reviews that feed your ranking. More reviews and better ratings help you rank locally. For a business that works one town and gets called for the same three jobs, that covers most of what a customer needs before dialling.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'It also costs nothing and takes an afternoon, which is why it is the first thing worth fixing. Your primary category decides which searches you are eligible for at all, so a drain specialist listed under a generic category is capped before anything else is wrong. Hours, service area and category are free to correct today.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Where the Profile Runs Out of Room' },
        {
          kind: 'paragraph',
          text: [
            'A profile is a fixed set of fields. Google allows ',
            {
              text: 'up to 20 service areas',
              href: 'https://support.google.com/business/answer/9157481?hl=en',
              title: 'Google Business Profile Help on managing service areas for service-area businesses',
            },
            ' on one profile, and asks that the whole area stay within about two hours of driving time from where you are based. If you never serve customers at your own address, that address comes off the profile entirely. Those are the walls of the box.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Twenty areas sounds generous until you count. A roofer working storm damage across three counties runs out of slots before running out of towns, and the two hour boundary decides the rest. The profile has no way to say which of those towns you reach the same day and which take a week.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Inside the box there is no room to answer a question either. Someone comparing two plumbers with the same star rating is looking for the things a listing has nowhere to put:',
          ],
        },
        {
          kind: 'list',
          items: [
            ['What a job costs, or how you arrive at the number'],
            ['What happens on a first visit, and who turns up'],
            ['The work you will not take, and the brands you will not fit'],
            ['Anything specific enough that it names a job rather than a trade'],
          ],
        },

        { kind: 'heading', level: 2, text: 'Why Your Ranking Depends on Things Outside the Profile' },
        {
          kind: 'paragraph',
          text: [
            'Local results turn on three things: relevance, distance and prominence. Distance you cannot change. Relevance follows your categories. Google names how many websites link to your business, alongside how many reviews you have, among ',
            {
              text: 'the signals behind prominence',
              href: 'https://support.google.com/business/answer/7091?hl=en',
              title: 'Google Business Profile Help on how relevance, distance and prominence set local rankings',
            },
            '.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'That last part is the one owners miss. A link from a supplier, a trade association, a manufacturer\'s dealer locator or the local paper all count toward the same signal, and every one of them needs somewhere to point. Without a site of your own they point at a Google listing, or they do not get made at all.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Reviews sit on the same axis and are easier to move. They are the one prominence signal you can ask for directly, by text, on the day the job finishes.',
          ],
        },

        { kind: 'heading', level: 2, text: 'What Does a Site Do That a Profile Cannot?' },
        {
          kind: 'paragraph',
          text: [
            'It answers the search that names a job rather than a trade, and it decides what the first screen looks like. A listing shows a customer your rating and your distance. A page shows them whether you have done their exact job before, and puts the phone number wherever you want it.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'For emergency trades that first screen is the whole job. Someone standing in a flooding basement at two in the morning is not reading. An ',
            {
              text: 'emergency plumber\'s page',
              href: '/demos/redline-plumbing',
              title: 'Sample build for an emergency plumbing business in Columbus, Ohio',
            },
            ' that loads with the number tappable before anything else does the one thing that moment needs. A listing can show the number too, but only after the customer has picked you out of three.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'There is a quieter benefit. Google names verifying ownership in Search Console as the first step in establishing your site as ',
            {
              text: 'an official presence',
              href: 'https://developers.google.com/search/docs/appearance/establish-business-details',
              title: 'Google Search Central documentation on establishing business details and site ownership',
            },
            ', which is a standing a listing on its own does not give you. Working ',
            {
              text: 'examples across the trades',
              href: '/demos',
              title: 'Sample one-page websites built for plumbing, HVAC, electrical and roofing businesses',
            },
            ' show what that page tends to look like when it is doing its job.',
          ],
        },

        { kind: 'heading', level: 2, text: 'When a Profile on Its Own Is Enough' },
        {
          kind: 'paragraph',
          text: [
            'Some businesses genuinely do not need a site yet. If you work one town, you are booked from reviews and referrals, you take every job in a single category, and you are not trying to grow, a well kept profile is doing the work. Spending on a page in that position buys you very little.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'The signal that it has stopped being enough is specific rather than a feeling. You start losing quotes to businesses with the same star rating. Callers ask the same three questions you have answered a hundred times. Or the work you want next sits in a category your profile is not eligible for. Before any of that shows up, the order is worth keeping simple:',
          ],
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            ['Set the primary category to the work that pays, then add the secondaries.'],
            ['Cut the service areas back to the towns you actually reach, and drop the rest.'],
            ['Ask the last twenty customers for a review, by text, the day you finish.'],
          ],
        },

        {
          kind: 'faq',
          heading: 'Questions Owners Ask Before Paying for a Site',
          intro: [
            'Each answer below assumes a claimed and verified profile is already in place. Everything here is free to check before any money moves.',
          ],
          items: [
            {
              question: 'Will a website make my Google Business Profile rank higher?',
              answer: [
                'Not on its own, and not immediately. Links from other websites feed prominence, and a site gives those links somewhere to point, so the effect arrives through other people linking to you rather than from the page existing. For most small trades businesses, reviews move local ranking faster than a new site does.',
              ],
            },
            {
              question: 'Can I pay Google to fix a bad local ranking?',
              answer: [
                'No. Google states plainly that no one can request or pay for a better local ranking. The paid slots that sit above the map results are ads, they are labelled as ads, and they stop the day the budget stops. The three organic results underneath are unaffected by what you spend.',
              ],
            },
            {
              question: 'How many service areas should I actually list?',
              answer: [
                'Only the towns you will genuinely drive to. Twenty is the ceiling, not a target, and filling the list with places you would turn down spreads the profile across an area you cannot serve. A tight, honest list describes a real business, which is what the profile is meant to do.',
              ],
            },
            {
              question: 'I already have a site nobody visits. Is that the same problem?',
              answer: [
                'It is a different one. Open it on your phone, on mobile data, away from the shop. If it loads slowly, hides the number, or says nothing your listing does not already say, the page is not failing to attract people so much as failing the ones who arrive.',
              ],
            },
          ],
        },

        {
          kind: 'paragraph',
          text: [
            'Open your own profile on a phone, logged out, standing somewhere in the middle of the area you cover. Whatever loads is what a customer gets, and it is the only test worth running before any money moves.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'If that screen already answers the question the caller has, the profile is doing its job and the money belongs elsewhere. If it leaves them holding a star rating with no way to tell you apart from the next three results, that gap is what a page is for, and it is worth pricing before the next busy season starts.',
          ],
        },
      ],
    },

    /* ────────────────────────────  Macedonian  ─────────────────────────── */
    mk: {
      title: 'Дали ви треба сајт ако веќе имате Google Business Profile?',
      metaTitle:
        'Дали ви треба сајт ако имате Google Business Profile? Водич за занаетчиски фирми',
      description:
        'Комплетен профил ве внесува во резултатите на картата. Еве каде застанува, од што зависи рангирањето според Google, и кога сајтот вреди да се плати.',

      intro: [
        [
          'Комплетен Google Business Profile ве внесува во резултатите на картата, а за многу занаетчиски фирми тоа е доволно телефонот да ѕвони. Ако работите на мало подрачје, имате редовни оценки и ви требаат само локални работи, профилот сам може да ве држи. Престанува да биде доволен на три места: кога сакате да ве најдат по конкретната работа што ја вршите наместо по категорија, кога покривате поширок терен отколку што профилот може да опише, и кога некој проверува дали сте вистински пред да се јави. Google дел од видливоста на профилот ја врзува за сигнали што стојат надвор од него. Сајтот е местото каде тие сигнали и тие детали имаат каде да стојат.',
        ],
        [
          'Двете вршат различна работа, а поделбата лесно се промашува во двете насоки. Профилот е оглас што Google го поседува, го форматира и може да го смени без да ве праша. Плаќање за сајт што не ви требал фрла пари, а прескокнување на сајт што ви требал ве чини работи за кои никогаш не дознавате.',
        ],
      ],

      body: [
        {
          kind: 'keyFacts',
          items: [
            'Фактори за локално рангирање: релевантност, оддалеченост, препознатливост',
            'Максимум подрачја на работа на еден профил: 20',
            'Граница на подрачјето: околу 2 часа возење',
            'Платено локално рангирање: не постои',
          ],
        },

        { kind: 'heading', level: 2, text: 'Што профилот веќе го прави добро' },
        {
          kind: 'paragraph',
          text: [
            'Потврден профил ве става во резултатите на картата, го покажува работното време, телефонот и подрачјето што го покривате, и ги собира оценките што го хранат рангирањето. Повеќе оценки и подобри рејтинзи помагаат да се рангирате локално. За фирма што работи во еден град и ја викаат за истите три работи, тоа покрива речиси сè што му треба на муштеријата пред да се јави.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Освен тоа не чини ништо и се средува за едно попладне, па затоа е првото нешто што вреди да се поправи. Примарната категорија одлучува за кои пребарувања воопшто влегувате во игра, па мајстор за одблокирање канализација заведен под општа категорија е ограничен пред што било друго да тргне наопаку. Работното време, подрачјето и категоријата се бесплатни за поправка денес.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Каде на профилот му снемува место' },
        {
          kind: 'paragraph',
          text: [
            'Профилот е фиксен сет полиња. Google дозволува ',
            {
              text: 'до 20 подрачја на работа',
              href: 'https://support.google.com/business/answer/9157481?hl=en',
              title: 'Помош за Google Business Profile за подрачја на работа кај теренски бизниси',
            },
            ' на еден профил и бара целото подрачје да остане во рамки од околу два часа возење од местото каде сте базирани. Ако никогаш не примате муштерии на сопствената адреса, таа адреса воопшто се тргнува од профилот. Тоа се ѕидовите на кутијата.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Дваесет подрачја звучат многу додека не почнете да броите. Кровопокривач што работи штети од невреме низ три околии останува без места пред да остане без градови, а границата од два часа го решава остатокот. Профилот нема како да каже до кој од тие градови стигнувате истиот ден, а за кој ви треба недела.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Во таа кутија нема место ниту за одговор на прашање. Некој што споредува двајца водоводџии со ист број ѕвездички ги бара работите за кои огласот нема каде да ги стави:',
          ],
        },
        {
          kind: 'list',
          items: [
            ['Колку чини работата и како доаѓате до таа бројка'],
            ['Што се случува при првата посета и кој доаѓа'],
            ['Работата што не ја примате и марките што не ги монтирате'],
            ['Сè што е доволно конкретно за да именува работа, а не занает'],
          ],
        },

        { kind: 'heading', level: 2, text: 'Зошто рангирањето зависи од работи надвор од профилот' },
        {
          kind: 'paragraph',
          text: [
            'Локалните резултати се вртат околу три работи: релевантност, оддалеченост и препознатливост. Оддалеченоста не можете да ја смените. Релевантноста оди по категориите. Google го наведува бројот на сајтови што водат кон вашиот бизнис, заедно со бројот на оценки, меѓу ',
            {
              text: 'сигналите зад препознатливоста',
              href: 'https://support.google.com/business/answer/7091?hl=en',
              title: 'Помош за Google Business Profile за релевантност, оддалеченост и препознатливост',
            },
            '.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Токму тој дел најчесто им бега на сопствениците. Врска од добавувач, од струковно здружение, од листата на овластени монтери кај производител или од локалниот весник, сите одат во истиот сигнал, а на секоја од нив ѝ треба каде да покажува. Без свој сајт покажуваат кон оглас на Google, или воопшто не се ни направени.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Оценките стојат на истата оска и полесно се движат. Тие се единствениот сигнал за препознатливост што можете директно да го побарате, со порака, на денот кога завршува работата.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Што прави сајтот што профилот не може?' },
        {
          kind: 'paragraph',
          text: [
            'Одговара на пребарување што именува работа, а не занает, и одлучува како изгледа првиот екран. Огласот на муштеријата ѝ ги покажува вашиот рејтинг и оддалеченоста. Страницата ѝ покажува дали сте ја работеле токму нејзината работа порано, и го става телефонот таму каде што сакате.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Кај итните занаети тој прв екран е целата работа. Човек што стои во поплавен подрум во два наутро не чита. Една ',
            {
              text: 'страница за итен водоводџија',
              href: '/demos/redline-plumbing',
              title: 'Демо изработка за водоводен бизнис за итни случаи во Колумбус, Охајо',
            },
            ' што се отвора со телефонот подготвен за допир пред сè друго го прави токму она што му треба на тој момент. И огласот може да го покаже бројот, но дури откако муштеријата ќе ве избере меѓу тројца.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Има и потивка придобивка. Google потврдувањето сопственост во Search Console го наведува како прв чекор во воспоставувањето на ',
            {
              text: 'сајтот како официјално присуство',
              href: 'https://developers.google.com/search/docs/appearance/establish-business-details',
              title: 'Документација на Google Search Central за податоците за бизнисот и сопственоста на сајтот',
            },
            ', а тоа е положба што огласот сам по себе не ви ја дава. Работни ',
            {
              text: 'примери од повеќе занаети',
              href: '/demos',
              title: 'Демо едностранични сајтови за водовод, климатизација, електрика и кровопокривање',
            },
            ' покажуваат како изгледа таквата страница кога си ја врши работата.',
          ],
        },

        { kind: 'heading', level: 2, text: 'Кога профилот сам е доволен' },
        {
          kind: 'paragraph',
          text: [
            'Некои фирми навистина сè уште немаат потреба од сајт. Ако работите во еден град, полни сте од оценки и препораки, ја примате секоја работа во една категорија и не барате раст, уреден профил ја врши работата. Трошење за страница во таква положба ви носи многу малку.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Знакот дека профилот престанал да биде доволен е конкретен, а не чувство. Почнувате да губите понуди од фирми со ист рејтинг. Муштериите ви ги поставуваат истите три прашања што сте ги одговориле сто пати. Или работата што ја сакате следна спаѓа во категорија за која профилот не е подобен. Пред да се појави нешто од тоа, редоследот вреди да се држи едноставен:',
          ],
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            ['Ставете ја примарната категорија на работата што носи пари, па додајте споредни.'],
            ['Скратете ги подрачјата на градовите до кои навистина стигнувате, а останатите тргнете ги.'],
            ['Побарајте оценка од последните дваесет муштерии, со порака, на денот кога завршувате.'],
          ],
        },

        {
          kind: 'faq',
          heading: 'Прашања што сопствениците ги поставуваат пред да платат за сајт',
          intro: [
            'Секој одговор подолу претпоставува дека веќе имате преземен и потврден профил. Сето ова е бесплатно за проверка пред да тргнат пари.',
          ],
          items: [
            {
              question: 'Дали сајтот ќе го подигне рангирањето на профилот?',
              answer: [
                'Не сам по себе и не веднаш. Врските од други сајтови ја хранат препознатливоста, а сајтот им дава каде да покажуваат, па ефектот доаѓа преку тоа што други водат кон вас, а не од самото постоење на страницата. Кај повеќето мали фирми оценките го движат локалното рангирање побрзо од нов сајт.',
              ],
            },
            {
              question: 'Може ли да му платам на Google да поправи слабо рангирање?',
              answer: [
                'Не. Google јасно кажува дека никој не може да побара или да плати за подобро локално рангирање. Платените места над резултатите на картата се реклами, означени се како реклами и застануваат на денот кога застанува буџетот. Трите органски резултати под нив не зависат од потрошеното.',
              ],
            },
            {
              question: 'Колку подрачја на работа да наведам навистина?',
              answer: [
                'Само градовите до кои навистина ќе возите. Дваесет е таванот, не целта, а полнење на листата со места што би ги одбиле го растегнува профилот низ терен што не го покривате. Кратка и искрена листа опишува вистинска фирма, а тоа е и целта на профилот.',
              ],
            },
            {
              question: 'Веќе имам сајт што никој не го гледа. Дали е тоа истиот проблем?',
              answer: [
                'Тоа е друг проблем. Отворете го на телефон, на мобилен интернет, подалеку од работилницата. Ако се вчитува бавно, го крие бројот или не кажува ништо што огласот веќе не го кажува, страницата не потфрла во привлекувањето толку колку кај оние што веќе стигнале до неа.',
              ],
            },
          ],
        },

        {
          kind: 'paragraph',
          text: [
            'Отворете го сопствениот профил на телефон, одјавени, застанати некаде на средината од подрачјето што го покривате. Тоа што ќе се вчита е она што го добива муштеријата, и тоа е единствената проверка што вреди пред да тргнат пари.',
          ],
        },
        {
          kind: 'paragraph',
          text: [
            'Ако тој екран веќе одговара на прашањето што го има оној што се јавува, профилот си ја врши работата и парите припаѓаат на друго место. Ако го остава со рејтинг во раце и без начин да ве разликува од следните тројца, таа празнина е она за што служи страницата, и вреди да ѝ се земе цена пред да почне следната сезона.',
          ],
        },
      ],
    },
  },
});
