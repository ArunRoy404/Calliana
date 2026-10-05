import {
  CALL_STATUS_COLUMN,
  CALLER_COLUMN,
  directionOf,
  DIRECTION_COLUMN,
  DURATION_COLUMN,
} from "@/data/tables/call-columns.data";

/**
 * The client portal's home — "Dashboard Overview", built from the design
 * screenshot (the Figma node was not reachable to cite; the client section
 * is 167:24154). Read through `useClientDashboardStore`. The recent
 * conversations are the inbox's own (`useMessagesStore`), not a copy.
 *
 * Links point at the client portal's own pages (`/client/calls`,
 * `/client/messages`, `/client/appointments`); they open once those pages
 * are built.
 */
const DATE_TIME_COLUMN = {
  id: "dateTime",
  label: "DATE & TIME",
  type: "text",
  field: "dateTime",
};

const REVIEW_COLUMN = {
  id: "action",
  label: "Action",
  type: "action",
  align: "center",
  headerAlign: "center",
  actions: [
    {
      id: "review",
      label: "Review Call",
      variant: "neutral",
      hrefField: "reviewHref",
    },
  ],
};

export const clientDashboardData = {
  separator: "•",

  header: {
    name: "Laura Alegre Clinic",
    status: { label: "Active", tone: "success" },
    subtitle:
      "Welcome to your Client Portal. Your dedicated virtual secretaries are managing your calls and scheduling in real-time.",
    action: {
      label: "Submit Instruction/Request",
      icon: { lucide: "Plus", size: 16 },
    },
  },

  secretary: {
    name: "Virtual Secretary Team",
    avatar: "/client/avatars/dr-martinez.png",
    tags: [
      {
        id: "team",
        label: "Virtual Secretary Team",
        tone: "primary",
        showDot: false,
      },
      {
        id: "line",
        label: "Line Active & Connected",
        tone: "success",
        showDot: true,
      },
    ],
    title: "Your Virtual Secretary team is actively managing your line",
    instruction:
      "Operating strictly according to: Always confirm patient insurance type (Sanitas/Adeslas) before booking surgical consultations.",
    action: {
      label: "Message Secretary Desk",
      icon: { lucide: "MessageSquareText", size: 16 },
      href: "/client/messages",
    },
  },

  /** The trend lines reuse the admin exports, one per tone. */
  stats: [
    {
      id: "calls-handled",
      value: "18",
      label: "Calls Handled",
      delta: "+3 this week",
      tone: "success",
      icon: { lucide: "Phone", size: 20 },
      spark: { src: "/admin/spark/calls-today.svg" },
    },
    {
      id: "return-calls",
      value: "2",
      label: "Return Calls",
      delta: "2 callbacks pending",
      tone: "error",
      icon: { lucide: "PhoneMissed", size: 20 },
      spark: { src: "/admin/spark/missed-calls.svg" },
    },
    {
      id: "messages",
      value: "5",
      label: "Messages",
      delta: "1 needs reply",
      tone: "warning",
      icon: { lucide: "MessageSquareText", size: 20 },
      spark: { src: "/admin/spark/messages.svg" },
    },
    {
      id: "appointments",
      value: "6",
      label: "Appointments",
      delta: "Next at 10:30",
      tone: "primary",
      icon: { lucide: "CalendarDays", size: 20 },
      spark: { src: "/admin/spark/appointments-today.svg" },
    },
    {
      id: "pending-requests",
      value: "1",
      label: "Pending Requests",
      delta: "In progress",
      tone: "error",
      icon: { lucide: "SquareCheckBig", size: 20 },
      spark: { src: "/admin/spark/pending-tasks.svg" },
    },
  ],

  /**
   * A list shown in a panel, so it carries a list's `columns` and `card`
   * (rule 17) — but no toolbar or pager: it is the latest few calls, with
   * "Inbox" for the rest.
   */
  inboundCalls: {
    title: "RECENT CLIENT INBOUND CALLS",
    subtitle: "Latest callers received and triaged on your phone line",
    link: { label: "Inbox", href: "/client/calls" },
    texture: "/admin/table/table-texture.png",
    reviewHrefTemplate: "/client/calls?call={id}",
    emptyLabel: "No calls yet today.",
    tableClassName: "min-w-[960px]",
    columns: [
      CALLER_COLUMN,
      DATE_TIME_COLUMN,
      DIRECTION_COLUMN,
      DURATION_COLUMN,
      CALL_STATUS_COLUMN,
      REVIEW_COLUMN,
    ],
    card: {
      title: CALLER_COLUMN,
      status: CALL_STATUS_COLUMN,
      subtitle: DATE_TIME_COLUMN,
      fields: [DIRECTION_COLUMN, DURATION_COLUMN],
      action: REVIEW_COLUMN,
    },
    rows: [
      {
        id: "ramon-torres-01",
        caller: "Ramón Torres",
        phone: "+34 644 892 119",
        dateTime: "07/14/21 6:20am",
        ...directionOf("incoming"),
        duration: "03:42",
        callStatus: { label: "Connected", tone: "success" },
      },
      {
        id: "mateo-fernandez-02",
        caller: "Mateo Fernandez",
        phone: "+34 611 789 203",
        dateTime: "05/21/21 9:00am",
        ...directionOf("incoming"),
        duration: "04:15",
        callStatus: { label: "Completed", tone: "success" },
      },
      {
        id: "gonzalo-ramos-01",
        caller: "Gonzalo Ramos",
        phone: "+34 689 334 550",
        dateTime: "08/02/21 7:23am",
        ...directionOf("incoming"),
        duration: "00:00",
        callStatus: { label: "Missed", tone: "error" },
      },
      {
        id: "carmen-vidal-01",
        caller: "Carmen Vidal",
        phone: "+34 650 119 443",
        dateTime: "08/19/21 1:15pm",
        ...directionOf("outgoing"),
        duration: "02:18",
        callStatus: { label: "Completed", tone: "success" },
      },
      {
        id: "raul-menendez-01",
        caller: "Raul Menendez",
        phone: "+34 670 448 991",
        dateTime: "08/01/21 9:02am",
        ...directionOf("incoming"),
        duration: "01:05",
        callStatus: { label: "Voicemail", tone: "warning" },
      },
      {
        id: "patricia-ortiz-01",
        caller: "Patricia Ortiz",
        phone: "+34 633 220 119",
        dateTime: "07/10/21 10:22pm",
        ...directionOf("incoming"),
        duration: "05:12",
        callStatus: { label: "Completed", tone: "success" },
      },
    ],
  },

  /** Each booking's marker `tone`, its type `tag` and its `meta` line. */
  appointments: {
    title: "UPCOMING APPOINTMENTS",
    subtitle: "Bookings scheduled by your secretary",
    link: { label: "View Calendar", href: "/client/appointments" },
    openLabel: "Open",
    openHrefTemplate: "/client/appointments?appointment={id}",
    events: [
      {
        id: "post-op-carmen",
        label: "Post-Op Follow-up Consultation",
        meta: ["Carmen Vidal", "09:30 AM", "2026-08-28"],
        tone: "success",
        tag: { label: "Appointment", tone: "primary" },
      },
      {
        id: "intake-fernando",
        label: "New Patient Intake Assessment",
        meta: ["Fernando Morales", "2026-08-28", "09:30 AM"],
        tone: "success",
        tag: { label: "Callback", tone: "warning" },
      },
      {
        id: "portfolio-briefing",
        label: "Portfolio Review Briefing",
        meta: ["Vanguard Wealth Partners", "Alejandro Cruz", "09:30 AM"],
        tone: "primary",
        tag: { label: "Consultation", tone: "primary" },
      },
      {
        id: "post-op-laura",
        label: "Post-Op Follow-up Consultation",
        meta: ["Laura Alegre Clinic", "Carmen Vidal", "03:30 AM"],
        tone: "success",
        tag: { label: "Appointment", tone: "primary" },
      },
      {
        id: "patent-review",
        label: "IP & Patent Filing Review",
        meta: ["Catalunya Tech Legal", "Nuria Plug", "11:30 AM"],
        tone: "warning",
        tag: { label: "Follow-up", tone: "primary" },
      },
    ],
  },

  conversations: {
    title: "Recent Conversations",
    subtitle: "Incoming client inquiries across channels",
    link: { label: "Inbox", href: "/client/messages" },
  },

  notFunctionalMessage: "Requests aren’t wired up yet",
  notFunctionalDescription:
    "Submitting instructions will work once the backend is connected.",
};
