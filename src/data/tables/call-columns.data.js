/**
 * The call-log columns more than one list shows — the admin calls directory
 * (Figma 202:38783) and the client home's recent inbound calls. Declared once
 * here (rule 0) so the two tables can never drift; each list adds its own
 * columns around them.
 *
 * `direction` differs per row, so DIRECTION reads its icon from the row's
 * `directionIcon` (`IconTextCell`'s `iconField`); `directionOf` gives a row
 * both that icon and its label.
 */
export const CLOCK_ICON = { src: "/icons/clock.svg", width: 16, height: 16 };
const PHONE_INCOMING_ICON = { lucide: "PhoneIncoming", size: 12 };
const PHONE_OUTGOING_ICON = { lucide: "PhoneOutgoing", size: 12 };

export const CALLER_COLUMN = {
  id: "caller",
  label: "CALLER",
  type: "stack",
  primary: "caller",
  secondary: "phone",
};

export const DIRECTION_COLUMN = {
  id: "direction",
  label: "DIRECTION",
  type: "icon-text",
  field: "directionLabel",
  iconField: "directionIcon",
  align: "center",
};

export const DURATION_COLUMN = {
  id: "duration",
  label: "DURATION",
  type: "icon-text",
  field: "duration",
  icon: CLOCK_ICON,
};

export const CALL_STATUS_COLUMN = {
  id: "callStatus",
  label: "CALL STATUS",
  type: "badge",
  field: "callStatus",
  align: "center",
  headerAlign: "center",
};

/** When the call happened, as one line ("07/10/21 6:55pm") — the client portal. */
export const DATE_TIME_COLUMN = {
  id: "dateTime",
  label: "DATE & TIME",
  type: "text",
  field: "startTime",
};

/**
 * "Review Call" — a link to the call's details drawer (the row's
 * `reviewHref`, `/client/calls?call=<id>`), so it works the same from the
 * client home and from Calls & Notes itself.
 */
export const REVIEW_CALL_COLUMN = {
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

/** A row's direction label and icon, from `"incoming"` / `"outgoing"`. */
export function directionOf(direction) {
  return direction === "outgoing"
    ? { directionLabel: "Outgoing", directionIcon: PHONE_OUTGOING_ICON }
    : { directionLabel: "Incoming", directionIcon: PHONE_INCOMING_ICON };
}
