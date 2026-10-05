"use client";

import ContactDetailPanel from "@/components/client/contacts/ContactDetailPanel";
import TableDirectory from "@/components/tables/TableDirectory";
import { useClientContactsStore } from "@/store/client/useClientContactsStore";

/**
 * Contacts — the client's customers and patients on the shared
 * `TableDirectory` (search, the call-outcome filter, rows per page,
 * "Add Contact", the table or cards, the pager), plus the details drawer
 * each row's "…" opens at `?contact=<id>`.
 */
export default function ClientContactsDirectory() {
  const openContact = useClientContactsStore((state) => state.openContact);

  return (
    <>
      <TableDirectory
        useStore={useClientContactsStore}
        onRowAction={openContact}
      />
      <ContactDetailPanel />
    </>
  );
}
