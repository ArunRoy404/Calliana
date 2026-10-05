import { agentCallsData } from "@/data/agent/calls.data";
import { CALLS_PARAM_KEYS } from "@/schemas/calls/calls-params.schema";
import {
  createListParamsSchema,
  filterParamsFrom,
  optionalIdParam,
} from "@/schemas/url/list-params.schema";

/**
 * Everything the agent's Calls page keeps in its URL —
 * `/agent/calls?q=isabel&view=missed&client=laura-alegre-clinic&page=2` for
 * the list, plus `&call=<id>` for an open call's details or `&panel=add`
 * for the dialer. The same keys as the admin's calls page.
 */
export const agentCallsParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(agentCallsData?.filters),
  addPanel: true,
  extra: { [CALLS_PARAM_KEYS.call]: optionalIdParam },
});
