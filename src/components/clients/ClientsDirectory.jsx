"use client";

import AddClientPanel from "@/components/clients/add/AddClientPanel";
import TableDirectory from "@/components/tables/TableDirectory";
import { useClientsStore } from "@/store/admin/useClientsStore";

/**
 * Clients directory — Figma 198:21625: the shared `TableDirectory` over a
 * clients store, plus the add drawer when the list has an add action (the
 * admin's; the agent's has none). "View Account" is a link to the client's
 * own page; the call button has no backend yet and says so.
 *
 * `useStore` is the list it shows — the admin's by default, the agent
 * workspace's Client Accounts too.
 */
export default function ClientsDirectory({ useStore = useClientsStore }) {
  const addAction = useStore((state) => state.content?.addAction);

  return (
    <>
      <TableDirectory useStore={useStore} />
      {addAction && <AddClientPanel />}
    </>
  );
}
