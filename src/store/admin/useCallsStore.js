import {
  ADMIN_CALL_DETAIL_LINKS,
  callDetailData,
} from "@/data/admin/call-detail.data";
import { callsData } from "@/data/admin/calls.data";
import { withContentLinks } from "@/lib/actionLinks";
import {
  CALLS_PARAM_KEYS,
  callsParamsSchema,
} from "@/schemas/calls/calls-params.schema";
import { callDetailSlice } from "@/store/calls/callDetailSlice";
import { createTableStore } from "@/store/createTableStore";

const { call: CALL } = CALLS_PARAM_KEYS;

/**
 * One call's details drawer — the slice every call list shares, with the
 * admin's own footer links (Create Task, Schedule Appt).
 */
const callDetail = callDetailSlice({
  rows: callsData?.rows,
  detail: withContentLinks(callDetailData, ADMIN_CALL_DETAIL_LINKS),
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
