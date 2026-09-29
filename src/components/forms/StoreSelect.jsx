"use client";

import FormSelect from "@/components/forms/FormSelect";
import { useAddAgentFormStore } from "@/store/admin/useAddAgentFormStore";

/**
 * One select of the add-agent form, bound to the form store by its `name`
 * (role, availability, client, queue), so each field reads only its own value
 * and error.
 */
export default function AddAgentSelect({ select }) {
  const name = select?.name;
  const value = useAddAgentFormStore((state) => state.values?.[name]);
  const error = useAddAgentFormStore((state) => state.visibleErrors?.[name]);
  const setField = useAddAgentFormStore((state) => state.setField);
  const touchField = useAddAgentFormStore((state) => state.touchField);

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
