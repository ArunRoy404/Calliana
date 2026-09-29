import { useEffect, useRef, useState } from "react";

/**
 * A text box's draft over a committed `value` — the search box over the URL.
 *
 * Typing updates the draft at once (the box never lags) and commits it after
 * `delay` ms of quiet, so the URL is written once per pause, not per key.
 * When `value` changes from outside — Back, a shared link, a reset — the draft
 * follows it, unless the user is mid-edit, when their typing wins.
 */
export function useDebouncedDraft(value, onCommit, delay) {
  const [draft, setDraft] = useState(value);
  const [committed, setCommitted] = useState(value);
  const [isEditing, setEditing] = useState(false);
  const timer = useRef(null);

  if (value !== committed) {
    setCommitted(value);
    if (!isEditing) setDraft(value);
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  function change(next) {
    setDraft(next);
    setEditing(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setEditing(false);
      onCommit?.(next);
    }, delay);
  }

  return [draft, change];
}
