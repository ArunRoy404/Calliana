import StatusDot from "@/components/atoms/StatusDot";
import { cn } from "@/lib/cn";
import {
  DEFAULT_TONE,
  TONE_DOT,
  TONE_OUTLINE,
  TONE_SURFACE,
  TONE_TAG_DOT,
  TONE_TEXT,
} from "@/lib/tones";

/**
 * Dot-and-label status. Three looks, one component:
 *
 * - `pill` — rounded tinted pill, Figma 191:16835 (dashboard panels).
 * - `tag` — squarer 20.5px tag with a medium label, Figma 198:22881 (tables).
 * - `outline` — a squared, bordered pill, Figma 198:34761 (panel headers).
 * - `plain` — the dot and label alone, for cells that need no fill.
 *
 * `showDot={false}` drops the dot for a label-only status ("Active").
 */
const VARIANT_CLASSES = {
  pill: "text-body-sm rounded-999 px-2 py-1",
  tag: "text-label-md h-[20.5px] rounded-6 px-2 py-0.5 leading-[16.5px]",
  outline: "text-label-md rounded-4 border border-solid px-2 py-1",
  plain: "text-body-sm",
};

export default function StatusBadge({
  label,
  tone = DEFAULT_TONE,
  variant = "pill",
  showDot = true,
  className,
}) {
  const isFilled = variant !== "plain";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap",
        VARIANT_CLASSES?.[variant] ?? VARIANT_CLASSES?.pill,
        isFilled && (TONE_SURFACE?.[tone] ?? TONE_SURFACE?.[DEFAULT_TONE]),
        TONE_TEXT?.[tone] ?? TONE_TEXT?.[DEFAULT_TONE],
        variant === "outline" &&
          (TONE_OUTLINE?.[tone] ?? TONE_OUTLINE?.[DEFAULT_TONE]),
        className,
      )}
    >
      {showDot && (
        <StatusDot
          tone={tone}
          palette={variant === "tag" ? TONE_TAG_DOT : TONE_DOT}
        />
      )}
      {label}
    </span>
  );
}
