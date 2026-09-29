"use client";

import { useId } from "react";

import FieldShell from "@/components/forms/FieldShell";
import FilterSelect from "@/components/forms/FilterSelect";

/**
 * A labelled dropdown for forms — Figma 198:32325. The same `FieldShell` frame
 * as `InputField`, holding the `field` look of `FilterSelect`, so a select and
 * a text box in one form line up and fail the same way.
 */
export default function FormSelect({
  label,
  options = [],
  value,
  onValueChange,
  onBlur,
  placeholder,
  error,
  helperText,
  className,
}) {
  const id = useId();

  return (
    <FieldShell
      label={label}
      htmlFor={id}
      error={error}
      helperText={helperText}
      className={className}
    >
      <FilterSelect
        id={id}
        variant="field"
        size="md"
        label={label}
        options={options}
        value={value}
        onValueChange={onValueChange}
        onBlur={onBlur}
        placeholder={placeholder}
        invalid={Boolean(error)}
      />
    </FieldShell>
  );
}
