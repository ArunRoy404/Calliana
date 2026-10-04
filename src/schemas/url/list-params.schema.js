import { z } from "zod";

import { TABLE_DEFAULTS } from "@/data/tables/table-defaults.data";
import { isIsoDate } from "@/lib/calendarDates";

/** The URL key and value of a list page's add drawer: `?panel=add`. */
export const PANEL_PARAM = "panel";
export const ADD_PANEL = "add";

/**
 * The URL contract every list screen shares — `?q=…&status=…&page=2&size=20`.
 *
 * Each field `.catch()`es its default, so a stale or hand-edited link never
 * breaks a page: `?page=abc` reads as page 1, `?size=7` as the default size,
 * an unknown filter value as "all". The page is only range-checked here; the
 * store clamps it to the real page count once it knows how many rows match.
 *
 * - `filters` — one `{ param, values }` per select filter: its key in the URL
 *   and the values it may take (the first, "all", is the default). A list can
 *   have any number, or none.
 * - `pageSizes` / `defaultPageSize` — the rows-per-page choices; every table
 *   shares `TABLE_DEFAULTS` unless it says otherwise.
 * - `addPanel` — the page has an add drawer, opened by `?panel=add`.
 * - `extra` — more fields for the same URL (an open record, a tab…).
 *
 * The query is not trimmed: it is echoed back into the search box, and
 * trimming would eat the space a user just typed.
 */
export function createListParamsSchema({
  filters = [],
  pageSizes = TABLE_DEFAULTS?.pageSizeOptions,
  defaultPageSize = TABLE_DEFAULTS?.pageSize,
  addPanel = false,
  extra = {},
}) {
  const filterFields = Object.fromEntries(
    filters
      ?.filter((filter) => filter?.values?.length)
      ?.map((filter) => [filter?.param, enumParam(filter?.values)]) ?? [],
  );

  return z.object({
    q: z.string().max(200).catch(""),
    ...filterFields,
    page: z.coerce.number().int().min(1).catch(1),
    size: z.coerce
      .number()
      .int()
      .refine((size) => pageSizes?.includes?.(size))
      .catch(defaultPageSize),
    ...(addPanel && { [PANEL_PARAM]: optionalEnumParam([ADD_PANEL]) }),
    ...extra,
  });
}

/** An optional id-like param (`?agent=sofia-martinez`); absent reads as `undefined`. */
export const optionalIdParam = z
  .string()
  .regex(/^[\w-]{1,100}$/)
  .optional()
  .catch(undefined);

/** A param limited to `values`, defaulting to the first (`?tab=calls`). */
export function enumParam(values = []) {
  return z.enum(values).catch(values?.[0]);
}

/** A param limited to `values` that is absent when unset (`?panel=add`). */
export function optionalEnumParam(values = []) {
  return z.enum(values).optional().catch(undefined);
}

/**
 * An optional calendar day (`?date=2026-08-10`); absent, malformed or
 * impossible ("2026-02-30") reads as `undefined`, so the page falls back to
 * its own default day.
 */
export const optionalIsoDateParam = z
  .string()
  .refine((value) => isIsoDate(value))
  .optional()
  .catch(undefined);

/**
 * The `filters` a list schema needs, from a data file's filter configs
 * (`[{ param, options: [{ value }] }]`) — so the URL accepts exactly the
 * options the toolbar offers.
 */
export function filterParamsFrom(filters = []) {
  return (
    filters?.map((filter) => ({
      param: filter?.param,
      values: filter?.options?.map((option) => option?.value),
    })) ?? []
  );
}
