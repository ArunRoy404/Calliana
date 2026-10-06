import { create } from "zustand";

import { TABLE_DEFAULTS } from "@/data/tables/table-defaults.data";
import { fillTemplate } from "@/lib/fillTemplate";
import { searchParamDefaults } from "@/lib/url/searchParams";
import { readUrlParams, writeUrlParams } from "@/lib/url/urlState";
import { ADD_PANEL, PANEL_PARAM } from "@/schemas/url/list-params.schema";

/** The list keys `reset` clears; a table's own extras (panels, tabs) stay. */
const LIST_KEYS = ["q", "page", "size"];

/**
 * Build a Zustand store for a searchable, filterable, paginated table whose
 * state lives in the URL.
 *
 * Every list screen needs the same machinery — a search query, select
 * filters, a rows-per-page choice, page navigation and a summary line — so it
 * lives here once and each table supplies only its rows, the fields to match,
 * its filters and its URL schema (`createListParamsSchema`).
 *
 * `filters` is `[{ param, field, allValue }]`: each filter's URL key, the row
 * field it compares to, and the value that switches it off ("all"). A row must
 * pass every filter. A row field holding a list matches when the list
 * includes the value — one pill filter can then cover two facets (the agent
 * calls' All / Incoming / Outgoing / Missed / Voicemail reads a row's
 * `views: [direction, status]`).
 *
 * **The URL is the state.** Query, filters, page and page size are search
 * params, never store fields: a link reproduces the view, Back and Forward
 * work, and the server renders the same page the browser will. (A module-level
 * store is shared by every request on the server, so request-specific state
 * must not live in it.) The store holds what is the same for everyone —
 * content, rows, options — plus:
 *
 * - `deriveView(params, serverPage?)` — pure: the page of rows, page count and
 *   summary for a set of params. `useTableView` calls it with the URL's params.
 *   Once a page is fetched on the server, pass `{ rows, totalCount }` as
 *   `serverPage` and it is used as-is instead of filtering locally.
 * - actions (`setQuery`, `setFilter(param, value)`, `setPageSize`, `goToPage`,
 *   …) that write the URL through `writeUrlParams`. A new query, filter or size
 *   starts back on page one. `setParams` writes any other key the schema
 *   declares.
 *
 * A list with an add drawer (`addPanel: true` in its schema) gets
 * `isAddOpen(params)`, `openAdd()` and `setAddOpen(open)`; `addPanelClears`
 * names keys opening it removes (another panel's). `setAddOpen` takes the
 * drawer's open flag, so it plugs straight into `SidePanel`'s `onOpenChange`.
 *
 * A list whose rows open beneath themselves (`content.expand`) names the URL
 * key holding the open row, `expandKey` (`?note=<id>`): the view then
 * carries `expandedId`, and `toggleRow(id)` opens that row or, if it is
 * already open, closes it. One row is open at a time.
 *
 * `shallow` / `history` pick how the URL is written (see `urlState.js`); set
 * `shallow: false` when the page's data comes from the server.
 */
export function createTableStore({
  content,
  rows = [],
  searchFields = [],
  filters = [],
  paramsSchema,
  pageSizeOptions: sizes = TABLE_DEFAULTS?.pageSizeOptions,
  summaryTemplate,
  addPanelClears = [],
  expandKey,
  shallow = true,
  history = "replace",
  extend,
}) {
  const defaults = searchParamDefaults(paramsSchema);

  const filterParams = filters?.map((filter) => filter?.param) ?? [];

  function matches(row, query, values) {
    const passesFilters = filters?.every((filter) => {
      const value = values?.[filter?.param] ?? filter?.allValue;
      const field = row?.[filter?.field];
      return (
        value === filter?.allValue ||
        (Array.isArray(field) ? field.includes(value) : field === value)
      );
    });
    if (!passesFilters) return false;

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

  function deriveView(params, serverPage) {
    const query = params?.q ?? defaults?.q;
    const filterValues = Object.fromEntries(
      filters?.map((filter) => [
        filter?.param,
        params?.[filter?.param] ?? filter?.allValue,
      ]) ?? [],
    );
    const pageSize = params?.size ?? defaults?.size;

    const filtered = serverPage
      ? null
      : (rows?.filter?.((row) => matches(row, query, filterValues)) ?? []);
    const totalCount = serverPage?.totalCount ?? filtered?.length ?? 0;
    const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
    const page = Math.min(Math.max(1, params?.page ?? 1), pageCount);
    const start = (page - 1) * pageSize;

    return {
      query,
      filters: filterValues,
      pageSize,
      page,
      pageCount,
      totalCount,
      visibleRows:
        serverPage?.rows ?? filtered?.slice(start, start + pageSize) ?? [],
      summary: fillTemplate(summaryTemplate, {
        total: totalCount,
        page,
        pages: pageCount,
      }),
      expandedId: expandKey ? params?.[expandKey] : undefined,
    };
  }

  function setParams(patch, options) {
    writeUrlParams(patch, { defaults, shallow, history, ...options });
  }

  /** The view as the URL has it right now — for actions that step from it. */
  const currentView = () => deriveView(readUrlParams(paramsSchema));

  return create((set, get, store) => ({
    content,
    pageSizeLabel: TABLE_DEFAULTS?.pageSizeLabel,
    pageSizeOptions,
    paramsSchema,
    paramDefaults: defaults,
    deriveView,
    setParams,

    setQuery: (q) => setParams({ q, page: null }),
    setFilter: (param, value) => setParams({ [param]: value, page: null }),
    /** Takes the select's string value. */
    setPageSize: (size) => setParams({ size, page: null }),

    goToPage: (page) => setParams({ page }),

    /** Open row `id` beneath itself, or close it if it is the open one. */
    toggleRow: (id) => {
      if (!expandKey) return;
      const open = readUrlParams(paramsSchema)?.[expandKey];
      setParams({ [expandKey]: open === id ? null : id });
    },
    nextPage: () => {
      const { page, pageCount } = currentView();
      setParams({ page: Math.min(page + 1, pageCount) });
    },
    previousPage: () =>
      setParams({ page: Math.max(currentView().page - 1, 1) }),

    isAddOpen: (params) => params?.[PANEL_PARAM] === ADD_PANEL,
    openAdd: () =>
      setParams({
        [PANEL_PARAM]: ADD_PANEL,
        ...Object.fromEntries(addPanelClears?.map((key) => [key, null]) ?? []),
      }),
    setAddOpen: (open) => setParams({ [PANEL_PARAM]: open ? ADD_PANEL : null }),

    reset: () =>
      setParams(
        Object.fromEntries(
          [...LIST_KEYS, ...filterParams].map((key) => [key, null]),
        ),
      ),

    ...(extend?.(set, get, store) ?? {}),
  }));
}
