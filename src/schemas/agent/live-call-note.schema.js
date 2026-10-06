import { z } from "zod";

import { liveCallData } from "@/data/agent/live-call.data";

const OUTCOMES = liveCallData?.outcome?.outcomes?.map((item) => item?.value);

/**
 * The live call's wrap-up: the note written during the call (up to
 * `note.maxLength` characters), its categories, the professional the call
 * is for, and how the call ended — an outcome is required to save.
 */
export const liveCallNoteSchema = z.object({
  note: z
    .string()
    .max(
      liveCallData?.note?.maxLength ?? 2000,
      "The note is longer than the limit.",
    ),
  categories: z.array(z.string()),
  professional: z.string(),
  outcome: z.enum(OUTCOMES, {
    message: "Choose how the call ended before wrapping up.",
  }),
});

export const liveCallNoteDefaultValues = {
  note: "",
  categories: ["appointment"],
  professional: liveCallData?.banner?.professional?.options?.[0]?.value ?? "",
  outcome: "handled",
};
