import { z } from "zod";

/**
 * Validation for the admin's "Reschedule appointment" drawer. Its values are
 * seeded from the appointment when the drawer opens (`fromRecord`), so the
 * defaults are only what an unseeded form holds.
 */
export const rescheduleAppointmentSchema = z.object({
  date: z.string().min(1, "Choose the new date"),
  startTime: z.string().min(1, "Choose a start time"),
  duration: z.string().min(1, "Choose a duration"),
  professional: z.string().min(1, "Choose a professional"),
  reason: z.string().trim().min(1, "Say why the booking is moving").max(1000),
});

export const rescheduleAppointmentDefaultValues = {
  date: "",
  startTime: "",
  duration: "30",
  professional: "",
  reason: "",
};
