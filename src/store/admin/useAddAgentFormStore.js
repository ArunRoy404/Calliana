import { addAgentData } from "@/data/admin/add-agent.data";
import {
  addAgentDefaultValues,
  addAgentSchema,
} from "@/schemas/agents/add-agent.schema";
import { useAgentsStore } from "@/store/admin/useAgentsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The add-agent form — Figma 198:32312. Values, validation, touched state and
 * the drawer's cancel / submit come from `createFormStore`; this adds the
 * working-hours setter.
 *
 * There is no backend yet, so a valid submit closes the panel and says so,
 * rather than pretending an invite went out.
 */
export const useAddAgentFormStore = createFormStore({
  schema: addAgentSchema,
  defaultValues: addAgentDefaultValues,
  closePanel: () => useAgentsStore.getState()?.setAddOpen?.(false),
  notFunctional: {
    message: addAgentData?.notFunctionalMessage,
    description: addAgentData?.notFunctionalDescription,
  },
  extend: (set, get) => ({
    content: addAgentData,

    /** One edge (`from` / `to`) of one day's working hours. */
    setHour: (day, edge, value) =>
      get()?.setField?.("hours", (hours) => ({
        ...hours,
        [day]: { ...hours?.[day], [edge]: value },
      })),
  }),
});
