import { addTaskData } from "@/data/admin/add-task.data";
import { addTaskDefaultValues, addTaskSchema } from "@/schemas/tasks/add-task.schema";
import { useTasksStore } from "@/store/admin/useTasksStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The create-task form — Figma 208:42777. There is no backend yet, so a
 * valid submit closes the panel and says so, rather than pretending the task
 * was created.
 */
export const useAddTaskFormStore = createFormStore({
  schema: addTaskSchema,
  defaultValues: addTaskDefaultValues,
  closePanel: () => useTasksStore.getState()?.setAddOpen?.(false),
  notFunctional: {
    message: addTaskData?.notFunctionalMessage,
    description: addTaskData?.notFunctionalDescription,
  },
  extend: () => ({
    content: addTaskData,
  }),
});
