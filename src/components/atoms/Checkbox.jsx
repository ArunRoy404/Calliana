"use client";

import { cn } from "@/lib/cn";

/** Labelled checkbox — the "Remember me" control in Figma 43:8231. */
export default function Checkbox({ label, className, ...props }) {
  return (
    <label
      className={cn("flex cursor-pointer items-center gap-2", className)}
    >
      <input
        type="checkbox"
        className="size-4 shrink-0 cursor-pointer appearance-none rounded-4 border border-solid border-border-strong bg-surface-base transition-colors duration-200 ease-out checked:border-action-primary checked:bg-action-primary focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:outline-none"
        {...props}
      />
      {label && (
        <span className="text-body-sm text-text-secondary">{label}</span>
      )}
    </label>
  );
}
