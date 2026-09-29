/**
 * Agents directory — Figma 198:22835.
 *
 * The table is data-driven: `columns` says what each column shows and how
 * (`type` picks a cell renderer from `components/tables/cells`), and `rows`
 * carry only values. The same `DataTable` renders any other list in the app
 * from a different pair of arrays.
 *
 * `availability` on a row is the field the status filter matches against; it is
 * separate from the call-state label because "On Call" and "Busy" both count
 * as busy for filtering.
 */
const CLOCK_ICON = { src: "/icons/clock.svg", width: 16, height: 16 };

/*
 * Each column is declared once and referenced twice: in `columns` (the table)
 * and in `card` (the phone/tablet layout), so the two views can never drift.
 */
const AGENT = {
  id: "agent",
  label: "AGENT NAME & EXTENSION",
  type: "stack",
  primary: "name",
  secondary: "extension",
};
const EMAIL = {
  id: "email",
  label: "WORK EMAIL",
  type: "text",
  field: "email",
  wrap: true,
};
const CALL_STATE = {
  id: "callState",
  label: "CALL STATE",
  type: "badge",
  field: "callState",
  align: "center",
  headerAlign: "left",
};
const ZOIPER = {
  id: "zoiper",
  label: "ZOIPER",
  type: "badge",
  field: "zoiper",
  align: "center",
  headerAlign: "left",
};
const ASSIGNED_CLIENTS = {
  id: "assignedClients",
  label: "ASSIGNED CLIENTS",
  type: "text",
  field: "assignedClients",
  align: "center",
};
const CALLS_TODAY = {
  id: "callsToday",
  label: "CALLS TODAY",
  type: "text",
  field: "callsToday",
  align: "center",
};
const AVERAGE_HANDLE_TIME = {
  id: "averageHandleTime",
  label: "AVERAGE HANDLE TIME",
  type: "icon-text",
  field: "averageHandleTime",
  icon: CLOCK_ICON,
};
const LAST_ACTIVE = {
  id: "lastActive",
  label: "LAST ACTIVE",
  type: "icon-text",
  field: "lastActive",
  icon: CLOCK_ICON,
};
const PLATFORM = {
  id: "platform",
  label: "PLATFORM",
  type: "badge",
  field: "platform",
  align: "center",
};
const ACTION = {
  id: "action",
  label: "Action",
  type: "action",
  actions: [{ id: "view", label: "View Agent" }],
  align: "center",
};

export const agentsData = {
  texture: "/admin/table/table-texture.png",

  search: {
    label: "Search agents",
    placeholder: "Search...",
  },

  /**
   * The toolbar's select filters, in order. `param` is the filter's key in the
   * URL, `field` the row field it compares to, `allValue` the option that
   * switches it off.
   */
  filters: [
    {
      param: "status",
      field: "availability",
      label: "Filter by availability",
      allValue: "all",
      options: [
      { value: "all", label: "All Availability Statuses" },
      { value: "available", label: "Available (Taking Calls)" },
      { value: "busy", label: "Busy (In Call / Wrap-up)" },
      { value: "away", label: "Away" },
      { value: "offline", label: "Offline" },
      ],
    },
  ],

  addAction: {
    label: "Add New Agent",
    icon: { src: "/icons/add.svg", width: 20, height: 20 },
  },

  notFunctionalMessage: "Agent management isn’t wired up yet",
  notFunctionalDescription: "This action will work once the backend is connected.",

  emptyLabel: "No agents match your search or filter.",

  /** The table can scroll sideways below this width rather than crush ten columns. */
  tableClassName: "min-w-[1180px]",

  columns: [
    AGENT,
    EMAIL,
    CALL_STATE,
    ZOIPER,
    ASSIGNED_CLIENTS,
    CALLS_TODAY,
    AVERAGE_HANDLE_TIME,
    LAST_ACTIVE,
    PLATFORM,
    ACTION,
  ],

  /**
   * Below `xl` the table becomes a list of cards (`TableCardList`). The
   * card reuses the same column definitions — and so the same cell renderers —
   * in its own arrangement: a title with a status, a subtitle, a grid of
   * labelled fields and the action.
   */
  card: {
    title: AGENT,
    status: CALL_STATE,
    subtitle: EMAIL,
    fields: [
      ZOIPER,
      PLATFORM,
      ASSIGNED_CLIENTS,
      CALLS_TODAY,
      AVERAGE_HANDLE_TIME,
      LAST_ACTIVE,
    ],
    action: ACTION,
  },

  rows: [
    {
      id: "sofia-martinez",
      name: "Sofia Martínez",
      extension: "+34 644 892 119",
      email: "sofia.m@virtualsecretary.io",
      availability: "available",
      callState: { label: "Available", tone: "success" },
      zoiper: { label: "Connected", tone: "success" },
      assignedClients: "3",
      callsToday: "12",
      averageHandleTime: "2m 45s",
      lastActive: "NOW",
      platform: { label: "Active", tone: "success" },
    },
    {
      id: "carlos-ruiz",
      name: "Carlos Ruiz",
      extension: "+34 611 789 203",
      email: "carlos.r@virtualsecretary.io",
      availability: "busy",
      callState: { label: "On Call", tone: "info" },
      zoiper: { label: "Connected", tone: "info" },
      assignedClients: "2",
      callsToday: "8",
      averageHandleTime: "2m 45s",
      lastActive: "NOW",
      platform: { label: "Active", tone: "success" },
    },
    {
      id: "elena-vidal",
      name: "Elena Vidal",
      extension: "+34 611 789 203",
      email: "elena.v@virtualsecretary.io",
      availability: "busy",
      callState: { label: "Busy", tone: "warning" },
      zoiper: { label: "Disconnected", tone: "warning" },
      assignedClients: "4",
      callsToday: "15",
      averageHandleTime: "2m 45s",
      lastActive: "5m ago",
      platform: { label: "Active", tone: "success" },
    },
    {
      id: "marco-fernandez",
      name: "Marco Fernández",
      extension: "+34 611 789 203",
      email: "marco.f@virtualsecretary.io",
      availability: "away",
      callState: { label: "Away", tone: "neutral" },
      zoiper: { label: "Connected", tone: "neutral" },
      assignedClients: "1",
      callsToday: "3",
      averageHandleTime: "2m 45s",
      lastActive: "22m ago",
      platform: { label: "Active", tone: "success" },
    },
    {
      id: "alicia-torres",
      name: "Alicia Torres",
      extension: "+34 611 789 203",
      email: "alicia.t@virtualsecretary.io",
      availability: "offline",
      callState: { label: "Offline", tone: "neutral" },
      zoiper: { label: "Disconnected", tone: "neutral" },
      assignedClients: "2",
      callsToday: "0",
      averageHandleTime: "2m 45s",
      lastActive: "3h ago",
      platform: { label: "Inactive", tone: "neutral" },
    },
    {
      id: "lucia-navarro",
      name: "Lucía Navarro",
      extension: "+34 622 415 870",
      email: "lucia.n@virtualsecretary.io",
      availability: "available",
      callState: { label: "Available", tone: "success" },
      zoiper: { label: "Connected", tone: "success" },
      assignedClients: "3",
      callsToday: "10",
      averageHandleTime: "3m 10s",
      lastActive: "NOW",
      platform: { label: "Active", tone: "success" },
    },
    {
      id: "javier-molina",
      name: "Javier Molina",
      extension: "+34 633 208 551",
      email: "javier.m@virtualsecretary.io",
      availability: "busy",
      callState: { label: "On Call", tone: "info" },
      zoiper: { label: "Connected", tone: "info" },
      assignedClients: "2",
      callsToday: "9",
      averageHandleTime: "2m 20s",
      lastActive: "NOW",
      platform: { label: "Active", tone: "success" },
    },
    {
      id: "paula-ortega",
      name: "Paula Ortega",
      extension: "+34 655 902 417",
      email: "paula.o@virtualsecretary.io",
      availability: "away",
      callState: { label: "Away", tone: "neutral" },
      zoiper: { label: "Connected", tone: "neutral" },
      assignedClients: "1",
      callsToday: "4",
      averageHandleTime: "3m 05s",
      lastActive: "12m ago",
      platform: { label: "Active", tone: "success" },
    },
    {
      id: "diego-santos",
      name: "Diego Santos",
      extension: "+34 677 314 026",
      email: "diego.s@virtualsecretary.io",
      availability: "offline",
      callState: { label: "Offline", tone: "neutral" },
      zoiper: { label: "Disconnected", tone: "neutral" },
      assignedClients: "0",
      callsToday: "0",
      averageHandleTime: "1m 50s",
      lastActive: "1d ago",
      platform: { label: "Inactive", tone: "neutral" },
    },
    {
      id: "irene-castillo",
      name: "Irene Castillo",
      extension: "+34 688 571 339",
      email: "irene.c@virtualsecretary.io",
      availability: "available",
      callState: { label: "Available", tone: "success" },
      zoiper: { label: "Connected", tone: "success" },
      assignedClients: "2",
      callsToday: "7",
      averageHandleTime: "2m 35s",
      lastActive: "NOW",
      platform: { label: "Active", tone: "success" },
    },
    {
      id: "hugo-romero",
      name: "Hugo Romero",
      extension: "+34 699 143 782",
      email: "hugo.r@virtualsecretary.io",
      availability: "busy",
      callState: { label: "Busy", tone: "warning" },
      zoiper: { label: "Connected", tone: "warning" },
      assignedClients: "3",
      callsToday: "11",
      averageHandleTime: "2m 55s",
      lastActive: "2m ago",
      platform: { label: "Active", tone: "success" },
    },
    {
      id: "nuria-gil",
      name: "Nuria Gil",
      extension: "+34 610 527 964",
      email: "nuria.g@virtualsecretary.io",
      availability: "away",
      callState: { label: "Away", tone: "neutral" },
      zoiper: { label: "Disconnected", tone: "neutral" },
      assignedClients: "1",
      callsToday: "2",
      averageHandleTime: "3m 20s",
      lastActive: "40m ago",
      platform: { label: "Active", tone: "success" },
    },
  ],

  pagination: {
    /** `{total}`, `{page}` and `{pages}` are filled in by the store. */
    summary: "{total} agents · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },
};
