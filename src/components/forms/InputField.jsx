"use client";

import { useId, useState } from "react";

import AppImage from "@/components/atoms/AppImage";
import { cn } from "@/lib/cn";

/**
 * InputField — Figma component 8:34.
 * States: Default, Focused, Filled, Error, Success, Disabled.
 *
 * The reveal toggle is the one piece of local `useState` here: it is purely
 * visual and nothing outside this field could ever need it.
 */
const REVEAL_ICON = { src: "/icons/eye-slash.svg", width: 16, height: 16 };

export default function InputField({
  label,
  helperText,
  error,
  success = false,
  type = "text",
  className,
  ...props
}) {
  const id = useId();
  const [isRevealed, setIsRevealed] = useState(false);

  const isPassword = type === "password";
  const resolvedType = isPassword && isRevealed ? "text" : type;

  // Error wins over success; both override the default hairline.
  const borderClass = error
    ? "border-status-error"
    : success
      ? "border-status-success"
      : "border-border-default focus-within:border-border-focus";

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-label-md text-text-secondary">
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex h-11 items-center gap-2 overflow-hidden rounded-4 border bg-surface-base px-3 transition-colors duration-200 ease-out has-disabled:bg-surface-subtle",
          borderClass,
        )}
      >
        <input
          id={id}
          type={resolvedType}
          aria-invalid={Boolean(error) || undefined}
          className="text-body-md min-w-0 flex-1 bg-transparent text-text-primary outline-none placeholder:text-text-tertiary disabled:cursor-not-allowed disabled:text-text-disabled"
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
      </div>

      {(error || helperText) && (
        <p
          className={cn(
            "text-body-sm",
            error ? "text-status-error" : "text-text-tertiary",
          )}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
