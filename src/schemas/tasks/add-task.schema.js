import { z } from "zod";

/** Validation for the create-task panel — Figma 208:42777. */
export const addTaskSchema = z.object({
  title: z.string().trim().min(1, "Enter a task title"),
  client: z.string().min(1, "Choose a client account"),
  taskType: z.string().min(1, "Choose a task type"),
  priority: z.string().min(1, "Choose a priority"),
  date: z.string().min(1, "Choose a date"),
  dueTime: z.string().min(1, "Choose a due time"),
  description: z.string().max(1000).optional(),
});

export const addTaskDefaultValues = {
  title: "",
  client: "",
  taskType: "callback",
  priority: "normal",
  date: "",
  dueTime: "",
  description: "",
};
