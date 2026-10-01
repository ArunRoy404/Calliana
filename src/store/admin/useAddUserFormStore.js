import { addUserData } from "@/data/admin/add-user.data";
import { addUserDefaultValues, addUserSchema } from "@/schemas/users/add-user.schema";
import { useUsersStore } from "@/store/admin/useUsersStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The add-user form. There is no backend yet, so a valid submit closes the
 * panel and says so, rather than pretending the invite went out.
 */
export const useAddUserFormStore = createFormStore({
  schema: addUserSchema,
  defaultValues: addUserDefaultValues,
  closePanel: () => useUsersStore.getState()?.setAddOpen?.(false),
  notFunctional: {
    message: addUserData?.notFunctionalMessage,
    description: addUserData?.notFunctionalDescription,
  },
  extend: () => ({
    content: addUserData,
  }),
});
