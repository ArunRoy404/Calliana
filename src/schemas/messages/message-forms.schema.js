import { z } from "zod";

/**
 * Validation for the admin's "Create action task" drawer over an inbox
 * conversation. Its two call drawers reuse the client page's
 * `callClientSchema` — the same reason and notes.
 */
export const messageTaskSchema = z.object({
  title: z.string().trim().min(1, "Give the task a title"),
  taskType: z.string().min(1, "Choose a task type"),
  priority: z.string().min(1, "Choose a priority"),
  dueDate: z.string().min(1, "Choose a due date"),
  dueTime: z.string().min(1, "Choose a due time"),
  assignee: z.string().min(1, "Choose who it is assigned to"),
  instructions: z
    .string()
    .trim()
    .max(2000, "Keep instructions under 2000 characters")
    .optional(),
});

/** Overwritten by the form's `load` the moment its drawer opens. */
export const messageTaskDefaultValues = {
  title: "",
  taskType: "",
  priority: "normal",
  dueDate: "",
  dueTime: "",
  assignee: "",
  instructions: "",
};
