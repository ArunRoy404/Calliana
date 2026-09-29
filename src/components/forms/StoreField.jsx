"use client";

import FormField from "@/components/forms/FormField";

/**
 * A text field bound to a `createFormStore` store by its `name` — the input
 * twin of `StoreSelect`. `field` is a data config (`{ name, label, type,
 * placeholder, … }`); `type: "textarea"` gives a multi-line box.
 */
export default function StoreField({ useStore, field }) {
  const name = field?.name;
  const value = useStore((state) => state.values?.[name]);
  const error = useStore((state) => state.visibleErrors?.[name]);
  const setField = useStore((state) => state.setField);
  const touchField = useStore((state) => state.touchField);

  return (
    <FormField
      field={field}
      value={value}
      error={error}
      onChange={setField}
      onBlur={touchField}
    />
  );
}
