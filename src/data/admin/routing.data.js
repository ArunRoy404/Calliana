/**
 * Call Routing / Queues directory — Figma 381:38131.
 */
const QUEUE = {
  id: "queue",
  label: "QUEUE NAME & SECTOR",
  type: "stack",
  primary: "name",
  primaryWeight: "semibold",
  secondary: "description",
  secondaryColor: "secondary",
};
const ASSIGNED_AGENTS = {
  id: "assignedAgents",
  label: "ASSIGNED AGENTS",
  type: "text",
  field: "assignedAgents",
  align: "center",
};
const SLA_TARGET = {
  id: "slaTarget",
  label: "SLA TARGET",
  type: "text",
  field: "slaTarget",
  align: "center",
};
const LIVE_ACTIVE_CALLS = {
  id: "liveActiveCalls",
  label: "LIVE ACTIVE CALLS",
  type: "text",
  field: "liveActiveCalls",
  tone: "info",
  align: "center",
};
const STATUS = {
  id: "status",
  label: "STATUS",
  type: "badge",
  field: "status",
  align: "center",
  headerAlign: "center",
};
const ACTION = {
  id: "action",
  label: "Action",
  type: "action",
  align: "center",
  actions: [
    {
      id: "view",
      label: "View queue details",
      iconOnly: true,
      variant: "outline",
      icon: { lucide: "Settings2", size: 16 },
    },
  ],
};

export const routingData = {
  texture: "/admin/table/table-texture.png",

  search: {
    label: "Search queues",
    placeholder: "Search...",
  },

  filters: [],

  addAction: {
    label: "Create Routing Queue",
    icon: { lucide: "Plus", size: 16 },
  },

  notFunctionalMessage: "Queue management isn’t wired up yet",
  notFunctionalDescription: "This action will work once the backend is connected.",

  emptyLabel: "No routing queues match your search.",

  tableClassName: "min-w-[1020px]",

  columns: [QUEUE, ASSIGNED_AGENTS, SLA_TARGET, LIVE_ACTIVE_CALLS, STATUS, ACTION],

  card: {
    title: QUEUE,
    status: STATUS,
    subtitle: SLA_TARGET,
    fields: [ASSIGNED_AGENTS, LIVE_ACTIVE_CALLS],
    action: ACTION,
  },

  rows: [
    {
      id: "medical-healthcare-tier-1",
      name: "Medical & Healthcare Clinics (Tier 1)",
      description: "Configure call routing rules and agent queues.",
      assignedAgents: "4 Operators",
      slaTarget: "< 15s",
      liveActiveCalls: "1 ACTIVE CALL",
      status: { label: "Active", tone: "success" },
    },
    {
      id: "corporate-wealth-advisory-vip",
      name: "Corporate & Wealth Advisory (VIP)",
      description: "Strategy: Least-Occupied",
      assignedAgents: "3 Operators",
      slaTarget: "< 10s",
      liveActiveCalls: "0 ACTIVE CALLS",
      status: { label: "Active", tone: "success" },
    },
    {
      id: "dental-practices-overflow",
      name: "Dental Practices Overflow",
      description: "Strategy: Round-Robin",
      assignedAgents: "2 Operators",
      slaTarget: "< 20s",
      liveActiveCalls: "0 ACTIVE CALLS",
      status: { label: "Active", tone: "success" },
    },
    {
      id: "after-hours-emergency-dispatch",
      name: "After-Hours Emergency Dispatch",
      description: "Strategy: Skill-Based",
      assignedAgents: "2 Operators",
      slaTarget: "< 30s",
      liveActiveCalls: "0 ACTIVE CALLS",
      status: { label: "Active", tone: "success" },
    },
    {
      id: "legal-consultancy-standard",
      name: "Legal Consultancy Standard",
      description: "Strategy: Skill-Based",
      assignedAgents: "2 Operators",
      slaTarget: "< 25s",
      liveActiveCalls: "0 ACTIVE CALLS",
      status: { label: "Paused", tone: "neutral" },
    },
  ],

  pagination: {
    summary: "{total} queues · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },
};
