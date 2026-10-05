import {
  clientRequestsData,
  REQUEST_CATEGORIES,
  REQUEST_STATUSES,
  REQUEST_URGENCIES,
} from "@/data/client/requests.data";
import { clientRequestsParamsSchema } from "@/schemas/client/client-requests-params.schema";
import { createTableStore } from "@/store/createTableStore";

const byValue = (list) =>
  new Map(list?.map((item) => [item?.value, item]) ?? []);
const CATEGORIES = byValue(REQUEST_CATEGORIES);
const URGENCIES = byValue(REQUEST_URGENCIES);
const STATUSES = byValue(REQUEST_STATUSES);

/**
 * Each request with its keys resolved: the category's label, the urgency and
 * status badges, and the filter keys. Built once, so the table receives the
 * same rows on every render.
 */
const requestRows =
  clientRequestsData?.rows?.map((row) => ({
    ...row,
    categoryKey: row?.category,
    categoryLabel: CATEGORIES.get(row?.category)?.label,
    priority: {
      label: URGENCIES.get(row?.urgency)?.label,
      tone: URGENCIES.get(row?.urgency)?.tone,
    },
    statusKey: row?.status,
    status: {
      label: STATUSES.get(row?.status)?.label,
      tone: STATUSES.get(row?.status)?.tone,
    },
  })) ?? [];

/**
 * Service Requests & Instructions — the client's requests to their
 * secretary team: search, the category and status filters, rows per page
 * and paging in the URL (rule 26), and the new-request drawer at
 * `?panel=add` (`isAddOpen` / `openAdd` / `setAddOpen`).
 */
export const useClientRequestsStore = createTableStore({
  content: clientRequestsData,
  rows: requestRows,
  searchFields: ["reference", "title", "categoryLabel"],
  filters: clientRequestsData?.filters,
  paramsSchema: clientRequestsParamsSchema,
  summaryTemplate: clientRequestsData?.pagination?.summary,
});
