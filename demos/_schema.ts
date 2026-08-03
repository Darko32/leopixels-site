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
  /** Appears on the homepage grid. */
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
  HERO_CARD_LINE: string;
  BADGE_1: string;
  BADGE_2: string;
  BADGE_3: string;

  SERVICES_INTRO: string;
  SERVICE_1_TITLE: string;
  SERVICE_1_DESC: string;
  SERVICE_2_TITLE: string;
  SERVICE_2_DESC: string;
  SERVICE_3_TITLE: string;
  SERVICE_3_DESC: string;
  SERVICE_4_TITLE: string;
  SERVICE_4_DESC: string;
  SERVICE_5_TITLE: string;
  SERVICE_5_DESC: string;
  SERVICE_6_TITLE: string;
  SERVICE_6_DESC: string;

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
  /** Widget mount copy. Never pasted review text — see 03_BUILD_SYSTEM.md §7. */
  REVIEWS_WIDGET: string;

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
