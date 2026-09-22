import { z } from "zod";

import { emailField } from "@/schemas/auth/shared.schema";

/** Validation for the forgot-password form — Figma 43:8790. */
export const forgotPasswordSchema = z.object({ email: emailField });

export const forgotPasswordDefaultValues = { email: "" };
