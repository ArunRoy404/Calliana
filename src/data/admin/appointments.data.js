/**
 * Appointments & Calendar — the "Today" view, built from the design
 * screenshot (the Figma node was not reachable to cite). Read through
 * `useAppointmentsStore`; the URL keys are in
 * `src/schemas/appointments/appointments-params.schema.js`.
 *
 * `today` is the sample calendar's "today": the day the page opens on when
 * the URL names none. It is fixed so the sample events below line up with
 * the design; once events come from an API it becomes the real current day.
 */
export const appointmentsData = {
  today: "2026-08-10",
  locale: "en-US",
  texture: "/admin/table/table-texture.png",

  /** `Intl.DateTimeFormat` options for each date the page prints. */
  dateFormats: {
    toolbar: { month: "short", day: "numeric", year: "numeric" },
    weekday: { weekday: "short" },
    day: { month: "short", day: "numeric" },
    dayNumber: { day: "numeric" },
    hour: { hour: "numeric" },
    time: { hour: "numeric", minute: "2-digit" },
  },

  /**
   * The week grid's hours: one row per hour from `start` up to (not
   * including) `end`, 24-hour — 7 AM to 5 PM, as the design draws it.
   */
  weekHours: { start: 7, end: 18 },

  previousIcon: { lucide: "ChevronLeft", size: 18 },
  nextIcon: { lucide: "ChevronRight", size: 18 },

  /**
   * `value`s are the URL's `?view=`; the first is the default. The arrows
   * step by the view's own unit, and say so to screen readers.
   */
  views: [
    {
      value: "today",
      label: "Today",
      previousLabel: "Previous day",
      nextLabel: "Next day",
    },
    {
      value: "week",
      label: "This Week",
      previousLabel: "Previous week",
      nextLabel: "Next week",
    },
    {
      value: "month",
      label: "This Month",
      previousLabel: "Previous month",
      nextLabel: "Next month",
    },
  ],

  /**
   * `value`s are the URL's `?type=`; the first ("all") is the default. Each
   * type's `tone` tints its events (`src/lib/tones.js`).
   */
  eventTypes: {
    label: "Event type",
    options: [
      { value: "all", label: "All Event Types" },
      { value: "clinical", label: "Clinical Appointments", tone: "success" },
      { value: "callback", label: "Doctor Callbacks", tone: "warning" },
      { value: "advisory", label: "Advisory Consultations", tone: "primary" },
      { value: "follow-up", label: "Follow-ups", tone: "info" },
    ],
  },

  newAppointment: {
    label: "New Appointment",
    icon: { lucide: "Plus", size: 16 },
  },

  emptyDay: "No events scheduled for this day.",

  /**
   * An event's details side panel. Every event overlays its own fields on
   * `sample` (the contact, agent, address and notes it does not set itself),
   * the way `call-detail.data.js` overlays one sample onto every call. The
   * tiles take the event type's tone.
   */
  detail: {
    subtitleTemplate: "Scheduled for {date} at {start}",
    timeWindowTemplate: "{start} – {end}",
    fields: [
      { id: "client", label: "Client Account" },
      { id: "contactPerson", label: "Contact Person" },
      { id: "contactPhone", label: "Contact Phone" },
      { id: "timeWindow", label: "Time Window" },
      { id: "assignedAgent", label: "Assigned Agent" },
      { id: "address", label: "Address" },
      { id: "notes", label: "Appointment & Clinical Notes:" },
    ],
    cancelLabel: "Cancel Booking",
    closeLabel: "Close",
    rescheduleLabel: "Reschedule",
    sample: {
      contactPerson: "Mateo Fernandez",
      contactPhone: "+34 611 789 203",
      assignedAgent: "Elena Rostova",
      address: "Chair 1, Madrid Clinic",
      notes: "Confirm the slot with the client the day before.",
    },
  },

  notFunctionalMessage: "Calendar actions aren’t wired up yet",
  notFunctionalDescription:
    "This action will work once the calendar backend is connected.",

  /**
   * `start` / `end` are 24-hour `HH:MM` on `date`; the week grid places and
   * sizes each event by them. `subtitle` is the client account; `name` (when
   * set) titles the details panel in place of the short `title`. Placed as the week and month designs show
   * them, on the real calendar (Aug 10, 2026 is a Monday).
   */
  events: [
    {
      id: "martinez-emergency-inspection",
      date: "2026-08-28",
      start: "12:00",
      end: "12:30",
      type: "clinical",
      title: "Emergency inspection",
      name: "Dr. Martinez Emergency Inspection",
      subtitle: "Martinez Dental Care",
      notes: "Acute molar pain emergency inspection slot.",
    },
    {
      id: "laura-alegre-follow-up",
      date: "2026-08-10",
      start: "08:00",
      end: "09:00",
      type: "follow-up",
      title: "Follow-up call",
      subtitle: "Laura Alegre Clinic",
    },
    {
      id: "dental-care-appointment",
      date: "2026-08-10",
      start: "09:00",
      end: "10:00",
      type: "clinical",
      title: "Appointment",
      subtitle: "Dental Care Center",
    },
    {
      id: "centro-medico-onboarding",
      date: "2026-08-11",
      start: "13:00",
      end: "14:00",
      type: "clinical",
      title: "Onboarding call",
      subtitle: "Centro Médico Sur",
    },
    {
      id: "laura-alegre-follow-up-wed",
      date: "2026-08-12",
      start: "11:00",
      end: "12:00",
      type: "follow-up",
      title: "Follow-up call",
      subtitle: "Laura Alegre Clinic",
    },
    {
      id: "laura-alegre-callback",
      date: "2026-08-13",
      start: "09:00",
      end: "10:00",
      type: "callback",
      title: "Follow-up",
      subtitle: "Laura Alegre Clinic",
    },
    {
      id: "dental-care-appointment-3",
      date: "2026-08-03",
      start: "10:00",
      end: "11:00",
      type: "clinical",
      title: "Appointment",
      subtitle: "Dental Care Center",
    },
    {
      id: "laura-alegre-callback-14",
      date: "2026-08-14",
      start: "09:00",
      end: "10:00",
      type: "callback",
      title: "Follow-up",
      subtitle: "Laura Alegre Clinic",
    },
    {
      id: "dental-care-appointment-18",
      date: "2026-08-18",
      start: "10:00",
      end: "11:00",
      type: "clinical",
      title: "Appointment",
      subtitle: "Dental Care Center",
    },
    {
      id: "dental-care-appointment-24",
      date: "2026-08-24",
      start: "10:00",
      end: "11:00",
      type: "clinical",
      title: "Appointment",
      subtitle: "Dental Care Center",
    },
    {
      id: "vanguard-advisory",
      date: "2026-08-25",
      start: "15:00",
      end: "16:00",
      type: "advisory",
      title: "Advisory consultation",
      subtitle: "Vanguard Wealth Partners",
    },
    {
      id: "dental-care-appointment-27",
      date: "2026-08-27",
      start: "10:00",
      end: "11:00",
      type: "clinical",
      title: "Appointment",
      subtitle: "Dental Care Center",
    },
  ],
};
