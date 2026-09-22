import Image from "next/image";

import { cn } from "@/lib/cn";

/**
 * The only image primitive in the project — raw `<img>` is never used.
 *
 * `next/image` needs integer dimensions, but the design carries fractional
 * sizes straight out of Figma, so the rounded values go to the tag (for the
 * aspect-ratio hint) while the exact values are applied as CSS. SVG sources are
 * served unoptimized by Next automatically; raster images get the full pipeline.
 */
export default function AppImage({
  src,
  alt = "",
  width,
  height,
  fill = false,
  className,
  style,
  ...props
}) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("block", className)}
        style={style}
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={Math.round(width ?? 0)}
      height={Math.round(height ?? 0)}
      className={cn("block", className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}
