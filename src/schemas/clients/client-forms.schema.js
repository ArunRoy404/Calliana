import { z } from "zod";

import { emailField, phoneField } from "@/schemas/auth/shared.schema";

/**
 * Validation for the drawers a client's page opens on itself — Call client,
 * Schedule appointment, Edit client and Add contact. Each form's values are
 * seeded from the client's record when its drawer opens (`fromRecord`), so
 * the defaults here are only what an unseeded form holds.
 */
const notes = z
  .string()
  .trim()
  .max(1000, "Keep notes under 1000 characters")
  .optional();

export const callClientSchema = z.object({
  reason: z.string().trim().min(1, "Say why you are calling"),
  notes,
});

export const callClientDefaultValues = { reason: "", notes: "" };

export const scheduleClientAppointmentSchema = z.object({
  service: z.string().min(1, "Choose a service"),
  professional: z.string().min(1, "Choose a professional"),
  date: z.string().min(1, "Choose a date"),
  startTime: z.string().min(1, "Choose a start time"),
  duration: z.string().min(1, "Choose a duration"),
  location: z.string().min(1, "Choose a location or channel"),
  notes,
});

export const scheduleClientAppointmentDefaultValues = {
  service: "",
  professional: "",
  date: "",
  startTime: "",
  duration: "30",
  location: "",
  notes: "",
};

export const editClientSchema = z.object({
  businessName: z.string().trim().min(1, "Enter the business name"),
  businessType: z.string().min(1, "Choose a business type"),
  contactName: z.string().trim().min(1, "Enter the primary contact"),
  phone: phoneField,
  email: emailField,
  address: z.string().trim().optional(),
  timezone: z.string().min(1, "Choose a timezone"),
  status: z.string().min(1, "Choose a status"),
});

export const editClientDefaultValues = {
  businessName: "",
  businessType: "",
  contactName: "",
  phone: "",
  email: "",
  address: "",
  timezone: "",
  status: "",
};

export const addContactSchema = z.object({
  clientAccount: z.string().optional(),
  firstName: z.string().trim().min(1, "Enter a first name"),
  lastName: z.string().trim().min(1, "Enter a last name"),
  phone: phoneField,
  email: emailField,
  professional: z.string().min(1, "Choose a professional"),
  instructions: notes,
});

export const addContactDefaultValues = {
  clientAccount: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  professional: "",
  instructions: "",
};
