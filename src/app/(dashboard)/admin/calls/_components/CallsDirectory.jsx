"use client";

import DialOutboundCallPanel from "@/components/calls/add/DialOutboundCallPanel";
import CallDetailPanel from "@/components/calls/detail/CallDetailPanel";
import TableDirectory from "@/components/tables/TableDirectory";
import { useCallsStore } from "@/store/admin/useCallsStore";

/**
 * Calls directory — Figma 202:38783: the shared `TableDirectory` over the
 * calls store, plus the dial-outbound drawer and one call's details drawer.
 *
 * The table's action column has two actions per row ("Details" and the
 * icon-only call button); only "Details" opens the details panel; the call
 * button already carries its own `notFunctional` toast.
 */
export default function CallsDirectory() {
  const openCall = useCallsStore((state) => state.openCall);

  function handleRowAction(row, action) {
    if (action?.id === "details") openCall?.(row);
  }

  return (
    <>
      <TableDirectory useStore={useCallsStore} onRowAction={handleRowAction} />
      <DialOutboundCallPanel />
      <CallDetailPanel />
    </>
  );
}
