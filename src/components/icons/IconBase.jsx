/**
 * The shared `<svg>` wrapper every icon in this folder renders through —
 * Figma's vuesax/bold icon set, exported from the sidebar (Figma
 * 202:41243) and the topbar. `viewBox` matches the source (20×20 unless a
 * component overrides it); `fill="currentColor"` so a nav row's active/
 * inactive text colour tints its icon for free, the way the source file's
 * icons darken from `#475569` to `#0f172a` when a tab is active.
 */
export default function IconBase({ size = 20, viewBox = "0 0 20 20", className, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}
