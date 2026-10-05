import { create } from "zustand";

import { callHistoryData } from "@/data/agent/call-history.data";
import { agentDashboardData } from "@/data/agent/dashboard.data";
import { bookingRows } from "@/store/admin/useAppointmentsStore";
import { summaries } from "@/store/admin/useMessagesStore";

const LIVE_CALL = agentDashboardData?.liveCall;
const SCHEDULES = agentDashboardData?.schedules;

/**
 * `count` bar heights (0–1) spread across a loudness `envelope`: each bar
 * reads the envelope at its position (linearly between points), with a
 * fixed ripple so neighbouring bars differ the way a recording's do. Pure
 * and seedless, so the server and browser draw the same bars.
 */
function waveformBars(envelope = [], count = 0) {
  const last = Math.max(envelope.length - 1, 0);

  return Array.from({ length: count }, (_, index) => {
    const position = count > 1 ? (index / (count - 1)) * last : 0;
    const left = Math.floor(position);
    const right = Math.min(left + 1, last);
    const level =
      (envelope?.[left] ?? 0) +
      ((envelope?.[right] ?? 0) - (envelope?.[left] ?? 0)) * (position - left);
    const ripple = 0.85 + 0.15 * Math.abs(Math.sin(index * 1.7));
    return Math.min(1, Math.max(0.2, level * ripple));
  });
}

/** The live call's waveform and the small one in its header, built once. */
const waveform = waveformBars(
  LIVE_CALL?.waveform?.envelope,
  LIVE_CALL?.waveform?.bars,
);
const headerWaveform = waveformBars(
  LIVE_CALL?.waveform?.envelope,
  LIVE_CALL?.headerBars,
);

/** Today's bookings: the calendar's own events, client • contact • time. */
const scheduleRows = bookingRows(SCHEDULES?.eventIds, {
  metaFields: ["client", "contactPerson", "startLabel"],
  openHrefTemplate: SCHEDULES?.openHrefTemplate,
});

/** The newest calls of the agent's call log — the Call History page's rows. */
const recentCallRows =
  callHistoryData?.rows?.slice(0, callHistoryData?.recentCount) ?? [];

/** The inbox's latest threads, each with where it stands. */
const conversationRows = summaries.map((summary) => ({
  ...summary,
  status: summary?.statusBadge,
}));

/**
 * The agent workspace's home. Nothing on it is view state — no filter, tab
 * or open record — so it has no URL params; every list and the waveforms
 * are built once above, so each selector returns the same object.
 */
export const useAgentDashboardStore = create(() => ({
  content: agentDashboardData,
  waveform,
  headerWaveform,
  scheduleRows,
  conversationRows,
  recentCallRows,
}));
