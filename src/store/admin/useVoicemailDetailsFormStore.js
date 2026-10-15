import { voicemailData } from "@/data/admin/voicemail.data";
import {
  voicemailNoteDefaultValues,
  voicemailNoteSchema,
} from "@/schemas/calls/call-forms.schema";
import { useVoicemailStore } from "@/store/admin/useVoicemailStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The "Voicemail details" drawer's form — the voicemail's internal handling
 * note, seeded from its record. "Call back" saves nothing yet (it says so)
 * and moves on to the return-call drawer for the same voicemail.
 */
export const useVoicemailDetailsFormStore = createFormStore({
  content: voicemailData?.detailsForm,
  schema: voicemailNoteSchema,
  defaultValues: voicemailNoteDefaultValues,
  closePanel: () => useVoicemailStore.getState()?.closeRecordPanel?.("details"),
  onSubmitted: (id) =>
    useVoicemailStore.getState()?.openRecordPanel?.("returnCall", id),
  fromRecord: (voicemail) => ({ internalNote: voicemail?.internalNote }),
});
