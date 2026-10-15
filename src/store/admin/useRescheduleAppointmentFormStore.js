import { rescheduleAppointmentData } from "@/data/admin/appointment-forms.data";
import {
  rescheduleAppointmentDefaultValues,
  rescheduleAppointmentSchema,
} from "@/schemas/appointments/reschedule-appointment.schema";
import { useAppointmentsStore } from "@/store/admin/useAppointmentsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The calendar's "Reschedule appointment" drawer — a new slot for the
 * booking, opening on the proposed one with the booking's own length and
 * professional. There is no calendar backend yet, so a valid submit says
 * so and closes.
 */
export const useRescheduleAppointmentFormStore = createFormStore({
  content: rescheduleAppointmentData,
  schema: rescheduleAppointmentSchema,
  defaultValues: rescheduleAppointmentDefaultValues,
  closePanel: () =>
    useAppointmentsStore.getState()?.closeRecordPanel?.("reschedule"),
  fromRecord: (appointment) => ({
    date: appointment?.rescheduleDate,
    startTime: appointment?.rescheduleTime,
    duration: appointment?.durationMinutes,
    professional: appointment?.professionalId,
    reason: appointment?.rescheduleReason,
  }),
});
