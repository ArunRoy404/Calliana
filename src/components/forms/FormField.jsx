"use client";

import InputField from "@/components/forms/InputField";

/**
 * Binds a field config from the content store to an `InputField`.
 *
 * Every auth form wires its inputs the same way — spread the config, read the
 * value, show the visible error, update on change, mark touched on blur — so
 * that wiring lives here once instead of in each form.
 */
export default function FormField({ field, value, error, onChange, onBlur }) {
  return (
    <InputField
      label={field?.label}
      name={field?.name}
      type={field?.type}
      autoComplete={field?.autoComplete}
      placeholder={field?.placeholder}
      value={value ?? ""}
      error={error}
      onChange={(event) => onChange?.(field?.name, event?.target?.value)}
      onBlur={() => onBlur?.(field?.name)}
    />
  );
}
