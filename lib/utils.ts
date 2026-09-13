import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * The theme's type scale is named (`text-display`, `text-h2`, `text-lead`…)
 * rather than numeric, and tailwind-merge cannot tell those names apart from
 * colour names — it read `text-display` as a *colour* and dropped it whenever a
 * real colour followed, so `cn('text-display', 'text-canvas')` silently emitted
 * only `text-canvas` and every heading on the dark bands fell back to 17px.
 * Declaring the scale here is what keeps size and colour in separate conflict
 * groups. Add any new `--text-*` token to this list.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['display', 'h2', 'h3', 'lead', 'small', 'caption', 'eyebrow'] },
      ],
    },
  },
});

/** Conditional class names with later Tailwind utilities winning conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
