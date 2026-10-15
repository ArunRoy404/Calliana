import { messageCallbackData } from "@/data/admin/message-forms.data";
import {
  callClientDefaultValues,
  callClientSchema,
} from "@/schemas/clients/client-forms.schema";
import { useMessagesStore } from "@/store/admin/useMessagesStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The inbox's "Call back" drawer — the client page's Call client form (the
 * same schema, fields and Zoiper note) addressed to whoever wrote in. Zoiper
 * is not wired up yet, so "Open Zoiper" validates, says so and closes.
 */
export const useMessageCallbackFormStore = createFormStore({
  content: messageCallbackData,
  schema: callClientSchema,
  defaultValues: callClientDefaultValues,
  closePanel: () => useMessagesStore.getState()?.closeRecordPanel?.("callback"),
  fromRecord: (conversation) => ({
    reason: conversation?.callReason,
    notes: conversation?.callNotes,
  }),
});
