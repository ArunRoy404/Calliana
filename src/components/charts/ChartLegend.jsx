import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_DOT, TONE_RING, TONE_TEXT } from "@/lib/tones";

/**
 * A chart's legend — one row per series or band, its marker in the series'
 * tone and its label beside it; wraps on a narrow panel.
 *
 * `marker`:
 * - `square` (default) — a filled swatch, mirroring a fill (the outcomes
 *   donut's segments).
 * - `ring` — a ringed dot, the timeline's marker (Peak Call Hours' bands).
 *
 * `toneLabels` tints each label in its tone (Peak Call Hours), rather than
 * the plain dark label (Calls Outcomes). `items` is `[{ id, label, tone }]`.
 */
export default function ChartLegend({
  items = [],
  marker = "square",
  toneLabels = false,
  className,
}) {
  return (
    <ul
      className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}
    >
      {items?.map((item) => {
        const tone = item?.tone ?? DEFAULT_TONE;

        return (
          <li
            key={item?.id}
            className={cn(
              "text-body-md flex items-center gap-2",
              toneLabels
                ? (TONE_TEXT?.[tone] ?? TONE_TEXT?.[DEFAULT_TONE])
                : "text-brand-black",
            )}
          >
            {marker === "ring" ? (
              <span
                aria-hidden
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-999 bg-surface-base ring-2",
                  TONE_RING?.[tone] ?? TONE_RING?.[DEFAULT_TONE],
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-999",
                    TONE_DOT?.[tone] ?? TONE_DOT?.[DEFAULT_TONE],
                  )}
                />
              </span>
            ) : (
              <span
                aria-hidden
                className={cn(
                  "size-4 shrink-0 rounded-4",
                  TONE_DOT?.[tone] ?? TONE_DOT?.[DEFAULT_TONE],
                )}
              />
            )}
            {item?.label}
          </li>
        );
      })}
    </ul>
  );
}
