/**
 * Initials for an avatar fallback — "Sofia Martínez" → "SM", "Cher" → "C".
 * Derived here so data files never store initials beside a name.
 */
export function initialsFrom(name) {
  const words = `${name ?? ""}`.trim().split(/\s+/).filter(Boolean);
  const first = words?.[0]?.[0] ?? "";
  const last = words?.length > 1 ? (words?.at?.(-1)?.[0] ?? "") : "";

  return `${first}${last}`.toUpperCase();
}
