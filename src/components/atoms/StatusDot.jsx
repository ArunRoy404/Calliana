import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_DOT } from "@/lib/tones";

/**
 * Small solid dot carrying a semantic tone. `palette` swaps the tone → colour
 * map for a context whose design shades its dots differently (tag badges).
 */
export default function StatusDot({
  tone = DEFAULT_TONE,
  palette = TONE_DOT,
  className,
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-1.5 shrink-0 rounded-999",
        palette?.[tone] ?? palette?.[DEFAULT_TONE],
        className,
      )}
    />
  );
}
