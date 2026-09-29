import { create } from "zustand";

import { TABLE_DEFAULTS } from "@/data/tables/table-defaults.data";

/**
 * Fill `{name}` placeholders in a copy template from `values`.
 * Kept here rather than in the data file because the numbers are derived.
 */
function fillTemplate(template, values) {
  return (template ?? "").replace(
    /\{(\w+)\}/g,
    (match, key) => `${values?.[key] ?? match}`,
  );
}

/**
 * Build a Zustand store for a searchable, filterable, paginated table.
 *
 * Every list screen needs the same machinery — a search query, one select
 * filter, a rows-per-page choice, page navigation and a summary line — so it
 * lives here once and each table supplies only its rows and which fields to
 * match. Pass `extend` for actions unique to one table.
 *
 * Page size defaults to `TABLE_DEFAULTS.pageSize` (10) and can be changed at
 * runtime from `pageSizeOptions`, which the toolbar's rows-per-page select
 * renders as-is.
 *
 * The visible page is held in state and recomputed by the actions, never
 * derived in a selector: a selector that filters on every call returns a new
 * array each render, which Zustand treats as a change and loops on.
 *
 * - `searchFields` — row fields the query is matched against (case-insensitive).
 * - `filterField` — the row field the select filter compares to; `allValue`
 *   switches the filter off.
 */
export function createTableStore({
  content,
  rows = [],
  searchFields = [],
  filterField,
  allValue = "all",
  pageSize: initialPageSize = TABLE_DEFAULTS?.pageSize,
  pageSizeOptions: sizes = TABLE_DEFAULTS?.pageSizeOptions,
  summaryTemplate,
  extend,
}) {
  function matches(row, query, filter) {
    const passesFilter =
      !filterField || filter === allValue || row?.[filterField] === filter;
    if (!passesFilter) return false;

    const needle = query?.trim?.()?.toLowerCase?.() ?? "";
    if (!needle) return true;

    return searchFields?.some?.((field) =>
      `${row?.[field] ?? ""}`.toLowerCase().includes(needle),
    );
  }

  // Built once, so the select receives the same array on every render.
  const pageSizeOptions =
    sizes?.map((count) => ({
      value: `${count}`,
      label: fillTemplate(TABLE_DEFAULTS?.pageSizeOptionLabel, { count }),
    })) ?? [];

  function derive({ query, filter, page, pageSize }) {
    const filtered = rows?.filter?.((row) => matches(row, query, filter)) ?? [];
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(Math.max(1, page ?? 1), pageCount);
    const start = (currentPage - 1) * pageSize;

    return {
      page: currentPage,
      pageCount,
      totalCount: filtered.length,
      visibleRows: filtered.slice(start, start + pageSize),
      summary: fillTemplate(summaryTemplate, {
        total: filtered.length,
        page: currentPage,
        pages: pageCount,
      }),
    };
  }

  return create((set, get, store) => ({
    content,
    pageSizeLabel: TABLE_DEFAULTS?.pageSizeLabel,
    pageSizeOptions,
    query: "",
    filter: allValue,
    pageSize: initialPageSize,
    ...derive({ query: "", filter: allValue, page: 1, pageSize: initialPageSize }),

    /** A new query or filter always starts back on the first page. */
    setQuery: (query) =>
      set((state) => ({ query, ...derive({ ...state, query, page: 1 }) })),

    setFilter: (filter) =>
      set((state) => ({ filter, ...derive({ ...state, filter, page: 1 }) })),

    /** Takes the select's string value; a new size starts back on page one. */
    setPageSize: (value) =>
      set((state) => {
        const pageSize = Number(value) || initialPageSize;
        return { pageSize, ...derive({ ...state, pageSize, page: 1 }) };
      }),

    goToPage: (page) => set((state) => derive({ ...state, page })),
    nextPage: () => get()?.goToPage?.((get()?.page ?? 1) + 1),
    previousPage: () => get()?.goToPage?.((get()?.page ?? 1) - 1),

    reset: () =>
      set({
        query: "",
        filter: allValue,
        pageSize: initialPageSize,
        ...derive({
          query: "",
          filter: allValue,
          page: 1,
          pageSize: initialPageSize,
        }),
      }),

    ...(extend?.(set, get, store) ?? {}),
  }));
}
