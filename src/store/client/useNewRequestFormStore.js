import { newRequestData } from "@/data/client/new-request.data";
import {
  newRequestDefaultValues,
  newRequestSchema,
} from "@/schemas/client/new-request.schema";
import { useClientRequestsStore } from "@/store/client/useClientRequestsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The new-request form. There is no backend yet, so a valid submit closes
 * the drawer and says so, rather than pretending the request was sent
 * (rule 23).
 */
export const useNewRequestFormStore = createFormStore({
  schema: newRequestSchema,
  defaultValues: newRequestDefaultValues,
  closePanel: () => useClientRequestsStore.getState()?.setAddOpen?.(false),
  notFunctional: {
    message: newRequestData?.notFunctionalMessage,
    description: newRequestData?.notFunctionalDescription,
  },
  extend: () => ({ content: newRequestData }),
});
