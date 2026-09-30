/**
 * "Create Telephony PBX Routing Queue" side panel — Figma 381:38131. Field
 * `name`s match the keys in `src/schemas/routing/add-routing-queue.schema.js`.
 */
export const addRoutingQueueData = {
  title: "Create Telephony PBX Routing Queue",
  subtitle: "Define queue distribution logic, assigned operator endpoints, and overflow fallback.",

  fields: {
    name: {
      name: "name",
      label: "QUEUE NAME",
      type: "text",
      placeholder: "e.g. Medical & Healthcare Clinics",
    },
    extension: {
      name: "extension",
      label: "EXTENSION",
      type: "text",
      placeholder: "e.g. 801",
    },
    description: {
      name: "description",
      label: "DESCRIPTION",
      type: "textarea",
      placeholder: "What this queue is for…",
    },
    ivrGreeting: {
      name: "ivrGreeting",
      label: "IVR GREETING",
      type: "textarea",
      placeholder: "What callers hear before they reach this queue…",
    },
  },

  selects: {
    distributionStrategy: {
      name: "distributionStrategy",
      label: "DISTRIBUTION STRATEGY",
      options: [
        { value: "skill-based", label: "Skill-Based" },
        { value: "round-robin", label: "Round-Robin" },
        { value: "least-occupied", label: "Least-Occupied" },
        { value: "simultaneous", label: "Simultaneous" },
      ],
    },
    queuePriority: {
      name: "queuePriority",
      label: "QUEUE PRIORITY",
      options: [
        { value: "low", label: "Low" },
        { value: "normal", label: "Normal" },
        { value: "high", label: "High" },
      ],
    },
    maxSla: {
      name: "maxSla",
      label: "TARGET MAX SLA",
      options: [
        { value: "10", label: "< 10s" },
        { value: "15", label: "< 15s" },
        { value: "20", label: "< 20s" },
        { value: "30", label: "< 30s" },
      ],
    },
    ringTimeout: {
      name: "ringTimeout",
      label: "RING TIMEOUT",
      options: [
        { value: "15", label: "15 seconds" },
        { value: "20", label: "20 seconds" },
        { value: "30", label: "30 seconds" },
      ],
    },
    primaryFallback: {
      name: "primaryFallback",
      label: "PRIMARY FALLBACK",
      options: [
        { value: "spillover-queue", label: "Spillover Queue" },
        { value: "voicemail", label: "Voicemail" },
        { value: "after-hours", label: "After-Hours Queue" },
      ],
    },
    secondFallback: {
      name: "secondFallback",
      label: "SECOND FALLBACK",
      options: [
        { value: "voicemail", label: "Voicemail" },
        { value: "spillover-queue", label: "Spillover Queue" },
      ],
    },
  },

  operators: {
    label: "ASSIGN OPERATORS",
    helperText: "Click to toggle agents",
    options: [
      { value: "elena-rostova", label: "Elena Rostova", meta: "Ext. 104" },
      { value: "laura-alegre", label: "Dr. Laura Alegre", meta: "Ext. 101" },
      { value: "marcus-vance", label: "Marcus Vance", meta: "Ext. 100" },
      { value: "carlos-mendes", label: "Carlos Mendes", meta: "Ext. 102" },
      { value: "sofia-ramos", label: "Sofía Ramos", meta: "Ext. 103" },
    ],
  },

  clients: {
    label: "LINKED CLIENT ACCOUNTS",
    helperText: "Inbound calls routed from these accounts",
    options: [
      { value: "laura-alegre-clinic", label: "Laura Alegre Clinic" },
      { value: "martinez-dental-care", label: "Martinez Dental Care" },
      { value: "catalunya-tech-legal", label: "Catalunya Tech Legal" },
      { value: "vanguard-wealth-partners", label: "Vanguard Wealth Partners" },
    ],
  },

  footer: {
    requiredMark: "*",
    requiredNote: "Required fields",
    cancelLabel: "Cancel",
    submitLabel: "Create Queue",
  },

  notFunctionalMessage: "Queue creation isn’t wired up yet",
  notFunctionalDescription:
    "The details are valid — the queue will be created once the backend is connected.",
};
