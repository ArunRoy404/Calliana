import { editRoutingRulesData } from "@/data/admin/edit-routing-rules.data";
import {
  editRoutingRulesDefaultValues,
  editRoutingRulesSchema,
} from "@/schemas/routing/edit-routing-rules.schema";
import { useRoutingStore } from "@/store/admin/useRoutingStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The edit-routing-rules form — Figma 376:28372. Unlike the create-queue
 * form, this one edits an *existing* record, so its values are loaded per
 * queue via `loadQueue` (called from the panel when the opened queue
 * changes) rather than fixed at store creation. There is no backend yet, so
 * a valid submit closes the panel and says so, rather than pretending the
 * change saved.
 */
export const useEditRoutingRulesFormStore = createFormStore({
  schema: editRoutingRulesSchema,
  defaultValues: editRoutingRulesDefaultValues,
  closePanel: () => useRoutingStore.getState()?.setRulesOpen?.(false),
  notFunctional: {
    message: editRoutingRulesData?.notFunctionalMessage,
    description: editRoutingRulesData?.notFunctionalDescription,
  },
  extend: (set) => ({
    content: editRoutingRulesData,
    loadedQueueId: null,

    loadQueue: (queue) => {
      if (!queue?.id) return;
      set({
        loadedQueueId: queue?.id,
        values: {
          distributionStrategy: queue?.distributionStrategy,
          queuePriority: queue?.queuePriority,
          maxSla: queue?.maxSla,
          ringTimeout: queue?.ringTimeout,
          primaryFallback: queue?.primaryFallback,
          secondFallback: queue?.secondFallback,
          simultaneousFallback: Boolean(queue?.simultaneousFallback),
          ivrGreeting: queue?.ivrGreeting,
          queueActive: Boolean(queue?.queueActive),
        },
        touched: {},
        errors: {},
        visibleErrors: {},
      });
    },
  }),
});
