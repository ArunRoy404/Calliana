"use client";

import InputField from "@/components/forms/InputField";
import TextAreaField from "@/components/forms/TextAreaField";

/**
 * Binds a field config from the content store to an `InputField`.
 *
 * Every auth form wires its inputs the same way — spread the config, read the
 * value, show the visible error, update on change, mark touched on blur — so
 * that wiring lives here once instead of in each form.
 */
export default function FormField({ field, value, error, onChange, onBlur }) {
  const isTextArea = field?.type === "textarea";
  const Control = isTextArea ? TextAreaField : InputField;

  return (
    <Control
      label={field?.label}
      name={field?.name}
      type={isTextArea ? undefined : field?.type}
      rows={field?.rows}
      autoComplete={field?.autoComplete}
      placeholder={field?.placeholder}
      {...(!isTextArea && { trailingIcon: field?.trailingIcon })}
      value={value ?? ""}
      error={error}
      onChange={(event) => onChange?.(field?.name, event?.target?.value)}
      onBlur={() => onBlur?.(field?.name)}
    />
  );
}
