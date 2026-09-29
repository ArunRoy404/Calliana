import { z } from "zod";

/**
 * The URL contract every list screen shares — `?q=…&status=…&page=2&size=20`.
 *
 * Each field `.catch()`es its default, so a stale or hand-edited link never
 * breaks a page: `?page=abc` reads as page 1, `?size=7` as the default size,
 * an unknown filter value as "all". The page is only range-checked here; the
 * store clamps it to the real page count once it knows how many rows match.
 *
 * - `filterParam` / `filterValues` — the select filter's key in the URL and
 *   the values it may take (its first value is the default, "all"). Omit
 *   `filterValues` for a list with no filter.
 * - `pageSizes` / `defaultPageSize` — the rows-per-page choices.
 * - `extra` — more fields for the same URL (an open panel, a tab…).
 *
 * The query is not trimmed: it is echoed back into the search box, and
 * trimming would eat the space a user just typed.
 */
export function createListParamsSchema({
  filterParam = "filter",
  filterValues = [],
  pageSizes = [],
  defaultPageSize,
  extra = {},
}) {
  const filter = filterValues?.length
    ? { [filterParam]: z.enum(filterValues).catch(filterValues?.[0]) }
    : {};

  return z.object({
    q: z.string().max(200).catch(""),
    ...filter,
    page: z.coerce.number().int().min(1).catch(1),
    size: z.coerce
      .number()
      .int()
      .refine((size) => pageSizes?.includes?.(size))
      .catch(defaultPageSize),
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
