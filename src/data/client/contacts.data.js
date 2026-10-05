/**
 * The client portal's Contacts — built from the design screenshots (the
 * Figma node was not reachable). The customers and patients who call the
 * client's business: one list with search, the call-outcome filter, rows
 * per page and "Add Contact", and each contact's details drawer, opened by
 * the row's "…" button.
 *
 * Statuses and call outcomes are each one list, shared by the table's
 * badges and its filter (rule 0).
 */
const CLOCK_ICON = { src: "/icons/clock.svg", width: 16, height: 16 };

/** The business every contact belongs to, named in the drawer's subtitle. */
const CLINIC = "Laura Alegre Clinic";

/**
 * A contact's status. "Inactive" is drawn as a bare dot and label, not a
 * tinted tag, as the design has it.
 */
export const CONTACT_STATUSES = [
  { value: "active", label: "Active", tone: "success" },
  { value: "inactive", label: "Inactive", tone: "neutral", variant: "plain" },
];

/** How a contact's last call ended — the list's filter (the design's dropdown). */
export const CONTACT_CALL_OUTCOMES = [
  { value: "completed", label: "Completed" },
  { value: "connected", label: "Connected" },
  { value: "missed", label: "Missed" },
  { value: "voicemail", label: "Voicemail" },
];

const NAME = {
  id: "name",
  label: "NAME",
  type: "text",
  field: "name",
  weight: "regular",
  size: "lg",
};
const PROFESSIONAL = {
  id: "professional",
  label: "RELATED PROFESSIONAL",
  type: "text",
  field: "professional",
};
const PHONE = { id: "phone", label: "PHONE", type: "text", field: "phone" };
const EMAIL = {
  id: "email",
  label: "EMAIL",
  type: "text",
  field: "email",
  truncate: true,
};
const LAST_CALL = {
  id: "lastCall",
  label: "LAST CALL",
  type: "icon-text",
  field: "lastCall",
  icon: CLOCK_ICON,
};
const STATUS = {
  id: "status",
  label: "STATUS",
  type: "badge",
  field: "status",
};
const ACTION = {
  id: "action",
  label: "Action",
  type: "action",
  align: "center",
  headerAlign: "center",
  actions: [
    {
      id: "details",
      label: "Contact details",
      iconOnly: true,
      variant: "outline-primary",
      icon: { lucide: "Ellipsis", size: 16 },
    },
  ],
};

export const clientContactsData = {
  texture: "/admin/table/table-texture.png",

  search: { label: "Search contacts", placeholder: "Search..." },

  filters: [
    {
      param: "outcome",
      field: "lastOutcome",
      label: "Filter by call outcome",
      allValue: "all",
      options: [
        { value: "all", label: "All Call Outcomes" },
        ...CONTACT_CALL_OUTCOMES,
      ],
    },
  ],

  /**
   * "Add Contact" has no form in the design yet, so it is a toolbar action
   * that says so rather than an empty drawer. The design's glyph is a
   * pen-on-square; lucide's `SquarePen` is the closest match.
   */
  secondaryAction: {
    label: "Add Contact",
    icon: { lucide: "SquarePen", size: 16 },
    notFunctionalMessage: "Adding contacts isn’t wired up yet",
    notFunctionalDescription:
      "New contacts can be added once the backend is connected.",
  },

  emptyLabel: "No contacts match your search or filter.",
  tableClassName: "min-w-[1100px]",

  columns: [NAME, PROFESSIONAL, PHONE, EMAIL, LAST_CALL, STATUS, ACTION],

  card: {
    title: NAME,
    status: STATUS,
    subtitle: PROFESSIONAL,
    fields: [PHONE, EMAIL, LAST_CALL],
    action: ACTION,
  },

  pagination: {
    summary: "{total} contacts · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },

  /** The details drawer — the design's "Contact Details". */
  detail: {
    title: "Contact Details",
    subtitle: `Customer / patient record for ${CLINIC}`,
    closeLabel: "Close",
    roleTemplate: "{kind} • Related to {professional}",
    instruction: {
      title: "IMPORTANT INSTRUCTION FOR AGENTS",
      note: "This instruction appears automatically in the Agent Live Call Workspace when this contact calls.",
    },
    context: {
      title: "Contact Context",
      lastCall: "LAST CALL",
      nextAppointment: "NEXT APPOINTMENT",
      none: "None scheduled",
    },
    quickActions: {
      title: "Quick Actions",
      actions: [
        {
          id: "appointment",
          label: "New Appointment",
          variant: "primary",
          href: "/client/appointments?panel=add",
        },
        {
          id: "message",
          label: "Send Message",
          variant: "neutral",
          href: "/client/messages",
        },
        {
          id: "follow-up",
          label: "Request Follow-up",
          variant: "neutral",
          href: "/client/requests?panel=add",
        },
        { id: "edit", label: "Edit Contact", variant: "neutral" },
      ],
    },
    history: {
      title: "Recent Calls & Appointments",
      viewAll: "View all",
      viewAllHrefTemplate: "/client/calls?q={name}",
    },
    footerNote:
      "Important instructions are visible to the Agent team during calls.",
    doneLabel: "Done",
    notFunctionalMessage: "Editing contacts isn’t wired up yet",
    notFunctionalDescription:
      "Contact changes will be saved once the backend is connected.",
  },

  /**
   * Each contact: who they are, their last call (the list's relative label,
   * its outcome, and the drawer's exact time and summary), their next
   * booking, an optional standing instruction for agents, and their recent
   * calls and appointments. The store resolves the status key to a badge.
   */
  rows: [
    {
      id: "ramon-torres",
      name: "Ramón Torres",
      kind: "Patient",
      professional: "Dr. Rodríguez",
      phone: "+34 622 910 455",
      email: "r.torres@email.es",
      lastCall: "Today",
      lastOutcome: "completed",
      status: "active",
      instruction:
        "Do not schedule an appointment without first confirming availability with Dr. Rodríguez personally.",
      lastCallAt: "28 Aug 2026 • 10:38 AM",
      lastCallMeta: "4m 42s • Appointment inquiry",
      nextAppointmentAt: "04 Sep 2026 • 11:30 AM",
      nextAppointmentMeta: "Dr. Rodríguez • Confirmed",
      history: [
        {
          id: "h1",
          title: "28 Aug • Inbound call • 4m 42s",
          text: "Message: Caller confirmed the appointment and asked what documents to bring.",
        },
        {
          id: "h2",
          title: "22 Aug • Appointment • Completed",
          text: "Annual check-up with Dr. Rodríguez.",
        },
      ],
    },
    {
      id: "isabel-moreno",
      name: "Isabel Moreno",
      kind: "Patient",
      professional: "Dr. Rodríguez",
      phone: "+34 699 441 208",
      email: "i.moreno@email.es",
      lastCall: "3 days ago",
      lastOutcome: "missed",
      status: "active",
      lastCallAt: "25 Aug 2026 • 10:15 AM",
      lastCallMeta: "Missed • Callback requested",
      nextAppointmentAt: "02 Sep 2026 • 09:00 AM",
      nextAppointmentMeta: "Dr. Rodríguez • Pending",
      history: [
        {
          id: "h1",
          title: "25 Aug • Missed call",
          text: "No voicemail left. A callback was added to the agent queue.",
        },
        {
          id: "h2",
          title: "12 Aug • Appointment • Completed",
          text: "Follow-up consultation with Dr. Rodríguez.",
        },
      ],
    },
    {
      id: "maria-jose-serrano",
      name: "María José Serrano",
      kind: "Customer",
      professional: "Dr. Martínez",
      phone: "+34 610 992 334",
      email: "j.perez@gmail.com",
      lastCall: "1 week ago",
      lastOutcome: "connected",
      status: "active",
      instruction:
        "Billing questions go to the practice manager; never quote prices over the phone.",
      lastCallAt: "21 Aug 2026 • 04:20 PM",
      lastCallMeta: "2m 10s • Billing contact update",
      history: [
        {
          id: "h1",
          title: "21 Aug • Inbound call • 2m 10s",
          text: "Asked to update the billing contact on file.",
        },
      ],
    },
    {
      id: "ana-fuentes",
      name: "Ana Fuentes",
      kind: "Patient",
      professional: "Dr. Rodríguez",
      phone: "+34 655 221 009",
      email: "a.fuentes@email.es",
      lastCall: "2 weeks ago",
      lastOutcome: "voicemail",
      status: "inactive",
      lastCallAt: "14 Aug 2026 • 10:42 AM",
      lastCallMeta: "1m 12s • Voicemail left",
      history: [
        {
          id: "h1",
          title: "14 Aug • Voicemail • 1m 12s",
          text: "Left a voicemail asking to move her laser session.",
        },
      ],
    },
    {
      id: "jorge-perez",
      name: "Jorge Pérez",
      kind: "Patient",
      professional: "Dr. Alegre",
      phone: "+34 612 334 901",
      email: "j.perez@email.es",
      lastCall: "Today",
      lastOutcome: "completed",
      status: "active",
      lastCallAt: "28 Aug 2026 • 09:55 AM",
      lastCallMeta: "6m 42s • Follow-up scheduled",
      nextAppointmentAt: "05 Sep 2026 • 10:00 AM",
      nextAppointmentMeta: "Dr. Alegre • Confirmed",
      history: [
        {
          id: "h1",
          title: "28 Aug • Outbound call • 6m 42s",
          text: "Follow-up scheduled after his consultation.",
        },
      ],
    },
    {
      id: "carmen-vidal",
      name: "Carmen Vidal",
      kind: "Patient",
      professional: "Dr. Navarro",
      phone: "+34 633 118 402",
      email: "c.vidal@email.es",
      lastCall: "Yesterday",
      lastOutcome: "completed",
      status: "active",
      instruction:
        "Pre-op patient: transfer any call about medication straight to duty triage.",
      lastCallAt: "27 Aug 2026 • 08:45 AM",
      lastCallMeta: "2m 18s • Pre-op confirmation",
      nextAppointmentAt: "29 Aug 2026 • 08:00 AM",
      nextAppointmentMeta: "Dr. Navarro • Confirmed",
      history: [
        {
          id: "h1",
          title: "27 Aug • Inbound call • 2m 18s",
          text: "Confirmed fasting instructions for her procedure.",
        },
      ],
    },
    {
      id: "luis-ortega",
      name: "Luis Ortega",
      kind: "Customer",
      professional: "Dr. Martínez",
      phone: "+34 644 207 815",
      email: "l.ortega@email.es",
      lastCall: "4 days ago",
      lastOutcome: "connected",
      status: "active",
      lastCallAt: "24 Aug 2026 • 12:30 PM",
      lastCallMeta: "3m 05s • Price inquiry",
      history: [
        {
          id: "h1",
          title: "24 Aug • Inbound call • 3m 05s",
          text: "Asked for the treatment brochure by email.",
        },
      ],
    },
    {
      id: "elena-ruiz",
      name: "Elena Ruiz",
      kind: "Patient",
      professional: "Dr. Alegre",
      phone: "+34 678 550 213",
      email: "e.ruiz@email.es",
      lastCall: "1 week ago",
      lastOutcome: "missed",
      status: "active",
      lastCallAt: "20 Aug 2026 • 06:10 PM",
      lastCallMeta: "Missed • After hours",
      history: [
        {
          id: "h1",
          title: "20 Aug • Missed call",
          text: "Called after hours; returned the next morning.",
        },
      ],
    },
    {
      id: "pablo-sanz",
      name: "Pablo Sanz",
      kind: "Patient",
      professional: "Dr. Rodríguez",
      phone: "+34 691 340 772",
      email: "p.sanz@email.es",
      lastCall: "3 weeks ago",
      lastOutcome: "voicemail",
      status: "inactive",
      lastCallAt: "07 Aug 2026 • 11:20 AM",
      lastCallMeta: "0m 48s • Voicemail left",
      history: [
        {
          id: "h1",
          title: "07 Aug • Voicemail • 0m 48s",
          text: "Cancelled his September check-up.",
        },
      ],
    },
    {
      id: "lucia-gil",
      name: "Lucía Gil",
      kind: "Customer",
      professional: "Dr. Navarro",
      phone: "+34 602 119 486",
      email: "l.gil@email.es",
      lastCall: "2 weeks ago",
      lastOutcome: "completed",
      status: "active",
      lastCallAt: "15 Aug 2026 • 09:40 AM",
      lastCallMeta: "4m 02s • Invoice copy",
      history: [
        {
          id: "h1",
          title: "15 Aug • Inbound call • 4m 02s",
          text: "Requested a copy of her July invoice.",
        },
      ],
    },
    {
      id: "diego-molina",
      name: "Diego Molina",
      kind: "Patient",
      professional: "Dr. Martínez",
      phone: "+34 687 903 251",
      email: "d.molina@email.es",
      lastCall: "1 month ago",
      lastOutcome: "connected",
      status: "inactive",
      lastCallAt: "28 Jul 2026 • 03:15 PM",
      lastCallMeta: "2m 30s • Results inquiry",
      history: [
        {
          id: "h1",
          title: "28 Jul • Inbound call • 2m 30s",
          text: "Asked when his test results would be ready.",
        },
      ],
    },
    {
      id: "sofia-navarro",
      name: "Sofía Navarro",
      kind: "Patient",
      professional: "Dr. Alegre",
      phone: "+34 615 772 340",
      email: "s.navarro@email.es",
      lastCall: "5 days ago",
      lastOutcome: "completed",
      status: "active",
      lastCallAt: "23 Aug 2026 • 10:05 AM",
      lastCallMeta: "5m 11s • New patient booking",
      nextAppointmentAt: "08 Sep 2026 • 04:30 PM",
      nextAppointmentMeta: "Dr. Alegre • Confirmed",
      history: [
        {
          id: "h1",
          title: "23 Aug • Inbound call • 5m 11s",
          text: "Booked her first consultation.",
        },
      ],
    },
  ],
};
