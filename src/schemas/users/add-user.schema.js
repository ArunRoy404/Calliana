import { z } from "zod";

import { emailField } from "@/schemas/auth/shared.schema";

/** Validation for the add-user panel. */
export const addUserSchema = z.object({
  name: z.string().trim().min(1, "Enter a full name"),
  email: emailField,
  role: z.string().min(1, "Choose a role"),
  status: z.string().min(1, "Choose an initial status"),
});

export const addUserDefaultValues = {
  name: "",
  email: "",
  role: "agent",
  status: "invited",
};
