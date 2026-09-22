import AppImage from "@/components/atoms/AppImage";
import { cn } from "@/lib/cn";

/**
 * An icon sitting on a tinted tile.
 *
 * Each tone carries its own size, radius and fill, so call sites pass a tone
 * rather than restating those classes.
 */
const TONE_CLASSES = {
  /** Feature icons on the hero panel — Figma 43:8139. */
  primary: "size-10 rounded-10 bg-action-primary-hover",
  /** Routing-note badge in the auth card — Figma 43:8237. */
  success: "size-6 rounded-999 bg-status-success-bg",
};

export default function IconTile({ icon, tone = "primary", className }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden",
        TONE_CLASSES?.[tone],
        className,
      )}
    >
      <AppImage
        src={icon?.src}
        width={icon?.width}
        height={icon?.height}
      />
    </div>
  );
}
