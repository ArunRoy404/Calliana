import { z } from "zod";

import { emailField, phoneField } from "@/schemas/auth/shared.schema";

/**
 * Validation for the add-agent panel — Figma 198:32312.
 *
 * Working hours are optional per day, but a day given both times must end
 * after it starts ("HH:MM" strings compare correctly as text).
 */
const timeRange = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});

export const addAgentSchema = z.object({
  phone: phoneField,
  email: emailField,
  role: z.string().min(1, "Choose a role"),
  availability: z.string().min(1, "Choose an availability"),
  client: z.string().min(1, "Assign at least one client"),
  queue: z.string().min(1, "Choose a call queue"),
  hours: z.record(z.string(), timeRange).superRefine((hours, context) => {
    const invalid = Object.values(hours ?? {})?.some(
      (range) => range?.from && range?.to && range?.to <= range?.from,
    );

    if (invalid) {
      context.addIssue({
        code: "custom",
        message: "Each day must end after it starts",
      });
    }
  }),
});

/** The design opens with a role, availability and queue already chosen. */
export const addAgentDefaultValues = {
  phone: "",
  email: "",
  role: "support-agent",
  availability: "available",
  client: "",
  queue: "primary",
  hours: {},
};
