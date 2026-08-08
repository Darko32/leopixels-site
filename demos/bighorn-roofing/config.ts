import { defineDemo } from '../_schema';

/**
 * Bighorn Roofing is a FICTIONAL business used to demonstrate the LeoPixels
 * trades template on a fourth industry. The phone number is in the 555-01xx
 * range reserved for fictional use. It must never be presented as a real client.
 *
 * Runs the `ridgeline` layout variant — the one built for a trade that sells on
 * visible proof rather than response time. Same DOM and same section order as
 * the other three, so every conversion and SEO invariant carries over.
 */
export const bighornRoofing = defineDemo({
  slug: 'bighorn-roofing',

  meta: {
    business: 'Bighorn Roofing',
    trade: 'roofing',
    city: 'Denver',
    state: 'CO',
    isFictional: true,
    featured: true,
    siteLocale: 'en',

    tagline: {
      en: 'Hail comes through the Front Range every spring. The roof is the part you find out about later.',
      mk: 'Град удира по Фронт Рејнџ секоја пролет. За кровот дознавате дури подоцна.',
    },

    brief: {
      en: `Roofing does not convert like the other three trades, and building it as though it did would have been the easy mistake. A burst pipe or a dead air conditioner is an emergency: the homeowner is already in distress, already dialling, and the only job of the page is to be reachable in under ten seconds. A roof is almost never that. Hail goes through in April and the homeowner does nothing for six weeks, then notices granules in the gutter, then asks three neighbours who they used, then gets two or three companies out. It is a considered, high-value purchase with an insurance company sitting in the middle of it.

So this variant moves weight out of the response-time argument and into proof. The hero is image-led rather than text-led: the photograph holds the top two-thirds of the screen, the content is anchored to the bottom, and the headline is the largest type in the whole system. The storm CTA is a glass bar seated flush on the hero's lower edge that hands straight off to the red emergency strip below it — present and unmissable for the person whose roof is open right now, without turning the company into an emergency-only outfit for the person planning a replacement in six weeks.

The services drop the grid entirely for a six-column asymmetric layout of dark project tiles, each carrying its glyph as an oversized watermark. Full replacement takes a four-column featured tile in brand green because that is the job worth having; leak repair and hail damage take narrower ones. It reads like a portfolio of work rather than a menu of call-out categories.

The four-step block that carries trust on the other three demos is read here as a process: inspection, photo report, estimate and insurance, install and warranty, with a rule running through the numbers left to right. Roofing anxiety is procedural — people are frightened of being upsold on damage they cannot see from the ground and of mishandling a claim — so naming the sequence does more work than another list of virtues. The gallery is then promoted into a banded asymmetric proof wall with a large feature tile, because in this trade the photographs are the argument.

The content is Denver, not generic roofing. Hail Alley runs straight through the Front Range and Colorado is routinely the most expensive hail-claim state in the country. Class 4 impact-resistant shingles are named because Colorado insurers genuinely discount premiums for them. Ice dams, high-altitude UV and adjuster meetings are named because those are the conversations. Eight metro cities, RoofingContractor schema, and the aggregate rating omitted as everywhere.

The final conversion section splits two-column — the argument on the left, the four-field form on the right — instead of the centred card the other three use. Every conversion invariant survives untouched: tap-to-call largest on mobile, sticky call bar, emergency strip under the hero, four fields, one H1.`,

      mk: `Кровопокривачството не конвертира како другите три занаети, и лесната грешка би било да се гради како да конвертира. Пукната цевка или откажана клима се итен случај: домаќинот е веќе во паника, веќе бира број, и единствената задача на страницата е да биде достапна за помалку од десет секунди. Кровот речиси никогаш не е тоа. Град поминува во април, домаќинот не прави ништо шест недели, потоа забележува гранули во олукот, потоа прашува тројца соседи кого користеле, па повикува две-три фирми. Тоа е промислена, скапа набавка со осигурителна компанија во средината.

Затоа оваа варијанта ја префрла тежината од аргументот за брзина кон доказот. Воводот е воден од слика, а не од текст: фотографијата ги држи горните две третини од екранот, содржината е закотвена долу, а насловот е најголемиот текст во целиот систем. Повикот за бура е стаклена лента залепена на долниот раб на воводот што директно се предава на црвената лента под неа — присутна и невозможна да се пропушти за оној чиј кров е отворен во моментов, без фирмата да се претвори во служба само за итни случаи за оној што планира замена за шест недели.

Услугите целосно ја напуштаат мрежата и преминуваат во асиметричен распоред од шест колони со темни плочки за проекти, секоја со свој симбол како преголем воден жиг. Целосната замена зазема истакната плочка од четири колони во зелена бренд боја, бидејќи тоа е работата што вреди да се добие; поправката на протекување и штетата од град земаат потесни. Се чита како портфолио на изведени работи, а не како список на категории за повик.

Блокот со четири чекори што кај другите три демоа носи доверба, овде се чита како процес: преглед, фото-извештај, проценка и осигурување, монтажа и гаранција, со линија што поминува низ броевите од лево кон десно. Стравот кај кровот е процедурален — луѓето се плашат да не им бидат наметнати штети што не се гледаат од земја и да не згрешат во постапката со осигурувањето — па именувањето на редоследот прави повеќе од уште еден список на доблести. Галеријата потоа е подигната во обоена асиметрична ѕидна површина со доказ и голема истакната плочка, бидејќи во овој занает фотографиите се аргументот.

Содржината е Денвер, не општо кровопокривачство. Hail Alley поминува право низ Фронт Рејнџ, а Колорадо редовно е државата со најскапи штети од град во земјата. Шинглите отпорни на удар од класа 4 се именувани бидејќи осигурителите во Колорадо навистина даваат попуст за нив. Ледените брани, ултравиолетовото зрачење на надморска височина и средбите со проценители се именувани бидејќи тоа се разговорите. Осум градови во метрополата, RoofingContractor шема, и изоставена просечна оценка како и секаде.

Завршниот дел за конверзија се дели на две колони — аргументот лево, формуларот со четири полиња десно — наместо центрираната картичка што ја користат другите три. Секој елемент за конверзија останува недопрен: повик на еден допир како најголем на мобилен, леплива лента за повик, лента за итни случаи под воводот, четири полиња, еден H1.`,
    },

    highlights: [
      {
        en: 'The "ridgeline" variant — image-led hero, bottom-anchored content, dark header',
        mk: 'Варијантата „ridgeline“ — вовед воден од слика, содржина закотвена долу, темно заглавје',
      },
      {
        en: 'Services on a 6-column asymmetric grid of project tiles, replacement featured',
        mk: 'Услуги на асиметрична мрежа од шест колони со плочки за проекти',
      },
      {
        en: 'The four-step block read as a process timeline: inspect, document, estimate, install',
        mk: 'Блокот со четири чекори како временска линија: преглед, документација, проценка, монтажа',
      },
      {
        en: 'Gallery promoted to a banded asymmetric proof wall — the photographs are the argument',
        mk: 'Галеријата подигната во асиметрична површина со доказ — фотографиите се аргументот',
      },
      {
        en: 'Split two-column quote section instead of the centred form card',
        mk: 'Поделен дел за понуда во две колони наместо центрирана картичка',
      },
      {
        en: 'Denver hail, Class 4 shingles and insurance adjusters — not generic roofing copy',
        mk: 'Град во Денвер, шингли од класа 4 и проценители — не општ текст за кровови',
      },
    ],

    // Only what has actually been measured. pagespeed and lcp stay undefined
    // until a real PageSpeed run against the deployed URL.
    metrics: {
      weight: '78 KB',
      buildTime: 'Under 90 minutes',
    },

    screenshots: {
      desktop: '/demos/bighorn-roofing/desktop.webp',
      mobile: '/demos/bighorn-roofing/mobile.webp',
      alt: {
        en: 'The Bighorn Roofing demo homepage, showing the image-led hero, the seated storm bar and the 24/7 emergency strip',
        mk: 'Почетната страница на демото за Bighorn Roofing, со вовед воден од слика, лента за бура и лентата за итни случаи 24/7',
      },
    },
  },

  tokens: {
    BUSINESS_NAME: 'Bighorn Roofing',
    DOMAIN: 'bighornroofing.example.com',
    TRADE: 'Roofing',
    TRADE_SERVICE: 'Roof Repair & Replacement',
    SCHEMA_TYPE: 'RoofingContractor',
    // The guide suggests ~15 rust for roofing, but that sits 7° from --urgent
    // and the brand would read as one muddy red with the emergency bar. Deep
    // forest green is the credible exterior-contractor alternative and leaves
    // the red to mean "storm".
    BRAND_HUE: '145',
    LAYOUT_VARIANT: 'ridgeline',
    // A roof line over a solid house — shelter, stated plainly.
    LOGO_MARK:
      '<path d="M12 2.1 1.5 11l1.6 1.9L12 5.3l8.9 7.6 1.6-1.9L12 2.1Z"/><path d="M12 8.4 4.7 14.6v7h4.7v-5.2h5.2v5.2h4.7v-7L12 8.4Z"/>',

    CITY: 'Denver',
    STATE: 'CO',
    COUNTRY_CODE: 'US',
    STREET_ADDRESS: '2500 W Evans Ave',
    POSTAL_CODE: '80219',
    LAT: '39.6783',
    LNG: '-105.0195',

    PHONE_DISPLAY: '(303) 555-0119',
    PHONE_RAW: '+13035550119',
    EMAIL: 'office@bighornroofing.example.com',
    PRICE_RANGE: '$$',

    HOURS_SHORT: 'Free inspections booked 7 days',
    HOURS_FULL:
      'Storm response: 24 hours, 7 days<br>Office: Mon–Fri 7am–6pm<br>Sat 8am–2pm · Inspections 7 days',

    META_DESCRIPTION:
      'Roof repair and replacement in Denver, CO. Hail and storm damage, leaks, free inspections and insurance claim help, backed by a 10-year workmanship warranty. Call (303) 555-0119.',

    HERO_SUBLINE:
      'Front Range hail does not wait for a convenient week. We inspect free, photograph every slope so you and your insurer see the same evidence, and build roofs to survive the next storm rather than just the last one.',
    HERO_CARD_TITLE: 'Storm damage? Start here.',
    HERO_CARD_LINE:
      'Free inspection, a full photo report in your hands, and we meet your adjuster on the roof.',
    EMERGENCY_LINE: 'Active leak or open roof? Emergency tarping 24/7 across the metro',

    BADGE_1: 'Licensed, bonded & insured',
    BADGE_2: '10-year workmanship warranty',
    BADGE_3: 'Free inspection & claim help',

    SERVICES_INTRO:
      'Residential roofing across the Denver metro — from a single storm-damaged slope to a full tear-off, with the insurance paperwork handled alongside the work.',

    SERVICE_1_TITLE: 'Full Roof Replacement',
    SERVICE_1_DESC:
      'Complete tear-off and rebuild, decking inspected and repaired before anything goes back down. Architectural, impact-resistant and synthetic profiles, finished in a day or two on most Denver homes.',
    SERVICE_1_ICON:
      '<path d="M12 2.1 1.5 11l1.6 1.9L12 5.3l8.9 7.6 1.6-1.9L12 2.1Z"/><path d="M12 8.4 4.7 14.6v7h4.7v-5.2h5.2v5.2h4.7v-7L12 8.4Z"/>',

    SERVICE_2_TITLE: 'Hail & Storm Damage',
    SERVICE_2_DESC:
      'Bruised shingles, lost granules, wind-lifted ridges and impact splits — documented slope by slope in the form an adjuster will actually accept.',
    SERVICE_2_ICON:
      '<path d="M18.3 9.5A6.4 6.4 0 0 0 6.2 8.2a5.1 5.1 0 0 0 .5 10.2h11a4.4 4.4 0 0 0 .6-8.9Z"/><circle cx="8.4" cy="21.3" r="1.5"/><circle cx="13" cy="21.3" r="1.5"/><circle cx="17.6" cy="21.3" r="1.5"/>',

    SERVICE_3_TITLE: 'Roof Leak Repair',
    SERVICE_3_DESC:
      'Flashing, valleys, boots and chimney saddles — the four places Denver roofs actually leak. Traced to the entry point, not just patched where the ceiling stained.',
    SERVICE_3_ICON:
      '<path d="M12 2.4 2.3 10.7l1.5 1.8L12 5.5l4.1 3.5 1.9-1.6L12 2.4Z"/><path d="M12 10.6s-3.7 4.2-3.7 6.6a3.7 3.7 0 0 0 7.4 0c0-2.4-3.7-6.6-3.7-6.6Z"/>',

    SERVICE_4_TITLE: 'Free Inspections & Insurance Claims',
    SERVICE_4_DESC:
      'A full photo report of every slope, whether or not there is a claim in it. If there is, we file with you and meet the adjuster on the roof — most Denver homeowners have never been told they are allowed to ask for that.',
    SERVICE_4_ICON:
      '<path d="M12 2.4 2.6 10.4l1.5 1.8L12 5.5l4 3.4 1.9-1.6L12 2.4Z"/><path fill-rule="evenodd" d="M16.1 10.1a4.6 4.6 0 0 0-2.6 8.4l-.1.1 2.7 2.7 1.5-1.5-2.6-2.7a4.6 4.6 0 0 0 1.1-7Zm0 2a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Z"/>',

    SERVICE_5_TITLE: 'Class 4 Impact-Resistant Upgrades',
    SERVICE_5_DESC:
      'Class 4 shingles survive Front Range hail that destroys a standard three-tab, and most Colorado insurers discount the premium for them. We will show you the numbers before you commit.',
    SERVICE_5_ICON:
      '<path fill-rule="evenodd" d="M12 1.8 3.6 5v6.8c0 4.6 3.4 8.8 8.4 10.4 5-1.6 8.4-5.8 8.4-10.4V5L12 1.8Zm0 2.1 6.4 2.5v5.4c0 3.6-2.5 6.9-6.4 8.3-3.9-1.4-6.4-4.7-6.4-8.3V6.4L12 3.9Z"/><path d="M7.7 8.5h8.6v1.7H7.7V8.5Zm0 3.1h8.6v1.7H7.7v-1.7Zm0 3.1h8.6v1.7H7.7v-1.7Z"/>',

    SERVICE_6_TITLE: 'Gutters, Soffit & Fascia',
    SERVICE_6_DESC:
      'Seamless gutters, guards and rotted fascia replaced with the roof rather than as a second trip. Sized for a Denver spring melt coming off a full winter of snow load.',
    SERVICE_6_ICON:
      '<path d="M1.8 5.6h20.4v2.2H1.8V5.6Z"/><path d="M4 8v4.4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8h-2.2v4.2H6.2V8H4Z"/><path d="M15.6 14.4h2.2V22h-2.2v-7.6Z"/>',

    WHY_HEADING: 'From first look to final nail, in four steps',
    WHY_1_TITLE: 'Free inspection',
    WHY_1_DESC:
      'We walk every slope, not the two we can see from the driveway, and we tell you when there is nothing wrong. Plenty of Denver roofs get inspected after a storm and do not need replacing.',
    WHY_2_TITLE: 'Photo report in your hands',
    WHY_2_DESC:
      'Every finding photographed and written up, sent to you the same day. You own that report whether you hire us or not, and it is what stops a claim being argued from memory.',
    WHY_3_TITLE: 'Estimate and insurance',
    WHY_3_DESC:
      'A line-item estimate you can hold next to any other bid, and if there is a claim we file alongside you and meet the adjuster on the roof so the scope is agreed on site.',
    WHY_4_TITLE: 'Install and warranty',
    WHY_4_DESC:
      'Our own crews, not day labour. Decking checked before it is covered, site magnet-swept before we leave, and ten years of workmanship warranty on top of the manufacturer material cover.',

    AREA_INTRO:
      'We work across the Denver metro and the north and south suburbs, and we prioritise the neighbourhoods a storm actually crossed rather than chasing the whole Front Range at once. If you are just outside the list below, call — we will tell you honestly whether you are in our radius.',
    AREA_1: 'Denver',
    AREA_2: 'Aurora',
    AREA_3: 'Lakewood',
    AREA_4: 'Arvada',
    AREA_5: 'Westminster',
    AREA_6: 'Centennial',
    AREA_7: 'Littleton',
    AREA_8: 'Highlands Ranch',
    MAP_EMBED_URL:
      'https://www.openstreetmap.org/export/embed.html?bbox=-105.30%2C39.50%2C-104.70%2C39.95&amp;layer=mapnik&amp;marker=39.6783%2C-105.0195',

    STAR_RATING: '4.9',
    REVIEW_COUNT: '241',

    // Written for a fictional business. On a real client build these are replaced
    // with that client's own customers, quoted with permission — see _schema.ts.
    REVIEW_1_TEXT:
      'After the May hail our insurer sent an adjuster who wanted to approve two slopes. Bighorn met him on the roof with their photo report and walked him through the impact marks on the other two. Full replacement approved. I would never have got that on my own.',
    REVIEW_1_NAME: 'Ryan H.',
    REVIEW_1_AREA: 'Arvada',
    REVIEW_2_TEXT:
      'They inspected after a storm and told me my roof was fine and had another eight years in it. Two other companies had already told me I needed a full replacement. When it finally did need doing last autumn I did not call anybody else.',
    REVIEW_2_NAME: 'Bev L.',
    REVIEW_2_AREA: 'Littleton',
    REVIEW_3_TEXT:
      'A slow leak had been staining the upstairs ceiling for two winters and nobody could find it. Bighorn traced it to a cracked chimney flashing in about twenty minutes. Fixed the same visit, and they went back up after the next snow to check it.',
    REVIEW_3_NAME: 'Marcus O.',
    REVIEW_3_AREA: 'Westminster',

    GALLERY_1_ALT:
      'Bighorn Roofing crew completing an architectural shingle tear-off on a Denver home',
    GALLERY_2_ALT: 'Hail impact marks documented on a shingle slope in Arvada after a spring storm',
    GALLERY_3_ALT: 'New valley flashing and underlayment fitted on a Lakewood roof',
    GALLERY_4_ALT: 'Seamless gutters and replaced fascia on a finished Littleton roof',

    FORM_INTRO:
      'Tell us what you are seeing — a stain on the ceiling, granules in the gutter, or a letter from your insurer. We will book a free inspection and send you the photo report either way.',
    FORM_ENDPOINT: 'https://formspree.io/f/REPLACE_ME',

    LICENSE_LINE: 'Denver roofing license #XXXXX. Licensed, bonded and insured.',
  },
});
