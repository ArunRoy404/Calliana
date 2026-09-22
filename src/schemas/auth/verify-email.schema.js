import { z } from "zod";

import { otpField } from "@/schemas/auth/shared.schema";

/** Validation for the verify-email form — Figma 43:8957. */
export const verifyEmailSchema = z.object({ code: otpField });

export const verifyEmailDefaultValues = { code: "" };
