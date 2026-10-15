import { editCallNotesData } from "@/data/admin/call-forms.data";
import {
  editCallNotesDefaultValues,
  editCallNotesSchema,
} from "@/schemas/calls/call-forms.schema";
import { useCallsStore } from "@/store/admin/useCallsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The "Edit call notes" drawer's form — the call's client-visible note and
 * its internal handling note, seeded from the notes its details drawer
 * shows (the agent notes and the internal triage note). There is no backend
 * yet, so a valid submit says so and closes.
 */
export const useEditCallNotesFormStore = createFormStore({
  content: editCallNotesData,
  schema: editCallNotesSchema,
  defaultValues: editCallNotesDefaultValues,
  closePanel: () => useCallsStore.getState()?.closeRecordPanel?.("notes"),
  fromRecord: (call) => ({
    callNote: call?.agentNotes,
    internalNote: call?.triageNote,
  }),
});
