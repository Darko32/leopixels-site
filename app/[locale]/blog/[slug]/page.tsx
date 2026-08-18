import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  contentFaq,
  contentLocale,
  getBlogPost,
  hasTranslation,
  postContent,
  postLocales,
  readingMinutes,
  richToPlainText,
  visiblePosts,
} from '@/content/blog';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { absoluteUrl, languageAlternates, ogLocale } from '@/lib/seo';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { site } from '@/content/site';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DisplayHeading } from '@/components/ui/Typography';
import { JsonLd } from '@/components/ui/JsonLd';
import { PostBody, Paragraph } from '@/components/blog/PostBody';
import { formatPostDate } from '@/components/blog/date';

/**
 * /blog/<slug>
 *
 * ───────────────────────────────────────────────────────────────────────────
 * EVERY LOCALE GETS A PAGE. NOT EVERY LOCALE GETS AN hreflang.
 * ───────────────────────────────────────────────────────────────────────────
 * Posts are written in both languages. When one has not been translated yet,
 * its Macedonian URL still resolves — it serves the English text and says so on
 * the page. That is what keeps the header's language switcher honest: the
 * switcher maps a path across locales without knowing what lives at either end,
 * so any route that can 404 in one language is a broken control in the header
 * of every page. Rendering the fallback removes the failure instead of asking
 * the switcher to predict it.
 *
 * The SEO side is handled separately, and strictly:
 *   - `canonical` on a fallback page points at the English URL, so the two are
 *     never indexed as competing duplicates.
 *   - `languageAlternates` is built from `postLocales()`, which reads the
 *     translations that actually exist. An untranslated post advertises no `mk`
 *     alternate — the URL works, and no crawler is told it is a translation.
 *   - the sitemap lists only real translations, for the same reason.
 */
export function generateStaticParams() {
  return visiblePosts.flatMap((post) =>
    routing.locales.map((locale) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const post = getBlogPost(slug);
  if (!post) notFound();

  const path = `/blog/${slug}`;
  const content = postContent(post, locale);
  const translated = hasTranslation(post, locale);
  // A translated page is its own canonical. A fallback page is a second URL
  // showing English text, so it points at the English original instead.
  const canonical = absoluteUrl(translated ? locale : contentLocale(post, locale), path);
  const title = content.metaTitle ?? content.title;

  return {
    title,
    description: content.description,
    alternates: {
      canonical,
      languages: languageAlternates(path, postLocales(post)),
    },
    // Belt and braces: a draft only renders in `next dev`, and if one ever
    // reaches a deployed URL it must not be indexable on the way past.
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: 'article',
      siteName: site.name,
      title,
      description: content.description,
      url: canonical,
      // The language of the words on the page, which on a fallback is English.
      locale: ogLocale(contentLocale(post, locale)),
      alternateLocale: postLocales(post)
        .filter((other) => other !== contentLocale(post, locale))
        .map(ogLocale),
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
    twitter: { card: 'summary_large_image', title, description: content.description },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const post = getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const tCta = await getTranslations('cta');
  const tA11y = await getTranslations('a11y');

  const content = postContent(post, locale);
  const translated = hasTranslation(post, locale);
  const written = contentLocale(post, locale);
  const faq = contentFaq(content);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t('eyebrow'), path: '/blog' },
            { name: content.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema(written, {
            slug: post.slug,
            headline: content.title,
            description: content.description,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
          }),
          // Built from the rendered questions, so the page and its structured
          // data cannot state different answers.
          ...(faq
            ? [
                faqSchema(
                  faq.items.map((item) => ({
                    question: item.question,
                    answer: richToPlainText(item.answer),
                  }))
                ),
              ]
            : []),
        ]}
      />

      {/* --- title band --- */}
      <section className="bg-ink pb-[clamp(56px,8vw,90px)] pt-10 text-body-invert">
        <Container className="flex flex-col gap-8">
          <nav aria-label={tA11y('breadcrumb')}>
            <Link
              href="/blog"
              className="text-[0.875rem] font-semibold text-body-invert hover:text-canvas"
            >
              ← {tCta('backToBlog')}
            </Link>
          </nav>

          <Reveal staggerChildren className="flex flex-col gap-5">
            <div className="reveal flex flex-wrap items-center gap-2">
              <Badge tone="accent">{t(`formats.${post.format}`)}</Badge>
              {translated ? null : <Badge tone="invert">{t('inEnglish')}</Badge>}
              {post.draft ? <Badge tone="sample">{t('draftBadge')}</Badge> : null}
            </div>

            {/* lang on the heading and the article below: a Macedonian page
                showing English text must say so to a screen reader too, not
                only in the badge. */}
            <DisplayHeading
              as="h1"
              delay={1}
              className="max-w-[24ch] text-h2 text-canvas"
              lang={translated ? undefined : written}
            >
              {content.title}
            </DisplayHeading>

            <p
              className="reveal max-w-[60ch] text-lead text-body-invert"
              lang={translated ? undefined : written}
              style={{ '--i': 2 } as React.CSSProperties}
            >
              {content.description}
            </p>

            <p
              className="reveal text-[0.875rem] text-body-invert"
              style={{ '--i': 3 } as React.CSSProperties}
            >
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, locale)}</time>
              {' · '}
              {t('readingTime', { minutes: readingMinutes(content) })}
              {post.updatedAt ? (
                <>
                  {' · '}
                  {t('updated', { date: formatPostDate(post.updatedAt, locale) })}
                </>
              ) : null}
            </p>

            {/* The same honesty note /demos/[slug] carries when a demo site is
                in a different language than the case study around it. */}
            {translated ? null : (
              <p
                className="reveal max-w-[60ch] text-[0.875rem] text-body-invert/80"
                style={{ '--i': 4 } as React.CSSProperties}
              >
                {t('translationPending')}
              </p>
            )}
          </Reveal>
        </Container>
      </section>

      {/* --- the article --- */}
      <Section>
        <Container size="narrow">
          <article className="flex flex-col gap-6" lang={translated ? undefined : written}>
            {content.intro.map((paragraph, index) => (
              <Paragraph
                key={index}
                text={paragraph}
                // The opening paragraph answers the headline on its own. Set
                // larger because it is the passage an AI answer engine quotes.
                className={index === 0 ? 'text-lead text-text' : undefined}
              />
            ))}

            <PostBody blocks={content.body} />
          </article>
        </Container>
      </Section>

      {/* --- convert --- */}
      <Section tone="ink">
        <Container className="flex flex-col gap-7">
          <Reveal staggerChildren className="flex flex-col gap-6">
            <DisplayHeading delay={0} className="max-w-[18ch] text-canvas">
              {t('ctaTitle')}
            </DisplayHeading>
            <p
              className="reveal max-w-[52ch] text-lead text-body-invert"
              style={{ '--i': 1 } as React.CSSProperties}
            >
              {t('ctaLead')}
            </p>
            <div className="reveal flex flex-wrap gap-3" style={{ '--i': 2 } as React.CSSProperties}>
              <Button href="/#get-a-demo" size="lg">
                {tCta('freeDemo')}
              </Button>
              <Button href="/demos" variant="inverse" size="lg">
                {tCta('seeDemos')}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
