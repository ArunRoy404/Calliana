import { NAV_ITEMS, NAV_SECTIONS } from "@/data/dashboard/nav-items.data";

/**
 * Sidebar contents per role — Figma 179:69427.
 *
 * Each role lists section ids and item ids; the hrefs, labels and icons come
 * from the shared catalogue. Adding a role is one entry here, not another copy
 * of the sidebar.
 */
const ROLE_SECTIONS = {
  admin: {
    overview: ["dashboard"],
    operation: [
      "agents",
      "clients",
      "calls",
      "voicemail",
      "messages",
      "appointments",
      "tasks",
    ],
    management: ["roles", "routing", "reports", "audit"],
    system: ["settings"],
  },
  agent: {
    overview: ["dashboard"],
    workspace: ["calls", "voicemail", "messages", "appointments", "tasks"],
    account: ["clients"],
    system: ["settings"],
  },
  client: {
    overview: ["dashboard"],
    workspace: ["calls", "messages", "appointments"],
    account: ["reports", "billing"],
    system: ["settings"],
  },
};

const ROLE_USERS = {
  admin: {
    user: {
      name: "David Chen",
      email: "d.chen@virtualsecretary.io",
      avatar: { src: "/admin/avatar-admin.png", width: 36, height: 36 },
    },
    role: { label: "ROLE :", value: "SUPER ADMIN" },
  },
  agent: {
    user: {
      name: "Sofía Martínez",
      email: "s.martinez@virtualsecretary.io",
      avatar: { src: "/admin/avatar-admin.png", width: 36, height: 36 },
    },
    role: { label: "ROLE :", value: "AGENT" },
  },
  client: {
    user: {
      name: "Clínica Bienestar",
      email: "ops@clinicabienestar.es",
      avatar: { src: "/admin/avatar-admin.png", width: 36, height: 36 },
    },
    role: { label: "ROLE :", value: "CLIENT" },
  },
};

/** Chrome every role's sidebar shares. */
const SHARED = {
  signOut: { label: "SIGN OUT", href: "/sign-in" },
  textures: {
    panel: "/admin/sidebar-texture.png",
    user: "/admin/sidebar-user-texture.png",
  },
  mobile: { openLabel: "Open navigation", title: "Navigation" },
  profileMenu: [
    { id: "profile", label: "Profile", path: "profile", icon: "User" },
    {
      id: "settings",
      label: "Account Settings",
      path: "settings",
      icon: "Settings",
    },
    {
      id: "preferences",
      label: "Notifications",
      path: "preferences",
      icon: "BellRing",
    },
    { id: "support", label: "Help & Support", path: "support", icon: "LifeBuoy" },
  ],
};

/** `""` is the role's own index route, so it must not pick up a trailing slash. */
function hrefFor(role, path) {
  return path ? `/${role}/${path}` : `/${role}`;
}

function buildNav(role) {
  const sections = ROLE_SECTIONS?.[role] ?? {};

  return {
    ...SHARED,
    ...ROLE_USERS?.[role],
    brandHref: hrefFor(role, ""),
    profileMenu: SHARED?.profileMenu?.map((entry) => ({
      ...entry,
      href: hrefFor(role, entry?.path),
    })),
    sections: Object.entries(sections)?.map(([id, itemIds]) => ({
      id,
      label: NAV_SECTIONS?.[id],
      items: itemIds?.map((itemId) => ({
        id: itemId,
        ...NAV_ITEMS?.[itemId],
        href: hrefFor(role, NAV_ITEMS?.[itemId]?.path),
      })),
    })),
  };
}

export const DASHBOARD_ROLES = Object.keys(ROLE_SECTIONS);

export const dashboardNavByRole = Object.fromEntries(
  DASHBOARD_ROLES?.map((role) => [role, buildNav(role)]),
);
