import { useReturnVoicemailCallFormStore } from "@/store/admin/useReturnVoicemailCallFormStore";
import { useVoicemailDetailsFormStore } from "@/store/admin/useVoicemailDetailsFormStore";

/**
 * The drawers the admin opens over one voicemail, by id — each a record
 * form store `RecordFormPanels` draws. The ids match the row actions'
 * `panel` and the keys in `useVoicemailStore`'s `recordPanelSlice`. Kept
 * out of `useVoicemailStore`, which the form stores themselves import.
 */
export const ADMIN_VOICEMAIL_PANEL_FORMS = {
  details: useVoicemailDetailsFormStore,
  returnCall: useReturnVoicemailCallFormStore,
};
