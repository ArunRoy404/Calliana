import { callHistoryData } from "@/data/agent/call-history.data";
import { agentCallHistoryParamsSchema } from "@/schemas/agent/agent-call-history-params.schema";
import { createTableStore } from "@/store/createTableStore";

/**
 * The agent workspace's Call History — the agent's own call log: search,
 * the direction and outcome filters, rows per page and paging in the URL
 * (rule 26), and "Export CSV" beside them. The dashboard's recent calls
 * are the first rows of this same log.
 */
export const useAgentCallHistoryStore = createTableStore({
  content: callHistoryData,
  rows: callHistoryData?.rows,
  searchFields: ["caller", "phone", "client", "purpose"],
  filters: callHistoryData?.filters,
  paramsSchema: agentCallHistoryParamsSchema,
  summaryTemplate: callHistoryData?.pagination?.summary,
});
