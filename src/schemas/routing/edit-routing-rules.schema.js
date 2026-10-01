import { z } from "zod";

/** Validation for the edit-routing-rules panel — Figma 376:28372. */
export const editRoutingRulesSchema = z.object({
  distributionStrategy: z.string().min(1, "Choose a distribution strategy"),
  queuePriority: z.string().min(1, "Choose a queue priority"),
  maxSla: z.string().min(1, "Choose a target SLA"),
  ringTimeout: z.string().min(1, "Choose a ring timeout"),
  primaryFallback: z.string().min(1, "Choose a primary fallback"),
  secondFallback: z.string().min(1, "Choose a second fallback"),
  simultaneousFallback: z.boolean().optional(),
  ivrGreeting: z.string().max(500).optional(),
  queueActive: z.boolean().optional(),
});

/** Overwritten by `loadQueue` the moment a queue's rules panel opens. */
export const editRoutingRulesDefaultValues = {
  distributionStrategy: "",
  queuePriority: "",
  maxSla: "",
  ringTimeout: "",
  primaryFallback: "",
  secondFallback: "",
  simultaneousFallback: false,
  ivrGreeting: "",
  queueActive: false,
};
