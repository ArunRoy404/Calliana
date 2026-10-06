"use client";

import TableDirectory from "@/components/tables/TableDirectory";
import { useAgentCallHistoryStore } from "@/store/agent/useAgentCallHistoryStore";

/**
 * The agent workspace's Call History — the shared `TableDirectory` over
 * the agent's call log. "Review Log", the call button and "Export CSV"
 * carry their own `notFunctional` props.
 */
export default function AgentCallHistoryView() {
  return <TableDirectory useStore={useAgentCallHistoryStore} />;
}
