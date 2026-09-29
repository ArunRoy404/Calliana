"use client";

import AddAgentPanel from "@/components/agents/add/AddAgentPanel";
import AgentDetailPanel from "@/components/agents/detail/AgentDetailPanel";
import TableDirectory from "@/components/tables/TableDirectory";
import { useAgentsStore } from "@/store/admin/useAgentsStore";

/**
 * Agents directory — Figma 198:22835: the shared `TableDirectory` over the
 * agents store, plus the add drawer and one agent's detail drawer (both the
 * shared `SidePanel`).
 *
 * Search, filter, rows per page, page and the open panel all live in the URL,
 * so any view of this page is a link that reopens it exactly.
 */
export default function AgentsDirectory() {
  const openAgent = useAgentsStore((state) => state.openAgent);

  return (
    <>
      <TableDirectory useStore={useAgentsStore} onRowAction={openAgent} />
      <AddAgentPanel />
      <AgentDetailPanel />
    </>
  );
}
