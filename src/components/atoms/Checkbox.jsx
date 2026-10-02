"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_TEXT } from "@/lib/tones";

/**
 * Labelled checkbox.
 *
 * - default — the bare box and label, "Remember me" in Figma 43:8231.
 * - `row` — a bordered row with an optional leading `icon` (tinted by
 *   `iconTone`), the label, and the box at the right; the border takes the
 *   focus blue while checked — the dialer's "Auto-Record Outbound Call",
 *   Figma 202:38997.
 */
const VARIANT_CLASSES = {
  default: { root: "gap-2", label: "text-body-sm text-text-secondary" },
  row: {
    root: "gap-3 rounded-8 border border-solid border-border-default bg-surface-base p-3 transition-colors duration-200 ease-out hover:border-border-strong has-checked:border-border-focus",
    label: "text-body-md flex-1 text-text-primary",
  },
};

export default function Checkbox({
  label,
  variant = "default",
  icon,
  iconTone = DEFAULT_TONE,
  className,
  ...props
}) {
  const look = VARIANT_CLASSES?.[variant] ?? VARIANT_CLASSES?.default;
  const isRow = variant === "row";

  const box = (
    <input
      type="checkbox"
      className="size-4 shrink-0 cursor-pointer appearance-none rounded-4 border border-solid border-border-strong bg-surface-base transition-colors duration-200 ease-out checked:border-action-primary checked:bg-action-primary focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:outline-none"
      {...props}
    />
  );

  return (
    <label
      className={cn("flex cursor-pointer items-center", look?.root, className)}
    >
      {!isRow && box}
      {icon && (
        <AssetIcon
          icon={icon}
          className={TONE_TEXT?.[iconTone] ?? TONE_TEXT?.[DEFAULT_TONE]}
        />
      )}
      {label && <span className={look?.label}>{label}</span>}
      {isRow && box}
    </label>
  );
}
