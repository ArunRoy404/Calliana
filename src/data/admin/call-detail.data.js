/**
 * Call Details side panel — Figma 202:38997 / 202:39212. One shared `sample` (the
 * recording, summary and timeline copy) is overlaid with each row's own
 * caller, phone, timing and status, the same way `agent-detail.data.js`
 * overlays one sample onto every agent.
 */
export const callDetailData = {
  closeLabel: "Close",

  /** Filled per call by `useCallsStore` from the row's own fields. */
  titleTemplate: "Call Details: {caller}",
  subtitleTemplate: "{startTime} • Duration {duration}",

  labels: {
    phone: "PHONE",
    clientAccount: "CLIENT ACCOUNT",
    assignedAgent: "ASSIGNED AGENT",
    purposeTag: "PURPOSE TAG",
    editNotes: "Edit Notes",
    playLabel: "Play recording",
  },

  infoFields: [
    { id: "phone", label: "PHONE" },
    { id: "clientAccount", label: "CLIENT ACCOUNT" },
    { id: "assignedAgent", label: "ASSIGNED AGENT" },
    { id: "purposeTag", label: "PURPOSE TAG", tone: "primary" },
  ],

  playIcon: { lucide: "Play", size: 16 },

  /**
   * The recording's waveform: one bar per entry, each a percentage of the
   * player's height, all drawn in primary blue (202:39212).
   */
  waveform: {
    bars: [
      35, 45, 60, 45, 35, 30, 28, 28, 30, 48, 62, 50, 32, 28, 25, 22, 20, 22,
      24, 25, 25, 28, 30, 35, 40, 45, 52, 60, 68, 75, 82, 88, 92, 95, 98, 100,
      98, 95, 92, 88, 82, 75, 68, 60, 52, 45, 40, 38, 35, 32, 30, 28, 26, 25,
      24, 23, 22, 22, 21, 20, 20, 20, 21, 22, 23, 24, 25, 26, 28, 30, 32, 35,
      38, 40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75, 78, 80,
      82, 85, 88, 90, 88, 85, 82, 80, 75, 70, 65, 58, 50, 45, 40, 35, 30, 28,
      28, 32, 40, 48, 55, 62, 68, 72, 70, 65, 58, 50, 45, 40, 35, 30, 35, 45,
      55, 65, 75, 80, 85, 88, 85, 80, 75, 65, 55, 45, 40, 35,
    ],
  },

  /**
   * The drawer's blocks, top to bottom, each an outlined `DetailSection`.
   * `kind` picks the body: `recording` (the player — always shown, its
   * header's right side reads the record's `recordingAside`), `timeline`
   * (the record's `field` as events) or text (the record's `field`). A
   * text or timeline section whose `field` is empty on a record is left
   * out. `editable` adds "Edit Notes"; `tone` tints the whole card.
   */
  sections: [
    {
      id: "recording",
      kind: "recording",
      title: "Call Recording Audio",
      /**
       * lucide stand-in for the equaliser glyph in the 202:39212
       * screenshot — a close match, not a verified Figma export.
       */
      icon: { lucide: "AudioLines", size: 18 },
      iconTone: "primary",
    },
    { id: "summary", field: "summary", title: "Call Summary" },
    {
      id: "agentNotes",
      field: "agentNotes",
      title: "Operational Agent Notes",
      editable: true,
    },
    {
      id: "triage",
      field: "triageNote",
      title: "Internal Triage Note:",
      icon: { lucide: "Lock", size: 16 },
      tone: "warning",
    },
    {
      id: "timeline",
      kind: "timeline",
      field: "timeline",
      title: "Call Event Timeline",
    },
  ],

  /**
   * `hrefField` makes the left action a real link to the call's client
   * account; `className` pushes it to the footer's left edge, away from the
   * other two (202:39212).
   */
  footerActions: [
    {
      id: "client",
      label: "Open Client Account",
      variant: "neutral",
      hrefField: "clientHref",
      className: "mr-auto",
    },
    { id: "task", label: "Create Task", variant: "neutral" },
    { id: "appointment", label: "Schedule Appt", variant: "primary" },
  ],

  notFunctionalMessage: "Call actions aren’t wired up yet",
  notFunctionalDescription:
    "This action will work once the backend is connected.",

  sample: {
    purposeTag: "Appointment Rescheduling",
    assignedAgent: "Elena Rostova",
    summary:
      "Patient requested to reschedule her laser dermatology session from Thursday to Friday morning due to work travel.",
    agentNotes:
      "Checked Dr. Alegre Friday calendar. Slot available at 11:30 AM. Patient confirmed.",
    triageNote:
      "Patient has Sanitas coverage. Verified authorization code in CRM.",
    /** Marker tones as 202:39212 draws them: green, green, blue, green, amber. */
    timeline: [
      {
        id: "routed",
        label: "Inbound call routed through Medical Queue",
        timestamp: "10:14:02 AM • CTI PBX",
        tone: "success",
      },
      {
        id: "answered",
        label: "Answered by Elena Rostova",
        timestamp: "10:14:06 AM • Elena Rostova",
        tone: "success",
      },
      {
        id: "matched",
        label: "Client record matched: Laura Alegre Clinic",
        timestamp: "10:15:30 AM • System",
        tone: "primary",
      },
      {
        id: "updated",
        label: "Calendar slot updated to Friday 11:30 AM",
        timestamp: "10:17:10 AM • Elena Rostova",
        tone: "success",
      },
      {
        id: "rerouted",
        label: "Inbound call routed through Medical Queue",
        timestamp: "10:14:02 AM • CTI PBX",
        tone: "warning",
      },
    ],
  },
};
