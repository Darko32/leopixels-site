import { defineDemo } from '../_schema';

/**
 * Agave Air & Heat is a FICTIONAL business used to demonstrate the LeoPixels
 * trades template on a third industry. The phone number is in the 555-01xx
 * range reserved for fictional use. It must never be presented as a real client.
 *
 * Runs the `climate` layout variant: centred hero, 18px radii, roomier vertical
 * rhythm, services as horizontal tiles, and the trust block as a tinted
 * four-across comfort strip. Same DOM and same section order as the other two
 * demos, so every conversion and SEO invariant carries over untouched.
 */
export const agaveAir = defineDemo({
  slug: 'agave-air',

  meta: {
    business: 'Agave Air & Heat',
    trade: 'hvac',
    city: 'Phoenix',
    state: 'AZ',
    isFictional: true,
    featured: true,
    siteLocale: 'en',

    tagline: {
      en: 'The AC quits at 116°. This page gets someone moving.',
      mk: 'Климата откажува на 46 степени. Оваа страница крева некого на нозе.',
    },

    brief: {
      en: `A Phoenix HVAC call has a deadline the other trades do not. A house without air conditioning in July is not inconvenient, it is unlivable by the afternoon, and every hour the homeowner spends comparing websites is an hour the indoor temperature climbs. Whoever looks reachable and competent in the first ten seconds gets the job.

That urgency is why the conversion skeleton here is identical to the plumbing and electrician builds — tap-to-call as the largest thing on a phone screen, repeated in the header, hero, emergency bar, form and footer, a pulsing emergency bar under the hero, a four-field form, and a sticky call bar pinned to the bottom of every mobile screen. Those elements are not a style choice and they are not re-litigated per trade.

What is different is the temperament of the page. Plumbing is asymmetric and blue; electrical is squared, amber and left-aligned. This one is centred, teal, and deliberately roomier — sections breathe about forty percent taller, corners round to 18px, and the icons sit in soft circles rather than square tiles. That is not decoration. HVAC is the one trade in this set that sells an ongoing condition rather than a discrete repair: comfort, quiet, a house that holds temperature. A page with air in it argues for that better than a dense one, and the centred hero reads as an established company rather than a dispatcher.

The services are Phoenix HVAC, not generic HVAC. Heat pumps lead because they dominate this market. R-410A is named because the phase-out is what makes a 2010s condenser expensive to repair and that is the conversation homeowners are actually having. APS and SRP rebates are named because they are real money and no competitor mentions them. Attic duct loss is named because in a Phoenix summer it is often the actual fault behind "the AC runs constantly but the house never cools".

Four trust blocks carry what a homeowner weighs while sweating: NATE-certified and ROC-licensed technicians, same-day service, an estimate agreed before the work starts, and efficiency work that lowers a summer bill rather than just restoring cold air. Three reviews follow, then eight West Valley cities — a different service footprint from the electrician demo, because two companies in one metro would not cover the same eight suburbs.

HVACBusiness schema carries geography, hours and the service catalogue. Aggregate rating is omitted, as everywhere: a hand-typed star rating is a penalty risk, not a shortcut.`,

      mk: `Повикот кај мајстор за клима во Феникс има рок каков што другите занаети немаат. Куќа без клима во јули не е непријатна, туку неподнослива до попладнето, и секој час што домаќинот го троши споредувајќи сајтови е час во кој температурата внатре расте. Работата ја добива оној што во првите десет секунди изгледа достапен и стручен.

Токму таа итност е причината скелетот за конверзија овде да биде идентичен со водоинсталатерската и електричарската изработка — повик на еден допир како најголемо нешто на екранот од телефон, повторен во заглавјето, воводот, лентата за итни случаи, формуларот и подножјето, пулсирачка лента под воводот, формулар со четири полиња и леплива лента за повик на дното од секој мобилен екран. Тие елементи не се прашање на вкус и не се преиспитуваат по занает.

Она што е различно е темпераментот на страницата. Водоинсталатерството е асиметрично и сино; електриката е исправена, килибарна и порамнета лево. Ова е центрирано, тиркизно и намерно попросторно — деловите дишат околу четириесет проценти повисоко, аглите се заоблуваат на 18px, а симболите седат во меки кругови наместо во квадратни плочки. Тоа не е украс. Климатизацијата е единствениот занает во оваа група што продава состојба, а не поединечна поправка: удобност, тишина, куќа што ја држи температурата. Страница со воздух во неа го брани тоа подобро од збиена страница, а центрираниот вовед се чита како воспоставена фирма, а не како диспечер.

Услугите се клима за Феникс, не општа клима. Топлинските пумпи водат бидејќи го доминираат овој пазар. R-410A е именуван бидејќи неговото повлекување е она што прави поправката на кондензатор од 2010-тите скапа, а тоа е разговорот што домаќините навистина го водат. Повратите од APS и SRP се именувани бидејќи се вистински пари, а ниту еден конкурент не ги спомнува. Загубите во каналите во поткровјето се именувани бидејќи во лето во Феникс тие често се вистинската причина зад „климата работи постојано, а куќата не се лади“.

Четири блока за доверба го носат она што домаќинот го мери додека се поти: техничари со NATE и ROC лиценца, услуга во истиот ден, проценка договорена пред почетокот, и работа на ефикасност што ја намалува летната сметка, а не само што го враќа ладниот воздух. Потоа следат три оценки, па осум градови од западната долина — поинакво подрачје од електричарското демо, зашто две фирми во иста метропола не би ги покривале истите осум предградија.

HVACBusiness шемата носи локација, работно време и каталог на услуги. Просечната оценка е изоставена, како и секаде: рачно впишани ѕвездички се ризик за казна, а не пречка.`,
    },

    highlights: [
      {
        en: 'The "climate" layout variant — centred hero, 18px radii, roomier vertical rhythm',
        mk: 'Варијантата „climate“ — центриран вовед, агли од 18px, попросторен ритам',
      },
      {
        en: 'Services as 2-up horizontal tiles with circular icons, not a card grid or rule rows',
        mk: 'Услугите како хоризонтални плочки во две колони со кружни симболи',
      },
      {
        en: 'Trust block as a tinted four-across comfort strip instead of a numbered rail',
        mk: 'Блокот за доверба како обоена лента со четири колони наместо нумерирана низа',
      },
      {
        en: 'Heat pumps, R-410A and APS/SRP rebates named — the conversation Phoenix homeowners are having',
        mk: 'Именувани топлински пумпи, R-410A и поврати од APS/SRP — разговорот што го водат домаќините',
      },
      {
        en: 'West Valley service footprint, distinct from the electrician demo in the same metro',
        mk: 'Подрачје во западната долина, различно од електричарското демо во истата метропола',
      },
      {
        en: 'HVACBusiness JSON-LD with geo, hours and a service catalogue; no aggregate rating',
        mk: 'HVACBusiness JSON-LD со локација, работно време и каталог на услуги, без просечна оценка',
      },
    ],

    // Only what has actually been measured. pagespeed and lcp stay undefined
    // until a real PageSpeed run against the deployed URL.
    metrics: {
      weight: '81 KB',
      buildTime: 'Under 90 minutes',
    },

    screenshots: {
      desktop: '/demos/agave-air/desktop.webp',
      mobile: '/demos/agave-air/mobile.webp',
      alt: {
        en: 'The Agave Air & Heat demo homepage, showing the centred hero, the tap-to-call panel and the 24/7 emergency bar',
        mk: 'Почетната страница на демото за Agave Air & Heat, со центриран вовед, панел за повик на еден допир и лентата за итни случаи 24/7',
      },
    },
  },

  tokens: {
    BUSINESS_NAME: 'Agave Air & Heat',
    DOMAIN: 'agaveair.example.com',
    TRADE: 'Heating & Cooling',
    TRADE_SERVICE: '24/7 AC Repair & Heating',
    SCHEMA_TYPE: 'HVACBusiness',
    // Teal. The guide suggests ~195 for HVAC; 186 pulls further from the
    // plumbing demo's 214 so the two never read as the same brand.
    BRAND_HUE: '186',
    LAYOUT_VARIANT: 'climate',
    // A house holding conditioned air — comfort, not hardware. The airflow
    // curls are stroked, not filled: as closed subpaths they blob into a solid.
    LOGO_MARK:
      '<path fill-rule="evenodd" d="M12 1.7 2 10.3v11.9h20V10.3L12 1.7Zm0 2.6 8 6.9v9.3H4v-9.3l8-6.9Z"/><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6.8 13.2h5.4a1.65 1.65 0 1 0-1.65-1.65"/><path d="M6.8 16.6h6.9a1.65 1.65 0 1 1 1.65 1.65"/></g>',

    CITY: 'Phoenix',
    STATE: 'AZ',
    COUNTRY_CODE: 'US',
    STREET_ADDRESS: '2915 W Bell Rd',
    POSTAL_CODE: '85053',
    LAT: '33.6390',
    LNG: '-112.1300',

    PHONE_DISPLAY: '(623) 555-0164',
    PHONE_RAW: '+16235550164',
    EMAIL: 'service@agaveair.example.com',
    PRICE_RANGE: '$$',

    HOURS_SHORT: 'Open now · Answering 24 hours',
    HOURS_FULL:
      'Emergency service: 24 hours, 7 days<br>Office: Mon–Fri 7am–7pm<br>Sat 7am–4pm · Sun by appointment',

    META_DESCRIPTION:
      'AC repair and heating in Phoenix, AZ. Same-day service on air conditioners, heat pumps and furnaces, upfront estimates and NATE-certified techs. Call (623) 555-0164.',

    HERO_SUBLINE:
      'When the air conditioning quits in a Phoenix July, waiting until tomorrow is not an option. NATE-certified technicians answer around the clock, estimate the job before we start, and carry the parts to finish most repairs on the first visit.',
    HERO_CARD_TITLE: 'Need help right now?',
    HERO_CARD_LINE: 'A technician answers every call — no automated menu, no callback queue.',
    EMERGENCY_LINE: 'AC out in the heat? Emergency calls answered 24/7 — no overtime charges',

    BADGE_1: 'NATE-certified & ROC-licensed',
    BADGE_2: 'Upfront estimates before work',
    BADGE_3: 'Same-day service, 7 days',

    SERVICES_INTRO:
      'Residential heating and cooling across the West Valley — repairs, replacements and the maintenance that keeps a system alive through a Phoenix summer.',

    SERVICE_1_TITLE: 'AC Repair',
    SERVICE_1_DESC:
      'Systems that stopped cooling, freeze up, short-cycle or trip the breaker. We diagnose the actual fault — capacitor, contactor, refrigerant charge, blower — and price the repair before touching it.',
    SERVICE_1_ICON:
      '<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.2v19.6"/><path d="M3.5 7.1 20.5 16.9"/><path d="M20.5 7.1 3.5 16.9"/><path d="m9.3 4.4 2.7 2.4 2.7-2.4"/><path d="m9.3 19.6 2.7-2.4 2.7 2.4"/></g>',

    SERVICE_2_TITLE: 'AC Installation & Replacement',
    SERVICE_2_DESC:
      'Right-sized replacements with a load calculation rather than a guess at tonnage. We handle the APS and SRP efficiency rebates, and we will tell you honestly when a repair still makes more sense.',
    SERVICE_2_ICON:
      '<g fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="12" cy="12" r="3.5"/><path d="M3 8.4h2.6M3 15.6h2.6M18.4 8.4H21M18.4 15.6H21" stroke-linecap="round"/></g>',

    SERVICE_3_TITLE: 'Heating Repair',
    SERVICE_3_DESC:
      'Phoenix winters are short, which is exactly why heat problems surface on the first cold night. No-heat calls, ignition faults, blower failures and thermostats that lost the furnace entirely.',
    SERVICE_3_ICON:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 2.6s5.4 4.3 5.4 9.1a5.4 5.4 0 0 1-10.8 0c0-2 1-3.7 1.8-4.7.5 1.4 1.4 2.2 2.2 2.2 1.2 0 1.6-1.5 1.4-6.6Z"/>',

    SERVICE_4_TITLE: 'Furnace Service & Tune-Ups',
    SERVICE_4_DESC:
      'Annual service before the season, including heat exchanger inspection, burner cleaning and a carbon monoxide check — the part of the visit that matters most and gets skipped most often.',
    SERVICE_4_ICON:
      '<g fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4.5" y="2.5" width="15" height="19" rx="2.2"/><path d="M4.5 9.2h15"/><path d="M8 5.8h3.4" stroke-linecap="round"/><path d="M12 12.6c1.7 1.3 2.6 2.5 2.6 3.8a2.6 2.6 0 0 1-5.2 0c0-1.3.9-2.5 2.6-3.8Z" stroke-linejoin="round"/></g>',

    SERVICE_5_TITLE: 'Heat Pump Repair & Installation',
    SERVICE_5_DESC:
      'Most Valley homes run a heat pump, so most of our work is here — reversing valves, defrost boards, low charge, and replacements for the R-410A systems now costing more to repair than to replace.',
    SERVICE_5_ICON:
      '<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.4" cy="12" r="3"/><path d="M7.4 6.6V4.8M7.4 19.2v-1.8M2 12h1.8M11 12h1.8M4.2 9 3 7.7M10.6 16.3 9.4 15M4.2 15 3 16.3M10.6 7.7 9.4 9"/><path d="M18.4 4.6v14.8"/><path d="m15.6 7.4 2.8-2.8 2.8 2.8"/><path d="m15.6 16.6 2.8 2.8 2.8-2.8"/></g>',

    SERVICE_6_TITLE: 'Indoor Air Quality & Duct Sealing',
    SERVICE_6_DESC:
      'Filtration, UV and duct repair. In a Phoenix summer, leaking attic ducts routinely dump a third of your cold air above the ceiling — which reads as a weak AC and shows up as a high bill.',
    SERVICE_6_ICON:
      '<g fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4.6" width="18" height="14.8" rx="2.2"/><path d="M3 9.5h18M3 14.5h18M8.6 4.6v14.8M15.4 4.6v14.8"/></g>',

    WHY_HEADING: 'Four reasons the Valley keeps our number on the fridge',
    WHY_1_TITLE: 'NATE-certified technicians',
    WHY_1_DESC:
      'Every technician is ROC-licensed, insured and NATE-certified — the industry test that is actually hard to pass. No subcontracted crews you have never met working on your roof.',
    WHY_2_TITLE: 'Same-day service, seven days',
    WHY_2_DESC:
      'No-cool calls are triaged first and we hold summer capacity back for them. Vans stock capacitors, contactors, motors and refrigerant, so most repairs finish on the first visit.',
    WHY_3_TITLE: 'Upfront estimates, agreed first',
    WHY_3_DESC:
      'You see the price in writing before we start, and it does not move because the job ran long. No hourly meter, no overtime surcharge for an evening or a Sunday.',
    WHY_4_TITLE: 'Efficiency, not just cold air',
    WHY_4_DESC:
      'We size equipment with a load calculation, seal the ducts that are wasting your cooling, and file the APS and SRP rebates for you — because the summer bill matters as much as the repair.',

    AREA_INTRO:
      'We cover Phoenix and the West Valley, and we reach most no-cool emergency calls the same day. If you are just outside the list below, call anyway — we will tell you straight away whether we can get a technician to you today.',
    AREA_1: 'Phoenix',
    AREA_2: 'Glendale',
    AREA_3: 'Peoria',
    AREA_4: 'Surprise',
    AREA_5: 'Goodyear',
    AREA_6: 'Avondale',
    AREA_7: 'Scottsdale',
    AREA_8: 'Sun City',
    MAP_EMBED_URL:
      'https://www.openstreetmap.org/export/embed.html?bbox=-112.60%2C33.35%2C-111.85%2C33.85&amp;layer=mapnik&amp;marker=33.6390%2C-112.1300',

    STAR_RATING: '4.8',
    REVIEW_COUNT: '327',

    // Written for a fictional business. On a real client build these are replaced
    // with that client's own customers, quoted with permission — see _schema.ts.
    REVIEW_1_TEXT:
      'Our AC died on a Sunday in July with the house already at 92 inside. Agave had a tech out in under three hours, found a burned contactor, and had us cooling again before dinner. He showed me the part and the price first, and the Sunday call cost the same as a weekday.',
    REVIEW_1_NAME: 'Denise K.',
    REVIEW_1_AREA: 'Peoria',
    REVIEW_2_TEXT:
      'Two companies quoted us a full system replacement. Agave did an actual load calculation, showed us the unit was oversized to begin with, and replaced it with a smaller heat pump that cools better. They filed the SRP rebate paperwork themselves.',
    REVIEW_2_NAME: 'Marcus W.',
    REVIEW_2_AREA: 'Surprise',
    REVIEW_3_TEXT:
      'The upstairs never cooled no matter what we set the thermostat to. Turned out to be disconnected ductwork in the attic that nobody had ever looked at. They sealed it and the difference was immediate — and the August bill dropped about forty dollars.',
    REVIEW_3_NAME: 'Angela R.',
    REVIEW_3_AREA: 'Goodyear',

    GALLERY_1_ALT:
      'Agave Air technician servicing a rooftop condenser unit on a Phoenix home',
    GALLERY_2_ALT: 'New heat pump condenser installed beside a Peoria home in summer',
    GALLERY_3_ALT: 'Smart thermostat fitted and programmed in a Glendale hallway',
    GALLERY_4_ALT: 'Sealed and insulated attic ductwork in a Surprise home after repair',

    FORM_INTRO:
      'Tell us what the system is doing and we will call you back with a straight answer and a price. If the house is already hot, calling is faster — no-cool calls go to the front of the list.',
    FORM_ENDPOINT: 'https://formspree.io/f/REPLACE_ME',

    LICENSE_LINE: 'Arizona ROC license #XXXXXX. NATE-certified. Bonded and insured.',
  },
});
