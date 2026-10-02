/**
 * Call Details side panel — Figma 202:38997. One shared `sample` (the
 * recording, summary and timeline copy) is overlaid with each row's own
 * caller, phone, timing and status, the same way `agent-detail.data.js`
 * overlays one sample onto every agent.
 */
export const callDetailData = {
  closeLabel: "Close",

  /** The panel's heading, filled from each call by `useCallsStore`. */
  panelTitleTemplate: "Call Details: {caller}",
  panelSubtitleTemplate: "{startTime} • Duration {duration}",

  labels: {
    phone: "PHONE",
    clientAccount: "CLIENT ACCOUNT",
    assignedAgent: "ASSIGNED AGENT",
    purposeTag: "PURPOSE TAG",
    recordingTitle: "Call Recording Audio",
    summaryTitle: "Call Summary",
    agentNotesTitle: "Operational Agent Notes",
    triageNotesTitle: "Internal Triage Note",
    timelineTitle: "Call Event Timeline",
    editNotes: "Edit Notes",
    playLabel: "Play recording",
  },

  infoFields: [
    { id: "phone", label: "PHONE" },
    { id: "clientAccount", label: "CLIENT ACCOUNT" },
    { id: "assignedAgent", label: "ASSIGNED AGENT" },
    { id: "purposeTag", label: "PURPOSE TAG", tone: "info" },
  ],

  playIcon: { lucide: "Play", size: 20 },
  recordingIcon: { lucide: "AudioLines", size: 16 },

  /**
   * The recording's static waveform — each bar's height as a percentage of
   * the strip. Decorative until real audio exists.
   */
  waveform: {
    bars: [
      40, 60, 30, 70, 45, 80, 35, 55, 65, 40, 30, 50, 70, 45, 60, 35, 55, 40,
      65, 50, 30, 60, 45, 70, 40, 55, 35, 65, 50, 30, 45, 60,
    ],
  },
  soundIcon: { lucide: "Volume2", size: 20 },
  lockIcon: { lucide: "Lock", size: 16 },

  /** `hrefField` makes the left action a real link to the call's client account. */
  footerActions: [
    { id: "client", label: "Open Client Account", variant: "neutral", hrefField: "clientHref" },
    { id: "task", label: "Create Task", variant: "outline" },
    { id: "appointment", label: "Schedule Appt", variant: "primary" },
  ],

  notFunctionalMessage: "Call actions aren’t wired up yet",
  notFunctionalDescription: "This action will work once the backend is connected.",

  sample: {
    purposeTag: "Appointment Rescheduling",
    assignedAgent: "Elena Rostova",
    summary:
      "Patient requested to reschedule her laser dermatology session from Thursday to Friday morning due to work travel.",
    agentNotes:
      "Checked Dr. Alegre Friday calendar. Slot available at 11:30 AM. Patient confirmed.",
    triageNote: "Patient has Sanitas coverage. Verified authorization code in CRM.",
    timeline: [
      {
        id: "routed",
        label: "Inbound call routed through Medical Queue",
        timestamp: "10:14:02 AM • CTI PBX",
        tone: "info",
      },
      {
        id: "answered",
        label: "Answered by Elena Rostova",
        timestamp: "10:14:06 AM • Elena Rostova",
        tone: "success",
      },
      {
        id: "matched",
        label: "Client record matched",
        timestamp: "10:15:30 AM • System",
        tone: "neutral",
      },
      {
        id: "updated",
        label: "Calendar slot updated to Friday 11:30 AM",
        timestamp: "10:17:10 AM • Elena Rostova",
        tone: "success",
      },
    ],
  },
};
