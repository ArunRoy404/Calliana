import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_DOT } from "@/lib/tones";

/** Small solid dot carrying a semantic tone. */
export default function StatusDot({ tone = DEFAULT_TONE, className }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-1.5 shrink-0 rounded-999",
        TONE_DOT?.[tone] ?? TONE_DOT?.[DEFAULT_TONE],
        className,
      )}
    />
  );
}
