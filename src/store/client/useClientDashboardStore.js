import { create } from "zustand";

import { clientCallsData } from "@/data/client/calls.data";
import { clientDashboardData } from "@/data/client/dashboard.data";
import { fillTemplate } from "@/lib/fillTemplate";
import { clientCallRows } from "@/store/client/useClientCallsStore";

const APPOINTMENTS = clientDashboardData?.appointments;

/**
 * The latest calls on the client's line: the first `recentCount` rows of
 * the Calls & Notes log (each already carrying its Review Call link).
 */
const inboundCallRows = clientCallRows.slice(
  0,
  clientCallsData?.recentCount ?? clientCallRows.length,
);

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
