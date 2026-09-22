import AppImage from "@/components/atoms/AppImage";
import { cn } from "@/lib/cn";

/**
 * Photographic backdrop for the hero panel — Figma 43:7777.
 *
 * A flat wash carries the photo at reduced opacity; that is what mutes the
 * image enough for the white copy to read over it.
 */
export default function PhotoBackdrop({
  src,
  alt = "",
  imageClassName,
  opacityClassName,
}) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 bg-auth-panel-scrim" />
      <div
        aria-hidden
        className={cn("absolute inset-0 overflow-hidden", opacityClassName)}
      >
        <AppImage
          src={src}
          alt={alt}
          fill
          priority
          sizes="50vw"
          className={imageClassName}
        />
      </div>
    </>
  );
}
