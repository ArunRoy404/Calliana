"use client";

import FormSelect from "@/components/forms/FormSelect";

/**
 * A form select bound to a `createFormStore` store by its `name`, so each one
 * reads only its own value and error. `select` is a data config: `{ name,
 * label, options, placeholder }`.
 */
export default function StoreSelect({ useStore, select }) {
  const name = select?.name;
  const value = useStore((state) => state.values?.[name]);
  const error = useStore((state) => state.visibleErrors?.[name]);
  const setField = useStore((state) => state.setField);
  const touchField = useStore((state) => state.touchField);

  return (
    <FormSelect
      label={select?.label}
      options={select?.options}
      placeholder={select?.placeholder}
      value={value}
      error={error}
      onValueChange={(next) => setField?.(name, next)}
      onBlur={() => touchField?.(name)}
    />
  );
}
