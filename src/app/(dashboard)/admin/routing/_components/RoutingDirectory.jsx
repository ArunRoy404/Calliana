"use client";

import AddRoutingQueuePanel from "@/components/routing/add/AddRoutingQueuePanel";
import EditRoutingRulesPanel from "@/components/routing/detail/EditRoutingRulesPanel";
import QueueDetailPanel from "@/components/routing/detail/QueueDetailPanel";
import TableDirectory from "@/components/tables/TableDirectory";
import { useRoutingStore } from "@/store/admin/useRoutingStore";

/**
 * Routing directory — Figma 381:38131: the shared `TableDirectory` over the
 * routing store, plus the create-queue drawer, one queue's read-only
 * details drawer (381:38657) and that queue's editable routing-rules drawer
 * (376:28372) — two different panels for one queue, opened one at a time.
 */
export default function RoutingDirectory() {
  const openQueue = useRoutingStore((state) => state.openQueue);

  return (
    <>
      <TableDirectory useStore={useRoutingStore} onRowAction={openQueue} />
      <AddRoutingQueuePanel />
      <QueueDetailPanel />
      <EditRoutingRulesPanel />
    </>
  );
}
