"use client";

import AddClientPanel from "@/components/clients/add/AddClientPanel";
import TableDirectory from "@/components/tables/TableDirectory";
import { useClientsStore } from "@/store/admin/useClientsStore";

/**
 * Clients directory — Figma 198:21625: the shared `TableDirectory` over the
 * clients store, plus the add drawer. "View Account" is a link to the
 * client's own page; the call button has no backend yet and says so.
 */
export default function ClientsDirectory() {
  return (
    <>
      <TableDirectory useStore={useClientsStore} />
      <AddClientPanel />
    </>
  );
}
