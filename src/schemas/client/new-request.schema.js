import { z } from "zod";

/** Validation for "Submit New Request to Secretary Desk". */
export const newRequestSchema = z.object({
  title: z.string().trim().min(1, "Enter a request title"),
  category: z.string().min(1, "Choose a request category"),
  urgency: z.string().min(1, "Choose an urgency"),
  instructions: z
    .string()
    .trim()
    .min(1, "Tell your secretary what to do")
    .max(1000, "Keep instructions under 1000 characters"),
});

/** The design's starting values: Schedule Change, Normal. */
export const newRequestDefaultValues = {
  title: "",
  category: "schedule-change",
  urgency: "normal",
  instructions: "",
};
