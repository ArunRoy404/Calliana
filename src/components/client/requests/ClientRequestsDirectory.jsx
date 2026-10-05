"use client";

import NewRequestPanel from "@/components/client/requests/NewRequestPanel";
import TableDirectory from "@/components/tables/TableDirectory";
import { useClientRequestsStore } from "@/store/client/useClientRequestsStore";

/**
 * Service Requests & Instructions — the client's requests on the shared
 * `TableDirectory` (search, the category and status filters, rows per page,
 * "New Instruction Request", the table or cards, the pager), plus the
 * new-request drawer it opens.
 */
export default function ClientRequestsDirectory() {
  return (
    <>
      <TableDirectory useStore={useClientRequestsStore} />
      <NewRequestPanel />
    </>
  );
}
