import { tasksData } from "@/data/admin/tasks.data";
import { tasksParamsSchema } from "@/schemas/tasks/tasks-params.schema";
import { createTableStore } from "@/store/createTableStore";

/**
 * The tasks directory — its content plus the search, due-date view, agent,
 * priority and status filters the table runs on, and the create-task drawer
 * (`?panel=add`, from `createTableStore`).
 */
export const useTasksStore = createTableStore({
  content: tasksData,
  rows: tasksData?.rows,
  searchFields: ["title", "client", "assignedTo"],
  filters: tasksData?.filters,
  paramsSchema: tasksParamsSchema,
  summaryTemplate: tasksData?.pagination?.summary,
});
