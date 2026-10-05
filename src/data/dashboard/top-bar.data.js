/**
 * Top bar per role — Figma 167:49829.
 *
 * Only the page title changes between roles; the controls are the same bar, so
 * they are declared once and spread in.
 *
 * `pages` titles the inner routes, keyed by the route segment after the role
 * (`/admin/agents` → `agents`). A page without an entry shows the role's own
 * heading, which is also what the role's home shows.
 */
const SHARED = {
  search: { placeholder: "Search...", label: "Search" },
  notifications: { label: "Notifications" },
  language: {
    label: "English",
    flag: { src: "/admin/flag-gb.png", width: 24, height: 24 },
  },
  connection: {
    label: "Zoiper connected",
    icon: { src: "/icons/signal.svg", width: 24, height: 24 },
  },
  appearance: { label: "Light mode" },
  texture: "/admin/sidebar-texture.png",
  pages: {
    agents: {
      title: "AGENTS",
      subtitle: "Manage agent accounts and assignments.",
    },
    clients: {
      title: "Clients",
      subtitle: "Manage all client accounts on the platform.",
    },
    appointments: {
      title: "Appointments & Calendar",
      subtitle:
        "Coordinate callbacks, doctor consultations, and client meetings with live CTI synchronization.",
    },
    messages: {
      title: "Client Messages & Inbox",
      subtitle:
        "Unified multi-channel communications across SMS, Voicemails, and Internal Dispatch.",
    },
    reports: {
      title: "Call Activity & Service Reports",
      subtitle:
        "Visual analytics on telephony answer rates, peak calling hours, and appointment conversion.",
    },
  },
};

const ROLE_HEADINGS = {
  admin: {
    title: "Operations Overview",
    subtitle: "Monitor calls, clients, agents and service activity.",
  },
  agent: {
    title: "My Workspace",
    subtitle: "Your live calls, messages and follow-ups.",
  },
  client: {
    title: "Dashboard Overview",
    subtitle: "Here’s what’s happening with Laura Alegre Clinic today.",
  },
};

/**
 * Inner-page titles one role words differently — the client's Calls page is
 * "Calls & Notes". They layer over the shared `pages` for that role only, so
 * the admin's pages keep their own titles.
 */
const ROLE_PAGES = {
  client: {
    requests: {
      title: "Service Requests & Instructions",
      subtitle:
        "Submit calendar updates, VIP routing exceptions, or special handling rules to your secretary team.",
    },
    calls: {
      title: "Calls & Notes",
      subtitle:
        "Review calls and messages recorded by your Virtual Secretary team.",
    },
    contacts: {
      title: "CONTACTS",
      subtitle: "Your customers and patients who contact your business.",
    },
    reports: {
      title: "Reports & Activity",
      subtitle:
        "Your call volume, outcomes and busiest hours, handled by your Virtual Secretary team.",
    },
  },
};

export const dashboardTopBarByRole = Object.fromEntries(
  Object.entries(ROLE_HEADINGS)?.map(([role, heading]) => [
    role,
    {
      ...SHARED,
      ...heading,
      pages: { ...SHARED?.pages, ...ROLE_PAGES?.[role] },
    },
  ]),
);
