"use client";

import DialOutboundCallPanel from "@/components/calls/add/DialOutboundCallPanel";
import CallDetailPanel from "@/components/calls/detail/CallDetailPanel";
import TableDirectory from "@/components/tables/TableDirectory";
import { useCallsStore } from "@/store/admin/useCallsStore";

/**
 * Calls directory — Figma 202:38783: the shared `TableDirectory` over a
 * calls store, plus the dial-outbound drawer and one call's details drawer.
 * The admin's Calls and the agent's Calls and Voicemail are this one
 * screen; `useStore` is the list it shows (the admin's by default), and its
 * toolbar comes from that store's own filters. The dialer is there only
 * when the list has an add action (the voicemail list has none).
 *
 * The table's action column has two actions per row ("Details" and the
 * icon-only call button); only "Details" opens the details panel; the call
 * button already carries its own `notFunctional` toast.
 */
export default function CallsDirectory({ useStore = useCallsStore }) {
  const openCall = useStore((state) => state.openCall);
  const addAction = useStore((state) => state.content?.addAction);

  function handleRowAction(row, action) {
    if (action?.id === "details") openCall?.(row);
  }

  return (
    <>
      <TableDirectory useStore={useStore} onRowAction={handleRowAction} />
      {addAction && <DialOutboundCallPanel useListStore={useStore} />}
      <CallDetailPanel useStore={useStore} />
    </>
  );
}
