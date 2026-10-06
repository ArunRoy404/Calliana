"use client";

import TableDirectory from "@/components/tables/TableDirectory";
import AddTaskPanel from "@/components/tasks/add/AddTaskPanel";
import { useAgentTasksStore } from "@/store/agent/useAgentTasksStore";

/**
 * The agent workspace's Task & Follow-ups — the shared `TableDirectory`
 * over the agent's tasks store, plus the same "Create Operational Task"
 * drawer the admin's list opens. Each row's "…" carries its own
 * `notFunctional` props, so no row-action handler is needed.
 */
export default function AgentTasksView() {
  return (
    <>
      <TableDirectory useStore={useAgentTasksStore} />
      <AddTaskPanel useListStore={useAgentTasksStore} />
    </>
  );
}
