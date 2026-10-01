/**
 * Queue Details side panel — Figma 381:38657. A queue row opens this
 * read-view first; its "Edit Rules" action opens the separate editable
 * `EditRoutingRulesPanel` (376:28372) — two different panels, not one.
 * One shared `sample` overlaid with each row's own name/status, the same
 * overlay pattern `call-detail.data.js` and `edit-routing-rules.data.js` use.
 */
export const queueDetailData = {
  labels: {
    idLine: "PBX Queue ID: {id} • Extension: Ext. {ext}",
    statusHeadline: "Queue is Operational & Online",
    algorithmLine: "Distribution algorithm: {strategy}",
    purposeTitle: "PURPOSE & DESCRIPTION",
    telemetryTitle: "LIVE TELEMETRY & SLA STATISTICS",
    callPathTitle: "ACD ROUTING ARCHITECTURE & CALL PATH",
    operatorsTitle: "ASSIGNED OPERATORS",
    clientsTitle: "LINKED CLIENT ACCOUNTS",
    editNotes: "Edit Notes",
    reassignAgents: "Reassign Agents",
    remove: "Remove",
  },

  headerActions: [
    { id: "pause", label: "Pause Queue", variant: "outline" },
    { id: "test", label: "Test Call", variant: "outline" },
    { id: "edit", label: "Edit Rules", variant: "primary" },
  ],

  footer: {
    deleteLabel: "Delete Queue",
    closeLabel: "Close",
    editLabel: "Edit Rules",
  },

  notFunctionalMessage: "Queue actions aren’t wired up yet",
  notFunctionalDescription: "This action will work once the backend is connected.",

  sample: {
    queueId: "Q_01",
    extension: "801",
    algorithm: "Skill-Based",
    priority: { label: "High", tone: "warning" },
    telemetryStatus: { label: "Pending", tone: "warning" },
    purpose:
      "Primary routing for dermatology, dental, and aesthetic medical appointments and urgent patient inquiries.",
    stats: [
      { id: "waiting", label: "Currently Waiting", value: "1" },
      { id: "speed", label: "Avg Speed to Answer", value: "< 15s" },
      { id: "sla", label: "Target Max SLA", value: "< 15s" },
      { id: "calls", label: "Calls Today", value: "78" },
    ],
    callPath: [
      {
        id: 1,
        title: "Inbound Trunk Arrival",
        description: "Caller connects via DID trunk mapped to Ext. 801.",
      },
      {
        id: 2,
        title: "IVR Greeting & Consent Prompt",
        description:
          "Thank you for calling our health practice. Please hold while we connect you with our clinical care triage team.",
      },
      {
        id: 3,
        title: "Distribution Engine: Skill-Based",
        description:
          "Routes incoming caller to agents with matching practice certification and language capabilities.",
      },
      {
        id: 4,
        title: "Endpoints Ringing & Timeout (20s)",
        description: "Rings 3 assigned operator softphone endpoints.",
      },
      {
        id: 5,
        title: "Fallback Overflow: Spillover Queue",
        description:
          "If no assigned operator answers within 20 seconds, executes Spillover Queue.",
      },
    ],
    operators: [
      {
        id: "elena-rostova",
        name: "Elena Rostova",
        ext: "104",
        role: "Agent",
        status: { label: "Available", tone: "success" },
      },
      {
        id: "carlos-mendes",
        name: "Carlos Mendes",
        ext: "102",
        role: "Operator",
        status: { label: "Available", tone: "success" },
      },
      {
        id: "sofia-ramos",
        name: "Sofía Ramos",
        ext: "103",
        role: "Agent",
        status: { label: "Available", tone: "success" },
      },
    ],
    linkedClients: ["Laura Alegre Clinic", "Martinez Dental Care"],
  },
};
