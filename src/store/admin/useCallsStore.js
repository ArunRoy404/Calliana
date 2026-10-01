import { callDetailData } from "@/data/admin/call-detail.data";
import { callsData } from "@/data/admin/calls.data";
import { CALLS_PARAM_KEYS, callsParamsSchema } from "@/schemas/calls/calls-params.schema";
import { PANEL_PARAM } from "@/schemas/url/list-params.schema";
import { createTableStore } from "@/store/createTableStore";

const { call: CALL } = CALLS_PARAM_KEYS;

/**
 * Overlay one call's own row (caller, timing, status) on the shared detail
 * sample, so each call's panel reads as its own until real per-call data
 * exists — the same overlay `useAgentsStore` runs for agent details.
 */
function buildCallDetail(row) {
  const sample = callDetailData?.sample;

  return {
    ...sample,
    id: row?.id,
    caller: row?.caller,
    phone: row?.phone,
    clientAccount: row?.clientAccount,
    clientHref: row?.clientId ? `/admin/clients/${row?.clientId}` : undefined,
    startTime: row?.startTime,
    duration: row?.duration,
    status: row?.callStatus,
    followUp: row?.followUp,
  };
}

/** Built once per call, so a selector returns the same object every time. */
const callDetails = new Map(
  callsData?.rows?.map((row) => [row?.id, buildCallDetail(row)]) ?? [],
);

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
  extend: (set, get) => ({
    detailContent: callDetailData,

    selectedCall: (params) => callDetails.get(params?.[CALL]) ?? null,

    openCall: (row) =>
      get()?.setParams?.({ [CALL]: row?.id, [PANEL_PARAM]: null }),
    setDetailOpen: (open) => {
      if (!open) get()?.setParams?.({ [CALL]: null });
    },
  }),
});
