import { callClientData } from "@/data/admin/client-forms.data";
import {
  callClientDefaultValues,
  callClientSchema,
} from "@/schemas/clients/client-forms.schema";
import { closeClientPanel } from "@/store/clients/createClientsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The "Call client" drawer's form — why the call is being made and notes for
 * it, seeded from the open client. The call itself happens in Zoiper, which
 * is not wired up yet, so "Open Zoiper" validates, says so and closes.
 */
export const useCallClientFormStore = createFormStore({
  content: callClientData,
  schema: callClientSchema,
  defaultValues: callClientDefaultValues,
  closePanel: closeClientPanel,
  fromRecord: (client) => ({
    reason: client?.callReason,
    notes: client?.callNotes,
  }),
});
