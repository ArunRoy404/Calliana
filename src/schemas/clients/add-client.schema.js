import { z } from "zod";

import { emailField, phoneField } from "@/schemas/auth/shared.schema";

/**
 * Validation for the add-client panel — Figma 202:31067. The three starred
 * sections are required; the address and the support notes are optional.
 */
export const addClientSchema = z.object({
  businessName: z.string().trim().min(1, "Enter the business name"),
  businessType: z.string().min(1, "Choose a business type"),
  address: z.string().trim().optional(),
  contactName: z.string().trim().min(1, "Enter the contact’s name"),
  phone: phoneField,
  email: emailField,
  assignedAgent: z.string().min(1, "Assign an agent"),
  status: z.string().min(1, "Choose a status"),
  notes: z.string().trim().max(1000, "Keep notes under 1000 characters").optional(),
});

/** The design opens on "Medical & Healthcare" and "Active". */
export const addClientDefaultValues = {
  businessName: "",
  businessType: "medical",
  address: "",
  contactName: "",
  phone: "",
  email: "",
  assignedAgent: "",
  status: "active",
  notes: "",
};
