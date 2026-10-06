"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import FieldShell from "@/components/forms/FieldShell";
import { cn } from "@/lib/cn";

/**
 * A row of toggleable chips — Figma 381:38131's "Linked Client Accounts".
 * `options` is `[{ value, label }]`; `value` the selected ids. Generic — any
 * multi-select where a dropdown would hide too much at once.
 *
 * `variant="tag"` — squarer grey tags led by "+" (or a check once chosen),
 * the live call's "Select Call Categories"; `showCount={false}` keeps the
 * label as written instead of adding "(2 selected)".
 */
const CHIP_VARIANTS = {
  pill: {
    chip: "text-label-md rounded-999 px-3 py-1.5",
    idle: "border-border-default bg-surface-base text-text-secondary hover:border-border-strong",
  },
  tag: {
    chip: "text-body-md inline-flex items-center gap-1.5 rounded-4 px-2.5 py-1",
    idle: "border-border-default bg-action-secondary text-text-secondary hover:border-border-strong",
  },
};

const TAG_ICONS = {
  add: { lucide: "Plus", size: 14 },
  selected: { lucide: "Check", size: 14 },
};
export default function MultiSelectChips({
  label,
  helperText,
  options = [],
  value = [],
  onChange,
  variant = "pill",
  showCount = true,
  className,
}) {
  const look = CHIP_VARIANTS?.[variant] ?? CHIP_VARIANTS?.pill;

  function toggle(id) {
    const next = value?.includes(id)
      ? value?.filter((selected) => selected !== id)
      : [...(value ?? []), id];
    onChange?.(next);
  }

  return (
    <FieldShell
      label={showCount ? `${label} (${value?.length ?? 0} selected)` : label}
      helperText={helperText}
      className={className}
    >
      <div className="flex flex-wrap gap-2">
        {options?.map((option) => {
          const isSelected = value?.includes(option?.value);

          return (
            <button
              key={option?.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(option?.value)}
              className={cn(
                "cursor-pointer border border-solid transition-colors duration-200 ease-out",
                look?.chip,
                isSelected
                  ? "border-border-focus bg-surface-selected text-action-primary"
                  : look?.idle,
              )}
            >
              {variant === "tag" && (
                <AssetIcon
                  icon={isSelected ? TAG_ICONS?.selected : TAG_ICONS?.add}
                />
              )}
              {option?.label}
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
}
