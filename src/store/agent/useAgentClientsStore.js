import {
  AGENT_CLIENT_DETAIL_HREF,
  AGENT_CLIENT_DETAIL_LINKS,
  agentClientDetailData,
  agentClientsData,
} from "@/data/agent/clients.data";
import { withContentLinks } from "@/lib/actionLinks";
import { clientsParamsSchema } from "@/schemas/clients/clients-params.schema";
import { conversationLinkValues } from "@/store/admin/useMessagesStore";
import { createClientsStore } from "@/store/clients/createClientsStore";

/**
 * The agent workspace's Client Accounts — the shared clients store over
 * the agent's data: the list (same URL keys as the admin's: `q`,
 * `category`, `status`, `page`, `size`) and each client's page at
 * `/agent/clients/<id>?tab=…`, with the agent's own links on that page
 * (`AGENT_CLIENT_DETAIL_LINKS`): Message and Create Task.
 */
export const useAgentClientsStore = createClientsStore({
  content: agentClientsData,
  detailContent: withContentLinks(
    agentClientDetailData,
    AGENT_CLIENT_DETAIL_LINKS,
  ),
  linkValues: conversationLinkValues,
  detailHrefTemplate: AGENT_CLIENT_DETAIL_HREF,
  paramsSchema: clientsParamsSchema,
});
