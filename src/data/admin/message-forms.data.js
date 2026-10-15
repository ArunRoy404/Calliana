import { TASK_PRIORITY_OPTIONS } from "@/data/admin/add-task.data";
import { callClientData } from "@/data/admin/client-forms.data";
import {
  CALENDAR_ICON,
  CLOCK_ICON,
} from "@/data/admin/schedule-appointment.data";
import {
  TASK_AGENT_OPTIONS,
  TASK_TYPE_OPTIONS,
} from "@/data/admin/tasks.data";

/**
 * The drawers the admin opens over an inbox conversation (`?callback=`,
 * `?lead=`, `?task=` — the conversation's id): Call back (the thread's
 * "Call back"), Call account lead (the client info's "Call Account Lead")
 * and Create action task (either "Create Task"). Read by `FormLayoutFields`;
 * `summary` templates are filled from the conversation's record.
 *
 * The two calls are the client page's Call client drawer (`callClientData`:
 * its Zoiper note, reason, notes and footer) addressed to someone else, so
 * they spread it and change only their title and recipient.
 */
const OUTGOING_CALLER_ID = {
  id: "callerId",
  label: "Outgoing caller ID",
  template: "{callerId}",
};
const CLIENT = { id: "client", label: "Client", template: "{account}" };

export const messageCallbackData = {
  ...callClientData,
  title: "Call back",
  subtitle: "Return the selected conversation’s call enquiry.",
  summary: {
    title: "Call recipient",
    fields: [
      { id: "contact", label: "Contact", template: "{contactPerson}" },
      CLIENT,
      { id: "phone", label: "Phone", template: "{contactPhone}" },
      OUTGOING_CALLER_ID,
    ],
  },
};

export const callAccountLeadData = {
  ...callClientData,
  title: "Call account lead",
  subtitle: undefined,
  subtitleTemplate: "Contact {leadName}, the designated account lead.",
  summary: {
    title: "Call recipient",
    fields: [
      {
        id: "contact",
        label: "Contact",
        template: "{leadName} — Account Lead",
      },
      CLIENT,
      { id: "phone", label: "Phone", template: "{leadPhone}" },
      OUTGOING_CALLER_ID,
    ],
  },
};

/**
 * "Create action task" — a follow-up from the conversation, on the task
 * form's own lists (types, priorities, agents). Field `name`s match
 * `messageTaskSchema` in `src/schemas/messages/message-forms.schema.js`.
 */
export const messageTaskData = {
  title: "Create action task",
  subtitle: "Assign a tracked follow-up from this conversation.",

  summary: {
    title: "Task context",
    fields: [
      CLIENT,
      { id: "contact", label: "Contact", template: "{leadName}" },
      {
        id: "source",
        label: "Source",
        template: "Conversation #{reference}",
      },
    ],
  },

  layout: [
    ["title"],
    ["taskType", "priority"],
    ["dueDate", "dueTime"],
    ["assignee"],
    ["instructions"],
  ],

  fields: {
    title: {
      name: "title",
      label: "TASK TITLE",
      placeholder: "e.g. Callback for appointment query",
    },
    dueDate: {
      name: "dueDate",
      label: "DUE DATE",
      type: "date",
      trailingIcon: CALENDAR_ICON,
    },
    dueTime: {
      name: "dueTime",
      label: "DUE TIME",
      type: "time",
      trailingIcon: CLOCK_ICON,
    },
    instructions: {
      name: "instructions",
      label: "INSTRUCTIONS",
      type: "textarea",
      rows: 3,
      placeholder: "What the assignee should do…",
    },
  },

  selects: {
    taskType: {
      name: "taskType",
      label: "TASK TYPE",
      options: TASK_TYPE_OPTIONS,
    },
    priority: {
      name: "priority",
      label: "PRIORITY",
      options: TASK_PRIORITY_OPTIONS,
    },
    assignee: {
      name: "assignee",
      label: "ASSIGN TO",
      placeholder: "Select an agent…",
      options: TASK_AGENT_OPTIONS,
    },
  },

  footer: { cancelLabel: "Cancel", submitLabel: "Create task" },
  notFunctionalMessage: "Task creation isn’t wired up yet",
  notFunctionalDescription:
    "The details are valid — the task will be created once the backend is connected.",
};
