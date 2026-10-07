import { callDetailData } from "@/data/admin/call-detail.data";
import {
  CALL_STATUS_COLUMN,
  CALLER_COLUMN,
  DATE_TIME_COLUMN,
  directionOf,
  DIRECTION_COLUMN,
  DURATION_COLUMN,
  REVIEW_CALL_COLUMN,
} from "@/data/tables/call-columns.data";

/**
 * The client portal's Calls & Notes — Figma 167:41075 (built from its
 * screenshot; the Figma node was not reachable). The client's own call log:
 * one list with search, the call-outcome filter and "Explore Call History";
 * each row's "Review Call" opens the same details drawer the admin calls
 * page uses (`?call=<id>`). The client home's "Recent Client Inbound Calls"
 * are the first `recentCount` rows of this same log.
 */
const CALLER_INFORMATION = { ...CALLER_COLUMN, label: "CALLER INFORMATION" };

const PURPOSE = {
  id: "purpose",
  label: "PURPOSE",
  type: "text",
  field: "purpose",
  weight: "medium",
};

/** The outcome filter's choices, in the order the design's dropdown lists them. */
const CALL_OUTCOME_OPTIONS = [
  { value: "completed", label: "Completed" },
  { value: "connected", label: "Connected" },
  { value: "missed", label: "Missed" },
  { value: "voicemail", label: "Voicemail" },
];

/** Each outcome's badge, so a row names its outcome once. */
const OUTCOMES = {
  completed: { label: "Completed", tone: "success" },
  connected: { label: "Connected", tone: "success" },
  missed: { label: "Missed", tone: "error" },
  voicemail: { label: "Voicemail", tone: "warning" },
};

/** One row of the log: its caller, purpose, time, direction and outcome. */
function call(
  id,
  caller,
  phone,
  purpose,
  startTime,
  direction,
  duration,
  outcome,
  note,
) {
  return {
    id,
    caller,
    phone,
    purpose,
    startTime,
    direction,
    ...directionOf(direction),
    duration,
    statusKey: outcome,
    callStatus: OUTCOMES?.[outcome],
    note,
  };
}

/**
 * The client's own links on the call drawer's footer, layered over its
 * `detail` by the client's calls store: Schedule Appt opens the client's
 * calendar with its new-appointment drawer. Create Task has no client page,
 * so it stays not-wired-up.
 */
export const CLIENT_CALL_DETAIL_LINKS = {
  footerActions: {
    appointment: { href: "/client/appointments?panel=add" },
  },
};

export const clientCallsData = {
  texture: "/admin/table/table-texture.png",

  search: { label: "Search calls", placeholder: "Search..." },

  filters: [
    {
      param: "status",
      field: "statusKey",
      label: "Filter by call outcome",
      allValue: "all",
      options: [
        { value: "all", label: "All Call Outcomes" },
        ...CALL_OUTCOME_OPTIONS,
      ],
    },
  ],

  /** A history archive is not built yet, so this says so rather than linking. */
  secondaryAction: {
    label: "Explore Call History",
    icon: { lucide: "SquareArrowOutUpRight", size: 16 },
    notFunctionalMessage: "Call history isn’t available yet",
    notFunctionalDescription:
      "The full call archive will open here once it is built.",
  },

  /**
   * A row opens its agent note beneath itself (`?note=<id>`); clicking the
   * row again closes it. Read-only — the client cannot edit the note.
   */
  expand: {
    field: "note",
    title: "Agent message from this call",
    hint: ["Read-only call note", "Click the row again to collapse"],
    separator: "•",
  },

  reviewHrefTemplate: "/client/calls?call={id}",
  recentCount: 6,

  emptyLabel: "No calls match your search or filter.",
  tableClassName: "min-w-[1100px]",

  columns: [
    CALLER_INFORMATION,
    PURPOSE,
    DATE_TIME_COLUMN,
    DIRECTION_COLUMN,
    DURATION_COLUMN,
    CALL_STATUS_COLUMN,
    REVIEW_CALL_COLUMN,
  ],

  card: {
    title: CALLER_INFORMATION,
    status: CALL_STATUS_COLUMN,
    subtitle: PURPOSE,
    fields: [DATE_TIME_COLUMN, DIRECTION_COLUMN, DURATION_COLUMN],
    action: REVIEW_CALL_COLUMN,
  },

  pagination: {
    summary: "{total} calls · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },

  /**
   * The details drawer: the admin's call details, without "Open Client
   * Account" — a client is already looking at their own account. Its links
   * are the client's own (`CLIENT_CALL_DETAIL_LINKS`).
   */
  detail: {
    ...callDetailData,
    footerActions: callDetailData?.footerActions?.filter(
      (action) => action?.id !== "client",
    ),
  },

  rows: [
    call(
      "isabel-gomez-01",
      "Isabel Gomez",
      "+34 644 892 119",
      "Appointment Rescheduling",
      "07/10/21 6:55pm",
      "incoming",
      "03:42",
      "connected",
      "Patient requested to move today’s appointment to Friday morning because of work travel. New availability was checked and the patient confirmed 11:30 AM.",
    ),
    call(
      "carmen-vidal-01",
      "Carmen Vidal",
      "+34 611 789 203",
      "Pre-Op Confirmation",
      "07/14/21 6:20am",
      "incoming",
      "04:15",
      "completed",
      "Confirmed tomorrow’s pre-op slot. Reminded the patient to fast from midnight and bring her insurance card.",
    ),
    call(
      "gonzalo-ramos-01",
      "Gonzalo Ramos",
      "+34 689 334 550",
      "Appointment Rescheduling",
      "08/01/21 9:02am",
      "incoming",
      "00:00",
      "missed",
      "Missed call, no voicemail left. A callback is queued for the morning shift.",
    ),
    call(
      "carmen-vidal-02",
      "Carmen Vidal",
      "+34 650 119 443",
      "Appointment Rescheduling",
      "05/21/21 9:00am",
      "outgoing",
      "02:18",
      "completed",
      "Called back to offer an earlier slot. The patient kept her original appointment.",
    ),
    call(
      "raul-menendez-01",
      "Raul Menendez",
      "+34 670 448 991",
      "Pre-Op Confirmation",
      "08/19/21 1:15pm",
      "incoming",
      "01:05",
      "voicemail",
      "Voicemail asking to confirm pre-op instructions. A written summary was sent by SMS.",
    ),
    call(
      "patricia-ortiz-01",
      "Patricia Ortiz",
      "+34 633 220 119",
      "Pre-Op Confirmation",
      "08/04/21 11:59am",
      "incoming",
      "05:12",
      "completed",
      "Pre-op checklist reviewed with the patient. No changes to the booking.",
    ),
    call(
      "ramon-torres-01",
      "Ramón Torres",
      "+34 644 892 120",
      "New Patient Enquiry",
      "08/03/21 10:14am",
      "incoming",
      "03:42",
      "completed",
      "New patient asked about laser dermatology. An intake consultation was booked for next week.",
    ),
    call(
      "mateo-fernandez-01",
      "Mateo Fernandez",
      "+34 611 789 204",
      "Insurance Verification",
      "08/05/21 4:40pm",
      "incoming",
      "02:56",
      "completed",
      "Sanitas coverage confirmed with the insurer; the authorisation code is noted in the CRM.",
    ),
    call(
      "lucia-herrera-01",
      "Lucía Herrera",
      "+34 622 410 118",
      "Appointment Rescheduling",
      "08/06/21 9:31am",
      "outgoing",
      "01:48",
      "connected",
      "Rescheduled to Thursday at 10:00 at the patient’s request; confirmation sent.",
    ),
    call(
      "diego-navarro-01",
      "Diego Navarro",
      "+34 655 902 317",
      "Pre-Op Confirmation",
      "08/09/21 12:05pm",
      "incoming",
      "00:00",
      "missed",
      "Missed call during the lunch window. A callback is scheduled for 15:00.",
    ),
    call(
      "elena-ferrer-01",
      "Elena Ferrer",
      "+34 678 210 554",
      "Billing Question",
      "08/10/21 3:22pm",
      "incoming",
      "02:07",
      "voicemail",
      "Voicemail about an invoice question. Forwarded to billing with the patient’s number.",
    ),
    call(
      "sofia-ruiz-01",
      "Sofía Ruiz",
      "+34 699 431 220",
      "New Patient Enquiry",
      "08/11/21 11:47am",
      "incoming",
      "04:33",
      "completed",
      "New patient enquiry about availability; first visit booked for Monday 09:30.",
    ),
  ],
};
