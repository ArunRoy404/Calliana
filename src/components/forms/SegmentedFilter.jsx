"use client";

import { cn } from "@/lib/cn";
import {
  CONTROL_MIN_SIZE_HEIGHT,
  CONTROL_SEGMENT_HEIGHT,
} from "@/lib/controls";

/**
 * A row of filter options as pill buttons rather than a dropdown — the tasks
 * toolbar's All / Due Today / Upcoming / … and the users toolbar's
 * All / Agents / Clients / Administrators. Same value/`onValueChange`
 * contract as `FilterSelect`, so `TableDirectory` can use either for one
 * filter (`filter.variant === "segmented"`).
 *
 * `variant`:
 * - `solid` (default) — a bordered strip, the active option filled primary.
 *   It wraps when its options outrun the bar, so a long set (tasks' five due
 *   filters) still fits a phone instead of pushing the page sideways. Each
 *   option keeps the control's height (`size`) whether its row is alone or
 *   wrapped.
 * - `soft` — bare, tighter text options that wrap rather than overflow, the
 *   active one on a light primary tint (the inbox's All / Unread / Needs
 *   Reply / Resolved). It has no control height: `size` applies to `solid`.
 */
const VARIANT_CLASSES = {
  solid: {
    strip:
      "flex-wrap rounded-4 border border-solid border-border-default bg-surface-base p-0.5",
    option: "px-3",
    active: "bg-action-primary text-text-on-primary",
    sized: true,
  },
  soft: {
    strip: "flex-wrap",
    option: "px-2 py-1",
    active: "bg-surface-selected text-action-primary",
    sized: false,
  },
};

export default function SegmentedFilter({
  options = [],
  value,
  onValueChange,
  size = "sm",
  variant = "solid",
  className,
}) {
  const classes = VARIANT_CLASSES?.[variant] ?? VARIANT_CLASSES?.solid;

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        classes?.strip,
        classes?.sized &&
          (CONTROL_MIN_SIZE_HEIGHT?.[size] ?? CONTROL_MIN_SIZE_HEIGHT?.sm),
        className,
      )}
    >
      {options?.map((option) => {
        const isActive = option?.value === value;

        return (
          <button
            key={option?.value}
            type="button"
            onClick={() => onValueChange?.(option?.value)}
            className={cn(
              "text-label-md shrink-0 cursor-pointer rounded-4 whitespace-nowrap transition-colors duration-200 ease-out",
              classes?.option,
              classes?.sized &&
                (CONTROL_SEGMENT_HEIGHT?.[size] ?? CONTROL_SEGMENT_HEIGHT?.sm),
              isActive
                ? classes?.active
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            {option?.label}
          </button>
        );
      })}
    </div>
  );
}
