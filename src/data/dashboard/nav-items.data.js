/**
 * Every navigation row the product has, once.
 *
 * Roles pick from this catalogue (see `nav.data.js`) rather than each carrying
 * its own copy of the same twelve rows. `path` is the segment under the role's
 * own route, so one entry serves `/admin/calls`, `/agent/calls` and
 * `/client/calls`.
 *
 * `icon` is a key into `components/icons`' `SIDEBAR_ICONS` registry (rule 1:
 * data files hold literals, so the lookup — not a component reference —
 * lives here). Every icon there is redrawn from Figma 202:41243's rendered
 * sidebar (see AGENTS.md rule 30 for which ones are exact exports vs.
 * closely matched).
 */
export const NAV_ITEMS = {
  dashboard: { label: "DASHBOARD", icon: "dashboard", path: "" },
  agents: { label: "AGENTS", icon: "agents", path: "agents" },
  clients: { label: "CLIENTS", icon: "clients", path: "clients" },
  calls: { label: "CALLS", icon: "calls", path: "calls", badge: "01" },
  voicemail: { label: "VOICEMAIL", icon: "voicemail", path: "voicemail" },
  messages: {
    label: "MESSAGES",
    icon: "messages",
    path: "messages",
    badge: "01",
  },
  appointments: {
    label: "APPOINTMENTS",
    icon: "appointments",
    path: "appointments",
  },
  tasks: {
    label: "TASK & FOLLOW-UPS",
    icon: "tasks",
    path: "tasks",
    badge: "01",
  },
  roles: { label: "USER & ROLES", icon: "roles", path: "roles" },
  routing: { label: "CALL ROUTING", icon: "routing", path: "routing" },
  reports: { label: "REPORTS", icon: "reports", path: "reports" },
  /** The client's own reports page, named for what it shows them. */
  activityReports: {
    label: "REPORTS & ACTIVITY",
    icon: "reports",
    path: "reports",
  },
  requests: { label: "REQUESTS", icon: "requests", path: "requests" },
  contacts: { label: "CONTACTS", icon: "clients", path: "contacts" },
  audit: { label: "AUDIT LOG", icon: "audit", path: "audit" },
  billing: { label: "BILLING", icon: "billing", path: "billing" },
  profile: { label: "PROFILE", icon: "profile", path: "profile" },
  /** A client's profile is their business's, at the same `profile` path. */
  businessProfile: {
    label: "BUSINESS PROFILE",
    icon: "profile",
    path: "profile",
  },
  settings: { label: "SETTINGS", icon: "settings", path: "settings" },
};

/** Section headings, so a role names a section rather than spelling one. */
export const NAV_SECTIONS = {
  main: "MAIN",
  overview: "OVERVIEW",
  operation: "OPERATION",
  management: "MANAGEMENT",
  workspace: "WORKSPACE",
  account: "ACCOUNT",
  system: "SYSTEM",
};
