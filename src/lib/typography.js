/**
 * The project's type-scale utility classes, defined in `src/app/globals.css`.
 *
 * `cn()` needs to know about them: tailwind-merge otherwise reads `text-h3` as a
 * *colour* class, so a later `text-text-primary` would silently strip it and the
 * element would fall back to the browser's default size and line-height.
 *
 * Add a style to the type scale in globals.css → add its class name here.
 */
export const TYPOGRAPHY_CLASSES = [
  "text-display-l",
  "text-h2",
  "text-h3",
  "text-h4",
  "text-body-lg",
  "text-body-md",
  "text-body-sm",
  "text-label-lg",
  "text-label-md",
  "text-label-sm",
  "text-button",
];
