import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

import { RADIUS_CLASSES } from "@/lib/radii";
import { TYPOGRAPHY_CLASSES } from "@/lib/typography";

/**
 * tailwind-merge classifies any unrecognised `text-*` class as a colour, which
 * would make a later `text-text-primary` silently drop `text-h3`. Registering
 * the type scale as font-size classes means they conflict with each other (as
 * they should) but never with a colour.
 *
 * The radius scale has the opposite problem: tailwind-merge does not recognise
 * `rounded-8` at all, so it never drops the `rounded-md` a shadcn primitive set
 * and the two fight in the stylesheet. Registering ours in the same group fixes
 * the override.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: { "font-size": TYPOGRAPHY_CLASSES, rounded: RADIUS_CLASSES },
  },
});

/**
 * Merge class names.
 *
 * `clsx` resolves conditionals/arrays/objects, then `tailwind-merge` drops
 * earlier classes that a later one conflicts with — so a component's defaults
 * can be overridden by a call site without both classes ending up in the DOM.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
