"use client";

import AddTaskPanel from "@/components/tasks/add/AddTaskPanel";
import TableDirectory from "@/components/tables/TableDirectory";
import { useTasksStore } from "@/store/admin/useTasksStore";

/**
 * Tasks directory — Figma 208:42520: the shared `TableDirectory` over the
 * tasks store, plus the create-task drawer. "Mark Complete" has no backend
 * yet, so its own `notFunctional` props (set in the column data) already
 * cover it — the directory needs no row-action handler.
 */
export default function TasksDirectory() {
  return (
    <>
      <TableDirectory useStore={useTasksStore} />
      <AddTaskPanel />
    </>
  );
}
