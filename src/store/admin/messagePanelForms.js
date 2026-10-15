import { useCallAccountLeadFormStore } from "@/store/admin/useCallAccountLeadFormStore";
import { useMessageCallbackFormStore } from "@/store/admin/useMessageCallbackFormStore";
import { useMessageTaskFormStore } from "@/store/admin/useMessageTaskFormStore";

/**
 * The drawers the admin opens over an inbox conversation, by id — each a
 * record form store `RecordFormPanels` draws. The ids match the `panel`s in
 * the admin's `actionLinks` and `MESSAGES_RECORD_PANEL_KEYS`. Kept out of
 * `useMessagesStore`: the clients page's server code reads that store, and
 * form stores (toasts) are client-only.
 */
export const ADMIN_MESSAGE_PANEL_FORMS = {
  callback: useMessageCallbackFormStore,
  lead: useCallAccountLeadFormStore,
  task: useMessageTaskFormStore,
};
