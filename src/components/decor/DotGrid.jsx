import AppImage from "@/components/atoms/AppImage";
import { cn } from "@/lib/cn";

/** Halftone dot grid in the panel corners — Figma 43:7778. */
export default function DotGrid({ rows = 5, columns = 7, dot, className }) {
  return (
    <div className={cn("absolute flex flex-col gap-2", className)}>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex w-full items-center justify-center gap-2.5"
        >
          {Array.from({ length: columns }, (_, dotIndex) => (
            <AppImage
              key={dotIndex}
              src={dot?.src}
              width={dot?.width}
              height={dot?.height}
              className="shrink-0"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
