import { z } from "zod";

/** Validation for the create-routing-queue panel — Figma 381:38131. */
export const addRoutingQueueSchema = z.object({
  name: z.string().trim().min(1, "Enter a queue name"),
  extension: z
    .string()
    .trim()
    .min(1, "Enter an extension")
    .regex(/^\d{2,6}$/, "Extension is 2–6 digits"),
  description: z.string().max(300).optional(),
  distributionStrategy: z.string().min(1, "Choose a distribution strategy"),
  queuePriority: z.string().min(1, "Choose a queue priority"),
  maxSla: z.string().min(1, "Choose a target SLA"),
  ringTimeout: z.string().min(1, "Choose a ring timeout"),
  primaryFallback: z.string().min(1, "Choose a primary fallback"),
  secondFallback: z.string().min(1, "Choose a second fallback"),
  operators: z.array(z.string()).min(1, "Assign at least one operator"),
  clients: z.array(z.string()).optional(),
  ivrGreeting: z.string().max(500).optional(),
});

export const addRoutingQueueDefaultValues = {
  name: "",
  extension: "",
  description: "",
  distributionStrategy: "skill-based",
  queuePriority: "normal",
  maxSla: "20",
  ringTimeout: "20",
  primaryFallback: "spillover-queue",
  secondFallback: "voicemail",
  operators: [],
  clients: [],
  ivrGreeting: "",
};
