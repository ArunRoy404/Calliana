import { useMemo } from "react";

import { useStoreParams } from "@/hooks/useUrlParams";

/**
 * A table's current view — `query`, `filter`, `pageSize`, `page`,
 * `pageCount`, `totalCount`, `visibleRows`, `summary` — plus the parsed URL
 * `params`, for any store made by `createTableStore`.
 *
 * The view is derived from the URL on every render (server and client alike),
 * never copied into the store, so what a link says is what the table shows.
 * Pass `serverPage` (`{ rows, totalCount }`) once the page is fetched on the
 * server; the table then shows it as-is.
 */
export function useTableView(useStore, serverPage) {
  const params = useStoreParams(useStore);
  const deriveView = useStore((state) => state.deriveView);

  return useMemo(
    () => ({ params, ...deriveView?.(params, serverPage) }),
    [params, deriveView, serverPage],
  );
}
