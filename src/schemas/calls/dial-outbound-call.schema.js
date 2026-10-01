import { z } from "zod";

import { phoneField } from "@/schemas/auth/shared.schema";

/** Validation for the "Dial Outbound Call" panel. */
export const dialOutboundCallSchema = z.object({
  phone: phoneField,
  recipientName: z.string().optional(),
  client: z.string().optional(),
  callerId: z.string().optional(),
  purpose: z.string().optional(),
  notes: z.string().max(500).optional(),
  autoRecord: z.boolean().optional(),
});

export const dialOutboundCallDefaultValues = {
  phone: "",
  recipientName: "",
  client: "",
  callerId: "",
  purpose: "",
  notes: "",
  autoRecord: true,
};
