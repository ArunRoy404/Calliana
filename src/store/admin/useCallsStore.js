import { callDetailData } from "@/data/admin/call-detail.data";
import { callsData } from "@/data/admin/calls.data";
import {
  CALLS_PARAM_KEYS,
  callsParamsSchema,
} from "@/schemas/calls/calls-params.schema";
import { callDetailSlice } from "@/store/calls/callDetailSlice";
import { createTableStore } from "@/store/createTableStore";

const { call: CALL } = CALLS_PARAM_KEYS;

/** One call's details drawer — the slice every call list shares. */
const callDetail = callDetailSlice({
  rows: callsData?.rows,
  detail: callDetailData,
  callKey: CALL,
  clientHrefTemplate: callsData?.clientHrefTemplate,
});

/**
 * The calls directory — its content plus the search, client, status and
 * direction filters the table runs on, and the actions for its two side
 * panels: dialing an outbound call, and one call's details.
 *
 * Like the other lists, both panels live in the URL: `?call=<id>` for a
 * call's details, `?panel=add` for the dial-outbound drawer.
 */
export const useCallsStore = createTableStore({
  content: callsData,
  rows: callsData?.rows,
  searchFields: ["caller", "phone", "clientAccount"],
  filters: callsData?.filters,
  paramsSchema: callsParamsSchema,
  summaryTemplate: callsData?.pagination?.summary,
  addPanelClears: [CALL],
  extend: (set, get) => ({ ...callDetail(set, get) }),
});
