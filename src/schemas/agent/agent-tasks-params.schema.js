import { agentTasksData } from "@/data/agent/tasks.data";
import {
  createListParamsSchema,
  filterParamsFrom,
} from "@/schemas/url/list-params.schema";

/**
 * Everything the agent's Task & Follow-ups keeps in its URL —
 * `/agent/tasks?q=callback&view=mine&page=2` for the list, plus
 * `&panel=add` for the "Create Operational Task" drawer.
 */
export const agentTasksParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(agentTasksData?.filters),
  addPanel: true,
});
