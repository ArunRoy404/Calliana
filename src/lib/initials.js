/**
 * Initials for an avatar fallback — "Sofia Martínez" → "SM", "Cher" → "C".
 * Derived here so data files never store initials beside a name. `max: 1`
 * keeps only the first ("Isabel Gomez" → "I", the dialer's contacts).
 */
export function initialsFrom(name, max = 2) {
  const words = `${name ?? ""}`.trim().split(/\s+/).filter(Boolean);
  const first = words?.[0]?.[0] ?? "";
  const last = max > 1 && words?.length > 1 ? (words?.at?.(-1)?.[0] ?? "") : "";

  return `${first}${last}`.toUpperCase();
}
