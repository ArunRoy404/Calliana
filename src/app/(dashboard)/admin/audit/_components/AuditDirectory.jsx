"use client";

import TableDirectory from "@/components/tables/TableDirectory";
import { useAuditStore } from "@/store/admin/useAuditStore";

/**
 * Audit directory — Figma 266:31298: the shared `TableDirectory` over the
 * audit store. No drawers — an entry is a record, not something to create or
 * open further.
 */
export default function AuditDirectory() {
  return <TableDirectory useStore={useAuditStore} />;
}
