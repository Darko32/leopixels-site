import type { CSSProperties } from 'react';
import type { BlogPost } from '@/content/blog';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';
import { BlogCard } from './BlogCard';

/**
 * Column count follows the post count, as DemoGrid does: the blog launches with
 * one post, and a lone card in a three-column grid reads as an unfinished site.
 */
export function BlogGrid({ posts, locale }: { posts: BlogPost[]; locale: Locale }) {
  if (posts.length === 0) return null;

  const single = posts.length === 1;

  return (
    <Reveal
      staggerChildren
      className={cn(
        'grid items-stretch gap-6',
        single && 'grid-cols-1',
        posts.length === 2 && 'md:grid-cols-2',
        posts.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {posts.map((post, index) => (
        <div key={post.slug} className="reveal min-w-0" style={{ '--i': index } as CSSProperties}>
          <BlogCard post={post} locale={locale} layout={single ? 'feature' : 'grid'} />
        </div>
      ))}
    </Reveal>
  );
}
