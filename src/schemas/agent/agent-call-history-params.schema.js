import { callHistoryData } from "@/data/agent/call-history.data";
import {
  createListParamsSchema,
  filterParamsFrom,
} from "@/schemas/url/list-params.schema";

/**
 * Everything the agent's Call History keeps in its URL —
 * `/agent/call-history?q=ramon&direction=incoming&outcome=missed&page=2`.
 */
export const agentCallHistoryParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(callHistoryData?.filters),
});
