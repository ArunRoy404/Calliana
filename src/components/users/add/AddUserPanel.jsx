"use client";

import AddUserFields from "@/components/users/add/AddUserFields";
import FormPanel from "@/components/overlays/FormPanel";
import { useAddUserFormStore } from "@/store/admin/useAddUserFormStore";
import { useUsersStore } from "@/store/admin/useUsersStore";

/** "Add User" — the users toolbar's primary action, on the shared `FormPanel`. */
export default function AddUserPanel() {
  return (
    <FormPanel useListStore={useUsersStore} useFormStore={useAddUserFormStore}>
      <AddUserFields />
    </FormPanel>
  );
}
