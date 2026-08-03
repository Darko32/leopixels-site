import Image from 'next/image';
import type { DemoConfig } from '@/demos';
import { hasScreenshot } from '@/lib/screenshots';
import { cn } from '@/lib/utils';

/**
 * A demo screenshot, or a designed stand-in when the image has not been
 * captured yet. The placeholder is deliberately not a grey box — an empty
 * frame on a page selling web design would undercut the whole argument.
 */
export function DemoScreenshot({
  demo,
  variant = 'desktop',
  alt,
  priority = false,
  sizes,
  className,
}: {
  demo: DemoConfig;
  variant?: 'desktop' | 'mobile';
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const src = demo.meta.screenshots[variant];
  const aspect = variant === 'desktop' ? 'aspect-[16/10]' : 'aspect-[9/16]';

  if (hasScreenshot(src)) {
    return (
      <div className={cn('relative w-full overflow-hidden', aspect, className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? '(max-width: 768px) 100vw, 800px'}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return <DemoScreenshotPlaceholder demo={demo} className={cn(aspect, className)} />;
}

function DemoScreenshotPlaceholder({
  demo,
  className,
}: {
  demo: DemoConfig;
  className?: string;
}) {
  const hue = demo.tokens.BRAND_HUE;

  return (
    <div
      role="img"
      aria-label={`${demo.meta.business} — preview image pending`}
      className={cn('relative w-full overflow-hidden bg-ink', className)}
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(${hue} 45% 16%) 0%, hsl(${hue} 55% 9%) 55%, hsl(220 24% 7%) 100%)`,
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-center gap-3 p-[8%]">
        <span
          className="text-eyebrow uppercase"
          style={{ color: `hsl(${hue} 70% 72%)` }}
        >
          {demo.tokens.TRADE_SERVICE}
        </span>
        <span className="text-[clamp(1.1rem,3.4vw,2rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-canvas">
          {demo.tokens.BUSINESS_NAME}
        </span>
        <span className="text-[0.8125rem] text-body-invert">
          {demo.meta.city}, {demo.meta.state}
        </span>
        <span className="mt-2 w-fit rounded-full bg-[hsl(0_0%_100%/.14)] px-3 py-1.5 text-[0.8125rem] font-bold text-canvas">
          {demo.tokens.PHONE_DISPLAY}
        </span>
      </div>
    </div>
  );
}
