import { useState } from "react";

/**
 * `value`, or — once it goes back to `null` / `undefined` — the last value it
 * had. A panel whose content comes from the URL loses that content the moment
 * it is closed; this keeps it on screen while the panel slides away.
 */
export function useRetainedValue(value) {
  const [kept, setKept] = useState(value);

  if (value != null && value !== kept) setKept(value);

  return value ?? kept;
}
