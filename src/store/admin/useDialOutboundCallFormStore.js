import { dialOutboundCallData } from "@/data/admin/dial-outbound-call.data";
import {
  dialOutboundCallDefaultValues,
  dialOutboundCallSchema,
} from "@/schemas/calls/dial-outbound-call.schema";
import { useCallsStore } from "@/store/admin/useCallsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The "Dial Outbound Call" form — the calls toolbar's primary action. There
 * is no softphone connected yet, so a valid submit closes the panel and says
 * so, rather than pretending the call was placed.
 *
 * `dialerTab` (keypad vs. quick contacts) is the panel's own ephemeral UI
 * state, not URL-driven view state (rule 26 is for state a link should
 * reopen; nothing should ever deep-link into one tab of a transient dialer),
 * so it lives here rather than in `useState` (rule 2) or the URL.
 */
export const useDialOutboundCallFormStore = createFormStore({
  schema: dialOutboundCallSchema,
  defaultValues: dialOutboundCallDefaultValues,
  closePanel: () => useCallsStore.getState()?.setAddOpen?.(false),
  notFunctional: {
    message: dialOutboundCallData?.notFunctionalMessage,
    description: dialOutboundCallData?.notFunctionalDescription,
  },
  extend: (set, get) => ({
    content: dialOutboundCallData,
    dialerTab: "keypad",
    setDialerTab: (tab) => set({ dialerTab: tab }),

    pressDigit: (digit) => get()?.setField?.("phone", (value) => `${value ?? ""}${digit}`),
    backspace: () => get()?.setField?.("phone", (value) => `${value ?? ""}`.slice(0, -1)),

    /** Fills the number from the directory and dials it straight away. */
    selectContact: (contact) => {
      get()?.setField?.("phone", contact?.phone);
      get()?.setField?.("recipientName", contact?.name);
      get()?.submitAndClose?.();
    },
  }),
});
