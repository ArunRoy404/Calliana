/**
 * Call Activity & Service Reports — built from the design screenshot (the
 * Figma node was not reachable to cite). Read through `useReportsStore`; the
 * period key (`?period=`) is in `src/schemas/reports/reports-params.schema.js`.
 *
 * The period (Today / This Week / This Month) scopes the stat cards and the
 * outcomes donut. The calls-volume chart is a week of traffic by design (its
 * axis is the weekdays), so it does not change with the period.
 */
const PERIODS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

export const reportsData = {
  periods: PERIODS,

  /** The stat row's column count at its widest. */
  statColumns: 5,

  /**
   * One card per metric — the parts that never change with the period. The
   * Messages trend line (`messages.svg`) is the blue export recoloured to
   * the warning tokens; there was no amber export.
   */
  statCards: [
    {
      id: "total-calls",
      label: "Total Calls",
      tone: "info",
      deltaTone: "primary",
      icon: { lucide: "Phone", size: 20 },
      spark: { src: "/admin/spark/active-agents.svg" },
    },
    {
      id: "answered",
      label: "Answered",
      tone: "success",
      icon: { lucide: "PhoneCall", size: 20 },
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
      id: "avg-duration",
      label: "Avg. Duration",
      tone: "info",
      icon: { lucide: "Phone", size: 20 },
      spark: { src: "/admin/spark/active-clients.svg" },
    },
  ],

  /** Each card's figure and delta line, per period. */
  statValues: {
    today: {
      "total-calls": { value: "258", delta: "+18% vs last week" },
      answered: { value: "241", delta: "93% answer rate" },
      "return-calls": { value: "17", delta: "7% miss rate" },
      messages: { value: "5", delta: "All replied" },
      "avg-duration": { value: "3m 42s" },
    },
    week: {
      "total-calls": { value: "1,486", delta: "+9% vs last week" },
      answered: { value: "1,372", delta: "92% answer rate" },
      "return-calls": { value: "114", delta: "8% miss rate" },
      messages: { value: "38", delta: "2 awaiting reply" },
      "avg-duration": { value: "3m 51s" },
    },
    month: {
      "total-calls": { value: "6,204", delta: "+12% vs last month" },
      answered: { value: "5,766", delta: "93% answer rate" },
      "return-calls": { value: "438", delta: "7% miss rate" },
      messages: { value: "162", delta: "All replied" },
      "avg-duration": { value: "3m 47s" },
    },
  },

  /**
   * A week of call traffic: seven two-hour slots a day. Each slot is
   * `[calls, answered]` — the grey stack is every call, the blue stack the
   * answered ones; the gap between them is the missed calls. One cell stands
   * for `step` calls up to `max`.
   */
  volume: {
    title: "CALLS VOLUME",
    description: "Calls per two-hour slot this week, answered and missed.",
    max: 80,
    step: 4,
    ticks: [80, 60, 40, 20, 0],
    separator: "•",
    tooltip: { calls: "CALLS", missed: "MISSED" },
    columnTitleTemplate: "{day} · {slot}",
    columnLabelTemplate: "{title}: {calls} calls, {missed} missed",
    tableHeaders: ["Slot", "Calls", "Missed"],
    slotLabels: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
    days: [
      {
        id: "mon",
        label: "MON",
        slots: [
          [14, 4],
          [28, 8],
          [44, 20],
          [60, 36],
          [60, 36],
          [48, 28],
          [36, 12],
        ],
      },
      {
        id: "tue",
        label: "TUE",
        slots: [
          [28, 8],
          [24, 4],
          [24, 8],
          [20, 4],
          [28, 12],
          [44, 20],
          [16, 4],
        ],
      },
      {
        id: "wed",
        label: "WED",
        slots: [
          [20, 4],
          [44, 20],
          [60, 36],
          [60, 36],
          [60, 32],
          [44, 24],
          [48, 20],
        ],
      },
      {
        id: "thu",
        label: "THU",
        slots: [
          [28, 8],
          [20, 4],
          [24, 16],
          [24, 16],
          [24, 16],
          [28, 8],
          [24, 16],
        ],
      },
      {
        id: "fri",
        label: "FRI",
        slots: [
          [44, 16],
          [44, 24],
          [48, 28],
          [55, 50],
          [40, 12],
          [52, 40],
          [28, 4],
        ],
      },
      {
        id: "sat",
        label: "SAT",
        slots: [
          [24, 16],
          [28, 8],
          [44, 20],
          [44, 28],
          [44, 24],
          [44, 20],
          [24, 8],
        ],
      },
      {
        id: "sun",
        label: "SUN",
        slots: [
          [20, 4],
          [24, 4],
          [24, 8],
          [28, 8],
          [24, 4],
          [24, 4],
          [52, 24],
        ],
      },
    ],
  },

  /**
   * Call outcomes as a donut. `segments` are in the ring's clockwise order
   * from the top, as the design draws it; `legendOrder` is the order the
   * legend lists them. Tones are `src/lib/tones.js` keys.
   *
   * The dataviz palette check flags Missed (red) beside Voicemail (amber) as
   * too close (ΔE 14.4, floor 15); kept as designed, with 2px gaps, a
   * labelled legend, hover values and a table view as relief. Voicemail on
   * the `brand-gradient-mid` purple (#913bc0) passes every check, if the
   * design allows it — it would need a tone entry in `src/lib/tones.js`.
   */
  outcomes: {
    title: "CALLS OUTCOMES",
    description: "How this period's calls ended.",
    label: "Calls by outcome",
    tooltip: { calls: "CALLS", share: "SHARE" },
    tableHeaders: ["Outcome", "Calls", "Share"],
    /** The ring in a 240-unit square: centre radius, stroke width, gap. */
    ring: { size: 240, radius: 92, width: 44, gap: 4 },
    segments: [
      { id: "missed", label: "Missed", tone: "error" },
      { id: "failed", label: "Failed", tone: "primary" },
      { id: "completed", label: "Completed", tone: "success" },
      { id: "voicemail", label: "Voicemail", tone: "warning" },
    ],
    legendOrder: ["completed", "failed", "missed", "voicemail"],
    values: {
      today: { missed: 17, failed: 108, completed: 99, voicemail: 34 },
      week: { missed: 114, failed: 602, completed: 571, voicemail: 199 },
      month: { missed: 438, failed: 2512, completed: 2421, voicemail: 833 },
    },
  },

  activity: {
    title: "Agent Activity",
    events: [
      {
        id: "call-handled",
        label: "Call handled — Ramón Torres, 4m 18s, appointment booked",
        timestamp: "Today 10:42",
        tone: "success",
      },
      {
        id: "outbound-call",
        label: "Outbound call — Jorge Pérez, follow-up scheduled",
        timestamp: "Today 09:55",
        tone: "success",
      },
      {
        id: "message-received",
        label: "Message received — appointment inquiry from Laura Alegre",
        timestamp: "Today 09:30",
        tone: "primary",
      },
      {
        id: "task-completed",
        label: "Task completed — Service agreement sent to Dental Care",
        timestamp: "Yesterday 17:30",
        tone: "success",
      },
      {
        id: "appointment-scheduled",
        label: "Appointment scheduled — Dr. Rodríguez, 29 Aug 10:30",
        timestamp: "Yesterday 14:10",
        tone: "warning",
      },
    ],
  },
};
