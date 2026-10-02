import { z } from "zod";

/**
 * A reply typed into the inbox composer — Figma 167:51527. An empty or
 * whitespace-only reply is simply not sent; the composer shows no error line
 * for it, so the rules carry no copy.
 */
export const messageComposerSchema = z.object({
  message: z.string().trim().min(1).max(1000),
});

export const messageComposerDefaultValues = { message: "" };
