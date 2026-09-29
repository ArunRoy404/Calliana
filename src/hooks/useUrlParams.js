import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { parseSearchParams } from "@/lib/url/searchParams";

/**
 * The current URL's params, typed and validated by `schema`.
 *
 * Reads through Next's `useSearchParams`, so it is the request's own URL
 * during the server render (on a dynamic page) and live in the browser —
 * including after a store writes the URL, and on Back / Forward. The result
 * is memoised on the query string, so it is a stable object until the URL
 * actually changes.
 */
export function useUrlParams(schema) {
  const searchParams = useSearchParams();
  const search = searchParams?.toString?.() ?? "";

  return useMemo(() => parseSearchParams(schema, search), [schema, search]);
}

/** `useUrlParams` for a store made by `createTableStore` (its own schema). */
export function useStoreParams(useStore) {
  return useUrlParams(useStore((state) => state.paramsSchema));
}
