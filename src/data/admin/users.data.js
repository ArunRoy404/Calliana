/**
 * User & Roles directory — Figma 210:44307.
 *
 * Same shape as the other lists. `roleKey` backs the segmented role filter
 * (`role` on a row is the same value shown in the table); `statusKey` backs
 * the status filter, separate from the badge shown.
 */
const CLOCK_ICON = { src: "/icons/clock.svg", width: 16, height: 16 };

const USER = {
  id: "user",
  label: "USER",
  type: "user",
  field: "name",
};
const EMAIL = {
  id: "email",
  label: "EMAIL",
  type: "text",
  field: "email",
  wrap: true,
};
const ROLE = {
  id: "role",
  label: "ROLE",
  type: "text",
  field: "role",
};
const STATUS = {
  id: "status",
  label: "STATUS",
  type: "badge",
  field: "status",
  align: "center",
  headerAlign: "center",
};
const LAST_LOGIN = {
  id: "lastLogin",
  label: "LAST LOGIN",
  type: "icon-text",
  field: "lastLogin",
  icon: CLOCK_ICON,
};
const CREATED = {
  id: "created",
  label: "CREATED",
  type: "text",
  field: "created",
};
const ACTION = {
  id: "action",
  label: "Action",
  type: "action",
  align: "center",
  actions: [
    {
      id: "edit",
      label: "Edit user",
      iconOnly: true,
      variant: "outline",
      icon: { lucide: "Pencil", size: 16 },
      props: {
        notFunctional: true,
        notFunctionalMessage: "User management isn’t wired up yet",
        notFunctionalDescription: "This action will work once the backend is connected.",
      },
    },
  ],
};

export const USER_ROLE_OPTIONS = [
  { value: "agent", label: "Agent" },
  { value: "client", label: "Client Contact" },
  { value: "administrator", label: "Administrator" },
];

export const USER_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "invited", label: "Invited" },
  { value: "suspended", label: "Suspended" },
];

const STATUSES = {
  active: { label: "Active", tone: "success" },
  invited: { label: "Invited", tone: "info" },
  suspended: { label: "Suspended", tone: "error" },
};

const ROLES = {
  agent: "Agent",
  client: "Client Contact",
  administrator: "Administrator",
};

export const usersData = {
  texture: "/admin/table/table-texture.png",

  search: {
    label: "Search users",
    placeholder: "Search...",
  },

  filters: [
    {
      param: "role",
      field: "roleKey",
      label: "Filter by role",
      allValue: "all",
      variant: "segmented",
      options: [{ value: "all", label: "All" }, ...USER_ROLE_OPTIONS],
    },
    {
      param: "status",
      field: "statusKey",
      label: "Filter by status",
      allValue: "all",
      options: [{ value: "all", label: "All Statuses" }, ...USER_STATUS_OPTIONS],
    },
  ],

  addAction: {
    label: "Add User",
    icon: { lucide: "UserPlus", size: 16 },
  },

  notFunctionalMessage: "User management isn’t wired up yet",
  notFunctionalDescription: "This action will work once the backend is connected.",

  emptyLabel: "No users match your search or filters.",

  tableClassName: "min-w-[1020px]",

  columns: [USER, EMAIL, ROLE, STATUS, LAST_LOGIN, CREATED, ACTION],

  card: {
    title: USER,
    status: STATUS,
    subtitle: EMAIL,
    fields: [ROLE, LAST_LOGIN, CREATED],
    action: ACTION,
  },

  rows: [
    {
      id: "sofia-martinez",
      name: "Sofia Martínez",
      email: "sofia.m@virtualsecretary.io",
      roleKey: "agent",
      role: ROLES.agent,
      statusKey: "active",
      status: STATUSES.active,
      lastLogin: "Today 10:30",
      created: "01 Mar 2025",
    },
    {
      id: "carlos-ruiz",
      name: "Carlos Ruiz",
      email: "carlos.r@virtualsecretary.io",
      roleKey: "agent",
      role: ROLES.agent,
      statusKey: "active",
      status: STATUSES.active,
      lastLogin: "Today 09:12",
      created: "01 Mar 2025",
    },
    {
      id: "elena-vidal",
      name: "Elena Vidal",
      email: "elena.v@virtualsecretary.io",
      roleKey: "agent",
      role: ROLES.agent,
      statusKey: "active",
      status: STATUSES.active,
      lastLogin: "Yesterday 17:40",
      created: "14 Mar 2025",
    },
    {
      id: "laura-alegre",
      name: "Dr. Laura Alegre",
      email: "laura.alegre@lauraalegreclinic.com",
      roleKey: "client",
      role: ROLES.client,
      statusKey: "active",
      status: STATUSES.active,
      lastLogin: "3 days ago",
      created: "22 Jan 2025",
    },
    {
      id: "sergio-martinez",
      name: "Dr. Sergio Martinez",
      email: "hola@martinezdental.es",
      roleKey: "client",
      role: ROLES.client,
      statusKey: "invited",
      status: STATUSES.invited,
      lastLogin: "Never",
      created: "20 Sep 2025",
    },
    {
      id: "marcus-sterling",
      name: "Marcus Sterling",
      email: "marcus.s@virtualsecretary.io",
      roleKey: "administrator",
      role: ROLES.administrator,
      statusKey: "active",
      status: STATUSES.active,
      lastLogin: "Today 08:05",
      created: "05 Jan 2024",
    },
    {
      id: "david-chen",
      name: "David Chen",
      email: "david.c@virtualsecretary.io",
      roleKey: "administrator",
      role: ROLES.administrator,
      statusKey: "suspended",
      status: STATUSES.suspended,
      lastLogin: "12 days ago",
      created: "18 Nov 2024",
    },
    {
      id: "alejandro-cruz",
      name: "Alejandro Cruz",
      email: "office@vanguardwealth.es",
      roleKey: "client",
      role: ROLES.client,
      statusKey: "active",
      status: STATUSES.active,
      lastLogin: "1 week ago",
      created: "02 Apr 2025",
    },
    {
      id: "marco-fernandez",
      name: "Marco Fernández",
      email: "marco.f@virtualsecretary.io",
      roleKey: "agent",
      role: ROLES.agent,
      statusKey: "active",
      status: STATUSES.active,
      lastLogin: "Today 11:50",
      created: "29 Jun 2025",
    },
    {
      id: "nuria-puig",
      name: "Nuria Puig",
      email: "info@catalunyatechlegal.com",
      roleKey: "client",
      role: ROLES.client,
      statusKey: "invited",
      status: STATUSES.invited,
      lastLogin: "Never",
      created: "28 Sep 2025",
    },
  ],

  pagination: {
    summary: "{total} users · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },
};
