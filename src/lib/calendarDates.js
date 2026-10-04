/**
 * Calendar date helpers over ISO day strings (`"2026-08-10"`).
 *
 * Days travel through the URL and the data as plain `YYYY-MM-DD` strings and
 * all arithmetic runs in UTC, so a day never shifts with the server's or the
 * viewer's timezone — the server render and the browser always agree on
 * which day is shown.
 */

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

/** The `Date` (UTC midnight) for an ISO day, or `null` when it isn't one. */
export function parseIsoDate(iso) {
  if (!ISO_DAY.test(`${iso ?? ""}`)) return null;
  const date = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(date?.getTime?.()) ? null : date;
}

/** Whether `iso` names a real calendar day ("2026-02-30" does not). */
export function isIsoDate(iso) {
  const date = parseIsoDate(iso);
  return Boolean(date) && toIsoDate(date) === iso;
}

/** The ISO day for a `Date`, read in UTC. */
export function toIsoDate(date) {
  if (!date || Number.isNaN(date?.getTime?.())) return "";
  return date.toISOString().slice(0, 10);
}

/** `iso` moved by `count` days. */
export function addDays(iso, count = 0) {
  const date = parseIsoDate(iso);
  if (!date) return iso;
  date.setUTCDate(date.getUTCDate() + count);
  return toIsoDate(date);
}

/** `iso` moved by `count` months, clamped to the target month's last day. */
export function addMonths(iso, count = 0) {
  const date = parseIsoDate(iso);
  if (!date) return iso;
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + count);
  const lastDay = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return toIsoDate(date);
}

/** The Sunday that starts `iso`'s week. */
export function startOfWeek(iso) {
  const date = parseIsoDate(iso);
  return date ? addDays(iso, -date.getUTCDay()) : iso;
}

/** The first day of `iso`'s month. */
export function startOfMonth(iso) {
  return `${iso ?? ""}`.slice(0, 8) + "01";
}

/** The last day of `iso`'s month. */
export function endOfMonth(iso) {
  return addDays(addMonths(startOfMonth(iso), 1), -1);
}

/** Every ISO day from `start` to `end`, inclusive. */
export function daysBetween(start, end) {
  const days = [];
  for (let day = start; day && day <= end; day = addDays(day, 1)) {
    days.push(day);
  }
  return days;
}

/** Minutes after midnight for a 24-hour `"HH:MM"` time (`"13:30"` → 810). */
export function minutesOf(time) {
  const [hours, minutes] = `${time ?? ""}`.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

/** A 24-hour `"HH:MM"` time as a label — `"12:30"` → "12:30 PM" in `en-US`. */
export function formatTime(time, options, locale) {
  const minutes = minutesOf(time);
  return new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2000, 0, 1, 0, minutes)));
}

/** An hour of the day (0–23) as a label — `13` → "1 PM" in `en-US`. */
export function formatHour(hour, options, locale) {
  return new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2000, 0, 1, hour)));
}

/** `iso` formatted with `Intl` options, read in UTC so it never shifts. */
export function formatIsoDate(iso, options, locale) {
  const date = parseIsoDate(iso);
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: "UTC",
  }).format(date);
}
