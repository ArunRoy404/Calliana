import { reportsData } from "@/data/admin/reports.data";

/**
 * The client portal's Reports & Activity — built from the design screenshot
 * (the Figma node was not reachable). Read through `useClientReportsStore`,
 * the same reports machinery as the admin's (`createReportsStore`).
 *
 * The periods, Calls Volume, Calls Outcomes and the activity feed are the
 * admin report's own (rule 0); the client has its own four stat cards, the
 * Peak Call Hours chart and its feed's "Recent Activity" title.
 */
const CLIENT_STAT_CARDS = [
  {
    id: "calls-received",
    label: "Calls Received",
    tone: "success",
    icon: { lucide: "Phone", size: 20 },
    spark: { src: "/admin/spark/calls-today.svg" },
  },
  {
    id: "return-calls",
    label: "Return Calls",
    tone: "error",
    icon: { lucide: "PhoneMissed", size: 20 },
    spark: { src: "/admin/spark/missed-calls.svg" },
  },
  {
    id: "messages",
    label: "Messages",
    tone: "warning",
    icon: { lucide: "MessageSquareText", size: 20 },
    spark: { src: "/admin/spark/messages.svg" },
  },
  {
    id: "appointments",
    label: "Appointments",
    tone: "primary",
    icon: { lucide: "CalendarDays", size: 20 },
    spark: { src: "/admin/spark/appointments-today.svg" },
  },
];

export const clientReportsData = {
  periods: reportsData?.periods,
  statColumns: 4,
  statCards: CLIENT_STAT_CARDS,

  statValues: {
    today: {
      "calls-received": { value: "112", delta: "+14% vs last week" },
      "return-calls": { value: "8", delta: "7% miss rate" },
      messages: { value: "5", delta: "All replied" },
      appointments: { value: "6", delta: "2 upcoming" },
    },
    week: {
      "calls-received": { value: "684", delta: "+9% vs last week" },
      "return-calls": { value: "41", delta: "6% miss rate" },
      messages: { value: "27", delta: "1 awaiting reply" },
      appointments: { value: "23", delta: "5 upcoming" },
    },
    month: {
      "calls-received": { value: "2,840", delta: "+11% vs last month" },
      "return-calls": { value: "176", delta: "6% miss rate" },
      messages: { value: "108", delta: "All replied" },
      appointments: { value: "94", delta: "12 upcoming" },
    },
  },

  volume: reportsData?.volume,
  outcomes: reportsData?.outcomes,

  /**
   * When the client's callers ring: one column per ten minutes from 09:00 to
   * 17:00. Each slot is `[calls, typical]` — the teal stack is the slot's
   * calls, the grey stack above it the slot's typical volume. One cell
   * stands for `step` calls up to `max`. The legend names the bands a slot
   * can fall in.
   */
  peak: {
    title: "PEAK CALL HOURS",
    subtitle: "When your callers are most likely to reach you",
    max: 16,
    step: 0.8,
    ticks: [16, 12, 8, 4, 0],
    startHour: 9,
    endHour: 17,
    slotMinutes: 10,
    separator: "•",
    tooltip: { volume: "VOLUME", volumeTemplate: "{count} CALLS" },
    columnLabelTemplate: "{title}: {volume}",
    tableHeaders: ["Time", "Calls", "Typical"],
    legend: [
      { id: "peak", label: "Peak (≥12 calls)", tone: "accent" },
      { id: "moderate", label: "Moderate", tone: "primary" },
      { id: "low", label: "Low", tone: "muted" },
    ],
    slots: [
      [1, 2],
      [2, 3],
      [2, 4],
      [3, 5],
      [5, 7],
      [8, 12],
      [8, 12],
      [8, 12],
      [7, 9],
      [7, 8],
      [5, 9],
      [2, 4],
      [2, 4],
      [2, 4],
      [8, 5],
      [3, 9],
      [1, 3],
      [2, 4],
      [2, 5],
      [5, 9],
      [8, 12],
      [8, 12],
      [8, 12],
      [6, 9],
      [6, 9],
      [4, 10],
      [3, 4],
      [4, 5],
      [4, 5],
      [4, 5],
      [3, 8],
      [5, 10],
      [3, 7],
      [4, 9],
      [3, 8],
      [9, 12],
      [4, 6],
      [6, 7],
      [6, 10],
      [2, 4],
      [4, 5],
      [3, 5],
      [4, 7],
      [6, 8],
      [7, 8],
      [3, 5],
      [3, 5],
      [4, 9],
    ],
  },

  activity: { ...reportsData?.activity, title: "RECENT ACTIVITY" },
};
