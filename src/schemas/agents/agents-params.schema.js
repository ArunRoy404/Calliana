import { agentDetailData } from "@/data/admin/agent-detail.data";
import { agentsData } from "@/data/admin/agents.data";
import { TABLE_DEFAULTS } from "@/data/tables/table-defaults.data";
import {
  createListParamsSchema,
  enumParam,
  optionalEnumParam,
  optionalIdParam,
} from "@/schemas/url/list-params.schema";

/** The agents page's own URL keys, beyond the shared list ones. */
export const AGENTS_PARAM_KEYS = {
  filter: "status",
  agent: "agent",
  tab: "tab",
  panel: "panel",
};

/** `?panel=add` — the add-agent drawer. */
export const AGENTS_PANELS = { add: "add" };

/**
 * Everything the agents page keeps in its URL:
 * `/admin/agents?q=sofia&status=busy&page=2&size=20` for the list, plus
 * `&agent=sofia-martinez&tab=calls` for an open agent or `&panel=add` for the
 * add drawer. A link to any of those opens the page exactly there.
 *
 * Shared by the store (client) and, once the list is fetched, the page
 * (server) — one definition of what the URL may say.
 */
export const agentsParamsSchema = createListParamsSchema({
  filterParam: AGENTS_PARAM_KEYS.filter,
  filterValues: agentsData?.filter?.options?.map((option) => option?.value),
  pageSizes: TABLE_DEFAULTS?.pageSizeOptions,
  defaultPageSize: TABLE_DEFAULTS?.pageSize,
  extra: {
    [AGENTS_PARAM_KEYS.agent]: optionalIdParam,
    [AGENTS_PARAM_KEYS.tab]: enumParam(
      agentDetailData?.tabs?.map((tab) => tab?.id),
    ),
    [AGENTS_PARAM_KEYS.panel]: optionalEnumParam(Object.values(AGENTS_PANELS)),
  },
});
