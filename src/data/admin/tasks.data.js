/**
 * Task & Follow-ups directory — Figma 208:42520.
 *
 * Same shape as the other lists. `view` on a row is the bucket the segmented
 * filter matches against (due today / upcoming / overdue / completed);
 * `priorityKey` / `statusKey` back the dropdown filters, separate from the
 * badges shown in the table.
 */
const CLOCK_ICON = { src: "/icons/clock.svg", width: 16, height: 16 };

const TASK = {
  id: "task",
  label: "TASK",
  type: "text",
  field: "title",
  wrap: true,
};
const CLIENT = {
  id: "client",
  label: "CLIENT",
  type: "text",
  field: "client",
};
const TYPE = {
  id: "type",
  label: "TYPE",
  type: "text",
  field: "type",
};
const PRIORITY = {
  id: "priority",
  label: "PRIORITY",
  type: "badge",
  field: "priority",
  align: "center",
  headerAlign: "center",
};
const DUE_DATE = {
  id: "dueDate",
  label: "DUE DATE",
  type: "icon-text",
  field: "dueDate",
  icon: CLOCK_ICON,
};
const ASSIGNED_TO = {
  id: "assignedTo",
  label: "ASSIGNED TO",
  type: "user",
  field: "assignedTo",
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
      id: "complete",
      label: "Mark Complete",
      variant: "outline",
      props: {
        notFunctional: true,
        notFunctionalMessage: "Task management isn’t wired up yet",
        notFunctionalDescription:
          "This action will work once the backend is connected.",
      },
    },
  ],
};

/**
 * The task list's columns — the admin's Task & Follow-ups and the agent's
 * build their tables from these, adjusting only what their designs change.
 */
export const TASK_COLUMNS = {
  TASK,
  CLIENT,
  TYPE,
  PRIORITY,
  DUE_DATE,
  ASSIGNED_TO,
  STATUS,
};

export const TASK_PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

export const TASK_STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "overdue", label: "Overdue" },
  { value: "completed", label: "Completed" },
];

export const TASK_TYPE_OPTIONS = [
  { value: "callback", label: "Callback" },
  { value: "client-request", label: "Client Request" },
  { value: "appointment-coordination", label: "Appointment Coordination" },
  { value: "message-reply", label: "Message Reply" },
  { value: "general-task", label: "General Task" },
];

export const TASK_AGENT_OPTIONS = [
  { value: "sofia-martinez", label: "Sofia Martínez" },
  { value: "carlos-ruiz", label: "Carlos Ruiz" },
  { value: "elena-vidal", label: "Elena Vidal" },
];

const PRIORITIES = {
  low: { label: "Low", tone: "neutral" },
  normal: { label: "Normal", tone: "info" },
  high: { label: "High", tone: "warning" },
  urgent: { label: "Urgent", tone: "error" },
};

const STATUSES = {
  pending: { label: "Pending", tone: "warning" },
  "in-progress": { label: "In Progress", tone: "info" },
  overdue: { label: "Overdue", tone: "error" },
  completed: { label: "Completed", tone: "success" },
};

export const tasksData = {
  texture: "/admin/table/table-texture.png",

  search: {
    label: "Search tasks",
    placeholder: "Search...",
  },

  filters: [
    {
      param: "view",
      field: "view",
      label: "Filter by due",
      allValue: "all",
      variant: "segmented",
      options: [
        { value: "all", label: "All" },
        { value: "due-today", label: "Due Today" },
        { value: "upcoming", label: "Upcoming" },
        { value: "overdue", label: "Overdue" },
        { value: "completed", label: "Completed" },
      ],
    },
    {
      param: "agent",
      field: "assignedToKey",
      label: "Filter by agent",
      allValue: "all",
      options: [{ value: "all", label: "All Agents" }, ...TASK_AGENT_OPTIONS],
    },
    {
      param: "priority",
      field: "priorityKey",
      label: "Filter by priority",
      allValue: "all",
      options: [
        { value: "all", label: "All Priorities" },
        ...TASK_PRIORITY_OPTIONS,
      ],
    },
    {
      param: "status",
      field: "statusKey",
      label: "Filter by status",
      allValue: "all",
      options: [
        { value: "all", label: "All Statuses" },
        ...TASK_STATUS_OPTIONS,
      ],
    },
  ],

  addAction: {
    label: "Create Task",
    icon: { lucide: "Plus", size: 16 },
  },

  notFunctionalMessage: "Task management isn’t wired up yet",
  notFunctionalDescription:
    "This action will work once the backend is connected.",

  emptyLabel: "No tasks match your search or filters.",

  tableClassName: "min-w-[1100px]",

  columns: [
    TASK,
    CLIENT,
    TYPE,
    PRIORITY,
    DUE_DATE,
    ASSIGNED_TO,
    STATUS,
    ACTION,
  ],

  card: {
    title: TASK,
    status: STATUS,
    subtitle: CLIENT,
    fields: [TYPE, PRIORITY, DUE_DATE, ASSIGNED_TO],
    action: ACTION,
  },

  rows: [
    {
      id: "callback-appointment-query-01",
      title: "Callback for appointment query",
      client: "Laura Alegre Clinic",
      type: "Callback",
      priorityKey: "high",
      priority: PRIORITIES.high,
      dueDate: "Today 12:00",
      view: "due-today",
      assignedTo: "Sofia Martínez",
      assignedToKey: "sofia-martinez",
      statusKey: "pending",
      status: STATUSES.pending,
    },
    {
      id: "send-updated-service-agreement",
      title: "Send updated service agreement",
      client: "Dental Care Center",
      type: "Client Request",
      priorityKey: "normal",
      priority: PRIORITIES.normal,
      dueDate: "Today 17:00",
      view: "due-today",
      assignedTo: "Carlos Ruiz",
      assignedToKey: "carlos-ruiz",
      statusKey: "in-progress",
      status: STATUSES["in-progress"],
    },
    {
      id: "callback-appointment-query-02",
      title: "Callback for appointment query",
      client: "Clínica Bienestar",
      type: "Client Request",
      priorityKey: "normal",
      priority: PRIORITIES.normal,
      dueDate: "Tomorrow, 03:00 PM",
      view: "upcoming",
      assignedTo: "Sofia Martínez",
      assignedToKey: "sofia-martinez",
      statusKey: "pending",
      status: STATUSES.pending,
    },
    {
      id: "follow-up-missed-call",
      title: "Follow-up on missed call",
      client: "Fisio Activa",
      type: "Callback",
      priorityKey: "urgent",
      priority: PRIORITIES.urgent,
      dueDate: "Overdue 09:00",
      view: "overdue",
      assignedTo: "Elena Vidal",
      assignedToKey: "elena-vidal",
      statusKey: "overdue",
      status: STATUSES.overdue,
    },
    {
      id: "schedule-physiotherapy-consultation",
      title: "Schedule physiotherapy consultation",
      client: "Nuria Puig",
      type: "Message Reply",
      priorityKey: "low",
      priority: PRIORITIES.low,
      dueDate: "Tomorrow 11:00",
      view: "upcoming",
      assignedTo: "Sofia Martínez",
      assignedToKey: "sofia-martinez",
      statusKey: "pending",
      status: STATUSES.pending,
    },
    {
      id: "reply-billing-inquiry",
      title: "Reply to billing inquiry",
      client: "Centro Médico Sur",
      type: "Appointment Coordination",
      priorityKey: "normal",
      priority: PRIORITIES.normal,
      dueDate: "Thu 14:00",
      view: "upcoming",
      assignedTo: "Carlos Ruiz",
      assignedToKey: "carlos-ruiz",
      statusKey: "pending",
      status: STATUSES.pending,
    },
    {
      id: "confirm-lab-results-delivery",
      title: "Confirm lab results delivery",
      client: "Laura Alegre Clinic",
      type: "General Task",
      priorityKey: "normal",
      priority: PRIORITIES.normal,
      dueDate: "Yesterday 16:00",
      view: "completed",
      assignedTo: "Sofia Martínez",
      assignedToKey: "sofia-martinez",
      statusKey: "completed",
      status: STATUSES.completed,
    },
    {
      id: "update-insurance-authorization",
      title: "Update insurance authorization on file",
      client: "Martinez Dental Care",
      type: "General Task",
      priorityKey: "low",
      priority: PRIORITIES.low,
      dueDate: "Monday, 09:00 AM",
      view: "upcoming",
      assignedTo: "Elena Vidal",
      assignedToKey: "elena-vidal",
      statusKey: "pending",
      status: STATUSES.pending,
    },
    {
      id: "escalate-billing-dispute",
      title: "Escalate billing dispute to finance",
      client: "Vanguard Wealth Partners",
      type: "Client Request",
      priorityKey: "urgent",
      priority: PRIORITIES.urgent,
      dueDate: "Overdue 08:30",
      view: "overdue",
      assignedTo: "Carlos Ruiz",
      assignedToKey: "carlos-ruiz",
      statusKey: "overdue",
      status: STATUSES.overdue,
    },
    {
      id: "close-out-onboarding-checklist",
      title: "Close out onboarding checklist",
      client: "Catalunya Tech Legal",
      type: "General Task",
      priorityKey: "normal",
      priority: PRIORITIES.normal,
      dueDate: "Yesterday 12:00",
      view: "completed",
      assignedTo: "Sofia Martínez",
      assignedToKey: "sofia-martinez",
      statusKey: "completed",
      status: STATUSES.completed,
    },
  ],

  pagination: {
    summary: "{total} tasks · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },
};
