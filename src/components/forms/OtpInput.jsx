"use client";

import { useId } from "react";

import { cn } from "@/lib/cn";

/**
 * One-time-code entry — Figma 43:8988.
 *
 * The value is a single string; each box is a view onto one character of it.
 * Typing advances, backspace retreats, and pasting a code fills every box.
 * Focusing a box past the end jumps to the first empty one, which keeps the
 * string contiguous so digits can never end up misaligned.
 *
 * Boxes are addressed by id rather than a ref array — focus is the only reason
 * to reach for them, and a ref array read from JSX handlers trips
 * `react-hooks/refs`.
 *
 * `onChange` is called with an updater, `(previous) => next`, not a string:
 * typing quickly fires several events before React re-renders, so building the
 * next value from the `value` prop would drop digits.
 *
 * The design tints filled digits with `--text-disabled`; entered text uses
 * `--text-primary` instead, because #94a3b8 on the tile fill is roughly 2.8:1
 * and would fail contrast for real input.
 */
export default function OtpInput({
  length = 6,
  value = "",
  onChange,
  name,
  error,
  className,
}) {
  const groupId = useId();

  const digits = Array.from({ length }, (_, index) => value?.[index] ?? "");

  function focusBox(index) {
    document?.getElementById?.(`${groupId}-${index}`)?.focus?.();
  }

  function commit(nextFrom) {
    onChange?.((previous = "") => nextFrom(previous).slice(0, length));
  }

  function handleChange(index, rawValue) {
    const digit = rawValue?.replace(/\D/g, "")?.slice(-1) ?? "";
    if (!digit) return;

    commit(
      (previous) =>
        `${previous.slice(0, index)}${digit}${previous.slice(index + 1)}`,
    );
    if (index < length - 1) focusBox(index + 1);
  }

  function handleKeyDown(index, event) {
    if (event?.key === "Backspace") {
      event.preventDefault();

      if (digits?.[index]) {
        commit(
          (previous) => `${previous.slice(0, index)}${previous.slice(index + 1)}`,
        );
        return;
      }

      if (index > 0) {
        commit((previous) => previous.slice(0, index - 1));
        focusBox(index - 1);
      }
      return;
    }

    if (event?.key === "ArrowLeft" && index > 0) focusBox(index - 1);
    if (event?.key === "ArrowRight" && index < length - 1) focusBox(index + 1);
  }

  /**
   * Clicking a box past the end jumps to the first empty one, keeping the
   * string contiguous. Guarding on mousedown rather than focus matters: focus
   * also fires when typing advances a box, and at that moment `value` is one
   * render behind, so a focus guard would bounce the caret back to the start.
   */
  function handleMouseDown(index, event) {
    if (index > value.length) {
      event.preventDefault();
      focusBox(value.length);
    }
  }

  function handlePaste(event) {
    event.preventDefault();

    const pasted = event?.clipboardData
      ?.getData("text")
      ?.replace(/\D/g, "")
      ?.slice(0, length);

    if (!pasted) return;
    commit(() => pasted);
    focusBox(Math.min(pasted.length, length - 1));
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex w-full items-center justify-between gap-2">
        {digits?.map((digit, index) => (
          <input
            key={index}
            id={`${groupId}-${index}`}
            name={index === 0 ? name : undefined}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={Boolean(error) || undefined}
            onChange={(event) => handleChange(index, event?.target?.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            onMouseDown={(event) => handleMouseDown(index, event)}
            className={cn(
              "text-h4 size-[52px] shrink-0 rounded-12 bg-surface-otp text-center text-text-primary caret-action-primary outline-none",
              "transition-all duration-200 ease-out",
              "focus:ring-2 focus:ring-border-focus",
              error && "ring-1 ring-status-error",
            )}
          />
        ))}
      </div>

      {error && <p className="text-body-sm text-status-error">{error}</p>}
    </div>
  );
}
