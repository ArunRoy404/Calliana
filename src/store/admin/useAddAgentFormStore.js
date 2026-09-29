import { gooeyToast } from "goey-toast";

import { addAgentData } from "@/data/admin/add-agent.data";
import {
  addAgentDefaultValues,
  addAgentSchema,
} from "@/schemas/agents/add-agent.schema";
import { useAgentsStore } from "@/store/admin/useAgentsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The add-agent form — Figma 198:32312. Values, validation and touched state
 * come from `createFormStore`; this adds the panel's own actions.
 *
 * There is no backend yet, so a valid submit closes the panel and says so,
 * rather than pretending an invite went out.
 */
export const useAddAgentFormStore = createFormStore({
  schema: addAgentSchema,
  defaultValues: addAgentDefaultValues,
  extend: (set, get) => ({
    content: addAgentData,

    /** One edge (`from` / `to`) of one day's working hours. */
    setHour: (day, edge, value) =>
      get()?.setField?.("hours", (hours) => ({
        ...hours,
        [day]: { ...hours?.[day], [edge]: value },
      })),

    cancel: () => {
      useAgentsStore.getState()?.setAddOpen?.(false);
      get()?.reset?.();
    },

    submitInvite: () => {
      if (!get()?.submit?.()) return false;

      gooeyToast.info(addAgentData?.notFunctionalMessage, {
        description: addAgentData?.notFunctionalDescription,
      });
      get()?.cancel?.();
      return true;
    },
  }),
});
