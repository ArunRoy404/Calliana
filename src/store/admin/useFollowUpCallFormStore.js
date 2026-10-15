import { followUpCallData } from "@/data/admin/appointment-forms.data";
import {
  callClientDefaultValues,
  callClientSchema,
} from "@/schemas/clients/client-forms.schema";
import { useAppointmentsStore } from "@/store/admin/useAppointmentsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The calendar's "Follow-up call" drawer — the client page's Call client
 * form (the same schema and fields) for the appointment's contact. Zoiper
 * is not wired up yet, so "Open Zoiper" validates, says so and closes.
 */
export const useFollowUpCallFormStore = createFormStore({
  content: followUpCallData,
  schema: callClientSchema,
  defaultValues: callClientDefaultValues,
  closePanel: () =>
    useAppointmentsStore.getState()?.closeRecordPanel?.("followUp"),
  fromRecord: (appointment) => ({
    reason: appointment?.followUpReason,
    notes: appointment?.followUpNotes,
  }),
});
