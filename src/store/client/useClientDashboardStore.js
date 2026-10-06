import { create } from "zustand";

import { clientCallsData } from "@/data/client/calls.data";
import { clientDashboardData } from "@/data/client/dashboard.data";
import { bookingRows } from "@/store/admin/useAppointmentsStore";
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

/**
 * The upcoming bookings, read from the calendar's own events: each one's
 * title, "who • when" line, type tone and tag, and the link its "Open"
 * follows (its details drawer on the client calendar).
 */
const appointmentEvents = bookingRows(APPOINTMENTS?.upcomingIds, {
  metaFields: ["contactPerson", "startLabel", "date"],
  openHrefTemplate: APPOINTMENTS?.openHrefTemplate,
});

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
