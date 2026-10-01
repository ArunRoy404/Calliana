import { addRoutingQueueData } from "@/data/admin/add-routing-queue.data";
import {
  addRoutingQueueDefaultValues,
  addRoutingQueueSchema,
} from "@/schemas/routing/add-routing-queue.schema";
import { useRoutingStore } from "@/store/admin/useRoutingStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The create-routing-queue form — Figma 381:38131. There is no backend yet,
 * so a valid submit closes the panel and says so, rather than pretending the
 * queue was created.
 */
export const useAddRoutingQueueFormStore = createFormStore({
  schema: addRoutingQueueSchema,
  defaultValues: addRoutingQueueDefaultValues,
  closePanel: () => useRoutingStore.getState()?.setAddOpen?.(false),
  notFunctional: {
    message: addRoutingQueueData?.notFunctionalMessage,
    description: addRoutingQueueData?.notFunctionalDescription,
  },
  extend: () => ({
    content: addRoutingQueueData,
  }),
});
