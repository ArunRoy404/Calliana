import { tasksData } from "@/data/admin/tasks.data";
import { createListParamsSchema, filterParamsFrom } from "@/schemas/url/list-params.schema";

/**
 * Everything the tasks page keeps in its URL:
 * `/admin/tasks?q=callback&view=overdue&priority=urgent&page=2` for the list,
 * plus `&panel=add` for the create-task drawer.
 */
export const tasksParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(tasksData?.filters),
  addPanel: true,
});
