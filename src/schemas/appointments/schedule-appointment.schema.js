import { z } from "zod";

import { isIsoDate, minutesOf } from "@/lib/calendarDates";
import { phoneField } from "@/schemas/auth/shared.schema";

/** Validation for the "Schedule New Appointment" panel. */
export const scheduleAppointmentSchema = z
  .object({
    client: z.string().min(1, "Choose a client account"),
    contactPerson: z.string().trim().min(1, "Enter a contact person"),
    contactPhone: phoneField,
    date: z.string().refine((value) => isIsoDate(value), "Choose a date"),
    startTime: z.string().min(1, "Choose a start time"),
    endTime: z.string().min(1, "Choose an end time"),
    type: z.string().min(1, "Choose an appointment type"),
    notes: z.string().max(1000).optional(),
  })
  .refine(
    (values) =>
      !values?.startTime ||
      !values?.endTime ||
      minutesOf(values?.endTime) > minutesOf(values?.startTime),
    { path: ["endTime"], message: "End after the start time" },
  );

/** The design's starting values: Laura Alegre Clinic, 11:00–11:30. */
export const scheduleAppointmentDefaultValues = {
  client: "laura-alegre-clinic",
  contactPerson: "",
  contactPhone: "",
  date: "",
  startTime: "11:00",
  endTime: "11:30",
  type: "clinical",
  notes: "",
};
