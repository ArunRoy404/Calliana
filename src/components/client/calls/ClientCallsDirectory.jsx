"use client";

import CallDetailPanel from "@/components/calls/detail/CallDetailPanel";
import TableDirectory from "@/components/tables/TableDirectory";
import { useClientCallsStore } from "@/store/client/useClientCallsStore";

/**
 * Calls & Notes — Figma 167:41075: the client's call log on the shared
 * `TableDirectory` (search, the call-outcome filter, rows per page,
 * "Explore Call History", the table or cards, the pager), plus the call
 * details drawer each row's "Review Call" opens at `?call=<id>`.
 */
export default function ClientCallsDirectory() {
  return (
    <>
      <TableDirectory useStore={useClientCallsStore} />
      <CallDetailPanel useStore={useClientCallsStore} />
    </>
  );
}
