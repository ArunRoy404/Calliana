"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Icon from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";
import { TONE_TEXT } from "@/lib/tones";

/**
 * Labelled checkbox — the "Remember me" control in Figma 43:8231.
 *
 * `variant`:
 * - `inline` (default) — the box, then its label.
 * - `row` — a canvas-tinted hairline row with the label (and an optional
 *   leading `icon`, tinted by `iconTone`) on the left and the box on the
 *   right: the dialer's "Auto-Record Outbound Call".
 *
 * The box draws its own tick when checked.
 */
const VARIANT_CLASSES = {
  inline: "gap-2",
  row: "flex-row-reverse justify-between gap-3 rounded-8 border border-solid border-border-default bg-surface-canvas p-3",
};

export default function Checkbox({
  label,
  icon,
  iconTone,
  variant = "inline",
  className,
  ...props
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center",
        VARIANT_CLASSES?.[variant] ?? VARIANT_CLASSES?.inline,
        className,
      )}
    >
      <span className="relative flex size-4 shrink-0">
        <input
          type="checkbox"
          className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-4 border border-solid border-border-strong bg-surface-base transition-colors duration-200 ease-out checked:border-action-primary checked:bg-action-primary focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:outline-none"
          {...props}
        />
        <Icon
          name="Check"
          size={12}
          strokeWidth={3}
          className="pointer-events-none absolute inset-0 m-auto hidden text-text-on-primary peer-checked:block"
        />
      </span>
      {(label || icon) && (
        <span className="text-body-sm flex min-w-0 items-center gap-2 text-text-secondary">
          {icon && <AssetIcon icon={icon} className={TONE_TEXT?.[iconTone]} />}
          {label}
        </span>
      )}
    </label>
  );
}
