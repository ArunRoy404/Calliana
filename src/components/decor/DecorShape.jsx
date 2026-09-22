import AppImage from "@/components/atoms/AppImage";
import { cn } from "@/lib/cn";

/**
 * One absolutely-positioned decorative vector.
 *
 * Figma wraps rotated shapes in a centring box so the rotation pivots about the
 * box rather than the artwork, which is why the box and the rotation are two
 * separate elements here. `innerClassName` handles the rare shape that is
 * offset inside its box instead of centred.
 */
export default function DecorShape({
  src,
  width,
  height,
  boxClassName,
  rotateClassName,
  innerClassName,
  imageClassName,
}) {
  const image = (
    <AppImage
      src={src}
      width={width}
      height={height}
      className={imageClassName}
    />
  );

  return (
    <div
      className={cn(
        "absolute flex items-center justify-center",
        boxClassName,
      )}
    >
      <div className={cn("flex-none", rotateClassName)}>
        {innerClassName ? (
          <div className={cn("relative", innerClassName)}>{image}</div>
        ) : (
          image
        )}
      </div>
    </div>
  );
}
