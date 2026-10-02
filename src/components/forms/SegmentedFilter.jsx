"use client";

import { cn } from "@/lib/cn";
import { CONTROL_SIZE_HEIGHT } from "@/lib/controls";

/**
 * A row of filter options as pill buttons rather than a dropdown — the tasks
 * toolbar's All / Due Today / Upcoming / … and the users toolbar's
 * All / Agents / Clients / Administrators. Same value/`onValueChange`
 * contract as `FilterSelect`, so `TableDirectory` can use either for one
 * filter (`filter.variant === "segmented"`).
 *
 * `variant`:
 * - `boxed` (default) — options in a hairline box, the active one filled
 *   primary blue;
 * - `soft` — loose pills with no box, the active one a pale blue tint (the
 *   inbox's All / Unread / Needs Reply / Resolved, Figma 167:51527).
 */
const VARIANTS = {
  boxed: {
    root: "gap-1 rounded-4 border border-solid border-border-default bg-surface-base p-0.5",
    option: "px-3",
    active: "bg-action-primary text-text-on-primary",
    idle: "text-text-secondary hover:text-text-primary",
  },
  soft: {
    root: "gap-0.5",
    option: "px-2",
    active: "bg-surface-selected text-action-primary",
    idle: "text-text-secondary hover:bg-surface-subtle hover:text-text-primary",
  },
};

export default function SegmentedFilter({
  options = [],
  value,
  onValueChange,
  variant = "boxed",
  size = "sm",
  className,
}) {
  const look = VARIANTS?.[variant] ?? VARIANTS?.boxed;

  return (
    <div
      className={cn(
        "flex items-center",
        look?.root,
        CONTROL_SIZE_HEIGHT?.[size] ?? CONTROL_SIZE_HEIGHT?.sm,
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
              "text-label-md h-full shrink-0 cursor-pointer rounded-4 whitespace-nowrap transition-colors duration-200 ease-out",
              look?.option,
              isActive ? look?.active : look?.idle,
            )}
          >
            {option?.label}
          </button>
        );
      })}
    </div>
  );
}
