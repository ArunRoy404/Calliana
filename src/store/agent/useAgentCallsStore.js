import { callDetailData } from "@/data/admin/call-detail.data";
import {
  AGENT_CALL_DETAIL_LINKS,
  agentCallsData,
} from "@/data/agent/calls.data";
import { withContentLinks } from "@/lib/actionLinks";
import { agentCallsParamsSchema } from "@/schemas/agent/agent-calls-params.schema";
import { CALLS_PARAM_KEYS } from "@/schemas/calls/calls-params.schema";
import { callDetailSlice } from "@/store/calls/callDetailSlice";
import { createTableStore } from "@/store/createTableStore";

const { call: CALL } = CALLS_PARAM_KEYS;

/**
 * The call log's rows, each with the `views` the agent's pill filter reads
 * — its direction and its status ("incoming", "missed") — so "Missed" and
 * "Incoming" both find a missed incoming call. Built once.
 */
const agentCallRows =
  agentCallsData?.rows?.map((row) => ({
    ...row,
    views: [row?.direction, row?.statusKey],
  })) ?? [];

/**
 * The agent workspace's Calls — the admin's call log with the agent's
 * toolbar: search, the pill filter, the client-account and call-status
 * selects, rows per page and paging in the URL (rule 26), the dialer at
 * `?panel=add` and each call's details drawer at `?call=<id>` (the shared
 * `callDetailSlice`, with the agent's own footer links).
 */
export const useAgentCallsStore = createTableStore({
  content: agentCallsData,
  rows: agentCallRows,
  searchFields: ["caller", "phone", "clientAccount"],
  filters: agentCallsData?.filters,
  paramsSchema: agentCallsParamsSchema,
  summaryTemplate: agentCallsData?.pagination?.summary,
  addPanelClears: [CALL],
  extend: callDetailSlice({
    rows: agentCallRows,
    detail: withContentLinks(callDetailData, AGENT_CALL_DETAIL_LINKS),
    callKey: CALL,
    clientHrefTemplate: agentCallsData?.clientHrefTemplate,
  }),
});
