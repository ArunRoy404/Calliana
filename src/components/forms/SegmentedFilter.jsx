"use client";

import { cn } from "@/lib/cn";
import { CONTROL_SIZE_HEIGHT } from "@/lib/controls";

/**
 * A row of filter options as pill buttons rather than a dropdown — the tasks
 * toolbar's All / Due Today / Upcoming / … and the users toolbar's
 * All / Agents / Clients / Administrators. Same value/`onValueChange`
 * contract as `FilterSelect`, so `TableDirectory` can use either for one
 * filter (`filter.variant === "segmented"`).
 */
export default function SegmentedFilter({ options = [], value, onValueChange, size = "sm", className }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-4 border border-solid border-border-default bg-surface-base p-0.5",
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
              "text-label-md h-full shrink-0 cursor-pointer rounded-4 px-3 whitespace-nowrap transition-colors duration-200 ease-out",
              isActive
                ? "bg-action-primary text-text-on-primary"
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
