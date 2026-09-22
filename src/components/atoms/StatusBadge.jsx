import StatusDot from "@/components/atoms/StatusDot";
import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_SURFACE, TONE_TEXT } from "@/lib/tones";

/**
 * Dot-and-label status pill — Figma 191:16835.
 * `plain` drops the tinted pill, for table cells that show the label alone.
 */
export default function StatusBadge({
  label,
  tone = DEFAULT_TONE,
  plain = false,
  className,
}) {
  return (
    <span
      className={cn(
        "text-body-sm inline-flex items-center gap-1.5 whitespace-nowrap",
        !plain && "rounded-999 px-2 py-1",
        !plain && (TONE_SURFACE?.[tone] ?? TONE_SURFACE?.[DEFAULT_TONE]),
        TONE_TEXT?.[tone] ?? TONE_TEXT?.[DEFAULT_TONE],
        className,
      )}
    >
      <StatusDot tone={tone} />
      {label}
    </span>
  );
}
