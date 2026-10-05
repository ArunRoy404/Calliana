import {
  CALL_STATUS_COLUMN,
  CALLER_COLUMN,
  DATE_TIME_COLUMN,
  DIRECTION_COLUMN,
  DURATION_COLUMN,
  REVIEW_CALL_COLUMN,
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
   * (rule 17) — but no toolbar or pager: its rows are the first few of the
   * client's own call log (`clientCallRows`), with "Inbox" for the rest.
   */
  inboundCalls: {
    title: "RECENT CLIENT INBOUND CALLS",
    subtitle: "Latest callers received and triaged on your phone line",
    link: { label: "Inbox", href: "/client/calls" },
    texture: "/admin/table/table-texture.png",
    emptyLabel: "No calls yet today.",
    tableClassName: "min-w-[960px]",
    columns: [
      CALLER_COLUMN,
      DATE_TIME_COLUMN,
      DIRECTION_COLUMN,
      DURATION_COLUMN,
      CALL_STATUS_COLUMN,
      REVIEW_CALL_COLUMN,
    ],
    card: {
      title: CALLER_COLUMN,
      status: CALL_STATUS_COLUMN,
      subtitle: DATE_TIME_COLUMN,
      fields: [DIRECTION_COLUMN, DURATION_COLUMN],
      action: REVIEW_CALL_COLUMN,
    },
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
