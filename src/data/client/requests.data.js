/**
 * The client portal's Service Requests & Instructions — built from the
 * design screenshots (the Figma node was not reachable). The client's own
 * instructions to their secretary team: one list with search, the category
 * and status filters, rows per page and "New Instruction Request", which
 * opens the "Submit New Request to Secretary Desk" drawer
 * (`new-request.data.js`).
 *
 * Categories, urgencies and statuses are each one list, shared by the
 * table's badges and filters and the drawer's selects (rule 0).
 */
const CLOCK_ICON = { src: "/icons/clock.svg", width: 16, height: 16 };

/**
 * Every request category. `requestable` ones are what a client can raise in
 * the drawer (the design's dropdown); the rest are ones the secretary team
 * files on a client's behalf, so they appear only in the list.
 */
export const REQUEST_CATEGORIES = [
  { value: "schedule-change", label: "Schedule Change", requestable: true },
  { value: "vip-escalation", label: "VIP Escalation Rule", requestable: true },
  {
    value: "script-update",
    label: "Script / Protocol Update",
    requestable: true,
  },
  {
    value: "priority-callback",
    label: "Priority Callback Order",
    requestable: true,
  },
  { value: "callback", label: "Callback Request" },
  { value: "information-update", label: "Information Update" },
  { value: "customer-follow-up", label: "Customer Follow-up" },
];

/** Urgency: the badge's short name and tone, and the drawer's longer name. */
export const REQUEST_URGENCIES = [
  { value: "normal", label: "Normal", formLabel: "Normal", tone: "primary" },
  { value: "high", label: "High", formLabel: "High Priority", tone: "warning" },
  {
    value: "urgent",
    label: "Urgent",
    formLabel: "Urgent (Immediate)",
    tone: "error",
  },
];

export const REQUEST_STATUSES = [
  { value: "pending", label: "Pending", tone: "warning" },
  { value: "in-progress", label: "In Progress", tone: "primary" },
  { value: "completed", label: "Completed", tone: "success" },
];

const REQUEST_ID = {
  id: "reference",
  label: "REQUEST ID",
  type: "text",
  field: "reference",
  tone: "primary",
  weight: "regular",
  size: "lg",
};
const REQUEST_TITLE = {
  id: "title",
  label: "REQUEST TITLE",
  type: "text",
  field: "title",
  truncate: true,
};
const CATEGORY = {
  id: "category",
  label: "CATEGORY",
  type: "text",
  field: "categoryLabel",
};
const CREATED = {
  id: "created",
  label: "CREATED",
  type: "icon-text",
  field: "created",
  icon: CLOCK_ICON,
};
const PRIORITY = {
  id: "priority",
  label: "PRIORITY",
  type: "badge",
  field: "priority",
  align: "center",
  headerAlign: "center",
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
  headerAlign: "center",
  actions: [
    {
      id: "more",
      label: "More request actions",
      iconOnly: true,
      variant: "outline-primary",
      icon: { lucide: "Ellipsis", size: 16 },
      props: {
        notFunctional: true,
        notFunctionalMessage: "Request actions aren’t wired up yet",
        notFunctionalDescription:
          "Editing or withdrawing a request will work once the backend is connected.",
      },
    },
  ],
};

export const clientRequestsData = {
  texture: "/admin/table/table-texture.png",

  search: { label: "Search requests", placeholder: "Search..." },

  filters: [
    {
      param: "category",
      field: "categoryKey",
      label: "Filter by category",
      allValue: "all",
      options: [
        { value: "all", label: "All Categories" },
        ...REQUEST_CATEGORIES.map(({ value, label }) => ({ value, label })),
      ],
    },
    {
      param: "status",
      field: "statusKey",
      label: "Filter by status",
      allValue: "all",
      options: [
        { value: "all", label: "All Statuses" },
        ...REQUEST_STATUSES.map(({ value, label }) => ({ value, label })),
      ],
    },
  ],

  addAction: {
    label: "New Instruction Request",
    icon: { lucide: "Plus", size: 16 },
  },

  emptyLabel: "No requests match your search or filters.",
  tableClassName: "min-w-[1100px]",

  columns: [
    REQUEST_ID,
    REQUEST_TITLE,
    CATEGORY,
    CREATED,
    PRIORITY,
    STATUS,
    ACTION,
  ],

  card: {
    title: REQUEST_TITLE,
    status: STATUS,
    subtitle: REQUEST_ID,
    fields: [CATEGORY, CREATED, PRIORITY],
    action: ACTION,
  },

  pagination: {
    summary: "{total} requests · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },

  /**
   * Each request: its reference, title, category, created date, urgency and
   * status keys. The store resolves the keys to labels and badges.
   */
  rows: [
    {
      id: "req-0041",
      reference: "REQ-0041",
      title: "Schedule follow-up call with Dr. Rodríguez",
      category: "callback",
      created: "28 Aug 2026",
      urgency: "high",
      status: "in-progress",
    },
    {
      id: "req-0040",
      reference: "REQ-0040",
      title: "Update billing contact information",
      category: "information-update",
      created: "24 Aug 2026",
      urgency: "normal",
      status: "completed",
    },
    {
      id: "req-0039",
      reference: "REQ-0039",
      title: "Client follow-up after consultation",
      category: "customer-follow-up",
      created: "24 Aug 2026",
      urgency: "normal",
      status: "completed",
    },
    {
      id: "req-0038",
      reference: "REQ-0038",
      title: "Move Friday surgical slots to the afternoon",
      category: "schedule-change",
      created: "22 Aug 2026",
      urgency: "high",
      status: "in-progress",
    },
    {
      id: "req-0037",
      reference: "REQ-0037",
      title: "Route VIP patients straight to Dr. Alegre",
      category: "vip-escalation",
      created: "21 Aug 2026",
      urgency: "urgent",
      status: "pending",
    },
    {
      id: "req-0036",
      reference: "REQ-0036",
      title: "Confirm insurance type before booking",
      category: "script-update",
      created: "19 Aug 2026",
      urgency: "normal",
      status: "completed",
    },
    {
      id: "req-0035",
      reference: "REQ-0035",
      title: "Call back post-op patients first each morning",
      category: "priority-callback",
      created: "18 Aug 2026",
      urgency: "high",
      status: "completed",
    },
    {
      id: "req-0034",
      reference: "REQ-0034",
      title: "Block the clinic calendar for 15 August",
      category: "schedule-change",
      created: "12 Aug 2026",
      urgency: "normal",
      status: "completed",
    },
    {
      id: "req-0033",
      reference: "REQ-0033",
      title: "Update the after-hours voicemail greeting",
      category: "script-update",
      created: "10 Aug 2026",
      urgency: "normal",
      status: "completed",
    },
    {
      id: "req-0032",
      reference: "REQ-0032",
      title: "Add Dr. Navarro to the on-call rota",
      category: "information-update",
      created: "07 Aug 2026",
      urgency: "normal",
      status: "completed",
    },
    {
      id: "req-0031",
      reference: "REQ-0031",
      title: "Escalate Sanitas pre-authorisations",
      category: "vip-escalation",
      created: "05 Aug 2026",
      urgency: "urgent",
      status: "completed",
    },
    {
      id: "req-0030",
      reference: "REQ-0030",
      title: "Reschedule cancelled laser sessions",
      category: "callback",
      created: "03 Aug 2026",
      urgency: "normal",
      status: "completed",
    },
  ],
};
