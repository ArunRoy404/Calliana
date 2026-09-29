/**
 * Search-param service — the half that runs anywhere.
 *
 * Nothing here touches `window`, so a server page parses its `searchParams`
 * with exactly the functions (and the same Zod schema) the client uses to read
 * and write the URL. That is what makes a shared link render on the server
 * the way the sender saw it, and what an API call will be built from later.
 *
 * Every schema passed in is a Zod object whose fields `.catch()` a default, so
 * parsing never throws: a missing, stale or hand-edited value quietly falls
 * back rather than breaking the page.
 */

/**
 * Normalise any search-param source to a fresh `URLSearchParams`: a query
 * string, `URLSearchParams` / Next's read-only variant, or the plain object a
 * server page receives (`{ key: string | string[] | undefined }`).
 */
export function toSearchParams(source) {
  if (typeof source === "string" || source instanceof URLSearchParams) {
    return new URLSearchParams(source);
  }

  const params = new URLSearchParams();
  Object.entries(source ?? {}).forEach(([key, value]) => {
    [value]
      .flat()
      .filter((entry) => entry !== undefined && entry !== null)
      .forEach((entry) => params.append(key, `${entry}`));
  });
  return params;
}

/** Typed values for every key the schema declares; anything invalid falls back. */
export function parseSearchParams(schema, source) {
  const params = toSearchParams(source);
  const raw = Object.fromEntries(
    Object.keys(schema?.shape ?? {}).map((key) => [
      key,
      params.get(key) ?? undefined,
    ]),
  );
  return schema?.parse?.(raw) ?? {};
}

/** The value each key takes when it is absent from the URL. */
export function searchParamDefaults(schema) {
  return parseSearchParams(schema, "");
}

/**
 * Apply `patch` to `current` and return the new query string (no `?`).
 *
 * A key set to `null`, `undefined`, `""` or its default is removed, so a URL
 * only ever carries what differs from the page's resting state — `/agents`,
 * not `/agents?page=1&size=10`. Keys the patch does not name are kept, so two
 * features sharing a URL never erase each other's params.
 */
export function mergeSearchParams(current, patch, defaults = {}) {
  const params = toSearchParams(current);

  Object.entries(patch ?? {}).forEach(([key, value]) => {
    const text = `${value ?? ""}`;
    if (!text || text === `${defaults?.[key] ?? ""}`) {
      params.delete(key);
      return;
    }
    params.set(key, text);
  });

  return params.toString();
}
