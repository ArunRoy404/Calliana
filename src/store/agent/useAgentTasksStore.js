import {
  MY_AGENT_KEY,
  TASK_ICONS,
  agentTasksData,
} from "@/data/agent/tasks.data";
import { agentTasksParamsSchema } from "@/schemas/agent/agent-tasks-params.schema";
import { createTableStore } from "@/store/createTableStore";

/**
 * Each task with what the agent's list adds: the `views` its pill filter
 * reads (its due bucket, plus "mine" when it is the agent's own) and the
 * glyph before its title (red when overdue). Built once.
 */
const agentTaskRows =
  agentTasksData?.rows?.map((row) => ({
    ...row,
    views: [row?.view, row?.assignedToKey === MY_AGENT_KEY && "mine"].filter(
      Boolean,
    ),
    taskIcon:
      row?.statusKey === "overdue" ? TASK_ICONS?.overdue : TASK_ICONS?.default,
  })) ?? [];

/**
 * The agent workspace's Task & Follow-ups — the admin's tasks with the
 * agent's toolbar: search, the pill filter, rows per page and paging in the
 * URL (rule 26), and the "Create Operational Task" drawer at `?panel=add`.
 */
export const useAgentTasksStore = createTableStore({
  content: agentTasksData,
  rows: agentTaskRows,
  searchFields: ["title", "client", "assignedTo"],
  filters: agentTasksData?.filters,
  paramsSchema: agentTasksParamsSchema,
  summaryTemplate: agentTasksData?.pagination?.summary,
});
