import { CLIENT_ACCOUNT_OPTIONS } from "@/data/admin/client-accounts.data";

/**
 * "Schedule New Appointment" side panel — the calendar's "New Appointment"
 * action, built from the design screenshot. Field `name`s match the keys in
 * `src/schemas/appointments/schedule-appointment.schema.js`; the appointment
 * types' `value`s are the calendar's event types, so a booking lands in the
 * right colour.
 */
/**
 * lucide, not `/icons/calendar.svg`: that export is drawn in near-white
 * (`#F7F9FC`, for dark tiles) and vanishes on a white field. Takes the same
 * slate as the clock.
 */
const CALENDAR_ICON = { lucide: "CalendarDays", size: 16 };
const CLOCK_ICON = { src: "/icons/clock.svg", width: 16, height: 16 };

export const scheduleAppointmentData = {
  title: "Schedule New Appointment",
  subtitle: "Book a doctor consultation, callback, or client follow-up session",

  selects: {
    client: {
      name: "client",
      label: "CLIENT ACCOUNT",
      placeholder: "Select client…",
      options: CLIENT_ACCOUNT_OPTIONS,
    },
    type: {
      name: "type",
      label: "APPOINTMENT TYPE",
      options: [
        { value: "clinical", label: "Doctor / Clinic Appointment" },
        { value: "callback", label: "Urgent Callback" },
        { value: "advisory", label: "Consultation Session" },
        { value: "follow-up", label: "Post-Care Follow-up" },
      ],
    },
  },

  fields: {
    contactPerson: {
      name: "contactPerson",
      label: "CONTACT PERSON",
      type: "text",
      placeholder: "e.g. DR. HELENA VIDAL",
    },
    contactPhone: {
      name: "contactPhone",
      label: "CONTACT PHONE",
      type: "tel",
      autoComplete: "tel",
      placeholder: "+34 600 000 000 000",
    },
    date: {
      name: "date",
      label: "DATE",
      type: "date",
      trailingIcon: CALENDAR_ICON,
    },
    startTime: {
      name: "startTime",
      label: "START TIME",
      type: "time",
      trailingIcon: CLOCK_ICON,
    },
    endTime: {
      name: "endTime",
      label: "END TIME",
      type: "time",
      trailingIcon: CLOCK_ICON,
    },
    notes: {
      name: "notes",
      label: "CLINICAL / OPERATION NOTES",
      type: "textarea",
      placeholder:
        "Any special handling instructions for agents when calling this client…",
    },
  },

  /** No required-fields note: Cancel and Confirm sit together at the right. */
  footer: {
    cancelLabel: "Cancel",
    submitLabel: "Confirm Appointment",
  },

  notFunctionalMessage: "Booking isn’t wired up yet",
  notFunctionalDescription:
    "The details are valid — the appointment will be booked once the calendar backend is connected.",
};
