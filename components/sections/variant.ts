/**
 * How a section is being rendered.
 *
 * `page`   — the section owns a route of its own (/how-it-works, /pricing,
 *            /faq). Its heading is that page's <h1>, and it carries the full
 *            detail and any structured data.
 * `teaser` — the condensed version on the homepage: same design, the short
 *            version of the content, and a link through to the full page.
 *
 * Both live in one component rather than in a teaser copy on purpose. The two
 * versions share a design and a set of message keys, and a duplicate is the
 * copy that drifts.
 */
export type SectionVariant = 'page' | 'teaser';
