import { connection } from "next/server";

import UsersDirectory from "@/app/(dashboard)/admin/roles/_components/UsersDirectory";

export const metadata = {
  title: "User & Roles · Calliana",
  description: "Manage platform accounts, roles and access.",
};

/**
 * User & Roles — Figma 210:44307. The shell lives in the layout.
 *
 * The page's state lives in its URL, so a shared link
 * (`?role=administrator&status=suspended&page=2`) arrives already filtered.
 */
export default async function RolesPage() {
  await connection();
  return <UsersDirectory />;
}
