import { TASK_COLUMNS, tasksData } from "@/data/admin/tasks.data";

/**
 * The agent workspace's Task & Follow-ups — built from the design
 * screenshots (the Figma node was not reachable). The same tasks as the
 * admin's list (`tasksData.rows`) and the same "Create Operational Task"
 * drawer, not copies. What differs is the agent's: one pill filter (All /
 * My Tasks / Due Today / Upcoming / Overdue / Completed) instead of the
 * admin's dropdowns, a checkbox glyph before each task (red for an overdue
 * one), the status without a dot, and a "…" for each row's actions.
 */
const { TASK, CLIENT, TYPE, PRIORITY, DUE_DATE, ASSIGNED_TO, STATUS } =
  TASK_COLUMNS;

/**
 * Whose "My Tasks" these are. The dummy data has no tasks assigned to the
 * signed-in agent's own name yet, so it reads one agent's queue.
 */
export const MY_AGENT_KEY = "sofia-martinez";

/** The glyph before a task — red when it is overdue. */
export const TASK_ICONS = {
  default: { src: "/icons/client/task-primary.svg", width: 16, height: 16 },
  overdue: { src: "/icons/client/task-error.svg", width: 16, height: 16 },
};

const AGENT_TASK = {
  ...TASK,
  type: "icon-text",
  iconField: "taskIcon",
};

const MORE_ACTIONS = {
  id: "action",
  label: "Action",
  type: "action",
  align: "center",
  headerAlign: "center",
  actions: [
    {
      id: "more",
      label: "More task actions",
      iconOnly: true,
      variant: "outline-primary",
      icon: { lucide: "Ellipsis", size: 16 },
      props: {
        notFunctional: true,
        notFunctionalMessage: "Task actions aren’t wired up yet",
        notFunctionalDescription:
          "Completing or reassigning a task will work once the backend is connected.",
      },
    },
  ],
};

const AGENT_TYPE = { ...TYPE, align: "center", headerAlign: "center" };
const AGENT_STATUS = { ...STATUS, showDot: false };

export const agentTasksData = {
  ...tasksData,

  filters: [
    {
      param: "view",
      field: "views",
      label: "Filter tasks",
      allValue: "all",
      variant: "segmented",
      options: [
        { value: "all", label: "All" },
        { value: "mine", label: "My Tasks" },
        { value: "due-today", label: "Due Today" },
        { value: "upcoming", label: "Upcoming" },
        { value: "overdue", label: "Overdue" },
        { value: "completed", label: "Completed" },
      ],
    },
  ],

  columns: [
    AGENT_TASK,
    CLIENT,
    AGENT_TYPE,
    PRIORITY,
    DUE_DATE,
    ASSIGNED_TO,
    AGENT_STATUS,
    MORE_ACTIONS,
  ],

  card: {
    title: AGENT_TASK,
    status: AGENT_STATUS,
    subtitle: CLIENT,
    fields: [AGENT_TYPE, PRIORITY, DUE_DATE, ASSIGNED_TO],
    action: MORE_ACTIONS,
  },
};
