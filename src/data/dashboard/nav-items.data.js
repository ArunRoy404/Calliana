/**
 * Every navigation row the product has, once.
 *
 * Roles pick from this catalogue (see `nav.data.js`) rather than each carrying
 * its own copy of the same twelve rows. `path` is the segment under the role's
 * own route, so one entry serves `/admin/calls`, `/agent/calls` and
 * `/client/calls`.
 *
 * Icons are lucide names rather than exported assets: Figma's export collapses
 * every nav row to one generic glyph, so the file cannot supply the twelve
 * distinct icons the design actually shows. lucide is already here as shadcn's
 * icon set and matches the design's weight at 20px.
 */
export const NAV_ITEMS = {
  dashboard: { label: "DASHBOARD", icon: "LayoutGrid", path: "" },
  agents: { label: "AGENTS", icon: "Users", path: "agents" },
  clients: { label: "CLIENTS", icon: "Building2", path: "clients" },
  calls: { label: "CALLS", icon: "Phone", path: "calls", badge: "01" },
  voicemail: { label: "VOICEMAIL", icon: "AudioLines", path: "voicemail" },
  messages: {
    label: "MESSAGES",
    icon: "MessageSquare",
    path: "messages",
    badge: "01",
  },
  appointments: {
    label: "APPOINTMENTS",
    icon: "CalendarDays",
    path: "appointments",
  },
  tasks: {
    label: "TASK & FOLLOW-UPS",
    icon: "SquareCheckBig",
    path: "tasks",
    badge: "01",
  },
  roles: { label: "USER & ROLES", icon: "UserCog", path: "roles" },
  routing: { label: "CALL ROUTING", icon: "Share2", path: "routing" },
  reports: { label: "REPORTS", icon: "ChartNoAxesColumn", path: "reports" },
  audit: { label: "AUDIT LOG", icon: "Clock", path: "audit" },
  billing: { label: "BILLING", icon: "CreditCard", path: "billing" },
  settings: { label: "SETTINGS", icon: "Settings", path: "settings" },
};

/** Section headings, so a role names a section rather than spelling one. */
export const NAV_SECTIONS = {
  overview: "OVERVIEW",
  operation: "OPERATION",
  management: "MANAGEMENT",
  workspace: "WORKSPACE",
  account: "ACCOUNT",
  system: "SYSTEM",
};
