/**
 * A demo is one typed config file.
 *
 * `meta` drives the React case-study pages on leopixels.com.
 * `tokens` fills demos/_template/index.template.html to produce the actual site.
 *
 * Both live in the same object so the case study and the site it describes can
 * never drift apart. The remaining template tokens (SITE_ORIGIN, ASSET_BASE,
 * CANONICAL_PATH, ROBOTS_TAG, DEMO_BANNER, DEMO_WATERMARK) are supplied by the
 * renderer per build mode — see scripts/render-demo.ts.
 */

export const TRADES = ['plumbing', 'hvac', 'electrical', 'roofing', 'auto'] as const;
export type Trade = (typeof TRADES)[number];

/** English is required; Macedonian falls back to it when absent. */
export type Localized = { en: string; mk?: string };

export type BuildMode = 'demo' | 'production';

export interface DemoMeta {
  /** The business name. Never translated — a name is a name. */
  business: string;
  trade: Trade;
  city: string;
  state: string;
  /** One line, used on cards and as the case-study standfirst. */
  tagline: Localized;
  /** 250+ words of original prose. Thin case studies are an SEO liability. */
  brief: Localized;
  /** What the build does well — rendered as a checklist. */
  highlights: Localized[];
  /**
   * Measured, never estimated. Every field is optional and the UI renders only
   * what is present — leaving a metric out is always correct, filling one in
   * with a guess never is. `pagespeed` and `lcp` require a real PageSpeed run
   * against the deployed URL, so they stay undefined until that has happened.
   */
  metrics: {
    pagespeed?: number;
    lcp?: string;
    weight?: string;
    buildTime?: string;
  };
  /** Renders the "Sample build — fictional business" badge. */
  isFictional: boolean;
  /** Eligible for the homepage grid — capped at 3 regardless, see getFeaturedDemos(). */
  featured: boolean;
  /**
   * The language of the demo SITE itself (not the case study). Always 'en'
   * today — the demo sites are US trades sites for US customers. Exists so a
   * Macedonian-market demo could be filtered in later without a refactor.
   */
  siteLocale: 'en';
  screenshots: {
    desktop: string;
    mobile: string;
    alt: Localized;
  };
}

/** Every content token in index.template.html. */
export interface SiteTokens {
  BUSINESS_NAME: string;
  /** Default production domain. `demo:export --domain` overrides it. */
  DOMAIN: string;
  TRADE: string;
  TRADE_SERVICE: string;
  SCHEMA_TYPE: 'Plumber' | 'HVACBusiness' | 'Electrician' | 'RoofingContractor' | 'AutoRepair';
  /** One number re-skins the whole palette: HVAC ~195, electrical ~35, roofing ~15. */
  BRAND_HUE: string;
  /**
   * Which layout treatment the shared template renders, as `<body class="v-…">`.
   *
   * Enumerated on purpose. Demos sold as one product line must not read as the
   * same site with the nouns swapped, but they also must not drift into
   * one-off designs nobody can maintain — so variation is a fixed menu rather
   * than free rein, and every variant is defined in one block of the template.
   *
   * What a variant may change: hero composition, card and section treatment,
   * heading alignment, shape language, which bands are dark.
   *
   * What a variant may NOT change — the invariants in 10_TEMPLATE_GUIDE.md
   * §"What's built in" and the section order in 03_BUILD_SYSTEM.md §3, which is
   * ordered the way someone in an emergency actually scans: tap-to-call as the
   * largest mobile element, the sticky mobile bar, the emergency bar directly
   * under the hero, the four-field form, one H1, the schema block, 52px touch
   * targets.
   *
   * - `classic` — the original build. Centred headings, 3-up service cards,
   *   floating hero card, soft 12px radii.
   * - `voltage` — squared 4px radii, left-aligned headings, the hero card
   *   restated as a full-width dispatch bar, services as accent-rule rows,
   *   and a dark "why us" band.
   * - `climate` — centred hero, pill-soft 18px radii, roomier vertical
   *   rhythm, services as 2-up horizontal tiles with circular icons, and the
   *   "why us" block as a 4-across tinted comfort strip.
   * - `ridgeline` — dark header, image-dominant hero with the content bottom-
   *   anchored and the hero card seated flush as a glass storm bar, services on
   *   a 6-column asymmetric grid of dark project tiles with oversized watermark
   *   glyphs, the "why us" block read as a connected process timeline, the
   *   gallery promoted to a banded asymmetric proof wall, and the quote section
   *   split two-column instead of a centred form card.
   */
  LAYOUT_VARIANT: 'classic' | 'voltage' | 'climate' | 'ridgeline';
  /**
   * Inner SVG markup for the header/footer wordmark, drawn on a 24×24 viewBox
   * and inheriting `currentColor`. A trade is recognised by its glyph before
   * its copy is read, so this is per-demo rather than baked into the template.
   */
  LOGO_MARK: string;

  CITY: string;
  STATE: string;
  COUNTRY_CODE: string;
  STREET_ADDRESS: string;
  POSTAL_CODE: string;
  LAT: string;
  LNG: string;

  PHONE_DISPLAY: string;
  PHONE_RAW: string;
  EMAIL: string;
  PRICE_RANGE: string;

  HOURS_SHORT: string;
  HOURS_FULL: string;
  META_DESCRIPTION: string;

  HERO_SUBLINE: string;
  /** Heading on the hero's call card. A token because not every trade is an
   *  emergency trade — roofing opens with a free inspection, not a callout. */
  HERO_CARD_TITLE: string;
  HERO_CARD_LINE: string;
  /** The red bar under the hero. Name the emergency this trade is called for. */
  EMERGENCY_LINE: string;
  BADGE_1: string;
  BADGE_2: string;
  BADGE_3: string;

  SERVICES_INTRO: string;
  /**
   * Each service card carries its own glyph — inner SVG markup on a 24×24
   * viewBox, inheriting `currentColor`. Same reason as LOGO_MARK: shared
   * layout, trade-specific iconography.
   */
  SERVICE_1_TITLE: string;
  SERVICE_1_DESC: string;
  SERVICE_1_ICON: string;
  SERVICE_2_TITLE: string;
  SERVICE_2_DESC: string;
  SERVICE_2_ICON: string;
  SERVICE_3_TITLE: string;
  SERVICE_3_DESC: string;
  SERVICE_3_ICON: string;
  SERVICE_4_TITLE: string;
  SERVICE_4_DESC: string;
  SERVICE_4_ICON: string;
  SERVICE_5_TITLE: string;
  SERVICE_5_DESC: string;
  SERVICE_5_ICON: string;
  SERVICE_6_TITLE: string;
  SERVICE_6_DESC: string;
  SERVICE_6_ICON: string;

  WHY_HEADING: string;
  WHY_1_TITLE: string;
  WHY_1_DESC: string;
  WHY_2_TITLE: string;
  WHY_2_DESC: string;
  WHY_3_TITLE: string;
  WHY_3_DESC: string;
  WHY_4_TITLE: string;
  WHY_4_DESC: string;

  AREA_INTRO: string;
  AREA_1: string;
  AREA_2: string;
  AREA_3: string;
  AREA_4: string;
  AREA_5: string;
  AREA_6: string;
  AREA_7: string;
  AREA_8: string;
  MAP_EMBED_URL: string;

  STAR_RATING: string;
  REVIEW_COUNT: string;
  /**
   * Three reviews, rendered as cards.
   *
   * On a SAMPLE build these are written for the fictional business and the page
   * carries the "not a real business" banner. On a CLIENT build they must be
   * the client's own customers, quoted with permission — never text copied out
   * of a Google Business Profile, which belongs to the reviewer and is
   * restricted by Google's terms. See 03_BUILD_SYSTEM.md §7. The handover
   * checklist in scripts/render-demo.ts repeats this to the client.
   */
  REVIEW_1_TEXT: string;
  REVIEW_1_NAME: string;
  REVIEW_1_AREA: string;
  REVIEW_2_TEXT: string;
  REVIEW_2_NAME: string;
  REVIEW_2_AREA: string;
  REVIEW_3_TEXT: string;
  REVIEW_3_NAME: string;
  REVIEW_3_AREA: string;

  GALLERY_1_ALT: string;
  GALLERY_2_ALT: string;
  GALLERY_3_ALT: string;
  GALLERY_4_ALT: string;

  FORM_INTRO: string;
  FORM_ENDPOINT: string;
  /** Ships as #XXXXX so an unfilled licence number is obvious, never invented. */
  LICENSE_LINE: string;
}

export interface DemoConfig {
  slug: string;
  meta: DemoMeta;
  tokens: SiteTokens;
}

/** Identity helper — gives editor completion and catches typos in config files. */
export function defineDemo(config: DemoConfig): DemoConfig {
  return config;
}

/** Resolves a Localized value, falling back to English. */
export function localized(value: Localized, locale: string): string {
  if (locale === 'mk' && value.mk) return value.mk;
  return value.en;
}
