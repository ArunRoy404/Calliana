import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

import { TYPOGRAPHY_CLASSES } from "@/lib/typography";

/**
 * tailwind-merge classifies any unrecognised `text-*` class as a colour, which
 * would make a later `text-text-primary` silently drop `text-h3`. Registering
 * the type scale as font-size classes means they conflict with each other (as
 * they should) but never with a colour.
 */
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": TYPOGRAPHY_CLASSES } },
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
