import {
  CLIENT_CALL_DETAIL_LINKS,
  clientCallsData,
} from "@/data/client/calls.data";
import { withContentLinks } from "@/lib/actionLinks";
import { fillTemplate } from "@/lib/fillTemplate";
import {
  CLIENT_CALLS_PARAM_KEYS,
  clientCallsParamsSchema,
} from "@/schemas/client/client-calls-params.schema";
import { callDetailSlice } from "@/store/calls/callDetailSlice";
import { createTableStore } from "@/store/createTableStore";

/**
 * The client's call log, each row with the link its "Review Call" opens.
 * Built once and exported: the client home's recent calls are the first
 * rows of this same log, never a second copy.
 */
export const clientCallRows =
  clientCallsData?.rows?.map((row) => ({
    ...row,
    reviewHref: fillTemplate(clientCallsData?.reviewHrefTemplate, row),
  })) ?? [];

/**
 * Calls & Notes — the client portal's call log: search, the call-outcome
 * filter, rows per page and paging in the URL (rule 26), and each call's
 * details drawer at `?call=<id>` (the shared `callDetailSlice`, with the
 * client's own footer links), and the row whose agent note is open beneath
 * it at `?note=<id>`.
 */
export const useClientCallsStore = createTableStore({
  content: clientCallsData,
  rows: clientCallRows,
  searchFields: ["caller", "phone", "purpose"],
  filters: clientCallsData?.filters,
  paramsSchema: clientCallsParamsSchema,
  summaryTemplate: clientCallsData?.pagination?.summary,
  expandKey: CLIENT_CALLS_PARAM_KEYS.note,
  extend: callDetailSlice({
    rows: clientCallRows,
    detail: withContentLinks(clientCallsData?.detail, CLIENT_CALL_DETAIL_LINKS),
    callKey: CLIENT_CALLS_PARAM_KEYS.call,
  }),
});
