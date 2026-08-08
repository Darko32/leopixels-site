import { defineDemo } from '../_schema';

/**
 * Redline Plumbing & Drain is a FICTIONAL business used to demonstrate the
 * LeoPixels trades template. The phone number is in the 555-01xx range reserved
 * for fictional use. It must never be presented as a real client.
 */
export const redlinePlumbing = defineDemo({
  slug: 'redline-plumbing',

  meta: {
    business: 'Redline Plumbing & Drain',
    trade: 'plumbing',
    city: 'Columbus',
    state: 'OH',
    isFictional: true,
    featured: true,
    siteLocale: 'en',

    tagline: {
      en: 'A 3am burst pipe, answered in one tap.',
      mk: 'Пукната цевка во три наутро, решена со еден допир.',
    },

    brief: {
      en: `Most emergency plumbers lose the job before the phone ever rings. Someone stands in a flooding basement at two in the morning, searches on their phone, and calls whoever makes it easiest — which is almost never the company with no website, or the one whose site takes eight seconds to load and hides the phone number three scrolls down.

This build is the answer to that specific moment. The phone number is the largest element on the screen the instant the page opens, it is tappable, and it repeats in the header, the hero, the emergency bar, the quote form and the footer. Nothing on the page asks the visitor to think. A pulsing 24/7 emergency bar sits directly beneath the hero because for emergency trades it is consistently the highest-converting element on the page.

Below the fold the page does the slower work of earning trust. Six named services — not generic categories, the actual jobs Redline performs. Four differentiators drawn from the themes that recur in a plumber's reviews: they answer at 3am, the price is fixed before work starts, they leave the house clean, and the same small crew turns up every time. Then the service area, listing eight named Columbus neighbourhoods, which is the single most underused local-SEO asset on trades websites and the reason a search for a suburb by name can surface this business at all.

The quote form is four fields. Every field beyond four costs conversions, so there are no extras — name, phone, what they need, and an optional sentence about the problem.

Structurally the page carries everything Google needs and nothing it does not: one H1 naming the service and the city, Plumber schema with geography, opening hours and a service catalogue, and a deliberately omitted aggregate rating, because a hand-typed star rating is a penalty risk rather than a shortcut. It is a single HTML file with inline CSS, no external fonts and no frameworks, which is why it loads the way it does.`,

      mk: `Повеќето водоинсталатери за итни случаи ја губат работата уште пред телефонот да заѕвони. Некој стои во поплавен подрум во два наутро, пребарува на телефон и се јавува кај оној кај кого тоа е најлесно — а тоа речиси никогаш не е фирмата без сајт, ниту онаа чијшто сајт се вчитува осум секунди и го крие бројот три екрани подолу.

Оваа изработка е одговор токму на тој момент. Телефонскиот број е најголемото нешто на екранот штом ќе се отвори страницата, се јавува со еден допир и се повторува во заглавјето, воводот, лентата за итни случаи, формуларот и подножјето. Ништо на страницата не бара од посетителот да размислува. Лентата за итни случаи 24/7 стои веднаш под воводот, бидејќи кај итните занаети таа редовно е најубедливиот елемент на целата страница.

Под тоа страницата ја врши побавната работа — гради доверба. Шест именувани услуги, не општи категории, туку вистинските работи што Redline ги врши. Четири причини извлечени од темите што постојано се повторуваат во оценките на еден водоинсталатер: се јавуваат во три наутро, цената е договорена пред да почне работата, куќата ја оставаат чиста и секогаш доаѓа истата мала екипа. Потоа следи подрачјето на работа, со осум именувани населби во Колумбус — најмалку искористениот локален SEO адут, и причината зошто пребарување по име на предградие воопшто може да ја покаже оваа фирма.

Формуларот за понуда има четири полиња. Секое поле над четири носи по некое барање помалку, затоа ги нема — име, телефон, што им треба и една реченица по желба.

Структурно, страницата го носи сето она што му треба на Google и ништо повеќе: еден H1 со услугата и градот, Plumber шема со локација, работно време и каталог на услуги, и намерно изоставена просечна оценка, бидејќи рачно впишани ѕвездички се ризик за казна, а не пречка. Тоа е една HTML датотека со вграден CSS, без надворешни фонтови и без фрејмворци — и токму затоа се вчитува вака.`,
    },

    highlights: [
      {
        en: 'Tap-to-call phone as the largest element on every mobile screen',
        mk: 'Телефон на еден допир, најголемиот елемент на секој мобилен екран',
      },
      {
        en: 'Pulsing 24/7 emergency bar directly beneath the hero',
        mk: 'Пулсирачка лента за итни случаи 24/7 веднаш под воводот',
      },
      {
        en: 'Eight named service-area neighbourhoods for local search',
        mk: 'Осум именувани населби во подрачјето на работа, за локално пребарување',
      },
      {
        en: 'Four-field quote form with a honeypot spam trap',
        mk: 'Формулар со четири полиња и скриена стапица за спам',
      },
      {
        en: 'Plumber JSON-LD with geo, hours and a service catalogue',
        mk: 'Plumber JSON-LD со локација, работно време и каталог на услуги',
      },
      {
        en: 'Single file, inline CSS, system fonts — no external requests',
        mk: 'Една датотека, вграден CSS, системски фонтови — без надворешни барања',
      },
    ],

    // Only what has actually been measured. pagespeed and lcp stay undefined
    // until a real PageSpeed run against the deployed URL.
    metrics: {
      weight: '54 KB',
      buildTime: 'Under 90 minutes',
    },

    screenshots: {
      desktop: '/demos/redline-plumbing/desktop.webp',
      mobile: '/demos/redline-plumbing/mobile.webp',
      alt: {
        en: 'The Redline Plumbing demo homepage, showing the tap-to-call header, the emergency plumber headline and the 24/7 emergency bar',
        mk: 'Почетната страница на демото за Redline Plumbing, со заглавје за повик на еден допир, насловот за итен водоинсталатер и лентата за итни случаи 24/7',
      },
    },
  },

  tokens: {
    BUSINESS_NAME: 'Redline Plumbing & Drain',
    DOMAIN: 'redlineplumbing.example.com',
    TRADE: 'Plumbing',
    TRADE_SERVICE: '24/7 Emergency Plumber',
    SCHEMA_TYPE: 'Plumber',
    BRAND_HUE: '214',
    LAYOUT_VARIANT: 'classic',
    LOGO_MARK:
      '<path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3 6.8 3.8-6.8 3.8L5.2 8.1 12 4.3ZM5 9.7l6 3.4v6.6l-6-3.3V9.7Zm8 10V13.1l6-3.4v6.7l-6 3.3Z"/>',

    CITY: 'Columbus',
    STATE: 'OH',
    COUNTRY_CODE: 'US',
    STREET_ADDRESS: '1420 W Fifth Ave',
    POSTAL_CODE: '43212',
    LAT: '39.9612',
    LNG: '-82.9988',

    PHONE_DISPLAY: '(614) 555-0142',
    PHONE_RAW: '+16145550142',
    EMAIL: 'dispatch@redlineplumbing.example.com',
    PRICE_RANGE: '$$',

    HOURS_SHORT: 'Open now · Answering 24 hours',
    HOURS_FULL:
      'Emergency service: 24 hours, 7 days<br>Office: Mon–Fri 7am–6pm<br>Sat 8am–4pm',

    META_DESCRIPTION:
      'Emergency plumber in Columbus, OH. Burst pipes, blocked drains, water heaters and leak detection — answered 24/7 with upfront pricing. Call (614) 555-0142.',

    HERO_SUBLINE:
      'Burst pipe at 2am? Drain backing up before guests arrive? We answer the phone 24 hours a day and quote the price before we start — no overtime surcharges, no surprises on the invoice.',
    HERO_CARD_TITLE: 'Need help right now?',
    HERO_CARD_LINE: 'A real person answers every call — no automated menu, no callback queue.',
    EMERGENCY_LINE: '24/7 Emergency Plumbing — no overtime charges',

    BADGE_1: 'Licensed & insured',
    BADGE_2: 'Upfront flat-rate pricing',
    BADGE_3: '18 years in Columbus',

    SERVICES_INTRO:
      'Residential and light commercial plumbing across the Columbus metro, from a leaking tap to a full repipe.',

    SERVICE_1_TITLE: 'Emergency Leak & Burst Pipe Repair',
    SERVICE_1_DESC:
      'Burst or leaking pipe stopped, dried and repaired. We shut off, contain the damage and fix it in one visit wherever possible.',
    SERVICE_1_ICON:
      '<path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/>',
    SERVICE_2_TITLE: 'Drain Cleaning & Unblocking',
    SERVICE_2_DESC:
      'Kitchen, bathroom and main line blockages cleared with camera inspection so you see the actual cause, not just a guess.',
    SERVICE_2_ICON:
      '<path d="M13 2 4.1 13.4c-.4.5 0 1.3.7 1.3H11l-1 7.3 8.9-11.4c.4-.5 0-1.3-.7-1.3H12l1-7.3Z"/>',
    SERVICE_3_TITLE: 'Water Heater Repair & Install',
    SERVICE_3_DESC:
      'Tank and tankless units repaired, replaced and serviced. Same-day replacement on most common models held in stock.',
    SERVICE_3_ICON:
      '<path d="M20 6h-3V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2ZM9 4h6v2H9V4Z"/>',
    SERVICE_4_TITLE: 'Sewer Line & Camera Inspection',
    SERVICE_4_DESC:
      'Root intrusion, collapses and recurring backups diagnosed on camera, with trenchless repair options where the line allows.',
    SERVICE_4_ICON: '<path d="M22 9 12 2 2 9v12h7v-7h6v7h7V9Z"/>',
    SERVICE_5_TITLE: 'Fixture & Faucet Replacement',
    SERVICE_5_DESC:
      'Toilets, sinks, faucets, garbage disposals and shut-off valves supplied and fitted — or fitted from parts you already bought.',
    SERVICE_5_ICON:
      '<path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-14 2 3h-4l2-3Zm0 20-2-3h4l-2 3ZM2 12l3-2v4l-3-2Zm20 0-3 2v-4l3 2Z"/>',
    SERVICE_6_TITLE: 'Repiping & Water Line Work',
    SERVICE_6_DESC:
      'Failing galvanized and polybutylene lines replaced with PEX or copper, planned around your household so the water is off for hours, not days.',
    SERVICE_6_ICON:
      '<path d="m21.7 18.6-8-8a5.5 5.5 0 0 0-6.9-6.9l3.2 3.2-2.4 2.4-3.2-3.2a5.5 5.5 0 0 0 6.9 6.9l8 8 2.4-2.4Z"/>',

    WHY_HEADING: 'Four reasons people call us back',
    WHY_1_TITLE: 'We actually answer at 3am',
    WHY_1_DESC:
      'Emergency calls reach a plumber on shift, not an answering service that takes a message until morning.',
    WHY_2_TITLE: 'The price is fixed before we start',
    WHY_2_DESC:
      'You approve a flat rate for the job in writing. It does not move because the work took longer than we expected.',
    WHY_3_TITLE: 'We leave it cleaner than we found it',
    WHY_3_DESC:
      'Drop sheets down, boots off, mess taken with us. The most common thing customers mention in reviews.',
    WHY_4_TITLE: 'Same plumbers, every time',
    WHY_4_DESC:
      'A small licensed crew that has worked Columbus homes for years — no rotating subcontractors who have never seen your setup.',

    AREA_INTRO:
      'We cover the Columbus metro and the inner-ring suburbs, usually reaching emergency calls within the hour. If you are just outside the list below, call anyway — we will tell you straight away whether we can get to you.',
    AREA_1: 'Columbus',
    AREA_2: 'Grandview Heights',
    AREA_3: 'Upper Arlington',
    AREA_4: 'Bexley',
    AREA_5: 'Worthington',
    AREA_6: 'Dublin',
    AREA_7: 'Hilliard',
    AREA_8: 'Westerville',
    MAP_EMBED_URL:
      'https://www.openstreetmap.org/export/embed.html?bbox=-83.2%2C39.85%2C-82.8%2C40.09&amp;layer=mapnik&amp;marker=39.9612%2C-82.9988',

    STAR_RATING: '4.9',
    REVIEW_COUNT: '214',

    // Written for a fictional business. On a real client build these are replaced
    // with that client's own customers, quoted with permission — see _schema.ts.
    REVIEW_1_TEXT:
      'Our water heater let go at six in the morning and Redline had someone here before eight. He shut everything down, showed me the corrosion on the old tank, and gave me a flat price for the replacement that never moved.',
    REVIEW_1_NAME: 'Karen M.',
    REVIEW_1_AREA: 'Upper Arlington',
    REVIEW_2_TEXT:
      'The kitchen line had backed up three times in a year. Redline ran a camera down it first and found roots in the main, which nobody else had bothered to check. Fixed properly this time.',
    REVIEW_2_NAME: 'Tom B.',
    REVIEW_2_AREA: 'Bexley',
    REVIEW_3_TEXT:
      'Called at 11pm on a Sunday with water coming through the ceiling. An actual plumber answered, talked me through where the shut-off valve was, and was at the house within the hour.',
    REVIEW_3_NAME: 'Alicia D.',
    REVIEW_3_AREA: 'Grandview Heights',

    GALLERY_1_ALT:
      'Redline Plumbing technician replacing a burst copper supply line in a Columbus basement',
    GALLERY_2_ALT: 'New tankless water heater installed in a Grandview Heights utility room',
    GALLERY_3_ALT: 'Sewer camera inspection screen showing root intrusion in a Columbus main line',
    GALLERY_4_ALT: 'Completed PEX repipe with labelled shut-off valves in an Upper Arlington home',

    FORM_INTRO:
      'Send it over and we will call you back with a straight answer and a price. If it is an emergency, calling is faster.',
    FORM_ENDPOINT: 'https://formspree.io/f/REPLACE_ME',

    LICENSE_LINE: 'Ohio plumbing license #XXXXX. Fully insured.',
  },
});
