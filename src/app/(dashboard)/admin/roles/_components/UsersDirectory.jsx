"use client";

import AddUserPanel from "@/components/users/add/AddUserPanel";
import TableDirectory from "@/components/tables/TableDirectory";
import { useUsersStore } from "@/store/admin/useUsersStore";

/**
 * Users directory — Figma 210:44307: the shared `TableDirectory` over the
 * users store, plus the add-user drawer. "Edit user" has no backend yet, so
 * its own `notFunctional` props (set in the column data) already cover it.
 */
export default function UsersDirectory() {
  return (
    <>
      <TableDirectory useStore={useUsersStore} />
      <AddUserPanel />
    </>
  );
}
