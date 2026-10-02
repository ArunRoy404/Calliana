import { scheduleAppointmentData } from "@/data/admin/schedule-appointment.data";
import {
  scheduleAppointmentDefaultValues,
  scheduleAppointmentSchema,
} from "@/schemas/appointments/schedule-appointment.schema";
import { useAppointmentsStore } from "@/store/admin/useAppointmentsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The "Schedule New Appointment" form. There is no calendar backend yet, so
 * a valid submit closes the panel and says so, rather than pretending the
 * appointment was booked (rule 23).
 */
export const useScheduleAppointmentFormStore = createFormStore({
  schema: scheduleAppointmentSchema,
  defaultValues: scheduleAppointmentDefaultValues,
  closePanel: () => useAppointmentsStore.getState()?.setAddOpen?.(false),
  notFunctional: {
    message: scheduleAppointmentData?.notFunctionalMessage,
    description: scheduleAppointmentData?.notFunctionalDescription,
  },
  extend: () => ({ content: scheduleAppointmentData }),
});
