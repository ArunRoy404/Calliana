import {
  AGENT_CLIENT_DETAIL_HREF,
  agentClientDetailData,
  agentClientsData,
} from "@/data/agent/clients.data";
import { clientsParamsSchema } from "@/schemas/clients/clients-params.schema";
import { createClientsStore } from "@/store/clients/createClientsStore";

/**
 * The agent workspace's Client Accounts — the shared clients store over
 * the agent's data: the list (same URL keys as the admin's: `q`,
 * `category`, `status`, `page`, `size`) and each client's page at
 * `/agent/clients/<id>?tab=…`.
 */
export const useAgentClientsStore = createClientsStore({
  content: agentClientsData,
  detailContent: agentClientDetailData,
  detailHrefTemplate: AGENT_CLIENT_DETAIL_HREF,
  paramsSchema: clientsParamsSchema,
});
