import { create } from "zustand";

import { clientDashboardData } from "@/data/client/dashboard.data";
import { fillTemplate } from "@/lib/fillTemplate";

const CALLS = clientDashboardData?.inboundCalls;
const APPOINTMENTS = clientDashboardData?.appointments;

/** Each recent call with the link its "Review Call" action opens. */
const inboundCallRows =
  CALLS?.rows?.map((row) => ({
    ...row,
    reviewHref: fillTemplate(CALLS?.reviewHrefTemplate, row),
  })) ?? [];

/** Each upcoming booking with the link its "Open" button follows. */
const appointmentEvents =
  APPOINTMENTS?.events?.map((event) => ({
    ...event,
    openHref: fillTemplate(APPOINTMENTS?.openHrefTemplate, event),
  })) ?? [];

/**
 * The client portal's home. Nothing on it is view state — no filter, tab or
 * open record — so it has no URL params; its rows and links are built once
 * above, so every selector returns the same object. The recent conversations
 * are the inbox's (`useMessagesStore`'s `summaries`), not held here.
 */
export const useClientDashboardStore = create(() => ({
  content: clientDashboardData,
  inboundCallRows,
  appointmentEvents,
}));
