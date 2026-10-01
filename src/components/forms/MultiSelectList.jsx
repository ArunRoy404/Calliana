"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import UserAvatar from "@/components/atoms/UserAvatar";
import FieldShell from "@/components/forms/FieldShell";
import { cn } from "@/lib/cn";

const CHECK_ICON = { lucide: "Check", size: 16 };

/**
 * A checklist of selectable people — Figma 381:38131's "Assign Operators".
 * `options` is `[{ value, label, meta }]` (`meta` a small line under the name,
 * an extension here); `value` the selected ids. Generic — any multi-select of
 * named entries, not tied to routing.
 */
export default function MultiSelectList({
  label,
  helperText,
  options = [],
  value = [],
  onChange,
  className,
}) {
  function toggle(id) {
    const next = value?.includes(id)
      ? value?.filter((selected) => selected !== id)
      : [...(value ?? []), id];
    onChange?.(next);
  }

  return (
    <FieldShell
      label={`${label} (${value?.length ?? 0} selected)`}
      helperText={helperText}
      className={className}
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options?.map((option) => {
          const isSelected = value?.includes(option?.value);

          return (
            <button
              key={option?.value}
              type="button"
              onClick={() => toggle(option?.value)}
              className={cn(
                "flex min-w-0 cursor-pointer items-center gap-3 rounded-4 border border-solid p-2 text-left transition-colors duration-200 ease-out",
                isSelected
                  ? "border-border-focus bg-surface-selected"
                  : "border-border-default bg-surface-base hover:border-border-strong",
              )}
            >
              <UserAvatar name={option?.label} size="sm" />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-label-md truncate text-text-primary">
                  {option?.label}
                </span>
                {option?.meta && (
                  <span className="text-body-sm text-text-tertiary">{option?.meta}</span>
                )}
              </span>
              {isSelected && (
                <AssetIcon icon={CHECK_ICON} className="shrink-0 text-action-primary" />
              )}
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
}
