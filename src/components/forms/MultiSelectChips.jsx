"use client";

import FieldShell from "@/components/forms/FieldShell";
import { cn } from "@/lib/cn";

/**
 * A row of toggleable chips — Figma 381:38131's "Linked Client Accounts".
 * `options` is `[{ value, label }]`; `value` the selected ids. Generic — any
 * multi-select where a dropdown would hide too much at once.
 */
export default function MultiSelectChips({
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
      <div className="flex flex-wrap gap-2">
        {options?.map((option) => {
          const isSelected = value?.includes(option?.value);

          return (
            <button
              key={option?.value}
              type="button"
              onClick={() => toggle(option?.value)}
              className={cn(
                "text-label-md cursor-pointer rounded-999 border border-solid px-3 py-1.5 transition-colors duration-200 ease-out",
                isSelected
                  ? "border-border-focus bg-surface-selected text-action-primary"
                  : "border-border-default bg-surface-base text-text-secondary hover:border-border-strong",
              )}
            >
              {option?.label}
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
}
