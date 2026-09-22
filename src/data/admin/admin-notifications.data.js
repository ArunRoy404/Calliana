/** Notifications popover — Figma 196:19482. */
export const adminNotificationsData = {
  title: "Notifications",
  markAllLabel: "Mark All Read",
  unreadTemplate: "{count} unread notifications",

  tabs: [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
  ],

  dismissLabel: "Dismiss notification",
  emptyLabel: "Nothing here right now.",

  items: [
    {
      id: "n1",
      label: "Missed call from +34 612 334 901 — Clínica Bienestar",
      timestamp: "5m ago",
      isRead: false,
    },
    {
      id: "n2",
      label: "Task due: Follow-up on missed call — Clínica Bienestar",
      timestamp: "18m ago",
      isRead: false,
    },
    {
      id: "n3",
      label: "Appointment reminder: Dr. Martínez at 10:30 AM",
      timestamp: "1h ago",
      isRead: true,
    },
    {
      id: "n4",
      label: "Call assigned to you from Centro Médico Sur",
      timestamp: "3h ago",
      isRead: true,
    },
  ],
};
