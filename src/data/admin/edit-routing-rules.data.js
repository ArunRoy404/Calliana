import { addRoutingQueueData } from "@/data/admin/add-routing-queue.data";

/**
 * "Edit Routing Rules" side panel — Figma 376:28372. Every value here sits
 * inside a select-height bordered box in the source, which means it is
 * editable (rule 30) — so this reuses the create-queue form's own select
 * configs (`addRoutingQueueData.selects`) rather than showing plain text.
 * One shared `sample` (option-value keys, matching those selects) is
 * overlaid with each queue's own name, the same overlay pattern
 * `queue-detail.data.js` uses for the read-only panel.
 */
export const editRoutingRulesData = {
  labels: {
    strategyTitle: "ROUTING STRATEGY",
    fallbackTitle: "RINGING & FALLBACK",
    simultaneousFallback: "Simultaneous fallback after timeout",
    simultaneousFallbackHelp:
      "If the primary overflow queue is unavailable, continue to the next configured action.",
    endpointTitle: "ENDPOINT & CLIENT RULES",
    assignedOperators: "Assigned Operators",
    linkedClients: "Linked Client Accounts",
    manageAgents: "Manage Agents",
    manageClients: "Manage Clients",
    ivrTitle: "IVR & CALL PATH",
    ivrGreeting: "IVR Greeting",
    callPathPreview: "Call Path Preview",
    queueActive: "Queue Active",
    queueActiveHelp: "Allow new inbound calls to enter this queue.",
  },

  /** The same three-column selects the create-queue form uses. */
  selects: {
    distributionStrategy: addRoutingQueueData?.selects?.distributionStrategy,
    queuePriority: addRoutingQueueData?.selects?.queuePriority,
    maxSla: addRoutingQueueData?.selects?.maxSla,
    ringTimeout: addRoutingQueueData?.selects?.ringTimeout,
    primaryFallback: addRoutingQueueData?.selects?.primaryFallback,
    secondFallback: addRoutingQueueData?.selects?.secondFallback,
  },

  ivrGreetingField: {
    name: "ivrGreeting",
    label: "IVR GREETING",
    type: "textarea",
  },

  footer: {
    cancelLabel: "Cancel",
    submitLabel: "Save Changes",
  },

  notFunctionalMessage: "Routing rules aren’t wired up yet",
  notFunctionalDescription: "Changes will save once the backend is connected.",

  sample: {
    distributionStrategy: "skill-based",
    queuePriority: "high",
    maxSla: "15",
    ringTimeout: "20",
    primaryFallback: "spillover-queue",
    secondFallback: "voicemail",
    simultaneousFallback: true,
    assignedOperators: ["Elena Rostova • Ext. 104", "Carlos Mendes • Ext. 102", "Sofía Ramos • Ext. 103"],
    linkedClients: ["Laura Alegre Clinic", "Martinez Dental Care"],
    ivrGreeting:
      "Thank you for calling our health practice. Please hold while we connect you with our clinical care triage team.",
    callPath: ["Inbound DID", "IVR Greeting", "Skill-Based Queue", "Assigned Endpoints", "Spillover"],
    queueActive: true,
  },
};
