import {
  CALLER_COLUMN,
  CLOCK_ICON,
  DIRECTION_COLUMN,
  directionOf,
  DURATION_COLUMN,
  INBOUND_LABELS,
} from "@/data/tables/call-columns.data";

/**
 * The agent's own call log — the Call History page and the dashboard's
 * "Recent Call History" (its first `recentCount` rows) read these same
 * columns and rows, never a copy. Built from the design screenshots (the
 * Figma node was not reachable).
 */
const NOT_WIRED = {
  notFunctional: true,
  notFunctionalMessage: "Call logs aren’t wired up yet",
  notFunctionalDescription: "It will work once the backend is connected.",
};

/** How a call ended — the outcome badge and its filter share these. */
const OUTCOMES = {
  completed: { label: "Completed", tone: "success" },
  connected: { label: "Connected", tone: "success" },
  missed: { label: "Missed", tone: "error" },
  voicemail: { label: "Voicemail", tone: "warning" },
};

const CLIENT = { id: "client", label: "CLIENT", type: "text", field: "client" };
const DATE = { id: "date", label: "DATE", type: "text", field: "date" };
const TIME = {
  id: "time",
  label: "TIME",
  type: "icon-text",
  field: "time",
  icon: CLOCK_ICON,
};
const PURPOSE = {
  id: "purpose",
  label: "PURPOSE",
  type: "text",
  field: "purpose",
};
const OUTCOME = {
  id: "outcome",
  label: "OUTCOME",
  type: "badge",
  field: "outcome",
  showDot: false,
  align: "center",
  headerAlign: "center",
};
const CALL_ACTIONS = {
  id: "action",
  label: "Action",
  type: "action",
  align: "center",
  headerAlign: "center",
  actions: [
    { id: "review", label: "Review Log", variant: "neutral", props: NOT_WIRED },
    {
      id: "call",
      label: "Call back",
      iconOnly: true,
      variant: "info",
      icon: { lucide: "Phone", size: 16 },
      props: {
        notFunctional: true,
        notFunctionalMessage: "Calling isn’t wired up yet",
        notFunctionalDescription:
          "Click-to-call will work once Zoiper is connected.",
      },
    },
  ],
};

/** A row's direction ("Inbound" / "Outbound"), its icon and filter key. */
const inbound = {
  direction: "incoming",
  ...directionOf("incoming", INBOUND_LABELS),
};
const outbound = {
  direction: "outgoing",
  ...directionOf("outgoing", INBOUND_LABELS),
};

/** One logged call: who, which client, when, how long, why and how it ended. */
function call(
  id,
  caller,
  phone,
  client,
  time,
  way,
  duration,
  purpose,
  outcome,
) {
  return {
    id,
    caller,
    phone,
    client,
    date: "28 Aug 2026",
    time,
    ...way,
    duration,
    purpose,
    outcomeKey: outcome,
    outcome: OUTCOMES?.[outcome],
  };
}

/** The table's look — the page's list and the dashboard's panel share it. */
export const CALL_HISTORY_TABLE = {
  texture: "/admin/table/table-texture.png",
  emptyLabel: "No calls match your search or filters.",
  tableClassName: "min-w-[1280px]",
  columns: [
    CALLER_COLUMN,
    CLIENT,
    DATE,
    TIME,
    DIRECTION_COLUMN,
    DURATION_COLUMN,
    PURPOSE,
    OUTCOME,
    CALL_ACTIONS,
  ],
  card: {
    title: CALLER_COLUMN,
    status: OUTCOME,
    subtitle: CLIENT,
    fields: [DATE, TIME, DIRECTION_COLUMN, DURATION_COLUMN, PURPOSE],
    action: CALL_ACTIONS,
  },
};

export const callHistoryData = {
  ...CALL_HISTORY_TABLE,

  search: { label: "Search call history", placeholder: "Search..." },

  filters: [
    {
      param: "direction",
      field: "direction",
      label: "Filter by direction",
      allValue: "all",
      options: [
        { value: "all", label: "All Directions" },
        { value: "incoming", label: "Inbound Calls" },
        { value: "outgoing", label: "Outbound Calls" },
      ],
    },
    {
      param: "outcome",
      field: "outcomeKey",
      label: "Filter by outcome",
      allValue: "all",
      options: [
        { value: "all", label: "All Outcomes" },
        ...Object.entries(OUTCOMES).map(([value, outcome]) => ({
          value,
          label: outcome?.label,
        })),
      ],
    },
  ],

  /** The design's glyph is a box with an arrow out of it. */
  secondaryAction: {
    label: "Export CSV",
    icon: { lucide: "SquareArrowOutUpRight", size: 16 },
    notFunctionalMessage: "Exporting isn’t wired up yet",
    notFunctionalDescription:
      "The CSV export will work once the backend is connected.",
  },

  pagination: {
    summary: "{total} calls · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },

  /** How many of the newest calls the dashboard's panel shows. */
  recentCount: 4,

  rows: [
    call(
      "ramon-torres",
      "Ramón Torres",
      "+34 655 112 843",
      "Laura Alegre Clinic",
      "10:42 AM",
      inbound,
      "4m 18s",
      "Appointment Rescheduling",
      "completed",
    ),
    call(
      "isabel-moreno",
      "Isabel Moreno",
      "+34 612 334 901",
      "Dental Care Center",
      "10:15 AM",
      inbound,
      "---",
      "Dental Emergency",
      "missed",
    ),
    call(
      "jorge-perez",
      "Jorge Pérez",
      "+34 699 557 220",
      "Clínica Bienestar",
      "09:55 AM",
      outbound,
      "6m 42s",
      "Portfolio Inquiry",
      "completed",
    ),
    call(
      "ana-fuentes",
      "Ana Fuentes",
      "+34 674 889 002",
      "Fisio Activa",
      "09:30 AM",
      inbound,
      "1m 12s",
      "Pre-Op Confirmation",
      "voicemail",
    ),
    call(
      "manuel-diaz",
      "Manuel Díaz",
      "+34 655 443 117",
      "Nuria Puig",
      "09:10 AM",
      inbound,
      "8m 55s",
      "Trademark Query",
      "completed",
    ),
    call(
      "patricia-leal",
      "Patricia Leal",
      "+34 622 778 563",
      "Centro Médico Sur",
      "08:45 AM",
      outbound,
      "3m 30s",
      "Invoice Query",
      "completed",
    ),
    call(
      "carmen-vidal",
      "Carmen Vidal",
      "+34 650 119 443",
      "Laura Alegre Clinic",
      "08:30 AM",
      inbound,
      "2m 18s",
      "Pre-Op Confirmation",
      "connected",
    ),
    call(
      "gonzalo-ramos",
      "Gonzalo Ramos",
      "+34 689 334 550",
      "Vanguard Wealth Partners",
      "08:15 AM",
      inbound,
      "---",
      "Portfolio Review",
      "missed",
    ),
    call(
      "raul-menendez",
      "Raul Menendez",
      "+34 670 448 991",
      "Catalunya Tech Legal",
      "08:05 AM",
      outbound,
      "1m 05s",
      "Contract Follow-up",
      "completed",
    ),
    call(
      "lucia-gil",
      "Lucía Gil",
      "+34 602 119 486",
      "Martinez Dental Care",
      "07:50 AM",
      inbound,
      "4m 02s",
      "Invoice Copy",
      "connected",
    ),
    call(
      "sofia-navarro",
      "Sofía Navarro",
      "+34 615 772 340",
      "Laura Alegre Clinic",
      "07:40 AM",
      inbound,
      "5m 11s",
      "New Patient Booking",
      "completed",
    ),
    call(
      "pablo-sanz",
      "Pablo Sanz",
      "+34 691 340 772",
      "Laura Alegre Clinic",
      "07:30 AM",
      inbound,
      "0m 48s",
      "Cancellation",
      "voicemail",
    ),
  ],
};
