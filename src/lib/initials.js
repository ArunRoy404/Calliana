/**
 * Initials for an avatar fallback — "Sofia Martínez" → "SM", "Cher" → "C".
 * Derived here so data files never store initials beside a name.
 *
 * `max` caps how many letters: `1` keeps only the first ("Isabel Gomez" →
 * "I", the dialer's contacts).
 */
export function initialsFrom(name, max = 2) {
  const words = `${name ?? ""}`.trim().split(/\s+/).filter(Boolean);
  const first = words?.[0]?.[0] ?? "";
  const last = words?.length > 1 ? (words?.at?.(-1)?.[0] ?? "") : "";

  return `${first}${last}`.slice(0, Math.max(max ?? 2, 1)).toUpperCase();
}
