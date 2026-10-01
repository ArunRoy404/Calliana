import { TASK_TYPE_OPTIONS } from "@/data/admin/tasks.data";

/**
 * "Create Operational Task" side panel — Figma 208:42777. Field `name`s match
 * the keys in `src/schemas/tasks/add-task.schema.js`.
 */
export const addTaskData = {
  title: "Create Operational Task",
  subtitle: "Ensure client commitments and triage follow-ups are tracked",

  fields: {
    title: {
      name: "title",
      label: "TASK TITLE",
      type: "text",
      placeholder: "e.g. Callback for appointment query",
    },
  },

  selects: {
    client: {
      name: "client",
      label: "CLIENT ACCOUNT",
      placeholder: "Select client…",
      options: [
        { value: "laura-alegre-clinic", label: "Laura Alegre Clinic" },
        { value: "martinez-dental-care", label: "Martinez Dental Care" },
        { value: "vanguard-wealth-partners", label: "Vanguard Wealth Partners" },
        { value: "catalunya-tech-legal", label: "Catalunya Tech Legal" },
        { value: "dental-care-center", label: "Dental Care Center" },
        { value: "clinica-bienestar", label: "Clínica Bienestar" },
      ],
    },
    taskType: {
      name: "taskType",
      label: "TASK TYPE",
      options: TASK_TYPE_OPTIONS,
    },
    priority: {
      name: "priority",
      label: "PRIORITY LEVEL",
      options: [
        { value: "low", label: "Low" },
        { value: "normal", label: "Normal" },
        { value: "high", label: "High" },
        { value: "urgent", label: "Urgent" },
      ],
    },
  },

  dateField: {
    name: "date",
    label: "DATE",
    type: "date",
  },

  dueTimeField: {
    name: "dueTime",
    label: "DUE TIME",
    type: "time",
  },

  descriptionField: {
    name: "description",
    label: "DETAILED DESCRIPTION",
    type: "textarea",
    placeholder: "Any special handling instructions for agents when calling this client…",
  },

  footer: {
    requiredMark: "*",
    requiredNote: "Required fields",
    cancelLabel: "Cancel",
    submitLabel: "Save Task",
  },

  notFunctionalMessage: "Task creation isn’t wired up yet",
  notFunctionalDescription:
    "The details are valid — the task will be created once the backend is connected.",
};
