"use client";

import AddTaskFields from "@/components/tasks/add/AddTaskFields";
import FormPanel from "@/components/overlays/FormPanel";
import { useAddTaskFormStore } from "@/store/admin/useAddTaskFormStore";
import { useTasksStore } from "@/store/admin/useTasksStore";

/** "Create Operational Task" — Figma 208:42777, on the shared `FormPanel`. */
export default function AddTaskPanel() {
  return (
    <FormPanel useListStore={useTasksStore} useFormStore={useAddTaskFormStore}>
      <AddTaskFields />
    </FormPanel>
  );
}
