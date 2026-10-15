import {
  CALLBACKS,
  VOICEMAIL_STATUSES,
} from "@/data/admin/voicemail.data";
import { voicemailData } from "@/data/agent/voicemail.data";
import { agentVoicemailParamsSchema } from "@/schemas/agent/agent-voicemail-params.schema";
import { CALLS_PARAM_KEYS } from "@/schemas/calls/calls-params.schema";
import { callDetailSlice } from "@/store/calls/callDetailSlice";
import { voicemailRows } from "@/store/calls/voicemailRows";
import { createTableStore } from "@/store/createTableStore";

const { call: CALL } = CALLS_PARAM_KEYS;

/**
 * The drawer's tags read the voicemail's own words — "New Voicemail",
 * "Callback Needed" — rather than the call's status and follow-up.
 */
const detailRows = voicemailRows.map((row) => ({
  ...row,
  callStatus: VOICEMAIL_STATUSES?.[row?.voicemailKey]?.tag,
  followUp: CALLBACKS?.[row?.callbackKey]?.tag,
}));

/**
 * The agent workspace's Voicemail — the call log's voicemails: search, the
 * status, client and callback filters, rows per page and paging in the URL
 * (rule 26), and each voicemail's details drawer at `?call=<id>` (the
 * shared `callDetailSlice`, with the voicemail's own copy and sections).
 */
export const useAgentVoicemailStore = createTableStore({
  content: voicemailData,
  rows: voicemailRows,
  searchFields: ["caller", "phone", "clientAccount"],
  filters: voicemailData?.filters,
  paramsSchema: agentVoicemailParamsSchema,
  summaryTemplate: voicemailData?.pagination?.summary,
  extend: callDetailSlice({
    rows: detailRows,
    detail: voicemailData?.detail,
    callKey: CALL,
    clientHrefTemplate: voicemailData?.clientHrefTemplate,
  }),
});
