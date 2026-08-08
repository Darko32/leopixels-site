import { defineDemo } from '../_schema';

/**
 * Ironwood Electric is a FICTIONAL business used to demonstrate the LeoPixels
 * trades template on a second industry. The phone number is in the 555-01xx
 * range reserved for fictional use. It must never be presented as a real client.
 *
 * Same template, same layout, same spacing scale as redline-plumbing. What
 * changes is everything a homeowner uses to recognise the trade: an amber
 * palette instead of plumber blue, electrical iconography on every card and in
 * the wordmark, and copy written around the electrical emergencies people
 * actually search for at 9pm — no power, a burning smell, a breaker that will
 * not stay in.
 */
export const ironwoodElectric = defineDemo({
  slug: 'ironwood-electric',

  meta: {
    business: 'Ironwood Electric',
    trade: 'electrical',
    city: 'Phoenix',
    state: 'AZ',
    isFictional: true,
    featured: true,
    siteLocale: 'en',

    tagline: {
      en: 'Half the house goes dark. One tap gets a licensed electrician.',
      mk: 'Половина куќа останува без струја. Еден допир носи лиценциран електричар.',
    },

    brief: {
      en: `An electrical call starts differently from a plumbing call. Nobody is standing in water — they are standing in the dark, or smelling something hot behind an outlet, and the question underneath the search is not "how much" but "is this dangerous". A website that answers the second question fast is the one that gets the call.

So this build leads with the word licensed, not with the word cheap. The phone number is the largest element on the screen the moment the page opens and repeats in the header, the hero, the emergency bar, the quote form and the footer, exactly as it does on the plumbing build — that pattern converts, it is not trade-specific, and there was no reason to touch it. The section order is also unchanged, because that order mirrors how somebody in an emergency actually scans a page.

Everything around those two things is different. The palette moves from plumber blue to a high-visibility amber that reads as electrical before a single word is processed, and the corners square off from 12px to 4px, which is a small change that does a lot of work — it moves the whole page from soft and domestic to industrial. The wordmark is a shield with a bolt through it, because for an electrician the trust signal and the trade signal are the same signal. Headings sit left rather than centred. The floating white card in the plumbing hero is restated here as a full-width dispatch bar clamped under the headline with an amber rule down its left edge. The six services drop the card grid for two columns of accent-rule rows, each with its own glyph — a breaker panel, an EV plug, a receptacle, a fixture. And the four trust blocks invert to a dark band, so the licensed-and-guaranteed promise lands as the heaviest thing on the page rather than a pale tinted strip.

None of that is a redesign. It is one enumerated variant of the shared template, applied by a single token, over a DOM that never moves.

The service list is the tell that this is a Phoenix electrician rather than a template with the noun swapped. Federal Pacific and Zinsco panels are named, because those panels are genuinely sitting in older Valley homes and homeowners search for them by name. So are Level 2 EV chargers, aluminium branch wiring from the sixties and seventies, and pool and spa circuits — a category that barely exists in most of the country and is close to unavoidable here.

Four trust blocks carry the promises a homeowner weighs before letting somebody open a live panel: ROC-licensed electricians, a price agreed in writing before the work starts, same-day service, and a satisfaction guarantee backed by a workmanship warranty. Three reviews follow, written the way homeowners actually write them — a specific fault, a specific street, a specific outcome.

Then eight named Valley cities, which is the single most underused local-SEO asset on trades websites, and Electrician schema with geography, hours and a service catalogue. Aggregate rating is deliberately omitted: a hand-typed star rating is a penalty risk, not a shortcut. It is one HTML file with inline CSS, no external fonts and no frameworks.`,

      mk: `Повикот кај електричар почнува поинаку од повикот кај водоинсталатер. Никој не стои во вода — луѓето стојат во темница или чувствуваат мирис на изгорено зад некој штекер, а прашањето под пребарувањето не е „колку чини“ туку „дали е ова опасно“. Сајтот што брзо одговара на второто прашање е тој што го добива повикот.

Затоа оваа изработка почнува со зборот лиценциран, а не со зборот евтино. Телефонскиот број е најголемото нешто на екранот штом ќе се отвори страницата и се повторува во заглавјето, воводот, лентата за итни случаи, формуларот и подножјето — исто како кај водоинсталатерската изработка, зашто тој образец продава, не зависи од занаетот и немаше причина да се менува. Ниту редоследот на деловите е сменет, бидејќи тој редослед го следи начинот на кој човек во итна ситуација навистина ја прегледува страницата.

Сето друго околу тие две работи е поинакво. Палетата преминува од водоинсталатерско сино во високо видлива килибарна боја што се чита како електрика пред да се обработи и еден збор, а аглите се исправаат од 12px на 4px — мала промена што прави многу, зашто целата страница преминува од мека и домашна во индустриска. Знакот е штит со молња низ него, бидејќи кај електричар сигналот за доверба и сигналот за занает се еден ист сигнал. Насловите стојат лево наместо во средина. Белата картичка што лебди во воводот кај водоинсталатерот овде е претворена во лента за дежурство низ цела ширина, залепена под насловот, со килибарна линија по левиот раб. Шесте услуги ја напуштаат мрежата од картички и преминуваат во две колони редови со акцентна линија, секој со свој симбол — разводна табла, приклучник за возило, штекер, светилка. А четирите блока за доверба се превртуваат во темна лента, за ветувањето „лиценцирано и загарантирано“ да падне како најтешкото нешто на страницата, а не како бледа обоена лента.

Ништо од тоа не е редизајн. Тоа е една именувана варијанта на заедничкиот шаблон, применета со еден токен, врз DOM што не се поместува.

Списокот на услуги е доказот дека станува збор за електричар од Феникс, а не за шаблон со заменета именка. Именувани се разводните табли Federal Pacific и Zinsco, бидејќи тие навистина стојат во постарите куќи во Долината и луѓето ги пребаруваат по име. Исто така и полначите за електрични возила од второ ниво, алуминиумските инсталации од шеесеттите и седумдесеттите, и струјните кола за базени и џакузија — категорија што во поголемиот дел од земјата речиси и не постои, а овде е речиси неизбежна.

Четири блока за доверба ги носат ветувањата што домаќинот ги мери пред да пушти некого да отвори табла под напон: лиценцирани електричари, цена договорена писмено пред почетокот, услуга во истиот ден и гаранција за задоволство поткрепена со гаранција на изработката. Потоа следат три оценки, напишани онака како што домаќините навистина пишуваат — конкретен дефект, конкретно место, конкретен исход.

Следат осум именувани градови во Долината, најмалку искористениот локален SEO адут на занаетчиските сајтови, и Electrician шема со локација, работно време и каталог на услуги. Просечната оценка е намерно изоставена: рачно впишани ѕвездички се ризик за казна, а не пречка. Тоа е една HTML датотека со вграден CSS, без надворешни фонтови и без фрејмворци.`,
    },

    highlights: [
      {
        en: 'The "voltage" layout variant — squared corners, left-aligned headings, a dark trust band',
        mk: 'Варијантата „voltage“ — исправени агли, наслови лево, темна лента за доверба',
      },
      {
        en: 'Hero card restated as a full-width dispatch bar; services as accent-rule rows, not cards',
        mk: 'Картичката во воводот претворена во лента за дежурство; услугите како редови со линија, не картички',
      },
      {
        en: 'Amber electrical palette and a shield-and-bolt mark, not a re-tinted plumbing site',
        mk: 'Килибарна електричарска палета и знак со штит и молња, а не преобоен водоинсталатерски сајт',
      },
      {
        en: 'Per-service electrical glyphs — breaker panel, EV plug, receptacle, fixture',
        mk: 'Електричарски симболи по услуга — разводна табла, приклучник за возило, штекер, светилка',
      },
      {
        en: 'Services named the way Phoenix homeowners search: Federal Pacific panels, Level 2 chargers, pool circuits',
        mk: 'Услуги именувани онака како што пребаруваат домаќините од Феникс: табли Federal Pacific, полначи од второ ниво, кола за базени',
      },
      {
        en: 'Licensed, upfront-priced, same-day and guaranteed — the four things people weigh before opening a live panel',
        mk: 'Лиценцирано, со однапред кажана цена, во истиот ден и со гаранција — четирите работи што се мерат пред отворање табла под напон',
      },
      {
        en: 'Three homeowner reviews with the fault, the neighbourhood and the outcome named',
        mk: 'Три оценки од домаќини со именуван дефект, населба и исход',
      },
      {
        en: 'Electrician JSON-LD with geo, hours and a service catalogue across eight Valley cities',
        mk: 'Electrician JSON-LD со локација, работно време и каталог на услуги во осум градови од Долината',
      },
    ],

    // Only what has actually been measured. pagespeed and lcp stay undefined
    // until a real PageSpeed run against the deployed URL.
    metrics: {
      weight: '75 KB',
      buildTime: 'Under 90 minutes',
    },

    screenshots: {
      desktop: '/demos/ironwood-electric/desktop.webp',
      mobile: '/demos/ironwood-electric/mobile.webp',
      alt: {
        en: 'The Ironwood Electric demo homepage, showing the tap-to-call header, the emergency electrician headline and the 24/7 emergency bar',
        mk: 'Почетната страница на демото за Ironwood Electric, со заглавје за повик на еден допир, насловот за итен електричар и лентата за итни случаи 24/7',
      },
    },
  },

  tokens: {
    BUSINESS_NAME: 'Ironwood Electric',
    DOMAIN: 'ironwoodelectric.example.com',
    TRADE: 'Electrical',
    TRADE_SERVICE: '24/7 Emergency Electrician',
    SCHEMA_TYPE: 'Electrician',
    // High-visibility amber. The trade colour before a word is read.
    BRAND_HUE: '38',
    LAYOUT_VARIANT: 'voltage',
    // Shield with a bolt through it — trust signal and trade signal in one mark.
    LOGO_MARK:
      '<path fill-rule="evenodd" d="M12 1.6 3.4 4.9v6.4c0 4.6 3.4 8.9 8.6 11.1 5.2-2.2 8.6-6.5 8.6-11.1V4.9L12 1.6Zm0 2.1 6.6 2.5v4.7c0 3.6-2.5 7-6.6 8.9-4.1-1.9-6.6-5.3-6.6-8.9V6.2L12 3.7Z"/><path d="M12.9 6.4 8.2 12.9c-.2.3 0 .8.4.8h2.3l-.6 4.1 4.7-6.5c.2-.3 0-.8-.4-.8h-2.3l.6-4.1Z"/>',

    CITY: 'Phoenix',
    STATE: 'AZ',
    COUNTRY_CODE: 'US',
    STREET_ADDRESS: '3420 E Indian School Rd',
    POSTAL_CODE: '85018',
    LAT: '33.4949',
    LNG: '-111.9950',

    PHONE_DISPLAY: '(602) 555-0178',
    PHONE_RAW: '+16025550178',
    EMAIL: 'dispatch@ironwoodelectric.example.com',
    PRICE_RANGE: '$$',

    HOURS_SHORT: 'Open now · Answering 24 hours',
    HOURS_FULL:
      'Emergency service: 24 hours, 7 days<br>Office: Mon–Fri 7am–6pm<br>Sat 8am–3pm',

    META_DESCRIPTION:
      'Licensed emergency electrician in Phoenix, AZ. Power outages, panel upgrades, EV chargers, outlets and lighting — same-day service with upfront pricing. Call (602) 555-0178.',

    HERO_SUBLINE:
      'Half the house with no power? A breaker that will not stay in, or an outlet that smells hot? Licensed electricians answer 24 hours a day, price the job before we start, and finish most of them the same day.',
    HERO_CARD_TITLE: 'Need help right now?',
    HERO_CARD_LINE:
      'A licensed electrician answers every call — no automated menu, no callback queue.',
    EMERGENCY_LINE: 'No power, sparking or a burning smell? We answer 24/7 — no overtime charges',

    BADGE_1: 'ROC-licensed & insured',
    BADGE_2: 'Upfront pricing, agreed in writing',
    BADGE_3: 'Same-day service across the Valley',

    SERVICES_INTRO:
      'Residential and light commercial electrical work across the Valley — from one dead outlet to a full 200-amp service upgrade, permit and inspection included.',

    SERVICE_1_TITLE: 'Emergency Electrical Repair',
    SERVICE_1_DESC:
      'Dead circuits, breakers that will not reset, sparking outlets and burning smells. We isolate the fault, make the house safe, and repair it on the same visit wherever possible.',
    SERVICE_1_ICON:
      '<path d="M13 2 4.1 13.4c-.4.5 0 1.3.7 1.3H11l-1 7.3 8.9-11.4c.4-.5 0-1.3-.7-1.3H12l1-7.3Z"/>',

    SERVICE_2_TITLE: 'Panel Upgrades & Breaker Replacement',
    SERVICE_2_DESC:
      '100-amp services upgraded to 200 amps, and replacement of the Federal Pacific and Zinsco panels still sitting in older Valley homes. Permit pulled, inspection scheduled, panel labelled properly.',
    SERVICE_2_ICON:
      '<path fill-rule="evenodd" d="M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v16h14V4H5Z"/><path d="M7 6h4v2.6H7V6Zm6 0h4v2.6h-4V6ZM7 10.4h4V13H7v-2.6Zm6 0h4V13h-4v-2.6ZM7 15h10v3H7v-3Z"/>',

    SERVICE_3_TITLE: 'EV Charger Installation',
    SERVICE_3_DESC:
      'Level 2 chargers on a dedicated 240V circuit, load-calculated against your panel first and mounted where you actually park. Tesla, ChargePoint and universal J1772.',
    SERVICE_3_ICON:
      '<path d="M8 2h2v4H8V2Zm6 0h2v4h-2V2ZM6.5 7h11a.5.5 0 0 1 .5.5V12a6 6 0 0 1-5 5.92V22h-2v-4.08A6 6 0 0 1 6 12V7.5a.5.5 0 0 1 .5-.5Z"/>',

    SERVICE_4_TITLE: 'Ceiling Fans, Lighting & Recessed LED',
    SERVICE_4_DESC:
      'Fans, fixtures, recessed cans, under-cabinet and landscape lighting fitted and switched — including a fan-rated box where the old one was never rated for the weight.',
    SERVICE_4_ICON:
      '<path d="M12 2a7 7 0 0 0-4.2 12.6c.5.4.8 1 .8 1.6v.2h6.8v-.2c0-.6.3-1.2.8-1.6A7 7 0 0 0 12 2ZM8.6 18.4h6.8V20a2 2 0 0 1-2 2h-2.8a2 2 0 0 1-2-2v-1.6Z"/>',

    SERVICE_5_TITLE: 'Outlets, Switches & Rewiring',
    SERVICE_5_DESC:
      'GFCI and AFCI protection, dedicated appliance circuits, USB and smart switches, and replacement of the aluminium branch wiring found in homes built through the 60s and 70s.',
    SERVICE_5_ICON:
      '<path fill-rule="evenodd" d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v16h12V4H6Z"/><path d="M9 7h1.6v3.2H9V7Zm4.4 0H15v3.2h-1.6V7ZM12 12.4a2.2 2.2 0 0 1 2.2 2.2v1.6H9.8v-1.6a2.2 2.2 0 0 1 2.2-2.2Z"/>',

    SERVICE_6_TITLE: 'Pool, Spa & Outdoor Wiring',
    SERVICE_6_DESC:
      'Pump and heater circuits, equipment bonding, GFCI protection, patio fans and exterior outlets — built for Phoenix sun and monsoon rain rather than a mild climate.',
    SERVICE_6_ICON:
      '<path d="M13.4 2 8.8 8.5c-.2.3 0 .8.4.8h2.3l-.6 4.1 4.7-6.5c.2-.3 0-.8-.4-.8h-2.3l.5-4.1Z"/><path d="M3 15.6c1.5 0 1.5 1.2 3 1.2s1.5-1.2 3-1.2 1.5 1.2 3 1.2 1.5-1.2 3-1.2 1.5 1.2 3 1.2 1.5-1.2 3-1.2v2c-1.5 0-1.5 1.2-3 1.2s-1.5-1.2-3-1.2-1.5 1.2-3 1.2-1.5-1.2-3-1.2-1.5 1.2-3 1.2-1.5-1.2-3-1.2v-2Z"/>',

    WHY_HEADING: 'Four reasons people keep our number in their phone',
    WHY_1_TITLE: 'Licensed electricians, never a handyman',
    WHY_1_DESC:
      'Every job is done by an ROC-licensed, insured electrician, and we pull the permit whenever code calls for one. Unpermitted electrical work is what fails a home inspection years later.',
    WHY_2_TITLE: 'The price is agreed before we start',
    WHY_2_DESC:
      'You approve a flat rate in writing before a panel cover comes off. No hourly meter running, no overtime surcharge because the call came in at 11pm.',
    WHY_3_TITLE: 'Most jobs finished the same day',
    WHY_3_DESC:
      'Our vans carry breakers, GFCIs, fixtures and the panel parts we fit most often, so a dead circuit is usually diagnosed and repaired on the first visit instead of booked for next week.',
    WHY_4_TITLE: '100% satisfaction, guaranteed in writing',
    WHY_4_DESC:
      'If the work is not right we come back and put it right at no charge. Workmanship is warrantied for two years, and every part we supply carries its manufacturer warranty.',

    AREA_INTRO:
      'We cover Phoenix and the surrounding Valley cities, and usually reach emergency calls within the hour. If you are just outside the list below, call anyway — we will tell you straight away whether we can get to you today.',
    AREA_1: 'Phoenix',
    AREA_2: 'Scottsdale',
    AREA_3: 'Tempe',
    AREA_4: 'Mesa',
    AREA_5: 'Chandler',
    AREA_6: 'Gilbert',
    AREA_7: 'Glendale',
    AREA_8: 'Peoria',
    MAP_EMBED_URL:
      'https://www.openstreetmap.org/export/embed.html?bbox=-112.45%2C33.20%2C-111.60%2C33.75&amp;layer=mapnik&amp;marker=33.4949%2C-111.9950',

    STAR_RATING: '4.9',
    REVIEW_COUNT: '186',

    // Written for a fictional business. On a real client build these are replaced
    // with that client's own customers, quoted with permission — see _schema.ts.
    REVIEW_1_TEXT:
      'Half the house lost power on a Saturday night and Ironwood had someone here in about forty minutes. He found a burned-out breaker in the panel, showed me the damage before he touched anything, and quoted the price on the spot. Lights were back on before midnight.',
    REVIEW_1_NAME: 'Marisol T.',
    REVIEW_1_AREA: 'Arcadia, Phoenix',
    REVIEW_2_TEXT:
      'We had a Federal Pacific panel that two other electricians told us to keep an eye on. Ironwood explained exactly why it had to go, handled the permit and the inspection, and the new 200-amp panel is labelled better than anything else in this house.',
    REVIEW_2_NAME: 'Dan R.',
    REVIEW_2_AREA: 'Chandler',
    REVIEW_3_TEXT:
      'Booked them for a Level 2 charger for our new EV. They did the load calculation first instead of guessing, ran the conduit along the garage wall dead straight, and cleaned up completely. The invoice was exactly what the quote said.',
    REVIEW_3_NAME: 'Priya N.',
    REVIEW_3_AREA: 'Gilbert',

    GALLERY_1_ALT:
      'Ironwood Electric electrician fitting a new 200-amp service panel in a Phoenix garage',
    GALLERY_2_ALT:
      'Level 2 EV charger mounted on the garage wall beside a Scottsdale driveway',
    GALLERY_3_ALT: 'Recessed LED lighting installed in a remodelled Tempe kitchen ceiling',
    GALLERY_4_ALT:
      'Labelled breaker panel with new GFCI-protected circuits in a Chandler home',

    FORM_INTRO:
      'Tell us what the power is doing and we will call you back with a straight answer and a price. If something is sparking, smoking or hot to touch, call instead — that one should not wait.',
    FORM_ENDPOINT: 'https://formspree.io/f/REPLACE_ME',

    LICENSE_LINE: 'Arizona ROC license #XXXXXX. Bonded and insured.',
  },
});
