/**
 * Font-weight overrides a table cell can ask for on top of its type-scale
 * class — `font-*` utilities live in Tailwind's utilities layer, the type
 * scale's own weight in `@layer components`, so a utility reliably wins
 * regardless of class order (rule 30). Shared by `TextCell` and `StackCell`
 * so the map exists once.
 */
export const TEXT_WEIGHT_CLASSES = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};
