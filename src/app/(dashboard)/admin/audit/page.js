import { connection } from "next/server";

import AuditDirectory from "@/app/(dashboard)/admin/audit/_components/AuditDirectory";

export const metadata = {
  title: "System Activity · Calliana",
  description: "Security and compliance audit log of platform activity.",
};

/**
 * System Activity & Security Audit Log — Figma 266:31298. The shell lives in
 * the layout. The page's state lives in its URL, so a shared link
 * (`?role=admin&action=queue&page=2`) arrives already filtered.
 */
export default async function AuditPage() {
  await connection();
  return <AuditDirectory />;
}
