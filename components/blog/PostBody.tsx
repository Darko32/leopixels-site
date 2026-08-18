import { Fragment } from 'react';
import { isInlineLink, type BlogBlock, type InlineNode, type RichText } from '@/content/blog';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

/**
 * The block renderer. One switch, no HTML strings, no markdown parser.
 *
 * It takes already-resolved content: the route picks the language, this file
 * renders it. Keeping locale resolution out of here is what lets the same
 * component render a Macedonian post and the English fallback of an
 * untranslated one without knowing the difference.
 *
 * Every link routes through this file rather than being written into prose, so
 * two rules hold for the whole blog without anyone having to remember them: an
 * internal link keeps its `/mk` prefix because it goes through the locale-aware
 * Link, and an external one always leaves with `rel="noopener"`.
 */

/** Prose measure. Long lines are the fastest way to make an article unreadable. */
const MEASURE = 'max-w-[68ch]';

/** Body headings, sized for a 68ch column rather than a full-bleed section. */
const H2 = 'text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.15] tracking-[-0.02em] text-text';

function InlineText({ nodes }: { nodes: RichText }) {
  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>{renderInline(node)}</Fragment>
      ))}
    </>
  );
}

function renderInline(node: InlineNode) {
  if (typeof node === 'string') return node;

  if (!isInlineLink(node)) {
    return <strong className="font-bold text-text">{node.text}</strong>;
  }

  const style =
    'font-semibold text-accent-deep underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent-deep';

  // Relative paths are internal — the same test lib/seo uses. Internal links go
  // through next-intl's Link so the locale prefix is never hand-written.
  if (node.href.startsWith('/')) {
    return (
      <Link href={node.href} title={node.title} className={style}>
        {node.text}
      </Link>
    );
  }

  return (
    <a href={node.href} title={node.title} rel="noopener" target="_blank" className={style}>
      {node.text}
    </a>
  );
}

export function Paragraph({ text, className }: { text: RichText; className?: string }) {
  return (
    <p className={cn(MEASURE, 'text-body', className)}>
      <InlineText nodes={text} />
    </p>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.kind) {
    case 'paragraph':
      return <Paragraph text={block.text} />;

    case 'heading': {
      const Tag = block.level === 2 ? 'h2' : 'h3';
      return (
        <Tag className={cn(MEASURE, block.level === 2 ? `mt-6 ${H2}` : 'mt-4 text-h3 text-text')}>
          {block.text}
        </Tag>
      );
    }

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag
          className={cn(
            MEASURE,
            'flex flex-col gap-3 text-body',
            block.ordered ? 'list-decimal' : 'list-disc',
            'pl-6 marker:font-bold marker:text-accent-deep'
          )}
        >
          {block.items.map((item, index) => (
            <li key={index} className="pl-1">
              <InlineText nodes={item} />
            </li>
          ))}
        </Tag>
      );
    }

    case 'keyFacts':
      return (
        <ul
          className={cn(
            MEASURE,
            'flex flex-col gap-2 rounded-card border border-line bg-canvas-alt p-6 text-body'
          )}
        >
          {block.items.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'faq':
      return (
        <div className={cn(MEASURE, 'flex flex-col gap-6')}>
          <h2 className={H2}>{block.heading}</h2>
          <p className="text-body">
            <InlineText nodes={block.intro} />
          </p>
          <div className="flex flex-col gap-6">
            {block.items.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 border-t border-line pt-6">
                <h3 className="text-h3 text-text">{item.question}</h3>
                <p className="text-body">
                  <InlineText nodes={item.answer} />
                </p>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

export function PostBody({ blocks }: { blocks: readonly BlogBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}
