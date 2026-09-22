import AppImage from "@/components/atoms/AppImage";
import { logoData } from "@/data/brand/logo.data";
import { cn } from "@/lib/cn";

/** Calliana wordmark — Figma 451:29095. */
export default function CallianaLogo({ className }) {
  return (
    <div
      role="img"
      aria-label="Calliana"
      className={cn("relative shrink-0", className)}
      style={{ width: logoData?.box?.width, height: logoData?.box?.height }}
    >
      {logoData?.layers?.map((layer) => (
        <AppImage
          key={layer?.id}
          src={layer?.src}
          width={layer?.width}
          height={layer?.height}
          priority
          className={cn("absolute", layer?.className)}
        />
      ))}
    </div>
  );
}
