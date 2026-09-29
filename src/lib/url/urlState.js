import { mergeSearchParams, parseSearchParams } from "@/lib/url/searchParams";

/**
 * Search-param service — the half that writes the browser URL.
 *
 * Stores call these from their actions, so a filter, a page or an open panel
 * becomes part of the link the moment it changes. Both functions are safe to
 * import on the server; they only act in the browser.
 *
 * Two ways to write, chosen per call (or per table store):
 * - **shallow** (default) — `history.replaceState` / `pushState`. Next syncs
 *   these into `useSearchParams`, so the page re-renders from the new URL
 *   without a server round trip. Right while the data lives on the client.
 * - **`shallow: false`** — a router navigation, so server components re-run
 *   with the new `searchParams`. Right once a page fetches its data on the
 *   server. It needs the app router, which `UrlRouterBridge` registers here.
 */

let appRouter = null;

/** Called once by `UrlRouterBridge`; enables `shallow: false` writes. */
export function setUrlRouter(router) {
  appRouter = router ?? null;
}

/** The current URL's params, read through `schema` (defaults on the server). */
export function readUrlParams(schema) {
  const search = typeof window === "undefined" ? "" : window.location.search;
  return parseSearchParams(schema, search);
}

/**
 * Merge `patch` into the current URL (see `mergeSearchParams`).
 *
 * `history` is `"replace"` (default — typing, paging and toggling do not flood
 * the Back button) or `"push"`. Writing a URL identical to the current one is
 * skipped, so nothing re-renders for a no-op.
 */
export function writeUrlParams(
  patch,
  { defaults, history = "replace", shallow = true } = {},
) {
  if (typeof window === "undefined") return;

  const { pathname, search, hash } = window.location;
  const query = mergeSearchParams(search, patch, defaults);
  const href = `${pathname}${query ? `?${query}` : ""}${hash}`;
  if (href === `${pathname}${search}${hash}`) return;

  if (!shallow && appRouter) {
    appRouter?.[history]?.(href, { scroll: false });
    return;
  }

  const method = history === "push" ? "pushState" : "replaceState";
  window.history?.[method]?.(null, "", href);
}
