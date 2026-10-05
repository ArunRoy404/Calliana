import { cn } from "@/lib/cn";
import { TEXT_WEIGHT_CLASSES } from "@/lib/textWeight";
import { DEFAULT_TONE, TONE_TEXT } from "@/lib/tones";

const SIZE_CLASSES = {
  sm: "text-label-sm",
  md: "text-label-md",
  lg: "text-body-md",
};

/**
 * Plain value — Figma 198:22879. `column.wrap` lets long values break rather
 * than overflow a narrow column, at word boundaries where there are any (a
 * task title) and mid-word only where there aren't (an email address);
 * `column.truncate` keeps it to one line ending in an ellipsis instead (the
 * client requests' titles, "Schedule follow-up call with Dr. Rodrigu…").
 *
 * `column.tone` (a `src/lib/tones.js` key), `column.weight`
 * (`"regular"|"medium"|"semibold"`) and `column.size` (`"sm"|"md"|"lg"`,
 * default `"md"`) override the default black/medium/12px look for a column
 * whose Figma spec sizes, tints or weights it differently from its
 * neighbours — the audit log's `TIMESTAMP` runs 14px SemiBold where every
 * other column is 12px Medium; `AFFECTED RESOURCE`/`IP ORIGIN` are
 * info-blue; `DESCRIPTION` is tertiary gray and regular weight (rule 30).
 * `font-*` utilities always win over the type scale's own weight (utilities
 * layer beats components layer), so this stays reliable however it combines.
 */
export default function TextCell({ column, row }) {
  return (
    <span
      className={cn(
        SIZE_CLASSES?.[column?.size] ?? SIZE_CLASSES?.md,
        column?.tone
          ? (TONE_TEXT?.[column?.tone] ?? TONE_TEXT?.[DEFAULT_TONE])
          : "text-brand-black",
        column?.weight && TEXT_WEIGHT_CLASSES?.[column?.weight],
        column?.truncate
          ? "min-w-0 truncate"
          : column?.wrap
            ? "wrap-break-word"
            : "whitespace-nowrap",
      )}
    >
      {row?.[column?.field]}
    </span>
  );
}
