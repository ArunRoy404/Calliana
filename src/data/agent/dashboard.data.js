import { CALL_HISTORY_TABLE } from "@/data/agent/call-history.data";
import { CLOCK_ICON } from "@/data/tables/call-columns.data";

/**
 * The agent workspace's home — "Dashboard", built from the design
 * screenshot (the Figma node was not reachable). Read through
 * `useAgentDashboardStore`. Today's schedules are the calendar's own events
 * and the recent conversations the inbox's (`useMessagesStore`), not
 * copies; the live call, the follow-up queue and the call history are the
 * agent's own.
 *
 * Links point at the agent's own pages (`/agent/appointments`,
 * `/agent/tasks`, `/agent/call-history`…); they open once those pages are
 * built.
 */
const NOT_WIRED = {
  notFunctional: true,
  notFunctionalMessage: "This action isn’t wired up yet",
  notFunctionalDescription: "It will work once the backend is connected.",
};

const PRIORITIES = {
  urgent: { label: "Urgent", tone: "error" },
  high: { label: "High", tone: "warning" },
  normal: { label: "Normal", tone: "neutral" },
  low: { label: "Low", tone: "info" },
};

/* ---- Follow-up queue columns ------------------------------------------ */

const TASK_CLIENT = {
  id: "task",
  label: "TASK & CLIENT",
  type: "stack",
  primary: "title",
  secondary: "client",
  secondaryColor: "secondary",
};
const DUE = {
  id: "due",
  label: "DUE",
  type: "icon-text",
  field: "due",
  icon: CLOCK_ICON,
};
const PRIORITY = {
  id: "priority",
  label: "PRIORITY",
  type: "badge",
  field: "priority",
  align: "center",
  headerAlign: "center",
};
const RESOLVE = {
  id: "action",
  label: "Action",
  type: "action",
  align: "center",
  headerAlign: "center",
  actions: [
    { id: "resolve", label: "Resolve", variant: "neutral", props: NOT_WIRED },
  ],
};

export const agentDashboardData = {
  separator: "•",

  /** The trend lines reuse the admin exports, one per tone. */
  stats: [
    {
      id: "calls-today",
      value: "24",
      label: "Calls Today",
      delta: "+8% vs yesterday",
      tone: "success",
      icon: { lucide: "Phone", size: 20 },
      spark: { src: "/admin/spark/calls-today.svg" },
    },
    {
      id: "return-calls",
      value: "3",
      label: "Return Calls",
      delta: "+1 vs yesterday",
      tone: "error",
      icon: { lucide: "PhoneMissed", size: 20 },
      spark: { src: "/admin/spark/missed-calls.svg" },
    },
    {
      id: "new-messages",
      value: "8",
      label: "New Messages",
      delta: "2 need reply",
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
      id: "pending-follow-ups",
      value: "9",
      label: "Pending Follow-ups",
      delta: "3 overdue",
      tone: "error",
      icon: { lucide: "SquareCheckBig", size: 20 },
      spark: { src: "/admin/spark/pending-tasks.svg" },
    },
  ],

  /**
   * The call on the agent's line right now. `elapsedSeconds` is where the
   * timer starts (04:23); `waveform.envelope` is the call's loudness
   * (0–1), which the store spreads across `waveform.bars` bars.
   */
  liveCall: {
    label: "LIVE INBOUND CALL",
    connection: { label: "Zoiper Connected", tone: "success" },
    elapsedSeconds: 263,
    timerLabel: "Call duration",
    timerIcon: { lucide: "Clock", size: 20 },
    caller: {
      label: "CALLER IDENTITY",
      match: {
        label: "Matched Contact",
        icon: { lucide: "UserCheck", size: 16 },
      },
      name: "Isabel Gomez",
      phone: "+34 655 112 843",
      location: "Madrid, Spain",
      phoneIcon: { lucide: "Phone", size: 14 },
      locationIcon: { lucide: "MapPin", size: 14 },
    },
    account: {
      label: "ASSOCIATED CLIENT ACCOUNT",
      name: "Laura Alegre Clinic",
      icon: { lucide: "Building2", size: 20 },
      purpose: "Appointment Rescheduling",
      purposeIcon: { lucide: "Tag", size: 16 },
      note: "Patient requested to reschedule her laser dermatology session from Thursday to Friday afternoon.",
      link: {
        label: "View Account",
        href: "/agent/clients",
        icon: { lucide: "SquareArrowOutUpRight", size: 16 },
      },
    },
    headerBars: 40,
    waveform: {
      bars: 320,
      envelope: [
        0.9, 0.95, 0.5, 0.45, 0.5, 0.55, 0.6, 0.85, 0.95, 1, 0.9, 0.55, 0.5,
        0.45, 0.5, 0.95, 1, 0.9, 0.5, 0.45, 0.5, 0.95, 1, 0.95,
      ],
    },
    /**
     * Add Note has no backend yet; Create Task opens the agent's Task &
     * Follow-ups with its create drawer open, and Open Live Workspace the
     * workspace — the agent's own pages, so this agent-only data carries
     * the links itself.
     */
    notFunctionalMessage: NOT_WIRED.notFunctionalMessage,
    notFunctionalDescription: NOT_WIRED.notFunctionalDescription,
    actions: [
      {
        id: "note",
        label: "Add Note",
        variant: "neutral",
        icon: { lucide: "NotebookPen", size: 16 },
      },
      {
        id: "task",
        label: "Create Task",
        variant: "neutral",
        icon: { lucide: "SquareCheckBig", size: 16 },
        href: "/agent/tasks?panel=add",
      },
      {
        id: "workspace",
        label: "Open Live Workspace",
        variant: "primary",
        icon: { lucide: "MonitorSmartphone", size: 16 },
        href: "/agent/calls/live",
      },
    ],
  },

  /**
   * Today's bookings — events from the calendar itself, so each "Open"
   * opens that booking's own details drawer there. Each row's line is
   * client • contact • time.
   */
  schedules: {
    title: "TODAY’S SCHEDULES",
    subtitle: "Synchronized clinical and business appointments",
    link: { label: "View Calendar", href: "/agent/appointments" },
    openLabel: "Open",
    openHrefTemplate: "/agent/appointments?appointment={id}",
    /** Calendar events (`src/data/admin/appointments.data.js`), in order. */
    eventIds: [
      "post-op-carmen",
      "martinez-emergency-inspection",
      "portfolio-briefing",
      "post-op-laura",
      "patent-review",
    ],
  },

  conversations: {
    title: "RECENT CONVERSATIONS",
    subtitle: "Incoming client inquiries across channels",
    link: { label: "Inbox", href: "/agent/messages" },
  },

  /**
   * A list shown in a panel: a list's `columns` and `card` (rule 17), no
   * toolbar or pager — "View all" opens the full task list.
   */
  followUps: {
    title: "FOLLOW-UP QUEUE",
    subtitle: "High priority client tasks requiring agent resolution",
    link: { label: "View all", href: "/agent/tasks" },
    texture: "/admin/table/table-texture.png",
    emptyLabel: "No follow-ups waiting.",
    tableClassName: "min-w-[640px]",
    columns: [TASK_CLIENT, DUE, PRIORITY, RESOLVE],
    card: {
      title: TASK_CLIENT,
      status: PRIORITY,
      fields: [DUE],
      action: RESOLVE,
    },
    rows: [
      {
        id: "outbound-callback-vanguard",
        title: "Perform Outbound Callback to Gonzalo Ramos",
        client: "Vanguard Wealth Partners",
        due: "11:00 AM (Today)",
        priority: PRIORITIES.urgent,
      },
      {
        id: "sanitas-pre-authorisation",
        title: "Confirm Sanitas Pre-Authorisation",
        client: "Laura Alegre Clinic",
        due: "01:30 PM (Today)",
        priority: PRIORITIES.high,
      },
      {
        id: "post-emergency-summary",
        title: "Send Post-Emergency Dental Summary",
        client: "Martinez Dental Care",
        due: "03:00 PM (Today)",
        priority: PRIORITIES.normal,
      },
      {
        id: "archive-voicemail-transcripts",
        title: "Archive Voicemail Transcripts",
        client: "Catalunya Tech Legal",
        due: "10:00 AM (Tomorrow)",
        priority: PRIORITIES.low,
      },
    ],
  },

  /**
   * The agent's call log (`call-history.data.js`): its table and the
   * newest rows, which the store takes from the log itself.
   */
  callHistory: {
    ...CALL_HISTORY_TABLE,
    title: "Recent Call History",
    link: { label: "View All", href: "/agent/call-history" },
    emptyLabel: "No calls yet today.",
  },
};
