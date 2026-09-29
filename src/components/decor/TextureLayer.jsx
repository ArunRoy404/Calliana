import AppImage from "@/components/atoms/AppImage";
import { cn } from "@/lib/cn";

/**
 * A faint image behind a surface — the table's circuitry (Figma 198:22839),
 * a stat tile's grain (198:31279), a detail page's backdrop (198:31247).
 *
 * The parent is `relative isolate`; this fills it underneath its content.
 * `className` carries the layer's strength (`opacity-17`), since the exports
 * are flat images with no alpha. `scrim` lays the page canvas colour over the
 * image, as the detail page's 76% wash does.
 */
export default function TextureLayer({ src, scrim = false, className }) {
  if (!src) return null;

  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <AppImage
        src={src}
        fill
        sizes="100vw"
        className={cn("object-cover", className)}
      />
      {scrim && <span className="absolute inset-0 bg-surface-canvas/76" />}
    </span>
  );
}
