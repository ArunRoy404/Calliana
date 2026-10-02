/**
 * Calendar-day arithmetic and formatting on ISO date strings (`2026-08-13`)
 * and 24-hour times (`"09:30"`).
 *
 * Days are plain strings rather than `Date`s so they can sit in the URL and
 * in data files as-is. Every calculation runs in UTC: a calendar day has no
 * time zone, and doing it in local time would let the server render and the
 * browser disagree about which day an event falls on.
 */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

function toDate(iso) {
  return new Date(`${iso}T00:00:00Z`);
}

function toIso(date) {
  return date?.toISOString?.()?.slice(0, 10);
}

/** Whether `value` is a real `YYYY-MM-DD` day (`2026-02-30` is not). */
export function isIsoDate(value) {
  if (!ISO_DATE.test(`${value ?? ""}`)) return false;
  return toIso(toDate(value)) === value;
}

/** Minutes since midnight of an `HH:MM` time — `"09:30"` → 570. */
export function minutesOf(time) {
  const [hours, minutes] = `${time ?? ""}`.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

export function addDays(iso, days) {
  const date = toDate(iso);
  date.setUTCDate(date.getUTCDate() + (days ?? 0));
  return toIso(date);
}

/** Moves by whole months, keeping the day where the month has it (Jan 31 + 1 → Feb 28). */
export function addMonths(iso, months) {
  const date = toDate(iso);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + (months ?? 0));
  const lastDay = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return toIso(date);
}

/** The Sunday on or before `iso` — the calendar's weeks start on Sunday. */
export function startOfWeek(iso) {
  return addDays(iso, -toDate(iso).getUTCDay());
}

export function startOfMonth(iso) {
  return `${iso?.slice?.(0, 7)}-01`;
}

export function endOfMonth(iso) {
  return addDays(addMonths(startOfMonth(iso), 1), -1);
}

/** Every day from `start` to `end`, both included. */
export function daysBetween(start, end) {
  const count = Math.round((toDate(end) - toDate(start)) / DAY_MS) + 1;
  return Array.from({ length: Math.max(count, 0) }, (_, index) =>
    addDays(start, index),
  );
}

/** A day through `Intl.DateTimeFormat` — `options` come from a data file. */
export function formatIsoDate(iso, options, locale) {
  return new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" }).format(
    toDate(iso),
  );
}

/** An `HH:MM` time through `Intl.DateTimeFormat` — `"13:00"` → "1:00 PM". */
export function formatTime(time, options, locale) {
  const minutes = minutesOf(time);
  return new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" }).format(
    new Date(Date.UTC(1970, 0, 1, Math.floor(minutes / 60), minutes % 60)),
  );
}

/** A whole hour (24-hour `hour`) — `13` → "1 PM". */
export function formatHour(hour, options, locale) {
  return formatTime(`${hour}:00`, options, locale);
}
