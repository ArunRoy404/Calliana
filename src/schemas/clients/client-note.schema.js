import { z } from "zod";

/** A support note on a client — Figma 202:30951. */
export const clientNoteSchema = z.object({
  note: z
    .string()
    .trim()
    .min(1, "Write a note first")
    .max(1000, "Keep notes under 1000 characters"),
});

export const clientNoteDefaultValues = { note: "" };
