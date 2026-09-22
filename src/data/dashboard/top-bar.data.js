/**
 * Top bar per role — Figma 167:49829.
 *
 * Only the page title changes between roles; the controls are the same bar, so
 * they are declared once and spread in.
 */
const SHARED = {
  search: { placeholder: "Search...", shortcut: "⌘K", label: "Search" },
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
    title: "Account Overview",
    subtitle: "Your calls, appointments and service activity.",
  },
};

export const dashboardTopBarByRole = Object.fromEntries(
  Object.entries(ROLE_HEADINGS)?.map(([role, heading]) => [
    role,
    { ...SHARED, ...heading },
  ]),
);
