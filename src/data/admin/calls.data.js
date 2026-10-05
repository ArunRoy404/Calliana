/**
 * Calls directory — Figma 202:38783.
 *
 * Same shape as the agents and clients lists: `columns` say what each column
 * shows and how, `rows` carry only values, `card` rearranges the same columns
 * for narrow screens. The caller, direction, duration and call-status
 * columns (and `directionOf`) are shared with the client home's recent calls,
 * in `src/data/tables/call-columns.data.js`.
 */
import {
  CALL_STATUS_COLUMN as CALL_STATUS,
  CALLER_COLUMN as CALLER,
  CLOCK_ICON,
  DIRECTION_COLUMN as DIRECTION,
  directionOf,
  DURATION_COLUMN as DURATION,
} from "@/data/tables/call-columns.data";

const CLIENT_ACCOUNT = {
  id: "clientAccount",
  label: "CLIENT / ACCOUNT",
  type: "text",
  field: "clientAccount",
};
const START_TIME = {
  id: "startTime",
  label: "START TIME",
  type: "icon-text",
  field: "startTime",
  icon: CLOCK_ICON,
};
const FOLLOW_UP = {
  id: "followUp",
  label: "FOLLOW-UP",
  type: "badge",
  field: "followUp",
  showDot: false,
  align: "center",
  headerAlign: "center",
};
const ACTION = {
  id: "action",
  label: "Action",
  type: "action",
  align: "center",
  actions: [
    { id: "details", label: "Details", variant: "outline" },
    {
      id: "call",
      label: "Call caller",
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

export const CALL_STATUS_OPTIONS = [
  { value: "connected", label: "Connected" },
  { value: "completed", label: "Completed" },
  { value: "missed", label: "Missed" },
  { value: "voicemail", label: "Voicemail" },
];

export const CALL_CLIENT_OPTIONS = [
  { value: "laura-alegre-clinic", label: "Laura Alegre Clinic" },
  { value: "martinez-dental-care", label: "Martinez Dental Care" },
  { value: "vanguard-wealth-partners", label: "Vanguard Wealth Partners" },
  { value: "catalunya-tech-legal", label: "Catalunya Tech Legal" },
];

export const callsData = {
  texture: "/admin/table/table-texture.png",

  /** Where a call's details link its client account ("Open Client Account"). */
  clientHrefTemplate: "/admin/clients/{clientId}",

  search: {
    label: "Search calls",
    placeholder: "Search...",
  },

  filters: [
    {
      param: "client",
      field: "clientId",
      label: "Filter by client account",
      allValue: "all",
      options: [
        { value: "all", label: "All Client Accounts" },
        ...CALL_CLIENT_OPTIONS,
      ],
    },
    {
      param: "status",
      field: "statusKey",
      label: "Filter by call status",
      allValue: "all",
      options: [
        { value: "all", label: "All Call Statuses" },
        ...CALL_STATUS_OPTIONS,
      ],
    },
    {
      param: "direction",
      field: "direction",
      label: "Filter by direction",
      allValue: "all",
      options: [
        { value: "all", label: "All Calls" },
        { value: "incoming", label: "Incoming" },
        { value: "outgoing", label: "Outgoing" },
      ],
    },
  ],

  addAction: {
    label: "Dial Outbound Call",
    icon: { lucide: "Phone", size: 16 },
  },

  notFunctionalMessage: "Calling isn’t wired up yet",
  notFunctionalDescription: "This action will work once Zoiper is connected.",

  emptyLabel: "No calls match your search or filters.",

  tableClassName: "min-w-[1180px]",

  columns: [
    CALLER,
    CLIENT_ACCOUNT,
    DIRECTION,
    START_TIME,
    DURATION,
    CALL_STATUS,
    FOLLOW_UP,
    ACTION,
  ],

  card: {
    title: CALLER,
    status: CALL_STATUS,
    subtitle: CLIENT_ACCOUNT,
    fields: [DIRECTION, START_TIME, DURATION, FOLLOW_UP],
    action: ACTION,
  },

  rows: [
    {
      id: "isabel-gomez-01",
      caller: "Isabel Gomez",
      phone: "+34 644 892 119",
      clientAccount: "Laura Alegre Clinic",
      clientId: "laura-alegre-clinic",
      direction: "incoming",
      ...directionOf("incoming"),
      startTime: "10:14 AM",
      duration: "03:42",
      statusKey: "connected",
      callStatus: { label: "Connected", tone: "success" },
      followUp: { label: "Pending", tone: "warning" },
    },
    {
      id: "mateo-fernandez-01",
      caller: "Mateo Fernandez",
      phone: "+34 611 789 203",
      clientAccount: "Martinez Dental Care",
      clientId: "martinez-dental-care",
      direction: "incoming",
      ...directionOf("incoming"),
      startTime: "09:50 AM",
      duration: "04:15",
      statusKey: "completed",
      callStatus: { label: "Completed", tone: "success" },
      followUp: { label: "Needs Follow-Up", tone: "warning" },
    },
    {
      id: "gonzalo-ramos-01",
      caller: "Gonzalo Ramos",
      phone: "+34 689 334 550",
      clientAccount: "Vanguard Wealth Partners",
      clientId: "vanguard-wealth-partners",
      direction: "incoming",
      ...directionOf("incoming"),
      startTime: "09:15 AM",
      duration: "00:00",
      statusKey: "missed",
      callStatus: { label: "Missed", tone: "error" },
      followUp: { label: "Needs Follow-Up", tone: "warning" },
    },
    {
      id: "carmen-vidal-01",
      caller: "Carmen Vidal",
      phone: "+34 650 119 443",
      clientAccount: "Laura Alegre Clinic",
      clientId: "laura-alegre-clinic",
      direction: "outgoing",
      ...directionOf("outgoing"),
      startTime: "08:45 AM",
      duration: "02:18",
      statusKey: "completed",
      callStatus: { label: "Completed", tone: "success" },
      followUp: { label: "Resolved", tone: "success" },
    },
    {
      id: "raul-menendez-01",
      caller: "Raul Menendez",
      phone: "+34 670 448 991",
      clientAccount: "Catalunya Tech Legal",
      clientId: "catalunya-tech-legal",
      direction: "incoming",
      ...directionOf("incoming"),
      startTime: "08:20 AM",
      duration: "01:05",
      statusKey: "voicemail",
      callStatus: { label: "Voicemail", tone: "warning" },
      followUp: { label: "Scheduled", tone: "info" },
    },
    {
      id: "patricia-ortiz-01",
      caller: "Patricia Ortiz",
      phone: "+34 633 220 119",
      clientAccount: "Martinez Dental Care",
      clientId: "martinez-dental-care",
      direction: "incoming",
      ...directionOf("incoming"),
      startTime: "Yesterday, 04:30 PM",
      duration: "05:12",
      statusKey: "completed",
      callStatus: { label: "Completed", tone: "success" },
      followUp: { label: "Resolved", tone: "success" },
    },
    {
      id: "isabel-gomez-02",
      caller: "Isabel Gomez",
      phone: "+34 644 892 119",
      clientAccount: "Laura Alegre Clinic",
      clientId: "laura-alegre-clinic",
      direction: "outgoing",
      ...directionOf("outgoing"),
      startTime: "Yesterday, 02:10 PM",
      duration: "01:47",
      statusKey: "completed",
      callStatus: { label: "Completed", tone: "success" },
      followUp: { label: "Resolved", tone: "success" },
    },
    {
      id: "mateo-fernandez-02",
      caller: "Mateo Fernandez",
      phone: "+34 611 789 203",
      clientAccount: "Martinez Dental Care",
      clientId: "martinez-dental-care",
      direction: "incoming",
      ...directionOf("incoming"),
      startTime: "Yesterday, 11:05 AM",
      duration: "00:00",
      statusKey: "missed",
      callStatus: { label: "Missed", tone: "error" },
      followUp: { label: "Needs Follow-Up", tone: "warning" },
    },
    {
      id: "gonzalo-ramos-02",
      caller: "Gonzalo Ramos",
      phone: "+34 689 334 550",
      clientAccount: "Vanguard Wealth Partners",
      clientId: "vanguard-wealth-partners",
      direction: "outgoing",
      ...directionOf("outgoing"),
      startTime: "Mon, 03:40 PM",
      duration: "06:02",
      statusKey: "connected",
      callStatus: { label: "Connected", tone: "success" },
      followUp: { label: "Pending", tone: "warning" },
    },
    {
      id: "raul-menendez-02",
      caller: "Raul Menendez",
      phone: "+34 670 448 991",
      clientAccount: "Catalunya Tech Legal",
      clientId: "catalunya-tech-legal",
      direction: "incoming",
      ...directionOf("incoming"),
      startTime: "Mon, 10:15 AM",
      duration: "02:55",
      statusKey: "completed",
      callStatus: { label: "Completed", tone: "success" },
      followUp: { label: "Resolved", tone: "success" },
    },
    {
      id: "carmen-vidal-02",
      caller: "Carmen Vidal",
      phone: "+34 650 119 443",
      clientAccount: "Laura Alegre Clinic",
      clientId: "laura-alegre-clinic",
      direction: "incoming",
      ...directionOf("incoming"),
      startTime: "Fri, 01:20 PM",
      duration: "01:12",
      statusKey: "voicemail",
      callStatus: { label: "Voicemail", tone: "warning" },
      followUp: { label: "Scheduled", tone: "info" },
    },
    {
      id: "patricia-ortiz-02",
      caller: "Patricia Ortiz",
      phone: "+34 633 220 119",
      clientAccount: "Martinez Dental Care",
      clientId: "martinez-dental-care",
      direction: "outgoing",
      ...directionOf("outgoing"),
      startTime: "Fri, 09:05 AM",
      duration: "03:30",
      statusKey: "completed",
      callStatus: { label: "Completed", tone: "success" },
      followUp: { label: "Resolved", tone: "success" },
    },
  ],

  pagination: {
    summary: "{total} calls · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },
};
