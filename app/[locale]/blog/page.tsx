import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { listedPosts, postContent } from '@/content/blog';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { itemListSchema } from '@/lib/schema';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/Typography';
import { JsonLd } from '@/components/ui/JsonLd';
import { BlogGrid } from '@/components/blog/BlogGrid';

/**
 * /blog — the listing.
 *
 * It exists in every locale, and 404s in all of them while nothing is
 * published: a listing with nothing on it is a thin page under Google's own
 * definition, and the route ships before the first post does. The same
 * condition keeps /blog out of the sitemap and the Blog link out of the header
 * nav — see BLOG_POSTS in lib/seo/site.ts and navItems() in lib/nav.ts.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // No `locales` narrowing: the listing page's own copy is translated in
  // messages/*.json, so it genuinely exists in every locale the site serves.
  return buildMetadata({ locale, path: '/blog', namespace: 'blog.meta' });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const posts = listedPosts();
  if (posts.length === 0) notFound();

  const t = await getTranslations('blog');

  return (
    <>
      <JsonLd
        data={itemListSchema(
          locale,
          posts.map((post) => ({
            name: postContent(post, locale).title,
            path: `/blog/${post.slug}`,
          }))
        )}
      />

      <Section tone="alt">
        <Container size="wide" className="flex flex-col gap-12">
          <Reveal staggerChildren>
            <SectionHeading as="h1" eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
          </Reveal>

          <BlogGrid posts={posts} locale={locale} />
        </Container>
      </Section>
    </>
  );
}
