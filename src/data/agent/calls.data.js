import {
  CALL_CLIENT_FILTER,
  CALL_STATUS_FILTER,
  callsData,
} from "@/data/admin/calls.data";

/**
 * The agent workspace's Calls — built from the design screenshots (the
 * Figma node was not reachable). The same call log as the admin's
 * (`callsData`: its rows, columns, card, dialer and details drawer), not a
 * copy; only the toolbar differs. The agent's bar leads with a pill filter
 * — All Calls / Incoming / Outgoing / Missed / Voicemail — that reads each
 * row's `views` (its direction and its status, set by the store), beside
 * the client-account and call-status selects.
 */
export const agentCallsData = {
  ...callsData,

  /** Where a call's details link its client account ("Open Client Account"). */
  clientHrefTemplate: "/agent/clients/{clientId}",

  filters: [
    {
      param: "view",
      field: "views",
      label: "Filter calls",
      allValue: "all",
      variant: "segmented",
      options: [
        { value: "all", label: "All Calls" },
        { value: "incoming", label: "Incoming" },
        { value: "outgoing", label: "Outgoing" },
        { value: "missed", label: "Missed" },
        { value: "voicemail", label: "Voicemail" },
      ],
    },
    CALL_CLIENT_FILTER,
    CALL_STATUS_FILTER,
  ],
};
