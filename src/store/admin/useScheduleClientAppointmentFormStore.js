import { scheduleClientAppointmentData } from "@/data/admin/client-forms.data";
import {
  scheduleClientAppointmentDefaultValues,
  scheduleClientAppointmentSchema,
} from "@/schemas/clients/client-forms.schema";
import { closeClientPanel } from "@/store/clients/createClientsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The "Schedule appointment" drawer's form — a booking in the open client's
 * calendar, seeded from that client's pending booking. There is no calendar
 * backend yet, so a valid submit says so and closes.
 */
export const useScheduleClientAppointmentFormStore = createFormStore({
  content: scheduleClientAppointmentData,
  schema: scheduleClientAppointmentSchema,
  defaultValues: scheduleClientAppointmentDefaultValues,
  closePanel: closeClientPanel,
  fromRecord: (client) => ({
    service: client?.bookingService,
    professional: client?.bookingProfessional,
    date: client?.bookingDate,
    startTime: client?.bookingTime,
    duration: client?.bookingDuration,
    location: client?.bookingLocation,
    notes: client?.bookingNotes,
  }),
});
