import { cn } from "@/lib/cn";
import { TEXT_WEIGHT_CLASSES } from "@/lib/textWeight";

const SECONDARY_COLOR_CLASSES = {
  info: "text-status-info",
  secondary: "text-text-secondary",
};

/**
 * Two-line cell: a primary value over a small secondary one — Figma
 * 198:22875 (agent name over extension, secondary in info-blue like a phone
 * link). `column.primary` and `column.secondary` name the row fields.
 *
 * `column.primaryWeight` (`"regular"|"medium"|"semibold"`) overrides the
 * default regular primary text for a column whose spec is bolder (the
 * routing table's queue name is SemiBold, not the agents table's Regular).
 * `column.secondaryColor` (`"info"|"secondary"`, default `"info"`) swaps
 * the phone-link blue for the plain secondary gray a description or
 * strategy line wants instead — rule 30.
 */
export default function StackCell({ column, row }) {
  return (
    <span className="flex w-full min-w-0 flex-col gap-1">
      <span
        className={cn(
          "text-body-md truncate text-brand-black",
          column?.primaryWeight && TEXT_WEIGHT_CLASSES?.[column?.primaryWeight],
        )}
      >
        {row?.[column?.primary]}
      </span>
      {row?.[column?.secondary] && (
        <span
          className={cn(
            "text-label-sm truncate",
            SECONDARY_COLOR_CLASSES?.[column?.secondaryColor] ??
              SECONDARY_COLOR_CLASSES?.info,
          )}
        >
          {row?.[column?.secondary]}
        </span>
      )}
    </span>
  );
}
