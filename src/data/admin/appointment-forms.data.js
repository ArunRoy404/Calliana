import { CLIENT_PROFESSIONAL_OPTIONS } from "@/data/admin/client-detail.data";
import {
  APPOINTMENT_DURATION_OPTIONS,
  callClientData,
} from "@/data/admin/client-forms.data";
import {
  CALENDAR_ICON,
  CLOCK_ICON,
} from "@/data/admin/schedule-appointment.data";

/**
 * The drawers the admin opens over one calendar appointment
 * (`?followup=<id>`, `?reschedule=<id>`), from its details drawer's
 * footer: Follow-up call and Reschedule appointment. Read by
 * `FormLayoutFields`; `summary` templates are filled from the appointment's
 * record (`slot` is its "28 Aug 2026 · 12:00 PM–12:30 PM").
 */
const CLIENT = { id: "client", label: "Client", template: "{client}" };
const SLOT_TEMPLATE = "{slot}";

/**
 * "Follow-up call" — the client page's Call client drawer (its schema,
 * fields and footer) for the appointment's contact, with its own labels and
 * Zoiper note.
 */
export const followUpCallData = {
  ...callClientData,
  title: "Follow-up call",
  subtitle: undefined,
  subtitleTemplate: "Contact {contactPerson} about the selected appointment.",

  summary: {
    title: "Appointment",
    fields: [
      CLIENT,
      { id: "contact", label: "Contact", template: "{contactPerson}" },
      { id: "phone", label: "Phone", template: "{contactPhone}" },
      { id: "slot", label: "Appointment", template: SLOT_TEMPLATE },
    ],
  },

  fields: {
    reason: { ...callClientData?.fields?.reason, label: "REASON" },
    notes: { ...callClientData?.fields?.notes, label: "NOTES" },
  },

  notices: {
    zoiper: {
      ...callClientData?.notices?.zoiper,
      description:
        "Open Zoiper to place the call. Return here to record the outcome.",
    },
  },
};

/**
 * "Reschedule appointment" — a new day, time, length and professional for
 * the booking, and why. Field `name`s match `rescheduleAppointmentSchema`.
 */
export const rescheduleAppointmentData = {
  title: "Reschedule appointment",
  subtitle: "Move the booking after checking the client’s availability.",

  summary: {
    title: "Current appointment",
    fields: [
      CLIENT,
      { id: "patient", label: "Patient", template: "{contactPerson}" },
      { id: "slot", label: "Current time", template: SLOT_TEMPLATE },
      {
        id: "professional",
        label: "Professional",
        template: "{professional}",
      },
    ],
  },

  layout: [
    ["date", "startTime", "duration"],
    ["professional"],
    ["reason"],
    ["availability"],
  ],

  fields: {
    date: {
      name: "date",
      label: "NEW DATE",
      type: "date",
      trailingIcon: CALENDAR_ICON,
    },
    startTime: {
      name: "startTime",
      label: "START TIME",
      type: "time",
      trailingIcon: CLOCK_ICON,
    },
    reason: {
      name: "reason",
      label: "REASON FOR CHANGE",
      type: "textarea",
      rows: 3,
      placeholder: "Why the booking is moving…",
    },
  },

  selects: {
    duration: {
      name: "duration",
      label: "DURATION",
      options: APPOINTMENT_DURATION_OPTIONS,
    },
    professional: {
      name: "professional",
      label: "PROFESSIONAL",
      placeholder: "Select a professional…",
      options: CLIENT_PROFESSIONAL_OPTIONS,
    },
  },

  notices: {
    availability: {
      title: "Check availability",
      description:
        "Confirm that the selected professional and client calendar have an available slot before saving.",
    },
  },

  footer: { cancelLabel: "Cancel", submitLabel: "Confirm reschedule" },
  notFunctionalMessage: "Rescheduling isn’t wired up yet",
  notFunctionalDescription:
    "The new slot is valid — the booking will move once the calendar backend is connected.",
};
