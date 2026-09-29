"use client";

import { useId } from "react";

import FieldShell from "@/components/forms/FieldShell";
import { cn } from "@/lib/cn";

/**
 * A multi-line field — Figma 202:31095 ("Support Instructions / Notes"). The
 * same frame, border and states as `InputField`, taller and resizable only
 * vertically. `bare` drops the label frame for a textarea that sits inside
 * its own card (the notes composer, 202:30951).
 */
export default function TextAreaField({
  label,
  helperText,
  error,
  rows = 4,
  bare = false,
  className,
  ...props
}) {
  const id = useId();

  const textarea = (
    <textarea
      id={id}
      rows={rows}
      aria-invalid={Boolean(error) || undefined}
      className={cn(
        "text-body-md w-full resize-y bg-transparent text-text-primary outline-none placeholder:text-text-tertiary disabled:cursor-not-allowed disabled:text-text-disabled",
        !bare &&
          "rounded-4 border bg-surface-base p-3 transition-colors duration-200 ease-out",
        !bare &&
          (error
            ? "border-status-error"
            : "border-border-default focus:border-border-focus"),
        bare && "text-body-lg resize-none text-text-secondary",
        className,
      )}
      {...props}
    />
  );

  if (bare) return textarea;

  return (
    <FieldShell label={label} htmlFor={id} error={error} helperText={helperText}>
      {textarea}
    </FieldShell>
  );
}
