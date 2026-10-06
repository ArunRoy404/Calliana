"use client";

import AddTaskFields from "@/components/tasks/add/AddTaskFields";
import FormPanel from "@/components/overlays/FormPanel";
import { useAddTaskFormStore } from "@/store/admin/useAddTaskFormStore";
import { useTasksStore } from "@/store/admin/useTasksStore";

/**
 * "Create Operational Task" — Figma 208:42777, on the shared `FormPanel`.
 * `useListStore` is the task list it opens from (the admin's by default,
 * the agent's too); its `?panel=add` opens it.
 */
export default function AddTaskPanel({ useListStore = useTasksStore }) {
  return (
    <FormPanel useListStore={useListStore} useFormStore={useAddTaskFormStore}>
      <AddTaskFields />
    </FormPanel>
  );
}
