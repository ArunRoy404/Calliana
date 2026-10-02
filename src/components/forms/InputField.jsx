"use client";

import { useId, useState } from "react";

import AppImage from "@/components/atoms/AppImage";
import AssetIcon from "@/components/atoms/AssetIcon";
import FieldShell from "@/components/forms/FieldShell";
import { cn } from "@/lib/cn";

/**
 * InputField — Figma component 8:34.
 * States: Default, Focused, Filled, Error, Success, Disabled.
 *
 * The reveal toggle is the one piece of local `useState` here: it is purely
 * visual and nothing outside this field could ever need it.
 *
 * `trailingIcon` (`{ src, width, height }` or `{ lucide, size }`, rule 25)
 * sits at the right of the box — the clock on a working-hours time field,
 * Figma 198:32497. A `date` or `time` field opens its native picker from
 * anywhere in the box (rule 32).
 */
const PICKER_TYPES = ["date", "time"];

const REVEAL_ICON = { src: "/icons/eye-slash.svg", width: 16, height: 16 };

export default function InputField({
  label,
  helperText,
  error,
  success = false,
  type = "text",
  trailingIcon,
  className,
  ...props
}) {
  const id = useId();
  const [isRevealed, setIsRevealed] = useState(false);

  const isPassword = type === "password";
  const isPicker = PICKER_TYPES.includes(type);
  const resolvedType = isPassword && isRevealed ? "text" : type;

  // Error wins over success; both override the default hairline.
  const borderClass = error
    ? "border-status-error"
    : success
      ? "border-status-success"
      : "border-border-default focus-within:border-border-focus";

  return (
    <FieldShell
      label={label}
      htmlFor={id}
      error={error}
      helperText={helperText}
      className={className}
    >
      <div
        className={cn(
          "flex h-control items-center gap-2 overflow-hidden rounded-4 border bg-surface-base px-3 transition-colors duration-200 ease-out has-disabled:bg-surface-subtle",
          borderClass,
        )}
      >
        <input
          id={id}
          type={resolvedType}
          aria-invalid={Boolean(error) || undefined}
          // A date or time field opens its native picker from anywhere in the
          // box; the browser's own indicator is hidden in favour of the
          // design's icon.
          onClick={
            isPicker
              ? (event) => event?.currentTarget?.showPicker?.()
              : undefined
          }
          className={cn(
            "text-body-md min-w-0 flex-1 bg-transparent text-text-primary outline-none placeholder:text-text-tertiary disabled:cursor-not-allowed disabled:text-text-disabled",
            isPicker &&
              "cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden",
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setIsRevealed((value) => !value)}
            aria-label={isRevealed ? "Hide password" : "Show password"}
            className="shrink-0 cursor-pointer opacity-70 transition-opacity duration-200 ease-out hover:opacity-100"
          >
            <AppImage
              src={REVEAL_ICON?.src}
              width={REVEAL_ICON?.width}
              height={REVEAL_ICON?.height}
            />
          </button>
        )}

        {trailingIcon && (
          <AssetIcon
            icon={trailingIcon}
            className="pointer-events-none shrink-0 text-text-tertiary"
          />
        )}
      </div>
    </FieldShell>
  );
}
