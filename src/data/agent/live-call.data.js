/**
 * The agent's Live Call Workspace — built from the design screenshots (the
 * Figma node was not reachable). Everything the agent needs while a caller
 * is on the line: who is calling and for which client, the client's
 * instructions, the call note being written, its categories and outcome,
 * the caller's previous calls, and a side panel of scripts, dispositions,
 * the calendar and the client's support rules.
 *
 * The canned texts the agent can drop into the note are one list
 * (`responses`): the "Quick insert" chips and the "Standard Client
 * Responses" cards read the same entries.
 */
const NOT_WIRED = {
  notFunctionalMessage: "The live call workspace isn’t wired up yet",
  notFunctionalDescription:
    "This action will work once Zoiper and the backend are connected.",
};

/** Canned client texts — quick-insert chips and response cards share them. */
const RESPONSES = [
  {
    id: "clinic-address",
    label: "Clinic Address & Metro",
    text: "Estamos en Calle de Velázquez 48, Salamanca, Madrid. Metro cercano: Velázquez.",
  },
  {
    id: "insurances",
    label: "Accepted Insurances",
    text: "Trabajamos con Sanitas, Adeslas y Asisa. Para otras compañías, confirmaremos la cobertura.",
  },
  {
    id: "emergency",
    label: "Emergency Advice",
    text: "Si hay dolor intenso, hinchazón facial o sangrado, indique al paciente que necesita atención urgente.",
  },
  {
    id: "notice-rule",
    label: "Appointment Notice Rule",
    text: "Para cambiar o cancelar una cita, registre la solicitud y confirme disponibilidad antes de ofrecer un nuevo horario.",
  },
];

export const liveCallData = {
  ...NOT_WIRED,
  separator: "•",

  /** The band across the top: the call, the caller and the wrap-up actions. */
  banner: {
    activeLabel: "Call Active",
    activeIcon: { lucide: "Radio", size: 16 },
    elapsedSeconds: 21,
    timerLabel: "Call duration",
    caller: "Carlos Romero",
    phone: "+34 655 112 843",
    phoneIcon: { lucide: "Phone", size: 14 },
    connection: "Zoiper Connected",
    connectionIcon: { lucide: "Link2", size: 14 },
    meta: [
      {
        id: "clinic",
        icon: { lucide: "Building2", size: 14 },
        text: "Laura Alegre Clinic",
      },
      { id: "line", text: "Client line: DID 01 • Reception" },
      {
        id: "time",
        icon: { lucide: "Clock", size: 14 },
        text: "Local Time : 11:42 AM CET",
      },
    ],
    note: "Audio call is handled in Zoiper. This workspace keeps live context, notes and scheduling in one place.",
    noteIcon: { lucide: "Radio", size: 14 },
    professional: {
      label: "Professional / Dept",
      options: [
        { value: "alegre", label: "Dr. Laura Alegre (Implantology)" },
        { value: "rodriguez", label: "Dr. Rodríguez (General Dentistry)" },
        { value: "reception", label: "Reception Desk" },
      ],
    },
    actions: [
      {
        id: "calendar",
        label: "In-Call Calendar",
        variant: "neutral",
        icon: { lucide: "CalendarDays", size: 14 },
      },
      {
        id: "task",
        label: "Create Task",
        variant: "neutral",
        icon: { lucide: "SquareCheckBig", size: 14 },
      },
    ],
    wrapUp: {
      label: "Wrap Up & Save Call",
      icon: { lucide: "Save", size: 14 },
    },
  },

  critical: {
    title: "CRITICAL CONTACT INSTRUCTION",
    icon: { lucide: "TriangleAlert", size: 40 },
    text: "Do not schedule new appointments for this contact. Inform them that no appointments are currently available. Transfer billing questions directly to administration.",
    tag: {
      label: "STRICT COMPLIANCE REQUIRED",
      icon: { lucide: "TriangleAlert", size: 14 },
    },
  },

  callerProfile: {
    title: "Caller Profile",
    facts: [
      { id: "name", label: "Name:", value: "Carlos Romero" },
      { id: "phone", label: "Phone:", value: "+34 655 452 419" },
      { id: "email", label: "Email:", value: "Carlos.romero82@gmail.com" },
      {
        id: "professional",
        label: "Associated prof:",
        value: "Dr. Laura Alegre",
      },
      { id: "last", label: "Last Interaction:", value: "Sep 02, 10:42 AM" },
    ],
  },

  support: {
    title: "Client Support Instructions",
    facts: [
      {
        id: "hours",
        label: "Working Hours:",
        value: "Mon - Fri 09:00-20:00 CET",
      },
      {
        id: "address",
        label: "Clinic Address:",
        value: "Calle de Velázquez 48, Salamanca, 28001 Madrid, Spain",
      },
    ],
    greetingLabel: "Greeting Script:",
    greeting: "Good morning, Laura Alegre Clinic. How may I help you today?",
    emergencyLabel: "Emergency Protocol:",
    emergency:
      "For acute dental trauma, severe toothache with facial swelling, or post-surgical hemorrhage: flag as URGENT, capture the address, create a high-priority task, and notify the on-call line +34 670 112 001 immediately.",
  },

  extensions: {
    title: "Appointment & Extensions",
    rows: [
      {
        id: "alegre",
        title: "Dr. Laura Alegre",
        subtitle: "Lead Implantology",
        action: "Ext 101",
      },
      {
        id: "today",
        title: "Today • 4:30 PM",
        subtitle: "Dental Cleaning • Confirmed",
        action: "Appt",
      },
    ],
  },

  note: {
    title: "Call Message / Operational Note",
    savedLabel: "Autosaved",
    label: "Call message",
    placeholder:
      "Type the caller message while speaking. Example: Caller cannot attend today’s appointment and requested another date next week.",
    countTemplate: "Characters: {count}/{max}",
    maxLength: 2000,
    /** The editor's formatting buttons — no rich-text backend yet. */
    toolbar: [
      { id: "bold", label: "Bold", icon: { lucide: "Bold", size: 16 } },
      { id: "italic", label: "Italic", icon: { lucide: "Italic", size: 16 } },
      {
        id: "underline",
        label: "Underline",
        icon: { lucide: "Underline", size: 16 },
      },
      {
        id: "align-left",
        label: "Align left",
        icon: { lucide: "AlignLeft", size: 16 },
      },
      {
        id: "align-right",
        label: "Align right",
        icon: { lucide: "AlignRight", size: 16 },
      },
      {
        id: "justify",
        label: "Justify",
        icon: { lucide: "AlignJustify", size: 16 },
      },
      {
        id: "bullets",
        label: "Bulleted list",
        icon: { lucide: "List", size: 16 },
      },
      {
        id: "numbers",
        label: "Numbered list",
        icon: { lucide: "ListOrdered", size: 16 },
      },
      {
        id: "highlight",
        label: "Highlight",
        icon: { lucide: "Highlighter", size: 16 },
      },
      {
        id: "size",
        label: "Text size",
        icon: { lucide: "ALargeSmall", size: 16 },
      },
    ],
    quickInsertLabel: "Quick insert:",
    insertIcon: { lucide: "Plus", size: 14 },
  },

  outcome: {
    title: "Call Categories & Call Outcome",
    categoriesLabel: "Select Call Categories:",
    categories: [
      { value: "appointment", label: "Appointment" },
      { value: "appointment-changed", label: "Appointment Changed" },
      { value: "appointment-cancelled", label: "Appointment Cancelled" },
      { value: "callback", label: "Callback" },
      { value: "transfer", label: "Transfer" },
      { value: "quote-billing", label: "Quote/Billing" },
      { value: "urgent", label: "Urgent" },
      { value: "general-information", label: "General Information" },
    ],
    outcomesLabel: "Call Outcome (select when wrapping up):",
    outcomes: [
      { value: "handled", label: "Handled", hint: "Resolved or documented" },
      {
        value: "callback-needed",
        label: "Callback Needed",
        hint: "Requires secretary callback",
      },
      {
        value: "returned",
        label: "Returned",
        hint: "Outbound Callback Finished",
      },
      {
        value: "voicemail",
        label: "Voicemail Left",
        hint: "Sent to clinic voicemail",
      },
    ],
  },

  previousCalls: {
    title: "Previous Calls From This Caller",
    handledByLabel: "Handled by Agent:",
    durationLabel: "Duration:",
    messageLabel: "Operational Message:",
    copyLabel: "Copy message into active note",
    toggleLabel: "Show call details",
    calls: [
      {
        id: "sep-02",
        when: "Sep 2, 04:42 PM",
        professional: "Dr. Laura Alegre",
        tags: ["Appointment", "Appointment Changed"],
        status: { label: "Handled", tone: "success" },
        agent: "Iqbal Hasan",
        duration: "194s",
        message:
          "Caller asked to move the appointment to Friday morning. Explained the doctor's schedule and created a follow-up for the clinic front desk to confirm the open slot.",
      },
      {
        id: "aug-20",
        when: "Aug 20, 08:15 PM",
        professional: "Dr. Laura Alegre",
        tags: ["General Information", "Billing"],
        status: { label: "Handled", tone: "success" },
        agent: "Sofia Martínez",
        duration: "86s",
        message:
          "Caller asked about the cleaning price and accepted insurances. Shared the price list and noted that billing questions go to administration.",
      },
    ],
  },

  /** The side panel's tabs — the URL's `?tab=`; the first is the default. */
  tabs: [
    { id: "scripts", label: "Scripts" },
    { id: "dispositions", label: "Dispositions" },
    { id: "calendar", label: "Calendar" },
    { id: "support", label: "Support" },
  ],

  script: {
    title: "Dental Clinic Standard Patient Intake & Triage",
    version: "v2.3",
    stepLabel: "INTERACTIVE DECISION STEP",
    question: "What is the caller asking about today?",
    hint: "Greet the caller politely, then identify the caller’s intent.",
    responsesLabel: "Choose Caller response:",
    responses: [
      {
        id: "book",
        label: "Book / Reschedule Appointment",
        tag: "High Frequency",
      },
      { id: "emergency", label: "Dental Pain / Emergency", tag: "Urgent" },
      { id: "billing", label: "Billing, Quotes or Invoices" },
      { id: "general", label: "General Information & Hours" },
    ],
  },

  dispositions: {
    title: "Dispositions",
    subtitle: "Quick client-specific operating rules for this active call.",
    rules: [
      {
        id: "change",
        title: "Appointment Change",
        text: "Check the calendar first. Do not promise a new time until availability is confirmed.",
        tag: { label: "Common", tone: "primary" },
      },
      {
        id: "cancel",
        title: "Appointment Cancellation",
        text: "Record the cancellation reason and create a follow-up only when the clinic needs to act.",
        tag: { label: "Common", tone: "primary" },
      },
      {
        id: "billing",
        title: "Billing / Invoice",
        text: "Do not answer account-specific billing questions. Transfer or route them to clinic administration.",
        tag: { label: "Route", tone: "neutral" },
      },
      {
        id: "emergency",
        title: "Dental Emergency",
        text: "Flag as urgent, capture the key details, create a high-priority task and notify the on-call contact.",
        tag: { label: "Urgent", tone: "error" },
      },
    ],
    helpTitle: "How to use this panel",
    help: "Read the matching rule while speaking. The final call outcome is selected separately in Call Outcome when wrapping up.",
  },

  calendar: {
    title: "Calendar",
    subtitle:
      "Check availability and manage the caller’s appointment without leaving the live call.",
    current: {
      label: "Current Appointment",
      when: "Today • 4:30 PM",
      detail: "Dental Cleaning • Dr. Laura Alegre",
      status: { label: "Confirmed", tone: "success" },
    },
    /** The URL's `?view=`; the first is the default. */
    views: [
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
    ],
    statuses: {
      open: { label: "Open", tone: "success" },
      booked: { label: "Booked", tone: "neutral" },
    },
    /** Each view's free and taken slots. */
    slots: {
      day: {
        heading: "Friday, September 4",
        rows: [
          { id: "1030", time: "10:30 AM", who: "Available", status: "open" },
          {
            id: "1115",
            time: "11:15 AM",
            who: "Dr. Laura Alegre",
            status: "booked",
          },
          { id: "1200", time: "12:00 PM", who: "Available", status: "open" },
          { id: "1430", time: "2:30 PM", who: "Available", status: "open" },
        ],
      },
      week: {
        heading: "Week of August 31",
        rows: [
          { id: "mon", time: "Mon 10:00 AM", who: "Available", status: "open" },
          {
            id: "tue",
            time: "Tue 11:15 AM",
            who: "Dr. Laura Alegre",
            status: "booked",
          },
          { id: "thu", time: "Thu 4:00 PM", who: "Available", status: "open" },
          { id: "fri", time: "Fri 12:00 PM", who: "Available", status: "open" },
        ],
      },
      month: {
        heading: "September 2026",
        rows: [
          { id: "s4", time: "Sep 4", who: "3 slots available", status: "open" },
          { id: "s9", time: "Sep 9", who: "Fully booked", status: "booked" },
          {
            id: "s15",
            time: "Sep 15",
            who: "5 slots available",
            status: "open",
          },
          {
            id: "s22",
            time: "Sep 22",
            who: "2 slots available",
            status: "open",
          },
        ],
      },
    },
    fullCalendar: { label: "Full Calendar", href: "/agent/appointments" },
    create: {
      label: "Create Appointment",
      href: "/agent/appointments?panel=add",
    },
    note: "After saving, add the appointment date/time back into the call note or call record.",
  },

  clientSupport: {
    title: "Client Support",
    subtitle:
      "Business-wide instructions that apply when handling calls for Laura Alegre Clinic.",
    client: {
      name: "Laura Alegre Clinic",
      detail: "Dental Clinic • Madrid, Spain",
      hours: "Working Hours: Mon–Fri 09:00–20:00 CET",
      status: { label: "Active", tone: "success" },
    },
    items: [
      {
        id: "greeting",
        title: "Greeting",
        text: "“Good morning, Laura Alegre Clinic. How may I help you today?”",
      },
      {
        id: "appointment",
        title: "Appointment Rule",
        text: "Check calendar availability before confirming a new time. Follow any caller-specific restriction shown in the Critical Contact Instruction.",
      },
      {
        id: "emergency",
        title: "Emergency Protocol",
        text: "For severe dental pain, swelling, trauma or post-surgical bleeding: flag URGENT, capture details, create a high-priority task and notify the on-call contact.",
        tone: "warning",
      },
      {
        id: "transfer",
        title: "Transfer & Billing",
        text: "Billing questions → clinic administration. Use the internal extension or configured routing instruction.",
      },
    ],
  },

  responsesPanel: {
    title: "Standard Client Responses",
    insertLabel: "Insert",
  },
  responses: RESPONSES,
};
