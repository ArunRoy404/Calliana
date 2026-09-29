import { addClientData } from "@/data/admin/add-client.data";
import {
  addClientDefaultValues,
  addClientSchema,
} from "@/schemas/clients/add-client.schema";
import { useClientsStore } from "@/store/admin/useClientsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The add-client form — Figma 202:31067. Values, validation and the drawer's
 * cancel / submit all come from `createFormStore`. With no backend yet, a
 * valid submit says so and closes the drawer.
 */
export const useAddClientFormStore = createFormStore({
  schema: addClientSchema,
  defaultValues: addClientDefaultValues,
  closePanel: () => useClientsStore.getState()?.setAddOpen?.(false),
  notFunctional: {
    message: addClientData?.notFunctionalMessage,
    description: addClientData?.notFunctionalDescription,
  },
  extend: () => ({ content: addClientData }),
});
