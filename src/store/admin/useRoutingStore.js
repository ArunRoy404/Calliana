import { editRoutingRulesData } from "@/data/admin/edit-routing-rules.data";
import { queueDetailData } from "@/data/admin/queue-detail.data";
import { routingData } from "@/data/admin/routing.data";
import { ROUTING_PARAM_KEYS, routingParamsSchema } from "@/schemas/routing/routing-params.schema";
import { PANEL_PARAM } from "@/schemas/url/list-params.schema";
import { createTableStore } from "@/store/createTableStore";

const { queue: QUEUE, rules: RULES } = ROUTING_PARAM_KEYS;

/**
 * Overlay one queue's own row (name, description, status) on a shared
 * sample, so each queue's panels read as their own until real per-queue
 * configuration exists — the same overlay `useCallsStore` runs for calls.
 */
function overlayQueue(row, sample) {
  return {
    ...sample,
    id: row?.id,
    name: row?.name,
    description: row?.description,
    status: row?.status,
  };
}

/** Built once per queue, so a selector returns the same object every time. */
const queueDetails = new Map(
  routingData?.rows?.map((row) => [row?.id, overlayQueue(row, queueDetailData?.sample)]) ?? [],
);
const queueRules = new Map(
  routingData?.rows?.map((row) => [row?.id, overlayQueue(row, editRoutingRulesData?.sample)]) ?? [],
);

/**
 * The routing directory — its content (no filters, just search) plus the
 * actions for its three side panels: creating a queue, one queue's
 * read-only details, and that same queue's editable routing rules.
 */
export const useRoutingStore = createTableStore({
  content: routingData,
  rows: routingData?.rows,
  searchFields: ["name", "description"],
  filters: routingData?.filters,
  paramsSchema: routingParamsSchema,
  summaryTemplate: routingData?.pagination?.summary,
  addPanelClears: [QUEUE, RULES],
  extend: (set, get) => ({
    queueDetailContent: queueDetailData,
    rulesContent: editRoutingRulesData,

    selectedQueue: (params) => queueDetails.get(params?.[QUEUE]) ?? null,
    selectedRules: (params) => queueRules.get(params?.[RULES]) ?? null,

    openQueue: (row) =>
      get()?.setParams?.({ [QUEUE]: row?.id, [RULES]: null, [PANEL_PARAM]: null }),
    setQueueOpen: (open) => {
      if (!open) get()?.setParams?.({ [QUEUE]: null });
    },

    /** Swaps the read-only details panel for the editable rules panel, for the same queue. */
    openRules: (id) => get()?.setParams?.({ [QUEUE]: null, [RULES]: id }),
    setRulesOpen: (open) => {
      if (!open) get()?.setParams?.({ [RULES]: null });
    },
  }),
});
